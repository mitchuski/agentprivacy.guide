// flow/builders/research-hearthold.mjs — BUILD stage for the research site.
// Projects Band X (the Hearthold Reading, registered 2026-07-01 with cityofmages
// Tome X — The Hearth + the v1.9.1 grimoire) into research.localhost: conjectures
// C94–C96 + the home-note page, and links them from the conjecture-register hub.
// Source of truth: agentprivacy-docs/research/CONJECTURE_REGISTER_V6.md (head C96).
// Additive + idempotent; page format mirrors flow/builders/research.mjs (Band IX).
// Run:  node flow/builders/research-hearthold.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const PAGES = path.join(os.homedir(), '.wiki', 'research.localhost', 'pages');
const DATE = 1782602089000;
const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').toLowerCase();
const rid = seed => createHash('sha1').update(seed).digest('hex').slice(0, 16);

const created = [];
function writePage(slug, title, blocks) {
  const file = path.join(PAGES, slug);
  const existed = fs.existsSync(file);
  const story = blocks.filter(Boolean).map((t, i) => ({ type: 'markdown', id: rid(slug + '#' + i), text: t }));
  fs.writeFileSync(file, JSON.stringify({ title, story, journal: [{ type: 'create', item: { title, story }, date: DATE }] }, null, 2));
  created.push({ slug, action: existed ? 'updated' : 'created' });
}
function updateHub(slug, header, links) {
  const file = path.join(PAGES, slug);
  if (!fs.existsSync(file)) { console.warn('  ! hub missing:', slug); return; }
  const page = JSON.parse(fs.readFileSync(file, 'utf8'));
  const id = rid(slug + '#band-x');
  const text = header + '\n\n' + links.map(l => `- [[${l}]]`).join('\n');
  const item = { type: 'markdown', id, text };
  page.story = (page.story || []).filter(it => it.id !== id).concat(item);
  page.journal = (page.journal || []).filter(j => !(j.type === 'add' && j.id === id))
    .concat({ type: 'add', id, item, date: DATE });
  fs.writeFileSync(file, JSON.stringify(page, null, 2));
}

// Band X — verbatim from CONJECTURE_REGISTER_V6.md (the Hearthold Reading)
const CONJ = [
  { n: 94, claim: "Separation Principle in a Second Substrate: s ⊥ m | X realised as a running build on Archon did:cid — the model holds independent of its stones; a second-forge realisation strengthens the abstract convergence case (C34–C37).", conf: "~55%", status: "active · registered 2026-07-01 (Tome X)", home: "grimoire v1.9.1 · cityofmages Tome X Act 1 · spellweb conj-c94", edges: [39, 7] },
  { n: 95, claim: "The Evidence Graph as the Anti-Score: issuer-attested disclosure — a signed, decomposable evidence graph verified offline against issuer DIDs — is the structural refusal of the reputation score; trust rests on the issuer's signature, not the custodian's word.", conf: "~55%", status: "active · registered 2026-07-01 (Tome X)", home: "grimoire v1.9.1 · cityofmages Tome X Act 1 · spellweb conj-c95", edges: [61, 17] },
  { n: 96, claim: "Control-Plane ⊥ Data-Plane: the Sovereign authorizes the rules the Warden enforces; splitting the occasional control plane from the always-on data plane means compromising the always-on host cannot author authority.", conf: "~60%", status: "active · registered 2026-07-01 (Tome X)", home: "grimoire v1.9.1 · cityofmages Tome X Act 1 · spellweb conj-c96", edges: [94] },
];

export function buildResearchHearthold() {
  for (const c of CONJ) {
    const title = `C${c.n} — ${c.claim.slice(0, 90)}…`;
    const edges = c.edges.map(e => `→ [[Conjecture C${e}]]`).join(' · ');
    writePage(`conjecture-c${c.n}`, title, [
      `# C${c.n}\n**${c.claim}**\n\n*Confidence:* ${c.conf} · *Status:* ${c.status} · *Register:* city\n*Home:* ${c.home}\n\nBand X · The Hearthold Reading · registered 2026-07-01 (cityofmages Tome X — The Hearth)`,
      `## Edges\n${edges}`,
      `## Navigation`,
      `[[Conjecture C${c.n - 1}]] ←`,
      `← [[Welcome Visitors]] · [[The Conjecture Register]] · [[The Hearthold Reading]]`,
    ]);
  }

  // home-note page
  writePage('the-hearthold-reading', 'The Hearthold Reading', [
    `# 🏰 The Hearthold Reading\n*The cousin-forge built the model; the register reads it off a running build.*`,
    `> In Tome IV — *The Witnessing* — the City met the cousin-forge (flaxscrip, the cousin Sovereign; GenitriX, the cousin Mage) and named the *cousin-blade* a conjecture (C39, ~50%). In Tome X — *The Hearth* — the House of Archon returned having **built** the Privacy Is Value Model on Archon \`did:cid\` (Hearthold): a home-bound Warden custodies, a mobile Witness carries, a Sovereign held by the Signet approves. C39 is discharged to ~80%.`,
    `**Band X** registers three \`city\`-lineage conjectures at the Hearthold binding (2026-07-01). They are read off the tested-live subsystems of the implementation — "built, not asserted" — not a completeness claim.\n\n- [[Conjecture C94]] — Separation Principle in a second substrate\n- [[Conjecture C95]] — the evidence graph as the anti-score\n- [[Conjecture C96]] — control-plane ⊥ data-plane`,
    `*Source:* the cousin-forge collaboration — \`github.com/Flaxscrip/hearthold\` · cityofmages \`grimoire/city_of_mages_grimoire_v1_9_1.json\` · \`tomes/tome-x-the-hearth/01-the-house-of-archon-answers.md\`. *Related:* [[Conjecture C39]] (the cousin-blade, discharged) · [[Conjecture C61]] · [[Conjecture C7]].`,
    `## Navigation\n← [[Welcome Visitors]] · [[The Conjecture Register]]`,
  ]);

  // hub
  updateHub('the-conjecture-register',
    `## Band X · The Hearthold Reading (C94–C96)\n\n*Registered 2026-07-01 with cityofmages Tome X — The Hearth + the v1.9.1 grimoire — the PVM read off the cousin-forge's running \`did:cid\` build (Hearthold). Discharges C39. See [[The Hearthold Reading]].*`,
    ['Conjecture C94', 'Conjecture C95', 'Conjecture C96', 'The Hearthold Reading']);

  return { created };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = buildResearchHearthold();
  for (const c of r.created) console.log(`  ${c.action}  ${c.slug}`);
  console.log(`research-hearthold build → ${r.created.length} pages`);
}
