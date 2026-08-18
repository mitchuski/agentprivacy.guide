# The DTG Credentials Core Specification

The ToIP working draft that names the objects all of this is *about*. Not my work — I read it, build against it, and co-chair the task force that owns the layer it deliberately leaves open.

**Decentralized Trust Graph Credentials — Core Specification**, Version 1.0, Working Draft. Decentralized Trust Graph Working Group, Trust over IP Foundation.

*Editors:* Alberto Leon and Brendan A. Miller (Applied Social Media Lab, Berkman Klein Center at Harvard University), Geoff Turk, Martina Kolpondinos and Drummond Reed (First Person Project). *Contributors* include Sankarshan Mukhopadhyay, Glenn Gore, and the participants of the DTGWG.

## What it defines

Six W3C Verifiable Credential types that create and annotate a trust graph, and four identifier types for the nodes.

**Edge credentials**, issued in pairs — one in each direction — to form a single edge: the **VRC** (a peer-to-peer relationship) and the **VMC** (membership in a community).

**Annotation credentials**, which add assertions to an edge that already exists: the **VPC** (asserting a persona to a counterparty), the **VEC** (an endorsement), and the **VWC** (a witness attesting that an edge is authentic — for example that both parties proved they were at the same event at the same time).

**Invitation credentials**, which onboard a new member to a community.

**Four identifiers:** R-DID for a relationship, M-DID for membership, C-DID for a community, P-DID for a persona. A relationship DID is "not intended to be used for any type of correlation beyond the scope of the two peers" — intentional correlation is what the other three are for.

## The two constructions

This is the part most worth knowing, because it decides what a given deployment may claim.

**Pairwise**, available to any two parties holding a relationship credential between them, with no community anywhere in the picture. It supports selective disclosure and minimal correlation — and the spec says plainly that it "does not by itself confer any community-level assurance (e.g., personhood)."

**Community-anchored**, available when both parties hold membership credentials from the *same* community. Whatever the community's governance attaches to those memberships — personhood, when they qualify as personhood credentials — carries forward into the proof.

An implementation is not deficient for being in the first category. It is in the first category. See [[OASIS And The Cred Spec]].

## What it leaves open

"Detailed ZK protocols and registry-ZK interactions are out of scope for this specification." That deferred layer is the charter of [[The DTG ZKP Task Force]].

One standing note it makes that the rest of the industry mostly does not: **"Implementations SHOULD make ZKP presentation the default behavior so that users obtain privacy preservation without having to opt in."** The default is the opposite of the usual default, deliberately.

Read it at trustoverip.github.io/dtgwg-cred-spec — and read that rather than this page, which is one person's summary of one vendored copy.
