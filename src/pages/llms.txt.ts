import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const postsSection = posts
    .map(
      p =>
        `- [${p.data.title}](https://lab5.ca/blog/${p.id}/): ${p.data.description}`,
    )
    .join('\n');

  const body = `# Konstantin Borovik

> Software Engineer | DevOps Engineer based in Toronto, Canada. Generalist software delivery across cloud infrastructure, AI agents for business workflows, and web development. 20+ years engineering. MailPilot is the live AI-agent reference.

## Pages

- [Projects](https://lab5.ca/projects): skill → GitHub-repo card grid (gcp-devops, MailPilot, Pilot Skills, lab5.ca)
- [MailPilot](https://lab5.ca/mailpilot): production AI agent for business email, evidence of capability
- [Resume](https://lab5.ca/resume): CV — engagements, projects, education, tech skills
- [Blog](https://lab5.ca/blog): notes on cloud infrastructure, AI agents, spec-driven development, and Claude Code

## Posts

${postsSection}

## Contact

- [LinkedIn](https://www.linkedin.com/in/kborovik)
- [GitHub](https://github.com/kborovik)
- [Resume](https://lab5.ca/resume)
- [Markdown resume](https://lab5.ca/kb-resume.md)
- [MailPilot source](https://github.com/kborovik/mailpilot)
- [Book a call](https://calendar.app.google/cYM3H3TsHsequR587)

## Notes

- LinkedIn (linkedin.com/in/kborovik) requires login; canonical identity ∧ writing @ lab5.ca
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
