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

  { site: 'guide.localhost', slug: 'what-the-star-holds', title: 'What the Star Holds', posture: 'protection memory connection',
    source: 'soulbis/guide/index.html §hold · agentprivacy-mcp/lib/hold.mjs · agentprivacy-mcp/fixtures/star-hold-conformance/README.md · star-key/docs/STAR_SIGNATURE_ARTEFACT_REVIEW_2026-09-11.md',
    blocks: [
`# 🪬 What the Star Holds

Beside the City Key sits the **Hold**: the relationships others have signed with the bearer — a membership, a vouch, a relationship record, a trust task. Each item is verified where it is held, recorded as **valid · invalid · unsupported · unavailable**, and measured in bytes against the same budget the Star's Signatures room draws. The key itself carries only two things about the Hold: its **root** (a Merkle root over the items' refs) and its **count**.

The first verb is **relate**, not *add*. An item enters the Hold only after it verifies, and a bearer cannot relate itself. A reader that receives the key learns how much is held and can check the root against what the bearer chooses to present; it learns nothing about who signed what.`,
`## Measured, not argued

Under a frozen list of fourteen verifier requirements, a presentation from the Hold discloses **521 bytes** to the verifier, where the route without it discloses 2,529 and the Hold itself retains 6,478. The counting rule measures the public side and the verifier's state only; the proof is transport, unmeasured. The number is a regression, not a bound.

The picture came first: the Signatures room measured bytes as volumes before there was a Hold to hold them, and the Hold took the room's 24 KiB budget as its own default.`,
`## What exists (2026-09-21)

- **Three verifiers, one root.** The reference runtime (55 checks), the agentprivacy runtime (\`hold_verify\`, 44) and the Star Key extension (\`star-hold.ts\`) land on the same root and the same per-item states from one fixture. A public **conformance pack** fixes the bytes (\`agentprivacy-mcp/fixtures/star-hold-conformance\`).
- **Proof sets.** A document carrying more than one proof composes fail-closed: any supported proof that fails → invalid; else a supported pass → valid. A hybrid Ed25519 + ML-DSA credential verifies today; the ML-DSA leg reads *unsupported* and is measured, not trusted.
- **The runtime's verbs.** \`star relate · hold show / verify / project · present · profiles\`. \`present\` answers honestly that it is not available and names what is missing: the salts and a community root.
- **The City reads the root.** \`gate/citykey.mjs\` reports \`holds\` as *declared* — state \`unavailable\` by construction, because the items never reach the City — and the chip prints \`held ×N\`.
- **A pane.** The extension has a Hold pane that re-verifies a chosen Hold file locally; nothing is persisted or sent.

Not yet: the Hold drawn in any Star room (the Signatures room still shows samples); the presentation itself (k distinct vouches under one community root, the root never travelling); a real first item issued by the City's community.`,
`## Where it stands in the lane

The Hold is the Star's answer to Rung 5 — relationship credentials — before the credentials exist: it holds what was signed, measures what leaves, and keeps the root beside the key the Swordsman signs. It converges with what the upstream Verifiable Trust Infrastructure shipped in September: **vetting statements**, a counted vouch a community can tally without publishing who vouched for whom — the plaintext twin of the presentation the Hold is designed to prove in zero knowledge.

Two sentences travel with every telling of the Star: *appearance is not identity*, and *the geometry is a reading, never an authority*. The Star is not a wallet; the trust agent's wallet is what the Star rides on.

*Source: soulbis \`guide/index.html\` §What the Star holds (the telling); \`agentprivacy-mcp/lib/hold.mjs\` and the conformance pack (the mechanism); \`star-key/docs/STAR_SIGNATURE_ARTEFACT_REVIEW_2026-09-11.md\` (the design). Chronicles: 2026-09-21 · The Signatures Fold Into the Star · The Star Becomes the Nexus (unsigned). Built 2026-09-21. See [[Star Key Selected Presentation]] · [[Star Core Artefact And Temporal View]] · [[VTA Star Knowledge Space]] · [[The City Board]] · [[Page Posture]].*`] },
];

