---
title: "The 90/10 software rule small businesses can use"
description: "For decades only big companies could afford to build their differentiated software. AI collapsed the cost of that slice to where one developer can deliver it — which is exactly what a small business can now afford."
pubDate: 2026-06-11
tags:
  - ai-agents
  - llm-engineering
  - build-vs-buy
  - small-business
  - cost
---

## TLDR

A rule from AI-native operators:
buy 90% of your software off the shelf, and build only the 10% no vendor fits.
That custom 10% used to cost a team months and six figures,
so small businesses bought 100% and bent themselves to fit.
AI collapsed that cost by roughly an order of magnitude —
so one developer can now build the slice that sets you apart, while you keep buying the rest.

There's a rule going around among AI-native operators,
and the cleanest version of it comes from SaaStr —
a media company that reportedly runs on about three people and a couple dozen AI agents:
**buy 90% of your business software off the shelf, and build only the 10% where no tool fits.**

Don't try to out-build Salesforce or HubSpot in a weekend.
You'll ship a worse version and then spend six months maintaining it
instead of running your business.
But the slice that's genuinely *yours* —
the workflow that actually drives your business, the one no vendor sells —
build that.

That rule is the whole story of why AI changes the game for small businesses.
Not because small companies can suddenly build everything.
Because, for the first time, they can afford to build the 10% that matters.

## How a small business actually runs 90/10

Here's the practical version — five steps, in order.
The rest of this post is why each one holds up.

1. **Find the 10% worth building first.**
   It's the workflow your team holds together with spreadsheets, tabs, and Slack messages
   because no tool fits — the friction that sits *inside* your core process.
   That's the build candidate.
2. **Apply the someone-else's-full-time-job test to everything else.**
   Ask of each tool: is running this someone else's full-time job?
   If yes — CRM core, payments, email, auth, accounting — keep buying.
   Don't rebuild a category that has a real vendor behind it.
3. **Get one strong, AI-fluent developer instead of waiting for a team you can't afford.**
   The leverage now lives in one capable generalist
   who directs the AI tools *and* reviews their output.
   This is the part I do — and the honest boundary holds:
   if the work genuinely needs a standing team,
   that's work for a team, not a thing to fake with one person and a model.
4. **Adopt "custom core, SaaS periphery."**
   Build the differentiated workflow;
   buy communication, payments, analytics, and monitoring;
   connect them with one clean integration layer instead of a dozen brittle ones.
5. **Budget for the last 30% and the upkeep.**
   Plan for the hard finishing work and ongoing maintenance up front.
   That's where AI helps least and where projects quietly die.

## The old math: small businesses were stuck buying 100%

**Small businesses didn't build their 10% —
they bought 100% off the shelf and bent the business to fit.**

The 90/10 split isn't new.
Good engineering leaders have always known
you buy commodity software and build only your differentiators.
What's new is that small businesses can finally act on it.

For decades, the custom 10% was a luxury good.
A real business application —
an inventory system that mirrors your actual warehouse,
a scheduling tool built around your actual constraints,
a sales workflow that matches how you actually sell —
meant months of work from engineers on six-figure salaries,
plus someone to coordinate them.
All-in, that ran well into the hundreds of thousands of dollars before anything shipped.

A big company could fund that without blinking; the operational edge was worth it.
A 40-person distributor or a regional clinic could not.
Off-the-shelf software, by design, optimizes for the average customer.
A purchased workflow tool has to serve thousands of companies,
so it optimizes for the average case — and the average case is nobody's actual case.
Buying generic meant permanently accepting a poor fit
on the exact processes that should have set you apart.

So big players ran 90/10.
Small businesses ran 100/0.
*That* was the moat.

## What AI actually changed

**One capable, AI-fluent developer now reaches across what used to need a small team.**

The shift isn't that AI writes flawless software.
It doesn't.
It's that AI removed most of the grunt work —
scaffolding, boilerplate, glue code, first drafts, test stubs, documentation —
that made building the 10% headcount-intensive.

The research supports the direction, even where it argues about the size.
A large study run with Microsoft, Accenture, and a Fortune 100 manufacturer,
summarized by MIT Sloan,
found AI coding assistance raised completed tasks by roughly 26% on average —
and far more, 27% to 39%, for junior and newer developers.
An earlier controlled experiment had developers
finishing a discrete build about 56% faster with assistance.
Then agentic tools and the plain-language, describe-what-you-want workflow some call "vibe coding"
dropped the barrier again.
Building a working internal tool went from a months-long project to, often, a days-long one.

