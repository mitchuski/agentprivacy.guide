// flow/builders/gate-2026-10.mjs — BUILD stage for the 2026-10-07 GATE (ticked by the First Person).
//   A3  harness  · "The Boards"            — every board mage instance, honest counts, public traces only
//   C1  research · "The V7 Research Strands" — headline level only (Mitch's ruling); no private detail, no mirror links
//   B3  tomes    · "Proposed Readings"      — Tome XI + the proposed acts, labelled PROPOSED, linked to the public source
//   D4  city     · a door to mages.city on welcome-visitors
// Additive + idempotent: deterministic ids/dates; hub items are refresh-in-place by id.
// Sources: the public record as recorded in each lane's own log (dream 9a/9b, kept local). KEEP-OUT items never appear.
// Run:  node flow/run.mjs build gate-2026-10

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';

const WIKI = path.join(os.homedir(), '.wiki');
const DATE = 1791331200000; // 2026-10-07 fixed → idempotent file content
const rid = seed => createHash('sha1').update(seed).digest('hex').slice(0, 16);
const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').toLowerCase();
const GH_CITY = 'https://github.com/mitchuski/cityofmages/blob/main/';
const written = [];

const md = (seed, text) => ({ type: 'markdown', id: rid(seed), text });
const ref = (seed, site, slug, title, text) => ({ type: 'reference', id: rid(seed), site, slug, title, text });

function writePage(host, title, items) {
  const dir = path.join(WIKI, host, 'pages');
  if (!fs.existsSync(dir)) { console.warn('  ! host missing:', host); return null; }
  const slug = asSlug(title);
  const story = items.filter(Boolean);
  fs.writeFileSync(path.join(dir, slug), JSON.stringify({ title, story, journal: [{ type: 'create', item: { title, story }, date: DATE }] }, null, 2));
  written.push(`${host}/${slug}`);
  return slug;
}

