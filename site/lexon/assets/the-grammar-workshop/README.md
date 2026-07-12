# lexon_pvm — teaching a privacy model to speak its own law

**What if the ideas behind a privacy architecture could be written in a
language that is at once plain English, executable contract, and a
machine-checkable claim?** That is what this repository does. It takes the
[Privacy Value Model](https://agentprivacy.ai) (the theory behind
0xagentprivacy: two separated agents, a Swordsman who protects and a Mage who
delegates, held apart by a Gap) and expresses its canon, term by term, in
[Lexon](https://www.lexon.org) — Henning Diedrich's controlled-English
language for computational law.

The result, after six days of work: **189 of the model's 211 canon terms are
now expressed in a form where the load-bearing claim can be mechanically
verified — and falsified.** The census is 90 percent covered. The harness's
own constitution is written in the same language and passes its own gate.

> **See it, don't just read about it.** Open [`viewer/index.html`](viewer/index.html)
> in a browser: every covered term and the thirteen constitution spells,
> rendered as Lexon text with its verified claim beside it. Filter by claim
> type, search, click to read.

## The three ideas, briefly

1. **The overlap with Lexon.** Every Lexon sentence parses to a
   subject-predicate-object triple — a knowledge-graph edge by another name.
   A contract is a subgraph; its obligations are typed, party-addressed
   edges. So a privacy model written in Lexon is simultaneously readable
   prose, a promise graph, and code. Controlled grammar turns out to be the
   missing authoring layer between how agents talk and how knowledge is
   stored. → [docs/the-convergence.md](docs/the-convergence.md)

2. **The harness.** The work was not done by hand. It ran as a **dual-agent
   research loop** — the same Swordsman ⊥ Mage architecture the model
   describes, turned on the model itself. One agent proposes ways to express
   canon terms; a third seat (the Gap) hashes each proposal and draws
   held-out terms the prover must express from the recipe alone; a prover
   runs the full gate; a critic names what went wrong. Only genuinely general
   expressions survive. → [docs/the-harness.md](docs/the-harness.md)

3. **The result: privacy-as-architecture, made checkable.** The model's
   central claim is that privacy is structural — "cannot, by design," not
   "promises not to." In this grammar that becomes a mechanical property: a
   privacy guarantee is *a route that provably does not exist*, and the tool
   proves it by building the claim's opposite and showing the grammar can
   tell them apart. → [docs/the-gate.md](docs/the-gate.md)

## The ladder (211 → 22)

| stage | terms left | what happened |
|---|---|---|
| census freeze | 211 | the model's canon, frozen deterministically |
| first folds | 152 | the theory, the formal core, promise theory |
| the hardened gate | 123 | claims must survive their own negation |
| the constitution | 123 | the harness's own law, written as 13 verified spells |
| eleven levers | 64 | the consent stack, sovereignty, ceremonies |
| the merged charter | **22** | the formula tail and the story terms; 90 percent covered |

The remaining 22: sixteen ordinary terms for one more pass, and six
conjecture-register terms deliberately reserved (their titles carry numbers
an automated seat is not allowed to write). → [docs/the-results.md](docs/the-results.md)

## Start here

- **New to the project?** Read [docs/index.md](docs/index.md) — a guided path
  through the whole thing in about fifteen minutes.
- **Want to see the language?** Open [`viewer/index.html`](viewer/index.html).
- **Want the honest assessment?** [chronicles/2026-07-12_reflection_what_this_means_for_agentprivacy.md](chronicles/2026-07-12_reflection_what_this_means_for_agentprivacy.md)
  and the [capstone](chronicles/2026-07-12_capstone_the_grammar_workshop.md).

## Layout

```
README.md            this file
docs/                the human-readable wiki (start at docs/index.md)
viewer/index.html    the interactive lexicon reader (self-contained)
artifact/
  CENSUS.json        the frozen 211-term canon census
  LEXICON.lexon.md   the semantic base: every covered term as Lexon text
  SPELLS/            the constitution: TRUSTS + seats as 13 verified spells
  GRAMMAR.ebnf.md    the attested Lexon subset the checker accepts
  OT7_TERRITORIES.json  the residue partition for the merged-charter runs
blocks/              189 portable "structured language blocks" (JSON + Cypher)
tools/
  lexon_check.mjs    the grammar gate (parse, round-trip, roles, promises)
  relation_check.mjs the mutation probe (claims survive their negation)
  blocks_emit.mjs    LEXICON entry -> portable block
  spells_check.mjs   verify the constitution corpus (13/13)
  render_lexicon.mjs regenerate the viewer
  coverage.mjs       the coverage-debt metric
chronicles/          per-run records + the reflection and capstone
out/                 the original convergence-run artefacts
notes/               the corpus plan, the bonfires write-path spec
frontier.json        the single source of truth for every number
```

## Verify it yourself

```
node tools/lexon_check.mjs --selftest     # the grammar gate: goldens pass, mutants fail
node tools/relation_check.mjs --selftest  # the mutation probe
node tools/spells_check.mjs               # the constitution: 13/13 CORPUS PASS
node tools/coverage.mjs                   # coverage-debt (22) against frontier.json
node tools/blocks_emit.mjs --selftest     # the public blocks
```

## Gate regime, stated honestly

The checker is a spec-derived validator of an *attested subset* of Lexon, not
the Lexon compiler (which is a macOS-only binary with unpublished source;
`frontier.json` carries the regime label). Golden fixtures in `tools/golden/`
are example texts from lexon.org, credited to Henning Diedrich / Lexon Labs
(and Idelberger for the license example); see `SOURCES.md`. Because arithmetic
is never executed here, quantitative claims carry a formula's *structure*, not
its computed values, and every entry names what it omits.

## Credits

Lexon is the work of Henning Diedrich and Lexon Labs (lexon.org). The Privacy
Value Model and the Swordsman ⊥ Mage architecture are 0xagentprivacy /
agentprivacy.ai. This repository is the convergence of the two, run through a
dual-agent harness.
