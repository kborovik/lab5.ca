// Shared services copy: the single source for the /services page (src/pages/services.astro)
// and its /services.md alternate (src/pages/services.md.ts), so the two cannot drift.
// §V7: literal Unicode (em-dash —, right-quote ’, →); both consumers emit via `{}` / template literals.
// §I: skeleton — three service sections, one per offer; content pending revision.

export const servicesIntro =
  'One build offer, three systems it applies to. Each is an AI agent built around something you already run on — reading from it and writing back to it — measured from day one, with the cost per outcome traced before you scale it.';

export interface Service {
  id: string;
  num: string;
  title: string;
  body: string;
  example: string;
  proof?: { label: string; href: string };
}

export const services: Service[] = [
  {
    id: 'erp',
    num: '01',
    title: 'ERP and Accounting Data Entry',
    body: 'An agent that reads the documents flowing into your accounting system and drafts the data entry, so a person reviews and approves instead of keying it in by hand. Structured extraction grounded in the source document, with every field traceable back to where it came from.',
    example: 'Email invoice → drafted accounts-payable entry, ready for review.',
  },
  {
    id: 'crm',
    num: '02',
    title: 'CRM-System Processes',
    body: 'An agent wired into your CRM that handles the repetitive record work, reading from and writing to the system so the data stays current without manual upkeep. The same retrieval and guardrails, pointed at your pipeline instead of your inbox.',
    example: 'Inbound detail → updated CRM record, with the source noted.',
  },
  {
    id: 'email',
    num: '03',
    title: 'Email Reply and Outreach',
    body: 'An agent that reads inbound email and replies with an answer grounded in a knowledge base, and drafts personalized outbound outreach from those same sources — both directions checkable, neither one guessing. MailPilot is the live example, running on my own inbox.',
    example: 'Inbound question → sourced reply in under a minute; or a grounded source → drafted outreach.',
    proof: { label: 'MailPilot', href: '/mailpilot' },
  },
];
