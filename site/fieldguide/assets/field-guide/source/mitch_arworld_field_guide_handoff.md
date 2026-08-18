# Hitchhikers Field Guide × TrustGraph: handoff for Mitch

**For:** Mitchell Travers (trust graphs) and any agent working with him  
**From:** Max / Field Guide (Unity AR World) + OASIS ONODE work in this repo  
**Date:** 2026-08-15  
**Ask:** Read this first. Then propose what should change in the **graph layer** (Knowledge / Promise / Trust) so the Field Guide overlay is real 1-hop trust, not a fixture forever.

This is a collaboration pack, not a dump of the whole OASIS monorepo.

---

## 0. How to use this document

| If you are… | Do this |
|-------------|---------|
| **Mitch (human)** | Read §1–§4 and §10 (what we want from you). Skim APIs in §6. |
| **Mitch’s agent** | Read the whole file. Follow §11 invariants. Open the linked specs before editing ONODE. Do **not** add Photon, a friends DB, or a second profile store. |
| **Max / Field Guide agent** | Unity lives in `_inspect_ARWorld` (nested git). ONODE + this folder live in `OASIS_CLEAN`. |

**Live ONODE (Railway):** `https://motivated-reflection-production-457c.up.railway.app`  
Service name: `motivated-reflection`. JWT: `POST /api/avatar/authenticate`.

---

## 1. One paragraph (product)

Field Guide is a walking AR client. Players do **not** share a Photon room. They share the **physical world** and an OASIS avatar. “Multiplayer” means: you Witness a place, that fact lands in **Knowledge**, **Promise** decides what a peer may see, **Trust** decides whose Knowledge you may query. The map then shows a quiet overlay (“Maya was here”), not live avatars.

Discovery is **not** seeing an OSM pin. Discovery is a **Witness rite** (GPS in radius + desk Witness / camera Fetch / parish Seal / omen Banish). Peeking a card is encounter only.

This matches privacymage / City of Mages: one avatar root, Swordsman (full context) vs Mage (projection), no central trust score.

---

## 2. What we just built (Aug 13–15, 2026)

Shipped so Field Guide can **write** discoveries and **read** a Phase 0 overlay. TrustLink (real “we met”) is **not** live in the game. Overlay peers today are a **fixture** (Maya / Jon near Islington).

| Layer | Status | Notes |
|-------|--------|--------|
| **P0** Witness payload contract | Done | [ARWORLD_POI_WITNESS_PAYLOAD.md](./ARWORLD_POI_WITNESS_PAYLOAD.md) |
| **P1** `POST /api/trustgraph/poi/witness` | Done + Railway | Idempotent `(avatarId, poiId)`. Curl: first `created: true`, second `created: false`, `witnessCount` increments. |
| **P2** Unity write client | Done (Editor) | `TrustGraphPoiWitnessClient` after check-in. Fire-and-forget. No JWT → local stamp only. |
| **P3** City Attraction WITNESS ★ | Done (Editor) | In-range tap uses the same rite as quest pins. Out of range: peek only. |
| **Phase A** `GET /api/trustgraph/poi/nearby` | Implemented; Railway deploy in flight / verify | Self from live `PoiDiscovery` holons + fixture `fromGraph`. |
| **Phase A Unity overlay** | Implemented locally | Gold ring = peer, teal = self. Cap 12. Distance-first. |
| **Phase B** Mage share after Witness | Started in Unity | `WitnessShareOverlay` + `TrustGraphShareClient` → existing `GET /card/{tokenSlug}`. |
| **Phase E** TrustLink / Meet QR | Not in Field Guide | Spec in [BUILD_PLAN.md](./BUILD_PLAN.md) Phase 5. This is the main gap we want you on. |
| **Phase F** Live player dots | Explicitly later | Do not start. |

Unity Editor smoke of overlay (A6) still wants origin ~ Islington `51.5344, -0.1016` and a JWT.

---

## 3. Three graphs, mapped onto the game

