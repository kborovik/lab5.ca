import type { APIRoute } from 'astro';
import { services, servicesIntro } from '../copy/services';

// §I: raw markdown alternate mirroring /services (no frontmatter), generated from the shared
// services copy so the page and this mirror cannot drift.
export const GET: APIRoute = async () => {
  const sections = services
    .map(s => {
      const proof = s.proof ? `\n\nProof: ${s.proof.label} — https://lab5.ca${s.proof.href}` : '';
      return `## ${s.title}\n\n${s.body}\n\nExample: ${s.example}${proof}`;
    })
    .join('\n\n');

  const body = `# Services

${servicesIntro}

${sections}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
