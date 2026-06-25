// Shared services copy: the single source for the /services page (src/pages/services.astro)
// and its /services.md alternate (src/pages/services.md.ts), so the two cannot drift.
// §V7: literal Unicode (em-dash —, right-quote ’, →); both consumers emit via `{}` / template literals.
// §I: skeleton — three service sections, one per offer; content pending revision.

export interface Service {
  id: string;
  num: string;
  title: string;
  body: string;
  examples: string[];
  proof?: { label: string; href: string };
}

export const services: Service[] = [
  {
    id: 'erp',
    num: '01',
    title: 'ERP and Accounting Data Entry',
    body: 'An agent that reads the documents flowing into your accounting system and drafts the data entry, so a person reviews and approves instead of keying it in by hand. Structured extraction grounded in the source document, with every field traceable back to where it came from.',
    examples: [
      'Email invoice → drafted accounts-payable entry, ready for review.',
      'Scanned receipt or PDF bill → coded expense line with GL account and tax filled in.',
      'Bank-statement line → matched to an open invoice, reconciliation drafted.',
      'Recurring vendor bill → flagged when the amount drifts from its usual range.',
    ],
  },
  {
    id: 'crm',
    num: '02',
    title: 'CRM-System Processes',
    body: 'An agent wired into your CRM that handles the repetitive record work, reading from and writing to the system so the data stays current without manual upkeep. The same retrieval and guardrails, pointed at your pipeline instead of your inbox.',
    examples: [
      'Inbound detail → updated CRM record, with the source noted.',
      'New lead email → contact and company created, enriched, and routed to an owner.',
      'Call or meeting notes → logged activity and a next-step task on the right deal.',
      'Stale opportunity → drafted follow-up and a status change, held for approval.',
    ],
  },
  {
    id: 'email',
    num: '03',
    title: 'Email Reply and Outreach',
    body: 'An agent that reads inbound email and replies with an answer grounded in a knowledge base, and drafts personalized outbound outreach from those same sources — both directions checkable, neither one guessing. MailPilot is the live example, running on my own inbox.',
    examples: [
      'Inbound question → sourced reply in under a minute, with the passage it cited.',
      'Grounded source → personalized outbound draft, never guessing.',
      'Support ticket → drafted answer for one-click send or quick edit.',
      'New signup → onboarding note drawn from their stated use case.',
    ],
    proof: { label: 'MailPilot', href: '/mailpilot' },
  },
];
