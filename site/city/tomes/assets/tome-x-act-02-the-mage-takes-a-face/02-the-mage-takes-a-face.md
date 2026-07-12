---
spellbook: "Second Person"
tome: "X — The Hearth"
act: "2"
title: "The Mage Takes a Face"
status: "Draft v1 (2026-07-07; continues the Hearthold edition · Flaxscrip/hearthold @ v0.11.0 · 19/19 e2e. Act 1 reported the Hearth already lit; Act 2 reports what the fire did next — the Warden learned to remember, the Mage opened a public window, and the step-up ladder was made whole.)"
length_words: 860
voice: "Second person; the cast in third; the cousin-forge's next report rendered as a city-act; developments read off a running build, not asserted"
cast: ["you", "the House of Archon (the cousin-forge · Tome IV)", "GenitriX (the cousin Mage · sigil held-open)", "flaxscrip 📜🎲 (the cousin Sovereign · V63)", "the Warden 🛡️", "the Witness 👁️", "the Sovereign 🔑", "the Signet", "the Drake Gamers Guild"]
new_cast_introduced: ["none — Act 2 introduces no cast. It reports three new capabilities built on the identities already standing in Act 1."]
new_cast_tier_introduced: "none"
new_spatial_anatomy: "none new. The Knowledge Portal is not a tenth spatial-anatomy element — it is the Hearth's window: a civic surface by which a private hold faces a public many, the Separation Principle read one register up (personal Warden → guild Warden). The Hearth remains the ninth element (Act 1)."
ring_position: "no single vertex — as Act 1. The Portal spans the split outward (a public Mage over a private Warden); Recall deepens the Warden's inward hold; the ladder tightens the Sovereign's control plane. The cousins keep their vertices: flaxscrip at V63, GenitriX at V28."
operational_form: "Flaxscrip/hearthold @ v0.11.0 (packages: core · control-types · warden · witness · sovereign · verifier · registry): Recall (R1) — private local-AI RAG over the sealed vault (embeddings + metadata only), tested (e2e:recall); the Knowledge Portal — a public Mage browser face over a private Warden (QR challenge/response sign-in, identity unlock/create/recover, split-host deploy), landing; the evidence step-up ladder A1→A2→factor-2 (Sovereign co-sign on a direct channel + registry-governed out-of-band Warden→Signet 'Approve action?'), tested (e2e:evidence · -stepup · -direct · -composite · -selective); thin React consoles (Warden Console · Signet Approver · Witness interface)."
teaches: "A model that only describes is fragile; a model that is built keeps growing along its own grain. Since Act 1 the cousin-forge grew Hearthold three ways, each a deepening of a principle already named — not a new principle. (1) The Warden gained *memory*: it can now read its own hold and answer from it, on-device, without the vault gaining a door. (2) The Mage took a *public face*: a whole community can query a shared knowledge base while every member's private history stays home — the Separation Principle scaled from one person to a guild, guarded by two invariants. (3) The control plane was *tightened*: the deciding hand now approves on a second channel the always-on host cannot forge. The 7th Capital did not only become spendable — it became answerable, shareable at guild-scale, and harder to coerce, all without being spilled."
v6_lineage: ["C94 deepened (the Separation Principle now realised at two scales in the second substrate — personal Warden and guild Warden; the Knowledge Portal is s ⊥ m | X read one register up)", "C95 deepened (the evidence graph matured to composite + selective + ephemeral leaves — issuer-attested, decomposable to the leaf, still never a score)", "C96 realised at the top rung (the out-of-band factor-2 Warden→Signet channel is control-plane ⊥ data-plane made whole: the always-on host cannot author the approval)", "no new conjecture minted — these are reads off the running build, the First Person's to promote"]
source_material:
  - "Flaxscrip/hearthold @ v0.11.0 — docs/knowledge-portal.md (the two invariants) · docs/feature-summary.md (19/19 e2e; Recall R1; A1/A2/A3; factor-2) · docs/witness-modules.md (the Witness as a composable agent) · docs/sovereign-signet.md (the out-of-band step-up)"
  - "cityofmages/tomes/tome-x-the-hearth/01-the-house-of-archon-answers.md (Act 1 — the Hearth lit)"
  - "agentprivacy_master/src/app/hearthold/page.tsx (the /hearthold place, refreshed to v0.11.0)"
