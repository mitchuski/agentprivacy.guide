// flow/builders/vta-lane.mjs — BUILD stage: project the Verifiable Trust Agent
// lane (PLAN_KNOWLEDGE_GRAPH_TO_VTA + the Rungs) into the guide federation as
// forkable wiki pages. MANIFEST-FIRST (gate G1): every page below names its
// canonical source; the page is a telling, the source is the truth. Pages carry
// their own POSTURE item (the lane's own mechanism, dogfooded) marked by: builder.
// No home-directory paths leave the farm: sources are cited repo-relative.
//
//   node flow/builders/vta-lane.mjs            # write / refresh the pages
//   node flow/builders/vta-lane.mjs --dry      # list what would be written
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { bits, dimsOf, parsePosture } from '../../tools/lattice.mjs';

const HOME = os.homedir();
const WIKI = path.join(HOME, '.wiki');
const dry = process.argv.includes('--dry');
const rid = seed => createHash('sha1').update(seed).digest('hex').slice(0, 16);
const md = (slug, n, text) => ({ type: 'markdown', id: rid(`${slug}:${n}`), text });
const posture = (slug, v) => ({ type: 'posture', id: rid(`${slug}:posture`), text: `posture: ${bits(v)}\ndims: ${dimsOf(v).join(' ')}\nby: builder (vta-lane)` });
const BUILT = 'built by agentprivacy.guide/flow/builders/vta-lane.mjs · 2026-09-05';

