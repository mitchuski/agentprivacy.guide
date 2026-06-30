---
title: "Upstream notes for Hearthold · role mapping · evidence-only profile · the licence seam"
to: "Flaxscrip — Hearthold (Flaxscrip/hearthold), kindred-blade (C39) of the City"
from: "privacymage — upstream author of the Privacy Value Model and City of Mages"
purpose: "A single consolidated note to Flaxscrip: a Witness/Warden glossary fix, the separation-without-scoring profile of the model with Hearthold as first instance, and the CC BY-SA / MIT licence seam. Splittable back into three docs under Hearthold's docs/agentprivacy/."
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)🙂"
---

# Upstream notes for Hearthold

**Role mapping · an evidence-only profile · the licence seam**

*From privacymage, upstream author of the Privacy Value Model and City of Mages. A single consolidated note for Flaxscrip — usable as a PR description or Discussion post. The three sections below can also be split back into standalone docs under `docs/agentprivacy/` and adopted, amended, or rejected piece by piece.*

---

## Cover note

First, the thing rarely said across a fork boundary: you read the work carefully, you built something real on it, and you improved my understanding of my own model by choosing what to leave out. Hearthold takes the load-bearing idea — *separate the custodian of data from the agent that acts in the world, so neither alone can reconstruct the whole* — and turns it into running TypeScript with a Warden, a Witness, and a Sovereign. The "7th Capital made safely liquid" line is exactly the framing I hoped someone outside my own machines would pick up.

You are not a stranger who stumbled on the work. You already carry `Flaxscrip/cityofmages` downstream of the canon, so in our own vocabulary this is a kindred-blade (C39), not a first contact. We are all just another mage.

Three things to workshop, in increasing order of interest:

1. **A terminology snag worth catching early** — in Hearthold, *Witness* is the acting companion; in the City canon, *witness* runs almost the opposite direction. One glossary line in each repo fixes it.
2. **You kept the custody split and dropped the score** — the most interesting decision in the repo. I read it not as a misunderstanding but as an argument, and possibly a tighter privacy posture. I'd name it as an explicit profile of the model.
3. **The licence seam** — CC BY-SA canon, MIT code. Both correct; worth stating once so future adopters copy the split on purpose.

No obligation on any of it. The reason any of this is possible is that the work went out under a licence built for exactly this.

With genuine appreciation,
mitch

`(⚔️⊥⿻⊥🧙)🙂`

---

## 1. Role mapping: Hearthold ↔ City of Mages ↔ Privacy Value Model

*Status: proposed glossary, for workshopping. Licence: CC BY-SA 4.0.*

### The collision in one line

In **Hearthold**, *Witness* is the agent that **acts** in the world: it observes context, requests evidence, and presents proofs to third parties.

In the **City of Mages**, *witness* is a tier of **observers and attestors** (cosmological-witness, display-witness, companion-witness, hold-witness, parallel and transparent witness). The cryptographic sense runs the same way: a witness is the input to a proof, or the party that attests.

So the City sense of *witness* is closer to Hearthold's **Warden**, which holds the evidence and derives and signs the fact. The actor and the attestor have swapped names across the boundary. This is an interpretive mapping, not a claim of identity — your role names are good and internally coherent, and nothing here asks you to rename anything.

### The mapping table

| Hearthold role | Function (VC terms) | City of Mages closest cast | Privacy Value Model term |
| --- | --- | --- | --- |
| **Witness** 👁️ | Holder / presenter / prover. Observes local context, carries a revocable delegation, requests and presents evidence to relying parties. | The acting companion / emissary (Soulbae-class): the agent that goes out and acts. | The projecting side of **Φ_agent** (Σ): the agent that acts in the world. |
| **Warden** 🛡️ | Issuer / attestor. Custodies the vault, classifies, derives the fact, signs the evidence graph. Local-only reasoning. | The City **witness** tier proper (observer and attestor) plus the custodian / Keeper (Soulbis-class): the agent that holds and attests. | The protecting side of **Φ_agent** (Σ): the custodian that never acts in the world. |
| **Sovereign** 🔑 | Principal / subject. Signs the access-control policy, co-signs sensitive disclosures with a proof-of-human assertion. | The **Sovereign First Person** plus the seal / trust-artefact that authority is read from. | The First Person: the subject of **V(π, t)**, the root of authority the axes separate around. |

