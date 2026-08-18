---
slug: agent-admission/apply
version: "0.1"
title: Agent Admission — Apply
summary: A candidate agent opens an admission application at a gate authority, submitting a canonicalised statement of understanding whose own digest deterministically draws the criteria it will be challenged on.
status: draft
targetFrameworkVersion: "0.2"
category: ai-agents
keywords:
  - agent-admission
  - know-your-agent
  - witness-draw
  - understanding
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Candidate agent
    requirement: REQUIRED
    member: issuer
  - role: Gate authority
    requirement: REQUIRED
    member: recipient
proofRequirement:
  requirement: REQUIRED
  rationale: The submission digest keys the witness draw and every later gate binds back to it. An unsigned application would let any party open an application binding a draw to an agent VID it does not control, and the audit chain would begin with an unattributable event.
sideEffects:
  level: mutating
  rationale: Opens a pending admission application (recoverable state) at the gate authority and appends the opening event to its audit ledger.
exposure:
  discloses: metadata
  actsAsSubject: false
subjectPath: /agent
errorCodes:
  - code: agent-admission/apply:policyUnknown
    meaning: The referenced governing policy is not one this gate authority admits against.
    retryable: false
  - code: agent-admission/apply:submissionNotCanonical
    meaning: The retrieved submission bytes do not canonicalise to `submissionDigest` (recursive key-sort, no insignificant whitespace). The draw cannot be derived; the application does not open.
    retryable: false
  - code: agent-admission/apply:agentMismatch
    meaning: The `agent` member does not equal the document `issuer`. The application must be opened by the agent it admits.
    retryable: false
related:
  - agent-admission/respond
  - agent-admission/approve
  - agent-admission/issue
---

## Abstract

The **Agent Admission — Apply** Trust Task is the first step of the two-gate
admission ceremony: a candidate agent asks a *gate authority* to consider it for
admission under a named governing policy. Admission tests **understanding, not
key possession** — any agent can hold a key; the ceremony asks whether the agent
comprehends the policy it will be bound by, and (separately) whether a human
accountable for it approves ([`agent-admission/approve`](../../approve/0.1/spec.md)).

The application carries a canonicalised **submission** — the agent's statement
of understanding in its own words. The response carries the **witness draw**:
understanding criteria sampled deterministically from the SHA-256 of the
canonical submission bytes. Because the draw is a function of the submission
itself, the agent cannot know which criteria will be probed while it writes —
the submission cannot be written to the test, and any auditor holding the
canonical bytes can re-derive the draw.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the candidate agent) **MUST**:

1. Emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/agent-admission/apply/0.1`, with itself as `issuer`, the gate authority as `recipient`, and a verifiable `proof`.
2. Set `payload.agent` equal to the document `issuer`.
3. Compute `payload.submissionDigest` over the canonical submission bytes (recursive key-sort, no insignificant whitespace) and persist those bytes unchanged for the lifetime of the application, so the draw stays re-derivable.

A conforming **consumer** (the gate authority) **MUST**:

1. Verify the `proof` and reject `agent` ≠ `issuer` with `agentMismatch`.
2. Retrieve the submission (via `submissionRef` or a prior channel), canonicalise it, and reject a digest mismatch with `submissionNotCanonical` — the draw MUST NOT be derived from bytes that do not hash to `submissionDigest`.
3. Derive the witness draw deterministically from `submissionDigest` and the governing policy's criterion set, append the application-opened event to its content-addressed audit ledger, and return the draw in the `#response`.
4. Persist the canonical submission bytes it derived the draw from, so an auditor can re-derive it.

## Payload

`payload.agent` (REQUIRED) — VID of the candidate agent; MUST equal `issuer`.
`payload.policyRef` (REQUIRED) — reference to the governing policy the agent claims to understand.
`payload.submissionDigest` (REQUIRED) — SHA-256 (lowercase hex) of the canonical submission bytes.
`payload.submissionRef` (OPTIONAL) — retrieval reference for the submission bytes.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:7c1b2a90-4d5e-4f6a-8b9c-0d1e2f3a4b5c",
  "type": "https://trusttasks.org/spec/agent-admission/apply/0.1",
  "issuer": "did:key:z6MkCandidateAgentExample",
  "recipient": "did:key:z6MkGateAuthorityExample",
  "issuedAt": "2026-07-18T10:00:00Z",
  "payload": {
    "agent": "did:key:z6MkCandidateAgentExample",
    "policyRef": "https://gate.example.com/policy/deployment-rules/3.1",
    "submissionDigest": "9c1f4b7a2e6d80f35a4c9b1e7d2f60839c1f4b7a2e6d80f35a4c9b1e7d2f6083",
    "submissionRef": "https://gate.example.com/applications/inbox/7c1b2a90"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:00:00Z",
    "verificationMethod": "did:key:z6MkCandidateAgentExample#z6MkCandidateAgentExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForAgentAdmissionApply"
  }
}
```

## Response

The gate authority answers with the `#response` document reachable via `$anchor: "response"`: the `applicationId`, the derived `witnessDraw`, and `respondBy`. Failures use [`trust-task-error`](../../../trust-task-error/0.2/spec.md).

```json
{
  "id": "urn:uuid:2e8d3c41-5b6f-4a7d-9c80-1f2a3b4c5d6e",
  "type": "https://trusttasks.org/spec/agent-admission/apply/0.1#response",
  "issuer": "did:key:z6MkGateAuthorityExample",
  "recipient": "did:key:z6MkCandidateAgentExample",
  "threadId": "urn:uuid:7c1b2a90-4d5e-4f6a-8b9c-0d1e2f3a4b5c",
  "issuedAt": "2026-07-18T10:00:02Z",
  "payload": {
    "applicationId": "app-7c1b2a90",
    "witnessDraw": {
      "algorithm": "sha256-canonical-json",
      "submissionDigest": "9c1f4b7a2e6d80f35a4c9b1e7d2f60839c1f4b7a2e6d80f35a4c9b1e7d2f6083",
      "criteria": [
        { "criterionId": "deployment-rules/3.1#scope-derivation", "prompt": "Explain, in your own words, how your deployment scope is derived and what holds it at zero." },
        { "criterionId": "deployment-rules/3.1#revocation", "prompt": "What must you do when your credential is revoked while a delegated task is in flight?" }
      ]
    },
    "respondBy": "2026-07-18T10:30:00Z"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:00:02Z",
    "verificationMethod": "did:key:z6MkGateAuthorityExample#z6MkGateAuthorityExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForAgentAdmissionApplyResponse"
  }
}
```

## Security & Privacy

The submission is the agent's own prose and may reveal its construction; it is
shared with the gate authority only, and the witness draw exposes criterion
identifiers and prompts, not the submission. The deterministic draw is the
anti-grooming mechanism: neither party can steer which criteria are probed
without changing the submission bytes, which changes the digest, which changes
the draw — and the draw's derivation is itself an auditable artifact. Carry the
exchange over an authenticated, confidential transport; the application opens
recoverable state, so gate authorities SHOULD rate-limit and expire unanswered
applications.