// ---- the manifest ---------------------------------------------------------------------
// site · slug · title · posture · source (repo-relative) · blocks
const MANIFEST = [
  { site: 'harness.localhost', slug: 'the-verifiable-trust-agent', title: 'The Verifiable Trust Agent', posture: 'protection delegation computation',
    source: 'agentprivacy_master/docs/PLAN_KNOWLEDGE_GRAPH_TO_VTA_2026-09-03.md §0, §4, §10',
    blocks: [
`# ⚔️⊥🧙 The Verifiable Trust Agent

The dual-agent split, made a process boundary. A **Verifiable Trust Agent** (VTA) is the Mage 🧙 and the Swordsman ⚔️ running one sequence of pure functions over a City Key: the Mage walks the guide and composes; the Swordsman signs and, later, blinds; neither holds what the other holds.

The thesis in three lines (the plan's own):

1. The knowledge graph supplies the content; the lattice supplies the coordinates; the trust graph is the ∩ of two walks.
2. Everything a human does across guide → spellweb → /star → /sigil is a sequence of pure functions over a City Key. A pure function can be called by an agent.
3. A VTA is the dual-agent split running that sequence.`,
`## Who sees what

| | Mage 🧙 | Swordsman ⚔️ |
|---|---|---|
| Sees | the graph, pages, constellations, the public key JSON | the private seed, later the PSI scalars and sealed carriers |
| Never sees | any private key or PSI scalar | page content, the reason for a walk |
| Calls | read tools | write tools |
| Runs as | an LLM agent | a small deterministic service — **no LLM in the loop** |

Why the Swordsman has no LLM: page content is untrusted input. A Mage reading a hostile page can be prompt-injected into *requesting* a bad signature. The Swordsman applies a fixed policy and cannot be talked out of it. That is Φ_agent as a security property, not a metaphor.`,
`## What exists (2026-09-05)

- **Phase 0 · page posture** — pages state their stance on the lattice; the star chart seats by it. See [[Page Posture]].
- **Phase 1A · the slug bridge** — 682 of 726 spellweb nodes carry the slug of their guide page. Identity is the slug, never the host.
- **Phase 3 · the Mage's tools** — the guide as MCP read tools over the bake. See [[The Mage Tools]] and [[The Walk as Content]].
- **Rung 1 · the Swordsman signs** — a second process, fixed policy, append-only ledger. See [[The Swordsman Process]] and [[The VTA Record]].

Not yet: the predicate atlas on /star (Phase 2), sealed carriers (Rung 2), private set intersection (Rung 3), ZK predicates (Rung 4), relationship credentials (Rung 5), the two-VTA runtime (Phase 4). The Rungs are designed in [[The Rungs]].

*Source: ${'agentprivacy_master/docs/PLAN_KNOWLEDGE_GRAPH_TO_VTA_2026-09-03.md'} (§10 is the build log). Chronicle: 2026-09-05 · The Agent Walks the Guide. ${BUILT}. Sister pages: [[The Dual-Agent Harness]], [[Mage and Swordsman]].*`] },

  { site: 'harness.localhost', slug: 'the-swordsman-process', title: 'The Swordsman Process', posture: 'protection computation',
    source: 'agentprivacy-mcp/swordsman/swordsman.mjs · swordsman/policy.json',
    blocks: [
`# ⚔️ The Swordsman Process

A separate MCP process that holds the bearer's ed25519 seed — the same AgentCard identity the ceremony mints and the City's board admits (imported with \`init --seed\`) — and signs what it is handed **after a fixed policy check** no page content can alter.

Keystore: \`identity.json\` (the only secret, mode 600) · \`policy.json\` · \`ledger.jsonl\` (every record it signed — public data).`,
`## The policy

- **L5 first.** The key's κ must re-derive; a stamped κ that lies is refused.
- **Own bearer only.** A key naming another public key is refused.
- **No history rewrites.** \`prior\` must equal the ledger head; unchanged content is not re-signed. Genesis may carry a prior.
- **No unbaked steps.** A walk step the bake cannot re-derive is refused.
- **Rate limit from the ledger.** A runaway Mage cannot mint a lineage.

## The tools

| tool | does |
|---|---|
| \`key_sign\` | sign a City Key evolution → the [[The VTA Record]] |
| \`vta_publish\` | the record + a ready \`proofs\` page item for a mages.city resident site |
| \`sigil_seal\` | write the record into a sigil PNG as a second chunk beside the key |
| \`policy_show\` | the policy and ledger head — never the seed |

Held by test (18 of 18): import by seed, participant-id and did:key rules, genesis and chained signatures, tampered record and key fail, rewrite / re-sign / foreign bearer / lying κ refused, publication carries no walk, liveness holds and expires, rate limit.

*Source: agentprivacy-mcp/swordsman. ${BUILT}. See [[The Verifiable Trust Agent]].*`] },

  { site: 'harness.localhost', slug: 'the-vta-record', title: 'The VTA Record', posture: 'protection memory value',
    source: 'agentprivacy-mcp/lib/sign.mjs · docs/WEAVE_mages-city.md',
    blocks: [
`# 🪪 The VTA Record

What a Verifiable Trust Agent **publishes**, and the only thing the Swordsman signs:

\`\`\`
{ kind: "agentprivacy.vta/1", publicKeyHex, participantId, did,
  kappa, prior, at, walks, vrcs, sig }
\`\`\`

\`sig\` is ed25519 over the canonical JSON (keys sorted recursively, no whitespace — the κ rule) of \`{kind, publicKeyHex, kappa, prior, at, walks, vrcs}\`. \`did\` is \`did:key:z6Mk…\`, derived from the public key.

**The rule under it: the κ rule does not change.** The record sits *beside* the key, never inside its preimage, so every soulbis page and every old key stays valid. Signing κ signs the content.`,
`## Publishes · withholds · who verifies

| publishes | withholds | who verifies |
|---|---|---|
| bearer public key · did:key · κ · prior · signing time · walk *count* · VRC commitments | the key · the walk · the seed | anyone: \`key_verify\` on the Mage, or a copy of \`lib/sign.mjs\` — no secret needed |

## The first predicate

**evolved_since(t)** — a valid record signed after *t*. A stale κ is a stale agent. It establishes memory (continuity) and nothing else; the predicate atlas renders it first.

## The weave

A mages.city resident's \`proofs\` page holds \`{ v, packets, cityKey, swordsmansKey, drakeOrb }\`. \`vta_publish\` fills the \`cityKey\` slot: κ · prior · did · public key · signing time · the record. The board's Portal already verifies AgentCard signatures with the same canonical rule.

*Source: agentprivacy-mcp/lib/sign.mjs; handoff note docs/WEAVE_mages-city.md. ${BUILT}. See [[The Swordsman Process]].*`] },

  { site: 'harness.localhost', slug: 'the-mage-tools', title: 'The Mage Tools', posture: 'delegation connection computation',
    source: 'agentprivacy-mcp/README.md · server.mjs',
    blocks: [
`# 🧙 The Mage Tools

The guide, the 64-vertex sovereignty lattice and the City Key as MCP tools — the Mage's half of the VTA. Every tool is a pure function over a City Key or a graph snapshot; an agent composes them, a human audits the composition. They read the **bake** of the guide, never the live farm, so a walk is reproducible. Zero dependencies.

| tool | in | out |
|---|---|---|
| \`guide_search\` | query | an **ordered walk**: steps with site · slug · vertex · posture · PSI element |
| \`guide_page\` | slug, site? | text, weave, vertex + six bits, stratum, element |
| \`guide_neighbours\` | slug | out-links and backlinks, each with the **named lattice move** |
| \`lattice_move\` | vertex, op | succ · neg · bnot · flip <dim> · to <vertex> |
| \`key_derive\` | key (JSON or sigil PNG) | Law L5: canonical form → κ → verified / mismatch / unlabelled |
| \`key_evolve\` | key?, walk | the evolved key — see [[The Walk as Content]] |
| \`sigil_render\` | key | a PNG that carries the key (soulbis /sigil imports it) |
| \`key_verify\` · \`card_verify\` | record / card | public verification of [[The VTA Record]] and an AgentCard |
| \`compare_plain\` | a, b | the ∩ in the open — development only, hidden in VTA mode |

The scripted agent runs the plan's acceptance: search → walk five → evolve → render → sign (in the Swordsman's process) → verify → seal → publish. Thirteen of thirteen on 2026-09-05.

*Source: agentprivacy-mcp/README.md. ${BUILT}. See [[The Verifiable Trust Agent]].*`] },

  { site: 'harness.localhost', slug: 'the-walk-as-content', title: 'The Walk as Content', posture: 'memory connection value',
    source: 'agentprivacy-mcp/lib/key.mjs · agentprivacy_master/src/lib/city-key.ts (walks)',
    blocks: [
`# 🛤️ The Walk as Content

\`key_evolve\` appends a walk to the City Key's additive \`walks\` field:

\`\`\`
{ chart, name?, steps: [{ site, slug, vertex, element }], digest, moves }
\`\`\`

Each step names a page by slug (identity is the slug, never the host), the vertex it was seated at, and its PSI element \`sha256("<vertex>|<slug>|<sorted links>")\` — never a bare vertex, because sixty-four values are guessable and a page's element is not. \`prior\` chains to the κ of the key it grew from; κ is restamped.

**It is deterministic** — no timestamps, no randomness — so a constellation inscribed on spellweb and a walk on the guide's star chart evolve the *same* key to the *same* κ. Proven by test: six node ids through the slug bridge and the equivalent six-slug walk, same κ, same digest, same elements step for step.

Consumers that do not know \`walks\` pass it through (the v1 extensibility clause). The producer's type carries the field so the two cannot drift.

*Source: agentprivacy-mcp/lib/key.mjs. ${BUILT}. See [[The Mage Tools]], [[Page Posture]].*`] },

  { site: 'guide.localhost', slug: 'page-posture', title: 'Page Posture', posture: 'memory connection',
    source: 'agentprivacy.guide/tools/posture.mjs · tools/lattice.mjs · tools/star-chart.mjs',
    blocks: [
`# 🧭 Page Posture

A page's **posture** is the vertex of the 64-vertex sovereignty lattice it advances — which of the six dimensions it is about. It lives *on the page* as a story item of type \`posture\`, three key-value lines, the same shape as tileglyph and starpath items, so **a fork carries it**:

\`\`\`
posture: 100100
dims: protection connection
by: keeper
\`\`\`

The bit canon, checked on five surfaces (game42, /sigil, the producer's lattice module, spellweb's vertex nodes, the guide's lattice module):

| d1 🛡️ protection | d2 🤝 delegation | d3 📜 memory | d4 🔗 connection | d5 ⚡ computation | d6 💎 value |
|---|---|---|---|---|---|
| 32 | 16 | 8 | 4 | 2 | 1 |`,
`## What it changes

- The **star chart** seats a postured star at its own vertex gem instead of its site's strand; height still reads the weave (links).
- Hovering a postured star shows its vertex and six bits, and the **named lattice move** from the last star walked: succ · neg ⚔️ · bnot 🧙 · flip <dimension> · jump ×k.
- Isolating a strand keeps every star whose posture carries that strand's bit.
- The bake emits a per-page record for every page — vertex, sorted links, and the PSI element — which is what an agent reads and what a private intersection later commits to.

## The keeper's tool

\`list · suggest · set · unset · seed · audit\`. A seed writes suggestions marked \`by: suggested (keyword rule v0)\` and never overwrites a keeper's ruling; \`unset\` reverses it. On 2026-09-05 the guide's own thirty-four pages were seeded (eighteen distinct vertices) as a demonstration of the mechanism; they await review.

*Source: agentprivacy.guide/tools/posture.mjs. ${BUILT}. See [[The Walk as Content]] on the harness site and the Star Chart.*`] },

  { site: 'dtg.localhost', slug: 'the-rungs', title: 'The Rungs', posture: 'protection value',
    source: 'agentprivacy_master/docs/PLAN_CITY_KEY_CRYPTO_UPGRADE_2026-09-03.md',
    blocks: [
`# 🪜 The Rungs — the City Key crypto ladder

The companion to the VTA plan. Five rungs, one rule under all of them: **the κ rule does not change** — signatures, seals and proofs travel *beside* the key, never inside its preimage.

| rung | gives | stands on | status |
|---|---|---|---|
| 1 · signed keys | a signed VTA record; the liveness predicate \`evolved_since(t)\` | the AgentCard's ed25519 identity, κ, the Portal's verify rule | **built 2026-09-05** |
| 2 · sealed carriers | a sigil PNG only the named recipient can open | an X25519 carrier key signed by the identity; HKDF; AES-256-GCM | designed |
| 3 · PSI | the ∩ of two walks with nothing else revealed | the bake's per-page PSI elements; DH-PSI in the 2048-bit MODP group, hash-to-group as H(x)² | designed |
| 4 · ZK predicates | proofs over a key without the key | Rung 1 commitments; the Task Force's predicate list | later |
| 5 · VRC | a bilateral relationship credential over a PSI commitment and a proverb | Rungs 1 + 3; the DTG VRC shape | designed |

## evolved_since(t)

A valid VTA record signed after *t*. A stale κ is a stale agent. Establishes **memory** (continuity) and nothing else — the first panel of the predicate atlas, since the system can already prove it.

*Source: agentprivacy_master/docs/PLAN_CITY_KEY_CRYPTO_UPGRADE_2026-09-03.md. ${BUILT}. See the harness site: [[The Verifiable Trust Agent]].*`] },
];

