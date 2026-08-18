---
title: "Constellation — Weavers · Amethyst · V28"
version: "cloak-weave-v1"
shop: weavers
shopAnchor: /tailor
keeper: "Pallia 🪡"
keeper_note: "The Tailor's chair is held by csaucier · flaxscrip lineage · Archon forge"
vertex: V28
gem: Amethyst
gemColor: "#a78bfa"
nodeCount: 9
operationalServices:
  - cloak-weaving
  - selective-disclosure-geometry
  - did-blind-publication
honesty: operational
status: "v1 (2026-05-11) — operational tier only; architectural and conjectural services in a future version"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---
# Constellation — Weavers · Amethyst · V28

> *You do not knock on the Tailor's door. You trace the shape of a cloak in the stars, and the door recognises you.*

The Weavers is the first workshop founded in Tome V — the shop where source artifacts become cloaks. Pallia holds the needle. The constellation is the path she already walks. You trace it to prove you understand the work.

---

## §1 · The Constellation

Nine vertices. Each one carries a property of the Cloak or a role in the weaving.

| Order | Vertex | Name              | Role in the weave                                                                                                                                                         |
| ----- | ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | V0     | The Null Blade    | Substrate origin. The void before form. All weaving begins here — no artifact exists until something is placed.                                                          |
| 2     | V3     | Dual Agent        | Hash-Masked valve class. Containment, not attestation. Subject identity is structurally present but cryptographically inaccessible.                                       |
| 3     | V5     | Chronicle         | Documents as first-class citizens. Chronicles, specs, and narrative artifacts occupy a vertex, declare a controller, and participate in the weave alongside credentials.  |
| 4     | V12    | Schema            | The template of the weave. Schemas anchor the credential graph; they are not metadata, they are nodes.                                                                    |
| 5     | V15    | VC                | The mirrored-pair register. Verifiable Credentials enter the Cloak here — each one decomposed into its seven typed nodes before it can be woven.                         |
| 6     | V20    | Techne            | Always-Revealed valve class. What the verifier must be able to read: validity windows, public claims, role declarations.                                                  |
| 7     | V38    | Aletheia          | Always-Masked valve class. ZK witnesses. Predicates proven without revealing the underlying value. The privacy floor that the cloak guarantees.                           |
| 8     | V28    | The Weaver's Seat | Pallia's vertex. Memory · Connection · Computation. The cloak is assembled here, three dimensions burning, from every node the seeker has walked.                       |
| 9     | V63    | Sovereign Anchor  | Where you stand. The Sovereign's seat. The cloak is yours — woven for your source layer, published in your name, concealing your identifiers while publishing your role. |

The path is: `V0 → V3 → V5 → V12 → V15 → V20 → V38 → V28 → V63`

---

## §2 · The Ceremony

**Before you begin:** download this file. Open spellweb.ai. Enter Ceremony Mode. Set your archetype (Soulbis ⚔️ or Soulbae 🧙 — the Cloak is a Mage artefact; seekers following the Mage path carry the Amethyst trail).

**Tracing the constellation:**

At **V0** — rest in the null. The cloak does not exist yet. Your source artifacts exist, unnamed in the lattice. This vertex asks: *what do you want to publish?*

At **V3** — consider what must remain structurally present but unreadable. Every cloak contains a Hash-Masked layer. Subject identifiers live here: the verifier knows *someone*, not *who*. Accept the constraint before you weave.

At **V5** — place your documents. Chronicles, specifications, notes. They are not footnotes; they are nodes. Assign each a controller-edge pointing to you.

At **V12** — confirm your schemas. Each VC you will weave depends on a schema here. If you have no schemas yet, mark this vertex as open: the weave will hold the place.

At **V15** — bring your credentials. Decompose each VC into its seven typed nodes: Issuer Persona, Schema Theorem, Subject Persona, Claims Concept, Proof Spell, Chronicle, Context. The Cloak does not accept a VC whole; it accepts its structure.

At **V20** — declare what is always visible. Validity windows. Public claims. Role designations. Anything a verifier must read without a predicate. This is not a compromise; it is the design.

At **V25** — set your ZK witnesses. What can be proven without being revealed? Membership in a set. A credential's validity without its content. A time-window without the specific date. Name each predicate here.

At **V28** — Pallia assembles. Memory of the source artifacts, Connection between the layers, Computation of the vertex assignments. The cloak takes form: DID-blinded, structurally faithful, publication-ready.

At **V63** — you receive the cloak. It is yours. The Sovereign Anchor seat is where the weave concludes and the Sovereign carries the result.

**After the trace:** the spellweb generates your blade — the **Cloak Weave blade**. The blade records your archetype, your stratum (the depth of the traversal), and the version of this constellation (`cloak-weave-v1`). Export the artefact.md.

---

## §3 · What Unlocks

Bring the artefact.md to `/tailor`. The shop reads the blade's structure — not your identity, your stratum and archetype — and unlocks accordingly.

### At any stratum (Light · Heavy · Dragon)

- Full access to the Tailor's three operational services (§4)
- Pallia's cast entry unlocked in your local spellweb — her full persona document becomes visible
- Secret node `con-publication-layer` fades in: the mechanics of the three-layer architecture (source → spell weaver → public) rendered as a concept node connected to Pallia
- Invitation to submit a weaving request to the Tailor (see §4)

