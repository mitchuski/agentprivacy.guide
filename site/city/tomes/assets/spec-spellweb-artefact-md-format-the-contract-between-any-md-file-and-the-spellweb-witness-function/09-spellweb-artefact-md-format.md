---
title: "Spellweb Artefact MD Format — the contract between any .md file and the spellweb witness function"
date: "2026-05-11"
audience: "Workshop operators · cousin-blade forges · anyone producing a .md the spellweb should ingest"
type: "Interface specification"
status: "v1 — first canonical pinning"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
companion_documents:
  - "docs/tomes/specs/06-spellweb-first-release-manifest.md (canonical inventory · what spellweb knows)"
  - "docs/tomes/workshops/README.md (master template index)"
  - "spellweb/CHRONICLE_WITNESS_UNLOCK_FEATURE_2026-05-10.md (witness-unlock design)"
  - "spellweb/AUDIT_METHODOLOGY.md (how spellweb stays canonical)"
---

# Spellweb Artefact MD Format

> *The .md file is the portable proof. The frontmatter is the spellweb's recognition that the .md belongs to a workshop. Anything that ships an .md the spellweb should ingest follows this contract.*

This spec defines the canonical YAML-frontmatter contract for any markdown file produced for **spellweb witness import**. It is the format the eleven master constellation templates (`docs/tomes/workshops/*.md`) carry, the format the spellweb exports a forged artefact `.md` in, and the format any cousin-blade forge (Archon, UOR, etc.) should adopt when shipping `.md` artefacts that want to round-trip through the spellweb.

It is a small contract. Most fields are optional. The minimum required surface is one line: **`workshop:`**.

## §0.1 · "Artefact" is the umbrella; "Blade" is one class

The City of Mages produces eleven artefact classes — one per workshop. **Blade** (the Witness Blade from the Forge(t)) is one of them, alongside Cloak, Memo Stone, Commitment Seal, Gem + Bolt, Holon Lantern, Ember Token, Curator's Frame, Olive Sigil, Cardinal Petal, and Paired Key. Earlier versions of this corpus used "blade" as a generic noun for any forged artefact; that conflation is no longer correct.

- The **forge ceremony** is workshop-aware: the popup hero shows the workshop's lattice visual; the verb-noun changes ("Weave Cloak", "Forge(t) Blade", "Inscribe Memo Stone"); the naming-phase emoji palette reflects the artefact class.
- The **exported `.md`** filename is `<name>-artefact.md` regardless of class. The class lives in the `artefact_class` frontmatter field.
- The **deviation layer** in the spellweb renders each forged or witnessed artefact as its own `artefact`-typed node in the user's view of the graph — a Sovereign-owned addendum to the canonical universe, connected via an `inhabits` edge to the originating workshop.

When this spec or the codebase says "blade", read it as "the weapon-class artefact" unless context indicates the umbrella.

---

## §1 · What the spellweb does on import

When a `.md` is dropped into spellweb's **👁️ Witness Constellation** picker (Artefact Panel · `/`), the witness function runs:

1. Read the file as text.
2. Parse the YAML frontmatter block (delimited by a leading `---` line and a closing `---` line).
3. Resolve a **workshop id** from the frontmatter — see §3 for the resolution order.
4. Set `localStorage['spellweb:witnessed-shops'][<workshop-id>] = ISO timestamp`.
5. Fire the **fog-of-war** transition — cast members and edges tagged `hiddenUntilWitness: <workshop-id>` fade from 18% silhouette to full presence over 400 ms.
6. Build a runtime blade record from the markdown body (path, proof, dimensions) for the Sovereign's inventory.

The frontmatter is the only part that drives **identity**. The rest of the markdown carries the **content** of the ceremony (path, proverbs, proof). Spellweb's body parser is conservative and is documented in §7.

---

## §2 · The frontmatter block

