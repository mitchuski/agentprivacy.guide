# Trust-weighted POIs for AR World

**Document ID:** OASIS-H2G2-TRUSTGRAPH-ARWORLD-POI-2026  
**Status:** Spec + Phase A implementation (write path live; `GET /poi/nearby` + Unity overlay merge shipped locally; TrustLink peers still fixture)  
**Date:** 2026-08-12  
**Owner:** Hitchhikers / AR World

**Related:**

| Doc | Role |
|-----|------|
| [README.md](./README.md) | TrustGraph index |
| [BUILD_PLAN.md](./BUILD_PLAN.md) | Three graphs, Mage/Swordsman, adventure suggester §10 |
| [RUNBOOK.md](./RUNBOOK.md) | Bootstrap / card API today |
| [`Docs/Devs/ARWORLD_PHYGITAL_QUEST_DEMO_BUILD_PLAN.md`](../../Docs/Devs/ARWORLD_PHYGITAL_QUEST_DEMO_BUILD_PLAN.md) §3b | Identity growth in the phygital demo |
| Unity `CityPoiDiscovery` | Current local OSM / seed floor (placeholders OK) |
| [ARWORLD_DISCOVERY.md](./ARWORLD_DISCOVERY.md) | **What discovery means** (Witness / camera, partners, Knowledge write) |
| [ARWORLD_POI_WITNESS_PAYLOAD.md](./ARWORLD_POI_WITNESS_PAYLOAD.md) | Exact `POST /poi/witness` payload (city vs quest) |

---

## 1. Objective

City POIs in AR World may stay **placeholders** as the geographic floor. **Discovery** is the witnessed connect rite (see [ARWORLD_DISCOVERY.md](./ARWORLD_DISCOVERY.md)), not merely seeing a pin. TrustGraph makes the map **personal**: places thicken where people you already have a **trust edge** with have **discovered** something, and only where their **promise** allows you to see it.

This is not Yelp. It is not “trending in London.” It is:

> Your nearby map = local floor + discoveries from 1-hop trust peers (Promise-filtered).

Invariant from TrustGraph / privacymage:

- One avatar root.
- **Knowledge** holds full discoveries (Swordsman / shielded).
- **Promise** decides what a peer may see (`public` / `link` / `acquaintance`).
- **Trust** edges (`TrustLinkHolon` / witnessed meet / shared adventure) decide *whose* Knowledge you may query under Promise.
- No central trust score. No Unity-only XP bar.

---

## 2. Product feel

| Layer | What the player sees |
|-------|----------------------|
| **Floor** | Nearby museums, pubs, parks (OSM / seed / demo). Generic markers OK. |
| **Trust overlay** | Same radius, extra or boosted pins with a quiet cue: “From your graph” / peer display name. |
| **Own trail** | Places *you* witnessed always on *your* map (Knowledge → self). |
| **Peek card** | Floor: short placeholder or curated line. Overlay: peer note or “Maya witnessed this · 12 Jun” if Promise allows. |

Desk / orbit cam must still rank **distance first**. Trust never pulls Greenwich onto an Islington viewport.

---

## 3. Holon shapes

### 3.1 `PoiDiscoveryHolon` (Knowledge)

Written when the avatar **witnesses** a place (check-in, seal, hold-to-witness, or explicit “save to trail”). Lives under Swordsman / Knowledge tree (or avatar child with `trustgraph_kind`).

| Field | Type | Notes |
|-------|------|--------|
| `trustgraph_kind` | string | `"PoiDiscovery"` |
| `poiId` | string | Stable id: `london-british-museum`, `poi-osm-node-…`, quest pin id |
| `title` | string | Display name at witness time |
| `placeKind` | string | Museum / Pub / … |
| `lat` / `lon` | double | WGS84 |
| `witnessedUtc` | string | ISO-8601 |
| `source` | string | `city-discover` \| `quest` \| `seed` \| `demo` |
| `note` | string? | Optional one-liner (Promise may strip) |
| `questId` | string? | If witnessed via STAR quest |
| `avatarId` | guid | Owner |

