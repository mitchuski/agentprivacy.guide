# Phase 0 Acceptance

The five acceptance criteria in [[Hitchhikers Field Guide]]'s trust-weighted map spec, turned from unticked boxes into a suite anyone can run.

## The five

1. with the fixture on, the map near Islington shows floor pins **and** at least two overlay pins tagged Maya and Jon
2. every overlay pin is within the spawn radius of the player
3. a peek on an overlay pin shows the peer name at the `link` audience
4. with the fixture off, behaviour equals today's floor-only map
5. no fake trust score anywhere in the interface

All five run. The fixture — Maya, Jon, and their six pins near the Islington demo origin — is modelled as ordinary state rather than as a file.

## The one that is worth the whole exercise

Criterion four. With the fixture off, the map is **byte-identical** to a floor-only map — asserted as an exact equivalence, not an impression.

That matters because it settles what the fixture *is*. Seeding two consented edges and six witnessed places produces exactly the state two real meets would have left behind. The fixture is not a special code path waiting to be torn out; it is ordinary state that arrived by an unusual door. It retires by simply not being seeded.

## Criterion five, made structural

"No fake trust score UI" cannot be checked by looking at a screenshot, so it is checked by the shape of the data: a pin may carry only a known set of numeric fields. A `trustScore`, a `reputation` or a `popularity` cannot appear without failing the assertion — nobody has to notice it in review.

Its companion is the anti-Yelp property in [[The Overlay Ranking]]: a hundred strangers piling onto a pub does not move that pin one place on your map.

## And it found something

Criterion three says the peer name shows **when audience=link**, which means at `public` it must not — and the spec spells public out as title, kind and position only.

The disclosure layer was attaching peer attribution at every tier. So a public projection, the rung meant to say least, was quietly publishing *who* alongside *where*. Their own checklist caught it. A public pin is now anonymous: something was witnessed here, by nobody you are told about.

Which is the argument for writing acceptance criteria down in the first place, and then for running them.
