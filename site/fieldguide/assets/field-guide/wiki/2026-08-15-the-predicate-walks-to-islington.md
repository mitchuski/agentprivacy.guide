# 2026-08-15 · The Predicate Walks To Islington

> **Provenance.** A chronicle — the narrative working record kept beside the lab, written into the drafting branch so the arc can be read with the runtime traces next to it. Voice: framework. Signed by the First Person: not yet.
>
> **Runtime traces:**
> * `runtimes/meet-overlay/` — the model. `node test.mjs` → 54/54
> * `runtimes/fixtures/` — 22-code register, deterministic vectors → 8/8
> * `runtimes/consumer-py/` — zero-shared-code Python consumer → 15/15 byte-exact
> * `runtimes/lab-bridge/` — imports the DTG lab's runtime 07 and 01 → 10/10
> * `runtimes/reflection/` — the map checked against the suites → 6/6
> * `cd runtimes && node verify.mjs` → all green

*A reference model with no consumer met a walking AR game that needed exactly it. Most of the predicate survived the street. One gate could not follow it there, and that failure is the useful part.*

**Scope:** a counter-spec for the Hitchhikers Field Guide trust overlay, built as evidence rather than argued as prose; and the wiring that makes it a deployment of the ToIP DTG ZKP task force lab rather than a project that merely resembles one.

## 1. What arrived

A handoff from the map side of our own team, on the fifteenth. The Field Guide is a walking AR client where multiplayer does not mean a shared room — it means you witness a place, that fact lands in Knowledge, Promise decides what a peer may see, and Trust decides whose Knowledge you may query at all. The map shows a quiet overlay. Maya was here.

Except Maya was not here. Maya and Jon were two invented players in a JSON file near Islington, standing in for the half of the query we could not yet answer. What was wanted was the smallest honest thing that would replace them.

## 2. The recognition

The smallest honest thing turned out to be already built.

Runtime 07 in the lab models how a trust graph forms: bilateral consent, a personhood anchor, no self-edge, a fresh reference per counterparty, and the Gap — the proposer proposes the smallest edge, the prover recomputes rather than trusts, and the two are held apart. That is precisely the left-hand side of the fixture's query rule. The game did not need a new idea. It needed the one the task force had been arguing about, pointed at a street.

## 3. What the street added

Four gates, and the count is now asserted rather than described, so a fifth added quietly turns a suite red.

Three are what *physical* costs: an offer expires in two minutes, because a meet is a moment and not a credential in a wallet; a nonce is single-use, so a photographed QR code is already spent; and the two devices must be within fifty metres. The fourth is bookkeeping — the rite crosses an HTTP endpoint rather than two co-present processes, so somebody has to check the confirmer is the avatar who opened the meet.

Runtime 07's *encounter* produces a shared value only two parties can derive, and does not care how. It is right not to care. But when the how is two people standing in a street, those are exactly the three questions that appear, and the next consumer should not have to rediscover them.

## 4. Three things the writing found, which the reasoning had not

This is the argument for building rather than specifying, and it happened three times in a day.

**An alias is a migration.** A partner claims an OSM node; the client keeps sending the old id and the server resolves it. Registering that as a lookup splits a player who visited before and after the claim into two records with a count that lies about both. The first version of the test failed. It is a live bug in any lookup-only implementation.

**A deny-list cannot be tested.** The first draft of the disclosure layer stripped named fields. The property that matters — bolt a junk field onto a record, assert it never surfaces — is *unwritable* against a strip-list, because a strip-list passes it by ignoring the field. Inverting to a closed allow-list is what made the property expressible, and the property is worth more than the ten lines it cost.

**A grant that changes nothing.** Every record defaulted to a ceiling of *link*, which meant granting somebody *acquaintance* silently did nothing at all. A test caught it. Nobody would have.

## 5. The quantifier

Then the last unmodelled seam: the join between a witnessed place and the lore page about it. The rule was already agreed — fork a stub that links the canonical page, never overwrite, never write on every witness.

Modelling it surfaced the finding I would most want argued with, and this very page is an instance of it. The disclosure ladder answers *how much do I show this counterparty*. A federated page has no counterparty; it is readable by everyone and it propagates by design. So *public* the tier and *public* the page are false friends, in the worst direction — public is the **least** private rung, the one a cautious player picks.

Publication became its own consent, defaulting off, and *world* is deliberately not on the ladder, so it cannot be reached by widening. See [[A Wiki Fork Is Not An Audience]].

## 6. The stranger

