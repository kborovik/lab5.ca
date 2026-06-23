// Shared projects copy: the single source for the /projects page (src/pages/projects.astro)
// and its /projects.md alternate (src/pages/projects.md.ts), so the two cannot drift.
// §V7: literal Unicode (em-dash —, right-quote ’); both consumers emit via `{}` / template literals.

export const projectsIntro =
  'Each card maps a skill to a public GitHub repository — what I’ve actually shipped, not what I claim.';

export interface Project {
  id: string;
  repo: string;
  label: string;
  context: string;
  stack: string;
  href: string;
}

export const projects: Project[] = [
  {
    id: 'mailpilot',
    repo: 'mailpilot',
    label: 'Python',
    context: 'Production AI agent handling real business email — Pydantic AI on a Google Cloud backend; live at hello@lab5.ca.',
    stack: 'Pydantic AI · LLM workflows · GCP · Cloud Run',
    href: 'https://github.com/kborovik/mailpilot',
  },
  {
    id: 'gcp-devops',
    repo: 'gcp-devops',
    label: 'Google Cloud',
    context: 'Reference Terraform and Ansible patterns for Google Cloud — Cloud Run services, Pub/Sub topologies, IAM, observability.',
    stack: 'Terraform · Ansible · Cloud Run · Pub/Sub · IaC',
    href: 'https://github.com/kborovik/gcp-devops',
  },
  {
    id: 'spec-driven-dev',
    repo: 'spec-driven-dev',
    label: 'AI agent tooling',
    context: 'Claude Code skill plugins for spec-driven development and agent workflows — one root SPEC.md, build/check loops, MCP integration.',
    stack: 'Claude Code skills SDK · agentic workflows · MCP',
    href: 'https://github.com/kborovik/spec-driven-dev',
  },
  {
    id: 'lab5',
    repo: 'lab5.ca',
    label: 'Web development',
    context: 'This site — Astro 6 static build on Cloudflare Workers; spec-driven, deploy on push to main.',
    stack: 'Astro 6 · Tailwind v4 · TypeScript · Cloudflare Workers',
    href: 'https://github.com/kborovik/lab5.ca',
  },
];
