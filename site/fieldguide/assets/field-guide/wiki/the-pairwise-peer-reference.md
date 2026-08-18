# The Pairwise Peer Reference

Every projection of a place carries the owner's reference **toward this one viewer**, never a global identifier. Two people who have both met me hold two unjoinable handles for me.

## The leak

The overlay response as specified returns a raw avatar id and a global display name on every peer pin. Either one alone defeats the pairwise reference completely: two viewers who have both met the same person receive the same identifier for them, compare notes, and reconstruct a trail neither was shown.

All the care in deriving a fresh reference per counterparty buys exactly nothing if a stable name rides along beside it.

## The fix is smaller than the leak

A display name is **chosen per edge, at meet time** — the face you show this person — rather than read off a profile. Maya can be "Maya" to me and "M." to Jon, and nothing joins the two.

This is the Mage projection applied at the person layer instead of the place layer, which is what the system says it is for in the first place. It costs one text field in the meet UI.

## The property worth stealing

Take two viewers' projections of the same pin and assert that **no identifier field is equal between them**.

Written that way it catches the class rather than the instance: it would have caught the display name, it will catch the next thing somebody adds, and it does not need to be updated when the field list changes.

A caveat that belongs with it: a presented name is self-asserted, so someone can present as "Maya" to a third party. That survives here because the name is scoped to one edge formed by a physical meeting — you are looking at the person while they choose it — but it is a name, not an attestation, and nothing downstream should treat it as one.