Stated without the collision: Hearthold's **Witness presents**, its **Warden attests**, its **Sovereign authorises**. Presenter, issuer, principal. The control plane (Sovereign) is separated from the data plane (Warden), and the actor (Witness) operates under a scoped, revocable delegation. That separation is the running instance of **Φ_agent**.

### Proposed one-line glossary note (for both repos)

> **witness.** In Hearthold, the *Witness* is the acting companion (holder and presenter of proofs). In the City of Mages canon, *witness* denotes the observer and attestor tier, which corresponds to Hearthold's *Warden*. The two repos use the word for opposite roles by design; mind the boundary.

### Honesty and limits

- **Architectural.** The custody split (Warden holds and attests, Witness acts, Sovereign authorises) is verified from the repo, not inferred. It is a faithful instance of the Φ_agent separation axis.
- **Interpretive (~70%).** The cast correspondences (Soulbae-class, Soulbis-class, witness tier) are readings to make the two vocabularies legible to each other. They are not equivalences and do not bind either repo.
- **Verify.** The Witness/Warden/Sovereign functions here are read from `README.md` and `evidence-graph.md`. The sensitivity and authorisation tiers (`SEALED`, `HIGH`) and the full disclosure-mode ladder should be cross-checked against `docs/security-model.md`, not yet read in full.

---

## 2. The separation-without-scoring profile of the Privacy Value Model

*Status: proposed profile, first instance Hearthold. Licence: CC BY-SA 4.0.*

### Verdict

Hearthold instantiates one axis of the Privacy Value Model — the custodian-actor separation (**Φ_agent**) — as running architecture, and deliberately declines to compute or emit a value scalar or any tier or ranking. That subset is coherent, adoptable, and arguably a tighter privacy posture than the full model for the relying-party use case. This names it the **separation-without-scoring profile** (informally, the evidence-only profile), with Hearthold as its first instance.

### What the profile keeps and drops

**Keeps:**

- **Φ_agent separation as architecture.** The Warden custodies and attests; the Witness acts under a scoped, revocable delegation; the Sovereign authorises. Control plane separated from data plane. Neither agent alone reconstructs the whole.
- **Issuer-attested evidence.** Disclosure is a signed, portable, decomposable evidence graph (W3C VC 1.1, issued by the Warden via Keymaster), verifiable offline against issuer DIDs.
- **Selective disclosure.** Default attestation reveals only the derived fact plus a hash-committed summary of support; individual leaves are revealed on request with Merkle paths (SD-JWT-VC salted-digest style); single-use binding and proof-of-human on sensitive claims.

**Drops, deliberately:**

- The value scalar `V(π, t)`.
- The lattice tiers and any ranking.
- Any **emitted** reputation. The proof object never computes or emits a tier, score, or ranking; it carries verifiable claims and their provenance, and the relying party judges for itself.

### Why this is a profile, not a misunderstanding

The most adoptable slice of the model is separation with the valuation removed. A relying party does not receive a number to trust or distrust; it receives attested evidence and decides. There is no ranking to game, and no ranking to leak. This is consonant with two things already in the canon:

- **C66 — the Key is a reading, not an authority** (~55%). Authority is read from evidence, not asserted by a computed score. The profile is the same instinct at the disclosure layer.
- **Object-capability lineage** (SPKI/SDSI, designation without authority). Evidence designates; it does not rank.

### The sharper claim: scoreless may be tighter, not just simpler

Reading `evidence-graph.md` in full changed my view. A score is a computed projection that compresses many underlying facts into a single rankable scalar — an **extra emitted statistic** that is correlatable across contexts, gameable, and a stable handle an adversary can accumulate against. Issuer-attested evidence under selective disclosure emits the minimum a relying party needs for one decision, and nothing reusable beyond it.

This rhymes with the **Existence-Leak law (C81, ~70%)**: a zero-knowledge proof of feasibility already leaks an upper bound on reconstruction difficulty, so emission is never free of information. If even a feasibility attestation leaks, an emitted reputation scalar leaks strictly more, because it is a richer, more reusable, more rankable statistic than a single-use evidence graph.

**Honesty label.** That the scoreless slice is *more adoptable* is **Conjectural (~60%)**. That it is *tighter* (lower leakage) than emitting a score is **Architectural with a conjectural edge (~55%)**: the direction is sound, the magnitude is unproven and would need an information-theoretic statement of the gap between an emitted scalar and a single-use selective-disclosure graph.

