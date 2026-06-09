import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const fmtDate = (d: Date) => d.toISOString().slice(0, 10);
  const blogSection = posts
    .map(
      p =>
        `${p.data.title} (${fmtDate(p.data.pubDate)}). ${p.data.description} https://lab5.ca/blog/${p.id}/`,
    )
    .join('\n\n');

  const body = `# LLM systems that do real work — without becoming a money pit.

I build and optimize business processes with AI agents, then measure the cost per outcome so you can see the return before you scale it. Production systems, traced to the dollar — not pilots that quietly bleed.

20+ years shipping production software · AI agents running in production today · Toronto-based.

## The problem

Every business runs on a layer of repetitive, lookup-heavy work that quietly consumes skilled time. Answering the same product questions over and over. Pulling a number out of a document and writing it into a reply. Triaging inbound email. Filling the same fields from the same forms. None of it is hard — that's exactly why it's expensive. It's a knowledgeable person, on a loaded salary, spending hours a week on tasks that follow a pattern.

The cost is hidden because it never shows up as a line item. It's spread across people who could be doing higher-value work, and across customers who wait hours for an answer that could take seconds.

Repetitive, lookup-heavy work is what LLM systems are genuinely good at — high-volume, rule-following tasks, done instantly and consistently. The promise is simple: take that repetitive load off your team, answer it in seconds instead of hours, and free your skilled people for the work that actually needs a human. The catch is that it has to be built so you can trust it and afford it — grounded in real sources, designed to decline rather than guess, and measured to the dollar.

## What I do

Build Business Processes with AI. A new business process, powered by an LLM agent and built to be measured from day one. High-volume, lookup-heavy, repetitive work — pre-sales questions, RFP responses, document processing, tier-one support — answered instantly and consistently, with the cost per outcome traced before you scale it.

Rescue a Runaway AI Project. An AI initiative that's stalled or running up a bill nobody can explain. I instrument what it's actually doing, find where the money goes, cap the runaway paths, and add the grounding and guardrails that should have been there first — so it earns its keep instead of becoming the budget line you regret.

Either way you get one senior owner end to end: the retrieval, the guardrails, the observability, the deployment. No layer of account managers between you and the person building it.

## Proof

Fair thing to ask first: this is self-reported, it's one project, and the numbers are early. So here is what makes it checkable rather than something you take on my word — the code is open on GitHub, every model call is traced, and you can email the agent yourself and watch what it does. A claim you can verify beats a testimonial you can't.

I built MailPilot to solve a business problem of my own (not a product I sell) — a production AI agent running on my company's inbox. It reads an incoming business email, searches a knowledge base, and replies with a sourced answer in under a minute. If the question is outside its knowledge base, it declines and says so rather than guessing. You can email it yourself at hello@lab5.ca.

Every model call is traced, so the economics aren't a guess:

- Cost per sourced reply: MailPilot ~$0.03 (measured) vs A person ~$5.00 (assumption)
- Response time: MailPilot ~20 seconds vs A person hours
- Out-of-scope questions: MailPilot declines, no guessing vs A person varies
- At 1,000 emails / month: MailPilot ~$30 vs A person ~$5,000

More than a 100× difference in cost, hours-to-seconds in speed. The $5 is my assumption, labeled as one — swap in your own loaded cost per reply and the ratio shifts, but the order of magnitude doesn't. The point isn't to replace people — you can't fire 1/100th of an employee. It's that a category of repetitive work stops consuming thousands of dollars of skilled time and frees that person for work that needs them.

The cost is not the only risk — it's an agent confidently inventing a price or a spec and sending it over your name. MailPilot grounds every answer in a source document and cites the file it used, so any reply is checkable. Out-of-scope detection and fabrication checks run as mechanical tests in every build cycle — behavior measured in the logs, not asserted in a slide.

Read the full cost-per-outcome breakdown: https://lab5.ca/blog/what-one-ai-email-costs/

## How the money stays under control

None of this is exotic — it's just the discipline most pilots skip:

- Measure cost per outcome — per email, per document, per ticket, not token volume.
- Cap usage — so a bug can't run up a fortune overnight.
- Instrument every call — so you can see exactly where the money goes.
- Ground answers in real sources — and decline when uncertain, so the system doesn't invent facts under your brand.
- Scale to zero when idle — so you're not paying for it overnight.

That's the difference between the 5% and the 95%, and it's mostly a question of how the system is built — not which model it uses.

## Why me

You pay wholesale, not retail.

When you hire a software agency, most of your bill never reaches the people writing your software. It pays for the sales team that closed the deal, the account manager who forwards your emails, the project manager who runs the standups, and the margin stacked on top of all of it. The engineer doing the actual work often sees only a fraction of the rate you're billed. Put the other way: the rate an agency charges is frequently three to four times what reaches the person who writes your code.

Working with me, that overhead doesn't exist. No sales layer, no management tier, no markup on a subcontractor. You pay the person building the system directly — and you get that senior person on every call, not a junior assigned after the pitch.

It's also why the strongest engineers don't stay at agencies: the model keeps most of what they earn. Going direct gets you both the more senior person and the lower rate at once — the two things an agency's structure is built to keep apart.

The quieter worry with one person: what if I get hit by a bus? Worth saying plainly — every employee is a bus-factor too, and usually a worse one, because the knowledge that walks out with them was never written down. You don't carry that exposure here. You hold the whole system: the code lives in your repository, it runs in your cloud account, and the retrieval, guardrails, and observability come documented in plain language — not locked in my head. Any competent engineer can pick it up and keep going, which makes the bus-factor lower than most hires give you. It's the inverse of the lock-in an agency sells: handover is a git clone, not a renegotiation. The honest boundary: if the work genuinely needs a full standing team, that's work for a team — not what I'm pitching here.

The credentials behind that:

- 20+ years shipping production software — data centers, payments, real estate. This isn't my first system that has to work on Monday.
- Solo, end-to-end delivery — back-end, infrastructure, CI/CD, deployment, observability. One accountable owner, full product-cycle ownership.
- AI agents in production today — LLMs, retrieval (RAG), structured extraction, with the guardrails and tracing that make them safe to put in front of customers.
- Toronto-based, long-term contract — embedded with your team, not a drive-by engagement.

Built on: Anthropic Claude · Google Gemini · Python · FastAPI · Pydantic AI · RAG · MCP · Google Cloud / Azure · Terraform · Kubernetes · OpenTelemetry

## Closing

If you're evaluating whether AI can do real work in your business without becoming a money pit — that's precisely the question I build for, and measure. Want the cost-per-outcome math on a workflow in your own operation?

Book a 30-minute call: https://calendar.app.google/cYM3H3TsHsequR587

## Projects

- MailPilot — Production AI agent for business email; Pydantic AI on a Google Cloud backend; live at hello@lab5.ca. https://github.com/kborovik/mailpilot
- gcp-devops — Reference Terraform / Ansible / IaC patterns for Google Cloud. https://github.com/kborovik/gcp-devops
- Pilot Skills — Claude Code skills SDK plugins for spec-driven development and agentic workflows. https://github.com/kborovik/pilot-skills
- lab5.ca — This site; Astro 6, Tailwind v4, TypeScript, Cloudflare Workers. https://github.com/kborovik/lab5.ca

## Blog posts

${blogSection}

## Contact

- LinkedIn: https://www.linkedin.com/in/kborovik
- GitHub: https://github.com/kborovik
- Resume (GitHub): https://github.com/kborovik/resume
- MailPilot source: https://github.com/kborovik/mailpilot
- Book a call: https://calendar.app.google/cYM3H3TsHsequR587

## Notes

- LinkedIn (linkedin.com/in/kborovik) requires login; canonical identity ∧ writing @ lab5.ca
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
