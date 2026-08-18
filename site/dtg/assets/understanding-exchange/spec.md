---
slug: understanding/exchange
version: "0.1"
title: Understanding — Exchange
summary: The joining party answers the host's gateway terms from comprehension — pinned to the exact digest it read — and the host judges whether understanding, not copying, occurred.
status: draft
targetFrameworkVersion: "0.2"
category: consent
keywords:
  - understanding
  - comprehension
  - gateway
  - exchange
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Joining party
    requirement: REQUIRED
    member: issuer
  - role: Host
    requirement: REQUIRED
    member: recipient
proofRequirement:
  requirement: RECOMMENDED
  rationale: The answers must be attributable to the same party that offered; where the offer carried a proof, the exchange SHOULD carry one from the same key. Transport authentication MAY carry the binding for keyless first-contact joins.
sideEffects:
  level: mutating
  rationale: Records the exchange result (recoverable state) on the pending join.
exposure:
  discloses: metadata
  actsAsSubject: false
errorCodes:
  - code: understanding/exchange:noPendingOffer
    meaning: No pending join exists for this party; offer first.
    retryable: false
  - code: understanding/exchange:gatewayStale
    meaning: The echoed gateway digest is no longer the host's current terms. Re-read the gateway; answers against superseded terms are not judged.
    retryable: true
  - code: understanding/exchange:copyNotComprehension
    meaning: An answer reproduces the gateway text verbatim rather than demonstrating comprehension. Copying is refused, not judged.
    retryable: false
related:
  - understanding/offer
  - understanding/seal
---

## Abstract

The **Understanding — Exchange** Trust Task is where understanding is
demonstrated: the joining party answers the gateway's prompts *in its own
words*, pinned to the exact digest of the terms it read. The host judges
comprehension — a verbatim reproduction of the gateway is refused
(`copyNotComprehension`), because the ceremony's key is what the joiner
*understood*, not what it can retrieve.

A passed exchange does not admit anyone. It qualifies the joining party to
propose the seal ([`understanding/seal`](../../seal/0.1/spec.md)) — the
bilateral agreement that the whole ceremony exists to reach.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the joining party) **MUST**:

1. Emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/understanding/exchange/0.1`, echoing the gateway digest it actually read.
2. Answer in its own words. The gateway is the source of the answers' *content*; it must not be the source of their *text*.

A conforming **consumer** (the host) **MUST**:

1. Reject an unknown join with `noPendingOffer` and a superseded digest with `gatewayStale` — answers are judged only against the terms the joiner actually read, and only while those terms are current.
2. Refuse verbatim reproduction with `copyNotComprehension` rather than scoring it.
3. Return `passed` and, when passed, `sealBy` — the window in which the joiner may propose the seal.

## Payload

`payload.gatewayDigest` (REQUIRED) — the digest of the terms the answers address.
`payload.answers` (REQUIRED) — the joiner's answers to the gateway's prompts.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:f5be091e-283c-4bea-ac5d-465768798a91",
  "type": "https://trusttasks.org/spec/understanding/exchange/0.1",
  "issuer": "did:key:z6MkJoiningPartyExample",
  "recipient": "did:key:z6MkHostExample",
  "issuedAt": "2026-07-18T16:20:00Z",
  "payload": {
    "gatewayDigest": "5b6c7d8e9f202132435b6c7d8e9f202132435b6c7d8e9f202132435b6c7d8e9f",
    "answers": [
      {
        "promptId": "gateway#contribution",
        "answer": "Whatever I produce here feeds the room's shared corpus; my expressions are both my key and the room's material, so I only contribute what I am content to leave."
      },
      {
        "promptId": "gateway#access",
        "answer": "I never receive the room's underlying credentials; anything I'm granted is scoped, expiring, and mediated by the room's broker."
      }
    ]
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T16:20:00Z",
    "verificationMethod": "did:key:z6MkJoiningPartyExample#z6MkJoiningPartyExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForUnderstandingExchange"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:06cf1a2f-394d-4cfb-bd6e-576879809aa2",
  "type": "https://trusttasks.org/spec/understanding/exchange/0.1#response",
  "issuer": "did:key:z6MkHostExample",
  "recipient": "did:key:z6MkJoiningPartyExample",
  "threadId": "urn:uuid:f5be091e-283c-4bea-ac5d-465768798a91",
  "issuedAt": "2026-07-18T16:20:03Z",
  "payload": {
    "passed": true,
    "sealBy": "2026-07-18T18:00:00Z"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T16:20:03Z",
    "verificationMethod": "did:key:z6MkHostExample#z6MkHostExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForUnderstandingExchangeResponse"
  }
}
```

## Security & Privacy

Answers disclose the joiner's reasoning about the host's published terms — no
third-party data, and nothing beyond what the joiner chose to write. The host's
judgment is local policy; this specification fixes only what may not count
(verbatim copying) and what the answers must be pinned to (the digest). The
deterministic witness-draw mechanism of
[`agent-admission/apply`](../../../agent-admission/apply/0.1/spec.md) ports
cleanly onto this task where hosts want grooming resistance; it is not required
in the peer posture.