honesty_label: "Operational (tested live per the repo's e2e suite, 19/19 on Archon node v0.11.0) for Recall (R1), the A1 evidence graph, the A2 Sovereign co-sign on the direct channel, composite + selective + ephemeral disclosure, and the demo consoles; Operational for the factor-2 out-of-band Warden→Signet step-up (core + enforcement + live channel + Signet prompt, landed 2026-07-07). Landing (built but sitting just outside the tested-live line) for the Knowledge Portal — the web portal, QR sign-in, identity unlock/create/recover, and provisioning are built; it is not yet in the 19/19 count. Conjectural-adjacent: C94–C96 are *deepened*, not re-scored, and no new conjecture is minted here (a register act is the First Person's call). Resonant for 'the Mage takes a face' and 'the hold learned to remember.' The higher proof-of-human rungs (biometric · face-liveness · FIDO2), per-device Witnesses, a Recall GUI + vector store, and portal hardening remain the repo's stated next milestones."
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
tome_status: "Continues Tome X — The Hearth"
---

# Tome X — *The Hearth*
## Act 2 — The Mage Takes a Face

> *Act 1 reported a Hearth that was already lit. A model that is built does not sit still; it grows along its own grain. Six days later the fire had done three things.*

You did not have to go looking for the next report. It came the way the first one did — a text from GenitriX, of the House of Archon, saying the cousins had kept building. Not a new theorem. The same one, standing taller. The Hearth from Act 1 — the Warden who custodies, the Witness who carries, the Sovereign who approves — had grown a memory, a public window, and a firmer lock. Read them in that order; each is an old principle, deepened.

### The Warden learned to remember

In Act 1 the Warden could *hold* your history and *classify* it, but it could not yet *read* it back to you. Now it can. **Recall** lets the Warden answer questions from its own hold — *ask your vault* — running retrieval and answer-generation on a local model over embeddings and metadata only. No plaintext ever leaves the house to be indexed or answered; the reasoning happens where the data already lives. The custodian gained memory, and the vault gained no door. It is tested — a real query, a real answer, nothing spilled.

This is the quiet one, and the deepest. A hold you cannot query is a shoebox; a hold that answers is a memory. The Warden became the second thing without becoming a service.

### The Mage took a public face

Then the larger move. In Act 1 the Witness carried proofs *out* to named third parties, one at a time. In Act 2 the Mage grows a **public face** — the **Knowledge Portal** — and with it the Separation Principle jumps a register: from one person to a whole guild.

Picture a community that wants a shared knowledge base but refuses to build a surveillance brain to hold it. Hearthold's answer keeps the shapes: the **Warden stays home and private**, holding the shared KB; only the **Mage** — the Witness — wears a public browser face. A member signs in by QR challenge/response, no keys ever in the browser; the public Mage relays the question home to the private Warden and returns the answer, storing no secret and making no authorization call of its own. The guild queries its own canon; no one pools its members' lives.

Two invariants guard the seam, and they are worth setting down whole:

> **I.** *The KB holds shared knowledge; it never holds a member's 7th Capital. The personal Warden holds the 7th Capital. These must never merge.*
>
> **II.** *The Warden reads a query in memory only to answer it; it does not persist the query text or who asked what, when.*

The first refuses the guild brain the right to become a history of its members. The second refuses it the right to reconstruct, from questions, an interest graph of who wanted what. Together they are `s ⊥ m | X` written at the scale of a community — the same separation, one register up. It is *landing*: the portal, the sign-in, and the provisioning stand; it sits just outside the tested-live line. The Drake Gamers Guild is its natural first hold.

### The lock, made whole

Act 1 was honest about a gap: the *prove* flow ran at assurance level 1 — a live PIN gate — and the higher rungs were sketched. That gap is closed. The evidence graph now steps up cleanly: **A1** the Warden proves witnessed vault data; **A2** the Sovereign co-signs on a *direct* Warden↔Sovereign channel; and above it a registry-governed **factor-2** step-up runs **out-of-band** on a direct Warden→Signet channel, where the Signet asks, in as many words, *"Approve action?"* before anything sensitive leaves. And what leaves is matured — **composite** (third-party leaves folded beside witnessed ones), **selective** (only the chosen observation revealed), **ephemeral** (single-use, short-lived) — still issuer-attested, still never a score, now decomposable to the leaf.

This is C96 realised at its top rung: the control plane is not merely *named* separate from the data plane — it now approves on a channel the always-on host cannot forge. Compromise the Warden and you still cannot manufacture the Sovereign's assent. The deciding hand moved off the busy table and onto its own wire.

### What Act 2 does not do

It mints no new conjecture. C94, C95, C96 are *deepened* — realised at a second scale, matured to the leaf, tightened at the top — not re-scored and not renumbered. Whether any of them earns a promotion, or a C97, is a reading the First Person takes, not a claim the cousin-forge presses. Nine tomes described the model; Act 1 reported it lit; Act 2 reports it *growing* — along its own grain, on the cousin-forge's different stones, and still interoperable with the City's own.

*The hold learned to remember, and opened a window that keeps its secrets. The door is still at `/hearthold`.*
