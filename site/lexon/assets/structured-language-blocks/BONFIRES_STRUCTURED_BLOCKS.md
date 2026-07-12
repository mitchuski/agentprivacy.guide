# Structured language blocks for the Bonfire graph

Companion to `out/BONFIRES_NOTE.md` (the adoption note, frozen at the
convergence run) and `notes/LEXON_YOUR_OWN_AGENTS.md` (the three-way sync).
That note argued the write-path; this one specifies the UNIT that travels it,
because the unit now exists: the harness has folded 59 gate-passing LEXICON
entries and every future entry carries a machine-checkable relation claim
(CR-13, the mutation probe).

## The boundary, stated first

The bonfires projection is NOT assumed anywhere in the agentprivacy grammar.
Nothing in the census, the checker, the relation claims, or the loop depends
on a public knowledge graph existing. The dependency points one way only: a
shared public graph is a natural RENDERING surface for coherent
machine-legal-language paths, and these blocks are built so that rendering
costs an emitter, not a research program. Private pole: the agentprivacy
harness, where claims are gated and folded. Public pole: the Bonfire graph,
where communities hold shared memory. Membrane: the hitchhikers community and
its values, which decide what crosses. Any actual contact with bonfires.ai is
the operator's door (T6).

## The unit: a structured language block

One block is one census term expressed as one self-carrying package:

```
block = {
  lex:        the controlled-grammar text (passes tools/lexon_check.mjs:
              parse, triple round-trip, role binding, promise typing)
  triples:    the typed subject-predicate-object edges the checker derives
  promises:   the promise/commitment typing per edge (may = promise,
              must/recital = commitment, polarity +)
  relation:   the machine-readable structural claim(s), tools/relation_check.mjs
              grammar (gate | ordering | conjunction | absence), each proven
              distinguishable from its mutated twin
  provenance: census id, source slug, register tag (epistemic status,
              never upgraded)
}
```

The block is deterministic all the way down: the text IS the triples (round
trip is checked, not hoped), the claims are clause-graph properties (not
prose), and the provenance is trace-or-delete. Everything the adoption note
promised about zero extraction loss is now demonstrated at 59 entries of
scale, not one escrow example.

## Projection semantics (block to graph)

The adoption note's escrow mapping covers definitions to nodes and triples to
edges. The relation-claim layer adds the piece a shared graph actually needs:
**claims that readers can re-check against the subgraph mechanically.**

| claim type | graph rendering | reader's check |
|---|---|---|
| absence | a pattern that MUST match zero rows | run the pattern; any row falsifies the block |
| gate | every action edge in the clause carries the condition property | filter the clause's edges; an unconditioned edge falsifies it |
| ordering | monotone step properties on the clause's edges | sort by step; a violation falsifies it |
| conjunction | the defined predicate as a node with REQUIRES edges to each conjunct | count the REQUIRES edges |

Impossibility as absence is the one to notice: a privacy guarantee in this
grammar is a ROUTE THAT DOES NOT EXIST, and in a graph that is a query
returning empty. The claim ships WITH the block, so a Bonfire does not trust
the author's prose; it re-runs the check.

## Worked example: the Entropy block

From the folded LEXICON (LEXPVM-T-032, glossary-master-v4 anchor Entropy
H(X)). The lex text expresses the formula's structure: observation channels
drain what they can, and residual uncertainty survives to the Gap.

Claim: `{ "type": "absence", "to": "Adversary", "what": "escrow-remainder" }`
(RELATION PASS 2026-07-11: the twin with the remainder rerouted to the
Adversary still passes the base gate, and the tool tells them apart).

```cypher
// nodes from definitions
MERGE (c:LexContract {name: "Entropy", census: "LEXPVM-T-032",
       cites: "glossary-master-v4", register: "conjectured expression of canonical term"})
MERGE (fp:Person {role: "First Person", contract: c.name})
MERGE (adv:Person {role: "Adversary", contract: c.name})
MERGE (gap:Person {role: "Gap", contract: c.name})

// deontic edges (the observation drains, each a 'may')
CREATE (adv)-[:MAY_PAY {object: "Sword Channel", from: "escrow",
        clause: "Observe Swordsman", aspect: "deontic"}]->(adv)
CREATE (adv)-[:MAY_PAY {object: "Mage Channel", from: "escrow",
        clause: "Observe Mage", aspect: "deontic"}]->(adv)
CREATE (fp)-[:MAY_RETURN {object: "escrow-remainder",
        clause: "Remain Unknowable", condition: "Observation Complete",
        aspect: "deontic"}]->(gap)

// the relation claim, as the constraint a reader re-runs:
// residual uncertainty NEVER routes to the Adversary
MATCH (x)-[e]->(a:Person {role: "Adversary"})
WHERE e.object = "escrow-remainder"
RETURN count(e) AS mustBeZero
```

One authoring act, three renderings (prose, triples, checkable constraint),
and the constraint is the part the community will actually dispute later.

## Why this is bonfires-shaped without being bonfires-dependent

A Bonfire runs Graphiti over Neo4j with a probabilistic extraction door. The
block enters through the deterministic door the adoption note proposed (a
lexon episode type), and the relation claims land as the audit layer that
door was missing. But the same block renders to RDF, to a triple store, to a
plain JSON ledger, or to nothing at all: the harness's own gate already
consumed it. The public graph gains coherent machine-legal-language paths;
the grammar gains nothing and needs nothing back. That asymmetry is the
design, and it is why the boundary at the top of this note holds.

## What crosses the membrane, and what never does

- Crosses: blocks (lex text, triples, claims, cites slug, register tag).
  Everything in a block is already public-shaped: the cites slug names a
  source, not a private path.
- Never crosses: the census freeze and coverage metric (harness internals),
  the canon documents themselves (bonfires gets pointers, not the corpus),
  register-tag epistemics beyond the tag string, and anything C-series.
- The spell-grammar register (lexr3, in flight as this is written) is the
  natural first cargo: seat cards and skills as promise bundles are exactly
  the agent-behavior contracts a multi-agent community graph wants, and they
  are the operator's own structures, clean to share.

## Standing next steps (all behind the door)

1. When lexr3's spell-grammar entries fold, cut 2 or 3 of them as complete
   worked blocks (lex + triples + claims + Cypher) into an updated adoption
   packet alongside out/BONFIRES_NOTE.md.
2. A `blocks emitter` (LEXICON entry to block JSON) is a small tools/ script,
   keystone-buildable on request; it reuses check() and probeRelation()
   outputs directly.
3. Contact with bonfires.ai, like the Diedrich brief, waits at the door.
