# Rounding Is Not A Detail

What a second-language consumer found, which is the entire reason to write one.

## The bug

The public audience coarsens a location to about a hundred metres. The obvious implementation is to multiply by a thousand, round, and divide back.

JavaScript rounds a midpoint **up**, toward positive infinity. Python rounds it **to even**. So does C#, by default.

The same pin therefore lands about a hundred and ten metres apart in two implementations — across a street — and both pass their own unit tests, because neither test suite happened to contain a coordinate sitting exactly on a boundary.

## The fix

The rule has to name its rounding mode, or it is not a rule. This one says half-up, which is *floor of x plus a half* in every language.

And a vector now sits exactly on the boundary on both axes, so the disagreement is caught by the conformance pack instead of by a player standing on the wrong corner. I checked that it bites: swapping the correct coarsening for the naive one fails that vector and only that vector.

## The general lesson

This is why a second implementation, in a second language, sharing zero code, is worth more than any amount of re-reading. It is the difference between *we wrote a spec* and *two strangers can agree*.

The same family of trap is already handled elsewhere in the encoding: numbers are fixed to six decimal places, because one versus one-point-zero versus one-e-zero is the commonest way two JSON serialisers silently disagree. An implementation in a locale that writes a decimal comma will pass every one of its own tests and fail every interop check.

Related: [[The Rejection Register]], the other half of being testable by somebody else.
