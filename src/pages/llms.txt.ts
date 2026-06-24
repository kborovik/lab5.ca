import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const postsSection = posts
    .map(
      p =>
        `- [${p.data.title}](https://lab5.ca/blog/${p.id}.md): ${p.data.description}`,
    )
    .join('\n');

  const body = `# Konstantin Borovik

> Build business processes with AI — an LLM agent built around the systems you already run on, your ERP and CRM. LLM systems that do real work without becoming a money pit; cost per outcome traced to the dollar. Software Engineer in Toronto; 20+ years shipping production software, AI agents running in production today. MailPilot is the live proof of capability.

## Pages

- [Projects](https://lab5.ca/projects.md): skill-to-GitHub-repo card grid (gcp-devops, MailPilot, spec-driven-dev, lab5.ca)
- [MailPilot](https://lab5.ca/mailpilot.md): production AI agent for business email, evidence of capability
- [Blog](https://lab5.ca/blog): notes on cloud infrastructure, AI agents, spec-driven development, and Claude Code

## Posts

${postsSection}

## Contact

- [LinkedIn](https://www.linkedin.com/in/kborovik)
- [GitHub](https://github.com/kborovik)
- [Resume (GitHub)](https://github.com/kborovik/resume)
- [MailPilot source](https://github.com/kborovik/mailpilot)
- [Book a call](https://calendar.app.google/cYM3H3TsHsequR587)

## Notes

- LinkedIn (linkedin.com/in/kborovik) requires login; canonical identity and writing at lab5.ca
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
