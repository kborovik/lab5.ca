# Konstantin Borovik

**Software Engineer | DevOps Engineer** · 20+ years engineering
Toronto, Ontario, Canada

- LinkedIn: <https://www.linkedin.com/in/kborovik>
- GitHub: <https://github.com/kborovik>
- Web: <https://lab5.ca>

---

## Engagements

### lab5.ca — Independent Contractor · Software Engineer | DevOps Engineer

*2026 — Present*

lab5.ca is my independent consulting practice with client engagements across AI & LLM Engineering, DevOps & Cloud Platform Engineering, and modern software development. I take systems from prototype to production: designing agentic architectures, writing the Infrastructure as Code that runs them, and building the developer tooling that keeps them shipping.

What I deliver:

- AI & LLM Engineering — production agentic systems on Anthropic Claude and Google Gemini (Pydantic AI, multi-agent orchestration, structured-extraction pipelines), Claude Code plugins and skills for developer workflows, Model Context Protocol (MCP) integrations, prompt engineering, and LLMOps practices for AI applications.

- DevOps & Cloud Platform Engineering — Terraform across the full Google Cloud spectrum (GKE, GCE, Cloud SQL, networking, firewalls, IAM, org policies), Helm for Kubernetes release pipelines, CI/CD via GitHub Actions and Azure DevOps, Cloud Composer / Apache Airflow for ETL orchestration, and observability with OpenTelemetry and Pydantic Logfire.

- Software development — Python and TypeScript backends and full-stack web applications (FastAPI, Pydantic, Astro, Cloudflare Workers), PostgreSQL data layers, REST APIs, event-driven architectures, and Salesforce integration.

### Colliers International — Software Engineer

*2023 — 2025*

I built and operated data integration pipelines connecting Salesforce to enterprise business applications across a two-cloud environment — Google Cloud and Microsoft Azure. ETL was orchestrated on Google Cloud Composer (managed Apache Airflow), backed by PostgreSQL for workflow state and Cloud Storage for staging and archival.

- Salesforce data integration — bidirectional pipelines syncing accounts, opportunities, and operational data between Salesforce and downstream business applications via the Salesforce APIs
- Cross-cloud ETL on Cloud Composer / Apache Airflow — idempotent, self-recovering Python DAGs moving data between sources in Google Cloud and Microsoft Azure; PostgreSQL for workflow state, Cloud Storage for intermediate data, replacing manual transfers end-to-end
- CI/CD pipelines via Azure DevOps and Infrastructure as Code via Terraform on Google Cloud — Composer environments, GCS buckets, Cloud SQL, IAM, networking, and automated test/deploy for DAGs and supporting services

### PayPal — DevOps Engineer

*2018 — 2023*

I wrote Infrastructure as Code and Kubernetes release tooling supporting deployment and operations of a large application microservices estate on Google Cloud, under NIST-800-53 and PCI-DSS controls.

- Terraform across the full Google Cloud infrastructure spectrum — GKE clusters, GCE instances, Cloud SQL, VPC networking, firewall rules, load balancers, IAM, service accounts, and org policies
- Helm charts and release pipelines for the application platform — deployment, configuration, and lifecycle management for a large fleet of microservices on GKE, serving 20+ backend engineering teams
- Secrets management and security controls satisfying NIST-800-53 and PCI-DSS — IAM design, firewall and network policies, encrypted secrets handling, and audit-ready infrastructure

### CDW — DevOps Engineer · Platform Engineer

*2010 — 2018*

- Python automation tooling for cloud migration and deployment across client engagements
- Led a team automating enterprise infrastructure provisioning and platform operations
- NetApp storage, VMware virtualization, FortiGate firewalls — enterprise infrastructure stack across client engagements

### TD Bank Financial Group — Systems Engineer

*2003 — 2009*

- Datacenter operations across Dell & IBM servers and Windows Server fleets

---

## Projects

### [github.com/kborovik/mailpilot](https://github.com/kborovik/mailpilot)

*Skills: AI & LLM Engineering, Software Development*