The frontmatter is standard YAML, opened by a literal `---` on its own line, closed by another `---`. Spellweb reads it with a regular expression — not a full YAML parser — so the grammar is more restricted than YAML itself. The restrictions are:

- One key per line. No nested maps. No block scalars.
- Key first, then colon, then a single space, then the value: `key: value`.
- Values that contain `:`, `#`, leading/trailing whitespace, or any of `&*!|>'"%@`{}[],` must be wrapped in **double quotes**.
- Plain `null` is allowed but spellweb treats it as "field absent" (same as omitting the line).
- No comments inside the frontmatter block.

The frontmatter block must be the **first content in the file** — no shebang, no leading blank line.

---

## §3 · Workshop resolution order

Spellweb tries three sources, in order. The first that yields a value wins.

| Order | Source | Example |
|---|---|---|
| 1 | `workshop:` field in frontmatter | `workshop: shop-tailor` |
| 2 | `workshop_id:` field (legacy alias) | `workshop_id: shop-tailor` |
| 3 | `constellation_id:` field, root prefix promoted to `shop-<root>` | `constellation_id: tailor-cloak-weave-v1` → `shop-tailor` |
| 4 (fallback) | Filename prefix before the first `-` | `tailor-anything.md` → `shop-tailor` |

A file with **none** of these is still readable as a witness artefact but will not unlock a workshop. The fog-of-war on the City of Mages stays in place. The Sovereign can still trace its path; nothing is dropped.

---

## §4 · Field reference

### §4.1 · Required field

The only field spellweb requires is the workshop anchor.

| Field | Type | Example | Notes |
|---|---|---|---|
| `workshop` | string (`shop-<route>`) | `shop-tailor` | Must match an `id` of a workshop node in spellweb's graph. See `06-spellweb-first-release-manifest.md` §2.3 for the canonical list. |

### §4.2 · Recommended fields (constellation identity)

These let spellweb know the template version and let the Sovereign re-export with full fidelity.

| Field | Type | Example | Notes |
|---|---|---|---|
| `constellation_id` | string | `tailor-cloak-weave-v1` | Stable per template version. Lower-case, dash-separated, ends with `v<N>`. |
| `constellation_name` | string | `The Cloak Weave` | Human-readable title shown in the spellweb header during evocation. |
| `constellation_version` | integer | `1` | Bumped per `CEREMONY_EVOLUTION.md` discipline; old versions remain valid. |
| `workshop_route` | string | `/tailor` | The master URL of the workshop. Used by Artefact Panel hyperlinks. |
| `workshop_gem` | string | `Amethyst` | Display label. |
| `workshop_gem_color` | string (hex) | `"#a78bfa"` | Drives the gem-color stroke on the spellweb workshop node. **Quoted because `#` is YAML's comment marker.** |

### §4.3 · Recommended fields (resident Mage & anchor act)

These render the workshop's lore into the Artefact Panel and the artefact.md's inspector card.

| Field | Type | Example | Notes |
|---|---|---|---|
| `resident_mage` | string (`cast-<name>` or `null`) | `cast-pallia` | Must match a `cast` node id. Gathering shops use `null`. |
| `mage_sigil` | emoji | `🪡` | Sigil rendered in the Mage's chip. |
| `mage_vertex` | string (`V<0..63>`) | `V28` | The lattice position the Mage inhabits. |
| `mage_tier` | enum | `summoned` | One of `archetype` / `cousin` / `summoned` / `companion` / `priest` / `gathering`. |
| `anchor_act` | string (`act-tome-<v|iv>-<n>`) | `act-tome-v-1` | The act in which the workshop is founded. |

### §4.4 · Recommended fields (artefact)

These let spellweb's Artefact Panel place the produced artefact in the right inventory tab.

