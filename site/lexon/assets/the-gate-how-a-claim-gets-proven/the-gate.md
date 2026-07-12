# The gate: how a claim gets proven

*The technical heart. Two checkers turn "privacy is architectural" from a
slogan into a mechanical fact.*

## The problem the gate solves

Anyone can write English that *sounds* like a privacy guarantee. The question
is whether the guarantee is really *in* the structure of the text, or only in
the reader's imagination. The gate exists to answer that mechanically, in two
layers.

## Layer one: the grammar checker (`tools/lexon_check.mjs`)

The first checker verifies that a text is valid Lexon in the attested subset,
in four stages:

1. **Parse** — every statement classifies and parses under the controlled
   grammar. Unknown words, unknown constructs, and malformed sentences are
   rejected.
2. **Role binding** — every noun is defined before use and bound immutably. A
   name that was never introduced, or redefined mid-document, fails.
3. **Triple round-trip** — every action sentence is turned into a
   subject-predicate-object triple, then *re-serialized back into a sentence*,
   then re-parsed. The triples must come out identical. This is the "grammar
   to graph" claim made mechanical: if the text and the graph are truly the
   same thing, the round-trip is lossless.
4. **Promise typing** — every obligation edge is typed (a *may* is a voluntary
   permission; a *must* or a recital act is a commitment) with a polarity,
   following promise theory.

Run `node tools/lexon_check.mjs --selftest` and it checks itself: known-good
example texts from lexon.org must pass, and deliberately broken "mutant"
versions must fail. If a mutant ever passes, the checker is broken and says
so.

This layer answers: *is this valid, lossless, promise-typed Lexon?* But it
does **not** answer the deeper question, and here is why that matters.

## The hole the first layer cannot see

Early in the project the loop drew a held-out term — the "2D Fortress," a
cryptographic structure that falls to a quantum attacker. The prover expressed
it, and it passed the grammar gate perfectly. But it passed with the
*adversary* draining the protected secret — which is, in that specific case,
the canon-correct direction (the fortress is supposed to fall). The unsettling
discovery: the grammar gate would have *equally* accepted the opposite text,
where the defender keeps the secret. The two texts have the same clause shape.
The direction — the entire point of a privacy claim — lived only in a prose
Notes line the checker could not read.

That is the vulnerability at the core of "privacy is architecture." If the
gate cannot tell a guarantee from its opposite, it is not checking the
guarantee.

## Layer two: the mutation probe (`tools/relation_check.mjs`)

The second checker closes that hole. Every folded expression now carries a
**machine-readable relation claim** — the structural guarantee it makes, in
one of four types:

- **gate** — a clause is reachable only under a stated condition.
- **ordering** — a clause performs its actions in exactly this sequence.
- **conjunction** — a defined term requires *all* of several conditions.
- **absence** — *no* clause routes a given thing to a given party. This is the
  important one: **an impossibility, and therefore a privacy guarantee, is an
  absence.** Direction is claimed as an absence: "the secret can never reach
  the defender's adversary" is a route that does not exist.

For each claim, the probe does something adversarial. It:

1. checks the claim actually holds on the text (as a property of the parsed
   clause graph, never a string search);
2. builds a **mutated twin** — the claim's minimal structural negation (strip
   the condition, reverse the order, drop a conjunct, or add the forbidden
   route);
3. confirms the twin *still passes the grammar gate* — proving the base gate
   alone cannot tell them apart;
4. confirms the claim now **fails** on the twin.

Only if all four hold does the claim earn `RELATION PASS`. In plain terms: a
guarantee is proven by showing the grammar can distinguish it from its own
opposite. The 2D Fortress now carries `absence: Scalar Secret to Key Holder`,
and the tool proves that adding a reclaim clause would break exactly that
claim. Direction lives in the structure, not the prose.

## The canary: knowing the gate is passable

A gate no candidate can pass is as useless as a gate everything passes — you
cannot tell a bad candidate from an impossible test. So the mutation probe
ships with a *canary*: a small fixture authored together with its claims, which
passes the full pipeline by construction. `node tools/relation_check.mjs
--selftest` runs it. If the canary ever fails, the gate itself is broken, not
the candidate.

## What the gate deliberately does not do

Honesty is part of the design. The checker validates an *attested subset* of
Lexon derived from published examples — it is **not** the real Lexon compiler
(a macOS-only binary with unpublished source). So arithmetic is never
executed here: an expression carries a formula's *structure* (which quantities
gate which actions, what must precede what), not its computed values. The
entropy expression captures that residual uncertainty survives observation; it
does not compute Shannon's logarithm. Every entry names what it omits, and the
`frontier.json` gate string states the regime plainly.

This boundary is not a weakness to hide; it is the difference between "we
proved the structure" and "we ran the math," and the project never blurs it.

## In one sentence

The grammar checker proves a text is lossless, promise-typed Lexon; the
mutation probe proves its privacy claim is really in the structure by showing
the grammar can tell it apart from its opposite — which is what it means for
privacy to be architectural rather than promised.
