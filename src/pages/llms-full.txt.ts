import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { landing, type Block } from '../copy/landing';

// §V15: llms-full body is generated from the shared landing-copy module — never hand-mirrored,
// so the rendered page and this mirror cannot drift.
const renderBlock = (b: Block): string =>
  typeof b === 'string' ? b : b.map(r => (typeof r === 'string' ? r : `**${r.b}**`)).join('');
const paras = (blocks: Block[]): string => blocks.map(renderBlock).join('\n\n');

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

  const l = landing;

  const body = `# ${l.hero.h1}

${l.hero.sub}

${l.hero.credentials}

## The problem

${paras(l.problem.paras)}

## What I do

${l.whatIDo.offers.map(o => `${o.title}. ${o.body}`).join('\n\n')}

${l.whatIDo.closing}

## Proof

${paras(l.proof.before)}

${l.proof.tableLead}

${l.proof.table.cols[0]} vs ${l.proof.table.cols[1]}:

${l.proof.table.rows.map(r => `- ${r.metric}: ${r.mailpilot} vs ${r.person}`).join('\n')}

${paras(l.proof.after)}

Read the full cost-per-outcome breakdown: https://lab5.ca/blog/what-one-ai-email-costs/

## ${l.money.kicker.charAt(0).toUpperCase()}${l.money.kicker.slice(1)}

${l.money.intro}

${l.money.items.map(i => `- ${i.lead} — ${i.body}`).join('\n')}

${l.money.outro}

## Why me

${paras(l.whyMe.wholesale)}

${paras(l.whyMe.busFactor)}

${l.whyMe.creditsIntro}

${l.whyMe.credits.map(c => `- ${c.lead} — ${c.body}`).join('\n')}

Built on: ${l.whyMe.builtOn}

## Closing

${paras(l.closing.paras)}

Book a 30-minute call: https://calendar.app.google/cYM3H3TsHsequR587

## Projects

- MailPilot — Production AI agent for business email; Pydantic AI on a Google Cloud backend; live at hello@lab5.ca. https://github.com/kborovik/mailpilot
- gcp-devops — Reference Terraform / Ansible / IaC patterns for Google Cloud. https://github.com/kborovik/gcp-devops
- spec-driven-dev — Claude Code skills SDK plugins for spec-driven development and agentic workflows. https://github.com/kborovik/spec-driven-dev
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

- LinkedIn (linkedin.com/in/kborovik) requires login; canonical identity and writing at lab5.ca
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
