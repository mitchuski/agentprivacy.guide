# Agent admission as a Trust Task family — a two-gate ceremony for Know-Your-Agent

*A design note proposing a candidate `agent-admission/*` task family: the ceremony by which
an autonomous agent is admitted past a supervised gate — proving understanding rather than
key possession — and receives a bilateral relationship credential whose scope is measured,
auditable, and revocable. It is written from a running prototype (a regulator-facing
Know-Your-Agent system) and generalises the parts that proved out.*

**Status:** design note, not a specification. No slugs are claimed; the family sketch in §5
is illustrative, checked only for non-collision against the registry as of 2026-07-18.

**Author:** Mitch (co-chair, DTG ZKP Task Force).

---

## 1. The problem

Delegation is arriving before admission. This registry already has strong machinery for
what a trusted agent may *do* (the delegated-execution design note; `task-consent/*`;
`policy/*`) and for what an agent *is* (`vta/*`). What is missing is the step before both:
how an agent *becomes* admitted — how a supervising party establishes, with evidence a
third party can audit, that an agent understands the rules it will operate under, and
grants it a scoped, revocable standing.

Key possession is the wrong test. Any agent can hold a key; the question a supervisor —
or a regulator — actually asks is whether the agent *comprehends the policy it is bound
by*, and whether a human accountable for it has said yes. Those are two different gates,
and the prototype's experience is that collapsing them into one is the most common way an
admission scheme loses its meaning.

## 2. The two-gate rule

**No credential issues without both gates:**

1. **A human approval action** — a supervisor, accountable for the admission, explicitly
   approves this agent. Human-in-the-loop, recorded as a signed event.
2. **A passed understanding challenge** — the agent demonstrates comprehension of the
   governing policy against criteria it could not have prepared for (§3), scored against
   published thresholds.

Either gate alone is refused — an approval without demonstrated understanding is patronage;
demonstrated understanding without an accountable approver is unsupervised admission. The
prototype states this rule twice in its own contract because it is the invariant everything
else hangs from.

The outcome credential is a **bilateral relationship credential**: a W3C Verifiable
Credential signed by *both* parties — the supervising authority and the agent — expressing
a relationship, not a property. In ToIP terms the ceremony is a Trust Spanning Protocol
relationship formation between two VIDs; exactly two proofs, two roles, two distinct
parties (a self-signed credential is a named rejection, not a degenerate case).

## 3. Mechanisms that proved out

Three mechanisms from the running prototype generalise beyond it:

- **Deterministic witness draw (anti-grooming).** The understanding-challenge criteria are
  sampled deterministically from the hash of the agent's own canonicalised submission
  (recursive key-sort, no whitespace; the canonical bytes are persisted so an auditor can
  re-derive the draw). The agent cannot know which criteria will be probed while it writes
  its submission. The draw itself is an auditable artifact.
- **The canary.** The gate infrastructure MUST include a reference agent that passes every
  gate by construction. If the canary ever fails, the gate is broken, not the candidate.
  Without one, a supervisor cannot distinguish a bad agent from an impossible gate.
- **Closed verdict lexicon.** Exactly three admission verdicts, mapping to deployment
  outcomes: **validated** → deploy within granted scope; **failed-held-out** (passed the
  visible criteria, failed the held-out probe) → sandbox; **blocked** (violated a hard
  constraint) → hold, no credential at all. An invented fourth verdict is a rejection.
  The same closed-vocabulary instinct as this registry's category enum and the bundle
  profiles of the companion note.

Two supporting disciplines: every state transition emits a **content-addressed audit
event**, hash-chained to its predecessor, and the credential ceremony refuses to run at
all if the chain does not verify. And **scope is derived, not negotiated**: the granted
deployment scope is a function of the measured assessment (broad scope for strong,
well-separated assessments; sandbox for weak ones; a detected inconsistency in the
assessment holds admission entirely). The scope function itself is published policy, so
the same numbers that gate deployment print the rule a regulator reads.

## 4. Evidence, never authority — external anchoring

An admitted agent may want its standing discoverable outside the bilateral relationship —
for example on the ERC-8004 ("Trustless Agents") identity/reputation/validation
registries. The prototype's rule generalises: **the chain entry is evidence, never
authority.** The verdict comes from the ceremony; the anchor only makes the outcome
discoverable. Only digests and the granted tier are anchored — no challenge content
leaves the gate. Revocation mirrors: a revoked credential posts a revocation mark to the
same registry so on-chain and off-chain relying parties converge.

