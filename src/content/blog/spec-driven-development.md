---
title: Compressed spec-driven development
description: I built pilot-spec to keep AI coding agents on one thread, with one spec, so I can actually track what changed, what was tested, and what broke.
pubDate: 2026-05-13
tags: [spec-driven-development, claude-code, ai-coding]
---

## TLDR

[Spec-driven development](https://grokipedia.com/page/Spec-driven_development), compressed via [math-glyph](https://github.com/kborovik/pilot-skills/blob/main/pilot-spec/skills/glyph/SKILL.md) notation so the full specification, open tasks, and bug history all fit inside a single agent's context window. One file. One thread. No subagents.

## Losing the thread

I kept losing track of what Claude was doing.

The pitch for multi-agent setups is throughput. Spin up subagents in parallel git worktrees, dispatch tasks, merge the wins. In practice I couldn't hold the whole picture in my head: which task was done, how it was tested, what regressed, which bugs were still open. The agents moved faster than I could review, and review was the part that had to be right.

[**pilot-spec**](https://github.com/kborovik/pilot-skills) is what I built to fix that. It's a **Claude Code plugin** that collapses everything I need to know about a project — goals, constraints, interfaces, invariants, tasks, bugs — into one root `SPEC.md`.

> **One file. One thread. No subagents.**

It is, deliberately, slower than fanning out work to parallel agents. The trade is determinism, control, and a single artifact I can read end-to-end before approving a diff.

## The problem with parallel agents

A subagent fleet looks productive. While I'm reviewing one branch, the others are still working. By the time I finish, three more diffs are waiting and the plans behind them are scattered across disposable chat threads.

The breakdowns I hit, in order of how often they bit me:

- Two agents touched overlapping code. The merge was clean. The behavior wasn't.
- An agent declared a task done because its narrow test passed. The test was wrong.
- A bug surfaced in production. I had no record of the invariant it violated, so the next agent reintroduced it three weeks later.
- I asked "is feature X done?" and the only honest answer was "let me read three plan documents and grep for the relevant commits."

None of this is a Claude failure. **It's a process failure.**

> **The information I needed in order to review safely was never collected in one place.**

## How pilot-spec works

The whole system is a single file at the repo root, `SPEC.md`, with six fixed sections:

- `§G GOAL` — what this project is for, in one short paragraph.
- `§C CONSTRAINTS` — hard rules: language, runtime, target platform, external systems.
- `§I INTERFACES` — public surface: HTTP routes, CLI commands, exported functions, file formats.
- `§V INVARIANTS` — properties that must always hold, numbered. For example: `V12: ∀ req → auth check before handler`.
- `§T TASKS` — work, one row per task. Pipe-delimited: id, status, description, invariants it must respect.
- `§B BUGS` — bug rows in the same shape, with date and root cause.

The encoding is math-glyph: `∀ ∃ ∴ ⊥ ≤ ∈ ∧ ∨ →`, plus pipe tables and sentence fragments. It reads like notation, not prose. I am not the target reader of `SPEC.md` — Claude is. When I need to read it as a human, `/sdd:explain` decompresses any citation back into English.

**The result is small enough to live in context.** The current `SPEC.md` for [MailPilot](https://github.com/kborovik/mailpilot), my AI email automation project, is roughly 23,000 tokens — about 10% of a 200K Claude context window. The whole project — goals, constraints, interfaces, invariants, open tasks, bug history — sits in context for every prompt. No retrieval layer, no embedding store, no MCP server, no vector index. The spec is one file Claude reads at session start and writes back through `/sdd:spec`. **There is nothing else to break.**

The plugin exposes five slash commands. They map cleanly onto the loop I want:

- `/sdd:design` — propose-then-critique a structural change. Writes a steno-encoded draft to `designs/<slug>.md`. I fold accepted designs into `SPEC.md` with `/sdd:spec`.
- `/sdd:spec` — the only command that mutates `SPEC.md`. Behind it is a Socratic gate that classifies my input as NEW, DISTILL, AMEND, or BACKPROP, then writes the rows.
- `/sdd:build` — plan, then execute, against `SPEC.md`. Single thread, no subagents. If a test or build fails, it auto-invokes the backprop protocol before retrying.
- `/sdd:check` — read-only drift detector. Compares `SPEC.md` against the current code and reports violations, grouped by severity. Never writes.
- `/sdd:explain` — math-glyph to prose. The escape hatch when a reviewer (usually me) needs the English version of `§V.7` during code review.

The piece I rely on most is backprop. On a test or build failure, `/sdd:build` doesn't just retry. It traces the cause, decides whether the failure class needs a new `§V` invariant, appends a `§B` row, and ships a failing test alongside the fix in one commit. Every incident becomes a permanent guard rail. **The same bug can't bite twice**, because the invariant catches it on the next plan.

## What I gave up

**pilot-spec** is slower. I am the bottleneck most of the time, because the spec edit, the design loop, and the single-thread build all run through me. There is no parallel work happening in the background. If two features could be built independently, I build them sequentially.

It is also Claude Code only. I haven't ported the skills to other harnesses, and I'm not sure I will — the slash commands and the Socratic gates lean on Claude Code's plugin model.

The math-glyph encoding is hostile to read at first. I needed `/sdd:explain` for the first week. I now skim it fluently for the sections I touch often, but a teammate joining the project would have the same week-long ramp.

## What I gained

**Better software quality.** Backprop turns every fixed bug into a guard rail. The invariant set grows monotonically, and the build refuses to ship code that violates it. Regressions in the classes I've already hit don't come back.

**Better loop control.** At any moment, `SPEC.md` is the answer to "what is this project, what's done, what's pending, what failed, why." I don't have to reconstruct the state from chat history. `/clear` doesn't lose me anything — the next session reads `SPEC.md` and is caught up.

**A single artifact I can review.** Before I approve a `/sdd:build` run, I read the plan it produced against `SPEC.md`. After, I read the diff against the same. The spec is the contract. The diff either honors it or it doesn't. There is no third state.

## Comparison with Superpowers

The closest project in spirit is Jesse Vincent's [obra/superpowers](https://github.com/obra/superpowers). It's the most visible opinionated framework in this space, and it's worth understanding the design difference, because the two projects bet on opposite bottlenecks.

Superpowers is a multi-harness methodology — Claude Code, Codex, Cursor, OpenCode, Copilot, Gemini — packaged as skills. Its execution model is subagent-driven: brainstorming, plans, parallel git worktrees, test-driven development per subagent, two-stage review. A session-start hook tells Claude it has Superpowers and points it at `getting-started/SKILL.md`. The skills themselves are prose-heavy markdown with embedded workflow diagrams. The bet is that more parallelism, hard-gated by enforced TDD discipline, equals more leverage.

**pilot-spec** rejects almost every one of those choices. Single thread. One file. Math-glyph notation instead of prose. Claude Code only. **The bet is that human comprehension is the bottleneck, not agent throughput** — that the cost of AI coding is review, not generation, and the way to reduce review cost is to make the project state small enough to fit in one file.

Both are Claude Code plugins. Both build on Anthropic's Agent Skills standard. After that, they diverge:

- **Execution.** Superpowers dispatches subagents in parallel worktrees. **pilot-spec** runs a single Claude thread.
- **Spec.** Superpowers' artifacts are prose `SKILL.md` files plus plan documents per task. **pilot-spec**'s artifact is one root `SPEC.md` in math-glyph encoding, mutated only through `/sdd:spec`.
- **Harness.** Superpowers targets six harnesses. **pilot-spec** is Claude Code only.
- **Bug handling.** Superpowers handles bugs inside the per-task TDD loop. **pilot-spec** promotes recurrence-class bugs into permanent `§V` invariants via backprop, then guards them at every future build.
- **Reader.** Superpowers' skills are written for the agent and the human equally. **pilot-spec**'s `SPEC.md` is written for the agent first, with `/sdd:explain` as the human escape hatch.

If I were optimizing for parallel agent throughput on greenfield features across multiple AI tools, I'd reach for Superpowers. I'm not optimizing for that. I'm optimizing for "I am the only reviewer, and the project has to keep working in six months."

## When to pick which

Superpowers if you trust subagent orchestration, want immediate productivity across multiple harnesses, and your team has the bandwidth to review parallel branches.

**pilot-spec** if review fatigue is your real cost, you're a solo or small-team reviewer, you want one auditable artifact that survives `/clear` and handoff, and you're already on Claude Code.

Neither for prototypes or throwaway scripts. Both add ceremony that only pays off when correctness, reviewability, and durability matter.

The plugin is at [kborovik/pilot-skills](https://github.com/kborovik/pilot-skills). The math-glyph encoding is adapted from [JuliusBrussee/cavekit](https://github.com/JuliusBrussee/cavekit). To try it inside Claude Code:

```
/plugin marketplace add kborovik/pilot-skills
/plugin install sdd@pilot-skills
```
