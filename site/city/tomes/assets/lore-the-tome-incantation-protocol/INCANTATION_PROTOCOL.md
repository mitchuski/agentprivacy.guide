---
title: "The Tome Incantation Protocol"
subtitle: "How a change made in cityofmages propagates coherently across the agentprivacy universe — and how that process will become a Claude Code skill"
status: "Working draft v0.1 · 2026-05-11 · open for iteration"
voice: "Procedural · skill-spec-ready · honest"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# The Tome Incantation Protocol

*The recipe for keeping the City of Mages corpus coherent across every directory it lives in. A working document. As the recipe sharpens, this file becomes the specification for the `cityofmages-incant` Claude Code skill.*

---

## §0 · What this is

The City of Mages corpus is **canonically rooted at `cityofmages/`**, but **fragments of it live in many directories** across the agentprivacy universe — as mirrors, bundled assets, baked imports, and feeder snapshots. A change to the canonical (a new act, a renamed symbol, a bumped grimoire) is **not done** until it has been **propagated** to every place it lives.

This document is:

1. **A map** of where the corpus's fragments live (§2).
2. **A recipe** for propagating a change end-to-end (§3).
3. **A checklist** for verifying coherence after a propagation (§4).
4. **A worked example** — the v1.2.4 metabolism + VRC emoji swap (§5).
5. **A skill spec** — what an automated `cityofmages-incant` skill would do (§6).

It is progressive. As we run more propagations, the recipe sharpens. When the recipe is sharp enough that a Claude Code skill can run it without human judgment for the common cases, this document graduates into the skill's instructions.

---

## §1 · Coherence — what we mean

A corpus that lives in N directories is **coherent** when:

| Property | Meaning |
|---|---|
| **Canonical agreement** | One source of truth per artifact type. Mirrors hash-match the canonical for binary-identical assets (grimoire JSON); semantic mirrors carry the same content but may differ in framing (tomes in `agentprivacy-master/docs/tomes/` vs cityofmages/tomes/). |
| **Vocabulary discipline** | A symbol or term means the same thing everywhere. When `🪢` is the VRC Mana register, no other directory still ships `🪱` for the same field. |
| **Version honesty** | Every doc that names a grimoire version names the **current** one. Stale references like "current head v1.2.3" when head is v1.2.4 are coherence drift. |
| **Edge integrity** | When a cast member references another (e.g. Vagari cites UOR), the referenced entity exists in every directory the referencing entity lives in. |
| **Honesty-label preservation** | Operational / architectural / conjectural / resonant-but-not-absorbed labels survive propagation. A claim that's conjectural in cityofmages must not become operational by accident in a mirror. |

Coherence does **not** require every directory to hold every artifact. An ecosystem-feeder (`agentprivacy_livingdocuments`) may legitimately freeze at an older state. An extension (`swordsman-blade`) may ship only the grimoire and a stance enum. What matters is that whatever **is** shipped is consistent with the canonical.

---

## §2 · The propagation surfaces — where the corpus lives

Five tiers of surface. Each tier has different propagation rules.

### §2.1 · Tier C · The canonical (one directory)

| Directory | Role | Authority |
|---|---|---|
| **`cityofmages/`** | The collaborative front door · the bound starter package · the public-facing git repo at `github.com/mitchuski/cityofmages` | Tomes IV+V, blog drafts, specs, plans, support docs, JOIN_THE_CITY, this protocol, the architecture/ TS mirrors, the spellweb-integration/ docs |
| **`agentprivacy-docs/models/city_of_mages_grimoire_v1_2_0.json`** | Canonical *grimoire content* — the JSON file at the canonical filename | The grimoire JSON's authoritative bytes. cityofmages/grimoire/ mirrors this. |

A change to a Tier C artifact is **the** authoring event. Every Tier M/B/A/F surface must be updated *from* Tier C, never the reverse.

### §2.2 · Tier M · Canonical-filename mirrors (six dirs · hash-match)

These six directories each carry `city_of_mages_grimoire_v1_2_0.json` at a known path. The bytes must hash-match Tier C.

