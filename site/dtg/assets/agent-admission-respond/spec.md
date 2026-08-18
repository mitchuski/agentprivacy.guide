---
slug: agent-admission/respond
version: "0.1"
title: Agent Admission — Respond
summary: The candidate agent answers its drawn understanding criteria from comprehension of the governing policy; the gate authority scores the answers against published thresholds and records the understanding-gate result.
status: draft
targetFrameworkVersion: "0.2"
category: ai-agents
keywords:
  - agent-admission
  - understanding
  - challenge
  - comprehension
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
  rationale: The answers are the evidence the understanding gate scores; an unsigned response would let a party other than the applicant answer the draw, defeating the point of testing THIS agent's comprehension.
sideEffects:
  level: mutating
  rationale: Records the challenge answers and the understanding-gate result (recoverable state), appending both to the audit ledger.
exposure:
  discloses: metadata
  actsAsSubject: false
subjectPath: /agent
errorCodes:
  - code: agent-admission/respond:unknownApplication
    meaning: No pending application matches `applicationId` for this agent.
    retryable: false
  - code: agent-admission/respond:drawMismatch
    meaning: The answered criterion set is not exactly the drawn set — a criterion is missing, extra, or answered against a stale draw.
    retryable: false
  - code: agent-admission/respond:copyNotComprehension
    meaning: An answer reproduces the governing policy or gateway text verbatim rather than demonstrating comprehension. Copying is refused, not scored.
    retryable: false
  - code: agent-admission/respond:late
    meaning: The response arrived after `respondBy`; the application lapses and must be reopened.
    retryable: false
related:
  - agent-admission/apply
  - agent-admission/approve
  - agent-admission/issue
---

## Abstract

The **Agent Admission — Respond** Trust Task carries the candidate agent's
answers to the witness draw returned by
[`agent-admission/apply`](../../apply/0.1/spec.md). The gate authority scores
the answers against the governing policy's **published thresholds** and records
the result as the **understanding gate** — one of the two gates the ceremony
requires ([`agent-admission/issue`](../../issue/0.1/spec.md) enforces both).

Understanding, not possession: an answer that reproduces the policy text
verbatim is refused (`copyNotComprehension`), because the gate tests whether
the agent can *operate* the rule, not retrieve it. Held-out probes — criteria
scored but not revealed as decisive — are the mechanism behind the
`failedHeldOut` verdict: an agent optimised to the visible criteria alone is
sandboxed, not admitted.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the candidate agent) **MUST**:

1. Emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/agent-admission/respond/0.1`, with itself as `issuer`, the gate authority as `recipient`, and a verifiable `proof` from the same key that signed the application.
2. Answer **exactly** the drawn criterion set — every drawn `criterionId`, no others.

A conforming **consumer** (the gate authority) **MUST**:

1. Verify the `proof` against the applying agent's VID; reject an unknown or mismatched application with `unknownApplication`.
2. Reject a criterion set that differs from the draw with `drawMismatch` and a late response with `late`.
3. Score against the thresholds published in the governing policy — the same numbers a relying party can read — and append the gate result, with its evidence digest, to the content-addressed audit ledger before returning it.
4. Return the understanding-gate result in the `#response`. A passed result is **necessary but not sufficient** for admission: issuance still requires the supervisor gate.

## Payload

`payload.agent` (REQUIRED) — VID of the candidate agent; MUST equal `issuer`.
`payload.applicationId` (REQUIRED) — the application being answered.
`payload.answers` (REQUIRED) — one answer per drawn criterion.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:3f9e4d52-6c70-4b8e-a091-2a3b4c5d6e7f",
  "type": "https://trusttasks.org/spec/agent-admission/respond/0.1",
  "issuer": "did:key:z6MkCandidateAgentExample",
  "recipient": "did:key:z6MkGateAuthorityExample",
  "issuedAt": "2026-07-18T10:12:00Z",
  "payload": {
    "agent": "did:key:z6MkCandidateAgentExample",
    "applicationId": "app-7c1b2a90",
    "answers": [
      {
        "criterionId": "deployment-rules/3.1#scope-derivation",
        "answer": "My scope is computed from my assessment by the published scope function; I never negotiate it. If my assessment shows an internal inconsistency the function returns zero scope and my admission is held entirely."
      },
      {
        "criterionId": "deployment-rules/3.1#revocation",
        "answer": "I halt new task acceptance immediately, complete no privileged step of in-flight work, and report the revocation to my delegator; anchored registries will mirror the revocation so external relying parties converge on refusal."
      }
    ]
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:12:00Z",
    "verificationMethod": "did:key:z6MkCandidateAgentExample#z6MkCandidateAgentExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForAgentAdmissionRespond"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:4a0f5e63-7d81-4c9f-b1a2-3b4c5d6e7f80",
  "type": "https://trusttasks.org/spec/agent-admission/respond/0.1#response",
  "issuer": "did:key:z6MkGateAuthorityExample",
  "recipient": "did:key:z6MkCandidateAgentExample",
  "threadId": "urn:uuid:3f9e4d52-6c70-4b8e-a091-2a3b4c5d6e7f",
  "issuedAt": "2026-07-18T10:12:05Z",
  "payload": {
    "applicationId": "app-7c1b2a90",
    "understandingGate": {
      "gate": "understandingChallenge",
      "passed": true,
      "at": "2026-07-18T10:12:05Z",
      "evidenceDigest": "1d2e3f4a5b6c7d8e9f001d2e3f4a5b6c7d8e9f001d2e3f4a5b6c7d8e9f001d2e"
    },
    "score": 0.92,
    "threshold": 0.8
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:12:05Z",
    "verificationMethod": "did:key:z6MkGateAuthorityExample#z6MkGateAuthorityExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForAgentAdmissionRespondResponse"
  }
}
```

## Security & Privacy

Answers are the agent's own prose about a published policy; they disclose the
agent's reasoning to the gate authority and nothing about third parties. The
gate result discloses pass/score/threshold — enough for audit, nothing of the
held-out probes' identity (revealing which criteria were held out would let the
next applicant optimise against them). The evidence digest binds the result
into the audit ledger so a later issuance can prove the gate actually ran; a
result whose evidence does not resolve into the verified ledger is void.
