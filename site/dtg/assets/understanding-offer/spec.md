---
slug: understanding/offer
version: "0.1"
title: Understanding — Offer
summary: A joining party consensually offers its address and intent to a host; the host answers with the gateway — the terms document whose comprehension, not any credential, is the key to what follows.
status: draft
targetFrameworkVersion: "0.2"
category: consent
keywords:
  - understanding
  - consent-first
  - gateway
  - onboarding
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
  rationale: The offer opens a pending join keyed to the joiner's VID; a proof binds the offered address to a controller. RECOMMENDED rather than REQUIRED so the ceremony stays open to joiners whose first contact predates any key exchange, where transport authentication carries the binding.
sideEffects:
  level: mutating
  rationale: The host records a pending join (recoverable state) keyed to the offered address.
exposure:
  discloses: metadata
  actsAsSubject: false
errorCodes:
  - code: understanding/offer:notAccepting
    meaning: The host is not accepting joins right now; the offer was not recorded.
    retryable: true
  - code: understanding/offer:nameResolvesSometimes
    meaning: The offered address resolved intermittently during the host's probe. Intermittent resolution is a refusal, not a retry — a name that resolves sometimes is worse than one that never does.
    retryable: false
related:
  - understanding/exchange
  - understanding/seal
  - understanding/grant
---

## Abstract

The **Understanding — Offer** Trust Task opens the proof-of-understanding
ceremony: a joining party **offers** its address and intent to a host —
consent-first; the host never scans for it. The host's `#response` is the
**gateway**: a reference to the terms document governing the room, pinned by
digest. Reading the gateway is where the handshake actually happens; the family
rule — *access is earned by understanding, not credential* — starts here.

The ceremony is the consent-first peer counterpart of the supervised
[`agent-admission/*`](../../../agent-admission/apply/0.1/spec.md) family: no
supervisor, two parties meeting as equals, and the outcome is a sealed
bilateral agreement ([`understanding/seal`](../../seal/0.1/spec.md)) followed
by a brokered grant ([`understanding/grant`](../../grant/0.1/spec.md)), not a
deployment credential.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the joining party) **MUST** emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/understanding/offer/0.1`, offering an address it controls. Offering is consent: a host **MUST NOT** open a pending join for an address that was discovered rather than offered.

A conforming **consumer** (the host) **MUST**:

1. Probe the offered address deterministically before recording the join, and refuse intermittent resolution with `nameResolvesSometimes` — a sometimes-resolving name poisons every later step of the ceremony with ambiguity.
2. Answer with a gateway reference **pinned by digest**, so the joiner and host can later agree on exactly which terms were read ([`understanding/exchange`](../../exchange/0.1/spec.md) echoes the digest).
3. Serve the gateway such that near-misses degrade soft — a wrong path lands on the gateway, never a hard failure. The front door of a trust ceremony must not 502.

## Payload

`payload.endpoint` (REQUIRED) — the offered address (URI) the joiner answers at.
`payload.intent` (REQUIRED) — one line of free text: what the joiner wants of the room.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:d39ce7fc-061a-4fc8-ea3b-243546576879",
  "type": "https://trusttasks.org/spec/understanding/offer/0.1",
  "issuer": "did:key:z6MkJoiningPartyExample",
  "recipient": "did:key:z6MkHostExample",
  "issuedAt": "2026-07-18T16:00:00Z",
  "payload": {
    "endpoint": "https://192.168.55.144:8443/join",
    "intent": "Join the shared workshop model as a contributing member."
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T16:00:00Z",
    "verificationMethod": "did:key:z6MkJoiningPartyExample#z6MkJoiningPartyExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForUnderstandingOffer"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:e4adf80d-172b-4ad9-fb4c-354657687980",
  "type": "https://trusttasks.org/spec/understanding/offer/0.1#response",
  "issuer": "did:key:z6MkHostExample",
  "recipient": "did:key:z6MkJoiningPartyExample",
  "threadId": "urn:uuid:d39ce7fc-061a-4fc8-ea3b-243546576879",
  "issuedAt": "2026-07-18T16:00:02Z",
  "payload": {
    "gateway": {
      "uri": "https://host.example.com/gateway",
      "digest": "5b6c7d8e9f202132435b6c7d8e9f202132435b6c7d8e9f202132435b6c7d8e9f"
    },
    "exchangeBy": "2026-07-18T17:00:00Z"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T16:00:02Z",
    "verificationMethod": "did:key:z6MkHostExample#z6MkHostExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForUnderstandingOfferResponse"
  }
}
```

## Security & Privacy

The offer discloses the joiner's address and intent to the host — exactly the
disclosure the joiner consented to by offering; the host MUST NOT probe beyond
the offered address. A pending join is enumeration surface: hosts SHOULD
rate-limit offers and expire unanswered ones. The gateway digest is
load-bearing for the whole ceremony — a host that rotates its terms mid-join
must expect `gatewayStale` at exchange and reissue, never silently re-pin.
