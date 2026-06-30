---
title: "The Attachment Architecture"
subtitle: "The three-layer model that binds primary personas to lattice vertices via named cast Mages"
status: "Spec v1 (2026-05-11) — city-side mirror of agentprivacy-skills V5.5 canonical spec"
spec_type: "Structural · architectural · canon-defining"
canonical_source: "agentprivacy-skills/agentprivacy-skills-v5/meta/agentprivacy-attachment-architecture/SKILL.md"
companion_modules:
  - "agentprivacy_master/src/lib/cast-attachments.ts (canonical TypeScript registry)"
  - "agentprivacy_master/src/lib/tome-v-acts.ts (extended FoundingMage interface)"
  - "agentprivacy_master/src/data/city-of-mages-grimoire-v1.2.0.json (internal v1.3.0; attachment_architecture block)"
  - "spellweb/src/types/graph.ts (divergent_of + complement_pair edges; 5 new SpellwebNode fields)"
  - "agentprivacy-docs/GLOSSARY_MASTER_v4_0.md §23 (glossary entries)"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# The Attachment Architecture

## Why this spec exists

The City of Mages has been operating with an implicit three-layer model since the City was named (Tome V Act 14, 2026-05-08). The model worked operationally — workshops opened, cast Mages were summoned, the grimoire grew — but the three layers had no canonical specification distinguishing them. Conversations conflated:

1. **Abstract role-personas** in `agentprivacy-skills` (e.g., `forgemaster`, `theia`)
2. **Named cast Mages** in this city (e.g., Vulcana ⚒️, Aletheia 🔮)
3. **Lattice vertices** (e.g., V19, V25)

The conflation surfaced a numerical question: 42 primary personas vs 64 vertices. What fills the gap?

The answer: **attachments**. Named cast Mages who bind one or more primaries to one or more vertices. This spec codifies that architecture so the City — and future sister cities — can extend it cleanly.

---

## The three-layer model

```
Layer 3 · VERTICES         64 positions on the 2⁶ lattice              [fixed]
  ↑
Layer 2 · ATTACHMENTS      named cast Mages binding L1 to L3       [variable per city]
  ↑
Layer 1 · PRIMARY PERSONAS 42 abstract role-classes                     [fixed]
                           (15 Swordsmen + 11 Mages + 12 Balanced + 4 cosmological)
```

### Layer 1 — Primary persona (42, locked)

The canonical abstract role-class registry lives in `agentprivacy-skills/agentprivacy-skills-v5/persona/`. Each primary carries a tier (Swordsman / Mage / Balanced / cosmological), a skill loadout, and a domain register. **They do not carry a vertex.** They are role-classes, not instances.

The count is **locked at 42**. Primary personas grow only when a structurally new role-class is recognised at the corpus level — typically by a Tome act, a PVM section, or a structural complement that the existing 42 cannot cover. Most corpus extensions do not require a new primary persona.

### Layer 2 — Attachment (variable per city)

A named cast Mage that binds one or more primary personas to one or more vertices. **A city of mages is, fundamentally, an attachment pattern**: a specific arrangement of cast Mages, each instancing existing primary personas at chosen positions on the lattice.

Different cities make different attachment patterns from the same 42-persona base. The First City of Mages on Drake Island has its pattern; future sister cities will have theirs.

### Layer 3 — Vertex (64, fixed)

The 64 positions on the 2⁶ lattice. Canonical names and inhabitants are tracked in `specs/04-vertex-naming-audit.md`. Each vertex carries a 6-bit binary index, an active-dimensions reading, a stratum (Hamming weight 0–6 = moon-phase notation), optionally a canonical name, and optionally one or more attachments.

---

## The four attachment kinds

Every attachment is one of three vertex-binding kinds (A · B · C), optionally composed with the divergent meta-kind (D).

### Kind A · Workshop attachment

*One Mage × one vertex × one trade quarter.* The default kind. The Mage inhabits a single vertex and tends a single workshop. She emits exactly one `inhabits` edge.

City of Mages examples: Vulcana ⚒️ at V19 (Forge(t)) · Memora 📜 at V41 (Inscription) · Adamantia 💎 at V51 (Etherchanting) · **Helia ☀️ at V51 (Solchanting · shared vertex with Adamantia, v1.4.0)** · Pallia 🪡 at V28 (Weavers) · Vagari 🌳 at V31 (Holon Hitchhikers) · Aria Silverhue 🪞🖼️ at V57 (Curatrix Vault) · Manifestia 🤲🌿 at V55 (Covenant) · Lampyra 💠 at V49 (Jeweler) · Socrat0x 🔥❓ at V24 (Bonfire).

