---
title: Smoke-testing an LLM agent with a Claude Code skill
description: A Claude Code skill that smoke-tests an LLM agent end-to-end — real Gmail, real Drive, real model. Verifies that the agent does the right thing on real inputs, which ruff and pytest cannot.
pubDate: 2026-05-19
tags: [testing, claude-code, ai-coding, smoke-test]
---

## TLDR

[MailPilot](https://github.com/kborovik/mailpilot) is an agent-driven CRM
where the business logic lives inside a Pydantic AI agent,
so I test it in three layers: `ruff` + `basedpyright` and `pytest` verify the *machinery*,
and a Claude Code [smoke-test skill](https://github.com/kborovik/mailpilot/blob/main/.claude/skills/smoke-test/SKILL.md)
verifies the *agent* against real Gmail and a real knowledge base.
Claude Code is the runner, the assertions live in deterministic gates plus one structured-JSON LLM judgment,
and every recurrence-class failure auto-files into `SPEC.md` via `/sdd:spec`.

## Why the pyramid is wrong here

**With an LLM at the core, the testing pyramid inverts &mdash; mocking the model out
is mocking the system under test out.**

The standard testing pyramid puts unit tests at the bottom
because they're fast and deterministic, integration in the middle, and end-to-end at the tip.
With an LLM at the core of the system, that shape inverts.
The agent can pass every mocked test
and still write a confidently fabricated reply citing a vendor that doesn't exist.

So the layers I actually run aren't a pyramid.
They're three different jobs, each catching what the layer below cannot.

## Layer 1: ruff + basedpyright

**Layer 1 is ruff and basedpyright in strict mode &mdash; type errors, import cycles, and shape drift
surface in under three seconds, but it catches nothing the agent decides.**

`make lint` runs `ruff format`, `ruff check --fix`, and `basedpyright` in strict mode.
This is the layer pytest cannot replace &mdash;
type errors, import cycles, and unused symbols surface here in under three seconds.
Strict mode means undeclared `Any` and missing return types fail the build.

What this layer catches:

- Wrong shapes flowing through the CLI envelope
  (every command returns `{<entity>: ..., ok: true}` per `§V.5` &mdash;
  a type error signals a contract drift).
- Forgotten `psycopg.sql` composition that would otherwise become an f-string SQL injection.
- Tool-return drift in the Pydantic AI agent.
  Tools return Pydantic models;
  if a field renames and a call site is missed, `basedpyright` fails.

What this layer cannot catch: anything the agent decides.

## Layer 2: pytest

**Layer 2 is pytest against a real Postgres with mocked HTTP boundaries &mdash; it verifies the wiring,
but mocking the model returns whatever I tell it to, which is no test of the model.**

`make py-test` runs 31 test files against `postgresql://localhost/mailpilot_test`.
The database is real (truncated before each test, not mocked);
HTTP boundaries to Gmail and Anthropic are mocked via `pytest-httpx`;
Logfire spans are captured via the `CaptureLogfire` fixture from `logfire.testing`
and asserted on structurally.

This layer verifies the wiring:

- `routing.route_email` emits the expected `route_method` attribute on each branch
  (`thread_match`, `classified`, `skipped_no_workflows`).
- `instrument_pydantic_ai()` produces a `gen_ai.tool.name` attribute
  on every tool span (`§V.26`).
- Idempotent inserts under race collide cleanly (`§V.18`).
- Activity rows fire from the correct runtime paths
  (`enrollment_added`, `email_sent`, `enrollment_completed`).

What pytest cannot verify:
that Claude, given a real Drive folder and a real Gmail thread,
produces a reply grounded in the source document.
Mocking the model returns whatever I tell it to return, which is not a test of the model.

## Layer 3: the smoke-test skill

**The third layer runs the agent end-to-end against real Gmail, real Drive, and the real model &mdash;
two mandatory scenarios that stage the concurrent cross-talk no unit test can reproduce.**

> The runner is Claude Code.
> The system under test is everything else.

I wrote `/smoke-test` as a Claude Code
[skill](https://github.com/kborovik/mailpilot/blob/main/.claude/skills/smoke-test/SKILL.md) &mdash;
a markdown file at `.claude/skills/smoke-test/SKILL.md`
that Claude Code loads when I type "smoke test"
or after a non-trivial change to sync, routing, agent execution, KB grounding, or Pub/Sub code.
The skill body is a procedure: phases, steps, gates, and a final report format.
Claude Code executes the procedure end-to-end,
polls until each gate passes or fails, and writes a structured report.

Two scenarios share one setup and one running process:

- **Scenario A &mdash; outbound workflow.**
  Create an account, a contact, a workflow.
  Trigger the agent to send a personalized outbound email.
  Wait for delivery in the other mailbox, send a manual decline reply,
  and verify the agent routes the reply back via `thread_match`,
  processes it, marks the enrollment outcome, and *stops replying*.
- **Scenario B &mdash; KB-grounded demo.**
  With the outbound workflow from A still active,
  layer a second workflow on a second account that reads the real `MailPilot Demo` Drive folder
  (10+ markdown docs on water-treatment products).
  Send an in-scope question,
  expect a grounded reply within 60 seconds citing one of three seed documents.
  Send an out-of-scope question, expect a polite decline that does not fabricate specs.

Both scenarios are mandatory.
The outbound workflow staying active through Scenario B
is the test for concurrent multi-workflow, multi-account operation &mdash;
exactly the cross-talk failure mode no unit test can stage.

## What Claude Code as the runner buys

**Claude Code as the runner buys three things a CI pipeline cannot: LLM judgment at the leaves with determinism at the joints, real APIs instead of fakes, and a report that files its own spec actions.**

**1. Judgment at the leaves, determinism at the joints.**
Most gates are deterministic:
`mailpilot email list --since X` returns rows,
the skill parses the JSON envelope, asserts equality.
But Gate B4 &mdash; "is the reply grounded in the source document?" &mdash; is an LLM judgment,
because the reply is natural language and the source is natural language.
Substring matching against `expected_tokens` was tried and retired
(false negatives on `0.48 mm` vs `0.48mm`).
Operator-graded, structured-JSON verdict won:

```json
{
  "qa_id": "qa-in-007",
  "answers_question": true,
  "every_factual_claim_supported_by_source": true,
  "cites_source_file": true,
  "unsupported_claims": [],
  "verdict": "pass"
}
```

The `unsupported_claims` array is the anti-sycophancy lever.
The grader has to enumerate concrete misses verbatim, not hand-wave a passing rating.
`verdict: pass` if and only if all three booleans are true AND `unsupported_claims` is empty.
The same trick scales to any LLM-judging-LLM gate:
force the judge to produce evidence, not a score.

**2. Real APIs, not fakes.**
Gmail domain-wide delegation, Drive Shared Drive ACLs,
Pub/Sub push notifications, the Anthropic API.
The test accounts are real (`outbound@lab5.ca`, `inbound@lab5.ca`, `hello@lab5.ca`),
the Drive folder is real (the same folder behind [lab5.ca/mailpilot](/mailpilot)),
the LLM round-trip is real.
Failures in service-account delegation, Pub/Sub topic ACLs, or Shared Drive membership
show up here and nowhere else.

**3. The report is a queue of spec actions, not prose.**
The skill ends with a §1 Execution / §2 Bugs / §3 Invariants report.
Each Bug carries a `Spec action:` line &mdash;
the exact `/sdd:spec` invocation that would file it.
Critical and High bugs auto-invoke `/sdd:spec` from the same Claude Code session.
Bugs become `§B` rows; recurrence-class bugs become new `§V` invariants.
The next `/sdd:build` plan respects the new invariant.
*The loop closes inside one chat session*, with no copy-paste between tools.

## Why a skill instead of a shell script

**A markdown skill beats a shell script because branching reads as natural language, variables stay conversational, and the agent that runs the test files the bug in the same session.**

The skill is markdown.
It calls out to `bash`, `python3`, `mailpilot`, and Logfire SQL &mdash;
but those calls are inline code blocks Claude Code executes, not a wrapper script.
Three reasons:

- **Branching is natural language.**
  "If the count is zero or `not_found`, the failure is Drive ACL, not KB content"
  is a clearer branch than the bash equivalent.
  The skill body reads like a runbook, and runbooks survive longer than scripts.
- **Variables are conversational.**
  Every step labels its outputs
  (`OUTBOUND_ACCOUNT_ID`, `TRIGGER_THREAD_ID_B1`, `LATENCY_B1`)
  and the next step quotes them.
  Claude Code maintains those as context.
  There is no `.env` file to keep in sync.
- **The agent that ran the test files the bug.**
  When a Critical Bug fires at Gate B4,
  the next tool call is `/sdd:spec bug: ...` in the same session,
  with the failed verdict JSON inline.
  The handoff cost is zero.

The downside is honest:
a smoke-test run costs an LLM round-trip per step plus ~7 minutes of wall clock.
It is not a CI gate.
It is a pre-commit ritual after a non-trivial change to the agent surface,
the sync loop, or the routing pipeline &mdash;
the way you would run an integration test against a staging environment,
when the diff justifies it, not on every push.

## What it caught

**Only the real model, on the real prompt against an empty search result, has to choose between
declining and inventing &mdash; so the smoke test caught the fabricated-spec regression that pytest-httpx can never stage.**

The failure mode I hit most often was the agent fabricating specs on out-of-scope questions.
The Drive search returned no hits,
but the agent answered anyway with plausible-sounding vendor part numbers.
That regression cannot be staged in pytest &mdash;
`pytest-httpx` returns whatever I write into the mock.
The smoke test catches it because the real model, on the real prompt,
against an empty `search_drive_markdown` result,
has to choose between "decline" and "invent."
Watching that choice fail, then encoding the failure as a §V invariant,
then re-running and watching `qa.py check` reject the invented spec by regex &mdash;
that loop is the actual product.

## When to add a skill instead of a test

**Reach for a smoke-test skill, not a pytest test, when the model call can't be credibly mocked,
the output is natural language a human would have to grade, or a failure should produce a spec entry rather than a ticket.**

A pytest test is right when the input space is small and the expected output is exact.
A smoke-test skill is right when:

- The system under test makes a model call you cannot credibly mock.
- The output is natural language a human would have to grade.
- The wiring crosses three or more real services and one failure mode is "service A's ACL changed."
- A failure should produce a spec entry, not a Jira ticket.

For everything else, `make check` is enough.
The point is not to replace pytest with Claude Code.
It is to admit that the layer above pytest exists, give it a real runner,
and stop pretending that mocked HTTP and a recorded model response
constitute end-to-end coverage of an agent-driven system.

The skill lives at
[mailpilot/.claude/skills/smoke-test/SKILL.md](https://github.com/kborovik/mailpilot/blob/main/.claude/skills/smoke-test/SKILL.md).
It is roughly 770 lines of markdown.
The matching CI surface (`make check`) is two lines of `pyproject.toml` and a Makefile target.
Both are necessary.
Neither is sufficient on its own.