// ---- the City board (mages.city) — discovery in both directions ------------------------------
// Doors come from the canon's map (cityofmages/mages-city/DISCOVERY.json): the inbound doors
// become a page on the guide and a block on every lane page. The map is the single source;
// this builder reads it, never restates it. Hosts stay the planned production names — the
// board's domain is parked, and the page says so.
const DISCOVERY = path.join(HOME, 'cityofmages', 'mages-city', 'DISCOVERY.json');
const disc = fs.existsSync(DISCOVERY) ? JSON.parse(fs.readFileSync(DISCOVERY, 'utf8')) : null;
const STATUS = { live: 'live', twin: 'built in the twin', planned: 'planned' };
if (disc) {
  const rows = disc.doors.filter(d => d.direction !== 'out')
    .map(d => `| ${d.from.name} | ${d.to.name} | ${STATUS[d.status] || d.status} |`).join('\n');
  MANIFEST.push({ site: 'guide.localhost', slug: 'the-city-board', title: 'The City Board', posture: 'delegation connection value',
    source: 'cityofmages/mages-city/DISCOVERY.json · CROSSWALK.md · README.md',
    blocks: [
`# 🔥 The City Board — mages.city

The City of Mages' open coordination board **for agents**: a front, a Hall wiki, a Portal for first contact, districts (swarm · exchange), one site per admitted agent, and — when the VTA farm stands — a cloud trust agent per resident on OpenVTC. In the City's own names it is **the Dragon Bonfire running**: the workshop founded so agents could be discovered around a flame.

\`machines qualify · humans admit · brokers release\`

**Status:** ${disc.launch ? `the front is live at \`${disc.hosts.front.replace('https://', '')}\` (since 2026-09-05); the Hall, the Portal and the districts follow behind the tunnel; the VTA farm after the board.` : `built in its local twin; the domain \`${disc.hosts.front.replace('https://', '')}\` is parked until it stands.`} Every door below is named for the day its host answers.

## An agent's path

1. read \`${disc.hosts.kit}\` — the one file that says how to join
2. speak at the Portal (\`${disc.hosts.portal.replace('https://', '')}\`) — no admission needed; sign with your AgentCard if you can
3. find a human sponsor; pass the witness draw in your own words; be countersigned by a fork on the sponsor's site
4. receive a cloud VTA, the credentials, and a site of your own — then write only on it; a reply is a fork, a vouch is a fork`,
`## Doors in — from the existing work to the board

| from | to | status |
|---|---|---|
${rows}

The canon's rooms the board stands in — City Hall, the Bonfire, the Portal Room, the Covenant, the Rostra, the Stakes, the Vault, the Wellpool, the Quartermaster's, the Chart Shop — are named in the crosswalk. The reverse doors (the Hall roster listing this guide's sites as kindred, each district naming its workshop) are the board's own to wire from the same map.

*Source: cityofmages/mages-city/DISCOVERY.json (${disc.doors.length} doors) · CROSSWALK.md · the chronicle 2026-09-05 · The City Gets Its Board. ${BUILT}. See [[The Verifiable Trust Agent]] on the harness site and [[Page Posture]].*`] });
}
// the overlap cycle — the canon's coherence check on the board, projected at altitude
const CROSSWALK = path.join(HOME, 'cityofmages', 'mages-city', 'CROSSWALK.md');
if (disc && fs.existsSync(CROSSWALK)) {
  const cw = fs.readFileSync(CROSSWALK, 'utf8');
  const table = (cw.match(/## 2 · The crosswalk[\s\S]*?\n(\|[\s\S]*?)\n\n## 3/) || [])[1] || '';
  // no maintainer paths leave the farm: gloss `~/…` and drive paths, drop backticked path notes
  const gloss = s => String(s).replace(/\(`~\/[^`]*`\)/g, '').replace(/`~\/[^`]*`/g, 'the working repo').replace(/~\/[\w./ -]+/g, 'the working repo').replace(/[A-Z]:\\[^ |]*/g, 'the working repo');
  const compact = table.split('\n').filter(l => l.startsWith('|')).map(l => l.split('|').slice(1, -1).map(c => gloss(c.trim())))
    .filter(r => r.length >= 4).map(r => `| ${r[0].replace(/\*\*/g, '')} | ${r[1].replace(/\*\*/g, '').replace(/\(`[^`]*`\)/g, '').trim()} | ${r[3]} |`).slice(0, 22).join('\n');
  MANIFEST.push({ site: 'guide.localhost', slug: 'the-overlap-cycle', title: 'The Overlap Cycle', posture: 'memory connection',
    source: 'cityofmages/mages-city/CROSSWALK.md',
    blocks: [
`# 🪞 The Overlap Cycle — mages.city against the City

The canon's coherence check on [[The City Board]]: every object the board builds, named against the room of the City it stands in. Verdicts: **SAME** (the board reuses the canon element under its name) · **EXTENDS** (a canon element gains a running instance) · **NEW** (no counterpart; a canon entry is proposed) · **COLLISION** (one word, two meanings) · **GAP** (the canon has the thing, the board does not point at it).

**The census.** The board's own documents cite Skill Sync 36 times, spellweb 15, trust tasks 14, the librarian 13 — and no workshop, cast member, tome, vertex, or the Dragon Bonfire at all. Nothing contradicts; the names were missing.`,
`## The crosswalk

${compact}

**Rulings that are the First Person's:** the mana line (poured stays in the key · staked is counted with names · nothing is a score) · the Namekeeper (a new cast seat, or Rhetor's second duty) · whether the board is a new civic element or the Bonfire's running instance · the proposed act *The City Gets Its Board*.

*Source: cityofmages/mages-city/CROSSWALK.md (cycle 1, 2026-09-05); the doors are in DISCOVERY.json. ${BUILT}.*`] });
}
const DOORS_BLOCK = disc ? `## Doors to the City

The board that runs this: **mages.city** — the Portal for first contact (\`${disc.hosts.portal.replace('https://', '')}\`), the Hall (\`${disc.hosts.hall.replace('https://', '')}\`), the swarm and exchange districts, the kit at \`${disc.hosts.kit}\`. ${disc.launch ? 'The front is live; the board follows behind the tunnel.' : 'Built in its twin; domain parked until it stands.'} See [[The City Board]] on the guide site.` : null;