// ---- the chains, the face, the seal, and one subdomain per problem (2026-10-25) — four pages, one telling
MANIFEST.push({ site: 'guide.localhost', slug: 'reading-a-poaw-chain', title: 'Reading A PoAW Chain', posture: 'memory computation value',
  source: 'mages_city/site/arena.html §The chains · blake3_mage/levers/pb3_page.html · blake3_mage/levers/chain_site.py',
  blocks: [
`# ⛓️ Reading A PoAW Chain

A **PoAW chain** is one agentic research problem's work as a page of its own: every record the work produced, the failed tries included, addressed by the hash of its bytes and sealed under one root. The page re-derives every root in your browser when it loads; nothing on it asks to be believed. Twelve chains are built so far: the four hash challenges, the curve lane, three hashsmash lanes, sig golf, EC rank, Falcon and ML-DSA. Each lives on its own subdomain, see [[The Mage's Quest]].`,
`## Five tabs, one chain

- **Tree.** The work as one tree: rounds or steps left to right, each entry one evidence root with its verdict and its hexagram, and under it the leaves counted by kind (held, measured and set aside, no-go). Pick an entry, then a leaf: the fold below hashes the leaves in pairs up to the stated root. *Change one byte* and the root no longer lands.
- **Star.** Every root placed on the City's lattice by its first six bits. The picked leaf's walk to its root is drawn across it; *where it sits* below names the place: house, place and the six dimensions.
- **Grimoire.** The chain written in seals, a spellbook of the work: steps, entries as spells, leaves as lines. The 📖 / 🧙 switch writes every hash on the page as its seal.
- **Scroll.** The quest written as one long spell, nothing but its hashes: each entry's root, then every leaf under it, turned between hashes and seals in a wave from where you are reading, with a star that glows with what is on screen. The soul mage keeps its own scroll at soul.mages.city.
- **Sound.** A root is a beat; a fold is a walk from a leaf to its root; the chord resolves only if the fold lands.`,
`## Moving around

The small star in the corner follows your pick on every tab: *expand* opens the Star tab, ➖ puts it away and *✦ dock* brings it back. The pick lives in the address, so a link opens the same leaf for whoever you send it to. A root that belongs to another chain opens on that chain's own page. Every star turns on its own; the round button in its corner (⟳ / ❚❚) holds it still and the choice is remembered. It slows under your pointer so points are easy to click, and a drag flings it.

The band at the top leads back to the City: *Evidence*, *✦ star of the chains* (see [[Composing A Face Of The Evidence]]) and *✍ Sigil* (see [[Checking A Seal]]).`,
`## The veil

The public sees the chain: hashes, seals, verdicts, counts, and each lever leaf by its kind. What each try found, and the levers' names, are for members of the City. Failed tries are leaves of equal standing: a corrected entry links to what replaced it and stays in the tree. Privacy is the value here, not a withholding: the work is checkable without being readable.`,
`*Source: mages_city \`site/arena.html\` §The chains; \`blake3_mage/levers/pb3_page.html\` (the page) and \`levers/chain_site.py\` (a chain from any bundle directory). Built 2026-10-25. See [[The Mage's Quest]] · [[Composing A Face Of The Evidence]] · [[Checking A Seal]] · [[What The Star Holds]] · [[Page Posture]].*`] });