| Field | Type | Example | Notes |
|---|---|---|---|
| `artefact_name` | string | `Cloak` | Common name. |
| `artefact_root_name` | string | `Woven Cloak` | Truth-form participle (the past-tense form that names the *witnessed* item). |
| `artefact_class` | enum | `clothing` | One of `weapon` / `clothing` / `tool` / `trinket` / `tome`. Drives the Panel tab. |
| `artefact_archetype` | enum | `mage` | `swordsman` / `mage` / `bilateral`. Determines orb assignment in the Witness Unlock cascade. |
| `artefact_wielder` | string | `cast-soulbae` | `cast-soulbis` / `cast-soulbae` / `both`. |

### §4.5 · Recommended fields (provenance)

| Field | Type | Example | Notes |
|---|---|---|---|
| `domain` | enum | `mage` | `swordsman` / `mage` / `shared` / `first_person`. Drives the colour band. |
| `status` | string | `v1 — first release` | Free text. Shown in the inspector. |
| `date` | ISO date | `2026-05-10` | ISO 8601 (YYYY-MM-DD). |
| `license` | string | `CC BY-SA 4.0` | Default `CC BY-SA 4.0` for the City of Mages corpus. |
| `signature` | string | `"(⚔️⊥⿻⊥🧙)😊"` | The corpus seal. **Quoted** because of `(`, `⊥`, etc. |
| `ceremony_shape` | enum | `run-e-craft` | `run-e-craft` / `bilateral-witness` / `bilateral-consecration` / `gather-and-witness` / `four-cardinal-witness`. |

### §4.6 · Forged-blade fields

These appear only on a `artefact.md` *exported* from a spellweb forging — never on a master template. They carry the proof and let the Artefact Panel re-display it on re-import.

