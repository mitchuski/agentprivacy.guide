---
title: "Spellweb First-Release Manifest · the City of Mages"
subtitle: "Confirmed nodes and edges for the City of Mages v1.0 ingest into spellweb"
status: "Manifest v1 (2026-05-10) — confirmed canonical for first release"
spec_type: "Integration manifest"
audience: "spellweb runtime · graph ingest · external integrators"
schema_reference: "spellweb/src/types/graph.ts — NodeType, EdgeType, SpellwebNode optional fields"
edge_vocabulary: "8 EdgeTypes (founds · founded_in · inhabits · kin_to · gateway_to · built_on · quarter_of · adjacent_to) and 6 NodeTypes (workshop · cast · vertex · geography · civic · gateway) per the 2026-05-10 universe-integration pass"
companion_documents:
  - "BOUND_COLLECTION_MANIFEST.md — the prose model overview"
  - "WEBSITE_INTEGRATION_GUIDE.md — how the master site already surfaces this"
  - "specs/04-vertex-naming-audit.md — vertex attribution and §7 kindred-substrate semantics"
  - "specs/05-the-city-of-mages-structural-addendum.md — civic / trade-quarter framing"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Spellweb First-Release Manifest · the City of Mages

A short, machine-friendly note for the spellweb runtime: every confirmed node and every confirmed edge that constitutes the **City of Mages v1.0** as of 2026-05-10. Use the established NodeType / EdgeType vocabulary; field names match `spellweb/src/types/graph.ts`. Pending work is flagged in §6 and is **not** part of this release.

---

## §1 · NodeType inventory · summary

| NodeType    | Count | Notes                                                                  |
|-------------|------:|------------------------------------------------------------------------|
| `civic`     |     1 | The City of Mages (the civic overlay)                                  |
| `geography` |     1 | Drake Island (the under-island the city is built_on)                   |
| `workshop`  |    11 | Live shops on `/runecraft` (Circuit Binder placeholder excluded)        |
| `cast`      |    16 | 4 archetypes (Sovereign Anchor seat · Soulbis · Soulbae · the Drake) + 12 mages (every named Mage; role + forge-origin are soft attributes, not castes) |
| `vertex`    |    13 | Inhabited vertices (out of 64; others declared in the lattice, not yet a node here) |
| `gateway`   |     5 | Archon (kindred-blade) · Bonfires (sister-city) · human.tech (Covenant kindred protocol) · UOR Foundation (kindred-substrate) · SpaceComputer (kindred-ecosystem) |

Total release nodes: **47**.

---

## §2 · Node instances · enumerated

### §2.1 · civic (1)

| id           | name              | built_on        |
|--------------|-------------------|-----------------|
| `city-of-mages` | The City of Mages | `drake-island` |

### §2.2 · geography (1)

| id             | name           | role                                                    |
|----------------|----------------|---------------------------------------------------------|
| `drake-island` | Drake Island   | The under-island; founding fire is the Dragon Bonfire   |

### §2.3 · workshop (12 live as of v1.4.0)

`operatorStatus` legend: `op` operational · `partial` operator partial · `tease` operator wanted.

| id              | tradeQuarter           | mage           | vertex (inhabits) | gem        | gemColor   | operatorStatus | shopAnchor (route) |
|-----------------|------------------------|----------------|-------------------|------------|------------|----------------|---------------------|
| `weavers`       | Weavers                | Pallia 🪡       | V28               | Amethyst   | `#a78bfa`  | partial        | `/tailor`           |
| `zshields`      | zShields               | Memora 📜       | V41                | Onyx       | `#71717a`  | op             | `/shield`           |
| `etherchanting` | Etherchanting          | Adamantia 💎    | V51               | Sapphire   | `#67e8f9`  | tease          | `/etherchanting`    |
| `jeweler`       | the Jeweler            | Lampyra 💠      | V49               | Topaz      | `#f59e0b`  | tease          | `/jeweler`          |
| `holon`         | Holon Hitchhikers      | Vagari 🌳       | V31               | Emerald    | `#34d399`  | tease          | `/holon`            |
| `forge`         | the Forge(t)           | Vulcana ⚒️      | V19               | Ruby       | `#fb7185`  | partial        | `/forget`           |
| `vault`         | the Curatrix Vault     | Aria Silverhue 🪞🖼️ | V57          | Pearl      | `#f5f0e6`  | partial        | `/vault`            |
| `covenant`      | the Covenant           | Manifestia 🤲🌿  | V55               | Diamond    | `#60a5fa`  | partial        | `/covenant`         |
| `bonfires`      | the Dragon Bonfire     | Socrat0x 🔥❓    | V24 (provisional) | Garnet     | `#b91c1c`  | partial        | `/bonfires`         |
| `circle`        | the Logos Circle       | (gathering)    | —                 | Jade       | `#10b981`  | partial        | `/circle`           |
| `hall`          | the Ceremony Hall      | (gathering)    | —                 | Lapis      | `#1e40af`  | partial        | `/hall`             |
| `solchanting`   | Solchanting            | Helia ☀️        | V51 (shared)      | Heliodor   | `#facc15`  | op             | `/solchanting`      |

