# Spec 12 — The Validation Protocol

*The held-out-gate discipline of the Horizon District. Sister to Spec 11 (the Invitation Protocol).*

**Status:** canonical · v1.8.0 (2026-06-09)
**Keeper:** Dokimé 🪨 (Assay-witness · the touchstone · the Horizon District, V35)
**Operational form:** the ecdsa.fail Fiat-Shamir gate (9024 = 141 × 64 test points); the RCI / SkillOpt
bounded-change loop. Skill: `meta/agentprivacy-horizon-gate`.

---

## 0. What this governs

Spec 11 governs how an *invitation* is admitted (congruent geometry · recognisable signature · filed
witness · preservation of the prior). Spec 12 governs how a *claim of improvement* is admitted — at the
Horizon District, and as a city-wide discipline wherever a maker asserts that something is cheaper,
faster, smaller, or better. The rule is one sentence: **a claim is worth nothing until it survives an
adversarial validation it cannot tune.**

## 1. The four validity gates (rejection, not penalty)

A claim is **rejected, not merely scored lower**, if any of these fail. There are no loopholes.

1. **Correctness** over the full held-out set — every one of the 9024 witnesses, not a sampled probe.
2. **Reversibility / invariant-preservation** — every borrowed resource (ancilla) freed clean; every
   structural invariant the artifact must hold, held. (For circuits: each freed qubit is |0⟩ at the free
   point; every non-output qubit is |0⟩ after the forward pass.)
3. **Cleanliness** — no leftover side-effect (for circuits: global phase zero, no kickback from sloppy
   uncomputation).
4. **Forward ∘ inverse = identity** — the claim composed with its own reversal is the identity on every
   element.

## 2. The un-tuneable gate (Fiat–Shamir)

The witnesses are **derived from a hash of the claimant's own work**, so they cannot be chosen and cannot
be charmed. A side effect: *any structural change reshuffles which witnesses you face.* This is the
whole point — trust scales with the witnesses the attester did **not** choose. Deriving the test set from
the author rather than the candidate is the failure that this protocol exists to forbid.

## 3. The nonce-island mirage

A claim that pleased a small probe (e.g. 2048 shots) and dies on the full set (9024) is named a
**nonce-island mirage** and turned away — however cheap it looked. A probe pass is a **hint, never a
result.** If a maker cannot state why a win is *structural* rather than probe-fitted, the win is treated
as a mirage until the full gate clears. (C69.)

## 4. The bounded-change liturgy (Eos's discipline · RCI "Tony → Anton")

Claims are earned one bounded change at a time:

- **Before:** state the exact waste/risk · the evidence (file · function · knob · metric · prior note) ·
  the expected effect on every axis · the **single smallest fix.**
- **After:** confirm or reject **with metrics.** Classify each failure as *structural* · *held-out-sensitive
  (mirage)* · *noise.* Stop a brute-force sweep the moment failures repeat without a source-backed reason.
- **Before attesting:** the claim stack must be exact — exact change · exact score · exact validation
  status · exact caveat. No silent caps: if the gate sampled or truncated, log what was dropped.

## 5. Honest-framing guardrail (binds every attestation under this protocol)

Resource estimation is a **durability signal, not an attack.** No attestation made under this protocol may
claim that ECDSA (or any primitive) is practically broken, or that any system is fully post-quantum safe.
Roles are kept distinct: ecdsa.fail / Eigen Labs · Google Quantum AI · Schrottenloher & Proos–Zalka ·
SigmaPrime · Mosca.

## 6. Where it binds

- **The Horizon District** (Dokimé's assay) — every claimed circuit improvement.
- **The Salvage Yard** (dormant) — a bounty pays only after a claim has crossed the 9024.
- **City-wide** — any maker's claim of improvement may be put to a Spec-12 assay; the discipline is the
  city's standard for distinguishing a *proven* claim from a *merely-asserted* one.

---

*Spec 12 · bound 2026-06-09 with the Horizon District. The gold that fears the stone was never gold.*