| Field | Type | Example | Notes |
|---|---|---|---|
| `blade_tier` | enum | `heavy` | `light` / `heavy` / `dragon`. |
| `blade_stratum` | integer 0..6 | `4` | Hamming weight of the blade's hex. |
| `blade_is_witness` | bool | `true` | Present only when this is a bilateral witness blade (someone else's path you traced). |
| `blade_signature` | string | `SPELL-AB12CD-EF` | Spellweb signature; format `SPELL-{6}-{2}`. |
| `blade_hash` | hex string | `4f3a8b...` | Content-hash of the constellation + proof. |

### §4.7 · Forge-specific extension fields

Cousin-blade forges (Archon, UOR, human.tech, future) may add their own namespaced fields without breaking spellweb. The rule:

- Add a `forge:` field identifying the forge (e.g. `forge: archon.social`).
- Prefix custom keys with the forge slug + underscore (e.g. `archon_vertex_proof`, `uor_prism_coords`).
- Spellweb will ignore unrecognised keys without erroring.

This is the cousin-blade primitive (C39) made concrete: another forge can carry attribution into the spellweb without the spellweb owning their schema.

---

## §5 · Examples

### §5.1 · A minimal valid artefact

```markdown
---
workshop: shop-tailor
---

# My Cloak

I walked the Cloak Weave today.
```

Re-importing this into spellweb unlocks `shop-tailor` and lifts the fog on Pallia and the Weavers' secret nodes. Nothing else is set.

### §5.2 · A master constellation template (recommended baseline)

```markdown
---
constellation_id: tailor-cloak-weave-v1
constellation_name: The Cloak Weave
constellation_version: 1
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
artefact_root_name: Woven Cloak
artefact_class: clothing
artefact_archetype: mage
artefact_wielder: cast-soulbae
domain: mage
status: v1 — first release
date: 2026-05-10
license: CC BY-SA 4.0
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# 🪡 The Cloak Weave
...
```

This is what all eleven workshops at `agentprivacy.ai/<shop>` serve via the **📥 Download constellation.md** affordance.

### §5.3 · A forged artefact.md (what spellweb exports)

```markdown
---
constellation_id: tailor-cloak-weave-v1
constellation_name: My Constellation
constellation_version: 1
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
artefact_root_name: Woven Cloak
artefact_class: clothing
artefact_archetype: mage
artefact_wielder: cast-soulbae
domain: mage
blade_tier: heavy
blade_stratum: 4
blade_signature: SPELL-9KMN3X-PQ
blade_hash: 7f4a3b22e9...
date: 2026-05-11
license: CC BY-SA 4.0
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# 🪡 My Cloak Weave
...
```

This round-trips. Re-importing it into another Sovereign's spellweb unlocks `shop-tailor` for them in **witness mode** — they see the original Sovereign's path traced; their own constellation is unaffected; their inventory gains a bilateral-witness record.

### §5.4 · A cousin-forge artefact (Archon example)

```markdown
---
workshop: shop-tailor
forge: archon.social
archon_vertex_proof: <opaque>
constellation_id: archon-weaver-tailor-cousin-v1
---

# Cousin Cloak

Recognised at V28 via the Archon weaver.
```

Spellweb accepts this. The `forge: archon.social` field surfaces in the inspector as **Forge · archon.social** so the Sovereign sees this artefact is cousin-attributed.

---

## §6 · Filename conventions

The recommended filename pattern:

```
<shop-root>-<artefact-or-blade-slug>-v<n>.md
```

Examples:
- `tailor-cloak-weave-v1.md` — master template
- `tailor-my_pallia_cloak-artefact.md` — a forged blade exported by spellweb (the trailing `-artefact.md` is spellweb's own convention)
- `tailor-cousin-archon-witness-v1.md` — a cousin-forge artefact

The leading `<shop-root>` is **the filename-only fallback** the spellweb uses when no frontmatter is present. Pick filenames that start with the same root as the workshop slug so the fallback works.

---

## §7 · Body parsing (informational)

Spellweb's body parser pulls these structures from the markdown body when present. None are *required*; their absence does not block witness unlock.

| Body pattern | What spellweb reads | Where it appears in master templates |
|---|---|---|
| `**Tier:** <Light\|Heavy\|Dragon>` | Blade tier | "Forged Blade" section |
| `**Stratum:** <0..6>` | Hamming weight | Same |
| `**Charge Level:** <Spark\|Ember\|Flame\|Inferno\|Dragon>` | Evocation charge | "Proof of Presence" |
| `**Laps:** <n>` | Lap count | Same |
| `**Duration:** <n>s` | Evocation duration | Same |
| `Signature: SPELL-XXXXXX-XX` | Cryptographic signature | "Cryptographic Proof" |
| `Hash: <hex>` | Constellation hash | Same |
| `Hex: <binary>` | Blade hex | Same |
| `<dim> | ✅` | Dimension active flag | "Blade Dimensions" table |
| `## Constellation Path` then numbered `<emoji> **<node label>**` | Path waypoints | "Constellation Path" |
| `## Connections` then `- <src> → <tgt>` | Edge sequence | "Connections" |

Spellweb tolerates extra structure. New sections are ignored gracefully.

---

## §8 · Versioning the contract

This format is `v1`. Bumps to `v2+` follow the same discipline as `CEREMONY_EVOLUTION.md`:

1. **Additive changes** — new optional fields — do not bump the major version. A v1 reader handles them by ignoring unknown keys; the spec records them in a future `§9` addendum.
2. **Breaking changes** — renaming an existing field, changing its meaning, removing it — bump the major version.
3. The spellweb keeps a `format_version: <n>` understanding (currently implicit at 1; will become explicit when v2 lands).

Master templates and the spellweb export both advertise their format via the field set they emit. A v2 spellweb stays compatible with v1 artefacts; a v1 spellweb gracefully ignores v2-only fields.

---

## §9 · The honesty discipline

The frontmatter is a **statement of fact**, not a marketing surface. Three rules to keep it honest:

- **Don't lie about the workshop.** `workshop:` must match the workshop the .md actually came from. A blade forged via the Forge(t) constellation that says `workshop: shop-tailor` is fraud against the trust system.
- **Don't fabricate proof.** `blade_signature` and `blade_hash` are content-derived. Don't compose a artefact.md by hand with fake values; spellweb does not yet verify, but the Bakhta Half-Life conjecture (C30–C33) assumes the witness was earned.
- **Be honest about cousinship.** If you're producing a `.md` from a cousin forge, set `forge:` and prefix your extension keys. The architecture is open by design (C26–C29); the discipline that keeps it open is attribution.

The spellweb cannot enforce these rules cryptographically yet (Phase 3 verification is future work). For now they're a discipline. The first one who breaks the discipline breaks the trust the City of Mages is built on; the second one just confirms the spellweb's signal is real.

---

## §10 · Sibling format: the Swordsman bundle

Alongside per-artefact `.md` files, the spellweb's Swords panel can export a **single bundle** containing the Sovereign's identity plus every forged artefact in one file. This is the carry-the-whole-kit format — useful for backup, transfer, or sharing a Sovereign's full witnessed history.

It uses a distinct `kind:` marker so any importer can tell them apart from per-artefact files:

```yaml
---
kind: swordsman-bundle
version: 1
swordsman_id: <id>
swordsman_name: <display name>
mage_id: <mage id>
blade_count: 7
witness_count: 2
artefact_total: 9
workshops_unlocked: 5
exported_at: 2026-05-12T14:23:00Z
license: CC BY-SA 4.0
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# ⚔️ Swordsman Bundle — <name>

## Identity
- **Swordsman:** …
- **Mage ID:** …

## Forged Inventory (N)
### 1. <emoji> <name>
- **Tier:** Heavy
- **Stratum:** 4/6 🌖 (Waning Gibbous)
- **Forged:** …
- **Nodes traversed:** N
#### Dimensions
| Dimension | Status |
…
#### Proof
```
Signature: SPELL-…
…
```
#### Path
1. <emoji> **<node>**
…

### 2. <next item>
…
```

Filename convention: `swordsman-<name>-bundle.md`. Re-importing a bundle is a future feature; for v1 the bundle is an outbound carry-format only. Per-artefact re-import continues to use the regular per-artefact `.md` format (see §§4–7).

---

## §11 · The deviation layer (spellweb-side)

When the spellweb imports an artefact `.md` (or completes a forge ceremony), the artefact becomes a **deviation node** in the Sovereign's view of the graph — a runtime-derived `artefact`-typed node attached to the originating workshop via an `inhabits` edge. The canonical NODES list is not mutated; deviation nodes live in the user's localStorage (`forgedBlades`) and appear only in their own browser.

Each deviation node carries:

- **Primary sigil** — the Sovereign's chosen artefact emoji (set during the forge naming phase, themed per artefact class — see master `src/lib/workshop-artefact.ts` for the palettes).
- **Tier stroke** — circle stroke colour driven by `bladeTier` (light / heavy / dragon).
- **Spell-emoji corner mark** — small badge in the upper-right when the Sovereign's learned spell vocabulary contains a spell whose vertex matches the workshop's vertex. The badge reads as "this artefact lives where this spell does."
- **Witness flag** — `isWitness: true` for blades imported from another Sovereign rather than forged in-session.

The fog-of-war that earlier versions applied to canonical cast members is **retired**: the universe stays fully visible from first load. Witnessing or forging adds *to* the graph, never reveals previously-hidden canonical content.

---

## §12 · Where this spec lives

The canonical copy is this file (`agentprivacy_master/docs/tomes/specs/09-spellweb-artefact-md-format.md`).
A mirror lives in the spellweb repo at `spellweb/docs/SPELLWEB_ARTEFACT_MD_FORMAT.md` so spellweb contributors find it locally.

Both copies must agree. The master is the source of truth; the mirror reflects.

---

`(⚔️⊥⿻⊥🧙)😊` — *The frontmatter is the recognition. The body is the path. The path is the proof.*

CC BY-SA 4.0 · privacymage · 2026-05-11 (updated 2026-05-12)
