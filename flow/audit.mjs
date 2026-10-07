// flow/audit.mjs — RESEARCH stage of the core flow.
// Scans the /mitch source dirs, diffs against the live FedWiki federation,
// and writes flow/gap-report.json + a printed summary.
//
//   precise  = grimoire (entity-level diff vs canon v10.4)
//   signal   = other sites (source count vs live page count; heuristic)
//
// Run:  node flow/audit.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HOME = os.homedir();
const WIKI = path.join(HOME, '.wiki');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

const pagesOf = site => {
  const dir = path.join(WIKI, `${site}.localhost`, 'pages');
  return fs.existsSync(dir) ? fs.readdirSync(dir) : [];
};
const has = (site, slug) => fs.existsSync(path.join(WIKI, `${site}.localhost`, 'pages', slug));
const countFiles = (dir, re) => {
  let n = 0;
  const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (re.test(e.name)) n++;
  } };
  if (fs.existsSync(dir)) walk(dir);
  return n;
};
const grepCount = (file, re) => fs.existsSync(file)
  ? (fs.readFileSync(file, 'utf8').match(re) || []).length : 0;

// ---- precise grimoire diff vs canon v10.4 ---------------------------------
function auditGrimoire() {
  const canonPath = path.join(HOME, 'agentprivacy-docs', 'models', 'privacymage_grimoire_v10_4_0.json');
  const G = JSON.parse(fs.readFileSync(canonPath, 'utf8'));
  const classes = [];
  const missing = [];

  // forged blades
  const blades = G.forged_blades.blades.map(b => b.title);
  const bMiss = blades.filter(t => !has('grimoire', asSlug(t)));
  classes.push({ atom: 'forged_blades', canon: blades.length, present: blades.length - bMiss.length, missing: bMiss.length });
  missing.push(...bMiss.map(t => ({ atom: 'forged_blade', title: t })));

  // blade proverbs
  const provs = G.forged_blades.blades.map(b => `Proverb of ${b.title}`);
  const pMiss = provs.filter(t => !has('grimoire', asSlug(t)));
  classes.push({ atom: 'proverbs', canon: provs.length, present: provs.length - pMiss.length, missing: pMiss.length });
  missing.push(...pMiss.map(t => ({ atom: 'proverb', title: t })));

  // incantations (21 canon keys -> match by name against existing titles)
  const incNames = Object.entries(G.unified_incantations).map(([k, v]) =>
    (v && v.name) || 'The ' + k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  const existingTitles = pagesOf('grimoire')
    .filter(s => s.startsWith('incantation-') || s.startsWith('the-'))
    .map(s => s);
  const incMiss = incNames.filter(n => {
    const direct = asSlug(n);
    const pref = asSlug('Incantation — ' + n);
    return !existingTitles.includes(direct) && !existingTitles.includes(pref)
      && !existingTitles.some(t => t.includes(asSlug(n).replace(/^the-/, '')));
  });
  classes.push({ atom: 'incantations', canon: incNames.length, present: incNames.length - incMiss.length, missing: incMiss.length });
  missing.push(...incMiss.map(n => ({ atom: 'incantation', title: n })));

  // principles (pentad 5 + foundational-truths page + sovereignty-aspects page)
  const prin = [
    ...Object.keys(G.principles.pentad_positioning).map(k => `The Pentad of ${k[0].toUpperCase() + k.slice(1)}`),
    'The Foundational Truths', 'The Sovereignty Aspects',
  ];
  const prMiss = prin.filter(t => !has('grimoire', asSlug(t)));
  classes.push({ atom: 'principles', canon: prin.length, present: prin.length - prMiss.length, missing: prMiss.length });
  missing.push(...prMiss.map(t => ({ atom: 'principle', title: t })));

  return { mode: 'precise', source: 'privacymage_grimoire_v10_4_0.json', livePages: pagesOf('grimoire').length, classes, missing };
}

// ---- heuristic source-signal audits ---------------------------------------
// the canonical git upstream (G0) — the skill builder reads the same tree; count only the 5 projected categories
const SKILLS = path.join(HOME, 'agentprivacy-skills');
const SKILL_DIRS = ['persona', 'role', 'privacy-layer', 'meta', 'wikis'];
const skillCount = () => SKILL_DIRS.reduce((n, d) => {
  const base = path.join(SKILLS, d);
  return n + (fs.existsSync(base) ? fs.readdirSync(base).filter(f => f.startsWith('agentprivacy-') && fs.existsSync(path.join(base, f, 'SKILL.md'))).length : 0);
}, 0);
// the register head, read from the "Register head:" line of the register(s) on disk
const registerHead = () => {
  const dir = path.join(HOME, 'agentprivacy-docs', 'research');
  const regs = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /^CONJECTURE_REGISTER.*\.md$/.test(f)).sort() : [];
  let head = 0;
  for (const f of regs) {
    const m = fs.readFileSync(path.join(dir, f), 'utf8').match(/Register head:\**\s*C(\d{1,3})/);
    if (m) head = Math.max(head, +m[1]);
  }
  return head;
};
// exact node count: spellweb's own reader (a regex misses multi-line objects); regex fallback
let ATLAS_NODES = 0;
try {
  const { readGraph } = await import(pathToFileURL(path.join(HOME, 'spellweb', 'scripts', 'read-graph.mjs')).href);
  ATLAS_NODES = (await readGraph()).nodes.length;
} catch {
  ATLAS_NODES = grepCount(path.join(HOME, 'spellweb', 'src', 'data', 'nodes.ts'), /\bid:\s*['"]/g);
}
function signalAudit(site, source, sourceCount, note, confidence = 'heuristic') {
  const live = pagesOf(site).filter(s => s !== 'welcome-visitors').length;
  const delta = sourceCount - live;
  return { mode: 'signal', confidence, source, sourceCount, livePages: pagesOf(site).length,
    likelyGap: delta > 5 ? delta : 0, note };
}

function run() {
  const report = {
    generatedFor: 'guide.agentprivacy.ai',
    sites: {
      grimoire: auditGrimoire(),
      skill: signalAudit('skill', 'agentprivacy-skills (persona·role·privacy-layer·meta·wikis)', skillCount(),
        'source = SKILL.md count in the 5 projected categories; site has hubs on top'),
      atlas: signalAudit('atlas', 'spellweb/src/data/nodes.ts',
        ATLAS_NODES,
        'NODES exported by spellweb (read as the app reads them) vs live pages'),
      research: (() => { const head = registerHead(); const live = pagesOf('research').filter(s => /^conjecture-c\d+$/i.test(s)).length;
        return { ...signalAudit('research', `agentprivacy-docs conjecture register (C1–C${head})`, head,
          `conjecture-cNN pages present: ${live} of ${head}; papers/notes sit on top`), conjecturePages: live,
          likelyGap: Math.max(0, head - live) }; })(),
      tomes: signalAudit('tomes', 'cityofmages/tomes',
        countFiles(path.join(HOME, 'cityofmages', 'tomes'), /\.md$/),
        'tome md files; mapping to acts/cast/specs not yet precise'),
    },
  };

  fs.writeFileSync(path.join(HERE, 'gap-report.json'), JSON.stringify(report, null, 2));

  // print summary
  console.log('\n=== GUIDE AUDIT — gap report ===\n');
  const g = report.sites.grimoire;
  console.log(`GRIMOIRE  (precise, ${g.livePages} live pages)`);
  for (const c of g.classes) {
    const flag = c.missing ? `❌ ${c.missing} MISSING` : '✅';
    console.log(`   ${c.atom.padEnd(16)} canon ${String(c.canon).padStart(3)} · present ${String(c.present).padStart(3)}  ${flag}`);
  }
  if (g.missing.length) {
    console.log('   missing:'); for (const m of g.missing) console.log(`     - [${m.atom}] ${m.title}`);
  }
  console.log('');
  for (const [site, s] of Object.entries(report.sites)) {
    if (site === 'grimoire') continue;
    const flag = s.likelyGap ? `⚠️  ~${s.likelyGap} possible gap` : '✅ covered';
    console.log(`${site.toUpperCase().padEnd(9)} (signal) src ${String(s.sourceCount).padStart(4)} · live ${String(s.livePages).padStart(4)}  ${flag}`);
    console.log(`          ${s.note}`);
  }
  console.log(`\n→ flow/gap-report.json written`);
  return report;
}

run();
