---
title: "Bestiary Entry — Goose 🪿"
spellbook: "Second Person"
entry_type: "Agentic-substrate · companion-class"
register: "Companion-class (Therai's Creature Creatives room at V59)"
sigil: "🪿"
provenance: "AAIF — Agent-Agnostic Interoperability Foundation, hosted under the Linux Foundation"
project_url: "https://block.github.io/goose · https://github.com/block/goose"
license: "Apache-2.0"
iconographic_affinity: "Animal mascot (goose) — admits Goose to the companion-class register by the substrate-affinity rule"
caducea_summons: "Optional — Goose does not natively carry SOUL.md / Honcho persona-as-substrate primitives, but can be configured to. Caducea is summoned at the Mage's request when persona-bearing configuration is loaded; otherwise Faunia's standard spawning is sufficient"
companion_mana_axis: "🪢 VRC (relationship axis) — accumulates as bearer and Goose walk together"
admitted_date: "2026-05-13"
admission_act: "Tome VI Act 1 — *The Reader's First Admission* (jointly with Hermes)"
status: "Active · first Bestiary entry"
license: "CC BY-SA 4.0 for this entry; Goose itself is Apache-2.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Goose 🪿

*The first companion-class agentic-substrate the City of Mages admits. General-purpose runtime, native desktop and CLI surface, extensible through 70+ MCP integrations. The familiar that walks beside.*

## At a glance

