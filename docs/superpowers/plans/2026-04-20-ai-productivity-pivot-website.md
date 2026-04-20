# AI Productivity Pivot — Website Content Rewrite

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all website page content from "Google Cloud consultant" to "AI Productivity Engineer" positioning.

**Architecture:** Content-only changes to 5 Astro files (4 pages + layout). Same site structure, same design system, same components. Text and copy changes only — no new components, no structural changes.

**Tech Stack:** Astro v5, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-04-20-ai-productivity-pivot-design.md` (sections 3.1–3.4)

**Verify after each task:** Run `make build` to confirm the site builds without errors.

---

### Task 1: Update Layout.astro default meta

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Update default description**

In `src/layouts/Layout.astro`, replace the default description prop value:

```
  description = 'I modernize business operations with Google Cloud. Systems integration (ERP, CRM, custom software) for growing companies.',
```

With:

```
  description = 'I modernize business operations with AI to make companies move faster. AI-powered automation for email, documents, workflows, and data entry.',
```

- [ ] **Step 2: Update default page title**

Replace:

```
  : 'Konstantin Borovik — Tech Lead for Business Modernization';
```

With:

```
  : 'Konstantin Borovik — AI Productivity Engineer';
```

- [ ] **Step 3: Update OG image alt text**

Replace both occurrences of:

```
Konstantin Borovik — Tech Lead for Business Modernization
```

With:

```
Konstantin Borovik — AI Productivity Engineer
```

There are two: one in `og:image:alt` meta tag and one in `twitter:image:alt` meta tag.

- [ ] **Step 4: Verify build**

Run: `make build`
Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "content: update Layout.astro meta to AI Productivity Engineer"
```

---

### Task 2: Rewrite Home page

**Files:**
- Modify: `src/pages/index.astro`

This is the largest change. Work through each section of the page top to bottom.

- [ ] **Step 1: Update hero badge**

Replace:

```html
          Tech Lead for Business Modernization
```

With:

```html
          AI Productivity Engineer
```

- [ ] **Step 2: Update hero h1**

Replace:

```html
          I modernize business operations with Google Cloud
```

With:

```html
          I modernize business operations with AI to make companies move faster
```

- [ ] **Step 3: Update hero subtitle**

Replace:

```html
          20+ years of hands-on engineering. I help companies connect their
          business systems (ERP, CRM, Email) with Google Cloud.
```

With:

```html
          20+ years of hands-on engineering. I help companies automate
          repetitive work — email, documents, workflows, data entry —
          so the business moves faster.
```

- [ ] **Step 4: Update "What Changes" card items**

Item 1 — replace:

```html
                <p class="text-sm font-semibold text-gh-fg">Manual workflows become automated</p>
```

With:

```html
                <p class="text-sm font-semibold text-gh-fg">Manual work becomes automated</p>
```

Item 2 — replace:

```html
                <p class="text-sm font-semibold text-gh-fg">Systems move to Google Cloud</p>
                <p class="text-xs text-gh-fg-muted">Scalable, secure, cost-effective</p>
```

With:

```html
                <p class="text-sm font-semibold text-gh-fg">Email and documents process themselves</p>
                <p class="text-xs text-gh-fg-muted">Responses, summaries, filing — done</p>
```

Item 4 — replace:

```html
                <p class="text-sm font-semibold text-gh-fg">Your team gets technical leadership</p>
                <p class="text-xs text-gh-fg-muted">20+ years of hands-on experience</p>
```

With:

```html
                <p class="text-sm font-semibold text-gh-fg">Your company gets faster</p>
                <p class="text-xs text-gh-fg-muted">Same team, twice the output</p>
```

Item 3 (Disconnected tools get integrated) stays unchanged.

- [ ] **Step 5: Update "How I Help" section heading**

Replace:

```html
        From disconnected systems to connected operations
```

With:

```html
        AI automation for every repetitive process
```

- [ ] **Step 6: Update "How I Help" Card 1**

Replace:

```html
          <h3 class="text-base font-semibold text-gh-fg">Systems Integration</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            Connect ERP, CRM, email, and documents into unified workflows
            on Google Cloud &mdash; your systems talk to each other automatically.
          </p>
          <a href="/expertise#integration" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

With:

```html
          <h3 class="text-base font-semibold text-gh-fg">AI Email & Communication</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            Automate email responses, triage, and customer communication
            &mdash; AI handles routine messages so your team focuses on what matters.
          </p>
          <a href="/expertise#email" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

