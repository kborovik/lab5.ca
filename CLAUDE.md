# lab5.ca

Personal portfolio and career site for Konstantin Borovik — AI Automation Engineer. Positioning: AI-powered automation for repetitive business processes (ERP integration, document workflows, email, reporting). Cloud platforms (GCP, Azure, AWS) are implementation details, not the pitch. MailPilot (`~/github/mailpilot`) is featured as a proof-of-capability demo.

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

- **SSG**: Astro v5 (static output, no SSR adapter)
- **Styling**: Tailwind CSS v4 — configured via `@theme` in `src/styles/global.css`
- **Package manager**: `pnpm`; **Node**: `>=22` (pinned in `package.json` engines)
- **Hosting**: Cloudflare Workers (static assets) — merge to `main` triggers GitHub Actions deploy
- **Domain**: `lab5.ca` via Cloudflare DNS, SSL automatic
- **Browser testing**: Playwright MCP (Chrome) — visual review via Claude Code

## Key Files

```
src/
├── layouts/Layout.astro      # Main template — SEO props; scroll-reveal IntersectionObserver
├── components/
│   ├── Nav.astro             # Sticky header, pinwheel logo SVG, nav links, Book a Call CTA, mobile menu
│   ├── Footer.astro          # Footer links (Expertise · Demo · Blog · About), copyright
│   └── Logo.astro            # Typographic logo — unused (kept for reference)
├── content.config.ts         # Astro content collections — defines `blog` (globs src/content/blog/**/*.md)
├── content/blog/             # Blog post markdown files (see "Blog posts" below)
├── pages/
│   ├── index.astro           # / — hero · 01-04 capabilities · 05-08 why-hire-me · proof-of-capability
│   ├── expertise.astro       # /expertise — 4 deep-dive sections w/ capability list + implementation card
│   ├── demo.astro            # /demo — MailPilot: code-chip CTA, how-it-works, KB link, sample Q's, architecture
│   ├── about.astro           # /about — bio, headshot, LinkedIn / GitHub buttons
│   └── blog/
│       ├── index.astro       # /blog — list of posts (sorted pubDate desc)
│       └── [...slug].astro   # /blog/<slug> — renders markdown body, prose styles in global.css
├── assets/konstantin-borovik-headshot.jpg  # imported via astro:assets on /about
└── styles/global.css         # Tailwind v4 @theme: colors, fonts; keyframes; .prose (markdown body)
public/
├── _headers                  # Cloudflare security headers + cache policy
├── og.png                    # 1200×630 social preview (rendered from og.html)
├── banner-linkedin.png       # 1584×396 LinkedIn banner (rendered from linkedin-banner.html)
├── favicon.{ico,svg}, logo-linkedin.{svg,png}, robots.txt
makefile, og.html, linkedin-banner.html
```

## Design System

