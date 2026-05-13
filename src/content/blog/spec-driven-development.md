---
title: Compressed spec-driven development
description: Modern LLMs write code faster than anyone can read it. A durable, math-glyph-compressed SPEC.md keeps the artifact a human reasons about small enough to actually re-load.
pubDate: 2026-05-13
tags:
  - spec-driven
  - claude-code
  - llm
  - workflow
---

The constraint in AI-assisted engineering is no longer how fast the model
writes code. It is how fast a human can read, reason about, and sign off on
what the model just produced. I have watched this constraint bend every
workflow I have built for the last year.

[pilot-spec](https://github.com/kborovik/pilot-skills) (the `sdd` plugin for
Claude Code) is the most useful answer I have found so far. It is small,
opinionated, and has changed how I run long projects with an agent.

## The thesis

Human comprehension is the bottleneck. Therefore the artifact a human reads
must be small, dense, and durable enough to survive context resets,
hand-offs, and bug post-mortems.

That artifact is a single `SPEC.md` at the repo root. Six fixed sections,
in fixed order:

- **§G** &mdash; goal, one line
- **§C** &mdash; constraints (non-negotiable boundaries)
- **§I** &mdash; interfaces (what the world sees)
- **§V** &mdash; invariants (numbered, testable, each one MUST hold)
- **§T** &mdash; tasks (pipe-table rows with status)
- **§B** &mdash; bugs (pipe-table rows, each linked to a §V)

Everything else is derived. No `docs/` tree. No JSON sidecars. No per-task
artifacts that the next sprint will throw away.

## Math-glyph encoding

The spec is written in a compressed encoding built on math operators
(`∀ ∃ ∴ ⊥ ≤ ≥ ≠ ∈ ∉ ∧ ∨ → §`), fragments, and pipe tables. The result is
roughly a quarter of the prose length while staying machine- and
human-readable.

Prose: *"The authentication middleware must verify the token expiry on
every request before allowing the handler to execute."*

Encoded: `V<n>: ∀ req → auth check before handler`

The encoding looks user-hostile on first read. It is not. The spec is an
LLM-facing artifact &mdash; the model re-parses it every turn, and the token
budget matters. When I want to read a `§V` myself, `/sdd:explain` decodes
it back to English on demand.

## Four commands, one writer

1. **`/sdd:design`** &mdash; propose-then-critique loop for structural choices.
   Converges only when an `Open Questions` list is empty.
2. **`/sdd:spec`** &mdash; the sole mutator. Free-form intent in; a socratic
   gate classifies into one of four modes (NEW, DISTILL, AMEND, BACKPROP).
3. **`/sdd:build`** &mdash; plan → execute → verify, one task at a time. No
   sub-agents, no parallel workers, no orchestrator.
4. **`/sdd:check`** &mdash; read-only drift report. Diffs `SPEC.md` against the
   working tree, groups findings by severity.

That is the entire surface area.

## Backprop is the part that earns its keep

Every test failure inside `/sdd:build` runs through a six-step protocol:

1. capture the failing case verbatim
2. trace the cause &mdash; code bug, spec wrong, or unspecified edge case
3. append a `§B` row
4. decide whether a `§V` invariant would have caught the *class* of bug
5. write a failing test first, then ship the fix
6. commit once &mdash; spec edit, test, and fix in one diff

The result is that the spec gets *more accurate* every time something goes
wrong. A drift report stays signal because every prior failure has already
been folded into the invariants the next run is checked against.

## Single-thread is a feature

The dominant trend in agentic frameworks is parallelism &mdash; sub-agents,
wave-based execution, orchestration servers. pilot-spec goes the other way.
Main Claude does the work, one diff at a time.

The bet is that single-thread execution is reproducible (same spec + same
task → same plan), cheaper (one context), and reviewable. If the
bottleneck is human comprehension, more parallel work upstream just
generates more diff than the reviewer can hold in their head.

## Where it fits in my workflow

I use pilot-spec on any project I expect to come back to after more than a
week. The pattern that pays off most:

- `/sdd:spec build the spec from this codebase` on a repo I am inheriting
- `/sdd:check` to see what already drifts
- `/sdd:build --next` to chip through tasks

The unlock is that re-onboarding to a project is one command, not
transcript archaeology. The spec survived; the context did not need to.

That is enough for me to keep using it.
