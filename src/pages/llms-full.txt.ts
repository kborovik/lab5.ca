import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import resumeRaw from '../../public/kb-resume.md?raw';

export const GET: APIRoute = async () => {
  const resumeDemoted = resumeRaw
    .replace(/^# .+\n+/, '')
    .replace(/^### /gm, '#### ')
    .replace(/^## /gm, '### ')
    .trimEnd();

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

  const body = `# Konstantin Borovik — Software Engineer | AI & LLM Engineering

Toronto, Ontario, Canada.

20+ years of generalist software delivery — from enterprise data centers and systems engineering to cloud architecture to production AI agents. Built and shipped at every scale.

What I do now: cloud infrastructure, AI agents for business workflows, and web development. Each capability anchored on a public GitHub repository — proof, not pitch.

MailPilot is the live AI-agent reference: a Pydantic AI agent on Google Cloud, handling real business email end-to-end. This site is part of the proof — Astro, Tailwind, Cloudflare Workers, spec-driven.

## Claims

- 20+ years shipping production systems — data centers, global payments, commercial real estate, AI automation.
- Python and TypeScript daily; production LLM agents on Pydantic AI and the Claude API.
- Google Cloud infrastructure shipped with Terraform, GitHub Actions, and Cloud Run — one engineer, end-to-end.
- MailPilot built end-to-end: Pydantic AI agent, GCP backend, IaC, deploy — live at hello@lab5.ca.
- Current focus: cloud infrastructure, AI agents for business workflows, and web development.

## What I do

01 AI & LLM Engineering. Production agentic systems on Anthropic Claude and Google Gemini — Pydantic AI, multi-agent orchestration, RAG over knowledge bases, Model Context Protocol (MCP) integrations, prompt engineering. Claude Code plugins and skills for developer workflows. MailPilot is the live reference: github.com/kborovik/mailpilot.

02 Software Development. Python and TypeScript backends and full-stack applications — FastAPI, Pydantic, Astro, Cloudflare Workers. REST APIs, event-driven architectures, structured-extraction pipelines on PostgreSQL. Test-driven and spec-driven; Pytest end-to-end. Reference builds: github.com/kborovik/mailpilot, github.com/kborovik/lab5.ca.

03 DevOps & Operations. Google Cloud and Azure infrastructure shipped with Terraform and Ansible — Cloud Run, GKE, Docker, Kubernetes, Cloud SQL, IAM, org policies. CI/CD via GitHub Actions and Azure DevOps, ETL on Cloud Composer / Apache Airflow, observability with OpenTelemetry and Pydantic Logfire. NIST 800-53 and PCI DSS controls. Reference: github.com/kborovik/gcp-devops.

## Projects

- MailPilot — Production AI agent for business email; Pydantic AI on a Google Cloud backend; live at hello@lab5.ca. https://github.com/kborovik/mailpilot
- gcp-devops — Reference Terraform / Ansible / IaC patterns for Google Cloud. https://github.com/kborovik/gcp-devops
- Pilot Skills — Claude Code skills SDK plugins for spec-driven development and agentic workflows. https://github.com/kborovik/pilot-skills
- lab5.ca — This site; Astro 6, Tailwind v4, TypeScript, Cloudflare Workers. https://github.com/kborovik/lab5.ca

## Proof

MailPilot — a production AI agent I built end-to-end. Email hello@lab5.ca with a question; the reply is evidence of the work. Source: https://github.com/kborovik/mailpilot.

## Resume

Full CV at https://lab5.ca/resume (markdown mirror at https://lab5.ca/kb-resume.md). Section order: contact → engagements → projects → education → tech skills.

${resumeDemoted}

## Blog posts

${blogSection}

## Contact

- LinkedIn: https://www.linkedin.com/in/kborovik
- GitHub: https://github.com/kborovik
- Resume: https://lab5.ca/resume
- Markdown resume: https://lab5.ca/kb-resume.md
- MailPilot source: https://github.com/kborovik/mailpilot
- Book a call: https://calendar.app.google/cYM3H3TsHsequR587

## Notes

- LinkedIn (linkedin.com/in/kborovik) requires login; canonical identity ∧ writing @ lab5.ca
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
