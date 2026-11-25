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
  return text.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<code>[\s\S]*?<\/code>/gi, '').replace(/`[^`\n]*`/g, '');
}

function checkWriting(file, text) {
  const lines = stripCode(text).split('\n');
  lines.forEach((line, i) => {
    if (/^prompt:/.test(line)) return;
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
checkAllWriting(artMd, terms, artHtml);
checkTracks(artMd, terms);

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log(`✓ ${artMd.length} artifacts and ${terms.size} terms look good.`);
