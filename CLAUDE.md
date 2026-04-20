# lab5.ca

Personal portfolio and career site for Konstantin Borovik — AI Productivity Engineer. Positioning: AI-powered automation for repetitive business processes (email, documents, workflows, data entry). Cloud platforms (GCP, Azure, AWS) are implementation details, not the pitch. MailPilot (the AI email platform in `/Users/kb/github/pilot`) is featured as a proof-of-capability demo showing how AI handles real business communication.

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
make playwright  # install Playwright
```

## Stack

- **SSG**: Astro v5 — static output, no SSR adapter
- **Styling**: Tailwind CSS v4 — configured via `@theme` in `src/styles/global.css`
- **Package manager**: `pnpm`
- **Node**: `>=20` (pinned in `.nvmrc` and `package.json` engines)
- **Hosting**: Cloudflare Workers (static assets) — merge to `main` triggers GitHub Actions deploy
- **Domain**: `lab5.ca` via Cloudflare DNS, SSL automatic
- **Browser testing**: Playwright MCP (Chrome) — visual review via Claude Code

## Key Files

```
src/
├── layouts/Layout.astro      # Main template — SEO props: title, description
├── components/
│   ├── Nav.astro             # Sticky header, pinwheel logo, nav links, Book a Call CTA
│   ├── Footer.astro          # Footer links, copyright
│   └── Logo.astro            # Typographic logo — unused after pivot
├── pages/
│   ├── index.astro           # / — hero, AI productivity pitch, MailPilot featured project, CTA
│   ├── expertise.astro       # /expertise — AI Email, Document Processing, Workflow Automation, Data & Reporting
│   ├── demo.astro            # /demo (Live Demo) — MailPilot demo, example questions, architecture
│   └── about.astro           # /about — bio, LinkedIn, Book a Call
└── styles/
    └── global.css            # Tailwind v4 @theme: colors, fonts
public/
├── _headers                  # Cloudflare security headers + cache policy
├── robots.txt                # Sitemap reference
├── og.svg                    # OG image source (edit this, render to og.png)
├── og.png                    # 1200×630 social preview image (generated from og.svg)
├── favicon.ico / favicon.svg # Pinwheel mark in company colors
├── logo-linkedin.svg/png     # LinkedIn profile photo (400×400, pinwheel mark)
├── banner-linkedin.png       # LinkedIn banner (1584×396, rendered from linkedin-banner.html)
makefile                      # All dev/build/deploy targets
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
| `gh-green`         | `#1f883d` | **Primary accent** — Book a Call, See My Work, nav active |
| `gh-green-hover`   | `#1a7f37` | Primary button hover                                      |
| `gh-blue`          | `#0969da` | **Secondary accent** — LinkedIn buttons                   |
| `gh-blue-hover`    | `#0550ae` | Secondary button hover                                    |

**Fonts**: GitHub system font stack (no web fonts) — `--font-sans` and `--font-mono` in `@theme`

**Logo**: 4-color pinwheel mark (blue `#0969da`, green `#1f883d`, yellow `#f9c513`, red `#cf222e`) — derived from lab5.ca favicon

**Layout**: Clean, minimal, high whitespace. Pinwheel logo in nav. No periods on headings.

## Site positioning

**Title**: AI Productivity Engineer
**Tagline**: "I modernize business operations with AI to make companies move faster"
**Core expertise**: AI-powered automation for repetitive business processes (email, documents, workflows, data entry). Cloud platforms (GCP, Azure, AWS) are implementation details.

| Page       | Route        | Purpose                                                    |
| ---------- | ------------ | ---------------------------------------------------------- |
| Home       | `/`          | Hero, AI productivity pitch, MailPilot (reframed), CTA     |
| Expertise  | `/expertise` | AI Email & Communication, Document Processing, Workflow Automation, Data & Reporting |
| Live Demo  | `/demo`      | MailPilot demo — "see how AI handles real business email"  |
| About      | `/about`     | Bio, LinkedIn, Book a Call                                 |

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
- **OG image workflow**: Edit `public/og.svg`, then render to PNG via headless Chrome: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/og.png --window-size=1200,630 public/og.svg`
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
