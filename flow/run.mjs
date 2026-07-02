// flow/run.mjs — orchestrator for the core flow.
//   node flow/run.mjs audit              # 1. RESEARCH  → flow/gap-report.json
//   node flow/run.mjs build <site>       # 3. BUILD     → writes pages into ~/.wiki
//   node flow/run.mjs snapshot           # 4. SNAPSHOT  → ./site
//   node flow/run.mjs cycle <site>       #   audit → build <site> → snapshot
// Stage 2 (GATE) is you: read the report, decide what to build.

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const node = (file, ...args) => {
  const r = spawnSync(process.execPath, [file, ...args], { stdio: 'inherit', cwd: ROOT });
  if (r.status !== 0) process.exit(r.status || 1);
};

const B = n => path.join(HERE, 'builders', n);
const BUILDERS = {
  grimoire: B('grimoire.mjs'),            // v10.4 atoms: blades · proverbs · principles · incantations
  research: B('research.mjs'),            // Band IX conjectures C90–C93 + the Limitative Reading
  'research-hearthold': B('research-hearthold.mjs'), // Band X conjectures C94–C96 + the Hearthold Reading
  'research-notes': B('research-notes.mjs'), // the distinct V6 working notes
  crosslinks: B('crosslinks.mjs'),        // prev/next on sequential acts (tomes + spellbooks)
  'skills-cleanup': B('skills-cleanup.mjs'), // linkify reverts + dup-block removal on skill pages
  proverbs: B('proverbs.mjs'),            // the grimoire's ~177 proverbs as grouped collections
};

const [cmd, arg] = process.argv.slice(2);
switch (cmd) {
  case 'audit':
    node(path.join(HERE, 'audit.mjs'));
    break;
  case 'build':
    if (!BUILDERS[arg]) { console.error(`no builder for "${arg}". have: ${Object.keys(BUILDERS).join(', ')}`); process.exit(1); }
    node(BUILDERS[arg]);
    break;
  case 'snapshot':
    node(path.join(ROOT, 'tools', 'snapshot.mjs'));
    break;
  case 'verify': // pre-deploy integrity gate: every destination is a real text document
    node(path.join(HERE, 'audit-snapshot.mjs'));
    break;
  case 'cycle':
    node(path.join(HERE, 'audit.mjs'));
    if (arg && BUILDERS[arg]) node(BUILDERS[arg]);
    node(path.join(ROOT, 'tools', 'snapshot.mjs'));
    node(path.join(HERE, 'audit.mjs'));
    break;
  default:
    console.log('usage: node flow/run.mjs <audit|build <site>|snapshot|cycle <site>>');
}