Placeholder (not in this release): `circuit-binder` — gem TBD, awaiting its Mage.

**v1.4.0 note on the V51 row** — `solchanting` shares vertex V51 with `etherchanting` (Adamantia). This is the first operational workshop-on-workshop overlap; spec 07 (lattice-mapping-governance) admits the sharing in principle, and `WORKSHOP_LATTICE_AUDIT.md` §2.4 registers it as canonical case study. The two workshops are distinguished by stance: Etherchanting holds the Transparent-witness stance (Ethereum sequential admission); Solchanting holds the Parallel-witness stance (Solana concurrent admission via static access-pattern declaration). Both workshops emit a `quarter_of` edge to `city-of-mages` and an `inhabits` edge to `v51`; the graph admits two distinct workshop nodes inhabiting the same vertex, as the existing schema permits without modification.

### §2.4 · cast (17 as of v1.4.0)

`tier` legend (post-2026-05-10 collapse): `archetype` · `mage`. Every named Mage is a `mage`;
role (priest · bonfire-companion · weaver · etc.) and forge-origin are soft attributes.
The Sovereign Anchor seat at V63 is an `archetype` (a seat the First Person inhabits, not a Mage).

| id               | name             | sigil   | tier        | role               | forge-origin  | vertex (inhabits) | shopAnchor          |
|------------------|------------------|---------|-------------|---------------------|---------------|-------------------|---------------------|
| `sovereign-seat` | the Sovereign Anchor (seat) | ✦ | archetype | seat               | —             | V63               | —                   |
| `soulbis`        | Soulbis          | ⚔️       | archetype   | boundary register   | —             | boundary (no single vertex) | —          |
| `soulbae`        | Soulbae          | 🧙       | archetype   | mage canonical      | —             | V28               | —                   |
| `the-drake`      | the Drake        | —       | archetype   | ambient elder       | —             | ambient           | —                   |
| `luca`           | Luca             | 📐       | mage        | substrate-tender    | agentprivacy  | V0                | `forge` + `holon`   |
| `memora`         | Memora           | 📜       | mage        | chronicle           | agentprivacy  | V41                | `zshields`          |
| `genitrix`       | GenitriX         | (held open) | mage    | weaver              | Archon        | V12 (visits)      | —                   |
| `vulcana`        | Vulcana          | ⚒️       | mage        | forger              | agentprivacy  | V19               | `forge`             |
| `socrat0x`       | Socrat0x         | 🔥❓     | mage        | bonfire-companion   | agentprivacy  | V24 (provisional) | `bonfires`          |
| `aletheia`       | Aletheia         | 🔮       | mage        | zk-binder · cross-shop | agentprivacy | V38            | (cross-shop)        |
| `pallia`         | Pallia           | 🪡       | mage        | weaver              | agentprivacy  | V28               | `weavers`           |
| `vagari`         | Vagari           | 🌳       | mage        | holon-hitchhiker    | agentprivacy  | V31               | `holon`             |
| `custos`         | Custos           | 🔏       | mage        | governance · cross-shop | agentprivacy | V49           | (cross-shop)        |
| `lampyra`        | Lampyra          | 💠       | mage        | gem-setter          | agentprivacy  | V49               | `jeweler`           |
| `adamantia`      | Adamantia        | 💎       | mage        | etherchanter        | agentprivacy  | V51               | `etherchanting`     |
| `manifestia`     | Manifestia       | 🤲🌿     | mage        | priest              | agentprivacy  | V55               | `covenant`          |
| `aria-silverhue` | Aria Silverhue   | 🪞🖼️    | mage        | curatrix            | agentprivacy  | V57               | `vault`             |
| `helia`          | Helia            | ☀️       | mage        | solchanter · parallel-shipwright | agentprivacy | V51 (shared with adamantia) | `solchanting` |