That speed comes with a catch worth stating plainly:
letting a model generate and iterate unsupervised produces slop —
code that demos well and breaks in production.
The barrier that fell is *writing* the code;
making it consistent, reviewable, and safe to run is a separate discipline.
That's the part I build around.
([pilot-spec](https://github.com/kborovik/pilot-skills/blob/main/pilot-spec)
is how I keep AI coding reproducible instead of one-shot luck.)

The effect on the 90/10 math is direct:
the cost of building the custom 10% fell by roughly an order of magnitude.
One developer's budget now covers what a team's budget used to.
A small business can afford one such developer.
So a small business can finally afford its 10%.

## The receipts: this is the 10% being built

**The clearest proof is companies building exactly the slice the rule points to —
and leaving the rest alone.**

*SaaStr* built two internal tools with AI that now run core operations.
One took over almost its entire marketing stack,
replacing some combination of HubSpot, Mailchimp, dashboards, and scheduling tools.
The other runs the sponsor relationships behind an eight-figure business —
work that used to need a CRM, a project tool, and a tangle of Zapier integrations.
Both would have taken a traditional team months and real budget.
And the same company that built them also preaches the 90/10 rule:
it isn't rebuilding Salesforce, it's building the operational glue no vendor sells.

*Harmonic*, a startup-discovery platform,
hit a wall with a $20,000-a-year third-party tool and rebuilt the functionality in-house.
*TrexoGlobal* built a custom document-generation engine that replaced three separate SaaS tools,
reporting 67% faster processing and a single source of truth instead of three competing databases.
A logistics firm documented in McKinsey's work
replaced a *$2.1M* warehouse management system with an AI-built platform
in *11 weeks for about $180,000* — roughly a tenth of the cost.

And the trend is broad, not anecdotal.
Retool's 2026 *Build vs. Buy* report, surveying 817 builders,
found 35% of teams have already replaced at least one SaaS tool with a custom build,
and 78% plan to build more in 2026.
Tellingly, 60% of those builds happened as "shadow IT" —
created by operations managers, finance leads, and founders, not just engineers.
The categories most often replaced are exactly the high-fit-sensitivity ones:
workflow automations, internal admin tools, CRMs, BI, and customer support.

The biggest cautionary tale is also the most cited, and it's worth getting right.
*Klarna* announced it shut down Salesforce and Workday amid an AI overhaul,
and its revenue per employee jumped from about $400K to $700K in a year.
But it didn't replace those platforms with purely AI-built software —
it adopted Deel for HR, blended in other third-party tools,
and stayed a Salesforce partner through Slack.
Klarna is partly a *consolidation* story, not a pure "AI rebuilt everything" story.
Which is exactly the point:
even the poster child for ripping out SaaS still buys most of its stack.
It just built the parts that mattered.

I'll add one receipt of my own,
because it's the kind of claim I'd rather you be able to check than take on faith.
I built [MailPilot](https://lab5.ca/mailpilot/) to solve a business problem of my own —
a production AI agent that reads an incoming business email, searches a knowledge base,
and replies with a sourced answer in under a minute.
I didn't go buy a support-automation SaaS and bend my process to it.
The fit *was* the point, so I built the 10%.
The code is open, every model call is traced,
and you can email the agent yourself and watch what it does.

## Why the 90 stays 90

**Building the wrong 90% is how these projects fail — and they fail often.**

The rule only works because both numbers are real.
An MIT study found roughly 95% of attempts to put generative AI into business processes
show no measurable return.
Gartner expects only about 35% of point-product SaaS tools to be replaced by AI agents by 2030 —
meaning about 65% survive.
The METR study found experienced engineers were roughly 19% *slower* with AI
in codebases they already knew well.
And engineer Addy Osmani's framing nails the trap:
AI gets you 70% of the way fast,
but the last 30% —
edge cases, architecture, security, the gap between a demo and production —
is the hard part.
A demo runs once.
Production code has to run a million times without breaking.

There's also a maintenance tail.
Shipping with AI is easy;
*sustaining* it — patches, governance, uptime — still takes real discipline.
Which is why Retool's finding that most builds happen outside any IT oversight
is a warning as much as a milestone.

This is where the someone-else's-full-time-job test from step 2 earns its keep.
Ask it of each tool: *is this product someone else's full-time job?*
If yes —
if it touches customer data, handles payments, needs SOC 2,
or has to run at scale without babysitting —
pay them.
You will not out-build a vendor's core product,
and trying turns you into an IT shop instead of a business.
The custom 10% is for what's specific and differentiating to you.
Everything else is the 90 you should happily keep buying.

That line between the projects that earn their keep and the 95% that don't
is the same line I write about everywhere on this site:
it's mostly a question of how the system is built —
grounded in real sources, capped so a bug can't run up a fortune,
instrumented so you can see where the money goes —
not which model it uses.

## The bottom line

**AI collapsed the cost of that 10% to where one developer can deliver it —
and one developer is something a small business can afford.**

The 90/10 rule was always the right way to think about software.
What changed is who gets to follow it.
For decades, only companies large enough to fund an engineering team
could afford to build their differentiated 10%;
everyone else bought 100% off the shelf and accepted a poor fit on the things that mattered most.

So the question isn't "can we build like the big players now?"
You shouldn't want to.
You should want to build like SaaStr: buy the 90%, and finally build your 10%.

If you want to find the 10% in your own operation —
and get the cost-per-outcome math on it before you commit to building —
[book a 30-minute call](https://calendar.app.google/BpDHFsKt2NkbSW297).

---

### Sources & further reading

- SaaStr — the 90/10 rule and the "someone else's full-time job" test,
  plus coverage of its two internal AI-built tools
- Retool — *2026 Build vs. Buy Report*
  (35% have replaced a SaaS tool, 78% plan more, 60% shadow IT; the Harmonic example)
- MIT Sloan — *How generative AI affects highly skilled workers*
  (Copilot productivity: ~26% average, 27–39% for juniors)
- Cerbos — *The Productivity Paradox of AI Coding Assistants*
  (METR findings; Osmani's 70/30 framing; demo-vs-production)
- The MIT figure on ~95% of generative-AI business attempts showing no return
- Gartner — ~35%-of-SaaS-replaced-by-2030 forecast
- McKinsey — the logistics warehouse-management rebuild ($2.1M → ~$180K in 11 weeks)
- CX Today — the Klarna correction (Deel + blended SaaS, still a Salesforce partner)
- Velsof — the "custom core, SaaS periphery" model and the TrexoGlobal document-generation example
- VentureBeat — the "average case is nobody's actual case" point