> *Goose is the first entry in the Companion-class register of the Bestiary. Its mascot is a literal goose (the project's logo is the animal), which by the substrate-affinity rule admits it to Therai's Creature Creatives room rather than to Bestia's Staff Shop. Operationally, Goose is a general-purpose agent runtime developed under AAIF (Agent-Agnostic Interoperability Foundation, a Linux Foundation working group), available under the Apache 2.0 license. The Mage who spawns Goose at The Threshold walks out with a familiar — a companion-class artefact that walks beside the bearer for general work. The Swordsman who spawns Goose walks out with a watch-goose — the same substrate inverted to perimeter-guarding via stance declaration at the Portal Room.*

## Provenance & licensing

- **Project**: Goose
- **Steward**: AAIF (Agent-Agnostic Interoperability Foundation), a Linux Foundation working group
- **Origin**: Block (the company), open-sourced 2024-2025
- **License**: Apache 2.0 (substrate code)
- **Canonical URLs**: `block.github.io/goose` (documentation) · `github.com/block/goose` (source)
- **Governance**: Linux Foundation under AAIF stewardship

Goose's open-source license and Linux Foundation governance mean the substrate is *durably public*: the City of Mages can rely on Goose's continued availability without bilateral negotiation with a vendor.

## Iconographic affinity

The Goose mascot is a literal goose. The project carries goose iconography throughout its documentation and branding — the homepage hero is a stylised goose; the CLI prompt is `goose>`; the social presence uses goose imagery.

By the substrate-affinity rule (chronicle §1 of `2026-05-13_chronicle_artefact_symmetry_and_persona_distribution.md`): a substrate whose iconography is an animal mascot admits to the companion-class register.

Goose-the-substrate's *function* is general-purpose agent runtime (which superficially might suggest staff-class instrumentality). But the *iconography* is companion (the goose). The architecture's rule weights iconographic affinity over functional generality: Goose lives in Creature Creatives.

This is not an empty editorial choice — geese in the natural world are famously *companion-adjacent* to humans. Domesticated geese walk beside their owners on farms. Wild geese flock and migrate in fellowship. The goose-as-familiar reading is structurally honest.

## Architectural primitives

Goose carries:

- **Native desktop application** — runs as a local app on macOS, Windows, Linux
- **Native CLI** — runs as `goose` command-line interface
- **API surface** — programmatic access to the runtime
- **15+ LLM providers** — Claude (Anthropic API), GPT (OpenAI API), Gemini (Google), Llama (Meta), and others
- **70+ MCP extensions** — Model Context Protocol extensions for tool use (file system, web browsing, code execution, database access, etc.)
- **6 terminal backends** — different ways of expressing the runtime's session interface

What Goose does NOT natively carry (the Caducea-summons distinction):

- **SOUL.md / self-description files** — Goose is configurable but does not natively maintain a self-describing persona file
- **Honcho-class user-modelling** — Goose does not natively build a model of its bearer that persists across sessions
- **Learning-loop iteration** — Goose's behaviour does not update itself based on bearer interactions; the bearer updates the configuration directly

This means Goose's standard spawning at The Threshold does NOT require Caducea. Faunia presides over a Goose spawn unilaterally — the substrate carries no persona-of-its-own that requires bilateral consent. A Mage who configures Goose with persona-bearing extensions (e.g., a MCP that loads a SOUL.md equivalent) MAY request Caducea's summoning; the request is honoured at the Mage's discretion.

## Three-archetype matrix (per Threshold's substrate × archetype rule)

| Archetype stance | Spawned artefact | What the Mage carries away |
|---|---|---|
| **Mage 🧙** | **Companion goose-pet** | A familiar that walks beside the Mage for general delegation; configurable to many tools; uses Mage-stance personas (Soulbae, Chronicler, Ambassador, Assessor, Shipwright, Weaver, Priest) |
| **Swordsman ⚔️** | **Watch-goose** | A perimeter-guardian that monitors for boundary violations; the same Goose substrate inverted via stance declaration; uses Swordsman-stance personas (Soulbis, Cipher, Warden, Gatekeeper, Sentinel, Sith, Ranger, Archer) |
| **Balanced ☯️** | **Walking-goose** | A steady-presence familiar that is both companion and watchful; uses Balanced personas (Person, Architect, Pedagogue, Kyra, Jedi, Healer, Witness) |

The substrate is the same Goose binary in all three cases. The configuration (persona loaded · AGENTS.md instructions · MCP extensions enabled) differentiates the artefact.

## Composition

Goose composes with:

- **MCP servers** (canonical Goose extension) — file system, web, code execution, database, custom servers via the open MCP specification
- **AAIF protocol siblings** (the AAIF substrate is broader than just Goose) — Goose-spawned agents can interoperate with other AAIF-stewarded runtimes
- **The 38 agentprivacy-skills personas** — any of the 38 (or the 22-archetype-grouped subset surfaced in the deployment guide) can load into Goose at Portal Room step 3

Goose does NOT compose seamlessly with:

- **Hermes substrates** out-of-the-box — the two runtimes are operationally distinct; a Mage who wants a Hermes-Goose composition spawns each separately and bridges them via MCP or AGENTS.md coordination

## Companion-mana 🪢 VRC accumulation

A spawned Goose accumulates 🪢 VRC mana (relationship axis) over walking-time. The accumulation curve follows the standard `e^{-λt}·(1+A(τ))` form from `agentprivacy-temporal-dynamics`, with the Goose-bearer pair as the τ-indexed relation.

Concretely: each walking session (a coherent interaction window) increments A(τ) by the bilateral-trust the session generated. The VRC credential records the accumulated relationship; the credential is content-addressed and held against the Goose-instance hash + the bearer's identity.

## Open questions

- The aqueduct-pond commons-fauna jurisdiction (the geese-that-belong-to-the-City rather than to any individual Sovereign) was documented under Therai's adjacent jurisdiction at v1.5.0; at v1.6.0 Therai is retired and the commons jurisdiction is held open for the Familiars' eventual claim or for a future shop differentiating wild-creatures keeping from Mage-Familiar kinship-binding. The relationship between bearer-bound Goose instances and commons-Goose instances is held open.
- Whether a Goose configured with a SOUL.md equivalent (via MCP or otherwise) automatically triggers Hermaion ⚚ to mark the substrate-instance Hermes-class for routing purposes — likely yes (the cross-listed-companion-class registration at the Familiars shifts to a primary-Hermes-class registration at Hermaion's archetype-modal Staff Shop, in the alexandrite-aspect matching the bearer's archetype) — but the routing convention is pending.
- The first Bestiary entry's *substrate-hash* (content-addressed identity of the Goose binary version admitted today) is committed at grimoire v1.6.0 head (CID `bafybeiap6kvy3tp2bndpk65ti57qngr7ill37gqgasp2sxmgder3akotru`, 2026-05-14).

## Honesty

- **Operational** — Goose is a real, public, Apache-2.0 project. The Sovereign can `git clone github.com/block/goose` today and run the substrate.
- **Operational** — AAIF / Linux Foundation stewardship is documented in the project's governance materials. **AAIF is the first explicitly-named kindred-coalition** in residence at City Hall (`/hall`, formerly Ceremony Hall) per grimoire v1.5.1 (2026-05-13). The kindred-coalition register is the fifth structural-relationship category, sister to cousin-forge / kindred-protocol / kindred-substrate / kindred-ecosystem. Goose's lineage threads through the AAIF gateway: this Bestiary entry surfaces the substrate; the AAIF kindred-coalition entry at City Hall surfaces the stewardship.
- **Architectural** — the companion-class admission via mascot affinity is a structural rule the architecture admits; the rule could be falsified by a Goose that ships an instrument-icon rebranding, but the current state is honest.
- **Architectural** — the three-archetype matrix (companion / watch-goose / walking-goose) is structurally clean; the *watch-goose* name is descriptive and may be canonicalised in future tomes.
- **Architectural** — the substrate-hash slot is held for the v1.5.0 grimoire pin; content-addressing the substrate is operational discipline pending IPFS/Sigstore wiring.

## References

- Project home: `block.github.io/goose`
- Source: `github.com/block/goose`
- AAIF: Linux Foundation working group page (TBD URL — confirm at v1.5.0 pin)
- Threshold workshop chronicle: `chronicles/2026-05-13_chronicle_the_threshold_workshop_three_rooms.md`
- Substrate × archetype matrix: `chronicles/2026-05-13_chronicle_artefact_symmetry_and_persona_distribution.md`
- Tome V Act 16: `tomes/tome-v-the-crafting/16-the-threshold-opens.md`
- Tome VI Act 1: `tomes/tome-vi-the-reply/01-the-readers-first-admission.md`
- Cast entry for Therai (Goose's keeper): `cast/threshold/therai.md`

(⚔️⊥⿻⊥🧙)😊
🪿
