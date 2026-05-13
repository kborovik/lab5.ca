# lab5.ca

Personal portfolio and career site for Konstantin Borovik — AI Automation Engineer. Positioning: AI-powered automation for repetitive business processes (ERP integration, document workflows, email, reporting). Cloud platforms (GCP, Azure, AWS) are implementation details, not the pitch. MailPilot (the AI email platform in `/Users/kb/github/mailpilot`) is featured as a proof-of-capability demo showing how AI handles real business communication.

## Commands

```bash
make install     # install pnpm via Homebrew if missing, then pnpm install
make dev         # astro dev server (localhost:4321)
make build       # production build → dist/
make preview     # serve production build locally
make check       # astro type checking
make clean       # remove dist/ and .astro/
make clean-all   # remove dist/, .astro/, node_modules/
make deploy      # build + wrangler deploy to Cloudflare Workers
make status      # check Cloudflare Workers deployment status
make wrangler    # install Wrangler CLI globally
make playwright  # install Playwright Chrome browser binary (pnpm dlx)
```

## Stack

- **SSG**: Astro v5 — static output, no SSR adapter
- **Styling**: Tailwind CSS v4 — configured via `@theme` in `src/styles/global.css`
- **Package manager**: `pnpm`
- **Node**: `>=22` (pinned in `package.json` engines)
- **Hosting**: Cloudflare Workers (static assets) — merge to `main` triggers GitHub Actions deploy
- **Domain**: `lab5.ca` via Cloudflare DNS, SSL automatic
- **Browser testing**: Playwright MCP (Chrome) — visual review via Claude Code

## Key Files

```
src/
├── layouts/Layout.astro      # Main template — SEO props: title, description; scroll-reveal IntersectionObserver
├── components/
│   ├── Nav.astro             # Sticky header, pinwheel logo SVG (inline), nav links, Book a Call CTA, mobile menu
│   ├── Footer.astro          # Footer links (Expertise · Demo · About), copyright
│   └── Logo.astro            # Typographic logo — unused (kept for reference)
├── pages/
│   ├── index.astro           # / — hero · 01-04 capabilities · 05-08 why-hire-me · proof-of-capability (MailPilot Demo + github buttons)
│   ├── expertise.astro       # /expertise — 4 deep-dive sections (ERP Integration, Documents, Email, Data) with capability list + implementation key/value card
│   ├── demo.astro            # /demo (Live Demo) — MailPilot — code-chip CTA, how-it-works, KB link, sample Q's (can-answer / will-decline w/ copy buttons), architecture
│   └── about.astro           # /about — bio, headshot, LinkedIn / GitHub buttons (Book a Call lives in nav)
├── assets/
│   └── konstantin-borovik-headshot.jpg  # imported via astro:assets on /about
└── styles/
    └── global.css            # Tailwind v4 @theme: colors, fonts; keyframes (fadeUp, slideInRight, pulseGlow); .animate-hero, .animate-on-scroll, .cta-pulse, .card-accent, .link-animated
public/
├── _headers                  # Cloudflare security headers + cache policy
├── robots.txt                # Sitemap reference
├── og.png                    # 1200×630 social preview image (rendered from og.html)
├── favicon.ico / favicon.svg # Pinwheel mark in company colors
├── logo-linkedin.svg/png     # LinkedIn profile photo (400×400, pinwheel mark)
├── banner-linkedin.png       # LinkedIn banner (1584×396, rendered from linkedin-banner.html)
makefile                      # All dev/build/deploy targets
og.html                       # OG image source — render to PNG via headless Chrome
linkedin-banner.html          # LinkedIn banner source — render to PNG via headless Chrome
```

## Design System