**Palette**: GitHub Primer Light (https://primer.style)

| Token              | Hex       | Usage                                                                          |
| ------------------ | --------- | ------------------------------------------------------------------------------ |
| `gh-canvas`        | `#ffffff` | Page background                                                                |
| `gh-canvas-subtle` | `#f6f8fa` | Contained surfaces only (cards, footer) — not section-level alternation        |
| `gh-border`        | `#d1d9e0` | Borders                                                                        |
| `gh-fg`            | `#1f2328` | Primary text                                                                   |
| `gh-fg-muted`      | `#424a53` | Secondary text                                                                 |
| `gh-fg-subtle`     | `#818b98` | Tertiary text                                                                  |
| `gh-green`         | `#1f883d` | **Primary accent** — Book a Call, nav active, `[ok]` markers                   |
| `gh-green-hover`   | `#1a7f37` | Primary button hover                                                           |
| `gh-blue`          | `#0969da` | **Secondary accent** — `// section kickers`, LinkedIn button, links            |
| `gh-blue-hover`    | `#0550ae` | Secondary button hover                                                         |

**Fonts**: **IBM Plex Mono is the only typeface** — across the site and the OG / LinkedIn banner. Set on `<body>` in `Layout.astro` (`font-mono`) and on social-asset HTML sources. Loaded via Google Fonts (`display=swap`) at weights 400/500/600/700. `@theme` declares only `--font-mono`; **do not reintroduce `font-sans` or `font-serif`**. Hierarchy comes from weight + size + color, not font-family. Base size 18px (set on `html`); body default weight 500 (set in `global.css`) — monospace at 400 reads too thin against `gh-canvas`.

**Logo**: 4-color pinwheel mark — blue `#0969da`, green `#1f883d`, yellow `#f9c513`, red `#cf222e` (derived from favicon).

**Aesthetic**: framework-docs / terminal style (openspec.dev, Stripe docs as reference) — **NOT** SaaS-marketing-landing. Audience is technical; marketing flourishes (pill badges with leading dots, aspirational verbs, stacked hero CTAs, persona sidebars, colored icon boxes, "Learn more →" links) have been removed. Clean, minimal, high whitespace. No periods on headings.

**Title casing**:

- **Page H1s and blog post titles**: sentence case — first word + proper nouns only (e.g. `What I build`, `Compressed spec-driven development`).
- **Tile titles and step titles**: lowercase (e.g. `email & communication`, `send a product question`).
- **Section H2s on `/expertise`** (capability names): Title Case (e.g. `ERP Integration`, `Document Workflow`).

**Conventions**:

- **Section kicker**: `// section name` — `text-sm font-bold uppercase tracking-[0.2em] text-gh-blue`.
- **Numbered hairlines**: `01 ─────` above tiles, mono `text-xs text-gh-fg-subtle`. Numbering continues across grids when content flows as one narrative (homepage: 01-04 → 05-08).
- **Section dividers**: `border-t border-gh-border` — no alternating background colors at section level. `bg-gh-canvas-subtle` is reserved for contained surfaces (implementation cards, code chips, footer).
- **Code-style CTA chip**: bordered mono box, `$ mail demo@lab5.ca [copy]`, modeled on openspec.dev's `npm install` block. Used on `/demo`; copy-to-clipboard via vanilla JS.
- **Implementation cards** (`/expertise`): mono key/value list in `bg-gh-canvas-subtle` card with `IMPLEMENTATION` kicker. Example: `trigger: gmail push api`.
- **Bullet lists**: dash-prefix in a subtle color (`-`), not check/x SVG icons.
- **Copy**: factual, descriptive. Avoid aspirational verbs ("move faster", "transform"), business-benefit framing ("ship more with the same headcount"), and Owner/CTO/COO persona breakouts. Prefer tech vocabulary (LLM, retrieval, structured extraction, system of record, idempotent state machine).
- **Hero CTAs**: at most one prominent CTA per page; Book-a-Call lives in the nav with `cta-pulse` animation — don't repeat in page footers.

## Site positioning

**Title**: AI Automation Engineer
**Tagline**: "AI automation for business operations" (homepage h1)

**Capability order** (canonical across all sections): 01 ERP Integration · 02 Document Workflow · 03 AI Email & Communication · 04 Data & Reporting. Keep this order anywhere capabilities are listed (homepage tiles, `/expertise` sections, `/about` bio, meta descriptions).

| Page       | Route          | Purpose                                                                       |
| ---------- | -------------- | ----------------------------------------------------------------------------- |
| Home       | `/`            | Hero · capabilities (01-04) · why-hire-me (05-08) · proof-of-capability       |
| Expertise  | `/expertise`   | 01-04 deep-dive — description, capability list, implementation card           |
| Demo       | `/demo`        | MailPilot — code-chip CTA, how-it-works, KB link, sample Q's, architecture    |
| Blog       | `/blog`        | Post list from `src/content/blog/*.md`; detail at `/blog/<slug>`              |
| About      | `/about`       | Bio, headshot, LinkedIn / GitHub buttons                                      |

**CTAs**:
- **Primary**: Book a Call — `https://calendar.app.google/cYM3H3TsHsequR587`
- **Secondary**: LinkedIn — `https://www.linkedin.com/in/kborovik`
- **Demo**: send email to `demo@lab5.ca`

## Blog posts

Posts live at `src/content/blog/<slug>.md` (flat, no subfolders). Filename minus `.md` **is** the URL slug — renaming a published file breaks the URL. UTF-8, LF, no BOM. Hard-wrap body prose at ~78 cols. **Do not place any non-post `.md` in this folder** — the glob in `src/content.config.ts` loads everything and schema validation will fail the build.

**Frontmatter** (schema in `src/content.config.ts` — keep in sync):

```yaml
---
title: Sentence case, no trailing period      # required — renders as H1
description: One sentence, ≤ ~180 chars.      # required — also <meta description>
pubDate: 2026-05-13                            # required — ISO date, drives sort
updatedDate: 2026-06-01                        # optional — only on meaningful revisions
draft: false                                   # optional — true excludes from build + 404s URL
tags: [kebab-case, lowercase]                  # optional — ≤ 5, reuse existing before inventing
---
```

Do **not** add fields the schema does not declare (`author`, `image`, `canonical`) — `astro check` fails.

**Body**: the `[...slug].astro` template renders H1, date/tags line, and `← all posts` back-link. So:

- Don't write a `# Title` line; start with a prose lede.
- Don't add bylines, footers, or back-links.
- `##` for top-level sections, `###` for subsections — sentence case, no trailing period.
- First-person singular ("I"). Factual, descriptive — same voice rules as the rest of the site.

**Markdown supported by `.prose`** (`src/styles/global.css`): bold, italic, inline code, fenced code blocks, unordered lists (en-dash bullets), ordered lists (decimal-leading-zero counters), blockquotes (hairline left border, no italic), `---` horizontal rule, inline links (`gh-blue` w/ 3px-offset underline). Use `&mdash;` / `&middot;` entities; literal `—` only when surrounded by spaces.

**Not supported**: raw HTML (beyond entities and `<br>`), images (no pipeline yet — would require updates to `content.config.ts` and the template), tables, footnotes.

**Before committing**: `make check` (type-checks frontmatter), `make build` (full prod build). Optional: `make dev` + Playwright MCP at `http://localhost:4321/blog/<slug>` to verify rendering.

## Playwright MCP (browser review)

Configured in `.mcp.json` via `npx @playwright/mcp@latest --browser chrome --user-data-dir .playwright-mcp/chrome-profile`. Not a project dependency — runs on demand. Persistent profile keeps external logins across restarts. Enabled by `.claude/settings.json` → `enableAllProjectMcpServers: true`. Output (logs, screenshots, profile) lives in `.playwright-mcp/` (gitignored).

Workflow: start `make dev`, then in Claude Code use `browser_navigate` → `browser_snapshot` (a11y tree, preferred for review) or `browser_take_screenshot`. Also: `browser_click`, `browser_type`, `browser_console_messages`, `browser_network_requests`. Do **not** screenshot SVGs via Playwright — it times out on `file://` SVG URLs.

## CI/CD

`.github/workflows/`:
- **`ci.yml`** — PRs to `main`: `astro check` + build validation
- **`deploy.yml`** — push to `main`: check, build, `wrangler deploy`

**Required GitHub secrets**: `CLOUDFLARE_API_TOKEN` (Edit Cloudflare Workers permission), `CLOUDFLARE_ACCOUNT_ID`.

## Gotchas

- `README.md` is a **symlink** to `CLAUDE.md`.
- **OG image**: edit `og.html`, render with `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/og.png --window-size=1200,630 og.html`.
- **LinkedIn banner**: edit `linkedin-banner.html`, render with `--screenshot=public/banner-linkedin.png --window-size=1584,396 linkedin-banner.html`.
- **Favicon regen**: `magick -background none public/favicon.svg -define icon:auto-resize=48,32,16 public/favicon.ico`.

## TODO

- [ ] Wire `demo@lab5.ca` to MailPilot agent (`~/github/mailpilot`)
- [ ] Define post-demo CTA in the auto-reply
- [ ] Configure Cloudflare redirect from `/services` → `/expertise`

## Open Questions

- **Analytics**: Cloudflare Web Analytics, Plausible, Fathom, or none?
- **Staging**: Cloudflare Workers preview deployment as staging environment?
