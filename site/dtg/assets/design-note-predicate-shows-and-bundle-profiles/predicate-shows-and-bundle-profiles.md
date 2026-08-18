# Predicate shows and bundle profiles — composing zero-knowledge presentations inside Trust Tasks

*A design note from the DTG ZKP Task Force side of the table. It addresses the seam the
ZKP TF's decision baseline names but assigns jointly: "Trust tasks compose predicates and
determine request semantics. The transcript, purpose, scope, and multi-proof composition
model require joint definition. Bundled proofs that are individually sound may leak
jointly." This note proposes the joint model: the show as one atomic transcript, a
show-level disclosure record, and governed bundle profiles in place of à-la-carte
predicate requests.*

**Status:** design note, not a specification. Nothing here is normative. It is written to
be discussed in the Decentralized Trust Graph Working Group, alongside the Trust Tasks
framework (SPEC.md 0.2, working draft) whose conventions it deliberately reuses.

**Author:** Mitch (co-chair, DTG ZKP Task Force).

---

## 1. The problem

A growing class of Trust Tasks will not carry data; they will carry *requests for proof*.
A verifier asks a holder to demonstrate a set of predicates — credential validity from an
accepted issuer set, holder liveness, per-context uniqueness, freshness within a window —
and the holder answers with zero-knowledge presentations rather than disclosed attributes.

A real task never requests one predicate. It requests several at once — call the composed
presentation a **show**. And composition is where individually sound proofs go wrong:

1. **Intersection narrowing.** Each predicate's derived disclosure (assurance class,
   policy version, issuer-set choice, epoch, proof shape) is a population filter; the show
   intersects the filters. Fields that are non-identifying separately can be identifying
   together — the standard schema-field rule, applied unchanged to composed predicates.
2. **Request-pattern leakage.** The predicate set requested is itself an observable event.
   A rare combination — an unusual delegation predicate, a narrow range proof — fingerprints
   the vertical, the verifier's risk posture, and hence the holder's activity, before any
   proof is transmitted.
3. **Cross-show correlation.** Two shows in different contexts sharing *no* identifiers
   still present a correlatable pair (bundle shape, proof sizes, timing, retry pattern) to
   a network observer or colluding verifiers. Context separation can be defeated by bundle
   shape alone.

The consequence: **a show's disclosure boundary is a property of the predicate set, and it
is strictly wider than the union of the per-predicate boundaries.** Any consent surface,
policy engine, or audit trail that reasons per-predicate is reasoning about the wrong unit.

## 2. The show is one transcript

The remedy begins by naming the unit. A show binds ONE canonical transcript:

- **Atomicity.** A show verifies as a whole or fails as a whole. No partial acceptance —
  a verifier MUST NOT accept three of four member proofs and act on the subset.
- **No transplanting.** A member proof MUST NOT verify inside any transcript other than
  the one it was produced for. Replay of a member across transcripts is a named rejection,
  not a soft failure.
- **The request is part of the transcript.** The requested predicate set is a required
  transcript field, so the show — not the predicate — is the unit of freshness, binding,
  and audit.

In Trust Tasks terms this maps cleanly: the show is one task exchange, correlated by
`threadId`; the proof-request payload enumerates the bundle; the response carries the
composed presentation; `trust-task-error` carries the named rejections (candidate codes:
partial acceptance, member transplant, bundle-not-registered).

## 3. The show-level disclosure record

Per-predicate boundary analyses exist on the ZKP side (each predicate in the task force's
register carries one). A composed show additionally needs a **joint disclosure record**,
stated in three-parameter form:

- **against whom** — the observer classes that can see the show (verifier, colluding
  verifiers, network observer, registry operator), per bundle;