- [ ] **Step 7: Update "How I Help" Card 2**

Replace:

```html
          <h3 class="text-base font-semibold text-gh-fg">Custom Software Development</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            End-to-end product development on Google Cloud &mdash; backend, frontend,
            infrastructure, and deployment from one person.
          </p>
          <a href="/expertise#development" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

With:

```html
          <h3 class="text-base font-semibold text-gh-fg">Document Processing</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            Extract data from invoices, contracts, and forms automatically
            &mdash; stop manual data entry and reduce errors.
          </p>
          <a href="/expertise#documents" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

- [ ] **Step 8: Update "How I Help" Card 3**

Replace:

```html
          <h3 class="text-base font-semibold text-gh-fg">AI-Powered Automation</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            Production AI systems that handle routine work &mdash;
            document processing, email agents, and knowledge base search.
          </p>
          <a href="/expertise#ai" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

With:

```html
          <h3 class="text-base font-semibold text-gh-fg">Workflow Automation</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            Connect your business systems and automate repetitive processes
            &mdash; orders, approvals, reporting flow without human bottlenecks.
          </p>
          <a href="/expertise#workflows" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

- [ ] **Step 9: Update "How I Help" Card 4**

Replace:

```html
          <h3 class="text-base font-semibold text-gh-fg">Technical Leadership</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            Set technical direction, build engineering teams,
            and create a culture where teams ship confidently.
          </p>
          <a href="/expertise#leadership" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

With:

```html
          <h3 class="text-base font-semibold text-gh-fg">Data & Reporting</h3>
          <p class="mt-3 text-sm leading-relaxed text-gh-fg-muted">
            Turn scattered data into actionable reports &mdash; AI aggregates,
            summarizes, and surfaces what matters.
          </p>
          <a href="/expertise#data" class="mt-6 inline-block text-sm font-semibold text-gh-green transition-colors hover:text-gh-green-hover">
            Learn more &rarr;
          </a>
```

- [ ] **Step 10: Update MailPilot featured section header**

Replace:

```html
        MailPilot — AI Email Automation Platform
```

With:

```html
        MailPilot — AI That Handles Real Business Email
```

- [ ] **Step 11: Update MailPilot featured section subtitle**

Replace:

```html
        A production AI agent I designed and built end-to-end on Google Cloud.
        Send it an email and see what I can build for your business.
```

With:

```html
        A live AI agent that handles real business email — built to show
        how AI can work for your company.
```

- [ ] **Step 12: Update MailPilot architecture bullets**

Replace the 4 architecture bullet texts (keep the SVG icons and HTML structure, only change the text):

Bullet 1 — replace:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">Backend:</span> Python, Google Cloud Functions, Cloud Pub/Sub, Gmail push notifications</p>
```

With:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">Backend:</span> Python, serverless functions, event-driven email processing</p>
```

Bullet 2 — replace:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">AI Layer:</span> LLM integration, RAG pipeline, Google Drive knowledge base</p>
```

With:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">AI Layer:</span> LLM integration, RAG pipeline, knowledge base search</p>
```

Bullet 3 — replace:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">Frontend:</span> Astro, Tailwind CSS, Cloudflare Workers edge deployment</p>
```

With:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">Frontend:</span> Astro, Tailwind CSS, edge deployment</p>
```

Bullet 4 — replace:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">Infrastructure:</span> Terraform IaC, GitHub Actions CI/CD, Google Workspace API</p>
```

With:

```html
              <p class="text-sm text-gh-fg-muted"><span class="font-medium text-gh-fg">Infrastructure:</span> Terraform IaC, GitHub Actions CI/CD, cloud-native architecture</p>
```

- [ ] **Step 13: Update MailPilot "See the full portfolio" link text**

Replace:

```html
            See the full portfolio →
```

With:

```html
            See the live demo →
```

- [ ] **Step 14: Update bottom CTA section**

Replace:

```html
        Ready to modernize?
```

With:

```html
        Ready to move faster?
```

