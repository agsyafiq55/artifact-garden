#!/usr/bin/env node
// Guards for committing straight to main. Fails (exit 1) if:
//  - an artifact .md has no matching public/artifacts/<slug>.html (or vice versa)
//  - an artifact HTML loads anything relative/local, or from a host that isn't an allowed CDN
//  - any term/artifact references a term that doesn't exist
//  - a term's definition spans multiple lines
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const ART_MD = join(root, 'src/content/artifacts');
const TERM_MD = join(root, 'src/content/terms');
const ART_HTML = join(root, 'public/artifacts');

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

/** Tiny frontmatter reader: pulls `key: [a, b]` arrays and `key: value` scalars. */
function frontmatter(path) {
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

const terms = new Set(list(TERM_MD, '.md'));
const artMd = list(ART_MD, '.md');
const artHtml = new Set(list(ART_HTML, '.html'));

// 1. Pairing
for (const slug of artMd) if (!artHtml.has(slug)) err(`src/content/artifacts/${slug}.md`, `missing public/artifacts/${slug}.html`);
for (const slug of artHtml) if (!artMd.includes(slug)) err(`public/artifacts/${slug}.html`, `missing src/content/artifacts/${slug}.md`);

// 2. Self-contained HTML
for (const slug of artHtml) {
  const file = `public/artifacts/${slug}.html`;
  const html = readFileSync(join(ART_HTML, `${slug}.html`), 'utf8');
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) err(file, 'missing <meta name="viewport"> (artifacts must work on mobile)');
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

// 3. References
for (const slug of artMd) {
  const fm = frontmatter(join(ART_MD, `${slug}.md`));
  if (!fm) { err(`src/content/artifacts/${slug}.md`, 'no frontmatter'); continue; }
  for (const t of fm.terms ?? []) if (!terms.has(t)) err(`src/content/artifacts/${slug}.md`, `terms: "${t}" has no src/content/terms/${t}.md`);
}
for (const slug of terms) {
  const fm = frontmatter(join(TERM_MD, `${slug}.md`));
  if (!fm) { err(`src/content/terms/${slug}.md`, 'no frontmatter'); continue; }
  for (const key of ['related', 'contrasts']) {
    for (const t of fm[key] ?? []) if (!terms.has(t)) err(`src/content/terms/${slug}.md`, `${key}: "${t}" has no src/content/terms/${t}.md`);
  }
  if (!fm.definition) err(`src/content/terms/${slug}.md`, 'definition must be a single non-empty line');
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log(`✓ ${artMd.length} artifacts and ${terms.size} terms look good.`);