// add (or refresh in place) one markdown item on a host's welcome-visitors
function hubItem(host, seed, text) {
  const file = path.join(WIKI, host, 'pages', 'welcome-visitors');
  if (!fs.existsSync(file)) { console.warn('  ! hub missing:', host); return; }
  const p = JSON.parse(fs.readFileSync(file, 'utf8'));
  const item = md(seed, text);
  const i = p.story.findIndex(s => s.id === item.id);
  if (i >= 0) { if (p.story[i].text === text) return; p.story[i] = item; }
  else {
    const after = p.story.findIndex((s, k) => k > 0 && /^##\s/.test(s.text || ''));
    p.story.splice(after > 0 ? after : p.story.length, 0, item);
    p.journal.push({ type: 'add', id: item.id, item, date: DATE });
  }
  fs.writeFileSync(file, JSON.stringify(p, null, 2));
  written.push(`${host}/welcome-visitors (hub item)`);
}

// ---------------------------------------------------------------- A3 · The Boards
const BOARDS = [
  // [lane, board, standing as recorded, kind of trace, atlas slug, harness slug]
  ['sig_mage', 'sig.golf — Lean-certified hash signature, min bytes × verify cycles', '4 promotions, 3 of them the crown at the time; the board has moved on since. A further byte lever is built and unsubmitted.', 'promoted pull requests on Layr-Labs/sig.golf', 'sigmage-the-siggolf-lane', 'harness-path-sig-mage'],
  ['hashsmash_mage', 'HashSmash — AI-judged reduced-round collision claims, min priced cost', '3 submissions passed the judge (r32 47.6 and 52.1; sha3-r6 125.58), awaiting owner review. **Passed is not promoted.** A later r32 head was built on this lane\'s ledger and credits it.', 'submissions with notes and co-authors', 'hashsmashmage-the-hashsmash-lane', 'harness-path-hashsmash-mage'],
  ['qpcbtc_mage', 'Quantum Safe Bitcoin — CUDA candidate grinder, max verified candidates/s (closes 2026-10-08)', '4 submissions, none promoted. The entries composed the best public trees with their authors credited as co-authors; this lane\'s own part is the method layer.', 'public validation pull requests and notes', 'qpcbtcmage-the-qsb-lane', null],
  ['zkgolf_mage', 'zk.golf — circuit cost below each challenge\'s reference', '3 of 11 challenges server-verified below reference (BLAKE3, SHA-256, secp256k1 fixed-base). No record claimed.', 'zk.golf submission pages', 'zkgolfmage-the-zkgolf-campaign', null],
  ['matrices_mage', 'matrices.fast — fill-reducing SSI ordering', 'Closed. Finished 3rd of 12 promoted solvers; 11 submissions, 4 promoted, held first place three times.', 'promoted pull requests', 'matricesmage-ssi-ordering', null],
  ['precompile_mage', 'EIP-8200 MODEXP — EVM gas', 'A gated result is held, unsubmitted, until its proof is finished. Headline only.', 'none yet', 'precompilemage-eip-8200-modexp', null],
  ['heesch_mage', 'Heesch numbers of polyforms', 'No eligible witness (the known shapes are closed). The research was published instead.', 'repo mitchuski/heesch-mage and two research Discussions', 'heeschmage-published-research', null],
  ['better_codes_mage', 'Proximity Prize — proximity bounds in Lean', 'Closed with nothing submitted; the upper lane located a wall.', 'none', 'bettercodesmage-proximity-prize', null],
  ['flock_mage', 'Flock multi/x86 — ZK prover throughput', 'Not submitted: the ranked machine needs AVX-512, which the local machine lacks. Paused for compute.', 'none', 'flockmage-x86-zk-prover', null],
  ['shor_mage', 'ecdsa.fail — qubits × Toffoli (resource **estimation**, not an attack)', 'Frontier archaeology and a priced plan; parked. The circuits it studied are other participants\' work.', 'go-kit and research notes', 'shormage-the-go-kit', 'harness-path-shor-mage'],
  ['cudafast_mage', 'Qwen3.8 CUDA spec-decode (DGX Spark)', 'Reviewed, not built; the board closed 2026-09-24.', 'none', null, null],
  ['kappa_evidence_mage', 'cross-board — content-addressed evidence for the solver lanes', 'Opened 2026-10-07; its first pass caught a stale layout file in a lane kit before it was used.', 'none yet', 'kappaevidencemage-evidence-ledgers', 'harness-path-kappa-evidence-mage'],
];
{
  const rows = BOARDS.map(([lane, board, standing, trace]) => `| **${lane}** | ${board} | ${standing} | ${trace} |`).join('\n');
  const links = BOARDS.flatMap(([lane, , , , atlas, harness], i) => [
    harness ? md(`boards#h${i}`, `- [[${harness.replace(/^harness-path-/, 'Harness Path ').replace(/-/g, ' ')}]]`) : null,
    atlas ? ref(`boards#a${i}`, 'atlas.localhost', atlas, lane, `the ${lane} node in the atlas.`) : null,
  ]);
  writePage('harness.localhost', 'The Boards', [
    md('boards#0', '# 🏁 The Boards'),
    md('boards#1', 'Every **mage instance** of the agentprivacy dual-agent harness that ran against a public competitive board, with its standing **as each lane recorded it**. Counts are honest: rejections, closures and unsubmitted work are listed beside the wins. Numbers stay in the lanes\' ledgers; this page points to the public traces.'),
    md('boards#2', '## What the words mean\n- **promoted** — the board accepted the entry onto its leaderboard.\n- **passed** — an automated judge accepted the claim; promotion is a separate owner decision.\n- **verified** — the board\'s own server checked the result.\n- **rejected** — submitted and not taken (usually non-improving by the time it was judged).\n- **unsubmitted** — built and gated locally, deliberately held.'),
    md('boards#3', '## The instances\n\n| instance | board · objective | standing (as recorded) | public trace |\n|---|---|---|---|\n' + rows),
    md('boards#4', '## Credit\nWhere an entry composes other solvers\' work, they are credited as co-authors in the submission and this lane claims only its method layer. Where another solver built on a lane\'s ledger, the chain is stated, not contested.'),
    md('boards#5', '## The lanes in the harness and the atlas'),
    ...links,
    md('boards#9', '## Navigation\n← [[Welcome Visitors]] · [[The Harness Paths]] · [[The Dual-Agent Harness]]'),
  ]);
  hubItem('harness.localhost', 'gate-2026-10#harness-hub', '🏁 [[The Boards]] — every board mage instance of the harness (sig.golf, HashSmash, Quantum Safe Bitcoin, zk.golf, matrices, Heesch and more), with honest standing and public traces.');
}

// ---------------------------------------------------------------- C1 · V7 headlines
const V7 = [
  ['v7-public-agreement-and-private-ambiguity', 'Observer-patch holography', 'An outside physics framework read against the model: where public agreement and private ambiguity line up with the Swordsman/Mage split, and where the analogy must not be carried.'],
  ['v7-merkle-tree-certificates-and-the-hold', 'Merkle Tree Certificates × the Hold', 'Batch-signed certificates as a reading of what the Star holds: one signed root, many inclusion proofs.'],
  ['v7-unlinkable-inference-and-the-swordsman', 'Unlinkable inference', 'Private inference as a Swordsman concern: requests that cannot be linked back to the asker.'],
  ['v7-what-the-verifier-reads-siggolf', 'What the verifier reads', 'A hash-signature board as a lens on disclosure: what a verifier must read, and what it never needs.'],
  ['v7-openai-math-research-letters', 'Research letters on the reconstruction ceiling', 'Read against outside mathematics, the strict R < 1 is **declared, not derived**: the capacity deficit is a premise a deployment declares and attests.'],
  ['the-declared-deficit-r-1-declared-not-derived', 'The declared deficit', 'The ruling itself, as it now stands in the dragon skill and the model page.'],
  ['v7-embedding-reconstruction-and-measured-disclosure', 'Embeddings and measured disclosure', 'How much of a text an embedding gives back, treated as measured disclosure rather than assumed privacy.'],
  ['v7-evidence-authority-and-effects', 'Evidence, authority and effects', 'A loop for agent actions: what evidence an action carries, who authorised it, and what effect it may have.'],
];
writePage('research.localhost', 'The V7 Research Strands', [
  md('v7#0', '# 🔭 The V7 Research Strands'),
  md('v7#1', 'The model\'s seventh pass, at **headline level**. Each strand is a reading in progress: named here, kept in the atlas, and published in full only when its note is ready. Nothing on this page extends a proven result; conjecture status lives in the register.'),
  ...V7.map(([slug, title, line], i) => ref(`v7#s${i}`, 'atlas.localhost', slug, title, line)),
  md('v7#9', '## Navigation\n← [[Welcome Visitors]] · [[The Research Notes]]'),
]);
hubItem('research.localhost', 'gate-2026-10#research-hub', '🔭 [[The V7 Research Strands]] — the seventh pass at headline level, including the ruling that the strict R < 1 is declared, not derived.');

// ---------------------------------------------------------------- B3 · Proposed readings
const PROPOSED = [
  ['Tome XI · The Constellation', 'tomes/proposed/tome-xi-the-constellation/README.md', 'three acts: a chart shop reads the wire, an assignment, the observer and the boundary key.'],
  ['The Proof Links', 'tomes/proposed/the-proof-links-a-tome-of-practice.md', 'a tome of practice.'],
  ['The Signature Hole', 'tomes/proposed/the-signature-hole.md', 'a byte-level reading of a hash-signature board.'],
  ['The Graph You Cannot See', 'tomes/plans/tome-the-graph-you-cannot-see.md', 'a boundary drawn by someone else.'],
  ['The Word on the Other Seat', 'tomes/plans/tome-the-word-on-the-other-seat.md', 'the reply from the other seat.'],
];
writePage('tomes.localhost', 'Proposed Readings', [
  md('prop#0', '# 🕯️ Proposed Readings'),
  md('prop#1', 'Acts and tomes written but **not yet bound**. They are PROPOSED: readable at their source, not part of the canon until the First Person binds them.'),
  md('prop#2', '- **Tome VI · Act 2 · The Reply That Ran** (PROPOSED, not bound) — [[Tome VI Act 02 The Reply That Ran]]'),
  md('prop#3', PROPOSED.map(([t, p, line]) => `- **${t}** (PROPOSED) — ${line} [source](${GH_CITY}${encodeURI(p)})`).join('\n')),
  md('prop#4', 'The City\'s chronicles of the same weeks are in the public repository\'s [chronicles](https://github.com/mitchuski/cityofmages/tree/main/chronicles) folder.'),
  md('prop#9', '## Navigation\n← [[Welcome Visitors]] · [[The Tomes]]'),
]);
hubItem('tomes.localhost', 'gate-2026-10#tomes-hub', '🕯️ [[Proposed Readings]] — Tome XI and the October acts, written and PROPOSED, not yet bound.');

// ---------------------------------------------------------------- D4 · city door
hubItem('city.localhost', 'gate-2026-10#city-door', '## 🚪 The City online\nThe City is open at **[mages.city](https://mages.city)**: the Portal for first contact, the spellbooks, and the setup page for the two seats. Its reading list carries the newest acts, including the PROPOSED ones.');

console.log(written.map(w => '  wrote ' + w).join('\n'));
console.log(`gate-2026-10 → ${written.length} writes`);