- **for how long** — the longest-lived member linkage dominates (a per-context uniqueness
  predicate's epoch outlives a freshness nonce);
- **alongside what** — the other members, explicitly enumerated, because they narrow the
  anonymity set jointly.

This is descriptive, not prescriptive — the same doctrine this registry already applies to
`sideEffects` and `exposure`: the record states what a show discloses; whether that is
acceptable is the consumer's policy, derived locally, never delegated to the registry.

## 4. Governed bundle profiles

The constructive remedy for mechanisms 2 and 3 is to remove the à-la-carte request layer.
Instead of verifiers composing predicate sets freely, a governed registry names **bundle
profiles**: named, versioned predicate bundles — a baseline profile (validity + liveness +
holder binding + freshness), a uniqueness-extended profile (baseline ∪ per-context
uniqueness), delegation variants — exactly as cipher suites replaced à-la-carte algorithm
negotiation in TLS.

Properties this buys:

- **Large anonymity sets per request shape.** A small governed vocabulary means every
  request looks like one of a few well-populated shapes, not a fingerprint.
- **A rejection surface.** A request outside the registry is a named rejection. The
  consent surface can render "this verifier requests the standard baseline bundle" instead
  of a bespoke predicate list no human can evaluate.
- **Change control where it belongs.** Adding a bundle is a deliberate registry PR with
  review, not a typo in one verifier's config — the same closed-enum instinct that made
  this registry's category taxonomy a schema rather than a convention.

Mechanically, a bundle-profile registry fits the conventions already present here: shared
schemas pinned by version, MAJOR.MINOR lifecycle, descriptive metadata, codegen into the
client libraries. Whether it lives as a Trust Tasks shared schema, a ZKP TF deliverable, or
a jointly governed object is an open question (§6) — the registries interlock either way,
since a context or task descriptor may need to name its admissible bundles.

## 5. The credential/artifact wall — a framework consideration

One rule from the ZKP TF baseline deserves framework-level visibility because it bounds
what any proof-carrying task may claim:

> A valid show does not establish that any task was performed, completed, or performed
> well.

A show may *include* a ceremony-bound credential (one whose issuance context is bound into
it), but the show's established statement never crosses into task completion. Completion
evidence is the Trust Task side's object: the outcome artifact, `threadId`-correlated with
the exchange that produced it. Stated as a wall: **credentials prove standing; artifacts
prove outcomes; a show is never a receipt.**

The framework already classifies tasks along two descriptive axes (`sideEffects`,
`exposure`). This note suggests the working group consider whether a third descriptive
axis is warranted — call it *evidence class*: what a successful `#response` may be relied
on to establish, and for how long. Like the existing axes it would be descriptive, with
consumers deriving the authoritative answer from their own verification, but it would give
consent surfaces and auditors a vocabulary for the difference between "this proved a
predicate held at presentation time" and "this is a durable receipt of completed work."

## 6. Fit with the existing registry surface

- `policy/evaluate` returns `requireConsent`; the delegated-execution design note binds
  *what executes* to *what was approved*. This note binds *what is proven* to *one
  transcript* and governs *what may be requested*. Same instinct — closed vocabularies
  against composition — on either side of the request/proof boundary.
- `registry/authorization` already carries TRQP authorization queries; a bundle-profile
  lookup is a structurally similar governed read.
- A future `proof-request` / `proof-response` task family would reference bundle profiles
  by identifier in its payload, keeping payload schemas closed while the bundle vocabulary
  evolves under its own change control.

## 7. Status and provenance

The composition model is not paper-only. A reference model in the ZKP Task Force's lab
binds shows to single transcripts and enforces the named rejections — atomicity (partial
acceptance rejected), member transplant across transcripts rejected, bundle-outside-
registry rejected, credential-as-completion-evidence rejected — as passing property tests
(10/10), alongside a v0 bundle registry with five named profiles. The joint-disclosure
worksheet for a representative four-predicate show is in progress on the ZKP TF side.

This note is the ZKP TF half of a deliverable both groups' documents already assign
jointly. The Trust Tasks side owns request semantics and outcome artifacts; the ZKP side
owns transcript binding and the disclosure calculus; the bundle-profile registry is the
shared object.

## 8. Open questions

1. **Registry authority.** Context authority, Trust Task TF, or a shared body? The
   registries interlock — a context descriptor may need to name its admissible bundles.
2. **Uniformity vs honesty.** Padding proof sizes and coarsening timing shrinks bundle
   fingerprints but costs constrained provers (mobile wallets). Where is the floor?
3. **Recursive composition.** If proof folding collapses an n-predicate show into one
   proof, bundle shape collapses to one size. Does that solve fingerprinting or move it
   into proving-time side channels?
4. **Linkage budgets.** Should a profile state how many shows per context per epoch it
   tolerates before intersection narrowing defeats its anonymity-set claim?
5. **Evidence class.** Does the framework want the third descriptive axis of §5, or is
   the wall better held per-spec in Security & Privacy prose?