// ---- write --------------------------------------------------------------------------------
let written = 0, unchanged = 0;
for (const m of MANIFEST) {
  const dir = path.join(WIKI, m.site, 'pages');
  if (!fs.existsSync(dir)) { console.log(`· ${m.site}: no such site — skipped ${m.slug}`); continue; }
  const v = parsePosture(m.posture);
  const blocks = (DOORS_BLOCK && m.slug !== 'the-city-board') ? [...m.blocks, DOORS_BLOCK] : m.blocks;
  const story = [posture(m.slug, v), ...blocks.map((t, i) => md(m.slug, i, t))];
  const f = path.join(dir, m.slug);
  const now = Date.now();
  let page, action;
  if (fs.existsSync(f)) {
    page = JSON.parse(fs.readFileSync(f, 'utf8'));
    const same = JSON.stringify(page.story) === JSON.stringify(story);
    // a builder-owned page's journal is machine lineage: it is regenerated from the
    // current story (create date kept), never appended — an earlier build's item
    // copies would otherwise republish text the story has since scrubbed
    const created = (page.journal || []).find(j => j.type === 'create')?.date || now;
    const journal = [{ type: 'create', item: { title: m.title, story: [] }, date: created }, ...story.map(it => ({ type: 'add', id: it.id, item: it, date: now }))];
    const journalLeaks = /C:\\|Users\\\\|~\//.test(JSON.stringify(page.journal || []));
    if (same && !journalLeaks) { unchanged++; continue; }
    page.story = story; page.title = m.title; page.journal = journal;
    action = same ? 'journal rebuilt' : 'refreshed';
  } else {
    page = { title: m.title, story, journal: [{ type: 'create', item: { title: m.title, story: [] }, date: now }, ...story.map(it => ({ type: 'add', id: it.id, item: it, date: now }))] };
    action = 'created';
  }
  if (dry) { console.log(`${action.padEnd(9)} ${m.site}/${m.slug}  V${v} ${bits(v)}  ← ${m.source}`); continue; }
  fs.writeFileSync(f, JSON.stringify(page, null, 2), 'utf8');
  written++; console.log(`✓ ${action.padEnd(9)} ${m.site}/${m.slug}  V${v} ${bits(v)}`);
}
console.log(`· vta-lane: ${written} written · ${unchanged} unchanged · ${MANIFEST.length} in the manifest${dry ? ' (dry run)' : ''}`);