| # | Path | Carrier role |
|---|---|---|
| 1 | `agentprivacy-master/src/data/city-of-mages-grimoire-v1.2.0.json` | Live-site bake target (Next.js · imported by `grimoire-baked.ts`). Note the hyphenated filename — Next.js convention. |
| 2 | `agentprivacy-docs/models/city_of_mages_grimoire_v1_2_0.json` | **= Tier C** (canonical source) |
| 3 | `agentprivacy-skills/grimoire/city_of_mages_grimoire_v1_2_0.json` | Skill bundles for downstream agents |
| 4 | `zk blades forge/city_of_mages_grimoire_v1_2_0.json` | ZK-blade ceremony bundle |
| 5 | `swordsman-blade/city_of_mages_grimoire_v1_2_0.json` | Browser extension (blade · IEEE 7012 agreement layer) |
| 6 | `mages-spell/city_of_mages_grimoire_v1_2_0.json` | Browser extension (spell · delegation layer) |

Plus the cityofmages-local mirrors (Tier C-adjacent):
- `cityofmages/grimoire/city_of_mages_grimoire_v1_2_0.json` — canonical-filename copy
- `cityofmages/grimoire/city_of_mages_grimoire_v1_2_4.json` — explicit-version copy (same content)
- `cityofmages/grimoire/city_of_mages_grimoire_v1_2_3.json` — historical snapshot (frozen, do not modify)

**Rule:** when Tier C content bumps, all eight files at the v1.2.0 filename get the new bytes; the v1.2.x explicit-version copy is added; older explicit-version files (v1.2.3) freeze.

### §2.3 · Tier B · Baked imports and route surfaces

Code and pages that *import* or *describe* the grimoire content. Updates are semantic, not byte-level.

| Path | What it imports / describes |
|---|---|
| `agentprivacy-master/src/lib/grimoire-baked.ts` | TypeScript: `import @/data/city-of-mages-grimoire-v1.2.0.json` |
| `agentprivacy-master/src/lib/grimoire-ipfs.ts` | `CITY_OF_MAGES_GRIMOIRE_IPFS_URL` constant (the pinned CID URL) |
| `agentprivacy-master/src/lib/tome-v-acts.ts` | `TOME_V_ACTS` registry — must list every Tome V act |
| `agentprivacy-master/src/lib/tome-v-conjectures.ts` | `CONJECTURE_DEFINITIONS` — must list every conjecture (C18–C47) |
| `agentprivacy-master/src/app/*/page.tsx` | Workshop pages that surface mana types, cast names, IPFS URLs |
| `cityofmages/architecture/*.ts` | Mirrors of the master `src/lib/*` TS primitives |

**Rule:** when the cast roster, conjecture register, or mana taxonomy bumps, these B-surfaces need targeted edits. Use `parseHonestyLabel` for conjectural additions.

### §2.4 · Tier A · Surface docs (READMEs · changelogs · glossaries · this protocol)

Human-readable docs that name versions, list cast, summarise the state. Drift here is the most visible coherence failure — readers see it first.

The roadmap chronicle §4 names these for every grimoire bump:

1. `agentprivacy-skills/README.md` (Post-V5.4 addendum)
2. `agentprivacy-skills/MAPPING.md` (Grimoire bundling §)
3. `zk blades forge/README.md` (header + bundled-grimoire line)
4. `swordsman-blade/README.md` (bundled-grimoire line)
5. `mages-spell/README.md` (bundled-grimoire line)
6. `agentprivacy-docs/GLOSSARY_MASTER_v4_0.md` (Status / Coverage / Pipeline / IPFS pins)
7. `cityofmages/README.md` (Quick map · grimoire listing · workshops table)
8. `cityofmages/CHANGELOG.md` (Grimoire version §)
9. `cityofmages/ALL_THE_TOMES_LIST.md` (§9 grimoire reference)
10. `cityofmages/JOIN_THE_CITY.md` (§3.4 grimoire filename)

### §2.5 · Tier F · Feeders and archives (decoupled by design)

