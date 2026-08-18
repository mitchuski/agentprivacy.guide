# What “discovery” means in AR World

**Document ID:** OASIS-H2G2-ARWORLD-DISCOVERY-2026  
**Status:** Product definition (spec)  
**Date:** 2026-08-12  
**Owner:** Hitchhikers / AR World

**Related:**

| Doc | Role |
|-----|------|
| [ARWORLD_TRUST_WEIGHTED_POI.md](./ARWORLD_TRUST_WEIGHTED_POI.md) | Trust overlay on the map (who else’s discoveries you see) |
| [ARWORLD_POI_WITNESS_PAYLOAD.md](./ARWORLD_POI_WITNESS_PAYLOAD.md) | Exact witness JSON for city discover vs quest (Unity → ONODE) |
| [`Docs/Devs/LOCAL_BUSINESS_HOLON_AND_STORY_RELEASE_DNA.md`](../../Docs/Devs/LOCAL_BUSINESS_HOLON_AND_STORY_RELEASE_DNA.md) | Partner venues + story releases |
| [`Docs/Devs/ARWORLD_PHYGITAL_QUEST_DEMO_BUILD_PLAN.md`](../../Docs/Devs/ARWORLD_PHYGITAL_QUEST_DEMO_BUILD_PLAN.md) | Phygital demo spine |
| Fixture | [`../quest-packs` →](../../Docs/Devs/quest-packs/murder-stones-business-story-fixture.json) Punch Bowl waystation |

---

## 1. One sentence

**Discovery is not seeing a pin.**  
**Discovery is a witnessed connection with a place** (and optionally its steward), recorded on your avatar’s Knowledge graph, shareable only under Promise, and usable by Trust peers on their maps.

Map density (OSM / seed) is the **floor**. Discovery is the **act**.

---

## 2. Three layers (do not conflate)

| Layer | What it is | Player experience today |
|-------|------------|-------------------------|
| **Presence** | A place exists on the map near you | CityPOI / seed / quest pin |
| **Encounter** | You are in range and the game asks for attention | Proximity → capture / Witness CTA |
| **Discovery** | You complete a meaningful connect rite; Knowledge updates | Check-in + (phone) camera Fetch; TrustGraph `PoiDiscovery` (planned) |

Peeking a card is **encounter**, not discovery.  
Walking past a placeholder pub is **presence**, not discovery.

---

## 3. The connect rite (what “meaningfully connecting” is)

Minimum viable discovery (v1):

```text
In radius of a Place
  → Capture / Witness (proof you showed up)
  → Knowledge: PoiDiscoveryHolon (you ↔ place)
  → Optional: inventory key / story beat / redeemable offer
  → Mage may project a thin mark under Promise
```

Stronger discovery (partner place):

```text
Same as above
  + Place is a LocalBusinessHolon / VenueHolon (claimed steward)
  + Optional StoryRelease unlock or till redeem (“show witness”)
  + Steward can see aggregate visits (Promise-scoped), not your Swordsman chat
```

Trust-graph discovery (social):

```text
Your discovery (Knowledge)
  → visible to 1-hop Trust peers if Promise allows
  → their map gets a trust overlay pin (“Maya was here”)
```

That is the loop in [ARWORLD_TRUST_WEIGHTED_POI.md](./ARWORLD_TRUST_WEIGHTED_POI.md).

---

## 4. Camera / NFT capture: where it already lives

Phone path was built for hotspot “Fetch” and is already wired as the **mobile** side of trail witness.

| Piece | Path | Role |
|-------|------|------|
| Proximity → request | `TrailHotspotSpawner` / `NFTHotspot` → `TrailCapturePrompt.Request` | Arms capture when in radius |
| Desk / Editor | `TrailCapturePrompt` + `ActiveQuestHud` Witness / **V** | Simulates capture without webcam |
| Phone camera UI | `UIManager.cameraPopUp` | Opens camera shell |
| Webcam + Fetch panel | `_inspect_ARWorld/Assets/NFTFetchController.cs` | `onCameraBtnClicked` → WebCamTexture → `NFTFetchPopUp` |
| Confirm Fetch | `NFTFetchController.OnFetchButtonClicked` → `UIManager.onFetchBtnClicked()` | Legacy collect; must also consume `TrailCapturePrompt` + `QuestCheckInBridge` |
| Quest progress | `QuestCheckInBridge.NotifyCheckIn` | STAR / local Order / bag |

**Invariant going forward:** one confirm path.

```text
Camera Fetch success  OR  Desk Witness
        ↓
TrailCapturePrompt.TryConsumePending
        ↓
QuestCheckInBridge.NotifyCheckIn
        ↓
(+ planned) POST /api/trustgraph/poi/witness
```

Desk must not be a second meaning of discovery. It is the same rite without a lens.

**Gap to close:** ensure `UIManager.onFetchBtnClicked` always runs the trail pending-pin bridge when `TrailCapturePrompt.PendingPin` is set (not only legacy hotspot disable / particles). Root cause: one witness pipeline, two UI skins (camera vs hold-to-Witness).

---

## 5. What you get when you discover (player-facing)

| Outcome | Quest pin | City discover pin | Partner venue |
|---------|-----------|-------------------|---------------|
| Mark on *your* map trail | ✓ | ✓ | ✓ |
| TrustGraph Knowledge (`PoiDiscovery`) | ✓ (planned) | ✓ (planned) | ✓ (planned) |
| Story / key in bag | Often | Rare / optional note | Optional StoryRelease |
| Redeem at till | Rare | No | Yes (offer requires witness proof) |
| Appears on peers’ trust overlay | If Promise allows | Same | Same |