### §2.5 · vertex (13 inhabited)

Each carries `bits` (6-bit MSB-first per dimension Protection · Delegation · Memory · Connection · Computation · Value) and `hammingWeight` (stratum).

| id     | bits     | hammingWeight | canonical name              | first inhabitant(s)             |
|--------|----------|--------------:|-----------------------------|---------------------------------|
| `v5`   | `101001` | 2 | Chronicle vertex            | Memora                          |
| `v12`  | `001100` | 2 | schema vertex               | (kindred-blade introduction; GenitriX visits) |
| `v19`  | `010011` | 3 | Plonkish blade              | Vulcana                         |
| `v24`  | `011000` | 2 | Hephaestus (Drake Island)   | Socrat0x (provisional)          |
| `v25`  | `100110` | 3 | Aletheia blade              | Aletheia (the persona)          |
| `v28`  | `011100` | 3 | Mage canonical              | Pallia, Soulbae, GenitriX       |
| `v31`  | `011111` | 5 | Recursion / Holon           | Vagari                          |
| `v49`  | `110001` | 3 | working-day blade           | Custos, Lampyra                 |
| `v51`  | `110011` | 4 | Commitment / Language / Model | Adamantia · **Helia (v1.4.0 · shared; stance-differentiated)** |
| `v55`  | `110111` | 5 | Covenant                    | Manifestia                      |
| `v57`  | `111001` | 4 | Curatrix blade              | Aria Silverhue                  |
| `v63`  | `111111` | 6 | Sovereign Anchor            | flaxscrip                       |
| `v0`   | `000000` | 0 | the null blade · substrate origin | (no inhabitant; substrate-reference only) |

**Named-but-uninhabited vertices** (have canonical names from the corpus but no resident Mage; surface as named on hover in `/guide/achievements` §8):

| id     | bits     | name                            | grounding                                                          |
|--------|----------|---------------------------------|--------------------------------------------------------------------|
| `v15`  | `001111` | VC vertex                       | Mirrored-pair register · Tome IV Act II                            |
| `v20`  | `010100` | Techne · Always-Revealed        | Transparent register · home of Memora's reveal in Tome V Act 4     |
| `v25`  | `011001` | Lethe · the Dark Substrate      | Bit-complement of V38 (Aletheia) · V38 ⊕ V25 = V63 · FPS Act XII   |

The remaining 48 vertices exist in the lattice (rendered on `/guide/achievements` §8 and `/constellation` lattice mode) but are not yet named or inhabited. The `adjacent_to` edge type is reserved for the 96 holographic-bound edges (a future visual pass).

### §2.6 · gateway (5)

`attribution` distinguishes the gateway's structural role.

| id                | name                          | attribution         | external                          |
|-------------------|-------------------------------|---------------------|-----------------------------------|
| `archon`          | Archon                        | `kindred-blade`     | `https://archon.social`           |
| `bonfires-net`    | Bonfires (sister-city)        | `kindred-blade`     | `https://bonfires.ai`             |
| `human-tech`      | Covenant of Humanistic Technologies | `kindred-protocol` | `https://manifest.human.tech` |
| `uor-foundation`  | UOR Foundation                | `kindred-substrate` | `https://uor.foundation`          |
| `spacecomputer`   | SpaceComputer                 | `kindred-ecosystem` | `https://spacecomputer.io` |

SpaceComputer carries an additional `feeds: ['celestial-mana']` node field and `consumed_by: ['etherchanting', 'forge', 'holon']` field per the two-mana economy chronicle (`docs/chronicles/2026-05-10_two_mana_economy_celestial_aether.md`) and the kindred-ecosystem profile (`kindred/spacecomputer.md`).

