# AI Productivity Pivot — Messaging Updates

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update CLAUDE.md, ideal customer profile, and LinkedIn profile to reflect the AI Productivity Engineer positioning.

**Architecture:** Content-only changes to 3 markdown files. No code, no tests. Each file gets its own task and commit.

**Spec:** `docs/superpowers/specs/2026-04-20-ai-productivity-pivot-design.md`

---

### Task 1: Update CLAUDE.md site positioning

**Files:**
- Modify: `CLAUDE.md` (lines 1, 80-95 — opening paragraph and "Site positioning" section)

Note: `README.md` is a symlink to `CLAUDE.md` — it updates automatically.

- [ ] **Step 1: Update the opening paragraph (line 1-3 area)**

Replace:

```
Personal portfolio and career site for Konstantin Borovik — Tech Lead for Business Modernization. Positioning: systems integration (ERP, CRM, custom software) with focus on Google Cloud Technologies. MailPilot (the AI email platform in `/Users/kb/github/pilot`) is featured as a proof-of-capability demo, not a product being sold.
```

With:

```
Personal portfolio and career site for Konstantin Borovik — AI Productivity Engineer. Positioning: AI-powered automation for repetitive business processes (email, documents, workflows, data entry). Cloud platforms (GCP, Azure, AWS) are implementation details, not the pitch. MailPilot (the AI email platform in `/Users/kb/github/pilot`) is featured as a proof-of-capability demo showing how AI handles real business communication.
```

- [ ] **Step 2: Update the "Site positioning" section (lines 80-95)**

Replace the full "Site positioning" section with:

```markdown
## Site positioning

**Title**: AI Productivity Engineer
**Tagline**: "I modernize business operations with AI to make companies move faster"
**Core expertise**: AI-powered automation for repetitive business processes (email, documents, workflows, data entry). Cloud platforms (GCP, Azure, AWS) are implementation details.

| Page       | Route        | Purpose                                                    |
| ---------- | ------------ | ---------------------------------------------------------- |
| Home       | `/`          | Hero, AI productivity pitch, MailPilot (reframed), CTA     |
| Expertise  | `/expertise` | AI Email & Communication, Document Processing, Workflow Automation, Data & Reporting |
| Live Demo  | `/demo`      | MailPilot demo — "see how AI handles real business email"  |
| About      | `/about`     | Bio, LinkedIn, Book a Call                                 |

**Primary CTA**: Book a Call — Google Calendar (`https://calendar.app.google/cYM3H3TsHsequR587`)
**Secondary CTA**: LinkedIn — `https://www.linkedin.com/in/kborovik`
**Demo CTA**: Try the demo — send an email to `demo@lab5.ca` (see how AI handles real business email)
```

- [ ] **Step 3: Update the Layout.astro default description reference in Key Files section**

In the Key Files section (line 34), update the `index.astro` comment:

Replace:

```
│   ├── index.astro           # / — hero, "How I Help" cards, MailPilot featured project, CTA
│   ├── expertise.astro       # /expertise — Systems Integration, Custom Software, AI Automation, Leadership
│   ├── demo.astro            # /demo (Live Demo) — MailPilot demo, example questions, architecture
```

With:

```
│   ├── index.astro           # / — hero, AI productivity pitch, MailPilot featured project, CTA
│   ├── expertise.astro       # /expertise — AI Email, Document Processing, Workflow Automation, Data & Reporting
│   ├── demo.astro            # /demo (Live Demo) — MailPilot demo, example questions, architecture
```

- [ ] **Step 4: Verify the symlink is intact**

Run: `ls -la README.md`
Expected: `README.md -> CLAUDE.md`

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md positioning to AI Productivity Engineer"
```

---

### Task 2: Update ideal customer profile

**Files:**
- Modify: `missions/ideal-customer-profile.md` (full rewrite of sections 1-7, sections 8-9 minor updates)

- [ ] **Step 1: Update section 1 — Positioning table**

Replace the entire section 1 "Positioning" table with:

```markdown
## 1. Positioning

| Dimension           | Definition                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Who I am**        | Konstantin Borovik — AI Productivity Engineer with 20+ years in systems integration and cloud architecture |
| **What I do**       | I modernize business operations with AI to make companies move faster                            |
| **Core expertise**  | AI-powered automation for repetitive business processes — email, documents, workflows, data entry |
| **Target audience** | Business owners, COOs, and ops leaders at companies where manual processes slow them down         |
| **Proof of work**   | lab5.ca — live demo showing AI handling real business email end-to-end                            |
```

- [ ] **Step 2: Update section 2 — What I solve**

Replace the entire section 2 with:

```markdown
## 2. What I solve

Companies of every size share the same problems:

1. **Repetitive manual work** — Staff spend hours on email, data entry, document processing, and reporting that AI can handle. Every hour spent on manual work is an hour not spent on growing the business.
2. **Slow business processes** — Orders, approvals, and customer responses take too long because humans are the bottleneck in every step. Customers wait, deals stall, deadlines slip.
3. **Disconnected systems** — ERP doesn't talk to CRM, CRM doesn't talk to email, email doesn't talk to documents. Staff manually copy-paste data between tools.
4. **No AI strategy** — They see competitors using AI but don't know where to start. They need someone who has actually built production AI systems, not someone selling demos.
5. **Growing pains** — Processes that worked at 20 people break at 100. Automation is the only way to scale without proportional headcount.

**My pitch:** "I modernize business operations with AI to make companies move faster — email, documents, workflows, data entry — if it's repetitive and follows a pattern, AI can handle it."
```

- [ ] **Step 3: Update section 3 — Target companies**

Replace the entire section 3 with:

```markdown
## 3. Target companies

### Must-have criteria

| Attribute              | Requirement                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Geography**          | North America (Canada or United States)                                                |
| **Business model**     | Product or services company with real customers and revenue (not pre-revenue startups) |
| **Pain point**         | Identifiable manual/repetitive processes that are a bottleneck                          |
| **Decision authority** | Owner/CEO/COO can approve a technical hire or engagement without committee process     |

### Strong-fit indicators

| Attribute                                      | Why it matters                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Heavy email/document volume**                | Direct AI productivity wins — email triage, document processing, data extraction   |
| **Has ERP/CRM they want to integrate**         | Systems integration expertise — connect tools, automate data flow                  |
| **Manual processes they know need automation** | Clear, measurable problem AI can solve                                             |
| **No CTO or technical co-founder**             | They need the role I fill — not competing with existing technical leadership       |
| **Growing but operationally constrained**      | Revenue is there but operations can't keep up — AI automation unlocks growth       |
| **Multiple SaaS tools with no integration**    | Classic integration problem — connect Salesforce, QuickBooks, email, Drive         |

### Disqualification criteria

- **Pre-revenue startup** — needs a company with real operations to automate
- **Already has a strong CTO + engineering team** — they don't need me
- **Looking for staff augmentation only** — I'm a leader, not a contractor filling a seat
- **No identifiable repetitive processes** — if the bottleneck isn't manual work, AI productivity isn't the answer
```

- [ ] **Step 4: Update section 4 — Industries**

Replace the section 4 intro paragraph only. Keep the industry table unchanged — all industries are strong AI productivity fits.

Replace:

```markdown
## 4. Industries with strong fit
```

With:

```markdown
## 4. Industries with strong fit

These paper-heavy, operations-driven industries have massive repetitive work — every one is a strong fit for AI productivity improvements.
```

Note: The industry table rows stay exactly as they are. Logistics, distribution, construction, insurance, manufacturing, accounting, property management all have high-volume repetitive processes.

- [ ] **Step 5: Update section 5 — Decision makers**

Replace the entire section 5 with:

```markdown
## 5. Decision makers to reach

### Primary: Business Owner / CEO / President

| Attribute                | Details                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Who**                  | Owner, CEO, President, Managing Director                                                                             |
| **What they care about** | Revenue growth, operational efficiency, not losing deals to competitors, reducing headcount costs                    |
| **Pain they feel**       | "We're growing but our operations can't keep up." "My team spends hours on things that should be automated."         |
| **Messaging angle**      | "I make companies move faster with AI. Your team stops doing manual work — AI does it instead."                      |
| **What converts them**   | The lab5.ca demo — they send an email, see AI respond, and think "I need this for my business"                       |
| **Common objections**    | "Can you actually do this for our specific industry?" "We're not a tech company." "What does this cost?"             |

### Primary: COO / Operations Director

| Attribute                | Details                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Who**                  | COO, VP Operations, Director of Operations — person responsible for how the business runs                                      |
| **What they care about** | Process efficiency, response times, error rates, operational cost                                                              |
| **Pain they feel**       | "We have 5 systems and none of them talk to each other." "Our response time to customers is too slow."                         |
| **Messaging angle**      | "I automate your email, documents, and workflows with AI — your team stops copy-pasting and starts working."                   |
| **What converts them**   | Specific process automation examples — email response time dropping from hours to minutes, document processing going from manual to automatic |

### Secondary: CTO / VP Engineering / Technical Co-Founder

| Attribute                | Details                                                                                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Who**                  | CTO, VP Engineering, Technical Director — the existing technical decision-maker                                                                                 |
| **What they care about** | Architecture quality, production reliability, whether the AI actually works                                                                                     |
| **Pain they feel**       | "I'm the only technical person and I can't scale." "We need AI automation but I don't have time to build it."                                                   |
| **Messaging angle**      | "20+ years from infrastructure to cloud to production AI. I can own your AI productivity automation — so you can focus on product."                              |
| **What converts them**   | The architecture page on lab5.ca — they see production-quality decisions and recognize a peer                                                                   |
```

