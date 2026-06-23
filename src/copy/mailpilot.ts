// Shared MailPilot copy: the single source for the /mailpilot page (src/pages/mailpilot.astro)
// and its /mailpilot.md alternate (src/pages/mailpilot.md.ts), so the two cannot drift.
// §V7: literal Unicode (em-dash —, right-quote ’, ·); both consumers emit via `{}` / template literals.
// §V8: section titles are stored clean; the page prepends `// ` in markup for the two non-kicker labels.

export const kicker = 'proof of capability';
export const title = 'MailPilot';
export const intro =
  'A production AI agent I built end-to-end. Reads email, retrieves from a knowledge base, replies in under 60 seconds. Evidence of the work, not a sandbox.';
export const email = 'hello@lab5.ca';
export const emailNote = 'replies in <60s · no signup · real production agent';

export const sections = {
  howItWorks: 'how it works',
  knowledgeBase: 'knowledge base',
  tryThese: 'try these questions',
  underTheHood: 'under the hood',
};

export interface Step {
  num: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'Send a Product Question',
    body: 'Email hello@lab5.ca with a question about the product specs in the knowledge base. Out-of-kb questions get a reply explaining how the demo works.',
  },
  {
    num: '02',
    title: 'Agent Searches the Knowledge Base',
    body: 'The agent searches product documentation stored in Google Drive, running retrieval over indexed specs to find relevant passages.',
  },
  {
    num: '03',
    title: 'You Get a Sourced Reply',
    body: 'Within 60 seconds the agent replies with an answer grounded in the source documents. End-to-end automated: Gmail push → retrieval → llm → reply.',
  },
];

export const knowledgeBase = {
  body: 'Sample questions are based on real product specification sheets. Cross-check the agent’s answers against the source documents.',
  driveUrl: 'https://drive.google.com/drive/folders/1IUuPinOopUv_YWOZyFpt2ZX8Hd8bpZat',
};

export const tryThese = {
  answer: {
    heading: 'the agent will answer',
    hint: 'questions matching products in the knowledge base — expect a sourced reply.',
    questions: [
      'What is the permeate flow rate in GPD for the TW-12.0K-840 model, and what is the motor horsepower required at 60Hz?',
      'What is the continuous flow rate in GPM and peak flow rate in GPM for the WS36-600-2 softener?',
      'What is the maximum flow rate of the C403 UV-COM model, and what is its UV dose range?',
      'What is the permeate flow rate and active area of the FilmTec ECO-440i RO membrane?',
      'What percentage of free chlorine can KDF 55 medium remove, and what is the heavy metal removal efficiency of KDF 55, KDF 85, and KDF-C media?',
      'What is the capacity in GPD of the RO-500 Series model TW-270K-8580 installed in Nicaragua, and how many 8" TFC spiral wound membranes does this system contain?',
    ],
  },
  decline: {
    heading: 'the agent will decline',
    hint: 'products not in the knowledge base — expect a polite refusal, not a guess.',
    questions: [
      'Which Pentair commercial reverse osmosis system would you recommend for a 300 GPM brewery feedwater application?',
      'Can you spec a Grundfos CRN dosing pump for chlorine injection at 25 GPH?',
      'Which Veolia OPUS II system handles produced water with 50,000 ppm TDS for oil and gas?',
    ],
  },
};

export const underTheHood = {
  body: 'For technical reviewers — the stack and the reasoning.',
  stack: [
    {
      num: '01',
      title: 'Backend',
      body: 'Python, serverless functions, event-driven. Triggered by Gmail push notifications via Pub/Sub. Scale-to-zero costs.',
    },
    {
      num: '02',
      title: 'AI Layer',
      body: 'LLM with retrieval over Google Drive. Structured prompts guide answer format. Out-of-kb detection prevents hallucination.',
    },
  ] as Step[],
  repoUrl: 'https://github.com/kborovik/mailpilot',
};
