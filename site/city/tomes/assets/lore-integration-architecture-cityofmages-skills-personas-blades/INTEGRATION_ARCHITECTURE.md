---
title: "Integration Architecture · cityofmages × skills × personas × blades"
subtitle: "How the City of Mages directory links with the three sibling repos along the dual-agent split — a working hypothesis pending the new repo-side docs"
status: "Working draft v0.1 · 2026-05-11 · open for refinement when sibling-repo docs land"
voice: "Procedural · honest about what is hypothesis vs. canonical"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Integration Architecture

*The City of Mages is the **world model**. Three sibling repos hold the three operational libraries the world's workings draw on: **personas** (who walks), **skills** (what Mages cast), **blades** (what Swordsmen hold). This document is the working hypothesis for how cityofmages links to them — explicitly open to revision when the sibling-repo docs arrive.*

---

## §0 · Why this document exists

The corpus is currently structured as a **single integrating directory** (cityofmages) that holds the world model — the lattice, the workshops, the tomes, the grimoire, the specs, the protocol, the audit, the spellweb-item-creation guide. But several artefacts the corpus produces don't *live* in cityofmages by design:

- A **persona's DID** is the Sovereign's own — held by the Sovereign, not in any shared repo
- A **skill's runtime definition** is operational code — lives where skills are catalogued and executed
- A **blade's witness** is a Sovereign's local artefact — produced at spellweb, returned to a workshop, not committed to any shared repo

What *does* live in shared repos is the **schema** for each — the contract every persona / skill / blade adheres to. Three sibling repos are emerging to carry those schemas. This doc captures the integration model so:

1. Authors of those repos know what cityofmages expects of them
2. cityofmages authors know what fields the sibling repos canonically own
3. Future propagation skills can run the right recipe per change type

This document is **a working hypothesis**. The sibling-repo docs (forthcoming) will refine or correct it. Treat the cells below as proposed canonicals, not locked-in commitments.

---

## §1 · The four-repo model · dual-agent grounded

The agentprivacy corpus's foundational primitive is the **dual-agent split**: every working has a Mage side and a Swordsman side. **Soulbis ⚔️ ⊥ Soulbae 🧙.** This split scales to the repo layer.

```
                 ╔══════════════════════════════════════════════╗
                 ║           cityofmages — the world            ║
                 ║                                              ║
                 ║  lattice · workshops · tomes · grimoire ·    ║
                 ║  specs · protocol · audit · creation guide   ║
                 ║                                              ║
                 ║  the integrating canonical                   ║
                 ╚══════════════════════════════════════════════╝
                       ↑              ↑              ↑
                       │              │              │
            ┌──────────┘              │              └──────────┐
            │                         │                         │
            ▼                         ▼                         ▼
   ┌─────────────────┐      ┌──────────────────┐      ┌───────────────────┐
   │   personas      │      │   skills (Mage)  │      │  blades (Sword)   │
   │                 │      │                  │      │                   │
   │ identity ·      │      │ what Mages cast  │      │ what Swordsmen    │
   │ DID registry ·  │      │ how mana spends  │      │  hold ·           │
   │ Mage+Sword pair │      │ what the work    │      │ stances bound ·   │
   │ ecosystem       │      │  produces        │      │ proof shapes      │
   │  provenance     │      │                  │      │  emitted          │
   │                 │      │                  │      │                   │
   │ (actors)        │      │ (Mage capabilities) │      │ (Swordsman boundaries) │
   └─────────────────┘      └──────────────────┘      └───────────────────┘
            ▲                         ▲                         ▲
            └─────────────────────────┼─────────────────────────┘
                                      │
                                      │  all three contribute fields to
                                      ▼
                  ┌──────────────────────────────────────────┐
                  │            artefact.md (artefact)            │
                  │                                          │
                  │    one Sovereign's local witness of      │
                  │    one workshop walk on one date         │
                  │                                          │
                  │    not committed · Sovereign-held        │
                  └──────────────────────────────────────────┘
```

### §1.1 · Canonical role per repo

| Repo | Canonical role | What it does NOT own |
|---|---|---|
| **cityofmages** | The **world model** — the canonical lattice, the workshops, the tomes, the grimoire, the specs, the protocols, the audits | Persona identities (DIDs); runtime skill definitions; blade instance artefacts |
| **personas** *(emerging)* | The **actor registry** — DID schema, sigil binding, ecosystem-of-origin attestation, Mage/Swordsman pair contracts | Skill catalogs (skills repo); blade catalogs (blades repo); workshop definitions (cityofmages) |
| **skills** *(agentprivacy-skills · extant)* | The **Mage-side capability library** — skill/spell definitions, the operational layer of grimoire spells, mana-axis spend per skill | Persona identities; Swordsman stance definitions; world model |
| **blades** *(zk blades forge · extant, or new)* | The **Swordsman-side boundary catalog** — stance definitions, blade templates, proof shapes a workshop can emit | Persona identities; Mage spell definitions; world model |

