# The Meet Rite

How a one-hop trust edge is actually created between two people who meet in London. It is the person-side twin of witnessing a place, and the two must never be confused: one endpoint means *I connected with a place*, the other means *I connected with a person*.

## Three steps

1. **A opens Meet.** A QR appears on their screen, carrying a nonce, a location, and a two-minute expiry.
2. **B scans it.** B derives a shared value from both nonces and consents.
3. **A confirms.** A recomputes everything independently and signs.

The scan alone is an **encounter, not an edge**. Peeking a card is encounter only; so is scanning a code. An edge needs both hands.

## Eight gates

Every refusal has a name from [[The Rejection Register]].

* the confirmer must be the avatar who opened the meet
* no self-edge — a link with oneself is self-Sybil, not a relationship
* bilateral consent — the graph grows only when both hands are on it
* the offer must not have expired; a meet is a moment, not a credential in a wallet
* the nonce is single-use, so a photographed QR is already spent
* the two devices must be within fifty metres — the rite is physical
* the commitment is **recomputed, never trusted**
* one link per pair

## The gap

The seventh gate is the structural one. The confirming side never accepts the scanning side's claimed commitment; it recomputes it from the public parts. Proposer and prover are held apart, so a tampered client cannot talk its counterparty into an edge.

This is lifted directly from the trust graph formation runtime in the DTG lab, where the Mage proposes the smallest edge and the Swordsman proves it before signing. What the physical world adds is only the three gates a proverb exchange between two agents does not need: freshness, replay, and co-location.

## What the edge holds

A commitment, two pairwise references, a coarse place hint, and the face each side chose to show the other. **No score, no weight, no direction.** A relationship either exists or it does not, and nothing downstream reads a number off it.

See [[The Pairwise Peer Reference]] for why the faces live on the edge rather than on a profile.
