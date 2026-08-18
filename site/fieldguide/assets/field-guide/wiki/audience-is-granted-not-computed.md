# Audience Is Granted Not Computed

A one-hop trust edge gets you the *link* audience. Nothing gets you *acquaintance* except the owner handing it to you. And graph distance never raises an audience: two hops is not half of link, it is **nothing**.

## Why this is the whole thing

"No central trust score" is easy to agree with and easy to lose. You lose it the moment friend-of-friend leaks in at a reduced tier, because at that point distance has become a currency: every player's incentive turns into edge farming, and you have built a score with extra steps and no dial to turn it off.

So the ladder is not a gradient over the graph. It is a set of grants.

## The ladder

* **public** — title, kind, marker, and coarse geography only
* **link** — adds the wiki slug, the rite, the trail, the time, and exact geography
* **acquaintance** — adds the note
* **private** — the pin is absent, not blank

Quest pins cap one rung tighter no matter who asks, because a quest pin says what you were *doing*, not just where you were.

## A closed allow-list, not a strip-list

The projection starts empty and copies in only named fields. This is not a stylistic preference. A strip-list leaks by omission: the day somebody adds a device model to the record, it ships — and a test written against a strip-list still passes, because it only knows about the fields it was told to remove.

The property that keeps it honest bolts a junk field onto a record and asserts it never surfaces at any audience. That test is unwritable against a strip-list. Inverting the list is what made the property expressible, and the property is worth more than the ten lines it cost.

Related: [[A Wiki Fork Is Not An Audience]], which is about the rung this ladder does not have.