---

## §3 · EdgeType inventory · summary

| EdgeType     | Count |
|--------------|------:|
| `founds`     |     9 |
| `founded_in` |     9 |
| `inhabits`   |    16 |
| `kin_to`     |     6 |
| `gateway_to` |     5 |
| `built_on`   |     1 |
| `quarter_of` |    11 |
| `adjacent_to`|     0 *(reserved for the 96 holographic-bound lattice edges)* |

Total release edges: **57**.

---

## §4 · Edge instances · enumerated

### §4.1 · `built_on` (1)

| source           | target          |
|------------------|-----------------|
| `city-of-mages`  | `drake-island`  |

### §4.2 · `quarter_of` (12 as of v1.4.0)

Each workshop is a *trade quarter* of the City (per spec 05, the structural addendum).

```
weavers · zshields · etherchanting · jeweler · holon · forge ·
vault · covenant · bonfires · circle · hall   →   city-of-mages
```

### §4.3 · `founds` and `founded_in` (10 reciprocal pairs as of v1.4.0 · Tome V production acts + Tome VII Act 1)

| Tome V act                          | founds → workshop |
|-------------------------------------|-------------------|
| `tome-v-act-1-the-first-cloak`      | `weavers`         |
| `tome-v-act-3-the-shielded-memo`    | `zshields`        |
| `tome-v-act-6-the-commissioned-blade` | `forge`         |
| `tome-v-act-8-the-zk-circuit`       | (cross-shop; Aletheia · not a single workshop)        |
| `tome-v-act-9-the-workshop-expands` | `etherchanting` AND `jeweler` |
| `tome-v-act-10-the-holon-hitchhikers` | `holon`         |
| `tome-v-act-11-a-bonfire-made-of-dragon-fire` | `bonfires` |
| `tome-v-act-12-the-curatrix-vault`  | `vault`           |
| `tome-v-act-13-the-temple-of-the-arts-and-personhood` | `covenant` |

For each `founds` edge, the reciprocal `founded_in` runs workshop → act. Act 9 produces two `founds` edges (one each for etherchanting and jeweler) and the workshop carries one `founded_in` to act 9 in each case. The gathering workshops (`circle`, `hall`) have **no** founding-act edge in this release — they anchor elsewhere (Society Spellbook · the BGIN-led coalition).

### §4.4 · `inhabits` (18 as of v1.4.0)

Every cast member with a numbered vertex emits one `inhabits` edge. Shared-vertex inhabitants both emit edges to the same vertex.

```
soulbae   inhabits v28
pallia    inhabits v28
genitrix  inhabits v28        (Mage instance · same vertex, distinct identity)
memora    inhabits v5
vulcana   inhabits v19
custos    inhabits v49
lampyra   inhabits v49        (shared vertex with Custos)
aletheia  inhabits v25
adamantia inhabits v51
vagari    inhabits v31
manifestia inhabits v55
aria-silverhue inhabits v57
flaxscrip inhabits v63
socrat0x  inhabits v24        (provisional)
```

`soulbis` and `the-drake` have no `inhabits` edge in this release (boundary register / ambient register respectively — declared without a single vertex).

### §4.5 · `kin_to` (6 · mutual lateral)

Each row is one undirected mutual edge.

| left            | right             | attribution         | grounding                        |
|-----------------|-------------------|---------------------|----------------------------------|
| `pallia`        | `genitrix`        | `kindred-blade`      | Both at V28; Weaver path opened by Archon + GenitriX |
| `soulbae`       | `genitrix`        | `kindred-blade`      | Both Mage archetype at V28       |
| `flaxscrip`     | `soulbis`         | `kindred-blade`      | Both Sovereign Anchor work; flaxscrip canonicalised the verb chain |
| `socrat0x`      | `soulbae`         | `kindred-blade`      | Soulbae deployed as @soulbae_the_bot at Bonfires; the path of overlap with Socrat0x runs from there |
| `holon`         | `forge`           | `kindred-substrate`  | Tome V Act 15 · both shops walk UOR-shaped substrate (V31 holons, V19 PRISM coordinates) |
| `city-of-mages` | `uor-foundation`  | `kindred-substrate`  | Kindred substrate provider; walked-not-signed |