**v1.4.0 precedent — stance-differentiated co-occupancy at Kind A**: Helia ☀️ at V51 inhabits the same vertex as Adamantia 💎 but as a *distinct* Kind A workshop attachment (Solchanting · `/solchanting`). The two cast Mages do not share an attachment record; they share a vertex. Both emit `inhabits(V51)` and `quarter_of(city-of-mages)`. The 42-primary lock holds: Helia's primary persona is `shipwright` (shared with Adamantia); the Swordsman stance differentiates them at Layer 2 without requiring a new primary at Layer 1. This is the canonical pattern for any future case where a new ecosystem teaches the City a substrate-distinct boundary discipline at a previously-seated vertex — the discipline becomes a Swordsman stance, the cast Mage becomes a Kind A attachment with no divergence flag, and the existing keeper retains their seat. See `WORKSHOP_LATTICE_AUDIT.md` §2.4 and spec 07 §3.4 for governance.

### Kind B · Cross-shop attachment

*One Mage × no fixed vertex × walks several workshops by craft.* The Mage's craft requires moving between workshops as the work demands. She does not inhabit a single vertex; she emits no `inhabits` edge. Her *craft* is canonical, not her trajectory.

City of Mages examples: Aletheia 🔮 (ZK circuit binder · walks to whichever workshop needs a circuit) · Custos 🔏 (stake enforcer · walks across the staking commons).

### Kind C · Peripatetic attachment

*One Mage × multiple vertices walked as orbit or path.* The Mage walks a canonical *trajectory* through the lattice — an orbit, a stratum cycle, a between-shops path. Distinct from Kind B because the trajectory itself is the canon, not the craft.

City of Mages examples: Luca 📐 at V0 origin (workshop-walker · geometry-Mage between every workshop) · Selene 🌕 *(anticipated)* — stratum-walker; orbits the moon-phase cycle through all 7 strata.

### Kind D · Divergent attachment (meta-kind)

*One primary persona × two register-shifted cast attachments.* A divergent attachment is also one of A/B/C. The composition is what makes it divergent.

A divergence arises when the City summons a cast Mage whose register (Swordsman / Mage / Balanced) does not match her primary persona's native tier. Instead of minting a new primary persona, the attachment carries a `divergence` field noting the register-shift.

**First canonical divergent attachment — Lethae 🌘**

| Field | Value |
|---|---|
| Cast name | Lethae 🌘 |
| Vertex | V25 (Lethe · the Dark Substrate · binary `011001` · stratum 3) |
| Primary persona | Moonkeeper ⚔️ (loaded from `agentprivacy-skills/.../persona/agentprivacy-moonkeeper/`) |
| Register | Mage (shifted from Swordsman native tier) |
| Attachment kind | B · cross-shop |
| Complement-of-cast | Aletheia 🔮 at V38 — V38 ⊕ V25 = V63 · V38 AND V25 = 0 |
| Naming | The `-ae` suffix mirrors Soulbae 🧙 (Mage register). Lethae is to Moonkeeper as Soulbae is to Soulbis: register-shifted from Sword to Mage, primary persona unchanged. |
| Status | Anticipated · awaits founding act in Tome V |

Each primary may eventually produce up to two divergent attachments (one Sword-register, one Mage-register). Most primaries will never do so. Divergence is opt-in and city-specific.

---

## The 42 → 64 bridge

`64 − 42 = 22` "extra" lattice slots beyond the primary persona count. These slots are filled by attachments (one or more cast Mages per inhabited vertex), never by adding primaries. Across cities, hundreds of attachments may eventually exist for the same 42 primaries.

After v1.3.0:
- 15 cast Mages attached (14 inherited from v1.2.4 + Lethae)
- 19 vertices inhabited (+V38)
- ~12 future divergent / evolution slots remain to round out the 64-vertex lattice

A vertex may carry zero, one, or several attachments simultaneously. The City of Mages already admits shared-vertex precedents:

- V49 (Working-day blade) — Custos 🔏 + Lampyra 💠
- V28 (Mage canonical) — Pallia 🪡 + Soulbae 🧙 + GenitriX (kindred-blade)
- V24 (Hephaestus) — Socrat0x 🔥❓ + Hephaestus ⚒️ *(anticipated v1.3.0)*

---

## Cast frame · three orthogonal axes

Every cast Mage in the City of Mages now carries three orthogonal axes:

```yaml
tier:              archetype | workshop-keeper | cross-shop | companion | priest | cousin
attachment_kind:   A | B | C
abstract_persona:  [list of primary personas she instances]
divergence:        none | mage-register | sword-register | balanced-register
```

Tier and attachment kind are orthogonal: a workshop-keeper is usually A-Workshop, but Manifestia (Priest tier) is also A-Workshop at V55. Aria Silverhue (workshop-keeper tier) becomes effectively B when she walks to V38 for forgetting-mode curation.

