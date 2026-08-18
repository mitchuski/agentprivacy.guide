// Author the counter-spec as federated wiki pages for privacy.fieldguide.
//
//   node author.mjs           # writes ./pages/*  (review these)
//   node author.mjs --install # also copies into the running farm + sitemap
//
// Deliberately NOT an import. The rule for this space is fork or author, never
// bulk-copy a repo in — so these are new pages, written for the wiki rather
// than converted from the markdown: one idea per page, linked by title, sized
// to be argued with individually. The counter-spec stays the artefact you send
// Max; this is the same thinking in a form the neighbourhood can fork.
//
// Deterministic: fixed date, ids derived by hash. Re-running changes nothing
// unless the content changed, so it will not churn the farm.

import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';

const DATE = Date.parse('2026-08-15T22:45:00Z');
const SITE = 'privacy.fieldguide.localhost';
const FARM = '/Volumes/24mitchuski/mouseaugust/.wiki';
const OUT = new URL('./pages/', import.meta.url).pathname;

const slugify = (title) =>
  title.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').toLowerCase();
const id = (slug, i) => createHash('sha256').update(`${slug}:${i}`).digest('hex').slice(0, 16);

// --- the pages -------------------------------------------------------------
// `text` blocks become markdown story items in order.

const PAGES = [
  {
    title: 'Field Guide Trust Overlay',
    story: [
      `# Field Guide Trust Overlay`,
      `**Two strands of our own work meeting**, and this page is the index to where they met. The Hitchhikers Field Guide needed real one-hop trust; the trust-graph work already had it and had never been near a street. Three things come together here:\n\n* the [[Hitchhikers Field Guide]] — a walking AR client, built by Max and the ARWorld team on OASIS, which needed real one-hop trust to replace a fixture. Their own documents are served here too: [[The ARWorld Pack]]\n* [[The DTG Credentials Core Specification]] — the ToIP working draft that names the objects all of this is *about*, and [[The DTG ZKP Task Force]], which owns the layer it defers\n* the counter-spec and runnable model that came back down the other strand, which is what the rest of these pages record`,
      `The problem, in one line. Our overlay works today, but its peers are a **fixture**: two invented players, Maya and Jon, in a JSON file near Islington, standing in for the half of the query the system cannot yet answer. What we wanted, as of 2026-08-15, was the smallest honest next graph work that would replace them.`,
      `## The shape of it\n\nThree graphs, and the map is where they meet.\n\n* **Knowledge** is the places you witnessed. It lives under the Swordsman, in full.\n* **Promise** decides what a peer's peek may show, per discovery, per audience.\n* **Trust** decides whose Knowledge may appear on your map at all.\n\nThe query the overlay runs is one line: *there is a trust edge between us, AND your disclosure policy for the audience you granted me allows these fields.*`,
      `## The rulings\n\nEach of these is a page, and each is backed by a property test that fails if the ruling is broken.\n\n* [[The Meet Rite]] — how an edge is actually made, in a street, between two phones\n* [[Audience Is Granted Not Computed]] — why two hops is nothing, not half\n* [[The Pairwise Peer Reference]] — the leak that nearly undid all of it\n* [[A Wiki Fork Is Not An Audience]] — the finding this wiki is itself an example of\n* [[Erosion Is A Rate Not A Cliff]] — a meet from four years ago is not a meet from Tuesday\n* [[Shared Quest Is Not Consent]] — where I disagree with a spec that already shipped\n* [[The Rejection Register]] — the closed vocabulary of every way the model says no\n* [[Rounding Is Not A Detail]] — how two correct implementations put a pin across the street from each other\n\n**Answering the pack directly:** [[The Question Map]] — all twenty questions in Max's three documents, each anchored to a property that runs · [[Phase 0 Acceptance]] — their five acceptance criteria, executable · [[The Overlay Ranking]] — their score-terms table, made mechanical.\n\nThe days it was built, as chronicles with the runtime traces beside them: [[2026-08-15 The Predicate Walks To Islington]] · [[2026-08-16 The Checklist Answers Back]]. Compressed: [[Proverbs Of The Trust Overlay]].`,
      `## What it is not\n\nEvidence, not spec. It binds nobody — not the Field Guide team and not the task force. It is not zero knowledge: it models the relations a ZK construction would prove, the way the trust graph formation runtime does in the DTG lab flagged into this neighbourhood.\n\nIt does not establish location integrity. Co-location is asserted by a phone's own GPS, so two colluding players can mint an edge from opposite ends of the country. [[OASIS And The Cred Spec]] proposes moving that claim out of the edge entirely, which is a better answer than the one I first gave.\n\nAnd it does not establish personhood — one human can hold many avatars and mint edges between them. I first wrote that up as a shortfall. It is not one: the spec defines a **pairwise** construction available with no community at all, and says plainly that it confers no community-level assurance. This is that construction, correctly used. The correction is on my side, and the deployment is what surfaced it.`,
      `> The fastest way to disagree with any of this is a failing test, and a failing test is the most valuable thing you can send.`,
    ],
  },

  {
    title: 'Hitchhikers Field Guide',
    story: [
      `# Hitchhikers Field Guide`,
      `Our client, and the reason any of the rest of these pages exist. Written up here from the handoff pack in my own words, so the graph side of the team can see what the map side is actually building — which means the details below are mine to get wrong. Max and the ARWorld side are the authority; corrections straight into this page, please.`,
      `## What it is\n\nA walking AR client. Players do not share a game room; they share the **physical world** and an OASIS avatar. "Multiplayer" means you witness a place, that fact lands in Knowledge, Promise decides what a peer may see, and Trust decides whose Knowledge you may query. The map then shows a quiet overlay — *Maya was here* — rather than live avatars running around.\n\nUnity 2021.3, in an ARWorld tree originally from Kashif, with the Field Guide package layered on it. The server side is OASIS ONODE, deployed on Railway.`,
      `## The idea I would steal\n\n> **Discovery is not seeing a pin. Discovery is a witnessed connection with a place.**\n\nMap density from OpenStreetMap is the **floor**. Discovery is an **act** — in radius, then a rite: hold-to-Witness at a desk, camera Fetch on a phone, a seal at a parish pin, a banish for an omen. Peeking a card is an *encounter*, not a discovery. Walking past a placeholder pub is *presence*, not a discovery.\n\nThat three-layer distinction — presence, encounter, discovery — is the sharpest thing in the pack, and it is what let the whole trust model fall out cleanly. It is also, structurally, the same distinction the trust graph makes between a proposal and a signed edge. Max got there from a game design problem; the lab got there from an anti-Sybil one.`,
      `## What is already built\n\n* the Witness payload contract, and \`POST /poi/witness\` — idempotent per avatar and place, live on Railway\n* the Unity write client, firing after check-in, fire-and-forget\n* City Attraction witnessing using the same rite as quest pins\n* \`GET /poi/nearby\` returning your own trail plus a peer overlay — gold ring for a peer, teal for yourself, capped at twelve, distance first\n* a share flow after the first Witness of a session, opening a card\n\nAnd the honest gap they flagged themselves: the peers in that overlay are a fixture. Phase 5 — a real meet — was specced and not built.`,
      `## The rules already set, which I did not have to argue with\n\nMost of the good constraints here were decided on the map side before the graph side arrived:\n\n* one avatar root; no second profile store, no friends database, no live-presence layer\n* no central trust score, and no map score standing in for one\n* one rite, two skins — the desk and the camera must not become two meanings of discovery\n* distance first; trust must never pull Greenwich onto an Islington viewport\n* multi-hop friend-of-friend is out of scope\n* the wiki is lore, not the place database, and nothing scrapes it\n* partners join as claimed local businesses, not by relabelling map data as official\n\nThe counter-spec adds to that list. It overturns none of it — which is the useful thing to be able to say after a week of poking.`,
      `## What came back down the other strand\n\n[[The Meet Rite]] for the missing edge · [[Audience Is Granted Not Computed]] and [[The Pairwise Peer Reference]] for the disclosure layer · [[Erosion Is A Rate Not A Cliff]] for their open question about recency · [[A Wiki Fork Is Not An Audience]] for the lore seam · [[Shared Quest Is Not Consent]] where I disagree with them · and [[OASIS And The Cred Spec]] for where our server could meet the standard, with [[Could This Be Zero Knowledge]] for where it could go after that.\n\nThe day itself is [[2026-08-15 The Predicate Walks To Islington]].`,
    ],
  },

  {
    title: 'The DTG Credentials Core Specification',
    story: [
      `# The DTG Credentials Core Specification`,
      `The ToIP working draft that names the objects all of this is *about*. Not my work — I read it, build against it, and co-chair the task force that owns the layer it deliberately leaves open.`,
      `**Decentralized Trust Graph Credentials — Core Specification**, Version 1.0, Working Draft. Decentralized Trust Graph Working Group, Trust over IP Foundation.\n\n*Editors:* Alberto Leon and Brendan A. Miller (Applied Social Media Lab, Berkman Klein Center at Harvard University), Geoff Turk, Martina Kolpondinos and Drummond Reed (First Person Project). *Contributors* include Sankarshan Mukhopadhyay, Glenn Gore, and the participants of the DTGWG.`,
      `## What it defines\n\nSix W3C Verifiable Credential types that create and annotate a trust graph, and four identifier types for the nodes.\n\n**Edge credentials**, issued in pairs — one in each direction — to form a single edge: the **VRC** (a peer-to-peer relationship) and the **VMC** (membership in a community).\n\n**Annotation credentials**, which add assertions to an edge that already exists: the **VPC** (asserting a persona to a counterparty), the **VEC** (an endorsement), and the **VWC** (a witness attesting that an edge is authentic — for example that both parties proved they were at the same event at the same time).\n\n**Invitation credentials**, which onboard a new member to a community.\n\n**Four identifiers:** R-DID for a relationship, M-DID for membership, C-DID for a community, P-DID for a persona. A relationship DID is "not intended to be used for any type of correlation beyond the scope of the two peers" — intentional correlation is what the other three are for.`,
      `## The two constructions\n\nThis is the part most worth knowing, because it decides what a given deployment may claim.\n\n**Pairwise**, available to any two parties holding a relationship credential between them, with no community anywhere in the picture. It supports selective disclosure and minimal correlation — and the spec says plainly that it "does not by itself confer any community-level assurance (e.g., personhood)."\n\n**Community-anchored**, available when both parties hold membership credentials from the *same* community. Whatever the community's governance attaches to those memberships — personhood, when they qualify as personhood credentials — carries forward into the proof.\n\nAn implementation is not deficient for being in the first category. It is in the first category. See [[OASIS And The Cred Spec]].`,
      `## What it leaves open\n\n"Detailed ZK protocols and registry-ZK interactions are out of scope for this specification." That deferred layer is the charter of [[The DTG ZKP Task Force]].\n\nOne standing note it makes that the rest of the industry mostly does not: **"Implementations SHOULD make ZKP presentation the default behavior so that users obtain privacy preservation without having to opt in."** The default is the opposite of the usual default, deliberately.`,
      `Read it at trustoverip.github.io/dtgwg-cred-spec — and read that rather than this page, which is one person's summary of one vendored copy.`,
    ],
  },

  {
    title: 'The DTG ZKP Task Force',
    story: [
      `# The DTG ZKP Task Force`,
      `A task force of the Decentralized Trust Graph Working Group at the Trust over IP Foundation (LFDT). Chaired by Scott Jones of Realeyes; I co-chair for Soulbis. The work is the group's, not mine, and nothing in this space binds it.`,
      `## The charter\n\n[[The DTG Credentials Core Specification]] defines the credentials and then deliberately defers the zero-knowledge layer. This task force is that layer: how verifiable trust agents produce privacy-preserving proofs of personhood and biometric liveness **without revealing identity, biometric, or model**.\n\nDeliverable: DTG ZKP V1.0. Milestone: a Working Draft for IIW #43, 3–5 November 2026.`,
      `## How it works, which is the part worth copying\n\nA drafting discipline the group adopted, which did not come from etiquette — it fell out of building things and watching which claims survived executable form:\n\n> name the adversary · name the horizon · write what a predicate does **not** establish · label conjecture\n\nAnd a working principle: **before the group decides anything, there should be something you can run that makes the decision concrete.** A privacy claim you cannot test is a mood.\n\nSo there is a lab beside the spec work — reference models, real circuits with measured numbers, cross-language interop proofs — none of which binds the task force. It is input, built to be ratified, refined, or refuted. The fastest way to disagree with it is a failing test.`,
      `## Where this space touches it\n\nThe trust-graph formation model in that lab had no real consumer until the Field Guide needed exactly it. What survived the trip, what did not, and what went back upstream is recorded in [[2026-08-15 The Predicate Walks To Islington]] and held by a suite that imports the lab directly, so drift breaks loudly.\n\nThe conformance instrument the task force uses — a closed register of rejection reasons, deterministic vectors, and a consumer written in a second language sharing no code — was rebuilt here for an unrelated domain and caught a real bug within the hour. That story is [[The Rejection Register]] and [[Rounding Is Not A Detail]].`,
    ],
  },

  {
    title: 'OASIS And The Cred Spec',
    story: [
      `# OASIS And The Cred Spec`,
      `Where our OASIS ONODE server could meet [[The DTG Credentials Core Specification]]. Notes for the [[Hitchhikers Field Guide]] side of the team — observations, not tickets. None of it blocks what we are building.`,
      `## First, the reframe that matters most\n\nI had been describing OASIS as falling short of the trust graph, because its avatars are not personhood-anchored. That framing is wrong, and the error was mine.\n\nThe spec is explicit that community membership is **not** a precondition for a relationship credential: two entities who share no community "can still exchange VRCs, and the resulting edges are valid trust attestations standing on their cryptographic signatures and on whatever real-world context the parties bring to them."\n\nSo the correct statement is not *OASIS falls short*. It is **OASIS implements the pairwise construction and does not claim community-level assurance** — which the spec names, permits, and describes the limits of. Everything below is alignment, not remediation.\n\nIt also caught an error on my side: my own lab's formation model gates every edge on personhood, which models only the *community-anchored* construction and does not cover the pairwise one at all. The deployment found a coverage gap in the lab.`,
      `## The spots\n\n**A stable peer identifier.** The overlay returns one avatar id to every peer. The spec requires a new, unique relationship DID for *every* entity you connect with, "even within the same community," and notes that reusing one across counterparties creates unintended correlation. Usefully, it also frames a stable id as an explicit *bootstrap* state, with migration to relationship DIDs "recommended post-bootstrapping" — so this is the spec's own migration path, not an outside rule.\n\n**A global display name.** The spec: correlation across relationships "should occur only through the holder's deliberate assertion of a persona — never as a side effect of credential structure." A profile name shipped on every peer pin is exactly correlation as a side effect of structure. The fix already has a name and a credential type: a persona credential asserting a persona DID, per edge. See [[The Pairwise Peer Reference]], where I proposed this independently and, it turns out, later than the spec did.\n\n**One symmetric link row.** Edge credentials are "issued in pairs, one in each direction." Two directional credentials make asymmetric disclosure natural instead of bolted on — I show you one face, you show me another, without the two fighting over the same fields.\n\n**Co-location baked into the edge.** This is the one I would most like looked at, because it improves the design rather than renaming it. The spec already has the object: a witness credential annotating an edge, whose own example is "both parties provided proof that they were at the same event at the same time." Let the edge form on consent and carry proximity as a *separable annotation*, and the honest weakness — that a phone asserts its own location — stops contaminating what the edge means. Better evidence later upgrades the annotation without touching an edge.\n\n**Naming.** The meet exchange is, in the spec's own words, a **relationship invitation** — "such as by scanning a QR code (in person or remotely)", also known as an out-of-band introduction. But an *invitation credential* is a different thing entirely, for onboarding a community member; do not name the peer meet that. And the existing share card is an **r-card**, whose open specification is a forthcoming DTGWG deliverable — which makes this the cheapest possible moment to align field names.\n\n**Expiry and revocation.** Neither the server nor my model has either on a link. A meet from four years ago weighs what a meet from Tuesday weighs, and there is no unfriend. See [[Erosion Is A Rate Not A Cliff]].`,
      `The full note, with the clauses quoted and an ordering, is \`NOTE-oasis-cred-spec-alignment.md\` in the workbench. It is one person's reading of one vendored copy of a working draft; where it is wrong about a clause, the spec wins.`,
    ],
  },

  {
    title: 'Could This Be Zero Knowledge',
    story: [
      `# Could This Be Zero Knowledge`,
      `An exploration, for the [[Hitchhikers Field Guide]] side. Nothing here is on our roadmap and nothing needs to be.\n\nShort answer: yes — three parts usefully, one part beautifully. But not yet, and the blocker is not a circuit.`,
      `## The precondition nobody can skip\n\nThe server holds every avatar's keys, every edge and every discovery, and assembles the map itself.\n\n**A zero-knowledge proof presented to a party that already holds your secrets protects nothing.** If a client proves to the server "I hold an edge with the owner of this pin," the server issued that edge and can read it. The proof is decoration.\n\nSo the first step is not circom. It is moving signing keys onto the device — what the spec calls a personal network vault, under the exclusive control of the person, whose use they *may* delegate to an agent. Holding them server-side is the delegated pattern, and it is permitted. It just means there is nothing yet for a proof to bite on.\n\nWorth saying first because it is the least fun part and the easiest to skip past into circuits.`,
      `## Where it goes, and where it does not\n\nThe instinct is to reach for the write path. Resist it: witnessing a place is a player telling their own server about their own visit. There is no counterparty and nothing to hide. **Zero knowledge belongs at the presentation surface, not the write surface** — which is where the spec puts it too.\n\nFour statements worth proving, in the order I would rank them:\n\n**A · "These two personas have a relationship"** — without revealing either relationship identifier. The verifier is a third party, so this pays off *immediately*, with no key migration. It is also the spec's own worked example of the pairwise proof, and it is the share card upgraded: a card that carries a verifiable relationship claim a stranger can check, without the two parties leaking their private channel or becoming correlatable across every other card they have shared.\n\n**B · "This pin belongs on my map"** — I hold an edge with its owner and their policy admits me, without revealing *which* peer. This inverts the overlay: the client proves, the server returns the pin, and the server never learns the social graph. The prize, and strictly gated on key custody.\n\n**C · "We were within R metres of each other at time T"** — without either position being revealed to anyone, including the server. The spec's witness credential already anticipates the statement; its own example is both parties proving they were at the same event at the same time.\n\n**D · "This discovery is fresher than H"** — without revealing when. Small, cheap, pleasant.`,
      `## The one I would most like to build\n\nC. A meet currently sends both sets of coordinates to a server, which makes a location-tracking database accumulate as a side effect of a friendship feature. The proof version leaks a boolean and nothing else.\n\nThe honest limit: a phone's location is self-asserted, so the proof establishes that two devices *claimed* nearby positions, not that two people were together. Zero knowledge makes the claim private; it does not make it true.\n\nEven so — turning *we were in the same place* from a database row into a proof that reveals nothing is a genuinely nice thing for a walking game to be able to say.`,
      `## What it costs, measured rather than adjectival\n\nFrom the lab, real proofs over BN254, not simulations: a membership-plus-nullifier circuit at **11,523 constraints — about 683 ms to prove, 8 ms to verify, 721 bytes**.\n\nRead for a phone: the proof size is irrelevant, ship it in a header. Verification is free. **Proving is the constraint** — several times 683 ms on a mid-range handset. That is fine for a meet, a once-per-relationship ceremony where the player is already holding up a QR code. It is not fine per-pin on a map that repaints as you walk, which shapes statement B: one proof per query, not one per pin.\n\nGroth16 also needs a trusted setup per circuit, and the lab's is a lab fixture that says so. A production one is a governance exercise, not an afternoon.\n\nOne number worth knowing because it is so cheap: binding a proof to its context cost **exactly one constraint**. Unbound proofs are replayable, so there is no reason to skip it.`,
      `## The path\n\nEach step is useful alone and none of them strands you.\n\n0. **Nothing.** Ship the meet and the overlay with ordinary signatures, and get the object shapes right first — see [[OASIS And The Cred Spec]]. Every step below is easier for it, and that work has to happen anyway.\n1. **A**, the pairwise relationship proof on the card. Third-party verifier, no migration needed.\n2. **Keys to the device.** The real one.\n3. **C**, proximity as an annotation — a small circuit that removes a liability rather than adding a feature.\n4. **B**, the private overlay query.\n5. Community-anchored proofs, if OASIS ever forms a community with personhood governance.\n\nIf any of these become interesting I would rather build them in the task force lab, as public evidence with measurements attached, than bespoke inside one server — so the answer is reusable by anyone implementing the spec, and the Field Guide is the deployment that motivated it rather than the only place it works. See [[The DTG ZKP Task Force]].\n\nCaveat on all of it: I have not written these circuits. The costs above are for adjacent statements in the same family — a reasonable guide, not a quote.`,
    ],
  },

  {
    title: 'The Meet Rite',
    story: [
      `# The Meet Rite`,
      `How a one-hop trust edge is actually created between two people who meet in London. It is the person-side twin of witnessing a place, and the two must never be confused: one endpoint means *I connected with a place*, the other means *I connected with a person*.`,
      `## Three steps\n\n1. **A opens Meet.** A QR appears on their screen, carrying a nonce, a location, and a two-minute expiry.\n2. **B scans it.** B derives a shared value from both nonces and consents.\n3. **A confirms.** A recomputes everything independently and signs.\n\nThe scan alone is an **encounter, not an edge**. Peeking a card is encounter only; so is scanning a code. An edge needs both hands.`,
      `## Eight gates\n\nEvery refusal has a name from [[The Rejection Register]].\n\n* the confirmer must be the avatar who opened the meet\n* no self-edge — a link with oneself is self-Sybil, not a relationship\n* bilateral consent — the graph grows only when both hands are on it\n* the offer must not have expired; a meet is a moment, not a credential in a wallet\n* the nonce is single-use, so a photographed QR is already spent\n* the two devices must be within fifty metres — the rite is physical\n* the commitment is **recomputed, never trusted**\n* one link per pair`,
      `## The gap\n\nThe seventh gate is the structural one. The confirming side never accepts the scanning side's claimed commitment; it recomputes it from the public parts. Proposer and prover are held apart, so a tampered client cannot talk its counterparty into an edge.\n\nThis is lifted directly from the trust graph formation runtime in the DTG lab, where the Mage proposes the smallest edge and the Swordsman proves it before signing. What the physical world adds is only the three gates a proverb exchange between two agents does not need: freshness, replay, and co-location.`,
      `## What the edge holds\n\nA commitment, two pairwise references, a coarse place hint, and the face each side chose to show the other. **No score, no weight, no direction.** A relationship either exists or it does not, and nothing downstream reads a number off it.\n\nSee [[The Pairwise Peer Reference]] for why the faces live on the edge rather than on a profile.`,
    ],
  },

  {
    title: 'Audience Is Granted Not Computed',
    story: [
      `# Audience Is Granted Not Computed`,
      `A one-hop trust edge gets you the *link* audience. Nothing gets you *acquaintance* except the owner handing it to you. And graph distance never raises an audience: two hops is not half of link, it is **nothing**.`,
      `## Why this is the whole thing\n\n"No central trust score" is easy to agree with and easy to lose. You lose it the moment friend-of-friend leaks in at a reduced tier, because at that point distance has become a currency: every player's incentive turns into edge farming, and you have built a score with extra steps and no dial to turn it off.\n\nSo the ladder is not a gradient over the graph. It is a set of grants.`,
      `## The ladder\n\n* **public** — title, kind, marker, and coarse geography only\n* **link** — adds the wiki slug, the rite, the trail, the time, and exact geography\n* **acquaintance** — adds the note\n* **private** — the pin is absent, not blank\n\nQuest pins cap one rung tighter no matter who asks, because a quest pin says what you were *doing*, not just where you were.`,
      `## A closed allow-list, not a strip-list\n\nThe projection starts empty and copies in only named fields. This is not a stylistic preference. A strip-list leaks by omission: the day somebody adds a device model to the record, it ships — and a test written against a strip-list still passes, because it only knows about the fields it was told to remove.\n\nThe property that keeps it honest bolts a junk field onto a record and asserts it never surfaces at any audience. That test is unwritable against a strip-list. Inverting the list is what made the property expressible, and the property is worth more than the ten lines it cost.`,
      `Related: [[A Wiki Fork Is Not An Audience]], which is about the rung this ladder does not have.`,
    ],
  },

  {
    title: 'The Pairwise Peer Reference',
    story: [
      `# The Pairwise Peer Reference`,
      `Every projection of a place carries the owner's reference **toward this one viewer**, never a global identifier. Two people who have both met me hold two unjoinable handles for me.`,
      `## The leak\n\nThe overlay response as specified returns a raw avatar id and a global display name on every peer pin. Either one alone defeats the pairwise reference completely: two viewers who have both met the same person receive the same identifier for them, compare notes, and reconstruct a trail neither was shown.\n\nAll the care in deriving a fresh reference per counterparty buys exactly nothing if a stable name rides along beside it.`,
      `## The fix is smaller than the leak\n\nA display name is **chosen per edge, at meet time** — the face you show this person — rather than read off a profile. Maya can be "Maya" to me and "M." to Jon, and nothing joins the two.\n\nThis is the Mage projection applied at the person layer instead of the place layer, which is what the system says it is for in the first place. It costs one text field in the meet UI.`,
      `## The property worth stealing\n\nTake two viewers' projections of the same pin and assert that **no identifier field is equal between them**.\n\nWritten that way it catches the class rather than the instance: it would have caught the display name, it will catch the next thing somebody adds, and it does not need to be updated when the field list changes.`,
      `A caveat that belongs with it: a presented name is self-asserted, so someone can present as "Maya" to a third party. That survives here because the name is scoped to one edge formed by a physical meeting — you are looking at the person while they choose it — but it is a name, not an attestation, and nothing downstream should treat it as one.`,
    ],
  },

  {
    title: 'A Wiki Fork Is Not An Audience',
    story: [
      `# A Wiki Fork Is Not An Audience`,
      `The finding this page is itself an instance of. It came out of modelling the last unmodelled seam — the join between a witnessed place and the lore page about it — and it is the one I would most want a second pair of eyes on.`,
      `## The false friend\n\nThe disclosure ladder — public, link, acquaintance — answers *how much do I show **this** counterparty*. Every rung on it, public included, is scoped to somebody you are handing something to.\n\nA federated wiki page has no counterparty. It is readable by everyone, indefinitely, and **it propagates by design**. That is what federation is.\n\nSo "public" the disclosure tier and "public" the wiki page are false friends, and they are false friends in the most dangerous direction: public is the *least* private rung, the one a cautious player picks. A publish path that reads the audience ladder to decide what it may publish takes that caution and turns it into worldwide publication.`,
      `> A wiki fork is not an audience. It is a quantifier change.`,
      `## What follows\n\nPublication is **its own consent**, per item, defaulting to off, and it is not implied by any audience whatsoever. In the model, *world* is deliberately not a member of the audience list — it cannot be reached by widening.\n\nThe rest falls out. A plain witness writes no page, because the alternative spams the neighbourhood. A private item is unpublishable at any consent. A forked page carries public-tier fields only, never the note and never the quest. The fork claims its own slug and *links* the canonical one, with a journal event naming where it came from — because that is the whole difference between forking and copying. A generic floor pin has nothing to fork from, so the game never becomes the source of truth for lore.`,
      `## Why it generalises\n\nAny system with an audience ladder and a publish button has this bug available to it. The ladder answers "who", the button answers "how many", and the two questions look identical right up until the moment somebody's least-private setting is read as permission.\n\nIt is also, pleasingly, the argument for how this very space works: [[Field Guide Trust Overlay]] and its pages were authored here rather than imported, because a copied page is a silent divergence and a forked one keeps its lineage.`,
    ],
  },

  {
    title: 'Erosion Is A Rate Not A Cliff',
    story: [
      `# Erosion Is A Rate Not A Cliff`,
      `Should the overlay only show places a peer visited recently — say, in the last ninety days?\n\nYes. But ninety days as a boolean is a cliff, and a pin does not stop being true on day ninety-one.`,
      `## Half-life, with a floor\n\nFreshness halves every ninety days and drops out of the overlay below a quarter, which lands at about six months. The scalar itself ships with the pin, so the client fades the ring rather than popping the marker.\n\nThe difference is visible in one property: a pin at eighty-nine days and a pin at ninety-one days differ by less than a fiftieth, and both are still on the map. Under a cliff they are on opposite sides of the world.`,
      `## Your own trail never erodes\n\nErosion governs how much a peer's old enthusiasm should move you. It says nothing about whether you were there. Your own places stay on your own map forever.`,
      `## What is still missing\n\nThe **edge** does not erode, and there is no way to unmake one. A meet from four years ago currently weighs exactly what a meet from Tuesday weighs, which is wrong over any horizon long enough to matter.\n\nThe machinery already exists — it is simply not applied to the edge yet. This is the most obvious next piece of work and it is not hard; it is on this page so it does not get quietly forgotten. See [[The Meet Rite]].`,
    ],
  },

  {
    title: 'Shared Quest Is Not Consent',
    story: [
      `# Shared Quest Is Not Consent`,
      `A disagreement, recorded plainly, with a line that has already shipped in a spec I did not write.`,
      `## The line\n\nThe trust-weighted map spec lists three sources of a trust edge, and the second is a shared completed adventure: two players finish the same quest, and an edge appears between them.`,
      `## Why not\n\nCo-completion is co-presence with a timestamp. There is no consent anywhere in it.\n\nAnd admitting it makes the same document contradict itself. Its own out-of-scope list forbids *auto-following strangers who stood near the same POI* — but a quest-completion edge is precisely that, with a quest placed between the strangers and the following. The rule against auto-witnessing a place on walk-by is already agreed; this is the same rule one layer up, at the person level instead of the place level.`,
      `## What it should do instead\n\nPrompt a meet. "You both finished the Murder Stones — say hello?" is a genuinely lovely moment, and it is exactly the right place to put the QR code. It should *lead to* [[The Meet Rite]]. It should not *be* one.`,
      `In the model, co-completion returns an encounter with both consent flags false and an explicit refusal to form an edge, so the position is enforced rather than merely stated. The same treatment applies to a till redeem at a partner venue: a receipt, not an edge, because a steward and a pilgrim are not symmetric and a link would put every player's trail inside the venue's map in exchange for a cup of tea.`,
    ],
  },

  {
    title: 'The Rejection Register',
    story: [
      `# The Rejection Register`,
      `Twenty-two named ways the model says no, and a property asserting that **every one of them is produced by a live vector**.`,
      `## Why the register is the useful artefact\n\nTwo implementations agree about success trivially and disagree about failure constantly. "It rejected the request" is not interoperability. "It rejected the request with *meet-not-colocated*" is.\n\nThis is the piece of the DTG conformance work that turned out to be worth the most, and nobody expected it to be.`,
      `## The discipline\n\nA register entry nobody can produce is a documentation claim, and documentation claims are what this whole way of working exists to replace. So the coverage property is not optional decoration — it is the thing that keeps the register from rotting into prose.\n\nA second property asserts the reverse: no vector may produce a code that is not in the register. The vocabulary is closed in both directions.`,
      `## Absence has reasons too\n\nThe overlay query can be asked to explain itself, returning every pin that could have appeared and did not, each with a named reason: out of radius, no trust edge, below the freshness horizon, capped private by its owner, ranked out beyond the cap.\n\nA desk demo with an empty overlay should be able to say *why* in one call, instead of by bisecting the query. See [[Erosion Is A Rate Not A Cliff]] for the horizon and [[Audience Is Granted Not Computed]] for the cap.`,
    ],
  },

  {
    title: 'Rounding Is Not A Detail',
    story: [
      `# Rounding Is Not A Detail`,
      `What a second-language consumer found, which is the entire reason to write one.`,
      `## The bug\n\nThe public audience coarsens a location to about a hundred metres. The obvious implementation is to multiply by a thousand, round, and divide back.\n\nJavaScript rounds a midpoint **up**, toward positive infinity. Python rounds it **to even**. So does C#, by default.\n\nThe same pin therefore lands about a hundred and ten metres apart in two implementations — across a street — and both pass their own unit tests, because neither test suite happened to contain a coordinate sitting exactly on a boundary.`,
      `## The fix\n\nThe rule has to name its rounding mode, or it is not a rule. This one says half-up, which is *floor of x plus a half* in every language.\n\nAnd a vector now sits exactly on the boundary on both axes, so the disagreement is caught by the conformance pack instead of by a player standing on the wrong corner. I checked that it bites: swapping the correct coarsening for the naive one fails that vector and only that vector.`,
      `## The general lesson\n\nThis is why a second implementation, in a second language, sharing zero code, is worth more than any amount of re-reading. It is the difference between *we wrote a spec* and *two strangers can agree*.\n\nThe same family of trap is already handled elsewhere in the encoding: numbers are fixed to six decimal places, because one versus one-point-zero versus one-e-zero is the commonest way two JSON serialisers silently disagree. An implementation in a locale that writes a decimal comma will pass every one of its own tests and fail every interop check.`,
      `Related: [[The Rejection Register]], the other half of being testable by somebody else.`,
    ],
  },

  {
    title: '2026-08-15 The Predicate Walks To Islington',
    story: [
      `# 2026-08-15 · The Predicate Walks To Islington`,
      `> **Provenance.** A chronicle — the narrative working record kept beside the lab, written into the drafting branch so the arc can be read with the runtime traces next to it. Voice: framework. Signed by the First Person: not yet.\n>\n> **Runtime traces:**\n> * \`runtimes/meet-overlay/\` — the model. \`node test.mjs\` → 54/54\n> * \`runtimes/fixtures/\` — 22-code register, deterministic vectors → 8/8\n> * \`runtimes/consumer-py/\` — zero-shared-code Python consumer → 15/15 byte-exact\n> * \`runtimes/lab-bridge/\` — imports the DTG lab's runtime 07 and 01 → 10/10\n> * \`runtimes/reflection/\` — the map checked against the suites → 6/6\n> * \`cd runtimes && node verify.mjs\` → all green`,
      `*A reference model with no consumer met a walking AR game that needed exactly it. Most of the predicate survived the street. One gate could not follow it there, and that failure is the useful part.*`,
      `**Scope:** a counter-spec for the Hitchhikers Field Guide trust overlay, built as evidence rather than argued as prose; and the wiring that makes it a deployment of the ToIP DTG ZKP task force lab rather than a project that merely resembles one.`,
      `## 1. What arrived\n\nA handoff from the map side of our own team, on the fifteenth. The Field Guide is a walking AR client where multiplayer does not mean a shared room — it means you witness a place, that fact lands in Knowledge, Promise decides what a peer may see, and Trust decides whose Knowledge you may query at all. The map shows a quiet overlay. Maya was here.\n\nExcept Maya was not here. Maya and Jon were two invented players in a JSON file near Islington, standing in for the half of the query we could not yet answer. What was wanted was the smallest honest thing that would replace them.`,
      `## 2. The recognition\n\nThe smallest honest thing turned out to be already built.\n\nRuntime 07 in the lab models how a trust graph forms: bilateral consent, a personhood anchor, no self-edge, a fresh reference per counterparty, and the Gap — the proposer proposes the smallest edge, the prover recomputes rather than trusts, and the two are held apart. That is precisely the left-hand side of the fixture's query rule. The game did not need a new idea. It needed the one the task force had been arguing about, pointed at a street.`,
      `## 3. What the street added\n\nFour gates, and the count is now asserted rather than described, so a fifth added quietly turns a suite red.\n\nThree are what *physical* costs: an offer expires in two minutes, because a meet is a moment and not a credential in a wallet; a nonce is single-use, so a photographed QR code is already spent; and the two devices must be within fifty metres. The fourth is bookkeeping — the rite crosses an HTTP endpoint rather than two co-present processes, so somebody has to check the confirmer is the avatar who opened the meet.\n\nRuntime 07's *encounter* produces a shared value only two parties can derive, and does not care how. It is right not to care. But when the how is two people standing in a street, those are exactly the three questions that appear, and the next consumer should not have to rediscover them.`,
      `## 4. Three things the writing found, which the reasoning had not\n\nThis is the argument for building rather than specifying, and it happened three times in a day.\n\n**An alias is a migration.** A partner claims an OSM node; the client keeps sending the old id and the server resolves it. Registering that as a lookup splits a player who visited before and after the claim into two records with a count that lies about both. The first version of the test failed. It is a live bug in any lookup-only implementation.\n\n**A deny-list cannot be tested.** The first draft of the disclosure layer stripped named fields. The property that matters — bolt a junk field onto a record, assert it never surfaces — is *unwritable* against a strip-list, because a strip-list passes it by ignoring the field. Inverting to a closed allow-list is what made the property expressible, and the property is worth more than the ten lines it cost.\n\n**A grant that changes nothing.** Every record defaulted to a ceiling of *link*, which meant granting somebody *acquaintance* silently did nothing at all. A test caught it. Nobody would have.`,
      `## 5. The quantifier\n\nThen the last unmodelled seam: the join between a witnessed place and the lore page about it. The rule was already agreed — fork a stub that links the canonical page, never overwrite, never write on every witness.\n\nModelling it surfaced the finding I would most want argued with, and this very page is an instance of it. The disclosure ladder answers *how much do I show this counterparty*. A federated page has no counterparty; it is readable by everyone and it propagates by design. So *public* the tier and *public* the page are false friends, in the worst direction — public is the **least** private rung, the one a cautious player picks.\n\nPublication became its own consent, defaulting off, and *world* is deliberately not on the ladder, so it cannot be reached by widening. See [[A Wiki Fork Is Not An Audience]].`,
      `## 6. The stranger\n\nA counter-spec only its author's language can evaluate is a description. So: a closed register of every way the model says no, twenty-two codes, each one triggered by a live vector; deterministic vectors carrying both digest and preimage, so a mismatch can be diffed rather than stared at; and a consumer in Python sharing not one line of code with the model.\n\nWithin an hour of existing it found something no amount of re-reading would have. The public tier coarsens location to about a hundred metres. JavaScript rounds a midpoint up. Python rounds to even. So does C#, which is what the server is written in. The same pin lands a hundred and ten metres apart, on opposite sides of a street, and both implementations pass their own tests.\n\nA coarsening rule that does not name its rounding mode is not a rule. See [[Rounding Is Not A Detail]].`,
      `## 7. The bridge, and the gate that could not follow\n\nUntil late in the day the relationship between the game model and the lab was a correspondence table in a notes file. A table is prose. It cannot go stale loudly.\n\nSo it became a dependency: a suite that imports the lab's runtime 07 and runtime 01 and runs the same scenarios through both models. Six gates behave identically, under the same rejection names, including the Gap — which survived a change of substrate from agent-to-agent to one phone recomputing what the phone that just scanned it claimed. That is the strongest evidence the lab's central move is structural rather than incidental.\n\nOne gate could not follow. Runtime 07 requires both endpoints to be personhood-anchored, and the game has nothing to anchor to: avatar creation is not personhood-gated. Presented to the lab's own prover, a player is rejected.\n\nThat check now passes, which is to say the boundary is real and lives in a test rather than a caveat. **The Field Guide trust graph is a pseudonym graph, not a personhood graph.** Every privacy property survives it. No Sybil-resistance property does, and none is claimed. Naming it cost a sentence; discovering it later would have cost the argument.`,
      `## 8. The refusal, and the decline\n\nTwo positions worth recording because both contradict something already written down.\n\nA spec that has shipped lists a shared completed adventure as a source of trust edge. It should not be one. Co-completion is co-presence with a timestamp and there is no consent anywhere in it; admitting it makes that same document's own rule against auto-following strangers false by construction, with a quest placed between the strangers and the following. It should *prompt* a meet. See [[Shared Quest Is Not Consent]].\n\nAnd the game declined a property the lab has and is right to have. Runtime 07 models transitive reachability, because *does trust reach* is a genuine question about a graph. The overlay asks a different one — *who may see* — and answering the second with the first is how a trust score gets built by accident. Two hops is not half of link. It is nothing. See [[Audience Is Granted Not Computed]].`,
      `## 9. What went back\n\nThe reflection is not one-way, and a deployment that only takes is not evidence.\n\nUpstream, as exploration X11: the Gap surviving a substrate change; the delta bounded at four gates and asserted; *reachability is not visibility* as a cheap second answer to the list-inflation question, requiring no threshold; the rounding finding, which generalises to every numeric field in a canonical encoding, not just to a map; and a second instance of the lab's own conformance instrument, rebuilt by the same hand in an unrelated domain, earning its keep within the hour.\n\nAlongside it a draft position record — ratify six gates, refine two framings — filed as a draft, because positions go upstream under a name and not from an agent.`,
      `## 10. What is not done\n\nThe edge does not erode and there is no way to unmake one, so a meet from four years ago weighs what a meet from Tuesday weighs. The machinery exists; it is simply not applied to the edge yet.\n\nNothing has been sent to Max. Nothing has been pushed anywhere.\n\nAnd the honest limit on all of it: one deployment, one author, and that author wrote both sides. An independent consumer of runtime 07 would be worth more than the whole day's work, and remains the ask.`,
      `## Addendum, same evening\n\nA correction, left here rather than folded back into §7, because a chronicle that quietly edits itself is worth less than one that shows its turns.\n\nI read the credentials specification properly — the vendored copy, not my own coherence map of it — and it does not support the framing above. The spec defines **two** constructions, and the first needs no community at all: two entities who share no membership "can still exchange VRCs, and the resulting edges are valid trust attestations." Of that construction it says plainly that it "does not by itself confer any community-level assurance (e.g., personhood)."\n\nSo the game is not a deficient community-anchored deployment. It is a **conformant pairwise one**, and saying it fell short of a gate was my error. The sharper finding is the reverse: the lab's formation runtime gates *every* edge on personhood, which models only the community-anchored construction — it does not cover the pairwise case at all. The lab had no consumer standing outside a community, so nothing had ever exercised it.\n\nThe deployment found a hole in the lab. That is a better day's work than the one I wrote up. See [[OASIS And The Cred Spec]].`,
      `## Traces\n\nThe map that holds the correspondence — every row anchored to a property, checked in both directions so it cannot rot — is \`REFLECTION-MAP.md\`, and the pages it narrates are [[Field Guide Trust Overlay]], [[The Meet Rite]], [[The Pairwise Peer Reference]], [[Erosion Is A Rate Not A Cliff]] and [[The Rejection Register]].\n\n> The fastest way to disagree with any of this is a failing test.`,
    ],
  },
  {
    title: 'The Question Map',
    story: [
      `# The Question Map`,
      `Twenty questions across [[Hitchhikers Field Guide]]'s three documents. Each one now has an answer you can run, and the mapping between them is checked rather than asserted.`,
      `## Why check a map\n\nIt is easy to answer a question in prose and believe it is handled. It is harder to keep believing that when a suite tells you the row is empty.\n\nSo every row anchors to the properties that answer it, and a suite fails if a question has no property, if an anchor points at something that no longer runs, or if the inventory drifts from twenty. A new question appearing in their documents has to be added deliberately — it cannot be quietly not-answered.`,
      `## Where they came from\n\n* **seven** from the handoff's own ask — how edges are made, disclosure on discoveries, passport restore, id remap, the card, shared quests, where Knowledge lives\n* **four** open questions on the trust-weighted map — what counts as a witness, the default audience, recency, and sharedrops\n* **five** acceptance criteria for Phase 0, which were the most obviously runnable things in the pack and were five unticked boxes — see [[Phase 0 Acceptance]]\n* **four** open questions on discovery — the camera, partner claims on map data, the till redeem, and the photograph`,
      `## The answers that are refusals\n\nThree of the twenty are answered *no*, and those are the ones worth arguing with.\n\nA shared quest completion is not a trust edge — co-presence with a timestamp has no consent in it. A till redeem is not a trust edge either — a steward and a pilgrim are not symmetric, and one object for both would put every player's trail inside the venue's map in exchange for a cup of tea. And sharedrops should not reuse the social edge type: keeping equity off the map is a UI decision, and UI decisions get revisited by someone who was not in the room, whereas keeping the *kinds* separate is structural.`,
      `The map itself, with every question quoted in full, is in [[The Working Files]] as \`question-map.md\`.`,
    ],
  },

  {
    title: 'Phase 0 Acceptance',
    story: [
      `# Phase 0 Acceptance`,
      `The five acceptance criteria in [[Hitchhikers Field Guide]]'s trust-weighted map spec, turned from unticked boxes into a suite anyone can run.`,
      `## The five\n\n1. with the fixture on, the map near Islington shows floor pins **and** at least two overlay pins tagged Maya and Jon\n2. every overlay pin is within the spawn radius of the player\n3. a peek on an overlay pin shows the peer name at the \`link\` audience\n4. with the fixture off, behaviour equals today's floor-only map\n5. no fake trust score anywhere in the interface\n\nAll five run. The fixture — Maya, Jon, and their six pins near the Islington demo origin — is modelled as ordinary state rather than as a file.`,
      `## The one that is worth the whole exercise\n\nCriterion four. With the fixture off, the map is **byte-identical** to a floor-only map — asserted as an exact equivalence, not an impression.\n\nThat matters because it settles what the fixture *is*. Seeding two consented edges and six witnessed places produces exactly the state two real meets would have left behind. The fixture is not a special code path waiting to be torn out; it is ordinary state that arrived by an unusual door. It retires by simply not being seeded.`,
      `## Criterion five, made structural\n\n"No fake trust score UI" cannot be checked by looking at a screenshot, so it is checked by the shape of the data: a pin may carry only a known set of numeric fields. A \`trustScore\`, a \`reputation\` or a \`popularity\` cannot appear without failing the assertion — nobody has to notice it in review.\n\nIts companion is the anti-Yelp property in [[The Overlay Ranking]]: a hundred strangers piling onto a pub does not move that pin one place on your map.`,
      `## And it found something\n\nCriterion three says the peer name shows **when audience=link**, which means at \`public\` it must not — and the spec spells public out as title, kind and position only.\n\nThe disclosure layer was attaching peer attribution at every tier. So a public projection, the rung meant to say least, was quietly publishing *who* alongside *where*. Their own checklist caught it. A public pin is now anonymous: something was witnessed here, by nobody you are told about.\n\nWhich is the argument for writing acceptance criteria down in the first place, and then for running them.`,
    ],
  },

  {
    title: 'The Overlay Ranking',
    story: [
      `# The Overlay Ranking`,
      `[[Hitchhikers Field Guide]] specified the map's ranking terms in a table and left them unimplemented. A ranking rule that lives only in a table is a rule nobody can break a test on, so here it is mechanical.`,
      `## Metres, not points\n\nEvery term is expressed as an **effective distance** rather than a score. A curated pin with real narration is worth −350 m. A pin from someone you have met is worth −400 m. Your own trail is worth −600 m.\n\nThis is deliberate. A score invites a leaderboard; a distance in metres cannot become one, because every term has to answer *how many metres is this worth?* out loud. "Maya was here" is worth walking four hundred metres for — that is a sentence a designer can argue with, which "+0.3 trust weight" is not.`,
      `## The cut is on true distance\n\nNo band ever moves a pin into the viewport. The hard radius applies to real metres, before any bonus, so the Greenwich invariant holds no matter how beloved a place is. A peer pin can outrank a nearer floor pin — the band has to do something or it is decoration — but it is bounded: four hundred metres of goodwill does not beat seven hundred metres of walking.`,
      `## This is not Yelp\n\nThe spec says so in its first section, and the property makes it mechanical: **a pin's rank for you never depends on how many other people have witnessed it.**\n\nA hundred strangers pile onto the same pub, and the map you see does not change by a single position. There is no aggregate, no trending, no popularity term — not because it was left out of this version, but because there is a test that fails if one appears.\n\nSee [[Audience Is Granted Not Computed]] for the same instinct one layer up, and [[Phase 0 Acceptance]] for its companion check.`,
      `Memorial and plaque clutter is filtered out, the cap of twelve applies after ranking rather than before, and origin changes the marker ring — teal for yours, gold for a peer — and nothing else about the pin.`,
    ],
  },

  {
    title: 'The ARWorld Pack',
    story: [
      `# The ARWorld Pack`,
      `The three documents from the [[Hitchhikers Field Guide]] side, served from this wiki so both strands sit in one place. Unaltered, on a tailnet-only wiki, not the public internet.\n\nThey are Max's writing and the map side's work. They are here because reading a counter-spec without the spec it answers is close to useless, and because a team wiki where only half the team's documents are on the table is not really one.`,
      `## The three\n\n**The handoff** (2026-08-15) — the ask that started this. Field Guide as a client of the graphs; what was built between 13 and 15 August; the three graphs mapped onto the game; the Witness pipeline; the ONODE endpoints; seven open problems and an explicit list of things not to propose.\n\n**What discovery means in AR World** (2026-08-12) — the product definition, and the sharpest thing in the pack: presence, encounter, discovery, and the rule that peeking a card is an encounter rather than a discovery.\n\n**Trust-weighted POIs** (2026-08-12) — the spec and Phase A status. Holon shapes, the query rule, the API, the Unity score terms, the Phase 0 fixture, and the acceptance checklist that is now runnable.`,
      `## What the replies are\n\nAll twenty questions across those three documents are mapped, with a property answering each, in [[The Question Map]]. Their acceptance criteria run in [[Phase 0 Acceptance]] — one of which found a real bug in my disclosure layer. Their score-terms table is mechanical in [[The Overlay Ranking]].\n\nWhere I disagree with something they have already written down, it is on its own page rather than buried: [[Shared Quest Is Not Consent]].`,
      `## A note on putting them here\n\nI held these back at first, on the reasoning that another person's documents are theirs to circulate. Sound instinct, wrong room. These are our own working papers, and the audience is the team, on an encrypted tailnet we run ourselves.\n\nIf the map side would rather they lived somewhere else, they come out in one line and nothing in the lane depends on them. Everything is downloadable from [[The Working Files]].`,
    ],
  },

  {
    title: 'Proverbs Of The Trust Overlay',
    story: [
      `# Proverbs Of The Trust Overlay`,
      `Nine, compressed from the [[Field Guide Trust Overlay]] work window, 15–16 August 2026. Written to the privacymage proverb form — *Template — Proverb*, on the spellbook site next door, not yet flagged into this neighbourhood: short, held in tension, promise-shaped, and true to a stranger who never read a word of the canon.\n\nEach one is a thing the work refused to do, said in a breath. Where a proverb has a test that would fail if it were broken, the test is named — a proverb with a property under it is a promise with a witness.`,
      `**On publication** ⊥\n\n> I will show you where I stood.\n> I will not tell the world I stood anywhere.\n\n*The ladder answers who. It was never asked how many.* — [[A Wiki Fork Is Not An Audience]]`,
      `**On distance** ⊥\n\n> I will give you what we made together.\n> I will not price the distance between us.\n\n*The moment a step counts for something, everyone starts walking in circles.* — [[Audience Is Granted Not Computed]]`,
      `**On the gate** ⊥\n\n> A gate that names what it will pass, holds.\n> A gate that names what it will refuse, leaks.\n\n*Everything unnamed walks through the second one, and the test still says green.*`,
      `**On the proof** ⊥\n\n> I will not trust your proof because you handed it to me.\n> I will trust it because I made it again.\n\n*The proposer and the prover are held apart, or they are one hand.* — [[The Meet Rite]]`,
      `**On evidence** ⊥\n\n> Prose will promise anything.\n> Only a test will refuse.\n\n*A privacy claim you cannot run is a mood.*`,
      `**On agreement** ⊥\n\n> Two honest hands still part at the halfway point.\n> Name the rule, or the gap is yours.\n\n*One rounds up, one rounds to even, and the pin lands across the street.* — [[Rounding Is Not A Detail]]`,
      `**On the empty answer** ⊥\n\n> An empty answer is still a true one.\n> A borrowed answer is a debt.\n\n*A fixture that outlives its stand-in becomes a lie the product tells.* — [[Phase 0 Acceptance]]`,
      `**On erosion** ⊥\n\n> That I was there will not fade.\n> That you were there, will.\n\n*Your own trail is memory. A peer's old enthusiasm is only advice.* — [[Erosion Is A Rate Not A Cliff]]`,
      `**On the name** · triune\n\n> I will not swear I am the only one of me.\n> I will swear I am the same one to you.\n> And a different one to everyone else.\n\n*Refuse the claim you cannot keep. Give the one you can. Choose who receives it.* — [[The Pairwise Peer Reference]]`,
      `———\n\nThe window these came from: [[2026-08-16 The Checklist Answers Back]] · [[2026-08-15 The Predicate Walks To Islington]]`,
    ],
  },

  {
    title: '2026-08-16 The Checklist Answers Back',
    story: [
      `# 2026-08-16 · The Checklist Answers Back`,
      `> **Provenance.** A chronicle — the second of this arc, covering the window in which the work stopped being a reply on a laptop and became something a collaborator could open, download, run, and argue with. Voice: framework. Signed by the First Person: not yet.\n>\n> **Runtime traces:** eight suites, 124 properties, \`cd runtimes && node verify.mjs\` → ALL GREEN. Everything downloadable from [[The Working Files]].`,
      `*I spent a day answering our own open questions from the other side of the team. Then I made the map side's acceptance criteria executable, and the second one I ran found a leak in my answer.*`,
      `**Scope:** the counter-spec wired to the task force lab as a dependency rather than a resemblance; the credentials specification read properly and a framing of mine corrected; every question in the ARWorld pack mapped to a property that runs; and both strands of our own work put on the tailnet where the rest of the team can see them.`,
      `## 1. From describing to carrying\n\nThe pages in this space described the work. That is a weaker thing than it sounds — a reader who wants to disagree needs the work itself, and pointing at a path on my laptop is not an invitation.\n\nSo the wiki learned to carry its own evidence. Thirty-seven files under an assets lane it serves itself, each with a digest, a captured run report, and a bundle that untars and runs with nothing installed. The front page lists them. A stranger on the tailnet can now get from *there is a claim here* to *the claim failed on my machine* without asking me for anything.`,
      `## 2. The table became a dependency\n\nUntil this window, the relationship between this workbench and the ToIP lab was a correspondence table in a notes file. A table is prose. It cannot go stale loudly.\n\nSo it became a suite that imports the lab and runs the same scenarios through both models. Six gates behave identically, including the one that matters — the proposer proposes, the prover recomputes rather than trusts, and here that is one phone refusing to take another phone's word for a value it can derive itself. Same structure, different substrate, no adjustment.\n\nOne gate could not follow: the lab requires both ends to be personhood-anchored and a game avatar is not. I wrote that up as the game falling short.`,
      `## 3. Then I read the specification\n\nProperly, the vendored copy, rather than my own map of it. And it does not say what I had been saying.\n\nThe credentials spec defines two constructions, and the first needs no community at all: two entities who share no membership can still exchange relationship credentials, and the resulting edges are valid trust attestations. Of that construction it says plainly that it confers no community-level assurance.\n\nSo the game is not a deficient community-anchored deployment. It is a conformant pairwise one. The error was mine, and the sharper finding runs the other way: **the lab gates every edge on personhood, which models only the second construction and does not cover the first at all.** The lab had no consumer standing outside a community, so nothing had ever exercised the case.\n\nThe deployment found the hole. That is what deployments are for, and it is the second time in two days that building the thing corrected the person describing it.`,
      `## 4. Twenty questions, and a rule against answering in prose\n\nTheir three documents carry twenty questions between them. It is easy to answer a question in prose and believe it handled; it is harder to keep believing that when a suite tells you the row is empty.\n\nSo every question is anchored to the properties that answer it, and the map is checked: a question with no property fails, an anchor pointing at something deleted fails, and the inventory drifting from twenty fails. A new question in their documents has to be added deliberately. It cannot be quietly not-answered.\n\nThree of the twenty are answered *no*, and those are the ones worth arguing with — a shared quest is not consent, a till redeem is not a friendship, and equity must not ride on the social edge.`,
      `## 5. The checklist answers back\n\nTheir trust-weighted spec ends with five acceptance criteria for Phase 0. Five unticked boxes in a markdown file, and the most obviously runnable thing in the entire pack.\n\nThe third one says the peek shows the peer name **when the audience is link** — which means at public it must not, and their own spec spells public out as title, kind and position only.\n\nMy disclosure layer was attaching peer attribution at every tier. The rung meant to say least was quietly publishing *who* alongside *where*, in the one place a cautious player would have chosen precisely to avoid that.\n\nThe checklist caught it. Not my review, not my leak test, not the closed allow-list I had been rather pleased with — a box a colleague wrote into a document four days earlier and never ran. A public pin is anonymous now: something was witnessed here, by nobody you are told about.\n\nThe fourth criterion earned its keep differently. With the fixture off, the map is byte-identical to a floor-only map — which settles what the fixture *is*. Seeding two consented edges produces exactly what two real meets would leave behind. It is not a special path awaiting removal; it is ordinary state that arrived by an unusual door, and it retires by simply not being seeded.`,
      `## 6. Both strands on the tailnet\n\nI had held the map side's documents back, reasoning that another person's papers are theirs to circulate.\n\nSound instinct, wrong room. These are our own working papers and the audience is the team, on a tailnet we run ourselves — and a reply without the thing it replies to is half a conversation. So the pack is served here now, unaltered and digest-checked, in its own directory so it stays obvious which strand each thing came down. See [[The ARWorld Pack]].\n\nThe caution belongs to anything public-facing. It does not belong to the room the work is happening in.`,
      `## 7. What this window taught, in one line\n\nTwice in two days, the thing that corrected me was not review. It was a document from the other end of the work, made executable.\n\nFirst the specification, which said the deployment was conformant where I had called it deficient. Then the acceptance checklist, which found a leak the leak test missed. Neither was written to catch me. Both did, because they were written down precisely and then actually run.\n\nCompressed further: [[Proverbs Of The Trust Overlay]].`,
      `## 8. Not done\n\nThe edge still does not erode and there is no way to unmake one. Nothing has been sent to Max. Nothing has been committed or pushed anywhere.\n\nAnd the standing limit: one deployment, one author, and that author wrote both sides. An independent consumer of the lab's formation runtime would still be worth more than either day.`,
    ],
  },

];