| Graph | In the Field Guide | Holon / API today |
|-------|--------------------|-------------------|
| **Knowledge** | Places *you* Witnessed | `PoiDiscovery` holon, `trustgraph_kind=PoiDiscovery`. Parent = Swordsman if TrustGraph bootstrapped, else avatar. |
| **Promise** | What a peer’s peek may show | `audience=public\|link\|acquaintance` on nearby. Public strips notes. **We do not yet attach a per-holon DisclosurePolicy to each discovery.** Card still uses bootstrap disclosure tokens (`max-public`, `max-link`). |
| **Trust** | Whose Knowledge appears on *your* map | Phase A: fixture edges. Target: 1-hop `TrustLinkHolon` / witnessed meet / shared quest proof. |

**Query rule we want (spec, not fully live):**

```text
TrustEdge(A, B) AND DisclosurePolicy(B, audienceForA).allows(PoiDiscovery fields)
```

Fixture is a stand-in for the left-hand side until Meet exists.

---

## 4. Map layers (do not collapse)

| Layer | What the player sees | Source |
|-------|----------------------|--------|
| **Floor (presence)** | Generic museums, pubs, Attractions | OSM Overpass + London seed. `CityPoiDiscovery`. |
| **Quest / trail** | Murder Stones, Cathedrons, authored GeoJSON | `StreamingAssets/trails/*.geojson` (same contract as Our World Lite). |
| **STAR drops** | Shared GeoNFTs | `StarNearbyClient` (separate from Trust overlay). |
| **Trust overlay** | Extra / boosted pins from graph | `GET .../poi/nearby` → merge after floor. |
| **Your trail** | Places you Witnessed | Nearby `self` + local `FieldPassport` cache. |

Witness **does not spawn** OSM. It records a connection to a pin that already has a stable `poiId`.

FedWiki is **lore**, not the POI database. See §8.

---

## 5. The Witness pipeline (do not fork)

```text
In GPS radius of TrailPin
  → TrailCapturePrompt (desk WITNESS ★ / V, or phone Fetch)
  → QuestCheckInBridge (STAR progress if quest + JWT)
  → calm celebration (does not wait on HTTP)
  → TrustGraphPoiWitnessClient POST /poi/witness
  → FieldPassport.StampPlace (local cache)
  → optional WitnessShareOverlay (Mage URL)
```

City Attractions use the **same** path when in range. Omens use rite `banish`. Parish pins use `seal`.

**Invariant for agents:** Camera Fetch **or** Desk Witness → `TryConsumePending` → `NotifyCheckIn` → TrustGraph POST. Do not invent a second “save to trail” that skips the rite.

---

## 6. APIs (ONODE TrustGraphController)

Base: `/api/trustgraph`  
Controller: `ONODE/NextGenSoftware.OASIS.API.ONODE.WebAPI/Controllers/TrustGraphController.cs`

| Method | Path | Auth | Role |
|--------|------|------|------|
| POST | `/bootstrap` | JWT | PrivacyAgent + Swordsman/Mage + disclosure slugs |
| GET | `/state` | JWT | Bootstrap ids for listener / Unity share |
| GET | `/card/{tokenSlug}` | No | Mage projection (share card JSON) |
| POST | `/poi/witness` | JWT | **Write discovery** (Field Guide) |
| GET | `/poi/nearby` | JWT | **Read overlay** (`self` + `fromGraph`) |
| POST | `/witness` | (planned Phase 5) | **Meet / TrustLink**, not a place. Different from `/poi/witness`. |

### 6.1 POST `/poi/witness`

Avatar from JWT only. Idempotent on `(avatarId, poiId)`.

Required JSON: `poiId`, `title`, `placeKind`, `lat`, `lon`, `source`  
`source`: `city-discover` \| `quest` \| `seed` \| `demo` \| `partner`  
Optional: `questId`, `questPinRole`, `trail`, `wikiSlug`, `markerStyle`, `rite`, `note`, `client`, `witnessedUtc`

`rite`: `desk-witness` \| `camera-fetch` \| `seal` \| `banish`

**Stable `poiId`:** use the pin id the client spawned. OSM `poi-osm-{type}-{id}`, seed `london-{slug}`, quest GeoJSON id as-is (`sailors-stone`). Do not mint a second id.