- [ ] **Step 6: Update section 6 — Value proposition**

Replace the entire section 6 with:

```markdown
## 6. Value proposition

### For business owners (non-technical)

**Before:** Your team manually processes email, re-types data from documents, copy-pastes between systems, and builds reports by hand. Customer emails take hours to answer. You're hiring more people to handle growing volume.

**After:** AI handles routine email, extracts data from documents, moves information between systems, and generates reports. Your existing team handles 2x the volume without burning out.

**How:** I identify your highest-impact repetitive processes, build AI automation that runs in production, and integrate it with the tools you already use.

### For CTOs (technical)

**What I bring:**

1. **Production AI systems** — LLM agents, RAG pipelines, document processing, email automation. Not prototypes — production systems with error handling, monitoring, and reliability.
2. **Systems integration** — ERP, CRM, and custom software connected through event-driven architecture. Cloud Functions, Pub/Sub, Cloud Run — whatever the platform.
3. **Cloud-agnostic** — GCP, Azure, AWS — I work with whatever the company has. Deep GCP experience (PayPal, Colliers), plus AWS and Azure.
4. **Full-stack delivery** — Python backend, TypeScript frontend, CI/CD, edge deployment. I ship end-to-end.
5. **Security & compliance** — NIST-800-53, PCI-DSS from PayPal and Colliers. Enterprise security at startup speed.

### The lab5.ca proof

The live demo at `demo@lab5.ca` shows what I can build:

- **For business owners:** "Send an email, see AI respond. Imagine this for your business."
- **For CTOs:** "Review the architecture page — see the production decisions, the stack, the reliability."

This eliminates the "can they actually build?" question before the first conversation.
```

- [ ] **Step 7: Update section 7 — Outreach strategy**

Replace the entire section 7 with:

```markdown
## 7. Outreach strategy

### Channels

| #   | Channel               | Approach                                                                                                             |
| --- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1   | **Email (MailPilot)** | Primary channel. Use MailPilot to send outreach emails. Leads from [Apollo](https://app.apollo.io/#/saved/companies) |
| 2   | **LinkedIn posts**    | Post about AI productivity, business process automation, and real examples of AI handling manual work                 |
| 3   | **Job boards**        | LinkedIn Jobs, AngelList/Wellfound — search for AI/Automation Lead roles, or companies posting about AI needs        |

### Email outreach (via MailPilot)

Lead source: Apollo saved companies list → export contacts → MailPilot outreach mission

**To business owners:**

Subject: "Making [Company Name] faster with AI"

Body: "Hi [Name], I help companies automate repetitive work with AI — email, documents, workflows, data entry. [One sentence about their specific pain or situation]. I built a live demo — send any email to demo@lab5.ca and watch AI respond in 60 seconds. Would love 15 minutes to discuss how this applies to [company]. — Konstantin | lab5.ca"

**To COOs:**

Subject: "AI automation for [Company Name]'s operations"

Body: "Hi [Name], I'm an AI productivity engineer — I automate the repetitive processes that slow companies down. Email triage, document processing, data entry, reporting. If your team is spending hours on manual work that follows a pattern, AI can handle it. Live demo: send anything to demo@lab5.ca. — Konstantin | lab5.ca"

**To CTOs:**

Subject: "Production AI automation for [Company Name]"

Body: "Hi [Name], I'm an engineer with 20+ years building production systems — most recently AI automation for business processes (lab5.ca). If [company] needs someone who can build real AI productivity tools (not demos), I'd love to connect. The demo is live — send anything to demo@lab5.ca. — Konstantin"

### LinkedIn posts

Post 1-2 times per week about: AI productivity wins, automating repetitive business processes, real examples of AI handling email/documents/workflows. End every post with CTA to lab5.ca or demo@lab5.ca.
```

- [ ] **Step 8: Update section 8 — Signals to watch**

Replace the "Strong signals" table:

