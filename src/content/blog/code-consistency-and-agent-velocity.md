---
title: "Code consistency is the casualty of agent velocity"
description: "spec-driven-dev keeps a single Claude Code agent coherent with itself across a long session — one SPEC.md it re-reads every turn, telegraph-encoded to a 41% token cut versus prose."
pubDate: 2026-05-13
tags: ["spec-driven-development", "claude-code", "ai-coding", "benchmarks"]
---

## TLDR

[spec-driven-dev](https://github.com/kborovik/spec-driven-dev)
keeps a single Claude Code agent coherent with itself across a long session.
One `SPEC.md` at the repo root, telegraph-encoded to stay small,
that the agent re-reads every turn —
so task ten is built against the same constraints as task one.
The encoding benchmarks at a **41% mean token cut** versus prose.
One file, one thread, no subagents.

## The drift nobody decides on

The thing that bit me wasn't the agent writing bad code.
It was the agent writing *inconsistent* code.

An LLM writes faster than I can read it —
and, more quietly, faster than it can stay coherent with itself.
Task one establishes a pattern.
By task ten the agent has invented three more.
Nobody decided that.
There was no review where I approved a second error-handling convention
or a third way to shape a response.
It just drifted, one reasonable-looking diff at a time,
and I didn't see it until the codebase had three dialects.

Consistency is the first casualty of agent velocity, and it's the expensive one.
Bad code gets caught by tests.
Inconsistent code passes every test and still rots the project —
because the next agent, reading the same files,
learns the drift and amplifies it.

## One small spec, re-read every turn

The fix is unglamorous:
keep a single `SPEC.md` at the repo root,
small and dense enough to sit in context,
and have the agent re-parse it on every command.
Six fixed sections, fixed order:

- `§G GOAL` — what the project is for, one short paragraph.
- `§C CONSTRAINTS` — hard rules: language, runtime, target platform, external systems.
- `§I INTERFACES` — public surface: HTTP routes, CLI commands, file formats.
- `§V INVARIANTS` — properties that must always hold, numbered.
- `§T TASKS` — work, one row each: id, status, description, the invariants it must respect.
- `§B BUGS` — bug rows in the same shape, with date and root cause.

The part that does the work for consistency is the addressing.
Every row has a stable cite —
`§V.3` for an invariant, `§T.7` for a task, `§B.2` for a bug.
Code comments link to the invariant they uphold.
Tests reference the bug they guard.
Commits cite the task they close.
The spec survives `/clear`, survives a week away, survives a handoff.
When the agent comes back cold,
it isn't reconstructing intent from chat history it no longer has —
it's reading the contract.

> The spec is the only artifact that earns its tokens.
> Everything else has to save more tokens later, or get cut.

## The loop

The plugin is a handful of slash commands
that map onto the loop I actually want:

- `/sdd:design` — propose-then-critique a structural change,
  persisted to a draft I fold in later.
- `/sdd:spec` — the *only* command that mutates `SPEC.md`.
  A Socratic gate reads my free-form intent
  and classifies it as a new spec, a distill from an existing codebase,
  an amend, or a backprop.
- `/sdd:build` — plan, then execute, against `SPEC.md`.
  Single thread.
  On a test or build failure it routes through backprop before retrying.
- `/sdd:check` — read-only drift report.
  Diffs the spec against the working tree and groups violations by severity.
  Writes nothing.
- `/sdd:explain` — telegraph to prose,
  for when I need `§V.3` in plain English during review.

Two housekeeping commands keep a long-lived spec from going stale.
`/sdd:compact` fires once the spec crosses ~25k tokens —
it folds sibling invariants,
archives old `§T`/`§B` rows to `SPEC.archive.md`,
and rewrites any prose that crept back in.
`/sdd:reorganize` clusters the `§V` invariants by topic and renumbers them,
sweeping every citation in the same commit,
with the renumber map saved to disk so old cites still resolve.
Both are operator-triggered and land as a single atomic commit —
a rollback is one `git revert`, never a background process I have to trust.

## Telegraph: the compression, benchmarked

"Small enough to sit in context" is the load-bearing claim,
so the encoding has to pull its weight.
`SPEC.md` is written in telegraph:
dropped articles, dropped filler,
fragments where a fragment carries the meaning,
unpadded pipe tables,
and a deliberately small symbol set — `→ ≥ ≤ ! ? §`.
Anything heavier is written as the plain ASCII word, on purpose:
a fancy math operator can tokenize to two, three, four pieces
and cost *more* than the word it replaces,
so a symbol only earns its place when it's both cheaper and clearer.

"The middleware must verify the token on every request before the handler runs"
becomes:

```
V12: every req → auth check before handler
```

I measured it the way I measure everything else:
30 rows of this repo's own `SPEC.md`,
each run through Claude's tokenizer against a prose rewrite of the same row.
Telegraph lands a **41% mean reduction** (median 39%, n=30).
It's reproducible —
`benchmarks/telegraph/telegraph-bench.py` runs it row by row,
with full methodology and per-row numbers in the benchmark write-up, not a slide.

Flip the number around and it's the real argument.
A prose spec pays roughly **1.7× the tokens** for identical content —
and you don't pay that once,
you pay it on every turn the agent re-reads the spec.
Over a long session that compounds straight into the context budget
I was trying to protect.

The cost is readability, and it's handled out of band:
a `steno` register keeps reviewer-facing text in normal grammar,
and `/sdd:explain` decompresses any row back to English on demand.
The spec stays lean for the model;
I never have to read the compressed form unless I want to.

## Every failure tightens the spec

The mechanic I lean on hardest is backprop,
and it's what defends consistency over time.
When a `/sdd:build` run fails in a way that isn't just a typo —
when it smells like something was under-specified —
SDD doesn't silently patch and move on.
It records the failure as a `§B` bug row
and, where the failure represents a *class* of mistake,
adds or tightens a `§V` invariant that catches it.
Then it writes the failing test first, ships the fix, and cross-cites the two commits.

Every incident becomes a permanent guard rail.
The invariant set only grows,
the build refuses to ship code that violates it,
and drift I've already hit once can't quietly come back.

## What I gave up

It's single-thread and slower than fanning work out to parallel agents —
I'm the bottleneck, and that's the point.
It's Claude Code only;
the slash commands and gates lean on the plugin model.
And telegraph is hostile to read for the first week —
`/sdd:explain` is a crutch until it isn't.

I'm not optimizing for agent throughput.
I'm optimizing for *I am the only reviewer, and this has to still make sense in six months.*
Consistency is what that costs, and it's worth paying.

## Try it

```
/plugin marketplace add kborovik/spec-driven-dev
/plugin install sdd@spec-driven-dev
```

Then in any repo, `/sdd:spec` scaffolds your first `SPEC.md`.
SDD is adapted from [JuliusBrussee/cavekit](https://github.com/JuliusBrussee/cavekit)
and ships under MIT.
