import type { APIRoute } from 'astro';
import * as mp from '../copy/mailpilot';

// §I: raw markdown alternate mirroring /mailpilot (no frontmatter), generated from the shared
// MailPilot copy so the page and this mirror cannot drift.
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const numbered = (items: mp.Step[]) =>
  items.map(s => `${s.num}. ${s.title}\n${s.body}`).join('\n\n');
const bullets = (items: string[]) => items.map(q => `- ${q}`).join('\n');

export const GET: APIRoute = async () => {
  const body = `# ${mp.title}

${cap(mp.kicker)}.

${mp.intro}

Email ${mp.email} — ${mp.emailNote}

## ${cap(mp.sections.howItWorks)}

${numbered(mp.steps)}

## ${cap(mp.sections.knowledgeBase)}

${mp.knowledgeBase.body}

Knowledge base files (Google Drive): ${mp.knowledgeBase.driveUrl}

## ${cap(mp.sections.tryThese)}

The agent will answer — ${mp.tryThese.answer.hint}

${bullets(mp.tryThese.answer.questions)}

The agent will decline — ${mp.tryThese.decline.hint}

${bullets(mp.tryThese.decline.questions)}

## ${cap(mp.sections.underTheHood)}

${mp.underTheHood.body}

${numbered(mp.underTheHood.stack)}

Source: ${mp.underTheHood.repoUrl}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