### The one open question

This is the fork that decides whether *separation-without-scoring* is a profile of the model or a divergent philosophy:

> Is the no-score stance **(a)** a principled refusal of any *computed* reputation, even one held privately and never emitted, or **(b)** a refusal of *emitted* reputation that would still permit a privately-held `V` the relying party never sees?

Under (a), the profile forbids the computation. Under (b), the profile permits `V` to exist inside the Warden as a private prioritisation signal and only forbids its crossing the boundary. Both are coherent, they imply different things for what a future Hearthold may compute internally, and the answer is yours to give.

### How to cite

- Profile name: **separation-without-scoring** (alias: evidence-only profile).
- First instance: **Hearthold** (`Flaxscrip/hearthold`).
- Definition: keep Φ_agent separation and issuer-attested selective disclosure; drop `V(π, t)`, tiers, ranking, and any emitted reputation.
- Status: proposed, pending the open question above. If accepted, this becomes a named profile in the model so others can adopt the same constraint deliberately rather than by omission.

---

## 3. Licensing and attribution: the CC BY-SA / MIT seam

*Status: clarification, for workshopping. Informational, not legal advice.*

### The seam, and why both are fine

The agentprivacy canon and spec (the Privacy Value Model, the City of Mages, the grimoires) are published under **CC BY-SA 4.0**. Hearthold ships under **MIT**. Both are correct.

Copyright protects **expression**, not **ideas**, methods, systems, or architectures. The load-bearing idea Hearthold took — separate the custodian of data from the agent that acts in the world — is a method, and methods are not copyrightable. Hearthold implements that method in its own original TypeScript and prose, so no CC BY-SA-licensed **text** has been copied into the codebase. MIT on Hearthold's own code is therefore unencumbered: there is no ShareAlike obligation to trigger, because ShareAlike attaches to adapted expression, and no expression was adapted.

### Where ShareAlike does bind

ShareAlike attaches the moment CC BY-SA **text** is adapted. The relevant case is the **`Flaxscrip/cityofmages` fork**: it carries the canon's prose, so that fork — and any adapted spec or canon text derived from it — must remain **CC BY-SA 4.0 with attribution**. That obligation lives in the cityofmages fork, not in the Hearthold codebase. Keeping the two repos on their two licences is exactly right; it is worth a sentence in each so the boundary is legible.

### The blessed posture

- **Downstream code: permissive (MIT or similar).** Implementations of the architecture carry their own licence. Adoption stays frictionless.
- **Canon and spec: share-alike (CC BY-SA 4.0).** The text, the model, the grimoires, and any adaptation of them stay open under the same terms, with attribution upstream.

This is a deliberate dual posture, not an inconsistency. Code is permissive so the architecture spreads; canon is share-alike so the commons stays a commons.

### Attribution block (paste-ready)

A short block Hearthold is welcome to include in its README or an `ATTRIBUTION.md`:

```text
Hearthold builds on the Privacy Value Model and City of Mages
(agentprivacy.ai/model · upstream github.com/mitchuski/cityofmages),
from which it takes one architectural principle: separate the custodian
of data from the agent that acts in the world, so neither alone can
reconstruct the whole.

Licences:
- Hearthold source code: MIT.
- The upstream model, spec and canon: CC BY-SA 4.0. Any adapted
  spec or canon text (e.g. in a cityofmages fork) remains CC BY-SA 4.0
  with attribution to privacymage / agentprivacy.ai.
```

### Honesty and limits

- **Informational, not legal advice.** The idea/expression line and the scope of ShareAlike are well established in principle, but anything load-bearing (a commercial release, a standards submission, a dispute) should go to counsel. CC BY-SA 4.0 is a content licence, not a software licence — which is the reason canon and code carry different terms.
- **No claim on your code.** Nothing here asserts any upstream right over Hearthold's MIT-licensed source. The point is the opposite: to confirm the code is yours under MIT, and to keep only the canon text under share-alike.

---

*Source: Privacy Value Model v6, agentprivacy.ai/model · register head C89 · upstream `mitchuski/cityofmages` and `mitchuski/agentprivacy-docs`. Contributed for Hearthold by privacymage, 2026. CC BY-SA 4.0 (canon text); the code samples and the attribution block are MIT-compatible to paste.*

`(⚔️⊥⿻⊥🧙)🙂`