Discovery always answers: **“I was here, for this place, as this avatar.”**  
It does not require minting an NFT on day one. Mint / GeoNFT is an **edition** of discovery, not the definition.

---

## 6. Partner venues (museums, businesses): how they enter the game

OSM placeholders are fine for geography. **Stewarded places** need a claim path so the place is not anonymous map clutter.

### 6.1 Canonical objects (already designed)

From [`LOCAL_BUSINESS_HOLON_AND_STORY_RELEASE_DNA.md`](../../Docs/Devs/LOCAL_BUSINESS_HOLON_AND_STORY_RELEASE_DNA.md):

| Holon | Owns |
|-------|------|
| **LocalBusinessHolon** | Who the partner is (cafe, museum shop, gallery, visitor centre) |
| **VenueHolon** | Map face: lat/lon, hours, cover |
| **TrailLink** | Attachment to a trail / pin / role (`venue`, `handoff`, `redeem_host`, …) |
| **StoryReleaseHolon** | Optional unlockable story / audio at the pin |
| **Offer / MenuItem** | Redeem (“pilgrim’s tea”) gated on witness proof |

Do **not** overload RWA `BusinessHolon` (cap table). Partners on trails are LocalBusiness.

### 6.2 How a museum / business “appears”

```text
1. Operator creates LocalBusinessHolon + VenueHolon (claim)
2. TrailLink binds venue to a pin id OR new partner pin
3. CityPOI / trail spawn prefers stewarded venues over anonymous OSM of the same spot
4. Peek card shows steward blurb + optional offer / story
5. Player discovery still uses the same Witness / camera rite
6. Redeem / StoryRelease checks witness proof (STAR check-in or PoiDiscovery id)
```

**Partnership is content + rights, not a different gameplay verb.**  
Same discovery rite; richer outcomes and a named steward.

### 6.3 Onboarding partners (product, not code)

| Step | Artefact |
|------|----------|
| Intro | One-pager: “Your place on the Field Guide map; pilgrims witness; you see opted-in visit marks” |
| Claim | LocalBusiness draft + Venue lat/lon + cover + hours |
| Link | TrailLink to Murder Stones / London discover / their own trail |
| Optional | StoryRelease (preview free, full unlock on witness or purchase) |
| Optional | Offer redeem QR at till |
| Live | `status: live`; pin shows steward badge on map |

Phase 0 desk fixture already sketches this: Punch Bowl Waystation next to Sailor’s Stone ([murder-stones-business-story-fixture.json](../../Docs/Devs/quest-packs/murder-stones-business-story-fixture.json)).

---

## 7. TrustGraph: where discovery sits

| Graph | Discovery meaning |
|-------|-------------------|
| **Knowledge** | Full `PoiDiscoveryHolon` (+ note, time, quest id) under Swordsman |
| **Promise** | Which fields peers / public card may see |
| **Trust** | Edges that allow peer maps to load your discoveries nearby |

Partner steward relationship is parallel:

| Graph | Steward meaning |
|-------|-----------------|
| **Knowledge** | Venue ops data, visit aggregates (shielded) |
| **Promise** | Public blurb, hours, offers on the peek card |
| **Trust** | Optional: player ↔ steward edge after redeem / meet |

Do not invent a “museum trust score.” Stewardship is claim + TrailLink + live status.

---

## 8. Recommended product rules

1. **Presence ≠ discovery.** Pins can be placeholders; discovery requires the rite.  
2. **One rite, two skins:** camera Fetch (field) / Witness (desk).  
3. **Always write Knowledge** on success (`PoiDiscovery`), even before mint.  
4. **Stewarded beats anonymous** when both exist at the same spot.  
5. **Trust overlay** only shows Promise-allowed discoveries of 1-hop peers (see trust-weighted POI spec).  
6. **Partners join via LocalBusiness**, not by scraping OSM into “official.”

---

## 9. Build sequence (suggested)

| Phase | Work |
|-------|------|
| **D0** | This doc + wire Fetch confirm → `QuestCheckInBridge` when pending trail pin (root-cause single pipeline) |
| **D1** | `POST /api/trustgraph/poi/witness` on every successful Witness / Fetch ([payload contract](./ARWORLD_POI_WITNESS_PAYLOAD.md)) |
| **D2** | CityPOI peek: “Discover” CTA for floor pins (same rite); partner badge when TrailLink exists |
| **D3** | Seed 1–2 real LocalBusiness claims (cafe + one cultural venue) with TrailLink |
| **D4** | Trust overlay from [ARWORLD_TRUST_WEIGHTED_POI.md](./ARWORLD_TRUST_WEIGHTED_POI.md) Phase 0 fixture → live nearby |

---

## 10. Open questions

1. Must discovery always require camera on device, or is GPS-in-radius + hold-to-Witness enough outdoors?  
2. Can a partner **reject** anonymous OSM duplicates of their venue (replace pin id)?  
3. Does redeem at till create a TrustLink (player ↔ steward), or only a receipt holon?  
4. Photo retained? v1: proof-of-presence without storing image; later optional MediaHolon under Knowledge.

---

## 11. One-line stack

```text
Place on map (floor or stewarded)
  → in radius → camera Fetch / Witness
  → Quest check-in + PoiDiscovery (Knowledge)
  → optional StoryRelease / offer
  → Promise → peers’ trust-weighted maps
```
