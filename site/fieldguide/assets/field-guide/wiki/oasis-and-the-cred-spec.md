# OASIS And The Cred Spec

Where our OASIS ONODE server could meet [[The DTG Credentials Core Specification]]. Notes for the [[Hitchhikers Field Guide]] side of the team — observations, not tickets. None of it blocks what we are building.

## First, the reframe that matters most

I had been describing OASIS as falling short of the trust graph, because its avatars are not personhood-anchored. That framing is wrong, and the error was mine.

The spec is explicit that community membership is **not** a precondition for a relationship credential: two entities who share no community "can still exchange VRCs, and the resulting edges are valid trust attestations standing on their cryptographic signatures and on whatever real-world context the parties bring to them."

So the correct statement is not *OASIS falls short*. It is **OASIS implements the pairwise construction and does not claim community-level assurance** — which the spec names, permits, and describes the limits of. Everything below is alignment, not remediation.

It also caught an error on my side: my own lab's formation model gates every edge on personhood, which models only the *community-anchored* construction and does not cover the pairwise one at all. The deployment found a coverage gap in the lab.

## The spots

**A stable peer identifier.** The overlay returns one avatar id to every peer. The spec requires a new, unique relationship DID for *every* entity you connect with, "even within the same community," and notes that reusing one across counterparties creates unintended correlation. Usefully, it also frames a stable id as an explicit *bootstrap* state, with migration to relationship DIDs "recommended post-bootstrapping" — so this is the spec's own migration path, not an outside rule.

**A global display name.** The spec: correlation across relationships "should occur only through the holder's deliberate assertion of a persona — never as a side effect of credential structure." A profile name shipped on every peer pin is exactly correlation as a side effect of structure. The fix already has a name and a credential type: a persona credential asserting a persona DID, per edge. See [[The Pairwise Peer Reference]], where I proposed this independently and, it turns out, later than the spec did.

**One symmetric link row.** Edge credentials are "issued in pairs, one in each direction." Two directional credentials make asymmetric disclosure natural instead of bolted on — I show you one face, you show me another, without the two fighting over the same fields.

**Co-location baked into the edge.** This is the one I would most like looked at, because it improves the design rather than renaming it. The spec already has the object: a witness credential annotating an edge, whose own example is "both parties provided proof that they were at the same event at the same time." Let the edge form on consent and carry proximity as a *separable annotation*, and the honest weakness — that a phone asserts its own location — stops contaminating what the edge means. Better evidence later upgrades the annotation without touching an edge.

**Naming.** The meet exchange is, in the spec's own words, a **relationship invitation** — "such as by scanning a QR code (in person or remotely)", also known as an out-of-band introduction. But an *invitation credential* is a different thing entirely, for onboarding a community member; do not name the peer meet that. And the existing share card is an **r-card**, whose open specification is a forthcoming DTGWG deliverable — which makes this the cheapest possible moment to align field names.

**Expiry and revocation.** Neither the server nor my model has either on a link. A meet from four years ago weighs what a meet from Tuesday weighs, and there is no unfriend. See [[Erosion Is A Rate Not A Cliff]].

The full note, with the clauses quoted and an ordering, is `NOTE-oasis-cred-spec-alignment.md` in the workbench. It is one person's reading of one vendored copy of a working draft; where it is wrong about a clause, the spec wins.
