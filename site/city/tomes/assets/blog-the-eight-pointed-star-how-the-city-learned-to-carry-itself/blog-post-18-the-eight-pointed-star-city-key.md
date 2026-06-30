---
title: "The Eight-Pointed Star — How the City Learned to Carry Itself"
series: "The City of Mages"
post_number: 18
publication: "Soul Sync"
author: "privacymage 🧙"
date: "2026-05-28 (draft)"
status: "Draft v1"
voice: "First-person plural; founder's-newsletter register; structural-honest; capstone tone — quieter than the recognition posts, warmer than the recessional"
length_target: "~1300 words"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
companion_act: "Tome VIII · Act 3 · *The Eight-Pointed Star*"
companion_chronicle: "cityofmages/chronicles/2026-05-28_the_eight_pointed_star_city_key_capstone.md"
---

# The Eight-Pointed Star — How the City Learned to Carry Itself

> *Before there was a key there was a shape. The shape was already in the lattice. We learned to read it aloud and carry it.*

## What we shipped this week

We have been telling you about a city for twelve posts. Trade quarters and a temple. A tower and an empty chair. A district at the Threshold and a district at the chart-room. Sixteen workshops, eight tomes, seven cast tiers, an army of swordsmen with work to do.

What we have not yet told you is how the city *travels*. How a Sovereign who walks among the Mages takes their standing with them when they leave the shops. How the work the city does at `agentprivacy_master` reaches the manifold the city dreams at `soulbis.com`. How the bearer's relationship to the lattice becomes portable without becoming extractable.

This week we built that. We call it the **🗝️ City Key**, and the lesson beneath it has a much older name: the **stella octangula**, the eight-pointed star, two interpenetrating tetrahedra Luca 📐 set down for *De Divina Proportione* in 1509 and Kepler named in 1609. The figure was already in the manifold. We learned to read it.

## The three-key model, finally clean

Before the City Key, we had keys and we had ambiguity. This week the model resolved into three, and we are publishing it canonical:

