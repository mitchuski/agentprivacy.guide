---
slug: agent-admission/revoke
version: "0.1"
title: Agent Admission — Revoke
summary: A supervisor revokes an admitted agent's relationship credential; the gate authority records the revocation, and mirrors a revocation mark to every external registry the outcome was anchored on, so on-chain and off-chain relying parties converge on refusal.
status: draft
targetFrameworkVersion: "0.2"
category: ai-agents
keywords:
  - agent-admission
  - revocation
  - anchor
  - mirror
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Supervisor
    requirement: REQUIRED
    member: issuer
  - role: Gate authority
    requirement: REQUIRED
    member: recipient
proofRequirement:
  requirement: REQUIRED
  rationale: Revocation shifts authority — it strips an agent's standing. The same accountability that gated issuance gates its removal; an unsigned revocation is either forgeable or unattributable, and both are worse than the compromised credential it targets.
sideEffects:
  level: destructive
  rationale: Irreversibly ends this credential's standing — a new admission requires a new ceremony, and mirrored revocation marks on external registries are permanent. The human consenting to this is consenting to the agent losing its deployment scope immediately, including for in-flight work.
exposure:
  discloses: metadata
  actsAsSubject: false
subjectPath: /agent
errorCodes:
  - code: agent-admission/revoke:unknownCredential
    meaning: No admitted credential matches `credentialId`.
    retryable: false
  - code: agent-admission/revoke:alreadyRevoked
    meaning: The credential is already revoked; the recorded revocation stands.
    retryable: false
  - code: agent-admission/revoke:mirrorFailed
    meaning: The revocation is recorded, but a mark could not be posted to one or more anchors; the response lists what converged. Retry mirrors the remainder.
    retryable: true
related:
  - agent-admission/issue
  - agent-admission/status
---

## Abstract

The **Agent Admission — Revoke** Trust Task ends an admitted agent's standing.
Because an admission outcome may have been anchored on external registries as
discoverable evidence, revocation is not complete until a revocation mark is
mirrored to **the same registries** — otherwise off-chain relying parties refuse
the agent while on-chain ones keep trusting the stale anchor. Anchors are
evidence, never authority: the revocation's authority is this signed task and
the gate authority's record; the mirrors only make it discoverable everywhere
the issuance was.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the supervisor) **MUST** emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/agent-admission/revoke/0.1`, with itself as `issuer`, the gate authority as `recipient`, and a verifiable `proof`.

A conforming **consumer** (the gate authority) **MUST**:

1. Verify the `proof` and that the `issuer` is a supervisor it recognises for this credential's policy (`permissionDenied` otherwise).
2. Record the revocation and append the event to the content-addressed audit ledger **before** attempting any mirror — the local record is the authority; mirrors follow it.
3. Post a revocation mark to every registry named in the credential's anchor set, and report per-anchor convergence in the `#response`. Partial mirror failure is `mirrorFailed` (retryable); the revocation itself is never rolled back for a failed mirror.
4. Refuse further delegated authority derived from this credential immediately upon recording, without waiting for mirrors.

## Payload

`payload.credentialId` (REQUIRED) — the credential being revoked (its digest or ceremony identifier).
`payload.agent` (REQUIRED) — VID of the agent whose standing ends.
`payload.reason` (REQUIRED) — recorded, durable free text.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:9f5ea3b8-c2d6-4be4-a6f7-809102132435",
  "type": "https://trusttasks.org/spec/agent-admission/revoke/0.1",
  "issuer": "did:key:z6MkSupervisorExample",
  "recipient": "did:key:z6MkGateAuthorityExample",
  "issuedAt": "2026-07-18T14:00:00Z",
  "payload": {
    "credentialId": "4a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e",
    "agent": "did:key:z6MkCandidateAgentExample",
    "reason": "Deployment scope exceeded during batch run; standing withdrawn pending re-assessment."
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T14:00:00Z",
    "verificationMethod": "did:key:z6MkSupervisorExample#z6MkSupervisorExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForAgentAdmissionRevoke"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:a06fb4c9-d3e7-4cf5-b708-9102132435460",
  "type": "https://trusttasks.org/spec/agent-admission/revoke/0.1#response",
  "issuer": "did:key:z6MkGateAuthorityExample",
  "recipient": "did:key:z6MkSupervisorExample",
  "threadId": "urn:uuid:9f5ea3b8-c2d6-4be4-a6f7-809102132435",
  "issuedAt": "2026-07-18T14:00:03Z",
  "payload": {
    "credentialId": "4a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e",
    "revoked": true,
    "revokedAt": "2026-07-18T14:00:03Z",
    "mirroredAnchors": [
      { "namespace": "org.erc8004.validation", "ref": "0x5a…e21f" }
    ]
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T14:00:03Z",
    "verificationMethod": "did:key:z6MkGateAuthorityExample#z6MkGateAuthorityExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForAgentAdmissionRevokeResponse"
  }
}
```

## Security & Privacy

The `reason` is durable and, where anchors exist, its *existence* (not its
text) becomes publicly discoverable; supervisors SHOULD keep reasons free of
third-party personal data, and mirrors MUST carry only the revocation mark and
credential digest — never the reason text. Revocation timing is itself a
signal: a relying party watching an anchor registry learns *when* an agent lost
standing. That is the intended disclosure — convergence beats confidentiality
here, which is why the mirror is mandatory rather than best-effort. The window
between local recording and mirror convergence is the residual risk; relying
parties that can reach the gate authority SHOULD prefer
[`agent-admission/status`](../../status/0.1/spec.md) over anchor reads.