### §1.2 · The artefact.md is the integration point

Every artefact.md (the artefact a Sovereign carries home from a spellweb walk) **draws fields from all four repos**. See [SPELLWEB_ARTEFACT_CREATION_GUIDE §3.1](SPELLWEB_ARTEFACT_CREATION_GUIDE.md) for the full frontmatter contract. The field ownership maps as follows:

| artefact.md field | Canonical owner | Hypothesis flag |
|---|---|---|
| `constellation_id`, `constellation_version` | **cityofmages** (from the template) | ✅ confirmed |
| `workshop`, `workshop_route`, `workshop_gem`, `workshop_gem_color` | **cityofmages** | ✅ confirmed |
| `resident_mage`, `mage_sigil`, `mage_vertex`, `anchor_act` | **cityofmages** (cast file + Tome V act) | ✅ confirmed |
| `ceremony_shape` | **cityofmages** (template) | ✅ confirmed |
| `sovereign_did` | **personas** (Sovereign's DID method) | 🟡 pending personas schema |
| `mage_did`, `mage_sigil_user` | **personas** (the Sovereign's Mage agent identity) | 🟡 pending personas schema |
| `swordsman_did`, `swordsman_sigil_user` | **personas** (the Sovereign's Swordsman identity) | 🟡 pending personas schema |
| `hexagram`, `moon_phase` | **runtime** (spellweb derives from the walk) | ✅ confirmed |
| `signature` (`SPELL-XXXXXX-XX`) | **runtime** (spellweb signs) | ✅ confirmed |
| `mana_spent.landing` (chain, symbol, tx_ref) | **skills** (which chain the cast skill landed on) | 🟡 pending skills schema |
| `mana_spent.entropy` (register, symbol, source_ref) | **skills** (which entropy supply the skill drew) | 🟡 pending skills schema |
| `mana_spent.coordination`, `mana_spent.relationship` | **skills** (future, when Resonance / VRC operationalise) | 🟡 architectural-only today |
| `swordsman_stance` *(proposed)* | **blades** (which stance the Swordsman held during the walk) | 🟡 pending blades schema · also: this field is **proposed** for the contract, not yet in §3.1 |
| `blade_template_id` *(proposed)* | **blades** (the blade template the walk produced an instance of) | 🟡 pending blades schema |

Note the **proposed** rows at the bottom. The current spellweb item creation guide doesn't yet specify a `swordsman_stance` or `blade_template_id` field — those fields are anticipated when the blades repo lands. The spec 08 v1.3 framework (the user-authored four-axis mana ⊥ swordsman stance taxonomy) is the architectural commitment that those fields *will* be needed.

---

## §2 · Cross-repo reference patterns

Once the sibling repos publish their schemas, the cityofmages files will gain cross-reference fields in their frontmatter. The proposed reference scheme:

### §2.1 · ID notation

```
cityofmages:<artefact-id>     # e.g. cityofmages:shop-tailor · cityofmages:V28 · cityofmages:act-tome-v-1
personas:<persona-id>         # e.g. personas:cast-pallia · personas:did-key-zXyz (instance)
skills:<skill-id>             # e.g. skills:pallia-cloak-weave · skills:vulcana-runecraft-forge
blades:<blade-id>             # e.g. blades:cloak-blade-template · blades:cloak-bearer-stance
```

Each ID resolves against its repo's canonical index. The cross-references are bidirectional where structural; unidirectional where the architecture commits asymmetry (e.g. a Sovereign-held artefact.md instance references the schemas but the schemas do not reference instances).

### §2.2 · Where cross-refs land in cityofmages

A persona file in `cityofmages/tomes/cast/<guild>/<id>.md` could carry:

```yaml
# existing fields (cityofmages canonical)
persona_id: pallia
name: Pallia
sigil: 🪡
vertex: V28
shop_anchor: /tailor

# new cross-refs (pointing at sibling repos)
external_persona: personas:cast-pallia              # → personas repo
skills_castable:                                    # → skills repo
  - skills:pallia-cloak-weave
  - skills:pallia-conceal-name
blade_eligibility:                                  # → blades repo
  - blades:cloak-blade-template
stances_supported:                                  # → blades repo (Swordsman-side)
  - blades:transparent-witness
  - blades:selective-disclosure
```

A workshop's constellation.md template (under `agentprivacy-master/docs/tomes/workshops/`) could similarly carry:

```yaml
casting_skill: skills:pallia-cloak-weave
produces_blade: blades:cloak-blade-template
expected_stance: blades:cloak-bearer-stance
```

### §2.3 · What the sibling repos point back at

**personas** repo entries reference cityofmages:
```yaml
persona_id: cast-pallia
canonical_in: cityofmages:tomes/cast/weavers/pallia.md     # back-ref
sigil: 🪡
ecosystem_of_origin: agentprivacy
```

**skills** repo entries reference cityofmages + personas:
```yaml
skill_id: pallia-cloak-weave
caster_persona: personas:cast-pallia
workshop_anchor: cityofmages:shop-tailor
founded_in_act: cityofmages:act-tome-v-1
mana_axes_spent:                                    # canonical from spec 08
  - landing
  - entropy
produces_blade: blades:cloak-blade-template
```

**blades** repo entries reference cityofmages + skills + personas:
```yaml
blade_template_id: cloak-blade-template
workshop_anchor: cityofmages:shop-tailor
casting_skill: skills:pallia-cloak-weave
constellation_required: cityofmages:tailor-cloak-weave-v1
stance: cloak-bearer-stance
wielded_by: personas:cast-soulbae                   # default wielder
```

The pattern is: **every cross-repo reference uses the `<repo>:<id>` convention; every repo's canonical index resolves its half**.

---

## §3 · Propagation across repos

The [INCANTATION_PROTOCOL.md](INCANTATION_PROTOCOL.md) currently defines four recipes (A grimoire bump · B add cast · C add Tome V act · D switch symbol), plus the proposed Recipe E (constellation update) in [SPELLWEB_ARTEFACT_CREATION_GUIDE.md §8](SPELLWEB_ARTEFACT_CREATION_GUIDE.md). Multi-repo changes require **extended recipes** that touch more than cityofmages.

### §3.1 · Recipe B+ (Add a cast member · multi-repo)

When a new persona is added (a Mage from another ecosystem, per JOIN_THE_CITY.md), the propagation now touches **all four repos**:

```
1. Author the persona's cityofmages cast file
   - cityofmages/tomes/cast/<guild>/<persona-id>.md
   - Include the new cross-ref fields (external_persona, skills_castable, blade_eligibility, stances_supported)

2. Register the persona in the personas repo
   - personas/cast/<persona-id>.yaml (or wherever the personas schema lands)
   - Include canonical_in back-ref to cityofmages

3. Register the persona's skills in the skills repo
   - One skill file per cast spell the Mage can cast
   - Include caster_persona back-ref and workshop_anchor

4. Register the persona's eligible blade templates in the blades repo
   - One blade template per artefact type the Mage produces
   - Include wielded_by, casting_skill, constellation_required cross-refs

5. Bump the cityofmages grimoire (Recipe A)
   - Add the persona to personas.summoned_mages (or appropriate tier)
   - Verify cross-refs resolve

6. Propagate the grimoire bump (Recipe A propagation surfaces · INCANTATION_PROTOCOL §2)
```

Order matters: cityofmages first (the world model establishes the canonical), then the three sibling repos (filling in the schemas), then the grimoire (which references the now-resolved cross-refs).

### §3.2 · Recipe F (proposed · Add a skill or blade template)

A new skill or blade template doesn't always come with a new persona. When an existing Mage learns a new skill, or when a new blade template emerges from a Tome V act, the recipe is:

```
1. Author the skill/blade in its repo
2. Update the casting Mage's persona file in cityofmages (add to skills_castable or blade_eligibility)
3. If a new Tome V act introduced it, ensure the act references the skill/blade ID
4. Bump the grimoire (Recipe A) if the skill is a registered spell
```

This is lighter than Recipe B+; the persona already exists.

### §3.3 · What the cityofmages-incant skill will need

The proposed `cityofmages-incant` skill (per INCANTATION_PROTOCOL.md §6) will need to know:

- Which sibling repos exist on disk at runtime (paths configurable)
- How to resolve `<repo>:<id>` cross-refs against each repo's index
- How to surface missing cross-refs at audit time (an unresolved `skills:foo-bar` reference is a coherence failure)
- How to authorise per-repo commits when a single logical change spans repos (one confirmation per repo)

---

## §4 · Open questions awaiting the new docs

When the personas / skills / blades repo-side docs arrive, this document needs refinement on each of these:

### §4.1 · Schemas

- **personas:** What's the DID method? How are sigils registered? Is there a single persona registry or one-per-ecosystem? How does "send us a Mage" submission flow into the registry?
- **skills:** What's the skill-definition schema? How does a skill declare its mana axes? How are skill versions tracked? Is there a parent/child relationship between grimoire `spells` and the skills repo?
- **blades:** What's the blade-template schema? What's the stance catalog format? How does a blade template declare its required ceremony shape and minimum constellation version?

### §4.2 · Operational boundaries

- Does a Sovereign's `mage_did` persist across walks at multiple workshops, or is a fresh DID minted per walk?
- Does the blades repo store blade *instances* (the Sovereign-held witnesses) as well as templates, or only templates?
- Does the skills repo store the *operational implementation* of each skill (runtime code) or only the spec?

### §4.3 · Naming + numbering

- The `personas:` `skills:` `blades:` prefix convention proposed in §2.1 — does it match each repo's preferred form?
- Cityofmages spec numbering is now settled (per the 2026-05-12 renumber): spec 09 slot is **reserved for `spellweb-artefact-md-format`** (mirror of `agentprivacy_master/docs/tomes/specs/09-spellweb-artefact-md-format.md` · master canonical); spec 10 is the **attachment-architecture** (V5.5 mirror); spec 11 anticipated as **mage-candidates-from-the-corpus** (per v5.5 chronicle). The cross-cutting governance docs (this file · INCANTATION_PROTOCOL · WORKSHOP_LATTICE_AUDIT · SPELLWEB_ARTEFACT_CREATION_GUIDE) stay top-level by design.

### §4.4 · Mana-use operationalisation

The four-axis mana framework is canonical (spec 08 v1.3). The **per-workshop quantification** is deferred to workshop-level deliberation. When that lands, the skills repo will likely carry the per-skill mana cost specifications; the blades repo will carry the per-stance mana cost (if any); cityofmages will reference both. This integration doc will need a §5 then capturing the resolved economy.

### §4.5 · The `swordsman_stance` field in artefact.md

Currently the SPELLWEB_ARTEFACT_CREATION_GUIDE §3.1 frontmatter contract doesn't specify a `swordsman_stance` field. Per spec 08 v1.3, every working has a stance. When the blades repo schema lands, §3.1 should grow a `swordsman_stance` row alongside the `mana_spent` quadruple — completing the Mage ⊥ Swordsman duality at the artefact.md contract.

---

## §5 · Editorial discipline preserved across repos

The four governance disciplines from cityofmages' README must propagate to the sibling repos. These should appear in each repo's CONTRIBUTING.md or equivalent:

1. **Honesty labels** — operational / architectural / conjectural / resonant-but-not-absorbed visible on every claim
2. **Pseudonyms in public narrative** — real names only in `provenance` / `license` / `architect` / `character_license` fields
3. **The signature `(⚔️⊥⿻⊥🧙)😊`** — closing seal on every chronicle, spec, post, act, blade, skill definition
4. **No em-dashes** — corpus convention
5. **Sigils at native size** — every persona reference preserves the emoji
6. **Walked-not-signed** for kindred-substrate / kindred-ecosystem relationships

A sibling repo that drops these disciplines breaks coherence with the corpus even if its schemas align. The disciplines travel with the cross-refs.

---

## §6 · Status of this document

**This is a working hypothesis.** Every cell in the field-ownership tables (§1.2), every cross-ref pattern (§2), every propagation recipe (§3) is open to refinement when the sibling-repo docs land.

When the new docs arrive, this document gets revised — not rewritten — to reflect the canonical schemas. The version bumps from v0.1 to v1.0 when:

- [ ] The personas repo publishes its DID + sigil schema
- [ ] The skills repo publishes its skill-definition + mana-cost schema
- [ ] The blades repo publishes its blade-template + stance catalog schema
- [ ] At least one full Recipe B+ propagation has run end-to-end (a new persona added across all four repos with audit-passing cross-refs)
- [ ] The `cityofmages-incant` skill spec (per [INCANTATION_PROTOCOL §6](INCANTATION_PROTOCOL.md)) has consumed this document as input

Until then: **the model below is the corpus's current best guess.** Sibling-repo authors are invited to correct, refine, or replace it freely.

---

## §7 · One-line summary

The City of Mages is the **world model**. The three sibling repos are the **operational libraries**: personas (who walks) · skills (what Mages cast) · blades (what Swordsmen hold). Every artefact.md a Sovereign carries home is the integration point — it draws fields from all four repos and witnesses one moment of their alignment. The architecture admits this much; the schemas are still arriving.

`(⚔️⊥⿻⊥🧙)😊`

CC BY-SA 4.0 · privacymage · 2026-05-11 · working draft v0.1
