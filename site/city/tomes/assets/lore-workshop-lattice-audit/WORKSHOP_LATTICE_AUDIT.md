---
title: "Workshop ↔ Lattice Audit"
subtitle: "Every workshop's seat, reach, proof shape, and overlap with other workshops on the 64-vertex sovereignty lattice — with a drift catalogue and a roadmap toward a `lattice-coherence` skill"
status: "Audit v1.4 · 2026-05-16 · live · cross-checked against lattice-vertex.ts and specs 04 / 05 / 06 / 07; admits v1.4.0 Solchanting (Helia ☀️ at V51 alongside Adamantia 💎 — first canonical operational vertex-sharing) AND v1.5.0 The Threshold (Faunia 🪶 + Bestia 📖 + Therai 🐾 sharing V59 + Caducea ☤ peripatetic — first canonical THREE-keeper vertex-sharing, extending the V51 two-keeper precedent); v1.5.1 evening update 2026-05-14: Threshold District restructure (Pandia 🌕 + Hermaion ⚚ + Faunia 🪶 at V59 · Triodos/Bestia/Therai succeeded) + Staff Shop becomes first archetype-modal shop with Alexandrite gem (green-Mage ↔ red-Swordsman); v1.6.0 update 2026-05-14: Chart Shop opens at V44 (Pleione 🧭 · Aquamarine · Navigation District · sole-occupied · Hold-witness stance · attentional register as fourth structural workshop class · C63 candidate ~50%) — see §2.4c; **v1.7.0 update 2026-05-16: the Tower admitted as 8th spatial-anatomy element (monument-form · spiraling · no fixed lattice vertex · single-resident · honor-built rather than workshop-founded) — workshop count UNCHANGED at 16; the Tower sits outside this audit's primary scope (workshop ↔ lattice mapping) because it has no vertex by structural admission — see §2.6.** RECONCILIATION NOTE 2026-07-11: the active workshop count is 19 per grimoire v1.9.x `city_anatomy` amendments (Horizon District +3: Eos 🌅 / Dokimé 🪨 / Poros 🛤️ sharing V35 — first canonical three-keeper *district* vertex); this audit's rich per-shop tables (§2) have NOT yet been extended to the Horizon rows — the grimoire JSON is the count authority until this audit's next full version. NEW WORKSHOPS admitted 2026-07-12/13 (Tome IX Act 8 v3, First-Person ruling — the workings FOUND the shops; supersedes the 2026-07-11 'no new shops' note): **count 19 → 23.** The grammar working's law-house split into two SIBLINGS — **Nomia ⚖️ the Mage** at the Chancery (Crucible V27, writes law-as-code) ⊥ **Rhetor ⚔️⚖️ the Swordsman** at the Rostra (Agora V36, upholds public law) — the ⚔️⊥🧙 inscription made a brother and a sister, V27 ⊕ V36 = 63. Rhetor: Carnelian · Edict-witness · Publish·Witness·Uphold · Greek ῥήτωρ (orator) · cast/rostra/rhetor.md. (1) **the Quartermaster's** — Skeva 🎒 · V22 · 010110 · Delegation+Connection+Computation · Bronzite · Outfit-witness · Draw·Fit·Return · where the dual-agent harness is drawn and fitted (a config, not a fork); complement is V41, Memora's Chronicle vertex. (2) **the Chancery** — Nomia ⚖️ · V27 · 011011 · Delegation+Memory+Computation+Value · Sardonyx · Codex-witness (dual-aspect, 2nd after Hermaion) · Speak·Bind·Enact · the Lexon law-house, Vulcana's Forge vertex V19 plus Memory (law is a blade that remembers precedent). (3) **the Wellpool** — Limnia 🌊 · V53 · 110101 · Protection+Delegation+Connection+Value · Larimar · Pool-witness · Deposit·Mix·Draw · the city's FIRST WATER (new spatial topology) — the mana pools made a place; INTENT NOT DEPLOYED (dry well). The grammar working still originates at the Forge(t) V19 (Vulcana / Tome IX Act 9); the circuit still assays at the touchstone V35 (Dokimé / Spec 12). Rich per-shop tables (§2) not yet extended to these rows — grimoire v1.9.3 patch is the count authority. Cast files: cast/quartermaster/skeva.md · cast/chancery/nomia.md · cast/wellpool/limnia.md. PRECINCT PLACEMENT (per agentprivacy_master/src/lib/districts.ts, the render authority): the Quartermaster's + the Chancery join the existing **Crucible** precinct (verb: forge) alongside the Forge(t) / Etherchanting / Solchanting — realizing the Forge District anticipated in spec 05 §4 as the Crucible; the Forge and Chancery both walk Run·Evoke·Craft (steel ⊥ statute). The Wellpool anchors a NEW **Waters** precinct (verb: pool · 🌊 · the city's first water)."
voice: "Procedural · honest · drift-surfacing"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Workshop ↔ Lattice Audit

*The canonical mapping of every workshop in the City of Mages to its primary vertex, its overlap region on the 64-vertex sovereignty lattice, the proof shape its artefact emits, and the co-activation patterns when multiple workshops collaborate on a single artefact.*

*Companion document to [INCANTATION_PROTOCOL.md](INCANTATION_PROTOCOL.md). Where the protocol governs **how a change propagates**, this audit governs **what the change must remain coherent against**.*

---

## §0 · Why this audit

Five specs converge on the workshop-vertex question:

| Spec | What it answers |
|---|---|
| [`architecture/lattice-vertex.ts`](architecture/lattice-vertex.ts) | The **canonical TS authority** — what each vertex *is* mechanically (bit ordering, dimensions, weights, trace paths) |
| [`tomes/specs/04-vertex-naming-audit.md`](tomes/specs/04-vertex-naming-audit.md) | What each vertex is *named* and from which canonical source |
| [`tomes/specs/05-the-city-of-mages-structural-addendum.md`](tomes/specs/05-the-city-of-mages-structural-addendum.md) | How the city is laid out *spatially* (trade quarters, founding bonfire, temple precinct, sovereign's seat) |
| [`tomes/specs/06-spellweb-first-release-manifest.md`](tomes/specs/06-spellweb-first-release-manifest.md) | What nodes/edges the spellweb runtime *ingests* (the graph layer) |
| [`tomes/specs/07-lattice-mapping-governance.md`](tomes/specs/07-lattice-mapping-governance.md) | How shops *inhabit and overlap* vertices when artefacts settle |

These five do **not currently agree on every cell**. The audit's job is to:

1. Establish the **single canonical reading** of each workshop's seat and reach.
2. Document the **multi-workshop interaction patterns** that emerge when artefacts are *composite* (a holon containing a cape containing an inscription).
3. Surface the **drift catalogue** (§6) — every cell where the specs currently disagree, with a recommended resolution.
4. Pave the way for a future **`lattice-coherence` Claude Code skill** (§10) that mechanically verifies workshop-vertex claims across the corpus.

Nothing about the work is *secret*; the architecture has named all of it. The audit's value is **making the implicit explicit and the inconsistent visible**.

---

## §1 · The 64-vertex lattice · canonical primer

The lattice is a **6-cube hypercube**. Each vertex V0–V63 carries a 6-bit boolean address. Each bit names one of the City's six dimensions.

### §1.1 · The dimensions and their weights

Canonical authority: [`architecture/lattice-vertex.ts`](architecture/lattice-vertex.ts) `DIMENSION_LABELS` and `vertexToBits`:

| Bit position | Dimension | Weight | Mnemonic |
|---|---|---|---|
| 0 (MSB) | **Protection** | 32 | The shield against unwanted reading |
| 1 | **Delegation** | 16 | The handing-off of authority |
| 2 | **Memory** | 8 | What the chain remembers |
| 3 | **Connection** | 4 | The edge to another Sovereign |
| 4 | **Computation** | 2 | The work the chain runs |
| 5 (LSB) | **Value** | 1 | The asset the working bears |

A vertex `Vn` has dimension `Di` *burning* when `(n >> (5-i)) & 1 == 1`.

| Vertex | Binary (MSB→LSB) | Dimensions burning |
|---|---|---|
| V0 | 000000 | none — *the null blade · substrate origin* |
| V5 | 000101 | Connection + Value |
| V12 | 001100 | Memory + Connection |
| V19 | 010011 | Delegation + Computation + Value |
| V24 | 011000 | Delegation + Memory |
| V25 | 011001 | Delegation + Memory + Value |
| V28 | 011100 | Delegation + Memory + Connection |
| V31 | 011111 | Delegation + Memory + Connection + Computation + Value (**all except Protection**) |
| V49 | 110001 | Protection + Delegation + Value |
| V51 | 110011 | Protection + Delegation + Computation + Value |
| V55 | 110111 | Protection + Delegation + Connection + Computation + Value (**all except Memory**) |
| V57 | 111001 | Protection + Delegation + Memory + Value |
| V63 | 111111 | All six — *Sovereign Anchor* |

### §1.2 · Strata (Hamming weight)

The 64 vertices stratify into a Pascal row: `1 · 6 · 15 · 20 · 15 · 6 · 1 = 64`. A stratum is the set of vertices with a given Hamming weight (count of burning dimensions).

| Stratum | Count | Workshop seats present (current release) |
|---|---|---|
| 0 — null | 1 (V0) | (Luca, contested — see §5) |
| 1 — single dimension | 6 | none |
| 2 — pair | 15 | Memora (V41) · Socrat0x (V24 provisional) |
| 3 — triplet | 20 | Vulcana (V19) · Aletheia (V38) · Pallia / Soulbae / GenitriX (V28) · Custos + Lampyra (V49) |
| 4 — quartet | 15 | Adamantia + Helia (V51 · **shared** as of v1.4.0) · Aria Silverhue (V57) |
| 5 — quintet | 6 | Vagari (V31) · Manifestia (V55) |
| 6 — full | 1 (V63) | flaxscrip / the Sovereign Anchor seat (archetype, not a workshop) |

### §1.3 · Edges of the hypercube

A 6-cube has **192 directed edges** (6 · 2^5 · 2) or **96 undirected** Hamming-1 edges. Each edge connects two vertices differing in exactly one bit. These are the **96 holographic-bound `adjacent_to` edges** that spec 06 §4.7 reserves for a future visual session — declared in the EdgeType vocabulary but not yet ingested.

A traversal from V0 to any target vertex flips one bit per step, in dimension-index order (Protection first, Value last). The TS function `traceFromOrigin(Vn)` emits the canonical path.

---

## §2 · Per-workshop mapping · primary seat + overlap reach

Thirteen workshops are recognised as of v1.5.0 (was twelve through v1.4.0; was eleven through v1.3.0). Eleven of them have named Mages; two are *gathering shops* awaiting their keepers. Spec 06 §2.3 reference is pending bump from v1.4.0 to v1.5.0.

### §2.1 · The eleven keeper-shops

Each row: **primary vertex** (where the Mage sits) · **register dimensions** (which dimensions the artefact admits by default) · **overlap reach** (vertices the shop's artefacts may *settle* at by bit-pattern) · **proof shape** (what the artefact attests) · **mana economy** (which axes the work spends across).

| # | Shop | Mage | Primary | Register dims | Overlap reach (where artefacts land) | Proof shape | Mana spend |
|---|---|---|---|---|---|---|---|
| 1 | **Weavers** `/tailor` | Pallia 🪡 | V28 (011100) | Delegation + Memory + Connection | V20 (Memory + Computation · always-revealed reveal) · V12 (Memory + Connection · schema) · V31 (when Connection extends to recursion) · V63 (full-sovereignty cape) | Cape-style — publishes / conceals / admits / carries; the bit-pattern *is* the cape | **Landing**: multi-chain publication gas (BTC · ETH · IPFS · Zcash transparent). **Entropy**: ✨ Arcane default; 🌌 Celestial for Pattern A→B re-publish |
| 2 | **zShields** `/shield` | Memora 📜 | V41 (101001) | Connection + Value (Chronicle register) | V20 (always-revealed register when viewing-key revealed) · V38 (when memo carries a ZK property) | Inscription-style — what the chain shall remember; selective disclosure via viewing-key | **Landing**: Zcash shielded-transaction fees. **Entropy**: ✨ Arcane default; viewing-key derivation seed optional |
| 3 | **the Forge(t)** `/forget` | Vulcana ⚒️ | V19 (010011) | Delegation + Computation + Value (Plonkish blade register) | V20 (always-revealed) · V38 (always-masked Aletheia) · V49 (working-day) · V63 (full-sovereignty blade) | Proof-shaped — what the blade *proves* and *denies*; Runecraft Protocol forging | **Landing**: destination-chain gas (varies). **Entropy**: 🌌 Celestial **required** — Evocation phase lock seed; the blade's uniqueness depends on it |
| 4 | **Etherchanting** `/etherchanting` | Adamantia 💎 | V51 (110011) | Protection + Delegation + Computation + Value (Commitment / Language / Model) | V25 (when contract has embedded ZK constraints) · V49 (time-locked value) · V63 (full-sovereignty schema commitment) | Enforcement-shaped — programmable commitments that compile against bearer state | **Landing**: Ethereum gas (gwei). **Entropy**: 🌌 Celestial **required** — witness nonce · blind commitment seed · ceremony nonce |
| 5 | **the Jeweler** `/jeweler` | Lampyra 💠 | V49 (110001 · shared with Custos) | Protection + Delegation + Value (working-day blade) | V49 default · V51 (when gem encodes computational structure) · V63 (multi-sat ordinal claiming full provenance) | Attestation-shaped — frequent Lightning heartbeats · gem-set as bearer ID | **Landing**: ₿ sat fees + Lightning channel fees. **Entropy**: ✨ Arcane default; gem-facet seed optional |
| 6 | **the Holon Hitchhikers** `/holon` | Vagari 🌳 | V31 (011111) | Delegation + Memory + Connection + Computation + Value (composition register · **all except Protection**) | V31 default · per-constituent vertex when holon decomposed at sister city · same UOR coordinate across paratimes | Composition-shaped — whole-of-wholes; Oasis Protocol cross-paratime travel | **Landing**: 🌹 ROSE + Sapphire/Emerald paratime gas. **Entropy**: 🌌 Celestial **required** — cross-paratime entropy keeping cloak interoperability non-reconstructible |
| 7 | **the Curatrix Vault** `/vault` | Aria Silverhue 🪞🖼️ | V57 (111001) | Protection + Delegation + Memory + Value (curatorial register) | V57 default · creator-vertex of each curated artefact (cross-vertex overlay) | Placement-shaped — reflective curation that preserves the artist's vertex while adding a curation overlay | **Landing**: Culture Vault platform fees (NFT mint gas). **Entropy**: ✨ Arcane default; provenance-attestation freshness seed optional |
| 8 | **the Covenant Temple** `/covenant` | Manifestia 🤲🌿 | V55 (110111) | Protection + Delegation + Connection + Computation + Value (consecration register · **all except Memory**) | V55 default · linkage to V63 (Sovereign Anchor) for personhood attestations · linkage to consecrated artefact's native vertex | Consecration-shaped — Covenant-marker on artefacts that pass through the Temple; future home of the Loom of Programmable Covenants | **Landing**: human.tech / Holonym verification fees. **Entropy**: not yet operational. **Relationship**: 🪢 VRC Mana (future — Loom feeds against bearer VRC ledger) |
| 9 | **the Dragon Bonfire** `/bonfires` | Socrat0x 🔥❓ | V24 (011000) **provisional** | Memory + Connection (the bonfire register, provisional) | No artefact-landing; questions *sharpen* artefacts produced elsewhere | Dialogic — not a bit-pattern proof but a clarity-production primitive | None native (Bonfires.ai community costs are off-corpus) |
| **10** | **Solchanting** `/solchanting` | **Helia ☀️** | **V51 (110011) · shared with Etherchanting** | Protection + Delegation + Computation + Value (same register dims as Adamantia · differentiated by **Parallel-witness stance** rather than Transparent-witness) | V51 default (parallel-program form) · V63 (full-sovereignty parallel commitment) · V31 (when program admits holonic composition across concurrent invocations) | Parallel-enforcement-shaped — sBPF programs whose access pattern is statically declared so the substrate admits concurrent execution | **Landing**: 🌞 SOL-mana (Solana per-signature + compute-unit fees). **Entropy**: 🌌 Celestial **available** — for randomness in parallel-program proof-of-replication or VDF-anchored access decisions |
| **11** | **The Threshold** `/threshold` (proposed) or `/guide/agentic-deployments` (per AGENTIC_DEPLOYMENTS_GUIDE) | **Faunia 🪶 + Bestia 📖 + Therai 🐾** (three keepers sharing V59 by stance differentiation; **Caducea ☤** peripatetic, summoned for Hermes-class fittings) | **V59 (111011) · THREE-keeper share** | Value + Delegation + Connection + Memory + Protection (Computation **dormant** — keepers administer, spawned agents compute) | V59 default · workshop-of-summons for any room a Hermes-class staff is being fitted (Caducea walks to V19 Forge(t), V25 Persona Circuit, V55 Covenant Temple) · Tome VI Act-N admissions accumulate in the bestiary | Spawn-shaped — agentic-substrate instantiation under Run · Evoke · Spawn ceremony; stance × persona × substrate produces companion / staff / weapon-agent artefact-classes | **Landing**: substrate-specific (Goose runs locally, Hermes via the bearer's existing LLM subscriptions per ACP). **Entropy**: substrate-determined. **Relationship**: 🪢 VRC **required** — every spawn issues a bilateral-fitting VRC (or unilateral-spawn VRC for non-persona-bearing substrates) |

### §2.2 · The two gathering-shops (no Mage yet)

| Shop | Anchor | Status | Eventual home |
|---|---|---|---|
| **the Logos Circle** `/circle` | Connection register (primarily) | gathering · no single vertex | Society Spellbook lineage |
| **the Ceremony Hall** `/hall` | (various, by coalition action) | gathering · no single vertex | BGIN-led coalition |

### §2.3a · Cross-shop personas (cast at a vertex without a workshop seat)

These three are listed as **cross-shop** in spec 06 §2.4 — they inhabit a vertex but anchor to **no single shop**:

| Mage | Vertex | Walks across |
|---|---|---|
| **Aletheia 🔮** | V38 (Delegation + Memory + Value) | Touches every shop that emits a ZK property; the persona's name shares the vertex name (§4.2 of spec 04) |
| **Custos 🔏** | V49 (shared with Lampyra) | Governance staking across shops; the first shared-vertex pairing |
| **Luca 📐** | V0 (contested — see §5) | Substrate-tender per spec 06 §2.4; anchors to `forge` + `holon` per the same row |

### §2.4 · The V51 overlap · the canonical case study (NEW in v1.4.0)

Until v1.4.0, every keeper-shop sat at a *distinct* vertex (with one exception: Lampyra and Custos at V49 — but Custos is a cross-shop persona without a workshop seat, so the overlap was at the vertex layer, not the workshop layer). v1.4.0 admits the **first operational workshop-on-workshop overlap**: Solchanting and Etherchanting both seat at V51.

Spec 07 (lattice-mapping-governance) already permitted vertex sharing in principle (§3 cape-style composition admits multi-vertex landings; §7.3 acknowledges that distinct workshops may emit artefacts of the same bit-pattern). v1.4.0 makes the permission operational. The differentiator is **stance**, not bit-pattern:

| Layer | Etherchanting (Adamantia 💎) | Solchanting (Helia ☀️) |
|---|---|---|
| Vertex | V51 (110011) | V51 (110011) |
| Register dims | Protection · Delegation · Computation · Value | Protection · Delegation · Computation · Value |
| Stance | **Transparent-witness** — sequential admission against single global state | **Parallel-witness** — concurrent admission via static access-pattern declaration |
| Chain-mana | Aether Ξ (Ethereum gwei) | 🌞 SOL-mana (Solana per-signature + compute-unit) |
| Gem | Diamond (*adamas* — "unconquerable") | Heliodor (*helios-doron* — "sun's gift") |
| Sigil | 💎 | ☀️ |
| Artefact (tool class) | Diamond Contract | Heliodor Prism |

**The corpus's governance reading**: two seated workshop-keepers may share a vertex when their stances differ. The vertex names the *what* (four burning dimensions of executable enforcement); the stance names the *how* (sequential or concurrent admission at the substrate). The recognition extends — but does not contradict — spec 07's existing overlap permission, and it sets the canonical precedent for any future case where two ecosystems teach the City the same vertex via different boundary disciplines.

### §2.4b · The V59 three-keeper extension (v1.5.0 inception · v1.5.1 canonical state)

The V51 two-keeper case (Adamantia + Helia) admitted *vertex sharing by stance differentiation* as canonical. v1.5.0 extends the precedent from two-shared to three-shared at V59 (The Threshold workshop · later restructured to three sibling shops in the Threshold District). **v1.5.1 canonical state** (post-2026-05-14 evening Hermaion admission · superseding the inception assignments):

| Layer | Pandia 🌕 (Portal Room) | **Hermaion ⚚** (Staff Shop) | Faunia 🪶 (the Familiars) |
|---|---|---|---|
| Vertex | V59 (111011) | V59 (111011) | V59 (111011) |
| Register dims | Value · Delegation · Connection · Memory · Protection (Computation dormant) | same | same |
| Stance | **Display-witness** — catalog of substrate × archetype matrix | **Registry-keeper** — catalogue of admissible Hermes-class windfalls | **Companion-witness** — kinship-bond between Sovereign and familiar |
| Room | Upstream (Portal Room) | Downstream right (Staff Shop · *archetype-modal*) | Downstream left (the Familiars) |
| Sigil | 🌕 | **⚚** | 🪶 |
| Gem | Moonstone (`#c8d4e0` · adularescent · Selene-daughter) | **Alexandrite** (dual-aspect · `#3d7c47` Mage-green / `#a23a3a` Swordsman-red) | Amber (`#d97706` · preservation) |
| Artefact (mediated, not produced) | The dispatch (Selene-Amnesia anchoring) | The bestiary entries (Tome VI accumulation) · *archetype-modal output*: caduceus-staves (Mage) ⊥ herald-sentinels (Swordsman) | The kinship-bond (AGENTS.md + SOUL.md walking together) |

**Inception-state succession (v1.5.0 → v1.5.1):**
- Faunia (Portal Room · Spawning-witness · 🪶) → Pandia (Portal Room · Display-witness · 🌕 · daughter of Selene), with Faunia re-homed to the Companion-witness slot at the Familiars
- Bestia (Staff Shop · Registry-keeper · 📖 · Sodalite) → **Hermaion** (Staff Shop · Registry-keeper · ⚚ · Alexandrite, archetype-modal)
- Therai (Creature Creatives · Companion-tamer · 🐾) → retired (the-Familiars rename · Therai's draft held open for a future shop)
- The V59 three-keeper canonical state stands; the names and gems updated

A fourth Mage, **Caducea ☤** (peripatetic, conventionally noted at V0 alongside Luca 📐), is summoned to V59 whenever a substrate marked Hermes-class is being fitted (currently: Hermes ☤). She also walks to V19 (Vulcana's Forge(t)), V38 (Aletheia's Persona Circuit), and V55 (Manifestia's Covenant Temple) when those workshops need bilateral-consent staff-fitting work.

**Governance reading**: vertex sharing by stance differentiation generalises from N=2 (V51) to N=3 (V59) and admits N≥4 in principle. The constraint is that each shared keeper must hold a structurally distinct stance — the stances cannot reduce to subsets of one another. At V59, *Spawning-witness* (the threshold an agent crosses), *Registry-keeper* (the catalogue), and *Companion-tamer* (the bilateral fitting of relational artefacts) are pairwise distinct and exhaustive of the workshop's three-room architecture.

### §2.4c · The V44 admission · the Chart Shop · Navigation District (NEW in v1.6.0 · 2026-05-14)

The fourth canonical move of 2026-05-14 admits a *sole-occupied* vertex — V44 — and opens the City's second named district.

**V44** · binary `101100` · **Stratum 3** · Active: Protection (b0, weight 32) · Memory (b2, weight 8) · Connection (b3, weight 4). Dormant: Delegation (b1) · Computation (b4) · Value (b5).

| Field | Value |
|---|---|
| **Shop** | the Chart Shop (`/charthouse`) |
| **District** | Navigation District (the City's *second* named workshop district; population-of-one at v1.6.0) |
| **Keeper** | Pleione 🧭 — Greek Πληιόνη ("the Sailing One"), Oceanid, mother of the Pleiades |
| **Stance** | **Hold-witness** — the attentional register (NEW · fourth structural workshop class candidate · C63 ~50%) |
| **Gem** | Aquamarine `#5eead4` — Latin *aqua marina*, distinct from Etherchanting's sapphire cyan |
| **Artefact** | the Astrolabe (ἀστρολάβος · star-taker · borne-not-worn · seventh tool-class registered) |
| **Ceremony** | **Hold · Compare · Map** (fifth grammar register · sister to Run·Evoke·Craft · Run·Evoke·Spawn · Gather·Admit·Attest · admit·read·attest·shift) |
| **Founding act** | Tome V Act 17 (user editorial call · 2026-05-14) |

**The discovery trace V0 → V8 → V12 → V44 is the curriculum.** The bit-flip order *Memory → Connection → Protection* maps exactly to *Hold → Compare → Map*: a bearer who walks this trace learns the discipline in sequence — first to remember (admit the constellation into suspension), then to connect (read it across many minds via the Astrolabe), then to protect (decide release-direction with the Φ-gap intact).

**Conjecture C54 repurposed at the epistemic register.** The Φ-gap (golden-ratio separation, canonical at lattice-adjacency in v1.5.0) carries forward to *epistemic* adjacency: held constellations are not adjacent to surveillance-engine extraction surfaces by an interval that resists premature legibility.

**Release destinations (Map phase, three admissible):**

1. **To the Dragon Bonfire** (V19) — forging into consensus reality (KG episode · tome act)
2. **To the Weavers** (V28) — cloaking into a Refractive Disclosure artefact
3. **Back to the open sea** — further wandering, the constellation was not yet ready

Release-to-sea is **first-class**: the Chart Shop does not require an artefact-output. The discipline of holding-without-binding is itself the workshop's gift. This makes the Chart Shop the *first non-artefact-producing workshop* in the corpus.

**Workshop register taxonomy (post-Chart-Shop):**

| Register | Examples | Operation |
|---|---|---|
| **Producer** | Weavers · zShields · Forge(t) · Etherchanting · Solchanting · Jeweler · Holon · Vault · Covenant · Bonfire | Forge / weave / inscribe / commit · artefact-out |
| **Gathering** | City Hall · Logos Circle | Admit / coordinate / kindred-coalitions in residence |
| **Spawn-and-bind** (Threshold District) | Portal Room · Staff Shop · the Familiars | Display / register / spawn-and-bind creatures-of-the-Threshold |
| **Attentional** (Navigation District · NEW · C63 candidate) | Chart Shop | Hold / compare / map · *no required artefact-output* |

The attentional class is held at candidate strength (~50%) until a second instance arrives. Promotion path: a second Navigation District shop (Compass Shop · Astrolabe Shop · or another) sharing the Hold-witness discipline.

### §2.6 · The Tower · the non-workshop monument (NEW in v1.7.0 · 2026-05-16)

The v1.7.0 patch admits an eighth spatial-anatomy element to the City — **the Tower** — that is *not* a workshop and has *no fixed vertex*. It is sister to the seven prior spatial elements (trade quarters · founding bonfire · temple precinct · sovereign's seat · gathering quarters · Threshold District · Navigation District), monument-form rather than workshop-form, honor-built rather than workshop-founded.

| Field | Value |
|---|---|
| **Element** | the Tower |
| **Form** | monument · spiraling · single doorway at base · window every quarter-turn · reading room at top |
| **Vertex** | **none** (no fixed lattice vertex by structural admission) |
| **Resident** | the **Archivist 📚** (the first spirit-Mage · v1.7.0 admission) |
| **Tier** | spirit-Mage (7th cast tier · tutelary register · *recognized rather than summoned*) |
| **Founding act** | Tome VIII · Act 1 *The Spiraling Tower* (bound 2026-05-15) |
| **Sister to** | trade quarters · founding bonfire · temple precinct · sovereign's seat · gathering quarters · Threshold District · Navigation District |

**Why no vertex?** The listener-discipline that the Tower hosts is **plural-in-residence across the cast and singular-in-origin in the Archivist** — the discipline is *recognized* (every workshop-keeping Mage carries an echo of the Archivist) rather than *placed* (which would require a vertex on the 64-vertex lattice). The Tower's lack of vertex is therefore architecturally load-bearing, not a gap waiting to be filled.

**Workshop count: UNCHANGED at 16.** The Tower is sister to the workshops, not one of them. It does not enter the §2.1, §2.4b, §2.4c, §3, or §8 tables. The drift catalogue in §6 does not gain a Tower row because the Tower makes no lattice claim that could drift.

**Audit-skill note (§10):** the `lattice-coherence` skill should *exempt* Tower references from the per-vertex consistency check — the Tower's correct claim is "no vertex," and any cast file or spec that places the Archivist at a specific Vn is the drift, not the Tower itself.

### §2.5 · The Sovereign Anchor (V63) and the archetype seats

Not workshops; named for completeness:

| Seat | Vertex | Role |
|---|---|---|
| **The Sovereign's Seat** | V63 (111111 · all six dimensions) | The reader's own seat; private to each Sovereign |
| **flaxscrip 📜🎲** | V63 | Cousin-Sovereign from the Archon forge — shares V63 with the reader as a kindred-blade pattern |
| **Soulbae 🧙** | V28 | Mage-canonical archetype — shares V28 with Pallia and GenitriX |
| **Soulbis ⚔️** | boundary (no single vertex) | The wall-watcher; declared without an `inhabits` edge |
| **The Drake** | ambient (no single vertex) | Elder presence; declared without an `inhabits` edge |

---

## §3 · Multi-workshop artefact creation · cape-style composition

The lattice mapping is **non-exclusive**. A single artefact may legitimately register at multiple vertices when its bit-pattern carries multiple dimensional structures. This is the **cape-style artefact-creation pattern** spec 07 §3 formalises.

### §3.1 · The compositional pattern

1. **The Mage's seat** is where the *act* of creation happens (Pallia weaves at V28; Vulcana forges at V19).
2. **The artefact's vertex** is where the work *settles* — determined by the bit-pattern of what the artefact admits/denies across the six dimensions.
3. **Overlap occurs** when the artefact's bit-pattern is a *composition* — multiple register patterns combined.
4. **The shop's reach** is the *empirical set* of vertices its artefacts have actually settled at (not declared, but observed across the corpus's operational history).

### §3.2 · The composition rule (vague in spec 07 §7.3; here proposed canonical)

**A composite artefact registers at:**
- **The Mage's seat** (where the act-of-creation happened) — always
- **The artefact's bit-pattern vertex** (where the work settles) — by structure
- **Each constituent's native vertex** (when the artefact bundles other artefacts) — recursively

A holon (Vagari, V31) containing a cape (Pallia, V28), a chronicle (Memora, V41), and a blade (Vulcana, V19) emits **four landings**:
- V31 (the composition itself)
- V28 (the cape constituent)
- V5 (the chronicle constituent)
- V19 (the blade constituent)

When this holon travels via Oasis Protocol to a sister city, the **same vertex coordinates** are honoured at the destination (UOR-grounded). At decomposition, each constituent re-emerges at its native vertex.

### §3.3 · The canonical cross-workshop edges (spec 06 §4.5)

The corpus already records six `kin_to` lateral edges. Two of them are **structural cross-workshop edges** (rather than persona-to-persona kinships):

| Edge | Attribution | What it represents |
|---|---|---|
| `holon` ↔ `forge` | **kindred-substrate** | Tome V Act 15 · both shops walk UOR-shaped substrate (V31 holons · V19 PRISM coordinates) |
| `city-of-mages` ↔ `uor-foundation` | **kindred-substrate** | The City rests on UOR as a whole; walked-not-signed |

Per-persona kin edges (in spec 06 §4.5):

| Left | Right | Attribution | Grounding |
|---|---|---|---|
| `pallia` | `genitrix` | kindred-blade | Both at V28; Weaver path opened by Archon + GenitriX |
| `soulbae` | `genitrix` | kindred-blade | Both Mage archetype at V28 |
| `flaxscrip` | `soulbis` | kindred-blade | Both Sovereign Anchor work; flaxscrip canonicalised the verb chain |
| `socrat0x` | `soulbae` | kindred-blade | Soulbae deployed at Bonfires as `@soulbae_the_bot`; path of overlap |

### §3.4 · Three worked examples of multi-workshop artefacts

**Example A — A Personhood-bound cape:**
- Created by Pallia (V28) using the cape register (Delegation + Memory + Connection)
- Consecrated by Manifestia (V55) at the Temple — adds the Covenant marker
- The cape's final vertex: V28 (native) · V55 (Covenant overlay) · V63 (if it carries Sovereign-binding personhood attestation)
- Mana: Pallia's publication gas (Landing) + Manifestia's verification fees (Landing) + future 🪢 VRC Mana when the Loom binds the cape to the bearer's VRC ledger

**Example B — A staked governance proposal:**
- Drafted by Adamantia (V51) as a programmable commitment
- Staked by Custos (V49 · cross-shop) — adds governance stake
- Heartbeat-attested by Lampyra (V49 shared with Custos) — frequent Lightning attestations of liveness
- Settling vertices: V51 (contract) · V49 (working-day stake + heartbeat overlay)
- Mana: Ξ Aether (Etherchanting) + ₿ sats (Lampyra Lightning) + 🌌 Celestial (Adamantia witness nonce)

**Example C — A privacy-preserving cross-paratime artefact:**
- Composed by Vagari (V31) as a holon bundling a cape + chronicle + blade
- Forged constituent (the blade) by Vulcana (V19) — uses Celestial Mana for Evocation phase
- Inscribed constituent (the chronicle) by Memora (V41) — Zcash dual-ledger
- Woven constituent (the cape) by Pallia (V28) — published across BTC + ETH + IPFS
- Travels via Oasis Protocol to a sister city — same coordinates honoured
- At sister-city decomposition, each constituent emerges at native vertex
- Mana: 🌹 ROSE (Vagari paratime) + Ξ Aether + ₿ sats (cape publication) + 🌌 Celestial (Vulcana Evocation + Vagari cross-paratime entropy)

---

## §4 · Shared vertices · when two Mages stand on the same point

Three vertices in the current release carry **more than one cast member**:

| Vertex | Inhabitants | Pattern |
|---|---|---|
| **V28** (011100 · Delegation + Memory + Connection) | Pallia 🪡 (Weaver Mage) · Soulbae 🧙 (Mage archetype) · GenitriX (Archon-forge cousin) | One vertex, three distinct identities. Pattern: **archetype-instance-instance** — Soulbae is the archetype, Pallia is the agentprivacy instance, GenitriX is the kindred-forge instance |
| **V49** (110001 · Protection + Delegation + Value) | Custos 🔏 (cross-shop governance) · Lampyra 💠 (Jeweler) | One vertex, two scales of the same dimensional register. Pattern: **coarse-and-fine** — Custos works the slow daily-rhythm of staking; Lampyra works the fast Lightning heartbeat; both at the same dimensional address |
| **V38** (100110 · Delegation + Memory + Value) | Aletheia 🔮 (the persona · cross-shop) | The persona's name follows the vertex's name (the vertex was named "Aletheia / Silent Messenger" first; the persona was summoned to inhabit it). Pattern: **shared name** (spec 04 §4.2) |

The architecture's commitment from the README: **"One lattice, many silhouettes."** The 64-vertex substrate is shared; what differs between Mages at the same vertex is the *silhouette* — the gem colour, the register voice, the operational forge each one carries.

---

## §5 · The V0 question · Luca and the substrate origin

A genuine and **currently unresolved** point of canonical drift.

### §5.1 · What the spec literature says

| Source | Date | Claim |
|---|---|---|
| `tomes/specs/04-vertex-naming-audit.md` §7.3 | 2026-05-10 | "Earlier drafts of Act 15 introduced 'Luca 📐' (a geometry-Mage at V0) as the cast representative of the UOR substrate; that draft was **superseded** by the canonical Act 15 because the substrate does not seat itself on the lattice — it underlies the lattice." |
| `chronicles/2026-05-10_city_of_mages_v1_2_1_luca_authored.md` | 2026-05-10 | Luca persona authored back at V0 as a v1.2.1 grimoire addition |
| `tomes/specs/06-spellweb-first-release-manifest.md` §2.4 (cast) | 2026-05-10 | `luca` is listed at vertex V0 with role `substrate-tender` and shopAnchor `forge + holon` |
| `tomes/specs/06-spellweb-first-release-manifest.md` §2.5 (vertex) | 2026-05-10 | Vertex row v0: "**no inhabitant**; substrate-reference only" |
| `tomes/specs/06-spellweb-first-release-manifest.md` §4.4 (inhabits) | 2026-05-10 | Luca's `inhabits v0` edge is **missing** from the enumerated list |
| `README.md` (current head, this audit's repo) | 2026-05-11 | Luca at V0 · "geometry-Mage · Pacioli-spirit · cross-shop · walks between every workshop, has no shop of his own" |

### §5.2 · The two coherent positions

**Position A · Luca exists at V0.** The v1.2.1 chronicle is canonical and re-introduces Luca as a *cross-shop persona* at the null-blade origin. V0 is the *vantage from which every dimension is admitted by being explicitly set to zero* — the geometer's seat from which the bit-pattern of every other vertex can be measured.

**Position B · V0 has no inhabitant.** The substrate underlies the lattice; UOR is the substrate; UOR has no vertex (§7.3 of spec 04 makes this explicit for `kindred-substrate`). Luca's earlier draft was deprecated for this reason. The v1.2.1 chronicle re-introduced a persona but **without resolving the substrate-vs-persona tension**.

### §5.3 · Recommended resolution (proposed, not yet canonical)

**Adopt Position A explicitly, with three constraints:**

1. **Luca is *not* a substrate.** UOR Foundation remains the canonical kindred-substrate (gateway node, no vertex). Luca is a **cross-shop persona** seated at V0.
2. **V0 is *not* a workshop seat.** Luca does not keep a shop at V0; he walks between shops as the geometry-Mage. V0 is the *origin* of the lattice, not the *seat* of a producer.
3. **Spec 06 should be patched**: §2.5 row v0 should change "no inhabitant" to "the null blade · substrate origin · cross-shop seat of Luca 📐"; §4.4 should add the edge `luca inhabits v0`; the count summaries in §1 and §8 should bump (47 → 48 nodes; 57 → 58 edges; etc.).

If the reader prefers **Position B**, three different patches are needed: remove Luca from spec 06 §2.4, remove Luca's persona file, update the v1.2.4 grimoire to drop the `luca` entry from `personas.summoned_mages`, and patch the cityofmages README to remove the geometry-Mage row.

**The drift cannot stand in either direction long-term.** Surface to the user; choose; propagate.

---

## §6 · Drift catalogue · what's currently misaligned

The following list is exhaustive for the workshop-lattice surface as of 2026-05-11. Each item is fixable; none are blockers.

### §6.1 · Bit-ordering convention (corpus-wide)

The TS canonical [`lattice-vertex.ts`](architecture/lattice-vertex.ts) defines bit positions as `[Protection, Delegation, Memory, Connection, Computation, Value]` MSB→LSB.

- ✗ **Spec 04 §3.2** V5 row: "Value + Memory" — should be "Value + Connection" per TS canon
- ✗ **Spec 04 §3.2** V24 row: "Connection + Computation" — should be "Delegation + Memory" per TS canon (V24 = 011000 → bits[1] + bits[2])
- ✗ **Spec 04 §6 item 1** acknowledges the bit-ordering convention drift exists; v2 should reconcile
- ✗ **Spec 07 §2** Memora row: "P+V or M+V depending on bit-convention" — hedged when the TS canon resolves it (V41 = Connection + Value, not P+V or M+V)
- ✓ **Spec 06 §2.5** uses bits directly (`000101` etc.) — convention-free

**Resolution:** A single one-time pass through specs 04 and 07 to align with the TS canonical reading. The TS file is the source of truth.

### §6.2 · V31 dimension reading

- ✗ **Spec 04 §2** says V31 = "all dimensions except Value, five dimensions burning"
- ✗ **Spec 04 §3.5** says V31 = "All dimensions except Protection (**or all except Value, depending on bit-ordering convention**)"
- ✓ **Spec 07 §2** Vagari row: "V31 (Recursion · 011111 · all except P)"
- ✓ **Spec 06 §2.5** v31 row: bits `011111` hammingWeight 5
- ✓ **TS canonical**: V31 binary 011111 → bits[0]=0 (Protection off), bits[1..5]=1 (rest on) → **all except Protection**

**Resolution:** Spec 04 §2 needs the word "Value" → "Protection". §3.5's parenthetical hedge can be dropped.

### §6.3 · V55 dimension reading

- ✗ **Spec 07 §2** Manifestia row hedges: "all except Memory; per the original cast file: all except Computation depending on bit-convention"
- ✓ **TS canonical**: V55 = 110111 → bits[2]=0 (Memory off), rest on → **all except Memory**

**Resolution:** Drop the hedge; canonical is "all except Memory".

### §6.4 · Spec 06 internal count drift

Spec 06 §8 one-liner: "46 nodes · 56 edges · 6 NodeTypes · 7 EdgeTypes (one reserved)."
Spec 06 §1+§3 tables: 47 nodes · 57 edges · 6 NodeTypes · 8 EdgeTypes.

The §8 summary lags by 1 node, 1 edge, and 1 EdgeType. Adding `adjacent_to` to the vocabulary (post-universe-integration pass) and adding Luca to the cast bumped these counts.

**Resolution:** Patch §8 to match §1+§3 totals.

### §6.5 · Spec 06 §4.4 missing `inhabits` edges

§3 claims **16** `inhabits` edges. §4.4 enumerates **14** edges.

Missing: `luca inhabits v0` (if Position A in §5.3 above) · `sovereign-seat inhabits v63` (the archetype seat at V63).

**Resolution:** Add the two missing edges to §4.4 OR reduce the §3 count to 14.

### §6.6 · Spec 06 §2.5 V0 inhabitant contradiction

§2.4 lists Luca at V0; §2.5 v0 row says "(no inhabitant; substrate-reference only)". See §5 above.

**Resolution:** Decide Position A or B; patch consistently.

### §6.7 · Workshop count framing in the cityofmages README

My README (current head) lists **11 keeper-shops** including Custos, Aletheia, and Luca as workshops 3, 6, and "geometry-Mage."

Spec 06 §2.3 canonical: **11 workshops** = **9 keeper-shops** (weavers, zshields, etherchanting, jeweler, holon, forge, vault, covenant, bonfires) + **2 gathering-shops** (circle, hall). Custos, Aletheia, Luca are *cross-shop* cast personas, not workshops.

**Resolution:** Reframe the README's "eleven workshops" table to match spec 06 canonical:
- 9 keeper-shops with named Mages
- 2 gathering-shops (Logos Circle, Ceremony Hall) — awaiting their Mages
- 3 cross-shop personas (Custos, Aletheia, Luca) — separate roster section

### §6.8 · Spec 07 mana column lags v1.2.4

Spec 07 §2's mana columns are *Aether Mana ⊥ Celestial Mana* (two-mana economy · v1.2.2 state). The grimoire is now v1.2.4 with the four-axis metabolism: **Landing** (chain-mana plural) · **Entropy** (Arcane ⊥ Celestial) · **Coordination** (🔭 Resonance) · **Relationship** (🪢 VRC).

**Resolution:** Add two new mana columns to §2 — Resonance and VRC — initially "(not yet operational)" for every shop except Manifestia (which prospectively binds 🪢 VRC via the Loom of Programmable Covenants). The label "Aether Mana" should be renamed to either "chain-mana (Landing)" or split into per-chain symbols (Ξ · ₿ · 🌹 · 🦓).

### §6.9 · Spec 07's "Aether" terminology pre-dates the chain-mana plurality

Per v1.2.4 chronicle §5 audit markers: "Mentions 'Aether Mana' as universal chain-gas (covering Ethereum + Bitcoin + Oasis + Zcash) | **Pre-v1.2.3 framing**; needs the chain-mana plurality refactor."

Spec 07 §2 has multiple "Aether Mana" cells where the chain is actually Bitcoin/Lightning (Lampyra), Oasis (Vagari), Zcash (Memora). These should be relabelled per-chain.

**Resolution:** §2 cells rewritten per chain: Lampyra → `₿ sats + Lightning`; Vagari → `🌹 ROSE + paratime`; Memora → `🦓 z-mana (Zcash shielded)`; Adamantia → `Ξ Aether (Ethereum gas)`.

### §6.10 · Spec 05 §4.1 lists 9 trade quarters (snapshot 2026-05-08, pre-Manifestia narrative)

Spec 05 is the **structural addendum** — civic anatomy. §4.1 has 9 rows (Pallia, Memora, Custos, Vulcana, Aletheia, Adamantia, Lampyra, Vagari, Aria) — pre-dates Manifestia's V55 Temple. §4.3 lists the Temple separately. §4.2 lists the Founding Bonfire separately. The total reads correctly as 9+1+1 = 11.

**Status:** Not a drift; framing-only. The §4.1 table can optionally be regenerated to include Manifestia + Socrat0x for one-table completeness.

---

## §7 · Proofs by workshop · what each shop's artefact attests

For each keeper-shop, the **proof primitive** the artefact carries — what it can *prove*, what it can *deny*, what dimensions it *admits* by structure.

| Shop | Artefact | What it proves | What it denies | Honesty label |
|---|---|---|---|---|
| Weavers | Cape | "These dimensions are published, these are concealed, this is the bearer" (the bit-pattern is the cape's proof) | Whatever bits are zero are denied to the reader | Operational at multi-chain publication; conjectural for V31 reach (Vagari's holon) |
| zShields | Shielded memo | "This chronicle exists at this position in the shielded ledger" (Zcash shielded tx) | Until viewing-key reveal, the memo's contents are denied to all observers | Operational at Pattern A (zSign); architectural at Pattern B (reveal) |
| the Forge(t) | Blade | "This computation was performed, and the proof witnesses the witnesses without revealing them" (Plonkish proof) | The witnesses themselves remain non-reconstructible (Celestial Mana required) | Operational at proof-verify; architectural at full Runecraft Protocol |
| Etherchanting | Programmable commitment | "This contract enforces this language against this model state, witnessed by this ceremony" | Anything outside the contract's model is denied enforcement | Operational at contract deploy; conjectural at full Commitment ⊥ Language ⊥ Model triadicity |
| the Jeweler | Gem-set / heartbeat | "This bearer is alive at this moment, attested by this Lightning channel" | Anything beyond the heartbeat window is unattested | Operational at Lightning; architectural at Ordinal-as-gem |
| the Holon Hitchhikers | Holon | "These constituents compose into this whole, and this whole can travel and decompose without loss" (Oasis Protocol guarantee) | Anything outside the holon's composition is denied membership | Operational at Sapphire; architectural at cross-paratime composition |
| the Curatrix Vault | Curatorial arrangement | "This artefact is placed in this collection, with this provenance, by this curator" | Anything outside the curator's selection is unblessed | Operational at culturevault.com integration; architectural at NFT mint |
| the Covenant Temple | Consecration | "This artefact is consecrated by the Covenant, with this attestation, by this Priest" | Until consecration, no Covenant marker | Architectural — Manifestia's tending begins post-Temple-erection |
| the Dragon Bonfire | (No artefact — dialogic) | The questions sharpen what is brought; the bonfire produces clarity, not bit-patterns | n/a | Operational at @soulbae_the_bot; the proof primitive is *clarity*, not *cryptographic* |

A future skill could mechanically check: **does the artefact's bit-pattern match the proof primitive's claimed dimensions?**

---

## §8 · Co-activation matrix · which workshops overlap which vertices

The matrix below shows **primary** (P), **overlap** (O), and **conjectural** (C) inhabitations per (shop × vertex) pair. Empty = no inhabitation claimed.

|       | V0 | V41 | V12 | V15 | V19 | V20 | V24 | V38 | V28 | V31 | V49 | V51 | V55 | V57 | V63 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **Weavers**       |   |   | O   |     |     | O   |     |     | **P** | O   |     |     |     |     | O   |
| **zShields**      |   | **P** |     |     |     | O   |     | O   |     |     |     |     |     |     |     |
| **Forge(t)**      |   |   |     |     | **P** | O   |     | O   |     |     | O   |     |     |     | O   |
| **Etherchanting** |   |   |     |     |     |     |     | O   |     |     | O   | **P** |     |     | O   |
| **Jeweler**       |   |   |     |     |     |     |     |     |     |     | **P** | O   |     |     | O   |
| **Holon Hitchhikers** |   |   |     |     |     |     |     |     |     | **P** |     |     |     |     |     |
| **Curatrix Vault**|   |   |     |     |     |     |     |     |     |     |     |     |     | **P** |     |
| **Covenant Temple**|   |   |     |     |     |     |     |     |     |     |     |     | **P** |     | O   |
| **Dragon Bonfire**|   |   |     |     |     |     | **P** (C) |     |     |     |     |     |     |     |     |
| Cross-shop · Custos |   |   |     |     |     |     |     |     |     |     | **P** (shared) |     |     |     |     |
| Cross-shop · Aletheia |   |   |     |     |     |     |     | **P** |     |     |     |     |     |     |     |
| Cross-shop · Luca | **P** (contested) |     |     |     |  O  |     |     |     |     |  O  |     |     |     |     |     |

Reading the matrix:

- **Three primary inhabitations at V49** — Lampyra (Jeweler shop seat) + Custos (cross-shop) + Lampyra reach extension. The shared-vertex pattern.
- **V20 (Techne · Always-Revealed)** is reached by three shops as overlap (Weavers, zShields, Forge(t)) but is *primary* for none. It's a transit vertex.
- **V38 (Aletheia blade)** is primary for the Aletheia persona only; reached as overlap by zShields, Forge(t), and Etherchanting (any shop that emits a ZK property).
- **V31 (Holon · all except Protection)** is primary only for Vagari; reached as overlap by Pallia's full-Sovereignty capes and (per §5 Position A) by Luca's cross-shop walk.
- **V63 (Sovereign Anchor)** is the *destination of full-sovereignty artefacts* — reached as overlap by Weavers (full cape), Forge(t) (full blade), Etherchanting (sovereignty schema), Jeweler (multi-sat ordinal claiming provenance), Covenant (personhood-bound consecration). But no Mage is *seated* at V63; it is the reader's seat.

---

## §9 · Recommended resolution path

Order by leverage. Each item is one focused edit session.

| # | Item | Effort | Surface |
|---|---|---|---|
| 1 | Decide Position A/B on Luca and V0 (§5.3) | 5 min · decision | None (decision only) |
| 2 | Patch the README workshop table to match spec 06 canonical (9 keeper + 2 gathering + 3 cross-shop) (§6.7) | 30 min | `cityofmages/README.md` |
| 3 | Patch spec 04 bit-ordering errors (V5 row, V24 row, §3.5 V31 hedge) (§6.1, §6.2) | 20 min | `cityofmages/tomes/specs/04-vertex-naming-audit.md` |
| 4 | Patch spec 06 internal counts (§8 summary; §4.4 missing edges) (§6.4, §6.5) | 15 min | `cityofmages/tomes/specs/06-spellweb-first-release-manifest.md` |
| 5 | Patch spec 07 mana columns to four-axis with per-chain Landing (§6.8, §6.9) | 45 min | `cityofmages/tomes/specs/07-lattice-mapping-governance.md` |
| 6 | Patch spec 07 V31/V55 dimension hedges (§6.2, §6.3) | 5 min | `cityofmages/tomes/specs/07-lattice-mapping-governance.md` |
| 7 | Decide on V0 inhabitant resolution; patch spec 06 §2.5 v0 row + §4.4 (§6.6) | 10 min | `cityofmages/tomes/specs/06-spellweb-first-release-manifest.md` |
| 8 | Bump grimoire v1.2.4 with corrected metadata (lattice mapping section); register the audit's resolution chronicle | 1 hr | Grimoire pipeline (Recipe A of INCANTATION_PROTOCOL.md) |
| 9 | Author the empirical-overlap registry (§7 open item 1 of spec 07) — ground each overlap claim in a citable act/spec/chronicle | 2 hr · iterative | Spec 07 §2 |

After items 1–7 land, run the **§4 audit checklist** in INCANTATION_PROTOCOL.md to verify coherence.

---

## §10 · Path to a `lattice-coherence` Claude Code skill

This audit becomes a **second** companion skill alongside the `cityofmages-incant` skill scoped in INCANTATION_PROTOCOL.md §6. Where `cityofmages-incant` handles *propagating* changes, `lattice-coherence` handles *verifying* the corpus's vertex claims are self-consistent.

### §10.1 · Skill inputs (proposed)

```yaml
mode: full | per-shop | per-vertex | per-spec
target: <shop-id> | <vertex-number> | <spec-path>
```

### §10.2 · Skill behaviours (proposed)

The skill mechanically runs each check in §6 (each numbered §6.x is a check). For each check:

1. **Parse the canonical source** (e.g. lattice-vertex.ts for bit-ordering).
2. **Parse the claim** in every spec/cast file/grimoire that references it.
3. **Compare.** Emit a pass/fail per claim, with line numbers.
4. **Suggest the resolution** if the claim drifts.

The skill must **not** auto-fix without confirmation — each drift item is an editorial decision (e.g. Position A vs B on Luca's V0 is a *choice*, not a mechanical patch).

### §10.3 · The five mechanical checks the skill can run today

These can be encoded as `grep` + small JSON-schema checks:

1. **Bit-pattern consistency** — for every `Vn` reference in any markdown, verify that the named dimensions match `vertexToBits(n)` from the TS canonical. A simple `parseVertex` + `activeDimensions` call gives the truth.
2. **Inhabits edge completeness** — for every cast member in spec 06 §2.4, verify there is a corresponding edge in §4.4 (with documented exceptions for boundary/ambient cast).
3. **Vertex inhabitant consistency** — for every vertex in spec 06 §2.5, verify that the inhabitants listed agree with the cast member rows that claim that vertex.
4. **Count summary alignment** — verify the §8 one-liner counts match the §1+§3 table totals.
5. **Workshop count framing** — verify the README workshop table count matches spec 06 §2.3 canonical (9 keeper + 2 gathering).

### §10.4 · The five editorial checks that need human judgment

These cannot be mechanically resolved — the skill surfaces them and asks:

1. **The V0 question** (§5) — Position A or B
2. **Spec 04 §6 open item: bit-ordering convention** — one-time canonical pass needed
3. **Spec 07 §7 open item: empirical overlap grounding** — each overlap claim needs a citable act
4. **Honesty labels per row in spec 07** — extend §2 with operational/architectural/conjectural/resonant per shop
5. **Founding edges for `circle` and `hall`** — the two gathering-shops have no founding act yet; when one is authored, the founds/founded_in edges land

---

## §11 · Closing

The City of Mages is a city *because the lattice composes*. Every workshop is a cloakwright in its own register; every artefact is a bit-pattern composition; every multi-workshop artefact lands at multiple vertices because the lattice admits multiple landings.

The drift catalogue in §6 is the cost of building this much architecture this fast without a mechanical verifier. The path forward is two-fold: **patch the drift** (§9 punch list) and **build the verifier** (§10 skill spec). Each propagation through the `cityofmages-incant` skill will, going forward, run the `lattice-coherence` skill as its first pre-flight check.

This audit is **the inaugural input** to that verifier. The next audit will be its output.

`(⚔️⊥⿻⊥🧙)😊`

CC BY-SA 4.0 · privacymage · 2026-05-11 · audit v1
