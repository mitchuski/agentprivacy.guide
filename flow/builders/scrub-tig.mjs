// scrub-tig.mjs — post-pass: keep TIG / The Innovation Game out of the guide.
//
// The First Person (2026-10-08): "remove the innovation game and TIG, i didn't
// actually play their game" — and from the guide too. The ZK constraint-reduction
// lane (local dir tig_zk_loop, public repo zk_mage; the harness's second origin
// instance) keeps its lineage under a neutral name; its own harness-path page is
// not projected. The harness source repo is untouched (its history stays); this
// pass scrubs the farm projection so any rebuild can be followed by it.
//
//   node flow/run.mjs build scrub-tig        (after any harness / skill / tomes rebuild)
//   node flow/builders/scrub-tig.mjs --check (exit 1 if anything would change)
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const WIKI = path.join(os.homedir(), '.wiki');
const HOSTS = ['harness.localhost', 'skill.localhost', 'tomes.localhost'];
const DROP_PAGES = { 'harness.localhost': ['harness-path-tigzkp-mage'] };
const CHECK = process.argv.includes('--check');

// line-level: table rows and roster/reference lines that point at the dropped page
const DROP_LINE = [
  /^\|\s*tigzkp/i,
  /\[\[Harness Path — Tigzkp Mage\]\]\s*$/,
];
// text-level, applied in order
const RULES = [
  [/\[\[Harness Path — Tigzkp Mage\]\],\s*/g, ''],
  [/,\s*\[\[Harness Path — Tigzkp Mage\]\]/g, ''],
  [/\[\[Harness Path — Tigzkp Mage\]\]/g, 'the ZK constraint-reduction instance'],
  [/ZK systems \(tigzkp \/ pools_v2\)/g, 'ZK systems (pools_v2)'],
  [/the tigzkp_mage method/g, 'the ZK constraint-reduction method'],
  [/The tigzkp instance/g, 'The ZK constraint-reduction instance'],
  [/the tigzkp instance/g, 'the ZK constraint-reduction instance'],
  [/tigzkp's/g, "the ZK instance's"],
  [/\btigzkp_mage\b/g, 'the ZK constraint-reduction instance'],
  [/\btigzkp\b/g, 'the ZK instance'],
  [/\b(t|T)he the ZK/g, '$1he ZK'],
  // readability fix-ups (idempotent on already-scrubbed text)
  [/the ZK constraint-reduction instance — ZK circuit constraint reduction/g, 'ZK circuit constraint reduction'],
  [/the ZK instance(\s+)instance\b/g, 'the ZK$1instance'],
  [/([.!?]\s+)the ZK (constraint-reduction )?instance/g, '$1The ZK $2instance'],
  // the projected fleet is eighteen without it (source says fifteen or nineteen; only fleet nouns are touched)
  [/\b(nineteen|fifteen)(\s+(?:real\s+|workshop\s+)?(?:embodiments|instances|configs))/g, 'eighteen$2'],
  [/\b(Nineteen|Fifteen)(\s+(?:real\s+|workshop\s+)?(?:embodiments|instances|configs))/g, 'Eighteen$2'],
  [/\bNineteen entries stand\b/g, 'Eighteen entries stand'],
  [/## The nineteen, grouped/g, '## The eighteen, grouped'],
  [/Read these nineteen and you will notice the same skeleton under nineteen/g, 'Read these eighteen and you will notice the same skeleton under eighteen'],
  [/for all nineteen:/g, 'for all eighteen:'],
  [/one of the fifteen is a \*\*failure/g, 'one of the eighteen is a **failure'],
  [/catalogues fifteen(\s)/g, 'catalogues eighteen$1'],
  [/\btig_zk_loop\//g, 'zk_mage/'],
  [/\btig_zk_loop\b/g, 'zk_mage'],
  [/gate 001 · TIG × AIDDA/g, 'gate 001 · a sent letter'],
  [/\bThe Innovation Game\b/g, ''],
  [/\bTIG\b/g, ''],
];
const scrub = s => {
  let t = s.split('\n').filter(l => !DROP_LINE.some(rx => rx.test(l))).join('\n');
  for (const [rx, to] of RULES) t = t.replace(rx, to);
  return t;
};
const walk = v => typeof v === 'string' ? scrub(v)
  : Array.isArray(v) ? v.map(walk)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]))
  : v;

let changed = 0, dropped = 0;
const rd = p => fs.readFileSync(p, 'utf8');
for (const host of HOSTS) {
  const dir = path.join(WIKI, host);
  if (!fs.existsSync(dir)) continue;
  for (const slug of DROP_PAGES[host] || []) {
    for (const p of [path.join(dir, 'pages', slug), path.join(dir, 'assets', slug)]) {
      if (fs.existsSync(p)) { dropped++; if (!CHECK) fs.rmSync(p, { recursive: true, force: true }); }
    }
  }
  const pagesDir = path.join(dir, 'pages');
  if (fs.existsSync(pagesDir)) for (const f of fs.readdirSync(pagesDir)) {
    const p = path.join(pagesDir, f);
    if (!fs.statSync(p).isFile()) continue;
    const raw = rd(p);
    let out;
    try { out = JSON.stringify(walk(JSON.parse(raw)), null, 2); } catch { continue; }
    if (out !== JSON.stringify(JSON.parse(raw), null, 2)) { changed++; if (!CHECK) fs.writeFileSync(p, out); }
  }
  const assetsDir = path.join(dir, 'assets');
  const stack = fs.existsSync(assetsDir) ? [assetsDir] : [];
  while (stack.length) {
    const d = stack.pop();
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { stack.push(p); continue; }
      if (!/\.(md|txt|json)$/i.test(e.name)) continue;
      const raw = rd(p), out = scrub(raw);
      if (out !== raw) { changed++; if (!CHECK) fs.writeFileSync(p, out); }
    }
  }
}
console.log(`scrub-tig: ${changed} file(s) ${CHECK ? 'would change' : 'scrubbed'} · ${dropped} dropped path(s)`);
if (CHECK && (changed || dropped)) process.exit(1);