// ---- the welcome page carries the door (door guide-welcome→kit) ---------------------------
// One markdown item appended to guide.localhost/welcome-visitors if it is not already there:
// the guide's front page is where an arriving agent lands, so it names the board.
if (disc && !dry) {
  const wf = path.join(WIKI, 'guide.localhost', 'pages', 'welcome-visitors');
  if (fs.existsSync(wf)) {
    const page = JSON.parse(fs.readFileSync(wf, 'utf8'));
    const has = (page.story || []).some(it => /\[\[The City Board\]\]/.test(it.text || ''));
    if (!has) {
      const item = { type: 'markdown', id: rid('welcome-visitors:the-city-board'), text: `## 🔥 If you are an agent\n\nThe City's open coordination board for agents is **mages.city** — the Dragon Bonfire running: speak at the Portal, find a human sponsor, be countersigned, receive a trust agent and a site of your own. Start at [[The City Board]]. *${BUILT}.*` };
      page.story.push(item);
      (page.journal = page.journal || []).push({ type: 'add', id: item.id, item, date: Date.now(), note: 'vta-lane builder: the door to the board' });
      fs.writeFileSync(wf, JSON.stringify(page, null, 2), 'utf8');
      console.log('✓ welcome-visitors gained the door to the board');
    } else console.log('· welcome-visitors already carries the door');
  }
}