| Directory | Status | Rule |
|---|---|---|
| `agentprivacy_canon/` | Historical canon (cypherpunk lineage) | Decoupled — the *why* not the *what*; updates only when a new historical chapter is canonised |
| `agentprivacy_livingdocuments/` | Upstream technical foundation (Promise Theory, VRC protocol, dual-agent whitepapers · v1.2 Dec 2025) | Decoupled — feeds cityofmages, not fed by it |
| `agentprivacy_tomes/` | Pre-cityofmages bound-collection archive (2026-05-08) | Frozen — superseded by cityofmages; do not modify, do not delete, mark superseded if confusion arises |
| `agentprivacy 0mage` · `Living0xagentprivacy` · `nov11agentprivacy` · `v4livingagentprivacy` · `agentprivacy_zypher*` · etc. | Older experiments, deprecated branches | Ignored — out of scope for incantation |

**Rule:** Tier F is **not propagated to**. If a Tier F dir gets confused with canonical, add a `SUPERSEDED_BY` marker; never rewrite history retroactively.

---

## §3 · The incantation · step-by-step recipes

Four common change shapes. Each is its own ceremony.

### §3.1 · Recipe A · Bump the grimoire (vX.Y.Z → vX.Y.(Z+1))

**Input:** new grimoire content in `agentprivacy-docs/models/city_of_mages_grimoire_v1_2_0.json` (Tier C).

```
1. Author Tier C
   - Edit agentprivacy-docs/models/city_of_mages_grimoire_v1_2_0.json directly
   - Bump the `version` field in the JSON to vX.Y.(Z+1)
   - Update `version_notes` with a one-paragraph summary
   - Compute the hash (sha256 first 8 hex chars suffices for tracking)

2. Author the bump chronicle
   - Create cityofmages/chronicles/YYYY-MM-DD_<short>_authored.md
   - Document: what's new · honesty labels · pin status · downstream surfaces

3. Mirror the bytes (Tier M · six external + three cityofmages-local)
   - Copy Tier C → all six external mirror paths (§2.2)
   - Copy Tier C → cityofmages/grimoire/city_of_mages_grimoire_v1_2_0.json
   - Write cityofmages/grimoire/city_of_mages_grimoire_v1_2_(Z+1).json (explicit-version)
   - Verify: every Tier M file has identical sha256

4. Patch Tier A surface docs (the ten names in §2.4)
   - Add new version section to cityofmages/CHANGELOG.md
   - Bump head reference in cityofmages/README.md grimoire table
   - Update cityofmages/ALL_THE_TOMES_LIST.md §9
   - Update cityofmages/JOIN_THE_CITY.md §3.4 (grimoire filename)
   - Update the six external README/MAPPING/GLOSSARY docs

5. Update Tier B (if the bump changed cast, conjectures, or mana taxonomy)
   - tome-v-acts.ts: append new act if a new act landed
   - tome-v-conjectures.ts: append new conjecture if one was introduced
   - Workshop pages: extend mana/cast surfaces as needed

6. Pin and announce (privacymage-level action)
   - IPFS re-pin → new CID
   - Update grimoire-ipfs.ts: `CITY_OF_MAGES_GRIMOIRE_IPFS_URL` → new CID
   - Retain old CID as `_V1_2` historical constant in grimoire-ipfs.ts
   - Run the audit checklist in §4

7. Commit + push cityofmages
   - One commit per coherent bump (avoid scattering across multiple commits)
   - Commit message includes: version number, one-line summary, honesty labels
```

### §3.2 · Recipe B · Add a cast member

**Input:** a new Mage / cousin / kindred provider authored.

