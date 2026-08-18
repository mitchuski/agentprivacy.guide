---
slug: agent-admission/status
version: "0.1"
title: Agent Admission — Status
summary: A relying party asks a gate authority for an admitted agent's current standing — verdict, tier, revocation state, and anchors — the authoritative read that anchor registries only mirror.
status: draft
targetFrameworkVersion: "0.2"
category: ai-agents
keywords:
  - agent-admission
  - status
  - relying-party
  - verification
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Relying party
    requirement: REQUIRED
    member: issuer
  - role: Gate authority
    requirement: REQUIRED
    member: recipient
proofRequirement:
  requirement: RECOMMENDED
  rationale: A status read's integrity is normally guaranteed by the transport; a proof is RECOMMENDED, not REQUIRED, so the query stays usable on bindings without an in-band verifier. Gate authorities MAY require proof to apply per-relying-party access policy.
sideEffects:
  level: none
  rationale: "Read-only standing query; no state changes at the gate authority."
exposure:
  discloses: metadata
  actsAsSubject: false
errorCodes:
  - code: agent-admission/status:unknownAgent
    meaning: No admission record matches the queried agent or credential at this gate authority.
    retryable: false
related:
  - agent-admission/issue
  - agent-admission/revoke
  - registry/authorization
---

## Abstract

The **Agent Admission — Status** Trust Task is the authoritative read on an
admitted agent's standing. Where an admission outcome was anchored on an
external registry, the anchor is discoverable evidence only; this query is the
authority it mirrors. A relying party that can reach the gate authority SHOULD
prefer this read over an anchor read — it reflects revocation immediately,
without waiting on mirror convergence.

The response discloses standing metadata only: verdict, tier, issuance and
revocation state, and the anchor set. The submission, the drawn criteria, the
answers, and the supervisor's note never leave the application record.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the relying party) **MUST** emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/agent-admission/status/0.1`, naming the agent VID or the credential identifier (at least one).

A conforming **consumer** (the gate authority) **MUST**:

1. Answer from its own record, never from an anchor.
2. Include `revoked` in every successful response — a relying party MUST be able to distinguish "admitted and in force" from "admitted and revoked" from one read.
3. Apply its own access policy to who may query (`permissionDenied` where refused).

## Payload

`payload.agent` (OPTIONAL) — VID of the agent queried.
`payload.credentialId` (OPTIONAL) — credential identifier queried.
At least one of the two MUST be present.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:b17ac5da-e4f8-4da6-c819-021324354657",
  "type": "https://trusttasks.org/spec/agent-admission/status/0.1",
  "issuer": "did:key:z6MkRelyingPartyExample",
  "recipient": "did:key:z6MkGateAuthorityExample",
  "issuedAt": "2026-07-18T15:00:00Z",
  "payload": {
    "agent": "did:key:z6MkCandidateAgentExample"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T15:00:00Z",
    "verificationMethod": "did:key:z6MkRelyingPartyExample#z6MkRelyingPartyExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForAgentAdmissionStatus"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:c28bd6eb-f509-4eb7-d92a-132435465768",
  "type": "https://trusttasks.org/spec/agent-admission/status/0.1#response",
  "issuer": "did:key:z6MkGateAuthorityExample",
  "recipient": "did:key:z6MkRelyingPartyExample",
  "threadId": "urn:uuid:b17ac5da-e4f8-4da6-c819-021324354657",
  "issuedAt": "2026-07-18T15:00:01Z",
  "payload": {
    "agent": "did:key:z6MkCandidateAgentExample",
    "credentialId": "4a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e",
    "verdict": "validated",
    "tierGrant": {
      "tier": 6,
      "scopeFunction": "https://gate.example.com/policy/deployment-rules/3.1#scope-function"
    },
    "issuedAt": "2026-07-18T10:25:04Z",
    "revoked": false,
    "anchors": [
      { "namespace": "org.erc8004.validation", "ref": "0x5a…e21f" }
    ]
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T15:00:01Z",
    "verificationMethod": "did:key:z6MkGateAuthorityExample#z6MkGateAuthorityExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForAgentAdmissionStatusResponse"
  }
}
```

## Security & Privacy

The query reveals which agent a relying party is interested in — the same
consideration as any registry read; carry it over an authenticated,
confidential transport, and gate authorities SHOULD apply access policy to
queries. The response is a point-in-time read; consumers SHOULD NOT cache it
beyond their own risk window, and MUST NOT treat a cached `revoked: false` as
current. Composition downstream (e.g. admission to a privileged pool requiring
a validated credential AND an anchored validation entry) lives with the relying
party, never at the gate authority.
