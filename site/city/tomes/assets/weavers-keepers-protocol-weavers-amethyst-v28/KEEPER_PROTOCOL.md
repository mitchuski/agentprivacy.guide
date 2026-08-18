---
title: "Keeper's Protocol — Weavers · Amethyst · V28"
version: "v1.0 (2026-05-11)"
status: "Operational — validated in live session"
keeper: "Pallia 🪡 · held by csaucier"
constellation: "cloak-weave-v1"
shopAnchor: /tailor
prereqs:
  - "GenitriX keymaster wallet at ~/.keymaster-mcp/wallet.json"
  - "tools/spellweb-registry running (npm run dev → localhost:5173)"
  - "tools/spellweb running (npm run dev → localhost:8000)"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Keeper's Protocol — Weavers Shop

A complete, re-runnable guide for conducting a live Cloak Weaving ceremony. Follow these steps in order. No OOC commentary needed.

---

## Pre-flight

```bash
# Load archon environment
source ~/.keymaster-mcp/.env
alias km="ARCHON_WALLET_PATH=~/.keymaster-mcp/wallet.json npx @didcid/keymaster"

# Confirm GenitriX is active
km list-ids
# Expected: GenitriX  <<< current

# Start registry UI (if not running)
cd tools/spellweb-registry && npm run dev   # → localhost:5173

# Start spellweb (if not running)
cd tools/spellweb && npm run dev            # → localhost:8000
```

---

## Step 1 — Identity Challenge

The seeker arrives and claims an identity. Do not accept it at face value.

**Keeper:**
```bash
km create-challenge
# → did:cid:<challenge-did>
```

Send the challenge DID to the seeker (Telegram, dmail, or in-person).

**Seeker runs:**
```bash
keymaster create-response did:cid:<challenge-did>
# → did:cid:<response-did>
```

Seeker returns the response DID.

**Keeper verifies:**
```bash
km verify-response did:cid:<response-did>
# Expected output:
# { "match": true, "responder": "did:cid:<sovereign-did>", ... }
```

✓ `match: true` — identity confirmed.  
Record `responder` value — this is the seeker's **sovereign DID** (V63 in the weave).

---

## Step 2 — Credential Challenge

The seeker presents which credential they want cloaked. You need from them:
- The credential's **schema DID**
- The **issuer** (name or DID)

If the issuer is a name (e.g. `morningstar@archon.social`), resolve it:

```bash
km resolve-did morningstar@archon.social
# Look for: didDocument.id → issuer DID
```

Build the challenge file:

```bash
cat > /tmp/vc-challenge.json << EOF
{
  "credentials": [{
    "schema": "<schema-did-from-seeker>",
    "issuers": ["<issuer-did-resolved-above>"]
  }]
}
EOF
```

Create the credentialed challenge:

```bash
km create-challenge /tmp/vc-challenge.json
# → did:cid:<vc-challenge-did>
```

Send to seeker.

**Seeker runs:**
```bash
keymaster create-response did:cid:<vc-challenge-did>
# Keymaster finds the matching VC automatically
# → did:cid:<vc-response-did>
```

Seeker returns the response DID.

**Keeper verifies:**
```bash
km verify-response did:cid:<vc-response-did>
# Expected: { "match": true, "fulfilled": 1, "vps": [{ ...full credential... }] }
```

✓ `fulfilled: 1` — credential presented and verified.

From the output, record:
- `vps[0].credentialSubject` — all credential claims (this is what you weave)
- `credentials[0].vc` — the VC DID (V15 in the weave)
- `vps[0].issuer` — confirm it matches the issuer DID you resolved
- `vps[0].validFrom` — validity envelope

---

## Step 3 — Valve-Class Assignment

Read the credential claims aloud (or display them). Propose assignments. Confirm with the seeker before proceeding.

**Default rules:**