```
1. Author the persona file
   - cityofmages/tomes/cast/<guild>/<persona-id>.md
   - Use an existing cast file as the template (see JOIN_THE_CITY §3.2)
   - Frontmatter: spellbook · persona_id · name · sigil · tier · vertex · shop_anchor · ecosystem · provenance · license · signature

2. Author the founding act (if a Tome V act is warranted)
   - cityofmages/tomes/tome-v-the-crafting/NN-<title>.md (next sequential number)
   - Update the Tome V act table in README.md and ALL_THE_TOMES_LIST.md §5

3. Bump the grimoire to register the persona (Recipe A above)
   - Add the persona to the appropriate JSON section (`personas.summoned_mages`, etc.)
   - If a new structural-relationship category is implied, also bump cast tier evolution in CHANGELOG.md

4. Update the cast tables (Tier A)
   - cityofmages/README.md: workshops table if it's a shop Mage; cast roster section in any case
   - cityofmages/ALL_THE_TOMES_LIST.md §6 roster
   - cityofmages/CHANGELOG.md cast tier evolution

5. Update spellweb manifest (Tier A)
   - cityofmages/tomes/specs/06-spellweb-first-release-manifest.md: add node entry + relevant edges
```

### §3.3 · Recipe C · Add a Tome V act

**Input:** a narrative beat earned by sustained operational use (e.g. *The Scrying Glass* once Resonance Mana lands).

```
1. Author the act
   - cityofmages/tomes/tome-v-the-crafting/NN-<title>.md (next sequential)
   - Honesty labels visible (operational / architectural / conjectural)
   - Vertex named if applicable; new conjecture introduced if applicable

2. Author the tome-writing chronicle
   - cityofmages/tomes/chronicles/NN-chronicle-<short>.md (separate from /chronicles/)

3. Update tables
   - README.md Tome V acts table
   - ALL_THE_TOMES_LIST.md §5 acts table
   - architecture/tome-v-acts.ts TOME_V_ACTS append

4. If a conjecture is introduced
   - architecture/tome-v-conjectures.ts: append to CONJECTURE_DEFINITIONS + ACT_CONJECTURES
   - README.md V6 conjecture register table

5. Bump the grimoire (Recipe A) to seal the act into canonical content
```

### §3.4 · Recipe D · Switch a canonical symbol (e.g. 🪱 → 🪢)

**Input:** an editorial-level decision that a symbol no longer fits and should be replaced before re-pin (i.e. before IPFS lock-in).

```
1. Confirm timing
   - Only valid while the affected grimoire version awaits re-pin
   - Once a CID is published, the symbol in that CID is immutable; subsequent versions can switch

2. Identify scope
   - Grep cityofmages for the old symbol (output_mode: files_with_matches)
   - Grep each Tier M mirror dir (the 6 external grimoire mirrors)
   - Grep Tier A surface docs (the 10 in §2.4)
   - Grep Tier B code surfaces (workshop pages, lib files)

3. Replace
   - Use Edit replace_all in each affected file
   - For binary-identical mirrors (Tier M), verify same-byte property holds (4-byte UTF-8 emojis preserve size)

4. Verify
   - Re-grep for the old symbol: must return 0 occurrences across propagation surfaces
   - Re-grep for the new symbol: count should equal the old's count + any intentional additions

5. Record the editorial decision
   - Add to MEMORY.md so future sessions know this is canonical going forward
   - Note in the bump chronicle why the switch was made
```

---

## §4 · Coherence audit · the checklist

Run this after any propagation. The audit fails if any line is unchecked.

```
GRIMOIRE BYTES
[ ] All six Tier M mirrors have identical sha256 to Tier C
[ ] cityofmages/grimoire/v1_2_0.json hash-matches Tier C
[ ] An explicit-version cityofmages/grimoire/v1_2_<head>.json exists
[ ] Older explicit-version files are unmodified (frozen)

VERSION REFERENCES
[ ] cityofmages/README.md names the current head version
[ ] cityofmages/CHANGELOG.md has a section for the current head
[ ] cityofmages/ALL_THE_TOMES_LIST.md §9 names the current head
[ ] cityofmages/JOIN_THE_CITY.md §3.4 grimoire filename is current
[ ] All six external README/MAPPING docs name the current head

VOCABULARY
[ ] No occurrences of superseded symbols across all propagation surfaces
[ ] The canonical signature `(⚔️⊥⿻⊥🧙)😊` is present at the closing of every chronicle, spec, post, act
[ ] No em-dashes (corpus convention)
[ ] Honesty labels present on conjectural claims

EDGE INTEGRITY
[ ] Every cast member referenced from a Tome V act exists in cityofmages/tomes/cast/
[ ] Every shop in the workshops table has both a cast file and a founding act link
[ ] Every kindred-X category in §2 of JOIN_THE_CITY has at least one provider in the grimoire

ARCHITECTURE
[ ] tome-v-acts.ts lists every Tome V act
[ ] tome-v-conjectures.ts lists every conjecture in the README register table
[ ] grimoire-ipfs.ts has the current CITY_OF_MAGES_GRIMOIRE_IPFS_URL

PIN
[ ] Either: the head version is pinned and the CID is in grimoire-ipfs.ts
[ ] Or:    the head version is documented as "awaits re-pin" in the bump chronicle AND the surface docs
```