**Palette**: GitHub Primer Light (https://primer.style)

| Token              | Hex       | Usage                                                     |
| ------------------ | --------- | --------------------------------------------------------- |
| `gh-canvas`        | `#ffffff` | Page background                                           |
| `gh-canvas-subtle` | `#f6f8fa` | Alternate sections                                        |
| `gh-border`        | `#d1d9e0` | Borders                                                   |
| `gh-fg`            | `#1f2328` | Primary text                                              |
| `gh-fg-muted`      | `#59636e` | Secondary text                                            |
| `gh-fg-subtle`     | `#818b98` | Tertiary text                                             |
| `gh-green`         | `#1f883d` | **Primary accent** — Book a Call (nav), nav active link, `[ok]` markers |
| `gh-green-hover`   | `#1a7f37` | Primary button hover                                      |
| `gh-blue`          | `#0969da` | **Secondary accent** — `// section kickers`, LinkedIn button, deep links (Drive) |
| `gh-blue-hover`    | `#0550ae` | Secondary button hover                                    |

**Fonts**: **IBM Plex Mono is the only typeface** — used across the site and the OG / LinkedIn banner. Set on `<body>` in `Layout.astro` (via `font-mono` class) and on the social-asset HTML sources. Loaded via Google Fonts (`display=swap`): IBM Plex Mono 400/500/600/700. `@theme` declares only `--font-mono`; Sans/Serif have been removed — **do not reintroduce `font-sans` or `font-serif`**. Hierarchy comes from weight + size + color, not font-family switching. Base font size 18px (set on `html` in `global.css`).

**Logo**: 4-color pinwheel mark (blue `#0969da`, green `#1f883d`, yellow `#f9c513`, red `#cf222e`) — derived from lab5.ca favicon

**Aesthetic**: framework-docs / terminal style (openspec.dev, Stripe docs as reference points) — **NOT** SaaS-marketing-landing. The audience hiring is technical; marketing flourishes (pill badges with leading dots, aspirational verbs, multiple stacked hero CTAs, "Why it matters" persona sidebars, colored icon boxes, "Learn more →" links) hurt credibility and have been removed. Clean, minimal, high whitespace. Pinwheel logo in nav. No periods on headings. Lowercase for tile titles and step titles (e.g. `email & communication`, `send a product question`).

**Conventions**:

- **Section kicker**: `// section name` in mono — `text-sm font-bold uppercase tracking-[0.2em] text-gh-blue`. Top label of each section.
- **Numbered hairlines**: `01 ─────` headers above each tile or section item, mono, `text-xs text-gh-fg-subtle`. Numbering continues across grids when content flows as one docs narrative (homepage: 01-04 capabilities → 05-08 why-hire-me).
- **Section dividers**: `border-t border-gh-border` between sections — no alternating background colors at the section level. `bg-gh-canvas-subtle` is reserved for contained surfaces (implementation cards, code chips, footer).
- **Code-style CTA chip**: bordered mono box, `$ mail demo@lab5.ca [copy]`, modeled on openspec.dev's `npm install` block. Used on `/demo` as the primary CTA; copy-to-clipboard via vanilla JS. The homepage's "proof of capability" section uses a pair of bordered buttons instead (MailPilot Demo · github).
- **Implementation cards** (`/expertise`): mono key/value list in a `bg-gh-canvas-subtle` card with `IMPLEMENTATION` kicker. Example rows: `trigger: gmail push api`, `runtime: serverless functions`.
- **Bullet lists**: dash-prefix in a subtle color (`-`), not check/x SVG icons.
- **Copy**: factual, descriptive. Avoid aspirational verbs ("move faster", "transform"), business-benefit framing ("ship more with the same headcount"), and Owner/CTO/COO persona breakouts. Prefer tech vocabulary (LLM, retrieval, structured extraction, system of record, idempotent state machine).
- **Hero CTAs**: at most one prominent CTA per page; on `/demo`, the code-chip *is* the CTA. Book-a-Call lives in the nav (with `cta-pulse` animation) and doesn't need repeating in page footers.

## Site positioning

**Title**: AI Automation Engineer
**Tagline**: "AI automation for business operations" (homepage h1)
**Core expertise**: AI-powered automation for repetitive business processes (ERP integration, document workflows, email, reporting). Cloud platforms (GCP, Azure, AWS) are implementation details.

**Capability order** (canonical across all site sections): 01 ERP Integration · 02 Document Workflow · 03 AI Email & Communication · 04 Data & Reporting. Keep this order anywhere capabilities are listed (homepage tiles, /expertise sections, /about bio, meta descriptions).

| Page       | Route        | Purpose                                                    |
| ---------- | ------------ | ---------------------------------------------------------- |
| Home       | `/`          | Hero · capabilities grid (01-04) · why-hire-me grid (05-08) · proof-of-capability (MailPilot) |
| Expertise  | `/expertise` | 01-04 deep-dive: ERP Integration, Document Workflow, Email, Data — each with description, capability list, implementation key/value card |
| Demo       | `/demo`      | MailPilot — code-chip CTA, how-it-works, KB link, sample Q's (copy buttons), architecture |
| About      | `/about`     | Bio, headshot, LinkedIn / GitHub buttons                  |

**Primary CTA**: Book a Call — Google Calendar (`https://calendar.app.google/cYM3H3TsHsequR587`)
**Secondary CTA**: LinkedIn — `https://www.linkedin.com/in/kborovik`
**Demo CTA**: Try the demo — send an email to `demo@lab5.ca` (see how AI handles real business email)

## Playwright MCP (Browser Review)

Playwright is configured as an MCP server for Claude Code, enabling visual page review during development. It is **not** a project dependency — it runs via `npx` on demand.

**Configuration** (`.mcp.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser",
        "chrome",
        "--user-data-dir",
        ".playwright-mcp/chrome-profile"
      ]
    }
  }
}
```

- **Browser**: Chrome (uses locally installed Chrome with persistent profile)
- **Persistent sessions**: `--user-data-dir` stores cookies/sessions in `.playwright-mcp/chrome-profile/` — log in to external sites once and stay logged in across restarts
- **Enabled by**: `.claude/settings.json` → `"enableAllProjectMcpServers": true`
- **Output directory**: `.playwright-mcp/` (console logs, screenshots, chrome profile) — in `.gitignore`

**Usage in development workflow**:

1. Start the dev server: `make dev`
2. In Claude Code, use Playwright tools to review pages:
   - `browser_navigate` → load `http://localhost:4321/` (or any route)
   - `browser_snapshot` → get an accessibility tree of the page (preferred for review)
   - `browser_take_screenshot` → capture a visual screenshot
   - `browser_click` / `browser_type` → interact with elements
   - `browser_console_messages` → check for JS errors/warnings
   - `browser_network_requests` → inspect failed requests
3. Use snapshots to verify layout, content, links, and accessibility after changes

**When to use**: After modifying pages or components, ask Claude Code to navigate to the page and take a snapshot to verify the rendered output matches expectations.

## CI/CD

GitHub Actions pipelines in `.github/workflows/`:

- **`ci.yml`** — runs on PRs to `main`: type check (`astro check`) + build validation
- **`deploy.yml`** — runs on push to `main`: type check, build, deploy via `wrangler deploy`

**Required GitHub secrets** (`Settings → Secrets → Actions`):

| Secret                  | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API token with "Edit Cloudflare Workers" permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID                                           |

## Gotchas

- `README.md` is a **symlink** to `CLAUDE.md`
- **OG image workflow**: Edit `og.html`, then render to PNG via headless Chrome: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/og.png --window-size=1200,630 og.html`
- **LinkedIn banner workflow**: Edit `linkedin-banner.html`, then render: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/banner-linkedin.png --window-size=1584,396 linkedin-banner.html`
- Do not use Playwright MCP to screenshot SVGs — it times out on `file://` SVG URLs
- **Favicon regeneration**: `magick -background none public/favicon.svg -define icon:auto-resize=48,32,16 public/favicon.ico`

## TODO

- [ ] Wire up `demo@lab5.ca` to MailPilot agent (lives in `~/github/mailpilot`)
- [ ] Define post-demo CTA in the auto-reply
- [ ] Configure Cloudflare redirect from `/services` → `/expertise`

## Open Questions

- **Analytics**: Cloudflare Web Analytics, Plausible, Fathom, or none?
- **Staging**: Cloudflare Workers preview deployment as staging environment?