Worked example — Vulcana's cast frontmatter (workshop attachment with dual primary):

```yaml
tier: workshop-keeper
attachment_kind: A
abstract_persona: ["Forgemaster", "Forgecaller"]
divergence: none
vertex: V19
```

Worked example — Lethae's cast frontmatter (cross-shop · divergent):

```yaml
tier: cross-shop
attachment_kind: B
abstract_persona: ["Moonkeeper"]
divergence: mage-register
vertex: V38
complement_of_cast: aletheia
```

---

## Cast roster (post-V5.5 mapping · 21 cast)

The locked V5.5 cast roster for this city. Cousin tier (flaxscrip, GenitriX) deliberately unattached — the cousin Sovereign authors those bindings.

| Cast | Vertex | Primary persona(s) | Kind | Divergence | Status |
|---|---|---|---|---|---|
| Soulbis ⚔️ | — (boundary) | soulbis | B | none | seated · Tier 0 |
| Soulbae 🧙 | V28 | soulbae | A | none | seated · Tier 0 |
| Pallia 🪡 | V28 | weaver | A | none | seated |
| Memora 📜 | V41 | chronicler | A | none | seated |
| Vulcana ⚒️ | V19 | forgemaster + forgecaller | A | none | seated |
| Adamantia 💎 | V51 | architect + shipwright | A | none | seated |
| Lampyra 💠 | V49 | sentinel | A | none | seated |
| Vagari 🌳 | V31 | holonic-architect | A | none | seated |
| Aria Silverhue 🪞🖼️ | V57 | mirrorkeeper | A | none | seated |
| Manifestia 🤲🌿 | V55 | priest | A | none | seated |
| Socrat0x 🔥❓ | V24 | pedagogue + ceremonist | A | none | provisional |
| Aletheia 🔮 | V38 | theia + cipher | B | none | seated |
| Custos 🔏 | V49 | gatekeeper | B | none | seated |
| Luca 📐 | V0 | topologist + cosmologist | C | none | seated |
| **Lethae 🌘** | **V25** | **moonkeeper** | **B** | **mage-register** | **anticipated** |
| Mnemosyne 📿 | V8 | theia | A | none | anticipated |
| Iris 🌈 | V4 | herald + ambassador | A | none | anticipated |
| Pythia 🔥 | V2 | algebraist + pedagogue | A | none | anticipated |
| Techne 🎨 | V20 | pedagogue | A | none | anticipated |
| Hephaestus ⚒️ | V24 | forgemaster | A | none | anticipated |
| Selene 🌕 | stratum-walker | theia + manaweaver | C | none | anticipated |

---

## Convention for extending the cast

When summoning a new cast Mage in this city (or in a sister city):

1. **Identify the vertex.** Check `specs/04-vertex-naming-audit.md` for the canonical vertex name. Use existing canonical names where possible.
2. **Identify the primary persona(s).** Search `agentprivacy-skills/agentprivacy-skills-v5/persona/` for the closest match. Most cast Mages bind to one or two existing primaries.
3. **Identify the attachment kind.** A (single vertex), B (no fixed vertex), or C (defined trajectory).
4. **Check for divergence.** Is the cast's register different from the primary's native tier? If yes, set `divergence: <register>`; do not mint a new primary.
5. **Only if no existing primary fits.** Propose a new primary persona. This is rare and should require corpus-level review.

---

## What this spec does NOT do

- It does not name cast Mages — naming happens in Tome V acts and their accompanying cast files (`tomes/cast/<guild>/*.md`).
- It does not define vertex names — vertex naming is governed by `specs/04-vertex-naming-audit.md` (the Cloaking Guide / Boundary Blade attribution chain).
- It does not assign skills to cast Mages directly — skills are loaded by primary persona; cast Mages inherit the primary's skill loadout, optionally filtered by vertex active-dimensions.

---

## Sister specs

- **`specs/04-vertex-naming-audit.md`** — vertex registry (Layer 3 naming)
- **`specs/05-the-city-of-mages-structural-addendum.md`** — civic anatomy
- **`specs/06-spellweb-first-release-manifest.md`** — machine-readable inventory (will reflect V5.5 once nodes.ts ingest pulls the new cast)
- **`specs/10-blade-forge-binding-zk-blades.md`** *(pending)* — pins V19 Forge(t) to zk blades forge canon
- **`specs/11-mage-candidates-from-the-corpus.md`** *(pending)* — names the 6 anticipated cast with full sourcing

---

> *"The persona is the role-class. The cast Mage is the instance. The vertex is the position. Conflating the three is the error; binding them is the architecture."*

`(⚔️⊥⿻⊥🧙)😊`