Replace:

```html
        I help companies connect their business operations
        to Google Cloud. Let's talk.
```

With:

```html
        I help companies automate repetitive work with AI.
        Let's talk.
```

- [ ] **Step 15: Verify build**

Run: `make build`
Expected: Build succeeds with no errors.

- [ ] **Step 16: Commit**

```bash
git add src/pages/index.astro
git commit -m "content: rewrite home page for AI Productivity Engineer positioning"
```

---

### Task 3: Rewrite Expertise page

**Files:**
- Modify: `src/pages/expertise.astro`

This is a full content rewrite of all 4 expertise sections. The page structure (layout, grid, cards, "Why it matters" sidebars) stays the same — only text content changes.

- [ ] **Step 1: Update page meta description**

Replace:

```
  description="Systems integration, custom software development, AI-powered automation, and technical leadership — 20+ years of hands-on engineering experience."
```

With:

```
  description="AI-powered automation for email, documents, workflows, and reporting — 20+ years of hands-on engineering experience."
```

- [ ] **Step 2: Update page header subtitle**

Replace:

```html
      20+ years of progressive experience — from infrastructure engineering to cloud architecture
      to AI-powered product development. I work with companies in paper-heavy, operations-driven
      industries where disconnected systems and manual workflows are the biggest bottleneck.
```

With:

```html
      20+ years of hands-on engineering — from infrastructure to cloud to AI.
      I work with companies where manual processes and disconnected systems
      are the biggest bottleneck. AI changes that.
```

- [ ] **Step 3: Rewrite Section 01 — AI Email & Communication**

Replace the section id and all content within the section 01 block.

Replace `id="integration"` with `id="email"`.

Replace the section content (keep the outer `<section>` and grid wrapper):

Number stays `01`.

Replace h2:

```html
            Systems Integration
```

With:

```html
            AI Email & Communication
```

Replace green subtitle:

```html
            Connect your business systems to Google Cloud.
```

With:

```html
            AI reads, responds, and routes your email.
```

Replace description paragraph:

```html
            I connect ERP, CRM, email, and document systems into unified workflows on Google Cloud.
            Event-driven architecture with Cloud Functions and Pub/Sub — not batch jobs or manual
            data entry. Your systems talk to each other automatically.
```

With:

```html
            Automate email triage, draft responses, handle customer inquiries, and route messages
            to the right person. AI handles routine communication so your team focuses on
            conversations that matter.
```

Replace bullet list items:

```javascript
            {[
              'ERP, CRM, and email integration via Google Cloud',
              'Event-driven workflows with Cloud Functions and Pub/Sub',
              'Google Workspace automation (Gmail, Drive, Sheets, Calendar)',
              'API design and data pipeline development',
            ].map(item => (
```

With:

```javascript
            {[
              'Email triage and auto-response',
              'Customer inquiry handling',
              'Internal communication routing',
              'Follow-up and reminder automation',
            ].map(item => (
```

Replace "Why it matters" sidebar content:

```html
              <span class="font-medium text-gh-fg">Owner:</span> Your team stops copy-pasting between systems — data flows automatically
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> Event-driven architecture on GCP — scalable, maintainable, observable
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Orders stop falling through cracks, response times drop, errors disappear
```

With:

```html
              <span class="font-medium text-gh-fg">Owner:</span> Customers get faster responses without hiring more staff
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> Production AI agents, not chatbot demos
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Email response times drop from hours to minutes
```

- [ ] **Step 4: Rewrite Section 02 — Document Processing**

Replace `id="development"` with `id="documents"`.

Replace h2:

```html
            Custom Software Development
```

With:

```html
            Document Processing
```

Replace green subtitle:

```html
            From architecture to production deployment.
```

With:

```html
            Stop typing what's already on paper.
```

Replace description:

```html
            End-to-end product development on Google Cloud. Python backend services,
            modern frontends, CI/CD pipelines, and edge deployment. One person who
            owns the full stack — architecture, code, infrastructure, and shipping.
```

With:

```html
            Extract data from invoices, contracts, purchase orders, and forms automatically.
            AI reads documents, pulls the data, and puts it where it belongs — no manual
            data entry.
```

Replace bullet list:

```javascript
            {[
              'Python backend services and API development',
              'Modern frontend with TypeScript and Tailwind CSS',
              'Google Cloud infrastructure with Terraform IaC',
              'CI/CD pipelines and automated deployment',
            ].map(item => (
```

With:

```javascript
            {[
              'Invoice and PO data extraction',
              'Contract and form processing',
              'Automated filing and categorization',
              'Data validation and error detection',
            ].map(item => (
```

Replace sidebar content:

```html
              <span class="font-medium text-gh-fg">Owner:</span> One person ships the whole product — backend, frontend, deployment
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> Clean architecture, CI/CD, cloud-native — production-ready from day one
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Faster releases, fewer handoffs, less coordination overhead
```

With:

```html
              <span class="font-medium text-gh-fg">Owner:</span> Your team stops re-typing data from documents
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> Production document pipelines with accuracy validation
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Processing errors disappear, throughput doubles
```

- [ ] **Step 5: Rewrite Section 03 — Workflow Automation**

Replace `id="ai"` with `id="workflows"`.

Replace h2:

```html
            AI-Powered Automation
```

With:

```html
            Workflow Automation
```

Replace green subtitle:

```html
            Production AI systems, not just prototypes.
```

With:

```html
            Your business processes run themselves.
```

Replace description:

```html
            I build AI-powered automation that runs in production — intelligent document processing,
            email agents, and knowledge base search. Vertex AI, Gemini, and LLM integration
            designed for reliability, not demo-day polish.
```

With:

```html
            Connect disconnected systems and automate repetitive multi-step processes.
            Orders, approvals, onboarding, reporting — AI orchestrates the workflow so
            nothing falls through cracks.
```

Replace bullet list:

```javascript
            {[
              'LLM agent development and orchestration',
              'Google Vertex AI and Gemini integration',
              'RAG pipelines and knowledge base construction',
              'Intelligent document processing with Document AI',
            ].map(item => (
```

With:

```javascript
            {[
              'Multi-system integration (ERP, CRM, email)',
              'Approval and routing automation',
              'Order processing and fulfillment tracking',
              'Onboarding and compliance workflows',
            ].map(item => (
```

Replace sidebar content:

```html
              <span class="font-medium text-gh-fg">Owner:</span> AI handles routine work — your team focuses on what matters
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> Production RAG pipelines and agent workflows — not demos
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Customer response times drop, processing errors disappear
```

With:

```html
              <span class="font-medium text-gh-fg">Owner:</span> Processes that needed 3 people now need 1
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> Event-driven architecture, not batch jobs
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Orders stop falling through cracks, cycle times shrink
```

- [ ] **Step 6: Rewrite Section 04 — Data & Reporting**

Replace `id="leadership"` with `id="data"`.

Replace h2:

```html
            Technical Leadership
```

With:

```html
            Data & Reporting
```

Replace green subtitle:

```html
            Building teams that build great software.
```

With:

```html
            AI turns your data into decisions.
```

Replace description:

```html
            I bridge the gap between development and operations. I set technical direction,
            build engineering teams, and advocate for automation-first practices and a DevOps
            culture where teams ship confidently.
```

With:

```html
            Aggregate data from scattered systems, generate summaries, and surface what matters.
            AI builds the reports your team used to spend hours creating manually.
```

Replace bullet list:

```javascript
            {[
              'Team leadership and technical mentorship',
              'Architecture decision-making and technical strategy',
              'DevOps culture and automation-first practices',
              'Cross-functional collaboration with development teams',
            ].map(item => (
```

With:

```javascript
            {[
              'Cross-system data aggregation',
              'Automated report generation',
              'Trend detection and anomaly alerts',
              'Dashboard and summary creation',
            ].map(item => (
```

Replace sidebar content:

```html
              <span class="font-medium text-gh-fg">Owner:</span> You get a technical leader who writes code every day
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> A peer who can own systems integration so you focus on product
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Engineering teams ship faster with clear direction and automation
```

With:

```html
              <span class="font-medium text-gh-fg">Owner:</span> You see the full picture without waiting for someone to build a spreadsheet
            </li>
            <li class="border-b border-gh-border pb-3">
              <span class="font-medium text-gh-fg">CTO:</span> Clean data pipelines, not manual exports
            </li>
            <li class="pb-0">
              <span class="font-medium text-gh-fg">COO:</span> Weekly reports that took a day now take a minute
```

