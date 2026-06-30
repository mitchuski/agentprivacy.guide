// flow/builders/research.mjs — BUILD stage for the research site.
// Projects Band IX (the Limitative Reading, Run 8 / Gate G6 2026-06-28) into
// research.localhost: conjectures C90–C93 + the home-note page, and links them
// from the conjecture-register hub. Source of truth: the authoritative register
// agentprivacy-docs/research/CONJECTURE_REGISTER_V6.md (head C93).
// Additive + idempotent; page format mirrors the existing conjecture-cNN pages.
// Run:  node flow/builders/research.mjs

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
  const id = rid(slug + '#band-ix');
  const text = header + '\n\n' + links.map(l => `- [[${l}]]`).join('\n');
  const item = { type: 'markdown', id, text };
  page.story = (page.story || []).filter(it => it.id !== id).concat(item);
  page.journal = (page.journal || []).filter(j => !(j.type === 'add' && j.id === id))
    .concat({ type: 'add', id, item, date: DATE });
  fs.writeFileSync(file, JSON.stringify(page, null, 2));
}

// Band IX — verbatim from CONJECTURE_REGISTER_V6.md (lines 167–170)
const CONJ = [
  { n: 90, claim: "The Limitative Inversion: completeness ⇒ Φ → 0 ⇒ collapse is the value-sign reversal of completeness ⇒ inconsistency ⇒ collapse; the unreconstructable remainder is load-bearing. C17 stated in limitative terms.", conf: "~90% as observation", status: "observation · registered Run 8, 2026-06-28 · no reduction claimed", home: "limitative-theorems-and-privacy-is-value.md §1, §4", edges: [17, 7] },
  { n: 91, claim: "Gödel ↔ Φ_agent: zero-memory (Selene) is the Φ_agent instance of Gödel's first theorem; a witness real yet underivable from within, intrinsic to a single system; destroying it is a structural act of separation.", conf: "~60%", status: "active · registered Run 8, 2026-06-28 · conjectural", home: "limitative-theorems-and-privacy-is-value.md §2, §3.3, §4", edges: [14, 86, 17] },
  { n: 92, claim: "Tarski ↔ Φ_inference: existence-leak is the Tarski-undefinability instance loading on Φ_inference; feasibility-truth escapes containment across systems and accumulates across observers; D(X) monotone non-increasing in corroborating systems. Absorbs the Gödelian seed (existence as positive provability). Rides on C81; cannot exceed its base.", conf: "~70%", status: "active · registered Run 8, 2026-06-28 · conjectural · capped at C81's base", home: "limitative-theorems-and-privacy-is-value.md §3, §4", edges: [81, 84] },
  { n: 93, claim: "Content-addressed liveness leak: a live content-address is an existence claim about its content; deduplication/GUID liveness leaks existence, and existence bounds the search. The address does not leak content; its liveness leaks existence.", conf: "~55%", status: "active · registered Run 8, 2026-06-28 · conjectural", home: "limitative-theorems-and-privacy-is-value.md §3.5, §3.6", edges: [81, 92] },
];

export function buildResearch() {
  for (const c of CONJ) {
    const title = `C${c.n} — ${c.claim.slice(0, 90)}…`;
    const edges = c.edges.map(e => `→ [[Conjecture C${e}]]`).join(' · ');
    writePage(`conjecture-c${c.n}`, title, [
      `# C${c.n}\n**${c.claim}**\n\n*Confidence:* ${c.conf} · *Status:* ${c.status} · *Register:* core\n*Home:* ${c.home}\n\nBand IX · The Limitative Reading · registered Run 8, 2026-06-28 (Gate G6)`,
      `## Edges\n${edges}`,
      `## Navigation`,
      `[[Conjecture C${c.n - 1}]] ←`,
      `← [[Welcome Visitors]] · [[The Conjecture Register]] · [[The Limitative Reading]]`,
    ]);
  }

  // home-note page
  writePage('the-limitative-reading', 'The Limitative Reading', [
    `# 🧮 The Limitative Reading\n*Gödel, Tarski, and the inversion of the unprovable gap.*`,
    `> Of the classical limitative results, Gödel and Tarski sit closest to the spine of Privacy is Value. The reconstruction ceiling is a privacy-flavoured second incompleteness theorem. ARCH-1 is the diagonal lemma in different notation. The existence-leak conjecture is the Tarski instance, loading onto Φ_inference. Zero-memory is the Gödel instance, loading onto Φ_agent.`,
    `**The one move the model makes that logic does not:** it flips the sign on the gap. Where Gödel found a limit to mourn, the model banks the same gap as the asset.`,
    `**Band IX** registers four framing conjectures at Run 8 (Gate G6, 2026-06-28). Every join is structural framing (~80%), not a theorem-to-theorem reduction; the arithmetisation correspondence (Gödel numbering ↔ Z/(2⁶)Z) is intuition, not load-bearing.\n\n- [[Conjecture C90]] — the Limitative Inversion\n- [[Conjecture C91]] — Gödel ↔ Φ_agent\n- [[Conjecture C92]] — Tarski ↔ Φ_inference\n- [[Conjecture C93]] — content-addressed liveness leak`,
    `*Source:* \`agentprivacy-docs/research/limitative-theorems-and-privacy-is-value.md\`. *Related:* [[Conjecture C81]] (existence-leak) · [[Conjecture C17]] · [[Conjecture C14]] (amnesia) · [[Conjecture C7]].`,
    `## Navigation\n← [[Welcome Visitors]] · [[The Conjecture Register]]`,
  ]);

  // hub
  updateHub('the-conjecture-register',
    `## Band IX · The Limitative Reading (C90–C93)\n\n*Registered at Run 8 (Gate G6, 2026-06-28) — the V6 ceilings read as privacy-flavoured Gödel/Tarski. See [[The Limitative Reading]].*`,
    ['Conjecture C90', 'Conjecture C91', 'Conjecture C92', 'Conjecture C93', 'The Limitative Reading']);

  return { created };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = buildResearch();
  for (const c of r.created) console.log(`  ${c.action}  ${c.slug}`);
  console.log(`research build → ${r.created.length} pages`);
}
