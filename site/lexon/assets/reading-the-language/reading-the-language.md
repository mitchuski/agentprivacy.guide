# Reading the language

*How to actually read a Lexon expression, a relation claim, a structured
block, and a constitution spell. Best used alongside the interactive
[viewer](../viewer/index.html).*

## Reading a covered term

Every covered canon term lives in `artifact/LEXICON.lexon.md` in a fixed
shape. Here is Entropy — the information-theory term H(X):

```
## LEXPVM-T-032 · Entropy H(X)
- census: LEXPVM-T-032
- register: glossary · conjectured expression of canonical term
- cites: glossary-master-v4 § ### Entropy H(X)
- relation: {"type":"absence","to":"Adversary","what":"escrow-remainder"}

```lex
LEX Entropy.

"First Person" is a person.
"Adversary" is a person.
"Swordsman" is a person.
"Mage" is a person.
"Gap" is a person.
"Total Uncertainty" is an amount.
"Sword Channel" is an amount.
"Mage Channel" is an amount.
"Observation Complete" is a binary.

The First Person pays the Total Uncertainty into escrow, appoints the
Swordsman, appoints the Mage, appoints the Gap, appoints the Adversary,
fixes the Sword Channel, and fixes the Mage Channel.

CLAUSE: Observe Swordsman.
The Adversary may pay from escrow the Sword Channel to themselves.

CLAUSE: Observe Mage.
The Adversary may pay from escrow the Mage Channel to themselves.

CLAUSE: Exhaust Observation.
The Adversary may declare Observation Complete.

CLAUSE: Remain Unknowable.
The First Person may, if Observation Complete is declared: return the
remainder of the escrow to the Gap.
```

Notes: the residual uncertainty survives any observation strategy...
```

How to read it:

- **The header** names the term and its census id.
- **register** states the epistemic status honestly — this is a *conjectured
  expression of* a canonical term, never claiming more certainty than the
  source.
- **cites** points to the exact canon anchor it comes from (trace-or-delete:
  every entry is traceable to a source).
- **relation** is the machine-checked claim. Here it is an **absence**: no
  clause routes the escrow remainder to the Adversary.
- **The lex block** is the expression itself. Read it as English: the
  observer (Adversary) can drain the two channels it observes, but the
  *remainder* — the residual uncertainty — only ever returns to the Gap. There
  is no clause that sends it to the Adversary.

That absence *is* entropy's meaning in this register: no matter how the
adversary observes, uncertainty remains, because the structure contains no
path for it to be captured. And the mutation probe has proven that claim by
showing a version *with* such a path would break it.

## Reading a relation claim

The `relation:` line is JSON in one of four shapes:

- `{"type":"gate","clause":"X","condition":"Y"}` — clause X only fires when Y
  is declared.
- `{"type":"ordering","clause":"X","sequence":["verb:Object", ...]}` — clause X
  does these things in this order.
- `{"type":"conjunction","predicate":"X","conjuncts":["A","B"]}` — X requires
  all of A and B.
- `{"type":"absence","to":"Role","what":"Thing"}` — nothing routes Thing to
  Role. (Privacy guarantees are absences.)

Each is verified against a mutated twin (see [the gate](the-gate.md)); a claim
you see in the lexicon has survived that test.

## Reading a structured block

The same entry is also emitted as a portable **block** in `blocks/` — the unit
meant to travel into a public knowledge graph. A block is `{lex, triples,
promise edges, relation, provenance}` as JSON, plus a `.cypher` rendering. The
Cypher for an absence claim ends with the constraint a graph reader re-runs:

```cypher
// claim (re-runnable): NOTHING routes escrow-remainder to Adversary
MATCH (x)-[e]->(f {name: "Adversary"})
WHERE e.object = "escrow-remainder"
RETURN count(e) AS mustBeZero
```

The graph does not trust the author's prose; it re-runs the query and expects
zero rows. The block is an audit trail of the text, and the text is a
rendering of the graph. This is the deterministic write-path proposed to
bonfires-style shared graphs — see
[`notes/BONFIRES_STRUCTURED_BLOCKS.md`](../notes/BONFIRES_STRUCTURED_BLOCKS.md).

## Reading a constitution spell

The harness's own trusts and seats live in `artifact/SPELLS/` as the same kind
of expression. Here is the separation bound — the trust that keeps the two
agents apart — as Lexon:

```lex
LEX The Separation Bound.

"First Person" is a person.
"Swordsman" is a person.
"Mage" is a person.
"Gap" is a person.
"Proposal" is a text.
"Verdict" is a text.
"Round Value" is an amount.

The First Person pays the Round Value into escrow, appoints the Swordsman,
appoints the Mage, and appoints the Gap.

CLAUSE: Propose.
The Mage may send the Proposal to the Gap.

CLAUSE: Relay.
The Gap may send the Proposal to the Swordsman.

CLAUSE: Return Verdict.
The Swordsman may send the Verdict to the First Person.

CLAUSE: Close Round.
The First Person may pay from escrow the Round Value to the Gap.
```

Its claim is `{"type":"absence","to":"Mage"}`: the proposal reaches the prover
only *through* the Gap, and **no clause routes anything back to the Mage**. The
separation is not a promise either agent makes — it is a route that does not
exist in the structure. "Cannot, by design," written in the law of the
harness, checkable by the harness. All thirteen spells verify together with
`node tools/spells_check.mjs` (13/13).

## The fastest way in

Open [`viewer/index.html`](../viewer/index.html). Filter to **absence** and
read a few: each is a privacy guarantee expressed as an impossibility. That is
the whole idea of the project in a single afternoon of clicking.