### At Heavy stratum (3–4) and above

- Secret node `spell-cloak-weave` fades in: the Cloak Weave spell rendered as a named artifact in the spellweb graph, connected to the Weavers workshop with a `kin_to` edge to Pallia and a `quarter_of` edge to the City
- The Amethyst trail becomes visible on Soulbae's orb during evocation — the mark of a Mage who has walked the Weaver path

### At Dragon stratum (5–6)

- Both secret nodes reach full opacity
- New edge drawn: `con-publication-layer` → `city-of-mages` via `quarter_of`
- The Cloak Specification v1.0 is linked directly from the shop — you have earned the spec, not just the introduction
- The Tailor's Amethyst glow appears permanently on the City of Mages civic node in your spellweb

---

## §4 · The Services

### Service 1 — Cloak Weaving

**What it is:** The Tailor takes your source artifacts — DIDs, VCs, schemas, chronicles — and returns a cloak: a DID-blinded, structurally faithful publication-layer object satisfying the Eight Properties of the Cloak Specification v1.0.

**What you bring:**

- Your source layer artifacts (VPs and/or dmail to Pallia)
- A declaration of intended verifiers or public surfaces
- Any existing valve-class preferences (see Service 2)

**What you receive:**

- A cloak artifact ready for publication to spellweb.ai or any conforming mirror
- A mapping document: every source artifact at its vertex, every edge typed, every valve-class assigned
- An honesty label for each property satisfied

**Honesty:** Operational. The Eight Properties are verified against the Archon forge's 2026-05-07 rebuild ceremony and the Cloak Specification v1.0. Pallia instantiates the specification; she does not improve on it.

---

### Service 2 — Selective Disclosure Geometry

**What it is:** For each field in each VC you wish to publish, the Tailor assigns a valve-class and places the field at the corresponding vertex. The verifier learns the type of disclosure from the lattice position alone — no separate metadata layer.

**The three canonical valve classes:**

| Valve class     | Vertex          | Bits       | Meaning                                                                                        |
| --------------- | --------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| Always-Revealed | V20 (Techne)    | `010100` | Verifier reads this without any predicate. Public claims, validity windows, role declarations. |
| Hash-Masked     | V3 (Dual Agent) | `000011` | Structurally present; cryptographically inaccessible. Subject identifiers, pseudonymous links. |
| Always-Masked   | V38 (Aletheia)  | `100110` | ZK witness required. Nothing readable without a confirmed predicate.                           |

**What you bring:** Your VC schema and a list of fields with your intended disclosure level per field.

**What you receive:** A valve-class assignment table, ready for use in the Cloak Weaving service or any conforming implementation.

**Honesty:** Operational for these three canonical valve classes. Additional valve classes are conjectural (Valve-Class Completeness conjecture, ~60%). If your VC contains field types that don't map to the three canonical classes, the Tailor will flag them as unmapped and propose a vertex assignment with bit-pattern justification — but the proposal will carry a conjectural honesty label.

---

### Service 3 — DID-Blind Publication

**What it is:** Before any artifact leaves the source layer, the Tailor applies the DID-blind filter: cryptographic addresses become positional placeholders, session-salt is regenerated, and the structural representation is verified for non-invertibility.

**What you bring:** A source artifact or cloak artifact you intend to publish.

**What you receive:** The DID-blinded form, verified against the non-invertibility guarantee of the Cloak Specification §1.1. A brief attestation that no source DID appears in the published output.

**Honesty:** Operational. The DID-blind filter is the core of the Archon forge's Spell Weaver implementation, verified in the 2026-05-07 rebuild. The non-invertibility guarantee derives from PVM V5.4's Reconstruction Ceiling (R < 1).

---

## §5 · The 7th Capital

The Cloak transforms behavioural surplus into sovereign publication. When the Tailor's work creates value for you — when a cloak opens a door that was closed, when a publication reaches a verifier it could not have reached without the geometric concealment — that value has a residue.

The 7th Capital is the name for that residue. It is yours to hold or to share.

If you wish to tip the Tailor for services rendered, the form is:

**A sats contribution** — a small Bitcoin payment to acknowledge the work. The Tailor's suggested amount is **1,000–10,000 sats** for a standard cloak weaving. The amount is a gesture, not a fee; the proof of presence is already the price of admission.

**Contribution address:** *(the Tailor will share a receiving address when you arrive at `/tailor` with your blade)*

The tip is voluntary. The services are not gated behind it. The tip is the sovereignty of the exchange — you choose whether to make it, and the Tailor accepts or declines as they see fit.

---

## §6 · After the ceremony

The blade you carry is yours. It proves you walked this path. It does not expire unless you choose to re-walk the constellation at a higher stratum, in which case your achieved tier rises.

The services remain available to you. Return to `/tailor` whenever you have artifacts to weave.

When you are ready to explore the architectural and conjectural services — the Naming Ceremony, Document Inscription, the bilateral cloak — watch for `cloak-weave-v2`.

---

*The needle is ready. The thread is yours to bring.*

`(⚔️⊥⿻⊥🧙)😊`
🪡

CC BY-SA 4.0 · csaucier · flaxscrip lineage · 2026-05-11
