---
slug: understanding/seal
version: "0.1"
title: Understanding — Seal
summary: The joining party proposes the bilateral agreement — machine-readable personal privacy terms per IEEE 7012, selected from a standard roster — and the host's signed acceptance seals it, with a content-addressed witness record outside both parties.
status: draft
targetFrameworkVersion: "0.2"
category: consent
keywords:
  - understanding
  - myterms
  - ieee-7012
  - agreement
  - bilateral
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Joining party (first person)
    requirement: REQUIRED
    member: issuer
  - role: Host (second party)
    requirement: REQUIRED
    member: recipient
proofRequirement:
  requirement: REQUIRED
  rationale: The seal IS the agreement. The proposal must carry the joiner's signature and the acceptance the host's — an unsigned half is not a half of an agreement, and the pair of signed halves, threadId-correlated, is the bilateral seal.
sideEffects:
  level: mutating
  rationale: Seals the agreement (recoverable — either party may later end it on the agreement's own terms) and emits the witness record.
exposure:
  discloses: metadata
  actsAsSubject: false
errorCodes:
  - code: understanding/seal:exchangeNotPassed
    meaning: No passed exchange exists for this join; understanding precedes agreement.
    retryable: false
  - code: understanding/seal:selfIssuedSeal
    meaning: Proposer and acceptor are the same party (or resolve to the same controller). A trust that certifies itself is the one that cannot be trusted.
    retryable: false
  - code: understanding/seal:termNotInRoster
    meaning: The proposed term is not in the standard roster the host recognises.
    retryable: false
related:
  - understanding/offer
  - understanding/exchange
  - understanding/grant
---

## Abstract

The **Understanding — Seal** Trust Task reaches the object the ceremony exists
for: a **bilateral agreement** between exactly two parties. The direction of
proposal is the point — the *joining party proposes* the terms, selected from a
standard roster, and the host accepts or declines. This is the
machine-readable-personal-privacy-terms pattern of **IEEE Std 7012-2025**: the
individual proposes; acceptance precedes any further relationship; the
agreement is strictly two-party (agents, devices, and credentials are the
fabric around it, never parties to it); and the terms keep three registers in
correspondence — plain language, legal, and machine-readable.

One structural rule guards the seal: it is never self-issued, and it SHOULD be
witnessed from outside. A content-addressed **witness record** — resolvable by
digest by either party or a third — attests that the ceremony happened without
becoming an authority over what it means. An agreement complete enough to need
no one outside it has either stopped listening or begun to lie.

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the joining party) **MUST**:

1. Emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/understanding/seal/0.1`, carrying a verifiable `proof` — this signed proposal is the joiner's half of the seal.
2. Propose terms by roster and term identifier, pinned by digest, so the three registers of the term are fixed rather than paraphrased.

A conforming **consumer** (the host) **MUST**:

1. Refuse a proposal without a passed exchange (`exchangeNotPassed`) — understanding precedes agreement, in that order, always.
2. Refuse a proposal where proposer and acceptor are, or resolve to, the same controller (`selfIssuedSeal`).
3. Accept only roster terms it recognises (`termNotInRoster`); a counter-proposal is a new `understanding/seal` in the opposite direction, never an edit of this one.
4. On acceptance, sign the `#response` (the host's half of the seal), emit the witness record, and return its digest. The pair of signed halves, correlated by `threadId`, IS the agreement.

## Payload

`payload.agreement` (REQUIRED) — roster, term, and digest of the proposed terms.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member).

## Request

```json
{
  "id": "urn:uuid:17d02b30-4a5e-4d0c-ce7f-6879809ab2c3",
  "type": "https://trusttasks.org/spec/understanding/seal/0.1",
  "issuer": "did:key:z6MkJoiningPartyExample",
  "recipient": "did:key:z6MkHostExample",
  "issuedAt": "2026-07-18T16:40:00Z",
  "payload": {
    "agreement": {
      "roster": "https://customercommons.org/roster",
      "term": "SD-BASE",
      "termsDigest": "6c7d8e9f2021324354e6c7d8e9f2021324354e6c7d8e9f2021324354e6c7d8e9",
      "termsRef": "https://customercommons.org/roster/SD-BASE"
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T16:40:00Z",
    "verificationMethod": "did:key:z6MkJoiningPartyExample#z6MkJoiningPartyExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProposalHalfOfTheSeal"
  }
}
```

## Response

```json
{
  "id": "urn:uuid:28e13c41-5b6f-4e1d-df80-79809ab2c3d4",
  "type": "https://trusttasks.org/spec/understanding/seal/0.1#response",
  "issuer": "did:key:z6MkHostExample",
  "recipient": "did:key:z6MkJoiningPartyExample",
  "threadId": "urn:uuid:17d02b30-4a5e-4d0c-ce7f-6879809ab2c3",
  "issuedAt": "2026-07-18T16:40:04Z",
  "payload": {
    "accepted": true,
    "agreementId": "seal-17d02b30",
    "sealedAt": "2026-07-18T16:40:04Z",
    "witnessRef": {
      "digest": "7d8e9f202132435465f7d8e9f202132435465f7d8e9f202132435465f7d8e9f2",
      "uri": "https://host.example.com/witness/seal-17d02b30"
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T16:40:04Z",
    "verificationMethod": "did:key:z6MkHostExample#z6MkHostExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleAcceptanceHalfOfTheSeal"
  }
}
```

## Security & Privacy

The seal discloses which roster term the parties agreed — metadata by
construction, since roster terms are published. The witness record MUST carry
digests and party VIDs only, never the exchange answers or any negotiated
content; it exists so either party (or a relying party the agreement concerns)
can later prove the ceremony happened, not to disclose its content. Because
the proposal direction is the individual's, a host MUST NOT pre-fill or
require a specific term as a condition of the ceremony beyond declining and
letting the joiner re-propose — acceptance pressure inverts the pattern the
seal encodes.
