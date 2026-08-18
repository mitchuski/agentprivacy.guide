# Field Guide Trust Overlay

**Two strands of our own work meeting**, and this page is the index to where they met. The Hitchhikers Field Guide needed real one-hop trust; the trust-graph work already had it and had never been near a street. Three things come together here:

* the [[Hitchhikers Field Guide]] — a walking AR client, built by Max and the ARWorld team on OASIS, which needed real one-hop trust to replace a fixture. Their own documents are served here too: [[The ARWorld Pack]]
* [[The DTG Credentials Core Specification]] — the ToIP working draft that names the objects all of this is *about*, and [[The DTG ZKP Task Force]], which owns the layer it defers
* the counter-spec and runnable model that came back down the other strand, which is what the rest of these pages record

The problem, in one line. Our overlay works today, but its peers are a **fixture**: two invented players, Maya and Jon, in a JSON file near Islington, standing in for the half of the query the system cannot yet answer. What we wanted, as of 2026-08-15, was the smallest honest next graph work that would replace them.

## The shape of it

Three graphs, and the map is where they meet.

* **Knowledge** is the places you witnessed. It lives under the Swordsman, in full.
* **Promise** decides what a peer's peek may show, per discovery, per audience.
* **Trust** decides whose Knowledge may appear on your map at all.

The query the overlay runs is one line: *there is a trust edge between us, AND your disclosure policy for the audience you granted me allows these fields.*

## The rulings

Each of these is a page, and each is backed by a property test that fails if the ruling is broken.

* [[The Meet Rite]] — how an edge is actually made, in a street, between two phones
* [[Audience Is Granted Not Computed]] — why two hops is nothing, not half
* [[The Pairwise Peer Reference]] — the leak that nearly undid all of it
* [[A Wiki Fork Is Not An Audience]] — the finding this wiki is itself an example of
* [[Erosion Is A Rate Not A Cliff]] — a meet from four years ago is not a meet from Tuesday
* [[Shared Quest Is Not Consent]] — where I disagree with a spec that already shipped
* [[The Rejection Register]] — the closed vocabulary of every way the model says no
* [[Rounding Is Not A Detail]] — how two correct implementations put a pin across the street from each other

**Answering the pack directly:** [[The Question Map]] — all twenty questions in Max's three documents, each anchored to a property that runs · [[Phase 0 Acceptance]] — their five acceptance criteria, executable · [[The Overlay Ranking]] — their score-terms table, made mechanical.

The days it was built, as chronicles with the runtime traces beside them: [[2026-08-15 The Predicate Walks To Islington]] · [[2026-08-16 The Checklist Answers Back]]. Compressed: [[Proverbs Of The Trust Overlay]].

## What it is not

Evidence, not spec. It binds nobody — not the Field Guide team and not the task force. It is not zero knowledge: it models the relations a ZK construction would prove, the way the trust graph formation runtime does in the DTG lab flagged into this neighbourhood.

It does not establish location integrity. Co-location is asserted by a phone's own GPS, so two colluding players can mint an edge from opposite ends of the country. [[OASIS And The Cred Spec]] proposes moving that claim out of the edge entirely, which is a better answer than the one I first gave.

And it does not establish personhood — one human can hold many avatars and mint edges between them. I first wrote that up as a shortfall. It is not one: the spec defines a **pairwise** construction available with no community at all, and says plainly that it confers no community-level assurance. This is that construction, correctly used. The correction is on my side, and the deployment is what surfaced it.

> The fastest way to disagree with any of this is a failing test, and a failing test is the most valuable thing you can send.