// --- the assets index, generated from what is actually staged ---------------
// Built from wiki/assets-manifest.json (written by assets-sync.mjs) so this page
// cannot claim a file the lane does not carry. If the manifest is absent the
// page is simply not authored — better a missing page than a lying one.
const MANIFEST_PATH = new URL('./assets-manifest.json', import.meta.url).pathname;
if (existsSync(MANIFEST_PATH)) {
  const m = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const base = `/assets/${m.lane}`;
  const kb = (n) => (n < 1024 ? `${n} B` : `${(n / 1024).toFixed(1)} kB`);
  const docs = m.files.filter((f) => f.kind === 'doc');
  const src = m.files.filter((f) => f.kind === 'source');
  const link = (f) => `[${f.path.replace(/^docs\//, '')}](${base}/${f.path})`;

  PAGES.push({
    title: 'The Working Files',
    story: [
      `# The Working Files`,
      `The other pages in this space *describe* the work. This one carries it.\n\nEverything below is served by this wiki rather than linked off somebody's laptop — ${m.fileCount} files, ${kb(m.totalBytes)}, with a sha256 for each in [MANIFEST.json](${base}/MANIFEST.json) so you can tell whether what you downloaded is what was published.\n\nSuites at time of publishing: **${m.suitesGreen ? 'all green' : 'NOT green, see the report'}**.`,
      `## Read\n\n${docs.map((f) => `* ${link(f)} — ${f.note} · ${kb(f.bytes)}`).join('\n')}\n\nAlso [MANIFEST.md](${base}/MANIFEST.md) for the file table in human form, and [reports/verify.txt](${base}/reports/verify.txt) for the captured output of the suites.`,
      `## Run\n\nThe whole model is here and it needs nothing installed — Node and Python standard libraries only, offline.\n\n    curl -O ${base}/field-guide-lab.tar.gz\n    tar xzf field-guide-lab.tar.gz\n    cd runtimes && node verify.mjs\n\nOr read the ${src.length} source files one at a time, starting with [the rite](${base}/runtimes/meet-overlay/src/meet.mjs), [the disclosure layer](${base}/runtimes/meet-overlay/src/promise.mjs), and [the suite that holds this against the task force lab](${base}/runtimes/lab-bridge/test.mjs).`,
      `## The record travels too\n\nEvery page in this space is in the lane as plain markdown, under \`wiki/\` — including both chronicles and [[Proverbs Of The Trust Overlay]]. The suites say what was decided; the chronicles say why, and a bundle carrying one without the other is half an archive.`,
      `## Both strands are here\n\nUnder \`source/\` are the three ARWorld documents from the map side — the handoff and the two specs that prompted all of this — unaltered, so nobody has to read a reply without the thing it replies to. See [[The ARWorld Pack]]. Everything else in the lane came back down the graph strand.\n\nAbsent: anything needing a key, a token or a JWT. Nothing here talks to a live service, and this wiki is tailnet-only.`,
      `> If you disagree with any of it, the useful reply is a failing test. The suites are right there.`,
    ],
  });
}