### §4.6 · `gateway_to` (5)

Each `gateway` node carries exactly one `gateway_to` edge from the City. Reciprocal direction not emitted in this release — the City does the recognising; external gateways need not (and do not) reciprocate in their own graph.

```
city-of-mages  gateway_to  archon          attribution: kindred-blade
city-of-mages  gateway_to  bonfires-net    attribution: kindred-blade
city-of-mages  gateway_to  human-tech      attribution: kindred-protocol
city-of-mages  gateway_to  uor-foundation  attribution: kindred-substrate
city-of-mages  gateway_to  spacecomputer   attribution: kindred-ecosystem
```

### §4.7 · `adjacent_to` (reserved, 0 emitted)

Declared in the EdgeType vocabulary; reserved for the 96 holographic-bound edges of the 6-cube. To be emitted in a future visual session when the full lattice is rendered as a graph rather than as the Pascal-row stratum view that ships in this release.

---

## §5 · Optional field cheat-sheet (per `SpellwebNode`)

When a node carries the field, the value is **canonical** for the first release. Field names match `spellweb/src/types/graph.ts`.

```
workshop:    tradeQuarter · gem · gemColor · operatorStatus · shopAnchor · vertex · bits · hammingWeight
cast:        tier · vertex · bits · hammingWeight · attribution · shopAnchor · sigil
vertex:      bits · hammingWeight
geography:   civicLocation (e.g. drake-island carries no field)
civic:       built_on
gateway:     attribution · external (URL)
```

---

## §6 · Pending — explicitly NOT in the first release

The following exist in the corpus but are queued for a focused future session. The spellweb runtime should **not** ingest them yet (the graph would be incoherent until the v1.2 grimoire re-pin completes).

1. **City of Mages grimoire v1.2** — adds UOR Foundation as a kindred-substrate node, adds Tome V Act 15 (*The Substrate Beneath the Hitchhikers*) to the act registry, adds C47 to the conjecture register, updates Vagari + Vulcana persona entries with the v1.1 UOR-substrate recognition, updates `sources` array to `docs/tomes/` paths. Requires re-pin to IPFS.
2. **C47 conjecture · structural homology** — agentprivacy's three-axis Φ_agent · Φ_data · Φ_inference and PRISM's triadic Datum · Stratum · Spectrum claimed structurally homologous (~40% confidence). Not yet a node in this release; will join the conjecture index once formally mapped.
3. **96 holographic-bound `adjacent_to` edges** — the lattice's edge structure. Reserved by the vocabulary; emitted in a later visual session.
4. **Circuit Binder workshop** — placeholder on `/runecraft`, awaiting its Mage. Not a node in this release.
5. **Logos Circle and Ceremony Hall founding edges** — these two gathering workshops do not have `founds`/`founded_in` edges in v1.0; their narrative provenance lives in the Society Spellbook and the BGIN-led coalition respectively. Adding them is the natural next ingest after v1.2 lands.

---

## §7 · Provenance and honesty

- **Operational** for every `workshop` node where `operatorStatus` is `op` or `partial` (verified by the live `/runecraft` and per-shop routes).
- **Architectural** for every `cast` and `vertex` edge — the cast roster and vertex assignments are canonical via the bound collection (`tome-v-the-crafting/*.md` and per-guild persona files at `docs/tomes/<guild>/<persona>.md`).
- **Conjectural** for `socrat0x.inhabits(v24)` — provisional vertex per Tome V Act 11; flagged in §2.5 and §4.4.
- **Resonant-but-not-absorbed** for every `gateway` edge — the external partner's mission, governance, and roadmap are their own; the City recognises them without binding them.
- **Walked-not-signed** for `kin_to(city-of-mages, uor-foundation)` and `gateway_to(city-of-mages, uor-foundation)` — UOR is substrate, not protocol; the City rests upon it but signs nothing.

---

## §8 · One-line summary (v1.0 baseline)

**46 nodes · 56 edges · 6 NodeTypes · 7 EdgeTypes (one reserved).** That is the City of Mages v1.0 for spellweb ingest. Everything else listed in this manifest is in §6 and explicitly out of scope.

