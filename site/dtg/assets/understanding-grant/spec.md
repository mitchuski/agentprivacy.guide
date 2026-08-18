---
slug: understanding/grant
version: "0.1"
title: Understanding — Grant
summary: A sealed joining party requests scoped access; the host's broker releases a delegated, expiring grant — the underlying credential never leaves the broker, and asking for it is a named refusal.
status: draft
targetFrameworkVersion: "0.2"
category: consent
keywords:
  - understanding
  - broker
  - delegated-access
  - scoped-grant
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Joining party
    requirement: REQUIRED
    member: issuer
  - role: Host broker
    requirement: REQUIRED
    member: recipient
proofRequirement:
  requirement: REQUIRED
  rationale: The response releases secret material scoped to the requesting party; an unproven request would let any party who observed the sealed agreementId draw grants against it.
sideEffects:
  level: mutating
  rationale: Mints a delegated grant (recoverable — it expires and can be withdrawn) and records the release.
exposure:
  discloses: secret
  actsAsSubject: false
  rationale: The response contains the delegated grant material the joiner will wield — secret by definition, though scoped and expiring. The broker's underlying credential is never disclosed; that boundary is what this task exists to keep.
subjectPath: /agreementId
errorCodes:
  - code: understanding/grant:grantWithoutSeal
    meaning: No sealed agreement matches `agreementId` for this party. Understanding, then agreement, then access — in that order.
    retryable: false
  - code: understanding/grant:rawCredentialRequested
    meaning: The request asked for the broker's underlying credential rather than a delegated grant. Always refused; there is no parameter that makes this well-formed.
    retryable: false
  - code: understanding/grant:scopeExceedsAgreement
    meaning: The requested scope exceeds what the sealed agreement covers.
    retryable: false
related:
  - understanding/seal
  - vault/proxy-login
  - vault/release
---

## Abstract

The **Understanding — Grant** Trust Task converts a sealed agreement into
working access — through a **broker**, never by credential hand-over. The host
side holds its credentials (a session, a write token, an API key) in a broker;
a sealed joining party requests scope; the broker mints a **delegated grant**:
host-scoped, expiring, attributable to the grantee, and revocable without
rotating the underlying credential.

The boundary is the specification's reason to exist: the underlying credential
**never** leaves the broker, and a request for it is a *named refusal*
(`rawCredentialRequested`), not a policy choice. This is the same custody
instinct as [`vault/proxy-login`](../../../vault/proxy-login/0.2/spec.md) —
exercise a credential without releasing it — surfaced at the moment a
trust ceremony first grants access, where the temptation to "just share the
key" is strongest.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the joining party) **MUST** emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/understanding/grant/0.1`, carrying a verifiable `proof` from the party that sealed the agreement, and request scope within what the seal covers.

A conforming **consumer** (the host broker) **MUST**:

1. Verify the `proof` against the sealed agreement's joining party; refuse an unknown or unsealed agreement with `grantWithoutSeal`.
2. Refuse any request shaped to obtain the underlying credential with `rawCredentialRequested` — including requests for unscoped grants, non-expiring grants, or the broker's own verification material.
3. Bound every grant: explicit host scope, explicit expiry, attributable to this grantee, and revocable at the broker without rotating the underlying credential.
4. Record every release and every use it mediates, so grant activity is auditable per grantee.

## Payload

`payload.agreementId` (REQUIRED) — the sealed agreement this grant draws on.
`payload.scope` (REQUIRED) — the hosts and actions requested.
`payload.validFor` (OPTIONAL) — requested duration; the broker MAY grant less, never more.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:39f24d52-6c70-4f2e-e091-809ab2c3d4e5",
  "type": "https://trusttasks.org/spec/understanding/grant/0.1",
  "issuer": "did:key:z6MkJoiningPartyExample",
  "recipient": "did:key:z6MkHostExample",
  "issuedAt": "2026-07-18T17:00:00Z",
  "payload": {
    "agreementId": "seal-17d02b30",
    "scope": {
      "hosts": ["workshop.host.example.com"],
      "actions": ["read", "contribute"]
    },
    "validFor": "PT12H"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T17:00:00Z",
    "verificationMethod": "did:key:z6MkJoiningPartyExample#z6MkJoiningPartyExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForUnderstandingGrant"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:4a035e63-7d81-4a3f-f1a2-9ab2c3d4e5f6",
  "type": "https://trusttasks.org/spec/understanding/grant/0.1#response",
  "issuer": "did:key:z6MkHostExample",
  "recipient": "did:key:z6MkJoiningPartyExample",
  "threadId": "urn:uuid:39f24d52-6c70-4f2e-e091-809ab2c3d4e5",
  "issuedAt": "2026-07-18T17:00:02Z",
  "payload": {
    "grantRef": "grant-39f24d52",
    "material": "dg1.eyJhbGciOiJFZERTQSJ9.ExampleDelegatedGrantTokenNotTheUnderlyingCredential",
    "scope": {
      "hosts": ["workshop.host.example.com"],
      "actions": ["read", "contribute"]
    },
    "expiresAt": "2026-07-19T05:00:00Z"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T17:00:02Z",
    "verificationMethod": "did:key:z6MkHostExample#z6MkHostExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleProofValueForUnderstandingGrantResponse"
  }
}
```

## Security & Privacy

The response is `discloses: secret`: the grant material is confidential to the
grantee and MUST travel only over a confidential, mutually-authenticated
binding. The custody boundary bounds the blast radius — a leaked grant exposes
its scope until expiry or withdrawal, never the underlying credential; a
compromised joiner is contained by the same line. The broker's release-and-use
record makes grant activity attributable per grantee, which is a disclosure the
joiner accepted at the seal: mediated access is visible access. Brokers SHOULD
keep grant lifetimes short and let renewal be cheap — a short leash re-walked
beats a long one forgotten.