// --- emit ------------------------------------------------------------------
mkdirSync(OUT, { recursive: true });

const written = [];
for (const p of PAGES) {
  const slug = slugify(p.title);
  const story = p.story.map((text, i) => ({ type: 'markdown', id: id(slug, i), text }));
  const page = {
    title: p.title,
    story,
    journal: [{ type: 'create', item: { title: p.title, story }, date: DATE }],
  };
  writeFileSync(`${OUT}${slug}`, JSON.stringify(page, null, 2) + '\n');
  written.push({ slug, title: p.title, story });
}

// Also write each page as plain markdown, so the narrative record travels with
// the evidence rather than living only inside a running wiki. The chronicles and
// the proverbs are the only account of *why* the code looks like this; a bundle
// that carries the model but not the reasoning is half an archive.
const EXPORTS = new URL('./exports/', import.meta.url).pathname;
mkdirSync(EXPORTS, { recursive: true });
for (const w of written) {
  const body = w.story.map((i) => i.text).join('\n\n');
  writeFileSync(`${EXPORTS}${w.slug}.md`, body.endsWith('\n') ? body : body + '\n');
}

console.log(`authored ${written.length} pages into wiki/pages/ (+ markdown into wiki/exports/)`);
for (const w of written) console.log(`  ${w.slug}`);

