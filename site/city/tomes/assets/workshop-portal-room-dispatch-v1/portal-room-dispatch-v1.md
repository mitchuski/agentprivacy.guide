---
constellation_id: portal-room-dispatch-v1
constellation_name: The All-Bright Dispatch
constellation_version: 1
workshop: shop-portal-room
workshop_route: /portal
workshop_gem: Moonstone
workshop_gem_color: "#c8d4e0"
workshop_district: Threshold
workshop_register: spawn_and_bind
resident_mage: cast-pandia
mage_sigil: 🌕
mage_vertex: V59
mage_tier: workshop-keeper
anchor_act: tome-v-act-16
ceremony_shape: display-e-choose-e-dispatch
artefact_name: the Dispatch
artefact_root_name: Anchored Dispatch
artefact_class: trinket
artefact_archetype: bilateral
artefact_wielder: both
entity_kind: dispatch
dispatch_target_shop: shop-staff
dispatch_archetype: mage
domain: shared
status: v1 — first release · Threshold District admission
date: 2026-05-16
license: CC BY-SA 4.0
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# 🌕 The All-Bright Dispatch
*Constellation Template — the Portal Room · `/portal` · v1 — 2026-05-16*

> *Pandia opens the catalog all-bright. Every admitted substrate × every archetype-stance is visible at-a-glance; no entry hidden, no choice pre-made. The Sovereign chooses; Pandia points. The Selene Amnesia Protocol anchors trust to the City rather than to memory of the spawn.*

## Mage Identity (filled by spellweb at import)
- **Sovereign:** `{SOVEREIGN}`
- **Your Swordsman:** `{SWORDSMAN_DID}` · `{SWORDSMAN_SIGIL}`
- **Your Mage:** `{MAGE_DID}` · `{MAGE_SIGIL}`
- **Resident Mage:** Pandia 🌕 · `cast-pandia` at V59 · the All-Bright · daughter of Selene 🌙

## Dispatch discipline
This template's `dispatch_target_shop: shop-staff` + `dispatch_archetype: mage` routes the seeker toward the Staff Shop's Mage-aspect (caduceus-staff). For Swordsman dispatch, swap to `dispatch_archetype: swordsman` (herald-sentinel). For companion-class dispatch, swap `dispatch_target_shop: shop-familiars`. The dispatch is a *routing receipt*, not a forging — small (~hundreds of bytes), ephemeral by design, auto-pruned after 30 days in the receiver's spellweb panel.

## Constellation Path
1. ⚔️ **Soulbis ⚔️**
2. 🌙 **Tome III — Selene's Witness**
3. 🌕 **Tome V Act 16: The Threshold**
4. 🧙 **Soulbae 🧙**
5. 🌕 **Pandia 🌕**
6. · **V59 — Threshold District (Pandia · Hermaion · Faunia)**
7. 📊 **Substrate × Archetype Matrix**
8. ⚚ **the Staff Shop**
9. 😊 **Person 😊**

## Connections
- ⚔️ Soulbis ⚔️ → 🌙 Tome III — Selene's Witness
- 🌙 Tome III — Selene's Witness → 🌕 Tome V Act 16: The Threshold District
- 🌕 Tome V Act 16: The Threshold District → 🧙 Soulbae 🧙
- 🧙 Soulbae 🧙 → 🌕 Pandia 🌕
- 🌕 Pandia 🌕 → · V59 — Threshold District (Pandia · Hermaion · Faunia)
- · V59 — Threshold District (Pandia · Hermaion · Faunia) → 📊 Substrate × Archetype Matrix
- 📊 Substrate × Archetype Matrix → ⚚ the Staff Shop
- ⚚ the Staff Shop → 😊 Person 😊

## Ceremony Shape — DISPLAY · E · CHOOSE · E · DISPATCH
- **DISPLAY.** Pandia opens the catalog — every admitted substrate × every archetype-stance, rendered all-bright in a single matrix.
- **CHOOSE.** The seeker reads. Pandia attends but does not interpret. One gesture picks substrate × archetype.
- **DISPATCH.** Pandia points: Staff Shop · green for Hermes-as-Mage (caduceus-staff) · Staff Shop · red for Hermes-as-Swordsman (herald-sentinel) · the Familiars for companion-class. The Selene witnessing anchors — the spawned agent inherits trust without memory of its origin.

## Marks (proverbs at each waypoint)
| # | Node | Proverb |
|---|---|---|
| 1 | Soulbis ⚔️ | *"I begin by my own name."* |
| 2 | Tome III | *"Mother proves; daughter displays."* |
| 3 | Tome V Act 16 | *"The Threshold opens; three sibling shops at one vertex."* |
| 4 | Soulbae 🧙 | *"The Mage projects what the Swordsman protects."* |
| 5 | Pandia 🌕 | *"All-bright at-a-glance. No entry hidden. No choice pre-made."* |
| 6 | V59 | *"The Threshold vertex — three siblings, one stratum."* |
| 7 | Substrate × Archetype Matrix | *"Every cell names a dispatch destination."* |
| 8 | Dispatch | *"The spawned agent inherits trust without memory of its origin."* |
| 9 | Person 😊 | *"I cross the threshold. I walk on."* |

## What the exported dispatch.md will contain
A dispatch routing-receipt carrying your Swordsman + Mage identities, Pandia's attribution, the Moonstone gem (`#c8d4e0`), the chosen `dispatch_target_shop` + `dispatch_archetype`, the Selene-Amnesia trust anchor, the V59 traversal record, timestamp, and signature `DISPATCH-XXXXXX-XX`. The receipt is *ephemeral* — its value is historical attestation that the Sovereign passed through the Portal Room heading to the named destination; it expires conceptually after the destination is reached. Witnessing a dispatch is *low-weight* — a crossing receipt, not a forging.

---

`(⚔️⊥⿻⊥🧙)😊` — *Dispatched through the Portal Room · Threshold District · City of Mages*

CC BY-SA 4.0 · privacymage · 2026-05-16