Response: `{ ok, poiId, holonId, witnessedUtc, witnessCount, created }`

Curl (runbook §7): [RUNBOOK.md](./RUNBOOK.md).

### 6.2 GET `/poi/nearby`

```http
GET /api/trustgraph/poi/nearby?lat=51.5344&lon=-0.1016&radiusM=2200&audience=link&fixture=arworld-trust-poi-phase0
Authorization: Bearer <jwt>
```

- **self:** caller’s `PoiDiscovery` holons in radius (Haversine). If none, fixture may seed a demo self pin for desk demos.
- **fromGraph:** Phase A = fixture peers only (Maya, Jon).
- `audience=public` strips notes.
- Config: `TrustGraph:UsePoiFixture` in `appsettings.json` (default true).
- Fixture file: `ONODE/.../Fixtures/arworld-trust-poi-phase0.json` (copy of [fixtures/arworld-trust-poi-phase0.json](./fixtures/arworld-trust-poi-phase0.json)).

Unity always sends `fixture=arworld-trust-poi-phase0` while `TrustWeightedPoiClient.RequestPhase0Fixture` is true.

### 6.3 Name collision (please keep)

| Path | Meaning |
|------|---------|
| `/poi/witness` | I connected with a **place** |
| `/witness` | I connected with a **person** (TrustLink) |

---

## 7. Unity Field Guide (`_inspect_ARWorld`)

**Editor:** Unity 2021.3.29f1. Scene `UnityWorldSpace`. Package `com.hitchhikers.fieldguide`. Portrait Game view for desk tests. Nested git (Kashif ARWorld); Field Guide scripts are dirty local work, not always in OASIS_CLEAN commits.

Cursor often under-indexes this tree. Agents should use absolute paths / shell.

### 7.1 Files that matter to TrustGraph

| File | Role |
|------|------|
| `Assets/_Game/Scripts/Trails/TrustGraphPoiWitnessClient.cs` | POST witness |
| `Assets/_Game/Scripts/Trails/TrustWeightedPoiClient.cs` | GET nearby → `List<TrailPin>` (cap 12) |
| `Assets/_Game/Scripts/Trails/TrustGraphShareClient.cs` | Bootstrap/state + Mage URL |
| `Assets/_Game/Scripts/Trails/WitnessShareOverlay.cs` | One-tap share after first Witness this session |
| `Assets/_Game/Scripts/Trails/QuestCheckInBridge.cs` | STAR + starts witness coroutine |
| `Assets/_Game/Scripts/Trails/TrailCapturePrompt.cs` | Rite gate (desk vs Fetch) |
| `Assets/_Game/Scripts/Trails/CityPoiDiscovery.cs` | OSM/seed floor; `MergeTrustOverlay` |
| `Assets/_Game/Scripts/Trails/CityPoiPeekOverlay.cs` | Peek: WITNESS ★ in range; `FROM {PEER}` / `YOUR TRAIL` |
| `Assets/_Game/Scripts/Trails/TrailPin.cs` | Pin contract + `trustOrigin`, `peerDisplayName`, `peerAvatarId`, `wikiSlug` |
| `Assets/_Game/Scripts/Trails/TrailPinMarkerBuilder.cs` | Gold ring peer, teal self |
| `Assets/_Game/Scripts/NFTHotspot/NFTHotspot.cs` | World marker; `ToTrailPin` / `ApplyTrailPin` |
| `Assets/_Game/Scripts/Helpers/OasisSession.cs` | JWT prefs |
| `Assets/_Game/Scripts/Config/OasisApiConfig.cs` | OASIS base URL, `wikiBaseUrl`, Mage share URL |

Passport (`FieldPassport`) is **PlayerPrefs cache**. Server is source of truth after 2xx.

`FieldGuideNearbyStrip` (POI chip overlay) is **disabled** in build after a device UX regression. Trust overlay is map markers, not that strip.

### 7.2 `TrailPin` join fields

Shared with Our World Lite GeoJSON:

