// flow/audit-snapshot.mjs — pre-deploy integrity gate for the static snapshot.
// Walks every emitted .html and verifies:
//   1. every page has real article text (no empty / error pages)
//   2. every local href (nav, crumb, hub, wlink, ref, index, dir links, assets,
//      json) resolves to a real file — no destination 404s
//   3. every page has its forkable .json sibling
//   4. no leftover dev-host (*.localhost:3030) names
// Run:  node flow/audit-snapshot.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'site');
const htmls = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) htmls.push(p);
} })(SITE);

const rel = p => path.relative(SITE, p).replace(/\\/g, '/');
const exists = p => { try { return fs.statSync(p).isFile(); } catch { return false; } };

const empty = [], thin = [], broken = [], noJson = [], devhost = [];
let links = 0;

for (const f of htmls) {
  const html = fs.readFileSync(f, 'utf8');
  const dir = path.dirname(f);

  // 1. article text content
  const m = html.match(/<article>([\s\S]*?)<\/article>/);
  const text = (m ? m[1] : '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 10) empty.push(rel(f));
  else if (text.length < 70) thin.push(`${rel(f)} (${text.length})`);

  // 4. dev-host leak
  if (/[a-z0-9-]+\.localhost(?::\d+)?/i.test(html)) devhost.push(rel(f));

  // 3. json sibling for content pages (skip dir index pages)
  if (!f.endsWith('index.html')) {
    const j = f.replace(/\.html$/, '.json');
    if (!exists(j)) noJson.push(rel(f));
  }

  // 2. every local href resolves
  for (const mm of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let href = mm[1];
    if (/^(https?:|mailto:|#|data:)/i.test(href)) continue; // external / anchor
    href = href.split('#')[0].split('?')[0];
    if (!href) continue;
    let target = href.startsWith('/') ? path.join(SITE, href) : path.join(dir, href);
    if (href.endsWith('/')) target = path.join(target, 'index.html');
    links++;
    if (!exists(target)) broken.push(`${rel(f)}  →  ${mm[1]}`);
  }
}

// ---- report ----
const pass = !empty.length && !broken.length && !noJson.length && !devhost.length;
console.log(`\n=== SNAPSHOT INTEGRITY AUDIT ===`);
console.log(`pages: ${htmls.length} · links checked: ${links}`);
console.log(`  empty pages:        ${empty.length}`);
console.log(`  broken links:       ${broken.length}`);
console.log(`  missing .json:      ${noJson.length}`);
console.log(`  dev-host leaks:     ${devhost.length}`);
console.log(`  (thin pages <70ch:  ${thin.length} — review, not fatal)`);
const show = (label, arr) => { if (arr.length) { console.log(`\n${label}:`); arr.slice(0, 15).forEach(x => console.log('  - ' + x)); if (arr.length > 15) console.log(`  …+${arr.length - 15} more`); } };
show('EMPTY PAGES', empty);
show('BROKEN LINKS', broken);
show('MISSING JSON', noJson);
show('DEV-HOST LEAKS', devhost);
show('THIN PAGES', thin);
console.log(`\n${pass ? '✓ PASS — every destination is a real text document, nothing empty or erroring.' : '✗ FAIL — issues above must be fixed before deploy.'}`);
process.exitCode = pass ? 0 : 1;
