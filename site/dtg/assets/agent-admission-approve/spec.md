---
slug: agent-admission/approve
version: "0.1"
title: Agent Admission — Approve
summary: A supervisor, accountable for the admission, records the human gate — a signed approval or denial of one pending agent application, distinct from and never substitutable for the understanding gate.
status: draft
targetFrameworkVersion: "0.2"
category: ai-agents
keywords:
  - agent-admission
  - human-in-the-loop
  - supervisor
  - approval
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Supervisor
    requirement: REQUIRED
    member: issuer
  - role: Gate authority
    requirement: REQUIRED
    member: recipient
  - role: Candidate agent
    requirement: REQUIRED
proofRequirement:
  requirement: REQUIRED
  rationale: The supervisor gate exists to make a named human accountable for the admission; an unsigned approval is an approval no one is accountable for, which is the failure mode this gate closes.
sideEffects:
  level: mutating
  rationale: Records the supervisor's decision (recoverable state) and appends the supervisor-gate event to the audit ledger.
exposure:
  discloses: metadata
  actsAsSubject: false
subjectPath: /agent
errorCodes:
  - code: agent-admission/approve:unknownApplication
    meaning: No pending application matches `applicationId`.
    retryable: false
  - code: agent-admission/approve:supervisorIsAgent
    meaning: The approving VID is the candidate agent (or a VID the gate authority resolves to the same controller). Self-approval never satisfies the supervisor gate.
    retryable: false
  - code: agent-admission/approve:alreadyDecided
    meaning: A supervisor decision is already recorded for this application.
    retryable: false
related:
  - agent-admission/apply
  - agent-admission/respond
  - agent-admission/issue
  - task-consent/decision
---

## Abstract

The **Agent Admission — Approve** Trust Task records the **human gate** of the
two-gate admission ceremony: a supervisor, accountable for this agent operating
in this scope, signs an approval or denial of one pending application.

The two gates are deliberately different in kind. The understanding gate
([`agent-admission/respond`](../../respond/0.1/spec.md)) tests the *agent*; the
supervisor gate binds a *human*. Either alone is refused at issuance
([`agent-admission/issue`](../../issue/0.1/spec.md)): an approval without
demonstrated understanding is patronage; demonstrated understanding without an
accountable approver is unsupervised admission. Two results of the same kind
never satisfy the rule.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the supervisor) **MUST**:

1. Emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/agent-admission/approve/0.1`, with itself as `issuer`, the gate authority as `recipient`, and a verifiable `proof`.
2. Decide against the recorded application — the gate authority's rendering of the submission, the draw, and the understanding-gate result — not against material supplied out-of-band by the candidate.

A conforming **consumer** (the gate authority) **MUST**:

1. Verify the `proof` and that the `issuer` is a supervisor it recognises for this policy; an unverifiable or unrecognised approval is `permissionDenied`, and the gate authority **MUST NOT** record it.
2. Reject with `supervisorIsAgent` when the approving VID is, or resolves to the same controller as, the candidate agent. The separation of parties is the gate.
3. Record exactly one decision per application (`alreadyDecided` thereafter), append the supervisor-gate event to the content-addressed audit ledger, and return the gate result in the `#response`.
4. Treat a `deny` decision as terminal for the application: issuance MUST NOT proceed, whatever the understanding gate scored.

## Payload

`payload.applicationId` (REQUIRED) — the application being decided.
`payload.agent` (REQUIRED) — VID of the candidate agent the decision covers.
`payload.decision` (REQUIRED) — `approve` or `deny`.
`payload.note` (OPTIONAL) — the supervisor's free-text rationale, recorded to the ledger.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:5b1a6f74-8e92-4da0-c2b3-4c5d6e7f8091",
  "type": "https://trusttasks.org/spec/agent-admission/approve/0.1",
  "issuer": "did:key:z6MkSupervisorExample",
  "recipient": "did:key:z6MkGateAuthorityExample",
  "issuedAt": "2026-07-18T10:20:00Z",
  "payload": {
    "applicationId": "app-7c1b2a90",
    "agent": "did:key:z6MkCandidateAgentExample",
    "decision": "approve",
    "note": "Reviewed the submission and the scored answers; scope derivation is correctly understood."
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:20:00Z",
    "verificationMethod": "did:key:z6MkSupervisorExample#z6MkSupervisorExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForAgentAdmissionApprove"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:6c2b7085-9fa3-4eb1-d3c4-5d6e7f809102",
  "type": "https://trusttasks.org/spec/agent-admission/approve/0.1#response",
  "issuer": "did:key:z6MkGateAuthorityExample",
  "recipient": "did:key:z6MkSupervisorExample",
  "threadId": "urn:uuid:5b1a6f74-8e92-4da0-c2b3-4c5d6e7f8091",
  "issuedAt": "2026-07-18T10:20:02Z",
  "payload": {
    "applicationId": "app-7c1b2a90",
    "supervisorGate": {
      "gate": "supervisorApproval",
      "passed": true,
      "at": "2026-07-18T10:20:02Z",
      "evidenceDigest": "2e3f4a5b6c7d8e9f102e3f4a5b6c7d8e9f102e3f4a5b6c7d8e9f102e3f4a5b6c"
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:20:02Z",
    "verificationMethod": "did:key:z6MkGateAuthorityExample#z6MkGateAuthorityExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForAgentAdmissionApproveResponse"
  }
}
```

## Security & Privacy

The decision discloses the supervisor's identity to the gate authority and, via
the ledger, to auditors — that disclosure is the point: accountability requires
attributability. The `note` is free text written by the supervisor and recorded
durably; supervisors SHOULD NOT place third-party personal data in it. The
`supervisorIsAgent` check depends on the gate authority's controller-resolution
being at least as strong as its VID acceptance policy; where controllers cannot
be resolved, the gate authority SHOULD require the supervisor set and the agent
population to be disjoint by construction.
