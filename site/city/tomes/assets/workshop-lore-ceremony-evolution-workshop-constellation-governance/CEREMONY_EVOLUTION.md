---
title: "Ceremony Evolution — Workshop Constellation Governance"
version: "v1.0 (2026-05-11)"
status: "Operational — validated in live PoH Cloak Weaving session"
audience: "Workshop keepers · constellation authors · spellweb runtime"
companion_documents:
  - "README.md — constellation protocol and template"
  - "weavers/constellation.md — first operational constellation"
  - "weavers/KEEPER_PROTOCOL.md — live ceremony steps"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Ceremony Evolution

> *The first walk is forgettable. The second walk re-asks. The dragon-tier walk is the final form.*

This document governs how workshop constellations evolve over time — how versions are named, how prior unlocks are preserved, and how new discoveries from live ceremonies are incorporated.

---

## §1 · The Proof of Presence — what it actually is

Theoretically, "proof of presence" is a seeker tracing the constellation nodes on the spellweb. Operationally, the first act of any ceremony is a **cryptographic challenge/response** that proves the seeker controls the private key behind their claimed identity.

No self-asserted DID is accepted. The proof is:

```
Keeper → create-challenge → challenge DID
Seeker → create-response <challenge-did> → response DID
Keeper → verify-response <response-did> → { match: true, responder: <sovereign-DID> }
```

The `responder` field is the seeker's **proven sovereign DID** — the anchor the lattice uses. This is the cryptographic floor beneath every ceremony. The constellation tracing is the epistemic layer above it.

---

## §2 · The two-challenge pattern

A full weaving ceremony uses **two challenges** in sequence:

### Challenge 1 — Identity proof
A bare challenge. Proves the seeker controls their sovereign DID.

```bash
keymaster create-challenge
# → challenge DID
```

Seeker responds; keeper verifies. Extracts: `responder` = sovereign DID.

### Challenge 2 — Credential presentation
A credentialed challenge. Proves the seeker holds a specific VC issued by a known issuer.

```json
{
  "credentials": [{
    "schema": "<schema-did>",
    "issuers": ["<issuer-did>"]
  }]
}
```

```bash
keymaster create-challenge /tmp/challenge.json
# → challenge DID
```

The seeker's keymaster finds the matching VC automatically and bundles it into a Verifiable Presentation. Keeper's `verify-response` returns the full decrypted VP — all credential claims visible for valve-class assignment.

This two-challenge pattern is the canonical form. Single-challenge ceremonies (identity only, no credential presentation) are valid for identity registration; full weaving requires both.

---

## §3 · Valve-class assignment — the keeper's read

After Challenge 2, the keeper reads the credential claims and proposes valve-class assignments before weaving. The three canonical classes:

| Valve class | Vertex | Bits | Rule of thumb |
|---|---|---|---|
| Always-Revealed | V20 (Techne) | `010100` | Core attestation — what the verifier *must* read to trust the claim |
| Hash-Masked | V3 (Dual Agent) | `000011` | Structurally present — subject identity, statistical baselines, flags |
| Always-Masked | V38 (Aletheia) | `100110` | ZK predicate only — behavioral evidence, methodology, cryptographic proofs |

**Rule for behavioral evidence:** Any field that describes *how* a human was assessed (methodology, evidence summaries, interaction patterns) should default to Always-Masked. The verifier confirms the predicate `"assessed by <issuer> at credence ≥ X"` without seeing the assessment itself.