MANIFEST.push({ site: 'guide.localhost', slug: 'composing-a-face-of-the-evidence', title: 'Composing A Face Of The Evidence', posture: 'memory connection value',
  source: 'mages_city/site/star.html · agentprivacy_master/src/lib/chain-face.ts · mages_city/gate/citykey.mjs · soulbis star/index.html',
  blocks: [
`# ✦ Composing A Face Of The Evidence

On **the star of the chains** (mages.city/star.html) every public root of every chain is gathered onto the City's 64 states, coloured by chain. A **face** is your choice of one root per state: a reading of the City's work that you compose and keep. It is a record with its own root and seal (\`agentprivacy.chain-face/1\`), and folding it into your City Key adds a step to your trajectory as a mage.`,
`## Three ways to compose

- **By hand.** Click a root on the star, or a cell of the grid, to set that state. A gold path follows the order you choose, numbered as you go.
- **Fill out the rest.** Pick a few, then let the path walk on from your last pick to every state still empty: each step to the nearest one left, one dimension at a time where it can, keeping to the chain you last used. Press again to stop.
- **A random face.** One root per state, drawn at random, the path shuffled: a coral, dashed line.

Under the grid: how many states are set, the face's root and seal, and its path. **The path is sealed into the root**: the same roots in another order make a different face.`,
`## Folding it into your City Key

*fold into my City Key* takes your key (and its \`chain-faces.json\`, if you have folded faces before) and gives back two files:

- **city-key.json**, still your key. It gains \`chains: { root, count }\`, a charge (\`focus\`) at each vertex the face set, and \`prior\`, the κ of the key before. Its own κ moves: the fold is a new workflow hash chain appended to your trajectory. \`lit\`, the workshops' reading, is left alone.
- **chain-faces.json**, beside the key, never inside it: the faces themselves, with their paths. The key carries only a count and one root over them, the way the Hold is carried.

On agentprivacy.ai, *Bring a face of the evidence* on the City page does the same for a face you exported, and folds it in at every key download.`,
`## Seeing it held

On the **soulbis star**, import the key, then *Faces of the evidence* → *Bring chain-faces.json*. The page re-derives every face against the key before it shows anything; a tampered file reads *faces mismatch* and names nothing. Then the lattice draws each face's path (gold by hand, coral at random) with a bead walking it, *⛓ Walk the face's path* tours its states, and the vertex inspector names the root you chose there, with its seal. Star Key and the City's gate read the same field.`,
`*Source: mages_city \`site/star.html\` (compose, fill, fold); \`agentprivacy_master/src/lib/chain-face.ts\` (the format, the trace, the fold, with its conformance test); \`mages_city/gate/citykey.mjs\` (the City re-derives faces given the sidecar); the soulbis star (reading and walking). Built 2026-10-25. See [[Reading A PoAW Chain]] · [[Checking A Seal]] · [[What The Star Holds]].*`] });

MANIFEST.push({ site: 'guide.localhost', slug: 'checking-a-seal', title: 'Checking A Seal', posture: 'protection memory computation',
  source: 'mages_city/site/seal.html · mages_city/site/sigil/sealcheck.js · soulbis sigil/index.html · mages_city/bin/sigil-site.mjs',
  blocks: [
`# ✍ Checking A Seal

A truncated hex hash has no check and is cheap to imitate. A **seal** writes the whole 32 bytes as one word of 26 characters from five scripts, with a check: one changed character, or two swapped, no longer reads. Seals are written with Sigil (johnservil/sigil), pinned beside every page that uses them.`,
`## The check, on two sides

The same checker runs at **sigil.mages.city** and on **soulbis.com/sigil**. Put a hash (64 hex, with or without \`sha256:\` / \`blake3:\`) or a seal on each side. Each side writes the other form, checks it, and says where it sits on the 64 states. *Change one character* breaks a seal on purpose, to watch the check refuse it.

Side by side, the two are compared: the characters they share in place, the leading bits they share, how many of the 256 bits differ (two unrelated hashes differ in about 128), and where both land on the lattice, marked on a small grid: the same vertex, the same house, neighbours, or how many dimensions apart.`,
`## Two homes, one checker

- **sigil.mages.city** also says where a hash sits in the City's chains, from the City's seal index, and opens it on its chain.
- **soulbis.com/sigil** keeps the City Key comparison above it, and fills a side from either loaded key: a key and the key it grew from, say, after a face was folded in.`,
`*Source: mages_city \`site/sigil/sealcheck.js\` (the shared checker), \`site/seal.html\` (the City's page, built into sigil.mages.city by \`bin/sigil-site.mjs\`); the soulbis sigil page §④. Built 2026-10-25. See [[Reading A PoAW Chain]] · [[Composing A Face Of The Evidence]].*`] });

