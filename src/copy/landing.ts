// Shared landing copy (§V15): the single source for the landing page (src/pages/index.astro)
// and /llms-full.txt (src/pages/llms-full.txt.ts). Both import this module and render from it,
// so the rendered page and the llms-full mirror cannot drift.
//
// §V7: strings use literal Unicode (em-dash —, right-quote ’, ×, ·). Both consumers emit them
// through `{}` interpolation / template literals, which escape `&`, so HTML entities would
// double-escape. Skim-spine bold is encoded as runs: the page renders <span>, the endpoint **md**.

export type Run = string | { b: string };
export type Block = string | Run[];

export interface LeadBody {
  lead: string;
  body: string;
}

export const landing = {
  hero: {
    h1: 'Build business processes with AI',
    sub: 'I build AI-driven business processes, where LLM systems do real, repetitive work without becoming a money pit.',
  },

  problem: {
    kicker: 'the problem',
    subhead: 'Every business runs on a layer of repetitive, lookup-heavy work that quietly consumes skilled time.',
    paras: [
      'Answering the same product questions over and over. Pulling a number out of a document and writing it into a reply. Triaging inbound email. Filling the same fields from the same forms. None of it is hard — that’s exactly why it’s expensive. It’s a knowledgeable person, on a loaded salary, spending hours a week on tasks that follow a pattern.',
      'The cost is hidden because it never shows up as a line item. It’s spread across people who could be doing higher-value work, and across customers who wait hours for an answer that could take seconds.',
      [
        { b: 'Repetitive, lookup-heavy work is what LLM systems are genuinely good at' },
        ' — high-volume, rule-following tasks, done instantly and consistently. The promise is simple: take that repetitive load off your team, answer it in seconds instead of hours, and free your skilled people for the work that actually needs a human.',
      ],
    ] as Block[],
  },

  whatIDo: {
    kicker: 'what I do',
    subhead: 'Build an AI Process Around Your ERP and CRM',
    body: 'I build a new business process around the systems you already run on — your ERP and your CRM. An LLM agent that reads from and writes to those systems: answering high-volume, lookup-heavy questions from your product and order data, drafting personalized CRM outreach grounded in real records, and processing the documents that flow through both. Built to be measured from day one, with the cost per outcome traced before you scale it.',
  },

  proof: {
    kicker: 'proof',
    subhead: 'MailPilot is a real production agent on my own inbox — open-source, traced, and measured to the dollar.',
    before: [
      'Fair thing to ask first: this is self-reported, it’s one project, and the numbers are early. So here is what makes it checkable rather than something you take on my word — the code is open on GitHub, every model call is traced, and you can email the agent yourself and watch what it does. A claim you can verify beats a testimonial you can’t.',
      [
        { b: 'I built MailPilot to solve a business problem of my own' },
        ' (not a product I sell) — a production AI agent running on my company’s inbox, working in both directions. Inbound: it reads an incoming business email, searches a knowledge base, and replies with a sourced answer in under a minute — and if the question is outside that knowledge base, it declines and says so rather than guessing. Outbound: it drafts personalized CRM outreach from those same grounded sources, so the messages going out are as checkable as the replies coming back.',
      ],
    ] as Block[],
    tableLead: 'Every model call is traced, so the economics aren’t a guess:',
    table: {
      cols: ['MailPilot (measured)', 'A person (assumption)'],
      rows: [
        { metric: 'Cost per sourced reply', mailpilot: '~$0.03', person: '~$5.00' },
        { metric: 'Response time', mailpilot: '~20 seconds', person: 'hours' },
        { metric: 'Out-of-scope questions', mailpilot: 'declines, no guessing', person: 'varies' },
        { metric: 'At 1,000 emails / month', mailpilot: '~$30', person: '~$5,000' },
      ],
    },
    after: [
      'More than a 100× difference in cost, hours-to-seconds in speed. The $5 is my assumption, labeled as one — swap in your own loaded cost per reply and the ratio shifts, but the order of magnitude doesn’t. The point isn’t to replace people — you can’t fire 1/100th of an employee. It’s that a category of repetitive work stops consuming thousands of dollars of skilled time and frees that person for work that needs them.',
      [
        { b: 'The cost is not the only risk — it’s an agent confidently inventing a price or a spec and sending it over your name.' },
        ' MailPilot grounds every answer in a source document and cites the file it used, so any reply is checkable. Out-of-scope detection and fabrication checks run as mechanical tests in every build cycle — behavior measured in the logs, not asserted in a slide.',
      ],
    ] as Block[],
  },

  money: {
    kicker: 'how the money stays under control',
    subhead: 'The cost stays predictable because of a few build disciplines most pilots skip.',
    intro: 'None of it is exotic:',
    items: [
      { lead: 'Measure cost per outcome', body: 'per email, per document, per ticket — not token volume.' },
      { lead: 'Cap usage', body: 'so a bug can’t run up a fortune overnight.' },
      { lead: 'Instrument every call', body: 'so you can see exactly where the money goes.' },
      { lead: 'Ground answers in real sources', body: 'and decline when uncertain, so the system doesn’t invent facts under your brand.' },
      { lead: 'Scale to zero when idle', body: 'so you’re not paying for it overnight.' },
    ] as LeadBody[],
    outro:
      'That’s the difference between the 5% and the 95%, and it’s mostly a question of how the system is built — not which model it uses.',
  },

  whyMe: {
    kicker: 'why me',
    subhead: 'You pay wholesale, not retail — the senior person building it, with no agency markup in between.',
    wholesale: [
      'When you hire a software agency, most of your bill never reaches the people writing your software. It pays for the sales team that closed the deal, the account manager who forwards your emails, the project manager who runs the standups, and the margin stacked on top of all of it. The engineer doing the actual work often sees only a fraction of the rate you’re billed. Put the other way: the rate an agency charges is frequently three to four times what reaches the person who writes your code.',
      'Working with me, that overhead doesn’t exist. No sales layer, no management tier, no markup on a subcontractor. You pay the person building the system directly — and you get that senior person on every call, not a junior assigned after the pitch.',
      'It’s also why the strongest engineers don’t stay at agencies: the model keeps most of what they earn. Going direct gets you both the more senior person and the lower rate at once — the two things an agency’s structure is built to keep apart.',
      'You get one senior owner end to end: the retrieval, the guardrails, the observability, the deployment. No layer of account managers between you and the person building it.',
    ] as Block[],
    busFactor: [
      'The quieter worry with one person: what if I get hit by a bus? Worth saying plainly — every employee is a bus-factor too, and usually a worse one, because the knowledge that walks out with them was never written down.',
      'You don’t carry that exposure here. You hold the whole system: the code lives in your repository, it runs in your cloud account, and the retrieval, guardrails, and observability come documented in plain language — not locked in my head. Any competent engineer can pick it up and keep going, which makes the bus-factor lower than most hires give you. It’s the inverse of the lock-in an agency sells: handover is a git clone, not a renegotiation.',
      'The honest boundary: if the work genuinely needs a full standing team, that’s work for a team — not what I’m pitching here.',
    ] as Block[],
    creditsIntro: 'The credentials behind that:',
    credits: [
      { lead: '20+ years shipping production software', body: 'data centers, payments, real estate. This isn’t my first system that has to work on Monday.' },
      { lead: 'Solo, end-to-end delivery', body: 'back-end, infrastructure, CI/CD, deployment, observability. One accountable owner, full product-cycle ownership.' },
      { lead: 'AI agents in production today', body: 'LLMs, retrieval (RAG), structured extraction, with the guardrails and tracing that make them safe to put in front of customers.' },
      { lead: 'Toronto-based, long-term contract', body: 'embedded with your team, not a drive-by engagement.' },
    ] as LeadBody[],
    builtOn:
      'Anthropic Claude · Google Gemini · Python · FastAPI · Pydantic AI · RAG · MCP · Google Cloud / Azure · Terraform · Kubernetes · OpenTelemetry',
  },

  closing: {
    kicker: 'closing',
    subhead: 'If you’re weighing whether AI can do real work without becoming a money pit, that’s the question I build for — and measure.',
    paras: [
      'Want the cost-per-outcome math on a workflow in your own operation?',
    ] as Block[],
  },
};
