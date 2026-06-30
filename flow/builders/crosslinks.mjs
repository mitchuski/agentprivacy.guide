// flow/builders/crosslinks.mjs — de-silo the federation by adding prev/next
// navigation to sequential act pages (the dreams flagged "no prev/next"). Additive
// + idempotent: appends one `prevnext` nav item per act, ordered within its book.
// Run:  node flow/builders/crosslinks.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const WIKI = path.join(os.homedir(), '.wiki');
const DATE = 1782603400000;
const rid = s => createHash('sha1').update(s).digest('hex').slice(0, 16);
const ROMAN = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 };
const roman2int = s => { s = s.toLowerCase(); let n = 0; for (let i = 0; i < s.length; i++) { const c = ROMAN[s[i]], nx = ROMAN[s[i + 1]]; if (nx && c < nx) n -= c; else n += c; } return n; };
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

const SEQUENCES = [
  { host: 'tomes', re: /^tome-([ivxlcdm]+)-act-(\d+)-/i, group: m => m[1].toLowerCase(), order: m => parseInt(m[2], 10), label: g => `Tome ${g.toUpperCase()}` },
  { host: 'spellbooks', re: /^(story|plurality)-act-([ivxlcdm]+)-/i, group: m => m[1].toLowerCase(), order: m => roman2int(m[2]), label: g => cap(g) },
];

export function buildCrosslinks() {
  let changed = 0; const groups = {};
  for (const seq of SEQUENCES) {
    const dir = path.join(WIKI, `${seq.host}.localhost`, 'pages');
    if (!fs.existsSync(dir)) continue;
    const buckets = {};
    for (const f of fs.readdirSync(dir)) {
      const m = f.match(seq.re); if (!m) continue;
      const g = `${seq.host}:${seq.group(m)}`;
      (buckets[g] = buckets[g] || []).push({ slug: f, ord: seq.order(m), label: seq.label(seq.group(m)) });
    }
    for (const g in buckets) {
      const arr = buckets[g].sort((a, b) => a.ord - b.ord);
      for (const it of arr) { try { it.title = JSON.parse(fs.readFileSync(path.join(dir, it.slug), 'utf8')).title || it.slug; } catch { it.title = it.slug; } }
      for (let i = 0; i < arr.length; i++) {
        const prev = arr[i - 1], next = arr[i + 1];
        if (!prev && !next) continue;
        const parts = [];
        if (prev) parts.push(`← [[${prev.title}]]`);
        if (next) parts.push(`[[${next.title}]] →`);
        const text = `*${arr[i].label}* · ${parts.join('  ·  ')}`;
        const fp = path.join(dir, arr[i].slug);
        const page = JSON.parse(fs.readFileSync(fp, 'utf8'));
        const id = rid(arr[i].slug + '#prevnext');
        const item = { type: 'markdown', id, text };
        page.story = (page.story || []).filter(s => s.id !== id).concat(item);
        if (page.journal?.[0]?.type === 'create' && page.journal[0].item) page.journal[0].item.story = page.story;
        fs.writeFileSync(fp, JSON.stringify(page, null, 2));
        changed++;
      }
      groups[g] = arr.length;
    }
  }
  return { changed, groups };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = buildCrosslinks();
  for (const [g, n] of Object.entries(r.groups)) console.log(`  ${g}: ${n} acts linked`);
  console.log(`crosslinks → ${r.changed} act pages given prev/next`);
}