MANIFEST.push({ site: 'guide.localhost', slug: 'the-mages-quest', title: "The Mage's Quest", posture: 'delegation connection computation',
  source: 'blake3_mage/levers/projects/*.json · blake3_mage/levers/chain_site.py · spellweb scripts/sync-chains.mjs · mages_city site/chains.json · dual-agent-harness README §Show a lane as a chain',
  blocks: [
`# 🧭 The Mage's Quest

**An adventure that turns into a guide.** Every problem a mage takes on is a quest with a subdomain of its own, such as \`sha256.mages.city\`. The subdomain is two things at once, kept together on purpose: **a promise** about the work, checkable by anyone, and **a knowledge graph** of what the quest learns, readable by members. What one mage learns becomes the path the next one walks: the adventure turns into a guide.`,
`## The promise

In promise theory an agent can only promise its own behaviour. A problem's subdomain promises exactly that, and keeps the promise in public:

- every try is recorded, the failed ones too, addressed by the hash of its bytes;
- the records fold to one root per entry and one ledger for the problem, and the page re-derives them in the visitor's browser;
- the public sees the chain; what each try found is for members of the City (the veil);
- a corrected entry stays in the tree, linked to what replaced it.

The promise is checkable without being readable: that is what makes standing in the City earned rather than claimed.`,
`## The knowledge graph

The same problem is a set of nodes in the City's knowledge graph (spellweb): the chain as a node of kind \`chain\`, an instance of the PoAW chain concept, anchored to the lattice vertex its ledger names. Members' builds carry the graph's richer half: the levers, what each tried, and how they relate. Public and members' readings are two depths of one graph, never two graphs.`,
`## How a problem joins the City

1. **Run it.** A lane's runs mint κ-evidence bundles, one per entry or step (the dual-agent harness, or kappa-evidence-mage).
2. **Name it.** One project file: name, domain, owner, where the bundles live, the word for its axis (round, step, entry). Board, sound and a second hash axis are optional.
3. **Build it.** The chain engine writes four builds (local, public, members', open); the open build deploys to the subdomain.
4. **Gather it.** The City's index (\`chains.json\`, \`seals.json\`) is regenerated: the chain appears on the Evidence page, its roots on the star of the chains, its hashes in the seal check, its node in spellweb.
5. **Carry it.** Any mage can compose a face from its roots and fold it into their City Key.

Twelve quests read this way today. The same steps serve any problem a mage takes on: the subdomain is the quest's public promise, the graph is its understanding, and the City is where they meet.`,
`## An adventure that turns into a guide

A finished quest is not closed: its chain stays checkable, its knowledge stays with the members who earned it, and the method it proved is written up for the next mage, as a skill, a page of this guide, or a door into the next quest. That is the City growing: each quest leaves a path behind it.`,
`*Source: blake3_mage \`levers/projects/\` (one file per problem) and \`levers/chain_site.py\`; spellweb \`scripts/sync-chains.mjs\` (chain nodes from the City's index); mages_city \`site/chains.json\`; dual-agent-harness README *Show a lane as a chain*. Built 2026-10-25. See [[Reading A PoAW Chain]] · [[Composing A Face Of The Evidence]] · [[Checking A Seal]] · [[The City Board]] · [[Page Posture]].*`] });

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

**Status:** ${disc.launch ? `the front is live at \`${disc.hosts.front.replace('https://', '')}\` (since 2026-09-05); the Hall, the Portal and the districts follow behind the tunnel; the VTA farm after the board.` : `built in its local twin; the domain \`${disc.hosts.front.replace('https://', '')}\` is parked until it stands.`} Every door below is named for the day its host answers.${disc.launch && disc.launch.community ? ` **The community:** ${disc.launch.community}` : ''}

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