`id`, `title`, `lat`, `lon`, `radiusM`, `questRole`, `trail`, `wikiSlug`, `place`, `markerStyle`, plus trust: `trustOrigin` (`self` \| `trust` \| floor empty), `peerDisplayName`, `peerAvatarId`, `trustAudience`.

---

## 8. FedWiki (Dave) vs TrustGraph (Mitch)

**Not a two-way wiki sync.** Dave’s farm does not scrape into Mongo. The game does not write journal pages on every Witness (explicitly later; would spam the neighborhood).

```text
Dave: FedWiki page (slug) + trail GeoJSON (pin.id + wikiSlug)
Mitch: Knowledge holon (poiId + optional wikiSlug) + Promise + Trust
Game: pulls GeoJSON, Witnesses, POSTs holon, GETs overlay
```

Join keys:

- **Space:** `poiId` = GeoJSON / OSM / seed id  
- **Story:** `wikiSlug` → `{wikiBase}/view/{slug}` (Unity `OasisApiConfig.wikiBaseUrl`, default local farm)

City floor pins currently use generic `wikiSlug: city-discover`. Authored stones (e.g. `sailors-stone`) have real pages. Partner venues should remap later (`venue-…`) without Unity inventing a second id.

Optional later two-way: **fork** a stub page after Witness that links the canonical slug. That is Dave’s neighborhood model, not an overwrite API.

Dave-facing lore note (existing): `Hitchhikers/work/02-fedwiki-workflow/OUR_WORLD_QUESTS_FOR_DAVID.md`.

---

## 9. Related specs (read in this order)

1. This handoff  
2. [ARWORLD_DISCOVERY.md](./ARWORLD_DISCOVERY.md)  
3. [ARWORLD_POI_WITNESS_PAYLOAD.md](./ARWORLD_POI_WITNESS_PAYLOAD.md)  
4. [ARWORLD_TRUST_WEIGHTED_POI.md](./ARWORLD_TRUST_WEIGHTED_POI.md)  
5. [BUILD_PLAN.md](./BUILD_PLAN.md) (three graphs, Mage/Swordsman, Phase 5 TrustLink)  
6. [RUNBOOK.md](./RUNBOOK.md) (curl bootstrap / witness / nearby)  
7. Field Guide sequencing: `Docs/Devs/ARWORLD_MULTIPLAYER_BUILD_PLAN.md`  
8. Phase A implementation notes: `Docs/Devs/AGENT_BRIEF_ARWORLD_MULTIPLAYER_PHASE_A.md`  
9. Desk smoke: `Docs/Devs/ARWORLD_PHASE_A_TRUST_OVERLAY_SMOKE.md`  
10. Protocol: `privacymage-integration/docs/OASIS_PROTOCOL_BINDING.md`  
11. City of Mages: `Hitchhikers/CITY_OF_MAGES_INTEGRATION.md`

---

## 10. What we want you to propose (the actual ask)

Please treat the Field Guide as a **client of your graphs**, and propose the smallest honest next graph work. We are not asking you to own Unity HUD.

**Open problems (we know these are weak):**

1. **Fixture vs live Trust.** `fromGraph` is Maya/Jon JSON. How should 1-hop edges actually be created for two Hitchhikers who meet in London (QR / NFC / code / shared quest proof)? What is the holon shape so nearby can drop the fixture flag?

2. **Promise on discoveries.** Nearby only strips notes for `public`. Spec wants DisclosurePolicy per audience on `PoiDiscovery` fields. Should Mage project title/kind/geo on `link` by default? How do we avoid leaking `questId` / notes?

3. **Self list / passport.** Unity stamps locally. Nearby `self` is the sync path (our P4). Anything missing on the holon for a reinstall to restore “places I Witnessed”?

4. **Id remap.** Partner claims an OSM node. Client still sends `poi-osm-…`. Alias table vs new `poiId`? Field Guide must not invent ids.

5. **Mage card vs place proof.** Share CTA opens the **person** card (`/card/{slug}`), not a per-place page. Is a place-level Mage projection needed, or is person card + FedWiki slug enough?

6. **Shared quest as Trust edge.** Murder Stones complete on both avatars: is that enough 1-hop for overlay without a Meet ceremony?