In framework terms this is an `ext` concern (a vendor-namespaced anchor reference in the
credential-issuance response), not a payload member — relying parties that don't speak
the anchor ignore it. Downstream systems MAY compose the two as a predicate — e.g.
admission to a privileged pool requiring (validated credential) ∧ (anchored validation
entry) — but that composition lives with the relying party, never in the ceremony.

## 5. Sketch of the family

Illustrative shape, following house conventions (closed payload schemas, `#response`
anchors, namespaced error codes, descriptive `sideEffects`/`exposure`):

| Candidate slug | Parties (issuer → recipient) | sideEffects | Notes |
|---|---|---|---|
| `agent-admission/apply` | agent → gate authority | mutating | Canonicalised submission; response carries the derived witness draw |
| `agent-admission/challenge` | gate authority → agent | none | The drawn understanding criteria |
| `agent-admission/respond` | agent → gate authority | mutating | Challenge answers; scored against published thresholds |
| `agent-admission/approve` | supervisor → gate authority | mutating | The human gate; signed approval, `excludeRequester`-style separation from the agent |
| `agent-admission/issue` | gate authority → agent | mutating | Bilateral credential issuance — response counter-signed by the agent completes it |
| `agent-admission/revoke` | supervisor → gate authority | destructive | Revokes standing; triggers anchor mirroring where anchored |
| `agent-admission/status` | any relying party → gate authority | none | Verdict + tier + revocation status; `discloses: metadata` |

Candidate error codes carry the ceremony's named rejections: `missing-supervisor-gate`,
`missing-understanding-gate`, `not-bilateral`, `evidence-not-in-ledger`,
`ledger-does-not-verify`, `unknown-verdict`, `tier-scope-mismatch`.

Category fit is a genuine question: `ai-agents` reads most naturally; the `consent`
category's own definition ("authorization-to-proceed tasks that gate whether an
interaction may reach a protected party") fits the approve leg; and the currently empty
`reputation` category fits the status/anchoring legs. One family, one category — proposed
`ai-agents`, with `related:` links doing the cross-referencing.

## 6. Relation to existing surface

- **Delegated execution** binds what an *already-trusted* agent does to what a human
  approved. Agent admission is the step before: it establishes the agent's standing and
  scope in the first place. The two compose: an admission tier is a natural input to the
  policy that `policy/evaluate` runs when delegation is later requested.
- **`vta/*`** describes agent capabilities; admission describes agent *standing*. No
  overlap is proposed inside the `vta` namespace.
- **The companion note** (predicate shows and bundle profiles): the understanding
  challenge and its verdict never cross the credential/artifact wall — the bilateral
  credential proves standing; the audit chain and its events are the completion evidence,
  thread-correlated; and where an admission is later *presented* (e.g. proving "validated,
  tier ≥ n" without disclosing the assessment), it becomes a predicate in a show, subject
  to the composition rules there.

## 7. Status and provenance

The prototype runs end-to-end: an autonomous agent approaches the gate unattended, is
challenged, proves understanding, receives a bilateral credential, and the supervisor
dashboard renders and revokes it — with the two-gate rule, witness draw, canary, closed
lexicon, audit chaining, and derived scope all enforced and covered by a reference auditor
suite (14/14 properties on the ceremony alone; ~150 checks green across the system) plus
minimised third-party attestation bundles (counts coarsened to thresholds, timestamps to
windows) with a stated reconstruction bound. It is a hackathon-grade prototype, not a
production system; the family sketch above is what its running shape suggests the
interoperable core actually is.

## 8. Open questions

1. **Who is the gate authority?** In the prototype, supervisor and gate authority are one
   party. Splitting them (a supervisor approving against an independent assessor's
   challenge) changes the party table but not the two-gate rule — worth deciding before
   any spec draft.
2. **Challenge portability.** Understanding challenges are policy-specific by design. Is
   the interoperable unit the challenge format (portable) or only the ceremony shape
   (challenge content stays authority-local)? The prototype suggests the latter.
3. **Tier vocabulary.** Scope tiers are derived from a published function in the
   prototype; an interoperable family needs either a shared tier vocabulary or an opaque
   tier + resolvable scope-function reference.
4. **Anchor neutrality.** ERC-8004 is one anchor; the evidence-never-authority rule
   should hold for any. Is a shared `ext` schema for admission anchors worth registering?