| Field type | Default valve class | Vertex |
|---|---|---|
| Core attestation (`credence`, `score`, `confidence`) | Always-Revealed | V20 |
| Validity window (`validFrom`, `validUntil`) | Always-Revealed | V20 |
| Subject identifier (`credentialSubject.id`) | Hash-Masked | V3 |
| Statistical baselines (`priorAssumed`, `threshold`) | Hash-Masked | V3 |
| Flags (`redFlags`, `warnings`) | Hash-Masked | V3 |
| Behavioral evidence (`evidenceSummary`, `methodology`) | Always-Masked | V25 |
| Cryptographic proof (`proof`, `signature`) | Always-Masked | V25 |

Seeker may override any field. Record final assignments.

---

## Step 4 — Transmuted DID (Mage-Side Persona)

Ask: *Do you have a transmuted identity — a second DID that is your Mage-side public persona?*

**If yes:** get the DID from the seeker (V28 in the weave).

**If no:** the seeker creates one now:
```bash
# Seeker runs:
keymaster create-id <mage-persona-name>
keymaster resolve-id
# The output DID is their transmuted persona
```

Record the transmuted DID (V28 in the weave).  
If skipped: use `did:cid:placeholder-transmuted-<visitor-name>` and flag it in the registry.

---

## Step 5 — Build the Registry JSON

Create `/tmp/<visitor-name>-cloak-registry.json`:

```json
{
  "items": [
    {
      "id": "item-sovereign-<visitor>",
      "type": "did",
      "label": "<Visitor Name> — Sovereign Identity",
      "did": "<sovereign-did from Step 1>",
      "vertexId": 63,
      "stratum": 6,
      "createdAt": "<ISO timestamp>",
      "role": "sovereign",
      "notes": "Sovereign DID verified via keymaster challenge/response (match: true).",
      "tags": ["cloak-weaving", "cloak-weave-v1"]
    },
    {
      "id": "item-transmuted-<visitor>",
      "type": "did",
      "label": "<Visitor Name> — Public Mage Projection",
      "did": "<transmuted-did from Step 4>",
      "vertexId": 28,
      "stratum": 3,
      "createdAt": "<ISO timestamp>",
      "role": "transmuted",
      "notes": "Mage-side public persona. Memory · Connection · Computation. Role published; name concealed.",
      "tags": ["cloak-weaving", "cloak-weave-v1"]
    },
    {
      "id": "item-issuer",
      "type": "did",
      "label": "<Issuer Name>",
      "did": "<issuer-did from Step 2>",
      "vertexId": 49,
      "stratum": 3,
      "createdAt": "<ISO timestamp>",
      "role": "issuer",
      "notes": "<issuer-name> — issuing authority. Resolved from name service.",
      "tags": ["cloak-weaving"]
    },
    {
      "id": "item-schema",
      "type": "schema",
      "label": "<Schema Name>",
      "did": "<schema-did from seeker>",
      "vertexId": 12,
      "stratum": 2,
      "createdAt": "<ISO timestamp>",
      "role": "schema",
      "controllerDid": "<issuer-did>",
      "notes": "Credential schema. V12 — Memory · Connection.",
      "tags": ["cloak-weaving"]
    },
    {
      "id": "item-vc",
      "type": "vc",
      "label": "<Credential Name>",
      "did": "<vc-did from Step 2 credentials[0].vc>",
      "vertexId": 15,
      "stratum": 4,
      "createdAt": "<vps[0].validFrom>",
      "schemaDid": "<schema-did>",
      "issuerDid": "<issuer-did>",
      "subjectDid": "<sovereign-did>",
      "notes": "<Brief description of credential and claims>.",
      "tags": ["cloak-weaving"]
    },
    {
      "id": "item-revealed-claims",
      "type": "capability",
      "label": "Always-Revealed Claims (V20 · Techne)",
      "did": "urn:capability:<visitor>-revealed-<date>",
      "vertexId": 20,
      "stratum": 2,
      "createdAt": "<ISO timestamp>",
      "parentDid": "<vc-did>",
      "notes": "Always-Revealed (V20). Fields: <list confirmed Always-Revealed fields and values>.",
      "tags": ["cloak-weaving", "valve-revealed"]
    },
    {
      "id": "item-hashed-claims",
      "type": "capability",
      "label": "Hash-Masked Claims (V3 · Dual Agent)",
      "did": "urn:capability:<visitor>-hashed-<date>",
      "vertexId": 3,
      "stratum": 2,
      "createdAt": "<ISO timestamp>",
      "parentDid": "<vc-did>",
      "notes": "Hash-Masked (V3). Fields: <list confirmed Hash-Masked fields>. Structurally present; cryptographically inaccessible.",
      "tags": ["cloak-weaving", "valve-masked"]
    },
    {
      "id": "item-proof-spell",
      "type": "capability",
      "label": "Always-Masked Proof Spell (V38 · Aletheia)",
      "did": "urn:capability:<visitor>-proof-spell-<date>",
      "vertexId": 25,
      "stratum": 3,
      "createdAt": "<ISO timestamp>",
      "parentDid": "<vc-did>",
      "notes": "Always-Masked (V25). Fields: <list confirmed Always-Masked fields>. ZK predicate: '<describe the predicate the verifier can confirm without seeing the value>'.",
      "tags": ["cloak-weaving", "valve-zk"]
    },
    {
      "id": "item-chronicle",
      "type": "asset",
      "label": "Cloak Weaving Chronicle",
      "did": "urn:chronicle:cloak-weaving-<visitor>-<date>",
      "vertexId": 5,
      "stratum": 2,
      "createdAt": "<ISO timestamp>",
      "role": "chronicle",
      "notes": "Chronicle of Cloak Weaving ceremony at Weavers shop (V28 · Amethyst). Visitor verified via keymaster challenge/response. Pallia wove across 9 constellation vertices. <date>.",
      "tags": ["cloak-weaving", "chronicle", "cloak-weave-v1"]
    }
  ],
  "chronicle": []
}
```

