#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { parse as parseYaml } from 'yaml';

const root = new URL('..', import.meta.url).pathname;
const ART_MD = join(root, 'src/content/artifacts');
const TERM_MD = join(root, 'src/content/terms');
const ART_HTML = join(root, 'public/artifacts');
const TRACKS = join(root, 'src/content/tracks');

const ALLOWED_HOSTS = [
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'esm.sh',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

const errors = [];
const err = (file, msg) => errors.push(`✗ ${file}: ${msg}`);

const list = (dir, ext) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)).map((f) => basename(f, ext)) : []);

function readFlatFrontmatter(path) {
  const src = readFileSync(path, 'utf8');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (v.startsWith('[')) out[k] = v.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    else out[k] = v;
  }
  return out;
}

function checkPairing(artMd, artHtml) {
  for (const slug of artMd) if (!artHtml.has(slug)) err(`src/content/artifacts/${slug}.md`, `missing public/artifacts/${slug}.html`);
  for (const slug of artHtml) if (!artMd.includes(slug)) err(`public/artifacts/${slug}.html`, `missing src/content/artifacts/${slug}.md`);
}

function checkSelfContained(artHtml) {
  for (const slug of artHtml) {
    const file = `public/artifacts/${slug}.html`;
    const html = readFileSync(join(ART_HTML, `${slug}.html`), 'utf8');
    if (!/<meta[^>]+name=["']viewport["']/i.test(html)) err(file, 'missing <meta name="viewport"> (artifacts must work on mobile)');
    if (!/function applyThemeFromQuery\(\)/.test(html) || !/^\s*applyThemeFromQuery\(\);/m.test(html)) {
      err(file, 'missing applyThemeFromQuery() from templates/artifact-template.html (the site passes ?theme= to the iframe)');
    }
    if (!/function embedInSite\(\)/.test(html) || !/^\s*embedInSite\(\);/m.test(html)) {
      err(file, 'missing embedInSite() from templates/artifact-template.html (it sizes the site frame and hides the duplicate title and sources)');
    }
    const refs = [...html.matchAll(/<(?:script|link|img|iframe|source|video|audio)\b[^>]*?\s(?:src|href)=["']([^"']+)["']/gi)].map((m) => m[1]);
    refs.push(...[...html.matchAll(/\bimport\s+(?:[^'"]*?\sfrom\s+)?["']([^"']+)["']/g)].map((m) => m[1]));
    for (const ref of refs) {
      if (/^(data:|blob:|#|mailto:)/.test(ref)) continue;
      if (/^https:\/\//.test(ref)) {
        const host = new URL(ref).host;
        if (!ALLOWED_HOSTS.includes(host)) err(file, `loads from non-allowed host ${host} (${ref})`);
        continue;
      }
      if (/^http:\/\//.test(ref)) { err(file, `insecure http:// reference ${ref}`); continue; }
      err(file, `relative/local reference "${ref}" (artifacts must be a single self-contained file)`);
    }
  }
}

const MIN_SOURCES = 2;

function frontmatterYaml(path) {
  const m = readFileSync(path, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  try { return parseYaml(m[1]); } catch { return null; }
}

function checkSources(artMd, artHtml) {
  for (const slug of artMd) {
    const file = `src/content/artifacts/${slug}.md`;
    const fm = frontmatterYaml(join(ART_MD, `${slug}.md`));
    if (!fm) { err(file, 'frontmatter is not valid YAML'); continue; }
    const refs = Array.isArray(fm.references) ? fm.references : [];
    if (refs.length < MIN_SOURCES) err(file, `needs at least ${MIN_SOURCES} references (see .claude/skills/add-artifact/RESEARCH.md)`);
    const urls = refs.map((r) => r?.url).filter(Boolean);
    if (new Set(urls).size !== urls.length) err(file, 'references: the same URL is listed twice');
    for (const url of urls) {
      if (/roadmap\.sh/.test(url)) err(file, `references: ${url} is on roadmap.sh, whose licence forbids reuse`);
      if (/[?&]utm_/.test(url)) err(file, `references: strip the tracking parameters from ${url}`);
    }
    if (!artHtml.has(slug)) continue;
    const html = readFileSync(join(ART_HTML, `${slug}.html`), 'utf8');
    const htmlFile = `public/artifacts/${slug}.html`;
    if (!/id=["']sources["']/.test(html)) err(htmlFile, 'missing the Sources section (id="sources") from templates/artifact-template.html');
    const section = html.match(/id=["']sources["'][\s\S]*?<\/section>/)?.[0] ?? '';
    const linked = [...section.matchAll(/<a\b[^>]*\shref=["']([^"']+)["']/gi)].map((m) => m[1].replace(/&amp;/g, '&'));
    for (const url of urls) if (!linked.includes(url)) err(htmlFile, `Sources section does not link ${url}, which the .md lists in references`);
    for (const url of linked) if (!urls.includes(url)) err(htmlFile, `Sources section links ${url}, which the .md does not list in references`);
    const shared = urls.filter((u) => linked.includes(u));
    if (linked.filter((u) => urls.includes(u)).join('\n') !== shared.join('\n')) err(htmlFile, 'Sources section lists the references in a different order from the .md');
  }
}

const VAGUE_HEADINGS = ['the idea', 'how it works', 'try it', 'check yourself'];

function checkHeadings(artHtml) {
  for (const slug of artHtml) {
    const html = readFileSync(join(ART_HTML, `${slug}.html`), 'utf8');
    for (const m of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)) {
      const text = m[1].replace(/<span class=["']num["']>[^<]*<\/span>/g, '').replace(/<[^>]+>/g, '').trim();
      if (VAGUE_HEADINGS.includes(text.toLowerCase())) err(`public/artifacts/${slug}.html`, `heading "${text}" is too vague; name the subject, such as "Overview of client and server architecture" or "Practice questions" (TEACHING.md)`);
    }
  }
}

function checkOutsideLinks(artHtml) {
  for (const slug of artHtml) {
    const html = readFileSync(join(ART_HTML, `${slug}.html`), 'utf8');
    for (const m of html.matchAll(/<a\b[^>]*\shref=["'](https?:\/\/[^"']+)["'][^>]*>/gi)) {
      if (!/\starget=["']_blank["']/.test(m[0])) err(`public/artifacts/${slug}.html`, `link to ${m[1]} needs target="_blank" rel="noopener", or it opens inside the site's frame`);
    }
  }
}

function checkReferences(artMd, terms) {
  const explained = new Set();
  for (const slug of artMd) {
    const fm = readFlatFrontmatter(join(ART_MD, `${slug}.md`));
    if (!fm) { err(`src/content/artifacts/${slug}.md`, 'no frontmatter'); continue; }
    for (const t of fm.terms ?? []) {
      explained.add(t);
      if (!terms.has(t)) err(`src/content/artifacts/${slug}.md`, `terms: "${t}" has no src/content/terms/${t}.md`);
    }
  }
  for (const t of terms) {
    if (!explained.has(t)) err(`src/content/terms/${t}.md`, 'no artifact lists this term; terms come only from the artifacts that explain them');
  }
  for (const slug of terms) {
    const fm = readFlatFrontmatter(join(TERM_MD, `${slug}.md`));
    if (!fm) { err(`src/content/terms/${slug}.md`, 'no frontmatter'); continue; }
    for (const key of ['related', 'contrasts']) {
      for (const t of fm[key] ?? []) if (!terms.has(t)) err(`src/content/terms/${slug}.md`, `${key}: "${t}" has no src/content/terms/${t}.md`);
    }
    if (!fm.definition) err(`src/content/terms/${slug}.md`, 'definition must be a single non-empty line');
  }
}

const BANNED_CHARS = [
  [/[—–]/, 'an em or en dash; use a period, a comma or "to"'],
  [/[←-⇿]/, 'an arrow; say it in words'],
  [/[‘’“”]/, 'a curly quote; use straight quotes'],
];
const BANNED_WORDS = /\b(additionally|crucial|delve[sd]?|enhance[sd]?|foster(s|ed)?|landscape|pivotal|showcase[sd]?|testament|underscores?|vibrant|leverag(e|es|ed|ing)|utiliz(e|es|ed|ing)|seamless(ly)?|serves as|stands as|not just|in order to|it is important to note)\b/i;

function stripCode(text) {
  return text.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/\shref=["'][^"']*["']/gi, '').replace(/<code>[\s\S]*?<\/code>/gi, '').replace(/`[^`\n]*`/g, '');
}

function checkWriting(file, text) {
  const lines = stripCode(text).split('\n');
  lines.forEach((line, i) => {
    if (/^prompt:/.test(line) || /^\s*(-\s*)?url:/.test(line)) return;
    for (const [re, why] of BANNED_CHARS) if (re.test(line)) err(`${file}:${i + 1}`, `${why} (WRITING.md): ${line.trim().slice(0, 80)}`);
    const word = line.match(BANNED_WORDS);
    if (word) err(`${file}:${i + 1}`, `"${word[0]}" is banned by WRITING.md: ${line.trim().slice(0, 80)}`);
  });
}

function checkAllWriting(artMd, terms, artHtml) {
  for (const slug of artMd) checkWriting(`src/content/artifacts/${slug}.md`, readFileSync(join(ART_MD, `${slug}.md`), 'utf8'));
  for (const slug of terms) checkWriting(`src/content/terms/${slug}.md`, readFileSync(join(TERM_MD, `${slug}.md`), 'utf8'));
  for (const slug of artHtml) checkWriting(`public/artifacts/${slug}.html`, readFileSync(join(ART_HTML, `${slug}.html`), 'utf8'));
}

function checkTracks(artMd, terms) {
  const artifacts = new Set(artMd);
  for (const slug of list(TRACKS, '.yaml')) {
    const file = `src/content/tracks/${slug}.yaml`;
    if (slug === 'unsorted') err(file, 'the name "unsorted" is taken by the Materials page for artifacts off every roadmap');
    const text = readFileSync(join(TRACKS, `${slug}.yaml`), 'utf8');
    checkWriting(file, text);
    if (/roadmap\.sh\/\S/.test(text)) err(file, 'links into roadmap.sh; its licence forbids copying its content, so tracks use our own words and no deep links');
    let track;
    try { track = parseYaml(text); } catch (e) { err(file, `invalid YAML: ${e.message}`); continue; }
    const seen = new Set();
    for (const section of track?.sections ?? []) {
      for (const node of section.nodes ?? []) {
        if (seen.has(node.id)) err(file, `node id "${node.id}" is used twice`);
        seen.add(node.id);
        for (const a of node.artifacts ?? []) if (!artifacts.has(a)) err(file, `node "${node.id}": artifact "${a}" has no src/content/artifacts/${a}.md`);
        for (const t of node.terms ?? []) if (!terms.has(t)) err(file, `node "${node.id}": term "${t}" has no src/content/terms/${t}.md`);
      }
    }
  }
}

const terms = new Set(list(TERM_MD, '.md'));
const artMd = list(ART_MD, '.md');
const artHtml = new Set(list(ART_HTML, '.html'));

checkPairing(artMd, artHtml);
checkSelfContained(artHtml);
checkReferences(artMd, terms);
checkSources(artMd, artHtml);
checkOutsideLinks(artHtml);
checkHeadings(artHtml);
checkAllWriting(artMd, terms, artHtml);
checkTracks(artMd, terms);

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log(`✓ ${artMd.length} artifacts and ${terms.size} terms look good.`);