**Not** a GeoNFT mint requirement for v1. Optional later link to WEB4 GeoNFT / STAR inventory.

### 3.2 Promise exposure

Reuse `DisclosurePolicyHolon` audiences:

| Audience | Map behaviour |
|----------|----------------|
| `public` | Title + kind + lat/lon only (no note, no peer chat) |
| `link` | + optional note, peer display name on overlay |
| `acquaintance` | + richer note / “witnessed with” if present |

Mage never returns raw Swordsman conversation about the place. Only fields listed on the policy.

### 3.3 Trust edge (who can query whom)

v1: **1-hop** only.

Sources of edge (any one is enough):

1. Existing `TrustLinkHolon` / meet witness (TrustGraph Phase 5).
2. Shared completed adventure / quest proof (same STAR quest or London registry key).
3. **Phase 0 fixture:** explicit peer list in demo JSON (below) so Unity can ship without live TrustLink writes.

Query rule: peer B’s discoveries appear on avatar A’s map iff:

```text
TrustEdge(A, B) AND DisclosurePolicy(B, audienceForA).allows(PoiDiscovery fields)
```

---

## 4. API (ONODE)

Extend `TrustGraphController` (`/api/trustgraph`). Do not invent a parallel Unity profile store.

### 4.1 Write: record a discovery

```http
POST /api/trustgraph/poi/witness
Authorization: Bearer <jwt>
Content-Type: application/json
```

```json
{
  "poiId": "london-british-museum",
  "title": "British Museum",
  "placeKind": "Museum",
  "lat": 51.5194,
  "lon": -0.1269,
  "source": "city-discover",
  "note": "Rosetta room was packed.",
  "questId": null
}
```

**Behaviour:** Idempotent on `(avatarId, poiId)`. Upserts Knowledge holon. Does not auto-promote to Mage until disclosure policy already allows `PoiDiscovery` for some audience (default: allow title/kind/geo on `link` + `acquaintance`).

### 4.2 Read: trust-weighted nearby

```http
GET /api/trustgraph/poi/nearby?lat=51.5344&lon=-0.1016&radiusM=2200&audience=link
Authorization: Bearer <jwt>
```

**Response:**

```json
{
  "radiusM": 2200,
  "self": [
    {
      "poiId": "demo-poi-8",
      "title": "The Local",
      "placeKind": "Pub",
      "lat": 51.5358,
      "lon": -0.0994,
      "witnessedUtc": "2026-08-12T15:00:00Z",
      "note": null,
      "origin": "self"
    }
  ],
  "fromGraph": [
    {
      "poiId": "poi-osm-node-375848733",
      "title": "Duke of Cambridge",
      "placeKind": "Pub",
      "lat": 51.5346,
      "lon": -0.0987,
      "witnessedUtc": "2026-08-01T18:22:00Z",
      "note": "Good for a quiet pint after the gallery.",
      "origin": "trust",
      "peerAvatarId": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      "peerDisplayName": "Maya",
      "audience": "link"
    }
  ]
}
```

**Server steps:**

1. Resolve 1-hop trust peers for caller (fixture or TrustLink).
2. Load each peer’s `PoiDiscovery` holons within `radiusM`.
3. Mask fields per peer policy for `audience` (or stricter of link/acquaintance).
4. Return `self` + `fromGraph`. No global popularity ranking.

### 4.3 Phase 0 without full TrustLink

Until TrustLink write path exists, allow:

```http
GET /api/trustgraph/poi/nearby?...&fixture=arworld-trust-poi-phase0
```

or config flag `TrustGraph:UsePoiFixture=true` that merges [fixtures/arworld-trust-poi-phase0.json](./fixtures/arworld-trust-poi-phase0.json) as if those peers were linked.

---

## 5. Unity score terms (`CityPoiDiscovery`)

Keep **distance-first** local spawn (`spawnRadiusM` ~ 2.2 km). Add optional overlay after floor enqueue.

