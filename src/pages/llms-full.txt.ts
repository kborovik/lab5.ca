import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import resumeRaw from '../../public/kb-resume.txt?raw';

export const GET: APIRoute = async () => {
  const resumeDemoted = resumeRaw.replace(/^## /gm, '### ').trimEnd();

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

  const body = `# Konstantin Borovik — AI Automation Engineer

Toronto, Ontario, Canada.

20+ years progressing from systems engineering to cloud architecture to production AI. From enterprise data centers to global payment infrastructure to commercial real estate platforms — built and led at every scale.

What I do now: automate repetitive business processes with AI. ERP integration, document workflows, email, and reporting — if a team does it manually and it follows a pattern, AI can handle it.

Looking for a company where manual processes are the bottleneck and leadership is ready to invest in automation.

MailPilot demonstrates the approach: find a real business problem, automate it with AI, ship to production. This site is part of that — Astro, Tailwind, Cloudflare Workers.

## Claims

- 20+ years shipping production systems — data centers, global payments, commercial real estate, automation.
- Python and TypeScript daily; production LLM agents on Pydantic AI and the Claude API.
- MailPilot built end-to-end: agent, Cloudflare Workers, IaC, deploy — one engineer, the whole pipeline.
- Current focus: AI automation for ERP integration, document workflows, email, and reporting.

## Expertise

01 ERP Integration. Connect ERP, accounting, CRM, and document stores so orders, approvals, and reporting run end-to-end. Each step triggered by the upstream event, idempotent, observable. Stack: NetSuite, QuickBooks, Xero, Salesforce, HubSpot; idempotent state machines; Terraform and GitHub Actions; structured logs and traces.

02 Document Workflow. Extract data from invoices, contracts, purchase orders, and forms automatically. AI reads documents, pulls the data, and writes it to the system of record — no manual data entry. Stack: file watchers and attachment intake, OCR plus LLM structured output, schema validation with confidence scoring, routing to ERP/CRM/accounting, immutable audit log per doc.

03 AI Email and Communication. Automate email triage, draft responses, handle customer inquiries, and route messages to the right person. AI handles routine communication; the team handles what AI can't. Stack: Gmail push API trigger, LLM with structured prompts, vector store over an internal knowledge base, serverless runtime, Gmail API drafts.

04 Data and Reporting. Aggregate data from scattered systems, generate summaries with citations, and surface what changed. The reports your team used to build by hand, generated on a schedule. Stack: databases, sheets, exports, APIs as sources; scheduled aggregation jobs; LLM narration with citations; delivery to email digest, Slack, or Drive; cron or on-demand scheduling.

Industries shipped: logistics, distribution, construction, insurance, manufacturing, accounting, property management.

## Proof

MailPilot — a production AI agent I built end-to-end. Email demo@lab5.ca with a question; the reply is evidence of the work. Source: https://github.com/kborovik/mailpilot.

## Resume

Full CV at https://lab5.ca/resume (plain-text mirror at https://lab5.ca/kb-resume.txt). Section order: contact → tech stack → engagements → education.

${resumeDemoted}

## Blog posts

${blogSection}

## Contact

- LinkedIn: https://www.linkedin.com/in/kborovik
- GitHub: https://github.com/kborovik
- Plain-text resume: https://lab5.ca/kb-resume.txt
- MailPilot source: https://github.com/kborovik/mailpilot
- Book a call: https://calendar.app.google/cYM3H3TsHsequR587

## Notes

- LinkedIn (linkedin.com/in/kborovik) requires login; canonical identity ∧ writing @ lab5.ca
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