```markdown
### Strong signals (reach out immediately)

| Signal                                             | Why it matters                                                |
| -------------------------------------------------- | ------------------------------------------------------------- |
| **Posting AI/Automation Lead roles**               | Direct match — apply and reference lab5.ca portfolio          |
| **Complaining about manual processes on LinkedIn** | Pain they've articulated publicly — message directly about it |
| **Recently raised funding**                        | Hiring for technical leadership or automation is imminent     |
| **Lost their CTO / technical co-founder**          | Urgent gap I can fill                                         |
| **Hiring for ERP/CRM integration roles**           | Systems integration need = core expertise match               |
| **Talking about AI strategy publicly**             | They want AI but may not have execution capability            |
```

Replace the "Moderate signals" table:

```markdown
### Moderate signals (nurture / follow)

| Signal                                           | Why it matters                                                       |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| **Growing headcount rapidly**                    | Operations will strain — they'll need automation soon                |
| **Multiple software tool subscriptions visible** | Disconnected tools = integration opportunity                         |
| **New COO or operations hire**                   | Operations improvement mandate — open to automation conversations    |
| **Industry conference attendance**               | Engaged leadership, open to new approaches                           |
```

- [ ] **Step 9: Update section 9 — What to validate**

Replace the bullet list:

```markdown
Track from the first 50 outreach attempts:

- **Business owner vs. COO vs. CTO response rate** — Who responds more? Which leads to faster conversations?
- **AI productivity vs. systems integration messaging** — Does "automate repetitive work with AI" outperform "connect your systems"?
- **Industry response rates** — Distribution vs. professional services vs. manufacturing vs. insurance
- **Demo conversion** — Do people who try demo@lab5.ca respond at higher rates?
- **Company size sweet spot** — Is 20-50, 50-200, or 200+ more responsive?
- **LinkedIn vs. email** — Which channel produces more conversations with business owners?
- **Referral quality** — Do warm intros from former colleagues convert better than cold outreach?
```

- [ ] **Step 10: Update the document title and header**

Replace:

```markdown
# Ideal Customer Profile: Tech Lead for Business Modernization

**Target: Business owners and CTOs at small companies in North America who need to modernize operations with Google Cloud**
Version 4.0 | March 2026 | CONFIDENTIAL
```

With:

```markdown
# Ideal Customer Profile: AI Productivity Engineer

**Target: Business owners, COOs, and ops leaders at companies where manual processes slow them down**
Version 5.0 | April 2026 | CONFIDENTIAL
```

- [ ] **Step 11: Commit**

```bash
git add missions/ideal-customer-profile.md
git commit -m "docs: update ICP to AI Productivity Engineer positioning"
```

---

### Task 3: Update LinkedIn profile

**Files:**
- Modify: `missions/resume-linkedin.md`

- [ ] **Step 1: Update headline and header section**

Replace:

```markdown
## Headline

Tech Lead | I modernize business operations with Google Cloud | lab5.ca
```

With:

```markdown
## Headline

AI Productivity Engineer | I modernize business operations with AI | lab5.ca
```

- [ ] **Step 2: Update About section**

Replace the entire About section (between the `---` separators after "Website" and before "Experience") with:

```markdown
## About

I modernize business operations with AI to make companies move faster.

20+ years progressing from systems engineering to cloud architecture to building production AI. I started building infrastructure at TD Bank, led teams at CDW, built cloud platforms at PayPal and Colliers International, and now build AI productivity tools independently.

What I do: I automate repetitive business processes with AI — email, documents, workflows, data entry. If your team does it manually and it follows a pattern, AI can handle it.

My latest project is MailPilot (lab5.ca) — a live demo of AI handling real business email:

- **AI Email Processing:** Reads incoming email, searches a knowledge base, drafts accurate responses — fully automated
- **Document Intelligence:** AI-powered document processing, data extraction, and knowledge base search
- **Production Architecture:** Event-driven backend, serverless infrastructure, CI/CD — built to run reliably, not just demo well
- **Full-Stack Delivery:** Python backend, TypeScript frontend, edge deployment — shipped end-to-end by one person

Try it yourself: send any email to demo@lab5.ca and see AI respond in 60 seconds.

I'm looking for a company where I can make business operations faster with AI. Ideal fit: a company where manual processes are the bottleneck and leadership is ready to invest in automation. I work with whatever cloud platform the company has — GCP, Azure, AWS.

lab5.ca | github.com/kborovik | hello@lab5.ca
```

- [ ] **Step 3: Update current role**

Replace:

