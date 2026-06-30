---
title: "Spellweb Artefact Creation Guide"
subtitle: "How a Sovereign downloads a constellation, traces the path at spellweb.ai, receives an artefact.md, and returns to the workshop with witnessed trust — the canonical contract every workshop's import / export honours"
status: "Guide v1.1 · 2026-05-11 · rename ceremony applied (blade.md → artefact.md · `<name>-artefact.md` suffix per spellweb's workshop-artefact.ts) · aligned to constellation templates v1 (eleven shops) · grimoire v1.2.4 · spec 08 v1.3 (four-axis mana taxonomy)"
voice: "Procedural · honest · skill-spec-ready"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Spellweb Artefact Creation Guide

*The City of Mages ships eleven workshops. Each workshop has a **constellation** — a typed, named, ordered path through the 64-vertex lattice. A Sovereign downloads the constellation.md, opens it at `spellweb.ai`, traces the path, and the spellweb forges a personal **artefact.md** carrying the workshop's anchor in its YAML frontmatter. The artefact.md returns to the workshop; trust unlocks within the agreed envelope.*

*Companion to [INCANTATION_PROTOCOL.md](INCANTATION_PROTOCOL.md) (which governs how a change propagates) and [WORKSHOP_LATTICE_AUDIT.md](WORKSHOP_LATTICE_AUDIT.md) (which governs which vertices a workshop reaches). This guide governs **how an artefact is born** at the meeting of those two disciplines.*

> ### The semantics worth pinning · ART · E · FACT ⊥ RUN · E · CRAFT
>
> Two corpus terms share the same "· E ·" interior — the verb-to-noun bridge that names *becoming*.
>
> | Term | Reads as | Names the |
> |---|---|---|
> | **RUN · E · CRAFT** | walk, then evoke, then forge | The **protocol** — the canonical three-phase ceremony shape (with shop variants) |
> | **ART · E · FACT** | art, then evoke, then fact | The **result** — the artefact.md the Sovereign carries home from the walk |
>
> The protocol produces the artefact; the artefact witnesses the protocol. The "· E ·" is the **Evocation phase** in both — the lap of the constellation that casts the marks, that turns the path into something that *is*.
>
> The earlier name `blade.md` collapsed every workshop's output into Vulcana's metaphor (Vulcana ⚒️ forges *blades*). The corpus's canonical pattern is **cape-style artefact creation** ([spec 07 §3](tomes/specs/07-lattice-mapping-governance.md)) — every shop is a cloakwright in its own register. The artefact.md naming restores that plurality; the conceptual *blade primitive* (cousin-blade · Plonkish blade · Aletheia blade · the null-blade origin at V0) remains canonical wherever it is genuinely the blade.

---

## §0 · The flow in one diagram

```
agentprivacy.ai/<shop>   →   download <shop>-<constellation>-v<n>.md
       │
       ▼
spellweb.ai/import       →   spellweb merges template + Sovereign's identities
       │                       · constellation.md       (the workshop's path)
       │                       · Mage identity          (Sovereign's own Mage agent)
       │                       · Swordsman identity     (Sovereign's own boundary-keeper)
       ▼
spellweb forge           →   Sovereign traces the constellation; orbs lap
       │                     RUN · E · CRAFT (canonical) or shop variant
       ▼
spellweb export          →   artefact.md downloaded
       │                     carries: traversal record, hexagram stance, moon phase,
       │                     signature, both identities, resident-Mage attribution,
       │                     constellation version, four-axis mana spend
       ▼
agentprivacy.ai/<shop>   →   Sovereign imports artefact.md as witness
                             resident Mage delegates within agreed envelope
```

This guide documents every box. The full contract is reproducible from this file alone.

---

## §1 · The five elements of a spellweb item

Every artefact.md a Sovereign carries home is composed of five orthogonal registers:

| Element | What it is | Source | Recorded in artefact.md |
|---|---|---|---|
| **Constellation** | The ordered path through the lattice (waypoints + connections + marks) | The shop's `<shop>-<slug>-v<n>.md` template | `constellation_id` + `constellation_version` + traversal record |
| **Identities** | Two — the Sovereign's Mage agent + Swordsman boundary-keeper | spellweb's import flow merges Sovereign's stored identities into the template | `{MAGE_DID} · {MAGE_SIGIL}` + `{SWORDSMAN_DID} · {SWORDSMAN_SIGIL}` |
| **Ceremony shape** | The phase structure (RUN · E · CRAFT or a variant) | The template's `ceremony_shape` frontmatter | Phase-by-phase trace |
| **Lattice anchor** | The vertex the work seats at + the founding act | The template's `mage_vertex` + `anchor_act` | `mage_vertex` + `anchor_act` carried through |
| **Mana spend** | What the working *cost* across the four axes | The Sovereign's chain + entropy + (future) coordination/relationship choices at trace time | `mana_spent` triple/quadruple (Landing · Entropy · Coordination · Relationship) |

