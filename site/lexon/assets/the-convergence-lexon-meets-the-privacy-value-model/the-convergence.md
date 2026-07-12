# The convergence: Lexon meets the Privacy Value Model

*Why expressing a privacy model in a legal-contract language is more than a
translation exercise.*

## What Lexon is

[Lexon](https://www.lexon.org) is a controlled natural language created by
Henning Diedrich. "Controlled" means it looks and reads like ordinary English
but obeys a strict, small grammar, so that a sentence has exactly one meaning
and a machine can parse it deterministically. A Lexon document reads as a
plain-English contract and compiles to executable code.

A tiny example — the canonical escrow, in full:

```
LEX Escrow.

"Payer" is a person.
"Payee" is a person.
"Arbiter" is a person.
"Amount" is an amount.
"Fee" is an amount.

The Payer pays an Amount into escrow, appoints the Payee,
appoints the Arbiter, and fixes the Fee.

CLAUSE: Pay Out.
The Arbiter may pay from escrow the Fee to themselves,
and afterwards pay the remainder of the escrow to the Payee.
```

Every noun is defined by the author inside the text, so the document carries
its own vocabulary. Every sentence is a subject doing something to an object.

## The insight: a contract is already a knowledge graph

Here is the load-bearing observation. That escrow text, parsed, is a set of
typed relationships between named things:

- `Payer —pays_into_escrow→ Amount`
- `Payer —appoints→ Payee`
- `Payer —appoints→ Arbiter`
- `Arbiter —may_pay(Fee)→ Arbiter`

Those are knowledge-graph triples. The definitions are typed nodes (a person
compiles to a key pair, an amount to a number). The obligations — *may*,
*must* — are typed, party-addressed, dated edges. So a Lexon contract is
*simultaneously* three things with zero loss between them: readable prose,
executable code, and a subgraph. Two independent legal scholars (Reyes 2021,
Idelberger 2020) confirmed this pass-through: the text is the program is the
graph.

This matters because it means controlled grammar is the **missing authoring
layer** between two worlds that agentprivacy cares about: how autonomous
agents communicate (compressed, probabilistic) and how shared knowledge is
stored (graphs, precise). You can write a commitment once, in English, and get
the graph for free.

## What the Privacy Value Model is

The [Privacy Value Model](https://agentprivacy.ai) (PVM) is the theory behind
0xagentprivacy. Its core is an architecture, not a policy:

- **Two agents.** A **Swordsman** (⚔️) who protects — boundaries, disclosure
  control, verdicts that do not flatter — and a **Mage** (🧙) who delegates —
  coordination, proposal, execution within bounds.
- **The First Person** (😊) — the human whose work it is, the only holder of
  "the door" (the authority to take outward actions).
- **The Gap** (⿻) — the held-apart space between the two agents that neither
  owns.

The model's central claim is that privacy is **structural**: given the human,
the Swordsman's outputs and the Mage's outputs carry (almost) no information
about each other — not because they promise not to share, but because the
architecture makes it so. "Cannot, by design," not "promises not to."

The rest of the model builds on this: promise theory (agents can only promise
their own behavior), an information-theoretic separation bound, a value
calculus, a consent posture (invitation, never imposition — the IEEE 7012 /
MyTerms standard), and a large body of canon terms, ceremonies, and story.

## Why put one in the other

Because the PVM's deepest claims are *structural*, and Lexon's grammar makes
structure mechanical. If privacy-as-architecture means "a certain flow of
information cannot happen," then writing the model in a language whose every
sentence is a checkable relationship lets you *prove* the flow cannot happen —
by showing the grammar contains no clause that permits it. The model stops
being prose you must trust and becomes structure a machine can check.

That is the convergence this repository pursues: **the PVM canon, term by
term, as Lexon controlled grammar, with every term's structural claim
mechanically verified.** The next page explains how the work was actually
carried out — by a loop built on the model's own two-agent design.

## Origin

The project began as a formal "convergence run": five reference letters and
eight axes of comparison between Lexon and the PVM, with the keystone axis
being A5, "grammar to graph." That run's artefacts live in
[`out/`](../out/). Its central finding — that a Lexon text is at once
contract, code, and lossless subgraph — is what everything here is built on.