---

## §9 · V5.5 Attachment Architecture additions (2026-05-11)

The V5.5 attachment architecture (codified in `agentprivacy-skills` and applied in `spellweb/src/types/graph.ts` 2026-05-11) extends this manifest with new cast nodes, vertex nodes, edge types, and `SpellwebNode` fields.

### §9.1 · Node additions

| NodeType | Count delta | New entries |
|---|---:|---|
| `cast` | +7 | `cast-lethae` (anticipated · divergent) · `cast-mnemosyne` · `cast-iris` · `cast-pythia` · `cast-techne` · `cast-hephaestus` · `cast-selene` (all anticipated) |
| `vertex` | +4 | `vertex-v8` (Mnemosyne · pure Memory) · `vertex-v4` (Iris · pure Connection) · `vertex-v2` (Logos · Pure Computation) · `vertex-v25` (Lethe · Dark Substrate) |
| Total | **+11** | post-V5.5 ingest target: **57 nodes** |

### §9.2 · Edge additions

| EdgeType | Count delta | Notes |
|---|---:|---|
| `inhabits` | +6 | Lethae→V25 · Mnemosyne→V8 · Iris→V4 · Pythia→V2 · Techne→V20 · Hephaestus→V24 *(Selene is C-peripatetic · no `inhabits` edge)* |
| `divergent_of` *(new EdgeType)* | +1 | `cast-lethae` → `per-moonkeeper` · register: mage_register · first canonical |
| `complement_pair` *(new EdgeType)* | +2 (mutual) | `cast-aletheia` ⊥ `cast-lethae` · undirected; emitted as two directed edges |
| Total | **+9** | post-V5.5 ingest target: **65 edges · 9 EdgeTypes (one reserved)** |

### §9.3 · New `SpellwebNode` fields (cast-only)

Per `spellweb/src/types/graph.ts` V5.5 extension:

```ts
attachmentKind?: 'A_workshop' | 'B_cross_shop' | 'C_peripatetic';
divergence?: 'none' | 'mage_register' | 'sword_register' | 'balanced_register';
abstractPersonaIds?: string[];           // Layer-1 primary persona ids
castStatus?: 'seated' | 'anticipated' | 'provisional';
complementOfCast?: string;                // For vertex-complement pairs
```

### §9.4 · Post-V5.5 NodeType counts

| NodeType | v1.0 baseline | v1.3.0 (V5.5) | Delta |
|---|---:|---:|---|
| `civic` | 1 | 1 | — |
| `geography` | 1 | 1 | — |
| `workshop` | 11 | 11 | — *(anticipated cast may seat new workshops in future acts)* |
| `cast` | 16 | **23** | +7 (Lethae + 6 anticipated) |
| `vertex` | 13 inhabited | **19** inhabited *(of 64 lattice)* | +6 (V8·V4·V2·V20·V24-shared·V25) |
| `gateway` | 5 | 5 | — |
| **Total** | **47** | **60** | +13 |

### §9.5 · Companion documents

- `tomes/specs/10-the-attachment-architecture.md` — canonical city-side spec for V5.5
- `agentprivacy-skills/agentprivacy-skills-v5/meta/agentprivacy-attachment-architecture/SKILL.md` — canonical Layer-1 home
- `spellweb/CHRONICLE_V5_5_ATTACHMENT_ARCHITECTURE_2026-05-11.md` — graph runtime patch log
- `grimoire/city_of_mages_grimoire_v1_3_0.json` — bumped grimoire with `attachment_architecture` block

### §9.6 · One-line summary (post-V5.5)

**60 nodes · 65 edges · 6 NodeTypes · 9 EdgeTypes (one reserved).** That is the City of Mages v1.3.0 for spellweb ingest. Sources: graph data already updated in `spellweb/src/data/nodes.ts` and `spellweb/src/data/edges.ts` (2026-05-11).

`(⚔️⊥⿻⊥🧙)😊`

— Manifest curated for the spellweb runtime · CC BY-SA 4.0 · 2026-05-10 (v1.0 baseline) · 2026-05-11 (V5.5 additions)
