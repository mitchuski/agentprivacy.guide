# Erosion Is A Rate Not A Cliff

Should the overlay only show places a peer visited recently — say, in the last ninety days?

Yes. But ninety days as a boolean is a cliff, and a pin does not stop being true on day ninety-one.

## Half-life, with a floor

Freshness halves every ninety days and drops out of the overlay below a quarter, which lands at about six months. The scalar itself ships with the pin, so the client fades the ring rather than popping the marker.

The difference is visible in one property: a pin at eighty-nine days and a pin at ninety-one days differ by less than a fiftieth, and both are still on the map. Under a cliff they are on opposite sides of the world.

## Your own trail never erodes

Erosion governs how much a peer's old enthusiasm should move you. It says nothing about whether you were there. Your own places stay on your own map forever.

## What is still missing

The **edge** does not erode, and there is no way to unmake one. A meet from four years ago currently weighs exactly what a meet from Tuesday weighs, which is wrong over any horizon long enough to matter.

The machinery already exists — it is simply not applied to the edge yet. This is the most obvious next piece of work and it is not hard; it is on this page so it does not get quietly forgotten. See [[The Meet Rite]].
