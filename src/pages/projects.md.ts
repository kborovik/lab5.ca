import type { APIRoute } from 'astro';
import { projects, projectsIntro } from '../copy/projects';

// §I: raw markdown alternate mirroring /projects (no frontmatter), generated from the shared
// projects copy so the page and this mirror cannot drift.
export const GET: APIRoute = async () => {
  const cards = projects
    .map(
      p => `## ${p.repo} — ${p.label}\n\n${p.context}\n\nStack: ${p.stack}\n\nRepo: ${p.href}`,
    )
    .join('\n\n');

  const body = `# Projects

${projectsIntro}

${cards}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