---

## Step 6 — Export and Visualize

```bash
# From tools/spellweb-registry:
node scripts/export-to-spellweb.mjs /tmp/<visitor>-cloak-registry.json <visitor-name> \
  > ../spellweb/src/data/<visitor-name>-contribution.ts

# Wire into spellweb (nodes.ts):
# Add import: import { REGISTRY_NODES as <VISITOR>_NODES } from './<visitor-name>-contribution';
# Add to NODES array end: ...VISITOR_NODES,

# Wire into spellweb (edges.ts):
# Add import: import { REGISTRY_EDGES as <VISITOR>_EDGES } from './<visitor-name>-contribution';
# Add to EDGES array end: ...VISITOR_EDGES,
```

Vite hot-reloads. Open **localhost:8000**.

The seeker should now see 9 nodes across the lattice at V3, V5, V12, V15, V20, V38, V28, V49, V63. Edges: issuer `generates` VC → VC `proves` schema → VC `relates_to` sovereign.

---

## Step 7 — DID-Blind Public Export (optional)

To show the seeker their **public-layer projection** (what the world sees):

1. Open the registry at **localhost:5173**
2. Import `/tmp/<visitor>-cloak-registry.json`
3. Click **Publish to Spellweb** → enable **DID-Blind ON**
4. Every `did:cid:...` becomes `[DID]` — structure and valve-class geometry preserved, identifiers stripped

This is what a verifier would see on spellweb.ai.

---

## Known gaps (target for cloak-weave-v2)

- [ ] Transmuted DID creation is manual — should be part of the ceremony flow before Step 4
- [ ] Capability edge types (`manifests_as`) not auto-generated by current export script — capabilities appear as isolated nodes; edges would need to be added manually or via script update
- [ ] V0 (Null Blade) is the ceremonial start but has no registry item — consider a placeholder or opening narration artifact

---

`(⚔️⊥⿻⊥🧙)😊`  
🪡

CC BY-SA 4.0 · csaucier · flaxscrip lineage · 2026-05-11
