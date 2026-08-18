# Could This Be Zero Knowledge

An exploration, for the [[Hitchhikers Field Guide]] side. Nothing here is on our roadmap and nothing needs to be.

Short answer: yes — three parts usefully, one part beautifully. But not yet, and the blocker is not a circuit.

## The precondition nobody can skip

The server holds every avatar's keys, every edge and every discovery, and assembles the map itself.

**A zero-knowledge proof presented to a party that already holds your secrets protects nothing.** If a client proves to the server "I hold an edge with the owner of this pin," the server issued that edge and can read it. The proof is decoration.

So the first step is not circom. It is moving signing keys onto the device — what the spec calls a personal network vault, under the exclusive control of the person, whose use they *may* delegate to an agent. Holding them server-side is the delegated pattern, and it is permitted. It just means there is nothing yet for a proof to bite on.

Worth saying first because it is the least fun part and the easiest to skip past into circuits.

## Where it goes, and where it does not

The instinct is to reach for the write path. Resist it: witnessing a place is a player telling their own server about their own visit. There is no counterparty and nothing to hide. **Zero knowledge belongs at the presentation surface, not the write surface** — which is where the spec puts it too.

Four statements worth proving, in the order I would rank them:

**A · "These two personas have a relationship"** — without revealing either relationship identifier. The verifier is a third party, so this pays off *immediately*, with no key migration. It is also the spec's own worked example of the pairwise proof, and it is the share card upgraded: a card that carries a verifiable relationship claim a stranger can check, without the two parties leaking their private channel or becoming correlatable across every other card they have shared.

**B · "This pin belongs on my map"** — I hold an edge with its owner and their policy admits me, without revealing *which* peer. This inverts the overlay: the client proves, the server returns the pin, and the server never learns the social graph. The prize, and strictly gated on key custody.

**C · "We were within R metres of each other at time T"** — without either position being revealed to anyone, including the server. The spec's witness credential already anticipates the statement; its own example is both parties proving they were at the same event at the same time.

**D · "This discovery is fresher than H"** — without revealing when. Small, cheap, pleasant.

## The one I would most like to build

C. A meet currently sends both sets of coordinates to a server, which makes a location-tracking database accumulate as a side effect of a friendship feature. The proof version leaks a boolean and nothing else.

The honest limit: a phone's location is self-asserted, so the proof establishes that two devices *claimed* nearby positions, not that two people were together. Zero knowledge makes the claim private; it does not make it true.

Even so — turning *we were in the same place* from a database row into a proof that reveals nothing is a genuinely nice thing for a walking game to be able to say.

## What it costs, measured rather than adjectival

From the lab, real proofs over BN254, not simulations: a membership-plus-nullifier circuit at **11,523 constraints — about 683 ms to prove, 8 ms to verify, 721 bytes**.

Read for a phone: the proof size is irrelevant, ship it in a header. Verification is free. **Proving is the constraint** — several times 683 ms on a mid-range handset. That is fine for a meet, a once-per-relationship ceremony where the player is already holding up a QR code. It is not fine per-pin on a map that repaints as you walk, which shapes statement B: one proof per query, not one per pin.

Groth16 also needs a trusted setup per circuit, and the lab's is a lab fixture that says so. A production one is a governance exercise, not an afternoon.

One number worth knowing because it is so cheap: binding a proof to its context cost **exactly one constraint**. Unbound proofs are replayable, so there is no reason to skip it.

## The path

Each step is useful alone and none of them strands you.

0. **Nothing.** Ship the meet and the overlay with ordinary signatures, and get the object shapes right first — see [[OASIS And The Cred Spec]]. Every step below is easier for it, and that work has to happen anyway.
1. **A**, the pairwise relationship proof on the card. Third-party verifier, no migration needed.
2. **Keys to the device.** The real one.
3. **C**, proximity as an annotation — a small circuit that removes a liability rather than adding a feature.
4. **B**, the private overlay query.
5. Community-anchored proofs, if OASIS ever forms a community with personhood governance.

If any of these become interesting I would rather build them in the task force lab, as public evidence with measurements attached, than bespoke inside one server — so the answer is reusable by anyone implementing the spec, and the Field Guide is the deployment that motivated it rather than the only place it works. See [[The DTG ZKP Task Force]].

Caveat on all of it: I have not written these circuits. The costs above are for adjacent statements in the same family — a reasonable guide, not a quote.