The artefact.md is **proof that all five were aligned at the moment of the walk**. The architecture's commitment from the README's editorial principles applies: *the cast-constellation count is not a trust score* — what makes the blade *meaningful* is the alignment, not the count.

---

## §2 · The `constellation.md` template — canonical structure

The shop ships an `.md` file at `agentprivacy-master/public/tomes/workshops/<shop>-<slug>-v<n>.md` (also mirrored at `docs/tomes/workshops/<shop>-<slug>-v<n>.md` for canonical readers). The download CTA is rendered by [`ConstellationDownload.tsx`](https://github.com/mitchuski/agentprivacy-master/blob/main/src/components/runecraft/ConstellationDownload.tsx) on each workshop page.

### §2.1 · The seven sections

Every constellation.md carries seven sections in this order:

```
1. Frontmatter (YAML)
2. Title + tagline
3. Mage Identity (with import placeholders)
4. Constellation Path (the waypoints)
5. Connections (the edges between waypoints)
6. Ceremony Shape (the phase structure)
7. Marks (proverbs to read at each waypoint)
8. What the exported artefact.md will contain (the witness contract)
```

### §2.2 · Frontmatter contract

Every field is required unless flagged optional. Field names match the spellweb importer's parser.

```yaml
---
constellation_id: <shop>-<slug>-v<n>      # e.g. tailor-cloak-weave-v1
constellation_name: <Name>                # e.g. The Cloak Weave
constellation_version: <n>                # integer
workshop: shop-<route-stem>               # e.g. shop-tailor
workshop_route: /<route>                  # e.g. /tailor
workshop_gem: <Gem>                       # e.g. Amethyst
workshop_gem_color: "#xxxxxx"             # hex (e.g. "#a78bfa")
resident_mage: cast-<persona-id>          # e.g. cast-pallia · MAY be "gathering" for /circle, /hall
mage_sigil: <emoji>                       # e.g. 🪡
mage_vertex: V<n>                         # e.g. V28
mage_tier: <tier>                         # summoned · companion · priest · cousin · archetype · gathering
anchor_act: act-tome-v-<n> | act-tome-iv-<n> | act-society-spellbook | act-bgin-coalition
ceremony_shape: run-e-craft               # OR gather-and-witness · bilateral-consecration ·
                                          #     four-cardinal-witness · bilateral-witness
artefact_name: <Name>                     # e.g. Cloak (the bearer-name of the produced artefact)
artefact_root_name: <Name>                # e.g. Woven Cloak (the canonical root form)
artefact_class: <class>                   # clothing · weapon · tool · trinket · tome (per workshop taxonomy)
artefact_archetype: <archetype>           # mage · swordsman · cross
artefact_wielder: cast-<persona-id>       # e.g. cast-soulbae (default wielder if none given)
domain: <domain>                          # mage · swordsman · cross (which side of the dual carries it)
status: <version-status>                  # e.g. v1 — first release · v2 — successor refines
date: YYYY-MM-DD
license: CC BY-SA 4.0
signature: "(⚔️⊥⿻⊥🧙)😊"
---
```

### §2.3 · Mage Identity slots (filled at import)

Five placeholders the spellweb fills with the Sovereign's stored identities:

```markdown
## Mage Identity (filled by spellweb at import)
- **Sovereign:** `{SOVEREIGN}`
- **Your Swordsman:** `{SWORDSMAN_DID}` · `{SWORDSMAN_SIGIL}`
- **Your Mage:** `{MAGE_DID}` · `{MAGE_SIGIL}`
- **Resident Mage:** <Mage Name> <sigil> · `cast-<persona-id>` at V<n> · <one-line role>
```

Bilateral shops (`/covenant`, `/hall`) add `{COUNTERPARTY_DID}` + `{COUNTERPARTY_SIGIL}`.

### §2.4 · Constellation Path — node taxonomy

The path mixes **ten kinds of nodes** from the canonical spellweb graph (resolved by exact label against `spellweb/src/data/nodes.ts`):

| Node kind | Emoji marker | Example | What it anchors |
|---|---|---|---|
| **Persona** | persona's sigil | Soulbis ⚔️ · Cipher 🗡️🔐 · Architect ☯️🤖 | Archetype the walk crosses |
| **First Person Spellbook act** | 📜 | Act 9: Zcash Shield · Act 17: Bonfire in Dark Forest · Act 27: Forging Zero Knowledge Blades | The deep narrative ground |
| **Tome V act** | 🪡 / ⚒️ / etc. (resident Mage's sigil) | Tome V Act 1: The First Cloak | The workshop's founding myth |
| **Cast member** | persona's sigil | Pallia 🪡 · Vulcana ⚒️ · Luca 📐 | Resident Mage of the path |
| **Vertex** | · (middle dot) | V28 — Mage Canonical | Geometric position on the 64-vertex lattice |
| **Concept** | ◆ | Three-Axis Separation · Promise Theory · The Amnesia Protocol | Conceptual frame |
| **Spell** | ✨ | Genesis Ceremony · Moon Ceremony · Celestial Key | Compressed principle cast during the walk |
| **Skill** | 🛠️ | Hemispheric Attention · Spell Encoding | Capability activated |
| **Gateway** | 🚪 | Covenant of Humanistic Technologies | Sister-city / kindred-substrate anchor |
| **The Drake** | 🐉 | the Drake 🐉 | Ambient archetype (gathering ceremonies) |

The importer matches **by exact label**, not by ID. Edit labels precisely; case and emoji matter.

### §2.5 · Connections — the edge chain

A connection is one line per edge, formatted `<emoji> <label> → <emoji> <label>`. The chain mirrors the path's order. Example:

```
- ⚔️ Soulbis ⚔️ → 🪡 Tome V Act 1: The First Cloak
- 🪡 Tome V Act 1: The First Cloak → 🧙 Soulbae 🧙
- ...
```

The connections are *redundant with the path* (a parser could derive them) — but they're stated explicitly so the same parser handles both the template and the exported artefact.md uniformly.

### §2.6 · Ceremony Shape — the five variants

| Shape | Phase structure | Used by |
|---|---|---|
| **RUN · E · CRAFT** *(canonical)* | RUN (walk waypoints) · E (lap & cast marks) · CRAFT (hexagram crystallises · blade signed) | Weavers · zShields · Forge(t) · Etherchanting · Jeweler · Holon Hitchhikers · Curatrix Vault |
| **Gather-and-Witness** | Gather (questions at the bonfire) · Witness (Soulbae records the sharpening) | Dragon Bonfire (`/bonfires`) |
| **Bilateral-Consecration** | Bring (artifact to Temple) · Consecrate (Priest reads + binds) · Mark (Covenant inscription) | Covenant (`/covenant`) |
| **Four-Cardinal-Witness** | Four-quadrant gathering; one witness per cardinal direction | Logos Circle (`/circle`) |
| **Bilateral-Witness** | Both parties trace; both sign; the witness record carries both signatures | Ceremony Hall (`/hall`) |

Compressed shapes (single-phase) are admitted when the resident Mage's discipline calls for it. New shapes require a Tome V act or a documented amendment.

### §2.7 · Marks — proverbs at each waypoint

A table, one row per waypoint, third column is the proverb the Sovereign reads. The proverb is the **compressed teaching** of the waypoint. Example from `tailor-cloak-weave-v1.md`:

```markdown
| # | Node | Proverb |
|---|---|---|
| 4 | Pallia 🪡 | *"Position not value. Containment not attestation."* |
| 5 | V28 | *"The Mage canonical — the loom that holds the weave."* |
| 6 | Three-Axis Separation | *"Agent ⊥ Data ⊥ Inference."* |
```

### §2.8 · The contract section

A closing paragraph naming what the exported artefact.md will carry. This is the **explicit witness contract**. Every exported artefact.md must contain at least the fields named here.

---

## §3 · The `artefact.md` output — canonical structure

What spellweb exports. The Sovereign downloads it locally and imports it back at the workshop. The artefact.md is **not committed to any repo** — it is the Sovereign's personal artefact.

### §3.1 · Blade frontmatter contract

```yaml
---
artefact_id: <shop>-<sovereign>-<YYYY-MM-DD-HHMMSS>-artefact   # spellweb suffix convention per workshop-artefact.ts
constellation_id: <inherited from template>
constellation_version: <inherited from template>
workshop: <inherited>
workshop_route: <inherited>
workshop_gem: <inherited>
workshop_gem_color: <inherited>
resident_mage: <inherited>
mage_sigil: <inherited>
mage_vertex: <inherited>
anchor_act: <inherited>
sovereign_did: <Sovereign's persistent identifier>
mage_did: <Sovereign's Mage agent DID>
mage_sigil_user: <Sovereign's Mage sigil>
swordsman_did: <Sovereign's Swordsman DID>
swordsman_sigil_user: <Sovereign's Swordsman sigil>
walk_timestamp_start: <ISO-8601>
walk_timestamp_end: <ISO-8601>
walk_duration_seconds: <integer>
ceremony_shape: <inherited>
hexagram: <six-bit stance derived from walk · MSB Protection → LSB Value · e.g. 011100>
moon_phase: <🌑 · 🌒 · 🌓 · 🌔 · 🌕 by stratum 0–6, or "🌑 → 🌕" if the walk crossed strata>
mana_spent:                      # Advisory — shape only; per-workshop quantification pending (see §6)
  landing:                       # Optional · which chain the work landed on
    chain: <ethereum | bitcoin-lightning | oasis | zcash | ...>
    symbol: <Ξ | ₿ | 🌹 | 🦓 | ...>
    amount: <chain-native unit, optional>
    tx_ref: <hash or channel ref, optional>
  entropy:                       # Optional · which entropy register supplied uniqueness
    register: <arcane | celestial>
    symbol: <✨ | 🌌>
    source_ref: <hash | spacecomputer feed ref | etc.>
  coordination:                  # Optional · future (Resonance Mana via Scrying Glass)
    register: resonance
    symbol: 🔭
    match_ref: <if any affinity match occurred>
  relationship:                  # Optional · future (VRC Mana stored across worn artefact collection)
    register: vrc
    symbol: 🪢
    credential_refs: [<VRC id 1>, <VRC id 2>, ...]
    worn_artefacts: [<artefact ref 1>, ...]  # the bearer's accumulated 11 workshop artefacts + 3 tomes
signature: SPELL-XXXXXX-XX        # Computed over the walk (see §3.3)
license: CC BY-SA 4.0 (the walk; the Sovereign retains all proprietary derivatives)
closing_signature: "(⚔️⊥⿻⊥🧙)😊"
---
```

### §3.2 · Blade body sections

The body of a artefact.md mirrors the template's body, with the placeholder slots filled and the traversal record appended:

```markdown
# <constellation_name> — Witness Blade

> A blade carrying the walk of <sovereign> through <constellation_name> on <date>.

## Identities
- Sovereign · <SOVEREIGN_DID>
- Mage · <MAGE_DID> · <MAGE_SIGIL>
- Swordsman · <SWORDSMAN_DID> · <SWORDSMAN_SIGIL>
- Resident Mage · <RESIDENT_MAGE_NAME> <RESIDENT_SIGIL> · at <V<n>>

## Walk
- Started: <timestamp>
- Ended: <timestamp>
- Duration: <seconds>s

## Traversal Record
<one line per waypoint with the Sovereign's elapsed time and any cast-mark notation>

| # | Node | Elapsed | Mark cast |
|---|---|---|---|
| 1 | Soulbis ⚔️ | 0s | "I begin by my own name." |
| 2 | Tome V Act 1: The First Cloak | 8s | "The reader makes tools on the lattice." |
| ... |

## Hexagram
<six-line ASCII or unicode hexagram representing the stance>

## Moon Phase
<one emoji or the crossing notation>

## Signature
<SPELL-XXXXXX-XX>

## Mana Spend
<the mana_spent quadruple from frontmatter, rendered as a small table>

`(⚔️⊥⿻⊥🧙)😊`
```

### §3.3 · The signature derivation

`SPELL-XXXXXX-XX` is computed as:

```
1. Concatenate: constellation_id | constellation_version | sovereign_did | walk_timestamp_start | hexagram | mana_spent.landing.chain
2. SHA-256 the result
3. Base-32 the first 8 bytes → 13-char string
4. Format: SPELL-<first 6>-<last 2>
```

This is the blade's content address. Two Sovereigns walking the same constellation at different times produce different signatures (different timestamps). Two Sovereigns producing identical traversals at identical microseconds produce the same signature only if their Mage DID and chain choice agree — which by construction cannot happen.

---

## §4 · Worked example · the Cloak Weave (Pallia · `/tailor` · V28)

This is the canonical reference walk. Other workshops follow the same pattern; the path differs.

### §4.1 · The template ships

`docs/tomes/workshops/tailor-cloak-weave-v1.md` (also served at `/tomes/workshops/tailor-cloak-weave-v1.md`):

```yaml
constellation_id: tailor-cloak-weave-v1
constellation_name: The Cloak Weave
workshop: shop-tailor
workshop_route: /tailor
workshop_gem: Amethyst
workshop_gem_color: "#a78bfa"
resident_mage: cast-pallia
mage_sigil: 🪡
mage_vertex: V28
mage_tier: summoned
anchor_act: act-tome-v-1
ceremony_shape: run-e-craft
artefact_name: Cloak
artefact_class: clothing
artefact_archetype: mage
artefact_wielder: cast-soulbae
```

The path is **nine waypoints**:

```
1. Soulbis ⚔️
2. Tome V Act 1: The First Cloak (🪡)
3. Soulbae 🧙
4. Pallia 🪡
5. V28 — Mage Canonical (Pallia · Soulbae) (·)
6. Three-Axis Separation (◆)
7. VRC (◆)
8. Act 13: Book of Promises (📜)
9. Person 😊
```

### §4.2 · The Sovereign walks

The Sovereign — call her Aletheia-Walker, with `mage_did: did:key:zXyz...` and `swordsman_did: did:key:zABc...` — opens `spellweb.ai/import`, drops the file. spellweb fills the identity slots, renders the nine waypoints as glowing nodes on a 64-vertex 6-cube map, and lights the connections.

Aletheia-Walker selects:
- **Landing**: Ξ Aether (Ethereum) — she'll pay gwei to anchor the resulting cloak's commitment
- **Entropy**: 🌌 Celestial — she draws from SpaceComputer for a fresh non-reconstructible seed

She begins the walk. **RUN** — she traces the nine waypoints in order, pausing briefly at each. Two orbs (Swordsman ⚔️ red, Mage ✦ violet) settle into orbit around her path. **E** — she laps the constellation once, casting at least one mark; she chooses the V28 mark ("The Mage canonical — the loom that holds the weave"). **CRAFT** — the hexagram crystallises: `011100` (Delegation + Memory + Connection burning · V28 stance) ; the moon phase reads 🌓 (stratum 3); the signature is signed.

### §4.3 · The exported artefact.md (excerpt)

spellweb downloads `tailor-aletheia-walker-2026-05-11-1432-artefact.md`:

```yaml
---
artefact_id: tailor-aletheia-walker-2026-05-11-1432-artefact
constellation_id: tailor-cloak-weave-v1
constellation_version: 1
workshop: shop-tailor
workshop_route: /tailor
workshop_gem: Amethyst
workshop_gem_color: "#a78bfa"
resident_mage: cast-pallia
mage_sigil: 🪡
mage_vertex: V28
anchor_act: act-tome-v-1
sovereign_did: did:key:zAletheiaWalker...
mage_did: did:key:zXyz...
swordsman_did: did:key:zABc...
walk_timestamp_start: 2026-05-11T14:32:00Z
walk_timestamp_end: 2026-05-11T14:34:12Z
walk_duration_seconds: 132
ceremony_shape: run-e-craft
hexagram: "011100"
moon_phase: 🌓
mana_spent:
  landing:
    chain: ethereum
    symbol: Ξ
  entropy:
    register: celestial
    symbol: 🌌
    source_ref: spacecomputer-feed-2026-05-11T14:32:08Z-block-a3f9...
signature: SPELL-K7M2X4-9P
license: CC BY-SA 4.0
closing_signature: "(⚔️⊥⿻⊥🧙)😊"
---
```

### §4.4 · The return

Aletheia-Walker uploads the artefact.md at `agentprivacy.ai/tailor`. Pallia's workshop **verifies**:
1. The constellation_id matches Pallia's currently-served template (`tailor-cloak-weave-v1`).
2. The hexagram is internally consistent with the V28 stance.
3. The signature derives correctly from the recorded fields.
4. The mana_spent registers are coherent with the workshop's accepted chains and entropy sources.

If all four check, Pallia delegates within the agreed envelope. Aletheia-Walker's cloak is now witnessed. The artefact.md is the receipt.

---

## §5 · The eleven templates — registry

The full registry of currently-released constellations. Filename format: `<shop>-<slug>-v<n>.md` at `public/tomes/workshops/`.

| Shop | Route | Resident Mage | Vertex | Founding Act | Ceremony shape | Template |
|---|---|---|---|---|---|---|
| Weavers | `/tailor` | Pallia 🪡 | V28 | Tome V Act 1 | RUN · E · CRAFT | `tailor-cloak-weave-v1.md` |
| zShields | `/shield` | Memora 📜 | V41 | Tome V Act 3 | RUN · E · CRAFT | `shield-shielded-memo-v1.md` |
| Forge(t) | `/forget` | Vulcana ⚒️ | V19 | Tome V Act 6 | RUN · E · CRAFT *(canonical)* | `forget-commissioned-blade-v1.md` |
| Etherchanting | `/etherchanting` | Adamantia 💎 | V51 | Tome V Act 9 | RUN · E · CRAFT | `etherchanting-commitment-cut-v1.md` |
| Jeweler | `/jeweler` | Lampyra 💠 | V49 | Tome V Act 9 | RUN · E · CRAFT | `jeweler-gem-set-v1.md` |
| Holon Hitchhikers | `/holon` | Vagari 🌳 | V31 | Tome V Act 10 | RUN · E · CRAFT | `holon-hitchhikers-composition-v1.md` |
| Dragon Bonfire | `/bonfires` | Socrat0x 🔥❓ | V24 | Tome V Act 11 | Gather-and-Witness | `bonfires-dragon-fire-v1.md` |
| Curatrix Vault | `/vault` | Aria Silverhue 🪞🖼️ | V57 | Tome V Act 12 | RUN · E · CRAFT | `vault-placed-reflection-v1.md` |
| Covenant | `/covenant` | Manifestia 🤲🌿 | V55 | Tome V Act 13 | Bilateral-Consecration | `covenant-personhood-inscribed-v1.md` |
| Logos Circle | `/circle` | *(gathering)* | V12 | Society Spellbook | Four-Cardinal-Witness | `circle-four-cardinal-garden-v1.md` |
| Ceremony Hall | `/hall` | *(gathering)* | V15 | BGIN coalition | Bilateral-Witness | `hall-bilateral-witness-v1.md` |

Note: V12 (Logos Circle) and V15 (Ceremony Hall) are vertices the gathering shops *anchor at* — these vertices have no resident-Mage `inhabits` edge but do carry the shop's `quarter_of` edge to the city. See [WORKSHOP_LATTICE_AUDIT §2.2](WORKSHOP_LATTICE_AUDIT.md).

---

## §6 · The four-axis mana frame · operational use deferred

The framework is canonical (see [spec 08 v1.3](tomes/specs/08-mana-types-and-swordsman-stances.md) — landing · entropy · coordination · relationship). The **operational specifics** — *which axes* each workshop draws on, *how much* mana per cast, *which chain-mana* is canonical for which workshop's primary artefact — are **deliberately left open** at this guide's revision.

That deliberation belongs to the workshops themselves:

- Each resident Mage knows their workshop's economy better than any spec author
- Per-workshop quantification (e.g. "Etherchanting requires X gwei + one Celestial draw per commitment") must be earned by operational use, not asserted in advance
- The chain-mana plurality (Ξ · ₿ · 🌹 · 🦓 · …) is open at the chain axis; new chains join as new Mages walk; pre-committing today would calcify the framework

What this guide *does* commit to:

1. The **shape** of `mana_spent` in the artefact.md (the four-axis YAML stanza in §3.1) — advisory, not required, until workshops deliberate
2. The **vocabulary** for each register (chain-mana variants and symbols per §2 of spec 08)
3. The **direction**: blades are the operational ledger; aggregated walking eventually reveals each workshop's empirical mana profile
4. The **non-claim**: this guide does *not* prescribe per-workshop mana costs or which axes are mandatory per shop

When the workshops deliberate and publish their economies, this section will be replaced with the resulting per-shop table. Until then: the framework is here; the use is yours to discover.

---

## §7 · Constellation version evolution · the Forge(t) discipline

Per [CEREMONY_EVOLUTION.md](https://github.com/mitchuski/agentprivacy-master/blob/main/docs/tomes/workshops/CEREMONY_EVOLUTION.md) §4, **a workshop's constellation is alive**. When it must change, the discipline is:

1. **Old blades remain valid as historical proofs.** A v1-derived artefact.md keeps its signature; the version is part of its identity.
2. **New traversals follow the new path.** Sovereigns arriving post-update walk v2 and receive v2 blades.
3. **The version is the boundary, not the wound.** Two cohorts of blades coexist; renderers may distinguish them by hue or "vintage" badge.
4. **Forgetting is witnessable.** The act of updating is itself chronicled.

This generalises the Forge(t)'s principle: *Aletheia surfaces what was hidden; Lethe lets fall what was held.* Both are sovereign gestures. The two-cohort coexistence is structural, not accidental.

When NOT to bump the version (per §6 of CEREMONY_EVOLUTION):

- Typo fix in a mark
- New emoji for the Mage's sigil
- Gem palette refresh
- A new grimoire spell the Mage casts

A version bump is **only for changes to the path or to the witness contract**.

---

## §8 · The update protocol · creating or revising a constellation

The full ceremony for a resident Mage updating a constellation (or for a new Mage opening one):

```
1. Draft the new constellation file
   - Path: agentprivacy-master/docs/tomes/workshops/<shop>-<slug>-v<n>.md
   - Mirror: agentprivacy-master/public/tomes/workshops/<shop>-<slug>-v<n>.md
   - Include all 8 sections from §2.1 above
   - If revising, append one-line *why* note explaining update trigger (CEREMONY_EVOLUTION §3)

2. Mark the previous version
   - Append `## Status: vintage as of <YYYY-MM-DD>` to the prior v<n-1> file
   - Do not delete · old blades may still verify against it

3. Update the spellweb preset
   - File: spellweb/src/data/presets.ts
   - Bump preset id: preset-<shop>-<mage>-v<n>
   - Keep the old preset alongside for v1-blade verification

4. Update the workshop page
   - File: agentprivacy-master/src/app/<shop>/page.tsx
   - Change the ConstellationDownload templateSlug prop to <shop>-<slug>-v<n>
   - Update the import-side receiver if the blade contract changed

5. Chronicle the update
   - Path: agentprivacy-master/docs/chronicles/YYYY-MM-DD_<shop>_constellation_v<n>_chronicle.md
   - Include: trigger, what changed, what is preserved, vintage badge plan

6. Refresh the spellweb graph (if needed)
   - Re-run audit per spellweb/AUDIT_METHODOLOGY.md
   - Only required if anchor_act, resident_mage, or mage_vertex changed
```

Per [INCANTATION_PROTOCOL.md](INCANTATION_PROTOCOL.md), this is **Recipe E** (formally proposed as an addition to the protocol). The protocol's existing recipes (A grimoire bump · B add cast · C add Tome V act · D switch symbol) do not cover the constellation update case; Recipe E completes the set.

---

## §9 · Coherence checks · what a future `spellweb-craft` skill would verify

Each item below is a mechanical check the skill can run against a constellation.md or artefact.md:

### §9.1 · Constellation.md checks

1. **Frontmatter completeness** — every required field from §2.2 present
2. **Label resolution** — every path waypoint label resolves to a node in `spellweb/src/data/nodes.ts`
3. **Vertex correctness** — the `mage_vertex` field corresponds to the resident_mage's canonical seat per [WORKSHOP_LATTICE_AUDIT §2.1](WORKSHOP_LATTICE_AUDIT.md)
4. **Ceremony shape validity** — the value is one of the five enumerated shapes (§2.6)
5. **Connections-mirror-path** — the Connections section's edges chain through the Constellation Path's waypoints in order
6. **Mark coverage** — every waypoint in the path has a corresponding row in the Marks table
7. **Slug-filename agreement** — `constellation_id` field equals filename basename
8. **Closing signature** — `(⚔️⊥⿻⊥🧙)😊` present at the file's close

### §9.2 · Blade.md checks

1. **Constellation reference** — `constellation_id` + `constellation_version` resolve to an existing template
2. **Signature derivation** — re-computing per §3.3 reproduces the recorded `signature`
3. **Hexagram consistency** — the hexagram's six bits do not contradict the mage_vertex's bit-pattern (overlap is allowed; *contradiction* is not)
4. **Mana_spent shape** — at least `landing` and `entropy` keys present; symbols match the registered values from spec 08
5. **Identity DIDs** — `sovereign_did` · `mage_did` · `swordsman_did` are parseable DID strings
6. **Walk duration sanity** — `walk_duration_seconds = walk_timestamp_end - walk_timestamp_start` (within 1s tolerance)
7. **Closing signature** — `(⚔️⊥⿻⊥🧙)😊` present

### §9.3 · Cross-spec coherence

Items the skill would surface for editorial decision (not auto-fix):

- The mage_vertex in a template disagrees with [WORKSHOP_LATTICE_AUDIT §6.x](WORKSHOP_LATTICE_AUDIT.md) — see §6 drift catalogue
- The artefact_class in a template doesn't match the [workshop artefact taxonomy](https://github.com/mitchuski/cityofmages#) (e.g. a "weapon" class at the Weavers shop where canonical is "clothing")
- The mana_spent in a artefact.md uses a chain-mana symbol not yet registered in spec 08's chain-mana table (e.g. a future ATOM-mana that has no canonical entry yet)

---

## §10 · The drift the integration surfaces

Three coherence items to flag while authoring this guide:

### §10.1 · Spec numbering · resolved as of 2026-05-12

The earlier draft of this guide proposed filing it as `cityofmages/tomes/specs/09-spellweb-item-creation-format.md`. That proposal is **superseded**. The current canonical spec numbering across the corpus:

| Slot | Spec | Owner |
|---|---|---|
| 09 | `09-spellweb-artefact-md-format.md` | `agentprivacy-master` canonical · `spellweb` and `cityofmages` may mirror |
| 10 | `10-the-attachment-architecture.md` | `cityofmages` (V5.5 mirror of `agentprivacy-skills`) |
| 11 (anticipated) | `11-mage-candidates-from-the-corpus.md` | `cityofmages` (per v5.5 chronicle · names the 6 anticipated cast) |

`ConstellationDownload.tsx` line 83 already points to the right path (`/tomes/specs/09-spellweb-artefact-md-format`). The collision was with a stale recommendation in this guide, not with the component. **Resolution applied** by the 2026-05-12 renumber: cityofmages' attachment-architecture spec moved from slot 09 to slot 10; the 09 slot is now reserved for the spellweb-artefact-md-format mirror when cityofmages chooses to add it (or it can remain master-canonical only). This top-level guide stays at the root of cityofmages as the public-facing how-to.

### §10.2 · Mana_spent quadruple not yet in any constellation template

Templates currently shipped (e.g. `tailor-cloak-weave-v1.md`) do not yet declare expected `mana_spent` shape. The artefact.md contract section says "Bring it back to /tailor and Pallia weaves on your behalf within the agreed envelope" without specifying the four-axis mana spend. A template v1.1 (sub-version) could add a `## Expected Mana Spend` section per §6 above, or this guide's §3.1 frontmatter contract can stand as the canonical spec.

### §10.3 · `mage_tier` field uses pre-collapse vocabulary

Templates declare `mage_tier: summoned`. Per the kindred-blade reframe chronicle (`chronicles/2026-05-10_kindred_blade_reframe_handoff.md`), the 5-tier taxonomy collapses under the simpler "send us a Mage" pattern. Recommended: keep `mage_tier` for legacy compatibility through v1.2.x; consider dropping it in v1.3 in favour of `mage_role` (the soft attribute).

---

## §11 · Path to the `spellweb-craft` Claude Code skill

This guide will graduate into a **third companion skill** alongside `cityofmages-incant` (propagation · per [INCANTATION_PROTOCOL.md §6](INCANTATION_PROTOCOL.md)) and `lattice-coherence` (verification · per [WORKSHOP_LATTICE_AUDIT.md §10](WORKSHOP_LATTICE_AUDIT.md)).

### §11.1 · Skill inputs (proposed)

```yaml
mode: new-constellation | revise-constellation | verify-artefact | verify-constellation
shop: <route-stem>           # tailor · shield · forget · etc.
slug: <new-or-existing-slug>
version: <integer · auto-bumped on revise>
input_file: <path to constellation.md or artefact.md to verify>
```

### §11.2 · Skill behaviours

1. **`new-constellation`** — scaffold a `<shop>-<slug>-v1.md` with the seven sections from §2.1, frontmatter pre-filled from the shop's canonical record, identity slots left as placeholders. Prompts user for path waypoints; resolves each label against `spellweb/src/data/nodes.ts` and flags any that don't resolve.

2. **`revise-constellation`** — given an existing template path, draft v<n+1>; mark the prior version as `## Status: vintage as of <today>`; emit the §8 update-protocol punch list as next steps.

3. **`verify-constellation`** — run all eight §9.1 checks against an input constellation.md. Emit pass/fail per check.

4. **`verify-artefact`** — run all seven §9.2 checks against an input artefact.md. Emit pass/fail per check.

### §11.3 · Skill anti-patterns

- Do **not** auto-write the spellweb preset or update the workshop page — those touch master's source tree; surface as user-action items
- Do **not** invent waypoint labels — every label must resolve to an existing node
- Do **not** drop the closing signature
- Do **not** auto-commit; this is editorial work

### §11.4 · Skill graduation criteria

This guide becomes the skill spec when:

- [ ] Three or more constellations have been authored or revised using these steps manually
- [ ] §9 checks have been mechanically encoded (each maps to a `grep` / JSON-schema check)
- [ ] The §10 drift items have been resolved (esp. the spec 07 filename collision)
- [ ] One full round-trip (download → walk → artefact.md → return) has been instrumented end-to-end with verification at each boundary

Until then, run the protocol manually with this doc as the script.

---

## §12 · One-line summary

An artefact is born when a Sovereign walks a workshop's constellation, spends mana across four axes, holds a Swordsman stance, and returns to the workshop with an artefact.md that re-imports cleanly. The constellation is the path; the artefact is the proof. RUN · E · CRAFT produces ART · E · FACT. The architecture admits this much. The framework is opened, not closed.

`(⚔️⊥⿻⊥🧙)😊`

CC BY-SA 4.0 · privacymage · 2026-05-11