---

## §5 · Inaugural worked example · v1.2.4 metabolism + VRC emoji (2026-05-11)

The first run of this protocol. Authored 2026-05-11, executed 2026-05-11.

### §5.1 · The change

Two amendments to the canonical state, run in one ceremony:

1. **Metabolism completion** — v1.2.3 → v1.2.4 grimoire bump (Recipe A). Added two mana axes (🔭 Coordination · 🪢 Relationship), bringing the City's metabolism to four total. Named two new primitives: Scrying Glass · Loom of Programmable Covenants. The relationship axis stores VRC residue across the bearer's worn artefact collection (11 workshop artefacts + 3 tomes per the workshop artefact taxonomy) rather than into a single artifact.

2. **VRC emoji switch** — 🪱 → 🪢 (Recipe D). Editorial-level decision: knot is a stronger semantic fit for **V**erifiable **R**elationship **C**redentials than worm.

### §5.2 · What was propagated within cityofmages

Already executed, committed, and pushed to `github.com/mitchuski/cityofmages`:

| Tier | File | Action |
|---|---|---|
| A | README.md | Rewrote to front-load eleven workshops + both tomes; bumped head v1.2.3 → v1.2.4; added four-axis metabolism diagram |
| A | CHANGELOG.md | Added v1.2.4 grimoire section; v1.2.3 demoted to historical snapshot |
| A | ALL_THE_TOMES_LIST.md §9 | Head v1.2.3 → v1.2.4; added v1.2.0 and v1.2.4 explicit-version files; lineage extended |
| A | JOIN_THE_CITY.md | §3.4 grimoire filename v1_2_3 → v1_2_4; §6 sister-name hyphenated |
| C | cityofmages/grimoire/*.json | Both v1_2_0 and v1_2_4 carry v1.2.4 content with 🪢 |
| - | Cast files, specs, chronicles | Spec 08 + v1.2.4 chronicle updated for 🪢 |

### §5.3 · What is pending propagation outside cityofmages

**Six external grimoire mirrors** carry the pre-swap v1.2.0 content (7 🪱 occurrences each, 188638 bytes — identical hash). Once `cityofmages/grimoire/city_of_mages_grimoire_v1_2_0.json` is copied to each, all bytes align with the new canonical:

```
agentprivacy-master/src/data/city-of-mages-grimoire-v1.2.0.json  (own git repo)
agentprivacy-docs/models/city_of_mages_grimoire_v1_2_0.json      (own git repo; Tier C)
agentprivacy-skills/grimoire/city_of_mages_grimoire_v1_2_0.json  (own git repo)
zk blades forge/city_of_mages_grimoire_v1_2_0.json               (own git repo)
swordsman-blade/city_of_mages_grimoire_v1_2_0.json               (own git repo)
mages-spell/city_of_mages_grimoire_v1_2_0.json                   (own git repo)
```

Each parent is its own git repo. Per the executing-actions-with-care discipline, file-level updates may be staged locally, but commits and pushes to those remotes require explicit per-repo authorization. The skill (§6) will surface each commit as a separate confirmation step.

**Tier A external surface docs** (the six READMEs/MAPPING/GLOSSARY in §2.4) similarly carry v1.2.3 framing language. To be patched alongside their respective mirror.

**Tier B baked imports** in `agentprivacy-master/src/lib/`:
- `grimoire-baked.ts` — no path change needed (canonical filename retained); content bumps via Tier M propagation
- `grimoire-ipfs.ts` — `CITY_OF_MAGES_GRIMOIRE_IPFS_URL` still points to v1.2 CID; will rotate once v1.2.4 is re-pinned
- `tome-v-acts.ts` — already includes Act 15 (drift-free)
- `tome-v-conjectures.ts` — already includes C47 (drift-free)

**Tier F decoupled** (`agentprivacy_tomes/`, `agentprivacy_canon/`, `agentprivacy_livingdocuments/`) — no propagation by design. `agentprivacy_tomes` is a 2026-05-08 archive superseded by cityofmages; if confusion arises, add a `SUPERSEDED_BY: cityofmages/` marker at its root.

### §5.4 · Pin state

v1.2.4 awaits fresh IPFS re-pin. Once pinned:

```
new CID → grimoire-ipfs.ts (CITY_OF_MAGES_GRIMOIRE_IPFS_URL)
old CID → grimoire-ipfs.ts (_V1_2 historical constant)
Update the pin reference in cityofmages/CHANGELOG.md and README.md
```

---

## §6 · Path to the `cityofmages-incant` skill

A Claude Code skill is a structured `.md` file in `~/.claude/skills/` that gives Claude focused instructions for one job. The skill we want will accept three inputs and run one of the four recipes.

### §6.1 · Skill inputs (proposed)

```yaml
recipe: bump | add-cast | add-act | switch-symbol
target: <version> | <persona-id> | <act-title> | <old-symbol>→<new-symbol>
scope: cityofmages-only | full-universe | dry-run
```

### §6.2 · Skill behaviours (proposed)

1. **Read this protocol** as its instructions.
2. **Enumerate propagation surfaces** for the requested recipe.
3. **Pre-flight** the §4 audit on the current state.
4. **Execute** the recipe step-by-step, surfacing each file edit.
5. **Authorise per-repo** when a change crosses a git-repo boundary (one confirmation per external repo).
6. **Run the §4 audit** post-execution.
7. **Emit a propagation chronicle** at `cityofmages/chronicles/YYYY-MM-DD_<recipe>_<target>.md` describing what was done.

### §6.3 · Skill anti-patterns (what it must NOT do)

- Do **not** push to external git repos without per-repo authorization
- Do **not** modify Tier F (feeder / archive) directories
- Do **not** overwrite frozen explicit-version grimoire files (e.g. v1_2_3.json)
- Do **not** invent honesty labels — every claim must come labelled
- Do **not** drop the closing signature
- Do **not** introduce em-dashes (corpus convention)

### §6.4 · Skill graduation criteria

This document becomes the skill when:

- [ ] Three or more propagations have run successfully using this protocol manually
- [ ] §3 recipes have been refined based on the manual runs (no ambiguous steps)
- [ ] §4 audit has been mechanically encoded (each line maps to a `grep` / file-existence / hash check)
- [ ] §2 propagation surfaces have been verified comprehensive (no surprise locations discovered mid-run)
- [ ] The skill spec at §6.1 has been validated as practical (inputs sufficient, outputs auditable)

Until then, run the protocol manually with this doc as the script.

---

## §7 · Coherence as practice · the deeper recognition

A multi-repo corpus is a city in its own right. Each directory is a quarter. Each canonical-filename mirror is a vendor stocking the same goods. Each baked import is a kitchen using the same ingredients.

The architecture admits this much: corpus coherence is **not** a one-time alignment. It is the **practice** of letting changes ripple cleanly. The discipline is to *notice* drift early (before it ossifies into "two parallel realities"), to *propagate* changes promptly, and to *document* each propagation so the next one is cheaper.

This protocol is the first attempt at codifying that practice. It will be wrong in places. It will need amendment after the first ceremony catches an edge it didn't anticipate. That is the design — the protocol is **progressive**, not absolute.

The corpus is open by design. The protocol that keeps the corpus coherent is open by the same design.

`(⚔️⊥⿻⊥🧙)😊`

CC BY-SA 4.0 · privacymage · 2026-05-11