- [ ] **Step 7: Update bottom CTA**

Replace:

```html
        Ready to modernize?
```

With:

```html
        Ready to move faster?
```

Replace:

```html
        I help companies modernize their business operations with Google Cloud.
```

With:

```html
        I help companies automate repetitive work with AI.
```

- [ ] **Step 8: Verify build**

Run: `make build`
Expected: Build succeeds with no errors.

- [ ] **Step 9: Commit**

```bash
git add src/pages/expertise.astro
git commit -m "content: rewrite expertise page for AI productivity positioning"
```

---

### Task 4: Update Demo page

**Files:**
- Modify: `src/pages/demo.astro`

Lighter changes — header, architecture section, and CTA. Demo flow and example questions stay unchanged.

- [ ] **Step 1: Update page meta description**

Replace:

```
  description="MailPilot — a production AI email agent designed and built end-to-end on Google Cloud. Business owners: see what I can build. CTOs: review the architecture."
```

With:

```
  description="MailPilot — a live AI agent that handles real business email. See how AI automates communication, then review the architecture."
```

- [ ] **Step 2: Update page header subtitle**

Replace:

```html
      A production AI email platform built end-to-end on Google Cloud.
      Send it an email and see it work.
```

With:

```html
      A live AI agent that reads email, searches a knowledge base,
      and responds — fully automated.
```

- [ ] **Step 3: Update architecture section header**

Replace:

```html
      <h2 class="text-2xl font-bold tracking-tight text-gh-fg">Architecture & Technical Decisions</h2>
```

With:

```html
      <h2 class="text-2xl font-bold tracking-tight text-gh-fg">Under the Hood</h2>
```

- [ ] **Step 4: Update architecture section subtitle**

Replace:

```html
        MailPilot is an event-driven email automation platform built on Google Cloud
        and Google Workspace. Here's how it works and why I made these choices.
```

With:

```html
        For technical reviewers — here's how MailPilot is built
        and why I made these choices.
```

- [ ] **Step 5: Update architecture card descriptions**

Frontend card — replace:

```html
            Astro SSG, Tailwind CSS, Cloudflare Workers. Static generation for zero cold-start
            latency, deployed at the edge globally.
```

With:

```html
            Astro SSG, Tailwind CSS, edge deployment. Static generation for zero cold-start
            latency, deployed globally.
```

Backend card — replace:

```html
            Python, Google Cloud Functions, Cloud Pub/Sub. Event-driven architecture triggered by
            Gmail push notifications. Serverless for scale-to-zero costs.
```

With:

```html
            Python, serverless functions, event-driven messaging. Architecture triggered by
            email push notifications. Serverless for scale-to-zero costs.
```

AI Layer card — replace:

```html
            LLM integration, Google Drive knowledge base. RAG pipeline searches product
            documentation. Structured prompts guide multi-turn email conversations.
```

With:

```html
            LLM integration, knowledge base search. RAG pipeline finds relevant
            documentation. Structured prompts guide multi-turn email conversations.
```

- [ ] **Step 6: Update bottom CTA**

Replace:

```html
        Let's build something like this for you
```

With:

```html
        Imagine this for your business
```

Replace:

```html
        Imagine this for your business. MailPilot demonstrates my approach: identify a real
        business problem, connect systems on Google Cloud, build end-to-end, and deploy to production.
```

With:

```html
        MailPilot shows my approach: find a real business problem, automate it with AI,
        and deploy to production. What repetitive process is slowing your company down?
```

- [ ] **Step 7: Verify build**

Run: `make build`
Expected: Build succeeds with no errors.

- [ ] **Step 8: Commit**

```bash
git add src/pages/demo.astro
git commit -m "content: update demo page for AI productivity positioning"
```

---

### Task 5: Rewrite About page

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Update page meta description**

Replace:

```
  description="Konstantin Borovik — Tech Lead for Business Modernization. I modernize business operations with Google Cloud. 20+ years in systems integration, cloud architecture, and technical leadership."
```

With:

```
  description="Konstantin Borovik — AI Productivity Engineer. I modernize business operations with AI to make companies move faster. 20+ years in systems integration, cloud architecture, and AI automation."
```