| Term | Weight (v1) | Rule |
|------|-------------|------|
| `distance` | Primary sort | Haversine; hard cut at `spawnRadiusM` |
| `hasRealCopy` | Soft −350 m | Curated seed with real narration only |
| `trustOverlay` | +score band | Pin appears in `fromGraph` → boost / distinct marker style |
| `selfWitnessed` | +score band | Pin in `self` → “your trail” style |
| memorial/plaque | Penalty / filter | Unchanged: low-value OSM stay out |

**Marker styles (proposal):**

| Origin | `markerStyle` / visual |
|--------|-------------------------|
| Floor | Existing `discover-*` |
| `fromGraph` | Same kind + gold ring / “graph” badge |
| `self` | Same kind + teal ring |

**Peek card:**

- Floor: curated line or honest placeholder (never `Name. Kind.` echo).
- `fromGraph`: show peer line when Promise allows; else same as floor.
- `self`: “You witnessed this” + your note.

Wire: after `CityPoiDiscovery` local floor, `TrustWeightedPoiClient.FetchNearby` → merge into spawn queue (cap overlay count, e.g. 12) → `TrailPin` with `notes` / MetaData `trustOrigin`, `peerDisplayName`.

Do **not** call TrustGraph on every frame. Cache per session / per cell (same idea as `city-poi-cache`).

---

## 6. Phase 0 fixture (two fake peers)

Checked in: [`fixtures/arworld-trust-poi-phase0.json`](./fixtures/arworld-trust-poi-phase0.json).

| Peer | Role | Discoveries (near Islington demo origin ~51.5344, −0.1016) |
|------|------|--------------------------------------------------------------|
| **Maya** | Gallery / quiet pubs | Japanese Gallery area, Duke of Cambridge, Art Space Gallery |
| **Jon** | Parks / viewpoints | Islington Green pocket, canal-ish viewpoint, a library |

Player “you” in the fixture has one self discovery so Unity can render both rings without live witness API.

Acceptance for Phase 0 (Unity + fixture only, stub HTTP OK):

- [ ] With fixture on, map near Islington shows floor pins **and** at least 2 overlay pins tagged Maya/Jon.
- [ ] Overlay pins are within `spawnRadiusM` of player.
- [ ] Peek on overlay shows peer name when `audience=link`.
- [ ] Fixture off → behaviour equals today’s floor-only CityPOI.
- [ ] No fake “trust score” UI.

---

## 7. Phased delivery

| Phase | Deliverable |
|-------|-------------|
| **0** | This spec + fixture JSON; Unity stub client reading fixture from StreamingAssets or local HTTP mock |
| **1** | `POST /poi/witness` + store holons; Unity calls witness on CityPOI peek “Save” / quest check-in |
| **2** | `GET /poi/nearby` live (fixture peers or real TrustLink); overlay markers + peek copy |
| **3** | Align with TrustGraph Phase 5 meet witness; drop fixture flag for production |
| **4** | Adventure suggester §10 consumes same discoveries (“Maya’s pubs near you”) |

---

## 8. Out of scope (v1)

- Multi-hop graph walk / “friend of friend” spam.
- Public global heatmap of all discoveries.
- Replacing OASIS karma with a map score.
- Showing Swordsman chat about a place on the peek card.
- Auto-following strangers who stood near the same POI.

---

## 9. Open questions

1. Is witness = quest check-in only, or also tap-to-peek “Save to trail”?
2. Default Promise: are discoveries `link`-visible or `acquaintance`-only until the user toggles?
3. Should overlay pins require the peer to be “recent” (e.g. witnessed in last 90 days)?
4. Sharedrops / Launchboard: later, same edge type as cap-table trust (see `Docs/Launchboard/TRUST_GRAPH_CAP_TABLE_SHAREDROPS_WHITEPAPER.md`) without mixing equity into the map UI.

---

## 10. One-line stack

```text
Witness POI → Knowledge holon → Promise mask → 1-hop Trust query
  → GET /poi/nearby → CityPoiDiscovery merge (distance first, trust overlay second)
```