```markdown
**Tech Lead — Business Modernization**
lab5.ca
_January 2026 — Present_

Leading end-to-end systems integration on Google Cloud — connecting business systems (ERP, CRM, email, documents) to GCP infrastructure, with MailPilot as a live proof of capability.

Technologies: Google Cloud Platform · Google Workspace (Gmail, Drive, Sheets, Calendar) · Vertex AI · Document AI · Cloud Functions · Cloud Pub/Sub · Terraform · Python · TypeScript

- Integrating Google Workspace (Gmail, Drive, Sheets, Calendar) with GCP backend services for automated business workflows
- Building document management pipelines with Google Drive API and Document AI for intelligent processing
- Connecting business systems (ERP, CRM, email) through event-driven architecture on Cloud Functions and Cloud Pub/Sub
- Deploying Vertex AI and LLM integrations for production automation — RAG pipelines, agent workflows, document understanding
- Managing cloud infrastructure as code with Terraform across GCP projects
```

With:

```markdown
**AI Productivity Engineer**
lab5.ca
_January 2026 — Present_

Building production AI systems that automate repetitive business processes — email, documents, workflows, data entry. MailPilot is a live proof of capability.

Technologies: Python · TypeScript · LLM Agents · RAG Pipelines · Cloud Functions · Pub/Sub · Terraform · Google Cloud Platform · Vertex AI · Document AI

- Building AI agents that read, triage, and respond to business email automatically
- Developing document processing pipelines — data extraction from invoices, contracts, and forms
- Connecting business systems (ERP, CRM, email) through event-driven architecture
- Deploying LLM integrations for production automation — RAG pipelines, agent workflows, document understanding
- Managing cloud infrastructure as code with Terraform
```

- [ ] **Step 4: Reorder Skills section**

Replace the entire Skills section with:

```markdown
## Skills

**AI & Machine Learning**

- LLM Agent Development
- RAG Pipelines
- Prompt Engineering
- Vertex AI / Gemini API
- Claude API (Anthropic)
- Document AI

**Languages & Frameworks**

- Python
- TypeScript
- Bash
- Astro
- Tailwind CSS

**Cloud Platforms**

- Google Cloud Platform (Cloud Functions, Cloud Run, Pub/Sub, Cloud SQL, GKE, IAM)
- Amazon Web Services
- Microsoft Azure

**Infrastructure & DevOps**

- Terraform
- Kubernetes (GKE, AKS)
- Docker
- Helm
- GitHub Actions
- GitLab CI/CD
- Azure DevOps
- Elastic Observability
- HashiCorp Vault
- Cloudflare Workers

**Security & Compliance**

- NIST-800-53
- PCI-DSS
- Cloud Security Architecture
```

- [ ] **Step 5: Update LinkedIn Tips section**

Replace:

```markdown
## LinkedIn Tips

- **Creator mode**: Turn on for "Follow" button and featured section prominence
- **Headline keywords**: "Tech Lead", "Google Cloud", "GCP", "systems integration", "business modernization" are high-search terms
- **Activity**: Post 1-2 times per week about GCP architecture, systems integration, or modernizing business operations with Google Cloud
- **CTA in every post**: End with "See it in action at lab5.ca" or "Try the demo — send any email to demo@lab5.ca"
- **Custom URL**: linkedin.com/in/kborovik
- **Open to work**: Enable the "Open to Work" badge for Tech Lead, CTO, VP Engineering, Lead Developer roles in North America
```

With:

```markdown
## LinkedIn Tips

- **Creator mode**: Turn on for "Follow" button and featured section prominence
- **Headline keywords**: "AI Productivity", "AI Automation", "AI Engineer", "business operations" are high-search terms
- **Activity**: Post 1-2 times per week about AI productivity, automating repetitive business processes, real examples of AI handling manual work
- **CTA in every post**: End with "See AI handle real email at lab5.ca" or "Try the demo — send any email to demo@lab5.ca"
- **Custom URL**: linkedin.com/in/kborovik
- **Open to work**: Enable the "Open to Work" badge for AI Engineer, AI Productivity Engineer, Automation Lead, Tech Lead roles in North America
```

- [ ] **Step 6: Commit**

```bash
git add missions/resume-linkedin.md
git commit -m "docs: update LinkedIn profile to AI Productivity Engineer positioning"
```

---

### Task 4: Verify all files are consistent

- [ ] **Step 1: Check that "Tech Lead for Business Modernization" no longer appears in any updated file**

Run: `grep -r "Tech Lead for Business Modernization" CLAUDE.md missions/`
Expected: No matches

- [ ] **Step 2: Check that "I modernize business operations with Google Cloud" no longer appears in any updated file**

Run: `grep -r "modernize business operations with Google Cloud" CLAUDE.md missions/`
Expected: No matches

- [ ] **Step 3: Check that the new title appears in all 3 files**

Run: `grep -r "AI Productivity Engineer" CLAUDE.md missions/`
Expected: Matches in all 3 files
