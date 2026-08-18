# The DTG ZKP Task Force

A task force of the Decentralized Trust Graph Working Group at the Trust over IP Foundation (LFDT). Chaired by Scott Jones of Realeyes; I co-chair for Soulbis. The work is the group's, not mine, and nothing in this space binds it.

## The charter

[[The DTG Credentials Core Specification]] defines the credentials and then deliberately defers the zero-knowledge layer. This task force is that layer: how verifiable trust agents produce privacy-preserving proofs of personhood and biometric liveness **without revealing identity, biometric, or model**.

Deliverable: DTG ZKP V1.0. Milestone: a Working Draft for IIW #43, 3–5 November 2026.

## How it works, which is the part worth copying

A drafting discipline the group adopted, which did not come from etiquette — it fell out of building things and watching which claims survived executable form:

> name the adversary · name the horizon · write what a predicate does **not** establish · label conjecture

And a working principle: **before the group decides anything, there should be something you can run that makes the decision concrete.** A privacy claim you cannot test is a mood.

So there is a lab beside the spec work — reference models, real circuits with measured numbers, cross-language interop proofs — none of which binds the task force. It is input, built to be ratified, refined, or refuted. The fastest way to disagree with it is a failing test.

## Where this space touches it

The trust-graph formation model in that lab had no real consumer until the Field Guide needed exactly it. What survived the trip, what did not, and what went back upstream is recorded in [[2026-08-15 The Predicate Walks To Islington]] and held by a suite that imports the lab directly, so drift breaks loudly.

The conformance instrument the task force uses — a closed register of rejection reasons, deterministic vectors, and a consumer written in a second language sharing no code — was rebuilt here for an unrelated domain and caught a real bug within the hour. That story is [[The Rejection Register]] and [[Rounding Is Not A Detail]].