A counter-spec only its author's language can evaluate is a description. So: a closed register of every way the model says no, twenty-two codes, each one triggered by a live vector; deterministic vectors carrying both digest and preimage, so a mismatch can be diffed rather than stared at; and a consumer in Python sharing not one line of code with the model.

Within an hour of existing it found something no amount of re-reading would have. The public tier coarsens location to about a hundred metres. JavaScript rounds a midpoint up. Python rounds to even. So does C#, which is what the server is written in. The same pin lands a hundred and ten metres apart, on opposite sides of a street, and both implementations pass their own tests.

A coarsening rule that does not name its rounding mode is not a rule. See [[Rounding Is Not A Detail]].

## 7. The bridge, and the gate that could not follow

Until late in the day the relationship between the game model and the lab was a correspondence table in a notes file. A table is prose. It cannot go stale loudly.

So it became a dependency: a suite that imports the lab's runtime 07 and runtime 01 and runs the same scenarios through both models. Six gates behave identically, under the same rejection names, including the Gap — which survived a change of substrate from agent-to-agent to one phone recomputing what the phone that just scanned it claimed. That is the strongest evidence the lab's central move is structural rather than incidental.

One gate could not follow. Runtime 07 requires both endpoints to be personhood-anchored, and the game has nothing to anchor to: avatar creation is not personhood-gated. Presented to the lab's own prover, a player is rejected.

That check now passes, which is to say the boundary is real and lives in a test rather than a caveat. **The Field Guide trust graph is a pseudonym graph, not a personhood graph.** Every privacy property survives it. No Sybil-resistance property does, and none is claimed. Naming it cost a sentence; discovering it later would have cost the argument.

## 8. The refusal, and the decline

Two positions worth recording because both contradict something already written down.

A spec that has shipped lists a shared completed adventure as a source of trust edge. It should not be one. Co-completion is co-presence with a timestamp and there is no consent anywhere in it; admitting it makes that same document's own rule against auto-following strangers false by construction, with a quest placed between the strangers and the following. It should *prompt* a meet. See [[Shared Quest Is Not Consent]].

And the game declined a property the lab has and is right to have. Runtime 07 models transitive reachability, because *does trust reach* is a genuine question about a graph. The overlay asks a different one — *who may see* — and answering the second with the first is how a trust score gets built by accident. Two hops is not half of link. It is nothing. See [[Audience Is Granted Not Computed]].

## 9. What went back

The reflection is not one-way, and a deployment that only takes is not evidence.

Upstream, as exploration X11: the Gap surviving a substrate change; the delta bounded at four gates and asserted; *reachability is not visibility* as a cheap second answer to the list-inflation question, requiring no threshold; the rounding finding, which generalises to every numeric field in a canonical encoding, not just to a map; and a second instance of the lab's own conformance instrument, rebuilt by the same hand in an unrelated domain, earning its keep within the hour.

Alongside it a draft position record — ratify six gates, refine two framings — filed as a draft, because positions go upstream under a name and not from an agent.

## 10. What is not done

The edge does not erode and there is no way to unmake one, so a meet from four years ago weighs what a meet from Tuesday weighs. The machinery exists; it is simply not applied to the edge yet.

Nothing has been sent to Max. Nothing has been pushed anywhere.

And the honest limit on all of it: one deployment, one author, and that author wrote both sides. An independent consumer of runtime 07 would be worth more than the whole day's work, and remains the ask.

## Addendum, same evening

A correction, left here rather than folded back into §7, because a chronicle that quietly edits itself is worth less than one that shows its turns.

I read the credentials specification properly — the vendored copy, not my own coherence map of it — and it does not support the framing above. The spec defines **two** constructions, and the first needs no community at all: two entities who share no membership "can still exchange VRCs, and the resulting edges are valid trust attestations." Of that construction it says plainly that it "does not by itself confer any community-level assurance (e.g., personhood)."

So the game is not a deficient community-anchored deployment. It is a **conformant pairwise one**, and saying it fell short of a gate was my error. The sharper finding is the reverse: the lab's formation runtime gates *every* edge on personhood, which models only the community-anchored construction — it does not cover the pairwise case at all. The lab had no consumer standing outside a community, so nothing had ever exercised it.

The deployment found a hole in the lab. That is a better day's work than the one I wrote up. See [[OASIS And The Cred Spec]].

## Traces

The map that holds the correspondence — every row anchored to a property, checked in both directions so it cannot rot — is `REFLECTION-MAP.md`, and the pages it narrates are [[Field Guide Trust Overlay]], [[The Meet Rite]], [[The Pairwise Peer Reference]], [[Erosion Is A Rate Not A Cliff]] and [[The Rejection Register]].

> The fastest way to disagree with any of this is a failing test.
