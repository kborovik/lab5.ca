---
title: Measuring math-glyph compression
description: I ran 30 SPEC.md rows through Claude's tokenizer to measure how much math-glyph notation actually compresses. Two numbers — ~30% encoding, ~90% reviewer-facing.
pubDate: 2026-05-18
tags: [spec-driven-development, claude-code, ai-coding, benchmarks]
---

I claim in the previous post that math-glyph notation lets a full
project spec &mdash; invariants, tasks, bug history &mdash; sit in one
file Claude reads at session start. That claim only works if the
compression is real and durable. So I wrote a benchmark.

## TLDR

Across 30 rows from `SPEC.md`, math-glyph encoding is **~30% denser**
than a minimal prose decode (pure notation savings) and **~90% denser**
than what a human reviewer actually reads via `/sdd:explain` (notation
savings plus deferred sibling-context expansion). The benchmark lives
in [pilot-skills/benchmarks/glyph](https://github.com/kborovik/pilot-skills/tree/main/benchmarks/glyph)
and re-runs against the current `SPEC.md` so the numbers stay honest
as the encoding evolves.

## Why measure it at all

"Compressed" was a word I'd been using without a number behind it.
That's fine in a blog post but not fine in a design decision. I needed
to defend two claims to myself:

- The encoding actually saves tokens vs the same content in English.
- The savings are not an artifact of one cherry-picked row.

A repeatable benchmark, tracked in git, is the only honest way to
keep those claims alive as the skill evolves. The encoder lives at
[pilot-skills/pilot-spec/skills/glyph](https://github.com/kborovik/pilot-skills/tree/main/pilot-spec/skills/glyph),
the decoder at
[pilot-skills/pilot-spec/skills/explain](https://github.com/kborovik/pilot-skills/tree/main/pilot-spec/skills/explain).
If either drifts, the benchmark catches it on the next run.

## Two decoders, two numbers

The interesting part of the design isn't the encoder. It's that there
are two reasonable ways to decode, and they answer different questions.

**Minimal decoder.** System prompt: `Expand to plain English. Preserve
every fact. Output prose only, no preamble.` Strips `∀` to "for all",
`→` to "implies", and stops. Same facts, no surrounding context. This
is the fairest comparison against a hypothetical English-only spec
that uses the same level of detail per row.

**Canonical decoder.** The `/sdd:explain` skill from the plugin itself
&mdash; heading, row quote, plain-English restatement, walk of cited
siblings, bottom-line summary. This is the form a human reviewer reads
when they need to understand a row well enough to act on it.

If you only compare against the minimal decoder, you're measuring how
compact the symbols are. If you only compare against the canonical
decoder, you're measuring symbols plus everything else `/sdd:explain`
pulls in &mdash; and that "everything else" is decoder behavior, not
encoder cleverness. So the benchmark reports both.

## The grand totals

n = 30 (first 10 rows from each of `§V`, `§T`, `§B`):

- **Minimal: +0.29.** Pure encoding overhead. Same content, fewer
  tokens.
- **Canonical: +0.89.** Notation savings plus deferred sibling-context
  expansion.

The 60-point gap is the part most readers miss when they look at "how
compressed is this." It's not the encoder doing more work in the
canonical case &mdash; it's the decoder pulling in cited rows from
elsewhere in `SPEC.md` so the reader can act on what they're reading.

A traditional human-readable spec without `§V.<n>` and `§T.<n>`
citations would have to inline that context on every related row,
multiplying file size and creating its own drift problem when an
invariant amends. Math-glyph keeps references as references and pays
the inlining cost only at decode time, only for the row being read.

## Worked example

Take `§V.6` from the pilot-skills `SPEC.md`:

> plugin name ≠ dir name &mdash; resolve plugin → dir via
> `.claude-plugin/marketplace.json` `plugins[].source`; ⊥ hardcode dir
> paths in cmd ∨ skill bodies.

**85 tokens** in glyph form. The minimal decoder produces **140
tokens** of fluent English saying the same thing &mdash; a 39%
reduction. The canonical decoder produces **683 tokens**: heading,
restatement, cited siblings, status note, bottom line &mdash; an 88%
reduction over the same row.

The canonical output is eight times the size of the row. That
eightfold isn't the encoder. It's `/sdd:explain` walking the cited
`§T.37` and pulling in the surrounding invariants so a reviewer who
didn't write the spec can still act on it.

For a context-heavy row like `§B.7` &mdash; a bug whose meaning is
held almost entirely in its references &mdash; the canonical decoder
produces 1117 tokens against a 139-token row, same 88% reduction. The
ratio is roughly constant in canonical mode because canonical output
is dominated by sibling expansion, not row body.

## What surprised me

A few results from the run worth flagging:

- **`§T` and `§B` compress better than `§V` under the minimal
  decoder.** I'd expected the opposite &mdash; `∀` and `→` look denser
  than pipe-table rows. The reason: pipe rows like
  `T<n>|<status>|<desc>|<cites>` gain connective tissue when expanded
  ("This task has status complete and cites V1 and V23, namely..."),
  while `§V` rows are already prose-like under the hood, so unwrapping
  them adds less.
- **A few `§V` rows go slightly negative under the minimal decoder.**
  `V3` and `V4` produce minimal-decoder output of nearly the same
  length as the row itself. The encoding doesn't compress everything
  equally, and the benchmark is honest about that.
- **The canonical p25&ndash;p75 band is narrow** &mdash; about
  0.85&ndash;0.93 across all sections. Canonical output is dominated
  by sibling expansion, which doesn't scale much with source row size.
  Short row or long row, the decoder pulls in roughly the same
  context.

## How a run works

Per row, the pipeline is five steps:

1. Count tokens of the row body via Anthropic's `/v1/messages/count_tokens` endpoint, model `claude-opus-4-7`.
2. Decode via the minimal-decoder system prompt; capture prose output.
3. Decode via the canonical decoder &mdash; the `/sdd:explain` skill
   body verbatim as system prompt, with the full `SPEC.md` attached
   inline so the decoder can resolve citations without filesystem
   access.
4. Count tokens of both prose outputs.
5. Compute `reduction = 1 - n_glyph / n_prose_*` for each decoder.

30 rows × (1 token-count + 2 decodes + 2 token-counts) = 150 API
calls per run. The script self-bootstraps `uv` from PEP 723 inline
metadata so the host needs no Python deps. Results append to
[`glyph-bench-results.json`](https://github.com/kborovik/pilot-skills/blob/main/benchmarks/glyph/glyph-bench-results.json),
tracked in git so the trend is visible across commits.

I run it after any structural change to the `glyph` skill or the
`explain` skill &mdash; the two pieces that move the numbers. So far
the trend has been flat, which is the point.

## Why bother

I can't claim "the spec is small enough to live in context" without a
number behind it. The minimal-decoder number lets me defend the
encoding choice against "you could just write English." The
canonical-decoder number lets me defend the cite-don't-inline choice
against "why not spell it out in every row." Both are answers to
objections I've actually gotten.

The benchmark code is at
[kborovik/pilot-skills](https://github.com/kborovik/pilot-skills/tree/main/benchmarks/glyph).
It's not packaged for general use &mdash; the corpus is specifically
the `SPEC.md` from the same repo &mdash; but the methodology is
portable. If you're building any notation that claims to compress
against prose, you probably want to measure both numbers, not just
the one that looks better.
