# lab5.ca

Operational guide for the K. Borovik portfolio (AI Automation Engineer). `SPEC.md` is the source of truth; cite §G/§C/§I/§V/§T rather than restating them.

## cmd (§I cmd surface)

| target | effect |
|---|---|
| `make install` | install pnpm via Homebrew if missing, then `pnpm install` |
| `make dev` | astro dev at `http://localhost:4321` |
| `make build` | production build into `dist/` |
| `make preview` | serve the production build |
| `make check` | astro check (including blog frontmatter against the schema) |
| `make clean`, `clean-all` | remove `dist/` and `.astro/` (plus `node_modules/`) |
| `make deploy` | build, then `wrangler deploy` |
| `make status` | Cloudflare Workers status |
| `make wrangler`, `playwright` | install wrangler globally / the Playwright Chrome binary |

Before committing, run `make check` and `make build` (§V.24). Stack, host, package manager, and Node version are in §C.

## repo map

```
src/
├── layouts/Layout.astro            # SEO props, JSON-LD @graph, scroll-reveal IO
├── components/{Nav,Footer}.astro
├── content.config.ts               # blog collection: src/content/blog/**/*.md
├── content/blog/<slug>.md          # flat; filename is the URL slug (§V.16)
├── pages/{index,projects,mailpilot}.astro
├── pages/blog/{index.astro,[...slug].astro,[...slug].md.ts}
├── pages/{llms.txt.ts,llms-full.txt.ts,rss.xml.ts}   # markdown + RSS endpoints (§I)
├── assets/konstantin-borovik-headshot.jpg   # astro:assets on /
└── styles/global.css               # Tailwind v4 @theme (§V.21): tokens, keyframes, .prose
public/{_headers,og.png,banner-linkedin.png,favicon.{ico,svg},logo-linkedin.{svg,png},kb-headshot.jpg,robots.txt}
makefile, wrangler.jsonc, astro.config.mjs; assets-src/{og.html,linkedin-banner.html}
```

Routes, domains, palette, typeface, asset list, blog schema, and the booking CTA are in §I. Tailwind v4 lives in `@theme` in `global.css` (§V.21); there is no `tailwind.config.js`.

Typeface (§C): Space Grotesk for body, headings, and nav; IBM Plex Mono for code and pre across the site and social assets.

## voice (§V.1 anti-examples)

- no aspirational verbs: "move faster", "transform", "unlock", "empower"
- no business-benefit framing: "ship more with same headcount"
- no persona breakouts: Owner / CTO / COO
- no marketing decoration: pill badges, stacked hero CTAs, colored icon boxes, "Learn more"
- use tech vocabulary: LLM, retrieval, structured extraction, system of record, idempotent state machine
- reference aesthetic: openspec.dev, Stripe docs (framework-docs, not SaaS marketing)

## casing (§V.6 examples)

- page H1 and blog title are sentence case: `LLM systems that do real work…`
- section kicker (H2) is lowercase: `what I do`
- tile and step H3 titles are Title Case: `Build Business Processes with AI`
- entities (§V.7) are `&mdash;` / `&middot;` / `&minus;` in `.astro`; blog `.md` em-dashes are space-padded

## blog (rules §V.16–20; schema §I)

Path is `src/content/blog/<slug>.md`; the filename is the URL slug.

- `[...slug].astro` renders the H1, date and tags, and the `← all posts` link; the markdown has no `# Title`, no byline, no footer
- hard-wrap around 78 columns; UTF-8, LF, no BOM
- no non-post `.md` in the blog dir, or the glob fails the build (§V.16)
- undeclared frontmatter (`author`, `image`, `canonical`) fails `astro check` (§V.18)
- `.prose` supports bold, italic, inline and fenced code, ul/ol, blockquote, `---`, inline links, images (`![alt](src)` form, src in `public/blog/<slug>/`, alt mandatory), and tables (pipe syntax); it does not support raw HTML beyond `<br>` and entities, or footnotes (§V.19)

Verify with `make check`, then `make build`; optionally Playwright at `localhost:4321/blog/<slug>`.

## Playwright MCP

`.mcp.json` runs `npx @playwright/mcp@latest --browser chrome --user-data-dir .playwright-mcp/chrome-profile`. Not a project dependency; on-demand. The profile persists logins. Enabled via `.claude/settings.json` `enableAllProjectMcpServers: true`. Output goes to `.playwright-mcp/` (gitignored).

Flow: `make dev`, then `browser_navigate`, then `browser_snapshot` (a11y, preferred) or `browser_take_screenshot`; also `browser_{click,type,console_messages,network_requests}`. Do not screenshot an SVG at `file://` — it times out.

## gotchas

- `mailpilot.ca` is a Cloudflare custom-domain alias for `lab5.ca` (§I); both are in `wrangler.jsonc`, so edits affect both surfaces
- OG (1200x630): edit `assets-src/og.html`; `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/og.png --window-size=1200,630 assets-src/og.html`
- LinkedIn banner (1584x396): edit `assets-src/linkedin-banner.html`; `--screenshot=public/banner-linkedin.png --window-size=1584,396 assets-src/linkedin-banner.html`
- favicon regen: `magick -background none public/favicon.svg -define icon:auto-resize=48,32,16 public/favicon.ico`

## paths

- spec: `SPEC.md` (sole mutator: `/sdd:spec`)
- design drafts: `designs/<slug>.md` (folded in via `/sdd:spec`)
- proof-of-capability demo (MailPilot): `~/github/mailpilot`