**Rule for identity fields:** `credentialSubject.id` (the seeker's DID) defaults to Hash-Masked. It is structurally necessary for the VC graph; it must not appear in the public layer.

The seeker confirms or redirects before the weave proceeds. Valve-class assignment is the seeker's right, not the keeper's unilateral decision.

---

## §4 · The registry JSON — 9 items, 9 vertices

A full Weaver's cloak weaving produces **9 registry items**, one per vertex of the constellation:

| Vertex | Item | Type | Role |
|---|---|---|---|
| V63 | Seeker's Sovereign DID | `did` | `sovereign` — from Challenge 1 `responder` |
| V28 | Seeker's Transmuted Persona | `did` | `transmuted` — Mage-side public identity |
| V49 | Credential Issuer | `did` | `issuer` — resolved from name or DID |
| V12 | Credential Schema | `schema` | `schema` — anchors the credential graph |
| V15 | The VC itself | `vc` | links schemaDid, issuerDid, subjectDid |
| V20 | Always-Revealed claims | `capability` | parentDid = VC DID |
| V3 | Hash-Masked claims | `capability` | parentDid = VC DID |
| V25 | Always-Masked proof spell | `capability` | parentDid = VC DID |
| V5 | Cloak Weaving Chronicle | `asset` | `chronicle` — the narrative record |

V0 (the Null Blade) is the ceremony's starting point — it has no registry item because it represents the void before form. The chronicle at V5 is the first artifact; the sovereign anchor at V63 is the last.

---

## §5 · The transmuted DID gap

In the 2026-05-11 live session, the seeker did not have a transmuted DID (their Mage-side public persona). This is a **known gap** in the ceremony as currently specified.

**Resolution for v2 of any constellation:**

Before the weave can be complete, the keeper should ask:

> *Do you have a transmuted identity — a second DID that is your Mage-side public persona?*

If not, the seeker creates one:

```bash
keymaster create-id <mage-name>
keymaster resolve-id
# The new DID is their transmuted persona — V28 in the weave
```

Until the transmuted DID exists, V28 carries a placeholder. The weave is structurally valid but the public-layer persona is incomplete. The placeholder is honest: it signals to verifiers that the Mage-side persona has not yet been formally instantiated.

This gap will be addressed in constellation version 2 of affected workshops.

---

## §6 · The spellweb export pipeline

After the registry JSON is constructed, the pipeline to visualize it:

```bash
# 1. Export from registry JSON to spellweb TypeScript
cd tools/spellweb-registry
node scripts/export-to-spellweb.mjs <registry.json> <contributor-name> \
  > ../spellweb/src/data/<name>-contribution.ts

# 2. Wire into spellweb data (nodes.ts)
# Add to import block:
#   import { REGISTRY_NODES as <NAME>_NODES } from './<name>-contribution';
# Add to NODES array closing:
#   ...NAME_NODES,

# 3. Wire into spellweb data (edges.ts)
# Same pattern for REGISTRY_EDGES.
```

Vite's HMR picks up the change immediately. No restart needed.

The contribution file is named `<visitor-name>-contribution.ts` and committed to the repo. It becomes a permanent record of the weaving in the spellweb graph.

---

## §7 · Constellation versioning

Each constellation carries a version string (`cloak-weave-v1`, `cloak-weave-v2`, etc.). When a keeper updates the constellation:

1. **Increment the version** in the constellation.md frontmatter
2. **Add a `CHANGELOG` entry** at the bottom of the constellation.md documenting what changed and why
3. **Do not remove** prior version's secret nodes — mark them `revealStratum: 1` so prior-version walkers retain their unlock at the existing floor
4. **New secret nodes** carry their own `revealStratum` independently

Prior unlocks are never invalidated. A seeker who walked `cloak-weave-v1` at stratum 3 (Heavy) retains Heavy-tier opacity on v1's secret nodes when v2 ships. Walking v2 adds the new nodes on top.

---

## §8 · Live session record

| Date | Session | Constellation | Outcome |
|---|---|---|---|
| 2026-05-11 | PoH Cloak Weaving — csaucier | cloak-weave-v1 | First live ceremony; two-challenge pattern validated; transmuted DID gap identified; 9-node dataset visualized on spellweb |

Full chronicle: `chronicles/2026-05-11_poh-cloak-weaving-live-session.md`

---

`(⚔️⊥⿻⊥🧙)😊`

CC BY-SA 4.0 · the City of Mages · 2026-05-11