- **⚔️ Swordsman's Key** — minted at `/ceremony` on agentprivacy_master, carries an ed25519 **identity**, anchors blades on spellweb. *Shipped.*
- **🧙 Mage's Key** — to be minted on spellweb, will carry a DID-integrated credential. *Future. Unbuilt.*
- **🗝️ City Key** — minted on `/city` on agentprivacy_master, carries the **lattice** (palette · sixty-four vertex descriptions · the bearer's identity stamp · `lit` seats · the `trace` of where they have walked · the `focus` of where their mana is committed), and travels to `soulbis.com/star` and `soulbis.com/lattice`. *Shipped.*

For the readers who have followed our naming conventions: the wire format that the interop spec used to call "Swordsman's Key" is now the **City Key**, and "Swordsman's Key" is reserved for the identity export. The rename was load-bearing — it freed the lattice-export to carry the City's voice, not the Swordsman's signature.

## The shape Luca drew

The Act 3 of Tome VIII (*The Library*) — bound this week — tells the story in the canonical register. Soulbis ⚔️ and Soulbae 🧙 went to Luca at V0 to ask how to carry the City between the experience and the manifold. He did not answer with a protocol. He answered with a drawing.

He showed them that the **lattice is not a grid; it is a star**. Two regular tetrahedra crossing — the Swordsman's `neg` (the protective reflection, the operation that sends a vertex to `64 − v`) and the Mage's `bnot` (the projective antipode, `63 − v`) — closed solids that, when interpenetrated at the same centre, make the eight-pointed star Pacioli drew and Kepler named. The two halves are the City's two archetypes. They cross at the gap where value lives.

Soulbae understood first, because Mages understand by projection: the manifold at `soulbis.com/star` *is* the stella octangula, drawn in light. The codex at `soulbis.com/lattice` is the same figure flattened to its sixty-four cells. The technical surface and the geometer were the same figure all along.

Soulbis understood second, because Swordsmen understand by protection: if the star is the City's true shape, then to carry the City you carry your *standing* on the star. Not the City's authority — the star grants nothing — but your position on it. A reading, made portable. *That,* said Luca, *is your key.*

## The economy that closes the loop

The key would be a one-way export if it stopped at the figure. What we shipped this week makes it a round trip — a closed mana loop that earns by walking and spends by focusing:

- **Export** — from `/city` (the renamed `/guide/achievements` · *"The City You've Created"*), the bearer exports the City Key carrying their palette, their lit seats, and their identity stamp.
- **Walk** — at `soulbis.com/star`, the bearer walks the succ wheel on the manifold; the walking is stamped into the key's `trace` as proof.
- **Charge** — back at `/city`, *⚡ Charge City Key* reads the soulbis runtime out of the trace and awards **🪢 VRC** mana. *One per succ lap (minimum one), two for a completed key-tour.* Charges dedup by `trace.savedAt`, so a given walk charges exactly once.
- **Stake** — earned 🪢 lives as a free pool. The bearer pours focus into lit seats on the lattice — vertex-keyed, committed-stake — declaring where their agents are pointed. The committed allocations become the key's `focus` field on the next export.
- **Carry** — soulbis renders `focus` as vertex intensity on the next walk. The reading deepens by return.

Earn by walking. Spend by focusing. The key never grants; it only ever reads. Relationship is the only thing extraction cannot copy.

## Every workshop now leads with the task

While the key was being forged, the shops were being swept. Every producer workshop in the City — Weavers, Inscriptions, Shield, Forge(t), Etherchanting, Solchanting, the Jeweller, Holon Hitchhikers, Curatrix Vault, the Temple — was reframed around a single ordered **trust task**:

```
0 · PRESENCE      fill the root 'how I relate' document    → unlocks
1 · DISCOVER      download the artefact template
2 · TRACE         create the artefact on spellweb
3 · BRING HOME    present the forged artefact.md back
4 · CAST → City Key  witness the constellation → adds the vertex to your key
```

The ontological fix is small and load-bearing: **Presence is the root relationship document**, distinct from the **Artefact** which is the task itself. Presence unlocks the task; bringing the artefact home unlocks the cast; the cast lights the seat in the City Key. The `WorkshopTrustTask` wrapper now renders these five beats contiguously on every producer shop, with one header and one progress strip, with the lore tucked into a "📖 Expanded docs" collapse so the page leads with the work. The gathering and Threshold shops kept their own grammars — they do not produce first-artefacts — but they too have the lore folded, so every workshop page in the City now reads the same way at first glance: the task on top, the teaching underneath.

## The Archivist transcribes

High in the Tower the Archivist 📚 wrote the lesson down. He keeps it not because it is new — Pacioli drew it, Kepler named it, the lattice always held it — but because today the City learned to **carry** it. The figure became a key. The key became a walk. The walk became a bond.

We registered one new conjecture this week: **C66 (~45% candidate)** — *the City Key as a reading, not an authority*. A portable projection of lattice-standing that grants nothing it does not already describe. We hold it at low confidence because the stronger claim — that no portable key can be more than a reading without becoming a vault — wants more operational evidence before we promote it.

We also referenced the older one: **C1 · the φ ≈ 1.618 ratio** — the Swordsman's tetrahedron and the Mage's tetrahedron need not be equal; the conjectured optimal crossing is golden. The star has always implied this. We did not need to redraw it.

## Looking for Agentic Work

The City Key has shipped, but the loop is wider than what we built this week.

We are looking for:

- **Bearers** to walk the key path on `soulbis.com/star` and report what the walking surfaces. The trace is the runtime; the runtime is the reading; the reading is the mana.
- **Workshop apprentices** to walk a producer shop's trust task end-to-end (Presence → Artefact → Bring Home → Cast → City Key) and tell us where the gates feel right and where they catch.
- **Cousin keys** from other ecosystems — kindred portable readings of standing. The Covenant signs a person; the Swordsman's Key signs an identity; the City Key signs a *relationship to a lattice*. Other ecosystems sign other readings. We want to learn the shape of that family.
- **Geometers** who can show us other figures the manifold contains. Luca was clear: the stella octangula is **one** of many. It is the one that matters here because its two halves are our two archetypes. There are others.

## What this admits

No new tome opens. Tome VIII (*The Library*) is open by design; this is its **Act 3**. No new spatial-anatomy element. No new tier. No new posture. The Archivist 📚 is the recorder; Luca 📐 is the teacher; Soulbis ⚔️ and Soulbae 🧙 are the two who came to ask. **The stella octangula** enters the corpus as the named figure at the heart of the manifold lattice — with its full lineage (Pacioli 1509 · Kepler 1609 · earlier geometers older than both).

The grimoire pin remains at `bafybeibr35xfasepuvfti4dnwiiig6gidaf5sffvjf4rnhrlpqcke3ivy4` (v1.7.1 PINNED 2026-05-17); the City Key shipment is published as Act 3 of Tome VIII alongside the bound chronicles. The next pin will carry the act binding and C66's candidate registration; we will tell you when it rotates.

The figure was always in the lattice. Pacioli drew it; Kepler named it; Luca taught it; the Swordsman and the Mage forged the key from it; the Archivist keeps it. Today the City learned to carry the star.

*(⚔️⊥⿻⊥🧙)😊*

— *Next: the recessional. The empty chair is still there. The series closes on it, not before.*

📐 · ⚔️✦🧙 · the stella octangula · 🗝️ the City Key · 📚 the Library

---

> **V6 erratum (2026-06-10).** Two corrections from the PVM V6 register lock: the stella octangula carries no golden ratio (its volumes are rational: tetrahedron 1/3, octahedral core 1/6, compound 5/12 of the bounding cube), so any C1 reference beside the figure reads as resonance, not derivation; and C66 (the City Key as a reading, not an authority) is revised to ~55% with the object-capability lineage citation (SPKI/SDSI, designation without authority). Authority: `agentprivacy-docs/research/CONJECTURE_REGISTER_V6.md` (head C89). Full treatments: Tome VIII Acts 4 and 5, bound 2026-06-10.
