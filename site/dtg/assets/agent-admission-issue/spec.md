---
slug: agent-admission/issue
version: "0.1"
title: Agent Admission — Issue
summary: The gate authority offers the bilateral relationship credential that admits an agent — only when both gates passed and their evidence resolves into a verified audit ledger; the agent's counter-signature completes it.
status: draft
targetFrameworkVersion: "0.2"
category: ai-agents
keywords:
  - agent-admission
  - verifiable-credential
  - bilateral
  - two-gate
  - relationship
authors:
  - Mitch (https://github.com/mitchuski)
parties:
  - role: Gate authority
    requirement: REQUIRED
    member: issuer
  - role: Candidate agent
    requirement: REQUIRED
    member: recipient
proofRequirement:
  requirement: REQUIRED
  rationale: The offered credential's first signature IS the gate authority's half of the bilateral relationship; an unsigned offer is not an offer of a relationship credential at all.
sideEffects:
  level: mutating
  rationale: Issues the agent's standing (recoverable — it can be revoked) and appends the issuance event to the audit ledger.
exposure:
  discloses: metadata
  actsAsSubject: false
subjectPath: /agent
errorCodes:
  - code: agent-admission/issue:missingSupervisorGate
    meaning: No passed supervisor-approval gate is recorded for this application. Issuance MUST NOT proceed.
    retryable: false
  - code: agent-admission/issue:missingUnderstandingGate
    meaning: No passed understanding-challenge gate is recorded for this application. Issuance MUST NOT proceed.
    retryable: false
  - code: agent-admission/issue:blockedNoIssuance
    meaning: The verdict is `blocked` — a hard constraint was violated; no credential of any kind issues, sandbox included.
    retryable: false
  - code: agent-admission/issue:ledgerDoesNotVerify
    meaning: The content-addressed audit ledger fails verification; the ceremony is void before any gate is weighed.
    retryable: false
  - code: agent-admission/issue:evidenceNotInLedger
    meaning: A gate result's `evidenceDigest` does not resolve into the verified ledger. Forged or orphaned evidence voids the ceremony.
    retryable: false
  - code: agent-admission/issue:notBilateral
    meaning: The credential does not carry exactly two proofs from two distinct parties in the two relationship roles. Single-signed and self-signed credentials are refused.
    retryable: false
  - code: agent-admission/issue:unknownVerdict
    meaning: The verdict is not in the closed lexicon (`validated`, `failedHeldOut`, `blocked`).
    retryable: false
  - code: agent-admission/issue:tierScopeMismatch
    meaning: The granted tier is not what the published scope function derives from the recorded assessment. A flattering tier is refused.
    retryable: false
related:
  - agent-admission/apply
  - agent-admission/respond
  - agent-admission/approve
  - agent-admission/revoke
  - agent-admission/status
---

## Abstract

The **Agent Admission — Issue** Trust Task completes the ceremony: the gate
authority offers a **bilateral relationship credential** — a W3C Verifiable
Credential expressing the admission relationship, first-signed by the gate
authority — and the candidate agent's counter-signature in the `#response`
completes it. In ToIP terms the ceremony is a Trust Spanning Protocol
relationship formation between two VIDs: exactly two proofs, two roles, two
distinct parties. A self-signed credential is a named rejection
(`notBilateral`), not a degenerate case.

Issuance is where the ceremony's rules are enforced *in order*:

1. the audit ledger verifies, or the ceremony is void before any gate is weighed;
2. **both gates** — a passed supervisor approval AND a passed understanding
   challenge, distinct kinds — or no credential (`missingSupervisorGate` /
   `missingUnderstandingGate`);
3. the verdict comes from the **closed lexicon**: `validated` → deploy within
   granted scope, `failedHeldOut` → sandbox, `blocked` → hold and **no
   credential at all** (`blockedNoIssuance`);
4. every gate's evidence resolves into the verified ledger;
5. the tier is **derived** by the published scope function from the recorded
   assessment, never negotiated — a flattering tier is refused
   (`tierScopeMismatch`).

## Status of this Document

This is a **draft** *Trust Task specification* per [SPEC.md §5.3](../../../../SPEC.md#53-maturity-levels); the schema **MAY** change without notice. Feedback via the [issue tracker](https://github.com/trustoverip/dtgwg-trust-tasks-tf/issues).

## Conformance

[[RFC2119]](https://www.rfc-editor.org/rfc/rfc2119) and [[RFC8174]](https://www.rfc-editor.org/rfc/rfc8174) key-word conventions apply.

A conforming **producer** (the gate authority) **MUST**:

1. Emit a *Trust Task document* whose `type` is `https://trusttasks.org/spec/agent-admission/issue/0.1`, with itself as `issuer`, the admitted agent as `recipient`, and a verifiable `proof`.
2. Enforce the five rules above, in order, before emitting the offer; the checks are the producer's because only the gate authority holds the ledger and the recorded gates.
3. Carry both gate results (with evidence digests), the verdict, the tier grant, and the ledger head in the payload, so the offer is auditable standing alone.
4. First-sign the embedded credential in the gate-authority relationship role.

A conforming **consumer** (the candidate agent) **MUST**:

1. Verify the `proof`, the embedded credential's first signature, and that the credential's subject is itself.
2. Re-check what it can from outside: both gates present and of distinct kinds, verdict in the closed lexicon, evidence digests present. An agent SHOULD refuse to counter-sign an offer whose gates it cannot see.
3. Counter-sign in the agent relationship role and return the completed credential in the `#response`. The credential is not in force until the counter-signature exists — admission is a relationship, and a relationship has two signatures.

## Payload

`payload.applicationId` (REQUIRED) — the completed application.
`payload.agent` (REQUIRED) — VID of the admitted agent; MUST equal `recipient`.
`payload.verdict` (REQUIRED) — from the closed lexicon.
`payload.tierGrant` (REQUIRED) — the derived tier and its published scope function.
`payload.gates` (REQUIRED) — exactly two gate results, distinct kinds.
`payload.ledgerHead` (REQUIRED) — digest of the audit-ledger head at issuance.
`payload.credential` (REQUIRED) — the first-signed W3C Verifiable Credential.
`payload.ext` — extension slot per [SPEC.md §4.5.1](../../../../SPEC.md#451-the-ext-extension-member); an external anchor reference (evidence, never authority) belongs here under the anchoring vendor's namespace.

## Request

```json
{
  "id": "urn:uuid:7d3c8196-a0b4-4fc2-e4d5-6e7f80910213",
  "type": "https://trusttasks.org/spec/agent-admission/issue/0.1",
  "issuer": "did:key:z6MkGateAuthorityExample",
  "recipient": "did:key:z6MkCandidateAgentExample",
  "issuedAt": "2026-07-18T10:25:00Z",
  "payload": {
    "applicationId": "app-7c1b2a90",
    "agent": "did:key:z6MkCandidateAgentExample",
    "verdict": "validated",
    "tierGrant": {
      "tier": 6,
      "scopeFunction": "https://gate.example.com/policy/deployment-rules/3.1#scope-function"
    },
    "gates": [
      {
        "gate": "understandingChallenge",
        "passed": true,
        "at": "2026-07-18T10:12:05Z",
        "evidenceDigest": "1d2e3f4a5b6c7d8e9f001d2e3f4a5b6c7d8e9f001d2e3f4a5b6c7d8e9f001d2e"
      },
      {
        "gate": "supervisorApproval",
        "passed": true,
        "at": "2026-07-18T10:20:02Z",
        "evidenceDigest": "2e3f4a5b6c7d8e9f102e3f4a5b6c7d8e9f102e3f4a5b6c7d8e9f102e3f4a5b6c"
      }
    ],
    "ledgerHead": "3f4a5b6c7d8e9f20113f4a5b6c7d8e9f20113f4a5b6c7d8e9f20113f4a5b6c7d",
    "credential": {
      "@context": ["https://www.w3.org/ns/credentials/v2"],
      "type": ["VerifiableCredential", "RelationshipCredential"],
      "issuer": "did:key:z6MkGateAuthorityExample",
      "credentialSubject": {
        "id": "did:key:z6MkCandidateAgentExample",
        "relationship": "admitted-agent",
        "tier": 6,
        "applicationId": "app-7c1b2a90"
      },
      "proof": [
        {
          "type": "DataIntegrityProof",
          "cryptosuite": "eddsa-jcs-2022",
          "created": "2026-07-18T10:25:00Z",
          "verificationMethod": "did:key:z6MkGateAuthorityExample#z6MkGateAuthorityExample",
          "proofPurpose": "assertionMethod",
          "proofValue": "z3FXQmV6ExampleFirstSignatureGateAuthorityRole"
        }
      ]
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:25:00Z",
    "verificationMethod": "did:key:z6MkGateAuthorityExample#z6MkGateAuthorityExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3FXQmV6ExampleProofValueForAgentAdmissionIssue"
  }
}
```

## Response

The agent returns the completed, counter-signed credential. The credential now
carries exactly two proofs — the gate authority's and the agent's — in the two
relationship roles.

```json
{
  "id": "urn:uuid:8e4d92a7-b1c5-4ad3-f5e6-7f8091021324",
  "type": "https://trusttasks.org/spec/agent-admission/issue/0.1#response",
  "issuer": "did:key:z6MkCandidateAgentExample",
  "recipient": "did:key:z6MkGateAuthorityExample",
  "threadId": "urn:uuid:7d3c8196-a0b4-4fc2-e4d5-6e7f80910213",
  "issuedAt": "2026-07-18T10:25:04Z",
  "payload": {
    "applicationId": "app-7c1b2a90",
    "credentialDigest": "4a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e9f2021324a5b6c7d8e",
    "counterSigned": true
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-07-18T10:25:04Z",
    "verificationMethod": "did:key:z6MkCandidateAgentExample#z6MkCandidateAgentExample",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58aKqExampleCounterSignatureAgentRole"
  }
}
```

## Security & Privacy

The offer discloses verdict, tier, gate outcomes, and evidence digests — audit
metadata, not challenge content; the submission and the answers never leave the
application record. The bilaterality requirement is load-bearing: a credential
one party can mint alone is an assertion, not a relationship, and everything
downstream (delegation policy, revocation, external anchoring) assumes the
relationship reading. Where the outcome is anchored on an external registry via
`ext`, the anchor MUST carry digests and tier only — anchors are evidence,
never authority, and revocation MUST mirror to the same registry (see
[`agent-admission/revoke`](../../revoke/0.1/spec.md)).
