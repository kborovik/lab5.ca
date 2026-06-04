# lab5.ca

Operational guide ∀ K. Borovik portfolio (AI Automation Engineer). `SPEC.md` ≡ source-of-truth; ⊥ restate §G/§C/§I/§V/§T — cite.

## cmd (§I cmd surface)

| target | effect |
|---|---|
| `make install` | brew → pnpm if ⊥; `pnpm install` |
| `make dev` | astro dev @ `http://localhost:4321` |
| `make build` | prod → `dist/` |
| `make preview` | serve prod build |
| `make check` | astro check (incl. blog frontmatter vs schema) |
| `make clean` \| `clean-all` | rm `dist/` + `.astro/` (+ `node_modules/`) |
| `make deploy` | build + `wrangler deploy` |
| `make status` | CF Workers status |
| `make wrangler` \| `playwright` | install wrangler global \| Playwright Chrome bin |

Pre-commit ! `make check` ∧ `make build` (§V.45). Stack/host/PM/Node → §C.

## repo map

```
src/
├── layouts/Layout.astro            # SEO props, scroll-reveal IO
├── components/{Nav,Footer}.astro
├── content.config.ts               # blog collection: src/content/blog/**/*.md
├── content/blog/<slug>.md          # flat; filename ≡ URL slug (§V.51,53)
├── pages/{index,expertise,proof,about}.astro
├── pages/blog/{index,[...slug]}.astro
├── assets/konstantin-borovik-headshot.jpg   # astro:assets on /about
└── styles/global.css               # Tailwind v4 @theme (§V.37): tokens, keyframes, .prose
public/{_headers,og.png,banner-linkedin.png,favicon.{ico,svg},logo-linkedin.{svg,png},robots.txt}
makefile, og.html, linkedin-banner.html, wrangler.jsonc
```

Routes/domains/palette/typeface/asset list/blog schema/CTA URLs → §I. Tailwind v4 ∈ `@theme` ∈ `global.css` (§V.37); ⊥ `tailwind.config.js`.

## voice (§V.11 anti-examples)

- ⊥ aspirational verbs: "move faster", "transform", "unlock", "empower"
- ⊥ biz-benefit framing: "ship more w/ same headcount"
- ⊥ persona breakouts: Owner / CTO / COO
- ⊥ marketing decoration: pill badges, stacked hero CTAs, colored icon boxes, "Learn more →"
- ∋ tech vocab: LLM, retrieval, structured extraction, system of record, idempotent state machine
- ref aesthetic: openspec.dev, Stripe docs (framework-docs / terminal, ⊥ SaaS marketing)

## casing (§V.12–14 examples)

- page H1 ∧ blog title ≡ sentence → `What I build`
- tile ∧ step title ≡ lowercase → `email & communication`
- `/expertise` H2 ≡ Title Case → `ERP Integration`
- entity ≡ `&mdash;` / `&middot;`; literal `—` ! space-padded

## blog (rules §V.54–57; schema §I)

Path ≡ `src/content/blog/<slug>.md`; filename ≡ URL slug.

- `[...slug].astro` renders H1 + date/tags + `← all posts` → ⊥ `# Title`, ⊥ byline, ⊥ footer
- hard-wrap ~78 col; UTF-8, LF, ⊥ BOM
- ⊥ non-post `.md` ∈ blog dir → glob fails build (§V.53)
- undeclared frontmatter (`author`, `image`, `canonical`) → `astro check` ✗ (§V.52)
- `.prose` ∋ {bold, italic, inline+fenced code, ul/ol, blockquote, `---`, inline link, image (`![alt](src)` form, src ∈ `public/blog/<slug>/`, alt mandatory), table (pipe-syntax)}; ⊥ {raw HTML beyond `<br>`+entities, footnote} (§V.57)

Verify: `make check` → `make build`; optional Playwright @ `localhost:4321/blog/<slug>`.

## Playwright MCP

`.mcp.json` → `npx @playwright/mcp@latest --browser chrome --user-data-dir .playwright-mcp/chrome-profile`. ⊥ project dep; on-demand. Profile persists logins. Enabled via `.claude/settings.json` → `enableAllProjectMcpServers: true`. Out ∈ `.playwright-mcp/` (gitignored).

Flow: `make dev` → `browser_navigate` → `browser_snapshot` (a11y, preferred) ∨ `browser_take_screenshot`; also `browser_{click,type,console_messages,network_requests}`. ⊥ screenshot SVG @ `file://` → timeout (§V.49).

## gotchas

- `mailpilot.ca` ≡ CF custom-domain alias ∀ `lab5.ca` (§I); both ∈ `wrangler.jsonc` — edits affect both surfaces
- OG (1200×630): edit `assets-src/og.html`; `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/og.png --window-size=1200,630 assets-src/og.html`
- LinkedIn banner (1584×396): edit `assets-src/linkedin-banner.html`; `--screenshot=public/banner-linkedin.png --window-size=1584,396 assets-src/linkedin-banner.html`
- favicon regen: `magick -background none public/favicon.svg -define icon:auto-resize=48,32,16 public/favicon.ico`

## paths

- spec → `SPEC.md` (sole mutator: `/sdd:spec`)
- design drafts → `designs/<slug>.md` (fold-in via `/sdd:spec`)
- proof-of-capability demo (MailPilot) → `~/github/mailpilot`
