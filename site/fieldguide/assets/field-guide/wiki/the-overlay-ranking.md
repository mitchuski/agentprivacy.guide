# The Overlay Ranking

[[Hitchhikers Field Guide]] specified the map's ranking terms in a table and left them unimplemented. A ranking rule that lives only in a table is a rule nobody can break a test on, so here it is mechanical.

## Metres, not points

Every term is expressed as an **effective distance** rather than a score. A curated pin with real narration is worth −350 m. A pin from someone you have met is worth −400 m. Your own trail is worth −600 m.

This is deliberate. A score invites a leaderboard; a distance in metres cannot become one, because every term has to answer *how many metres is this worth?* out loud. "Maya was here" is worth walking four hundred metres for — that is a sentence a designer can argue with, which "+0.3 trust weight" is not.

## The cut is on true distance

No band ever moves a pin into the viewport. The hard radius applies to real metres, before any bonus, so the Greenwich invariant holds no matter how beloved a place is. A peer pin can outrank a nearer floor pin — the band has to do something or it is decoration — but it is bounded: four hundred metres of goodwill does not beat seven hundred metres of walking.

## This is not Yelp

The spec says so in its first section, and the property makes it mechanical: **a pin's rank for you never depends on how many other people have witnessed it.**

A hundred strangers pile onto the same pub, and the map you see does not change by a single position. There is no aggregate, no trending, no popularity term — not because it was left out of this version, but because there is a test that fails if one appears.

See [[Audience Is Granted Not Computed]] for the same instinct one layer up, and [[Phase 0 Acceptance]] for its companion check.

Memorial and plaque clutter is filtered out, the cap of twelve applies after ranking rather than before, and origin changes the marker ring — teal for yours, gold for a peer — and nothing else about the pin.
