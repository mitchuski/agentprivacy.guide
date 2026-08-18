# The Rejection Register

Twenty-two named ways the model says no, and a property asserting that **every one of them is produced by a live vector**.

## Why the register is the useful artefact

Two implementations agree about success trivially and disagree about failure constantly. "It rejected the request" is not interoperability. "It rejected the request with *meet-not-colocated*" is.

This is the piece of the DTG conformance work that turned out to be worth the most, and nobody expected it to be.

## The discipline

A register entry nobody can produce is a documentation claim, and documentation claims are what this whole way of working exists to replace. So the coverage property is not optional decoration — it is the thing that keeps the register from rotting into prose.

A second property asserts the reverse: no vector may produce a code that is not in the register. The vocabulary is closed in both directions.

## Absence has reasons too

The overlay query can be asked to explain itself, returning every pin that could have appeared and did not, each with a named reason: out of radius, no trust edge, below the freshness horizon, capped private by its owner, ranked out beyond the cap.

A desk demo with an empty overlay should be able to say *why* in one call, instead of by bisecting the query. See [[Erosion Is A Rate Not A Cliff]] for the horizon and [[Audience Is Granted Not Computed]] for the cap.