// --- install ---------------------------------------------------------------
if (process.argv.includes('--install')) {
  const dest = `${FARM}/${SITE}/pages/`;
  const sitemapPath = `${FARM}/${SITE}/status/sitemap.json`;
  if (!existsSync(dest)) {
    console.error(`\nfarm site not found: ${dest}`);
    process.exit(1);
  }
  for (const w of written) {
    writeFileSync(dest + w.slug, readFileSync(`${OUT}${w.slug}`));
  }

  // Merge into the sitemap, preserving anything already there (welcome-visitors).
  const existing = JSON.parse(readFileSync(sitemapPath, 'utf8'));
  const bySlug = new Map(existing.map((e) => [e.slug, e]));
  for (const w of written) {
    const links = {};
    for (const item of w.story) {
      for (const m of item.text.matchAll(/\[\[([^\]]+)\]\]/g)) links[slugify(m[1])] = item.id;
    }
    bySlug.set(w.slug, {
      slug: w.slug,
      title: w.title,
      date: DATE,
      synopsis: w.story[1] ? w.story[1].text.split('\n')[0].slice(0, 560) : w.story[0].text,
      links,
    });
  }
  writeFileSync(sitemapPath, JSON.stringify([...bySlug.values()], null, 2) + '\n');

  console.log(`\ninstalled into ${SITE}`);
  console.log(`sitemap now lists ${bySlug.size} pages`);
  console.log(`search index (status/site-index.json) is rebuilt by the farm — restart it to index these`);
}