7. **Swordsman parent.** We parent new discoveries under Swordsman when bootstrap exists. Is that the right Knowledge home?

**Please do not propose:** Photon presence, a Unity XP bar, scraping FedWiki into OASIS, auto-Witness on walk-by, or a Yelp ranking of Attractions.

A useful reply from you or your agent: a short counter-spec (holons + 1–2 endpoints) that replaces A2 fixture for a two-avatar desk demo, plus what Field Guide must send that we do not send yet.

---

## 11. Invariants for Mitch’s agent

- One OASIS avatar. JWT is identity.  
- Knowledge × Promise × Trust. No central score.  
- `/poi/witness` = place. `/witness` = person.  
- Idempotent place write on `(avatarId, poiId)`.  
- Distance-first map. Overlay must not pull Greenwich into an Islington viewport.  
- Cap overlay count (Unity: 12).  
- Peek never shows raw Swordsman chat.  
- Unity local prefs are cache.  
- Do not disable `UsePoiFixture` in production until live edges exist (empty `fromGraph`).  
- Do not start Phase F (heartbeat / nearby avatars) until A–D have been playtested.  
- Prefer extending `TrustGraphController` over a parallel Unity profile API.

---

## 12. Suggested agent prompt (paste)

```text
You are collaborating with Hitchhikers Field Guide on TrustGraph.
Read Hitchhikers/TrustGraph/MITCH_ARWORLD_FIELD_GUIDE_HANDOFF.md first,
then ARWORLD_TRUST_WEIGHTED_POI.md and BUILD_PLAN.md Phase 5.

Field Guide already POSTs /api/trustgraph/poi/witness and GETs /poi/nearby
with a Phase 0 fixture for fromGraph. Propose (and optionally implement on
ONODE only) live 1-hop Trust so nearby can stop using the Maya/Jon fixture.
Do not add Photon, friends lists, or FedWiki scrapers.
Keep /poi/witness vs /witness (meet) distinct.
```

---

## 13. Quick file map

```text
Hitchhikers/TrustGraph/
  MITCH_ARWORLD_FIELD_GUIDE_HANDOFF.md   ← this file
  ARWORLD_DISCOVERY.md
  ARWORLD_POI_WITNESS_PAYLOAD.md
  ARWORLD_TRUST_WEIGHTED_POI.md
  BUILD_PLAN.md
  RUNBOOK.md
  fixtures/arworld-trust-poi-phase0.json

ONODE/.../WebAPI/
  Controllers/TrustGraphController.cs    POST poi/witness, GET poi/nearby, bootstrap, card
  Models/TrustGraph/PoiWitness*.cs, PoiNearbyResponse.cs
  Fixtures/arworld-trust-poi-phase0.json
  appsettings.json                       TrustGraph:UsePoiFixture

_inspect_ARWorld/Assets/_Game/Scripts/Trails/
  TrustGraphPoiWitnessClient.cs
  TrustWeightedPoiClient.cs
  TrustGraphShareClient.cs
  WitnessShareOverlay.cs
  CityPoiDiscovery.cs
  QuestCheckInBridge.cs
```

---

## 14. Test snippets

Witness (idempotent):

```bash
export OASIS_API_URL="https://motivated-reflection-production-457c.up.railway.app"
# OASIS_JWT from POST /api/avatar/authenticate

curl -s -X POST "$OASIS_API_URL/api/trustgraph/poi/witness" \
  -H "Authorization: Bearer $OASIS_JWT" \
  -H "Content-Type: application/json" \
  -d '{"poiId":"london-british-museum","title":"British Museum","placeKind":"Museum","lat":51.5194,"lon":-0.1270,"source":"city-discover","rite":"desk-witness","client":"field-guide-unity"}'
```

Nearby (Islington fixture):

```bash
curl -s "$OASIS_API_URL/api/trustgraph/poi/nearby?lat=51.5344&lon=-0.1016&radiusM=2200&audience=link&fixture=arworld-trust-poi-phase0" \
  -H "Authorization: Bearer $OASIS_JWT"
```

Expect `fromGraph` peer display names Maya / Jon until live Trust replaces the fixture.