Agent-operated CRM with Gmail as the communication layer — Anthropic Claude as strategic orchestrator and an internal Pydantic AI agent as tactical executor for inbound classification, auto-reply, and follow-up scheduling. CLI-first with JSON output designed for LLM consumption; Python 3.14, PostgreSQL 18, Gmail API with domain-wide delegation, Pub/Sub for real-time sync, Pydantic Logfire / OpenTelemetry for tracing.

### [github.com/kborovik/gcp-devops](https://github.com/kborovik/gcp-devops)

*Skills: DevOps & Cloud Platforms & Platform Engineering*

Production Google Cloud Platform infrastructure powering MailPilot — Terraform for GCE instances, networking, DNS, IAM, service accounts, and org policies, plus Ansible for VM configuration (ZFS, Tailscale, Google Ops Agent). Make-based deployment pipeline with confirm-gated production deploys and a two-layer PostgreSQL backup architecture (Sanoid ZFS snapshots plus GCE persistent-disk snapshots).

### [github.com/kborovik/pilot-skills](https://github.com/kborovik/pilot-skills)

*Skills: AI & LLM Engineering, Software Development*

Claude Code plugin marketplace shipping pilot-spec (Spec-Driven Development with a single SPEC.md and math-glyph compression for invariants, tasks, and bugs), pilot-plan (GitHub workflow — issue, PR, commit, merge, release), and pilot-core (shared intent-gating and shorthand skills). Demonstrates AI agent orchestration, prompt engineering, and AI-augmented development workflow built on the Anthropic API.

### [github.com/kborovik/lab5.ca](https://github.com/kborovik/lab5.ca)

*Skills: Software Development, DevOps & Cloud Platforms*

Engineering practice site and publishing platform for AI-augmented development — Astro 6, Tailwind v4, TypeScript, and Cloudflare Workers, fully type-checked end-to-end. Spec-driven with deploy-on-push CI/CD via GitHub Actions; built entirely with Claude Code.

---

## Education

### Northern Alberta Institute of Technology

*2000 — 2002* · Network Engineering Technology

---

## Skills

### Software Development

Languages: Python, TypeScript, Node.js, Bash, SQL
Disciplines: Backend Development, Full-Stack Development, Software Architecture
Frameworks & Web: FastAPI, Pydantic, Astro, Cloudflare Workers
APIs: REST APIs, API Design, OpenAPI, Webhooks
Architecture: Event-Driven Architecture, Microservices, Distributed Systems, Asynchronous Programming
Data: PostgreSQL, SQLite, Cloud SQL
Pipelines: ETL, Data Pipelines, Structured-Extraction Pipelines
Enterprise Integration: Salesforce Developer, Salesforce Integration, Salesforce APIs
Testing: Pytest, Test Automation, Unit Testing
Methodologies: Test-Driven Development (TDD), Spec-Driven Development (SDD)
Foundations: Git, Version Control, Object-Oriented Programming

### DevOps & Cloud Platforms & Platform Engineering

Google Cloud Platform (GCP): Cloud Run, Cloud Functions, BigQuery, Vertex AI, Cloud SQL, Cloud Composer, Pub/Sub
Microsoft Azure: Azure App Service, Azure Functions, Azure Service Bus, Azure Key Vault
Practice: DevOps, Platform Engineering, DevSecOps
IaC: Infrastructure as Code (IaC), Terraform, Ansible, Helm
Containers: Docker, Kubernetes, Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS), Container Orchestration
CI/CD: Continuous Integration, Continuous Deployment, GitHub Actions, Azure DevOps
Orchestration: Apache Airflow, Workflow Orchestration
Systems: Linux, Shell Scripting, YAML
Observability: Observability, OpenTelemetry, Pydantic Logfire, GCP Cloud Logging, GCP Log Analysis
Security & Compliance: Cloud Security, Secrets Management, Identity and Access Management (IAM), NIST 800-53, PCI DSS

### AI & LLM Engineering

Agents: Agentic AI Development, AI Agents, AI Engineering
Models & APIs: Large Language Models (LLM), LLM Integration, Anthropic Claude, Anthropic API, Google Gemini
Tooling: Pydantic AI, Model Context Protocol (MCP), Retrieval-Augmented Generation (RAG), Prompt Engineering
AI-Augmented Development: Claude Code, Claude Skills, AI-Augmented Development