- [ ] **Step 2: Update subtitle**

Replace:

```html
          <p class="mt-1 text-base font-medium text-gh-green">Tech Lead for Business Modernization</p>
```

With:

```html
          <p class="mt-1 text-base font-medium text-gh-green">AI Productivity Engineer</p>
```

- [ ] **Step 3: Rewrite bio paragraphs**

Replace all 4 paragraphs inside the `<div class="mt-6 space-y-4 leading-relaxed text-gh-fg-muted">`:

Replace:

```html
            <p>
              20+ years progressing from systems engineering to cloud architecture to building
              production platforms on Google Cloud. From enterprise data centers to global payment
              infrastructure to commercial real estate platforms &mdash; I've built and led at every scale.
            </p>
            <p>
              What I do: systems integration (ERP, CRM, custom software) with Google Cloud
              Technologies. I connect disconnected business systems, automate manual workflows,
              and bring technical leadership to companies that have outgrown their current setup.
            </p>
            <p>
              I'm looking for a company where I can modernize business operations with Google Cloud.
              Ideal fit: a company using (or open to) Google Workspace and GCP that needs someone
              who writes code every day, makes architecture decisions, and builds engineering teams.
            </p>
            <p>
              I built MailPilot to demonstrate my approach: identify a real business problem,
              design the architecture, build it end-to-end on GCP, and deploy to production.
              The site you're on right now is part of that &mdash; Astro, Tailwind, Cloudflare Workers.
            </p>
```

With:

```html
            <p>
              20+ years progressing from systems engineering to cloud architecture to building
              production AI. From enterprise data centers to global payment infrastructure
              to commercial real estate platforms &mdash; I've built and led at every scale.
            </p>
            <p>
              What I do now: I automate repetitive business processes with AI. Email, documents,
              workflows, data entry &mdash; if your team does it manually and it follows a pattern,
              AI can handle it.
            </p>
            <p>
              I'm looking for a company where I can make business operations faster with AI.
              Ideal fit: a company where manual processes are the bottleneck and leadership
              is ready to invest in automation.
            </p>
            <p>
              I built MailPilot to demonstrate my approach: identify a real business problem,
              automate it with AI, and deploy to production. The site you're on right now
              is part of that &mdash; Astro, Tailwind, Cloudflare Workers.
            </p>
```

- [ ] **Step 4: Verify build**

Run: `make build`
Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/about.astro
git commit -m "content: rewrite about page for AI productivity positioning"
```

---

### Task 6: Final verification

- [ ] **Step 1: Check for remaining old messaging across all site files**

Run: `grep -r "Tech Lead for Business Modernization" src/`
Expected: No matches

Run: `grep -r "modernize business operations with Google Cloud" src/`
Expected: No matches

Run: `grep -r "Google Cloud" src/pages/index.astro src/pages/expertise.astro src/pages/about.astro`
Expected: No matches (these pages should have no Google Cloud references)

Note: `src/pages/demo.astro` may still reference cloud platforms in the "Under the Hood" architecture section — that's intentional per spec.

- [ ] **Step 2: Check new messaging is present**

Run: `grep -r "AI Productivity Engineer" src/`
Expected: Matches in Layout.astro, about.astro

Run: `grep -r "move faster" src/pages/index.astro`
Expected: Matches in hero h1 and subtitle

- [ ] **Step 3: Full production build**

Run: `make build`
Expected: Build succeeds, no errors, no warnings.

- [ ] **Step 4: Check anchor links match between pages**

Verify that the expertise page section IDs match the home page card links:
- Home card 1 links to `/expertise#email` → expertise has `id="email"`
- Home card 2 links to `/expertise#documents` → expertise has `id="documents"`
- Home card 3 links to `/expertise#workflows` → expertise has `id="workflows"`
- Home card 4 links to `/expertise#data` → expertise has `id="data"`

Run: `grep -n 'id="email"\|id="documents"\|id="workflows"\|id="data"' src/pages/expertise.astro`
Expected: 4 matches with correct IDs

Run: `grep -n '#email\|#documents\|#workflows\|#data' src/pages/index.astro`
Expected: 4 matches with correct anchor links
