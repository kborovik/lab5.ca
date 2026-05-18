# SPEC.md — lab5.ca

## §G — goal

personal portfolio + career site @ `lab5.ca` ∀ Konstantin Borovik (AI Automation Engineer). pitch ≡ AI-powered automation ∀ business ops — ERP, doc workflow, email, reporting. proof-of-capability ≡ MailPilot demo.

## §C — constraints

- stack: Astro 6 static (⊥ SSR adapter), Tailwind v4 via `@theme`, TS 6, pnpm 10, Node ≥22.
- host: Cloudflare Workers static assets; deploy via GH Actions on push → `main`; domain via CF DNS + auto SSL.
- typeface: IBM Plex Mono only across site + social assets.

## §I — interfaces

- route: `/` → home (hero, 01-04 capabilities, 05-08 why-hire-me, proof-of-capability)
- route: `/expertise` → 01-04 deep-dive
- route: `/demo` → MailPilot (code-chip CTA, how-it-works, sample Q's, architecture)
- route: `/about` → bio + headshot
- route: `/blog` → post list (sort pubDate desc)
- route: `/blog/<slug>` → post detail
- domain: `lab5.ca` ≡ primary; `mailpilot.ca` ≡ alias → serves same site (`wrangler.jsonc` routes)
- cta: book-call `https://calendar.app.google/cYM3H3TsHsequR587`
- cta: linkedin `https://www.linkedin.com/in/kborovik`
- cta: demo-email `mailto:demo@lab5.ca`
- schema: blog frontmatter ≡ {title:str, description:str, pubDate:date, updatedDate?:date, draft?:bool=false, tags?:str[]=[]} per `src/content.config.ts`
- cmd: `make {help,install,dev,preview,build,check,clean,clean-all,deploy,status,wrangler,playwright}`
- env: GH Actions ! set `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- asset: `public/{og.png,banner-linkedin.png,favicon.{ico,svg},_headers,robots.txt,logo-linkedin.{svg,png}}`
- token: palette ≡ GH Primer Light — `gh-canvas`, `gh-canvas-subtle`, `gh-border`, `gh-fg`, `gh-fg-muted`, `gh-fg-subtle`, `gh-green`, `gh-green-hover`, `gh-blue`, `gh-blue-hover`
- token: typeface ≡ IBM Plex Mono (400/500/600/700) via Google Fonts `display=swap`

## §V — invariants

V1: pitch ≡ AI automation ∀ business ops; cloud platforms ≡ impl detail, ⊥ pitch
V2: capability order ≡ 01 ERP Integration → 02 Document Workflow → 03 AI Email & Communication → 04 Data & Reporting ∀ surface
V3: voice ≡ factual + tech vocab; ⊥ aspirational verbs, ⊥ persona breakouts, ⊥ marketing flourish
V4: ≤ 1 prominent CTA per page; Book-a-Call ∈ nav only (`cta-pulse`), ⊥ page-footer repeat
V5: heading ⊥ trailing `.`
V6: page H1 ∧ blog title casing ≡ sentence case
V7: tile title ∧ step title casing ≡ lowercase
V8: `/expertise` H2 capability name casing ≡ Title Case
V9: typeface ≡ IBM Plex Mono only; `@theme` declares `--font-mono` only, ⊥ `font-sans`, ⊥ `font-serif`
V10: hierarchy ∈ {weight, size, color}; ⊥ family swap
V11: html base size ≡ 18px; body weight ≡ 500
V12: palette ≡ GH Primer Light `gh-*` tokens only (per §I)
V13: ⊥ alternating section bg; `bg-gh-canvas-subtle` ≡ contained surfaces only (cards, footer, code chips)
V14: section kicker ≡ `// section name`; class ≡ `text-sm font-bold uppercase tracking-[0.2em] text-gh-blue`
V15: numbered hairline ≡ `<NN> ─────` above tiles, mono `text-xs text-gh-fg-subtle`; numbering continues across grids when narrative ≡ one
V16: bullet list ≡ dash-prefix; ⊥ check/x SVG icons
V17: logo ≡ 4-color pinwheel — `#0969da` ∧ `#1f883d` ∧ `#f9c513` ∧ `#cf222e`
V18: build ≡ static output; ⊥ SSR adapter, ⊥ API routes
V19: Tailwind v4 config ≡ `@theme` ∈ `src/styles/global.css`; ⊥ `tailwind.config.js`
V20: Node version `>=22` per `package.json` engines ∧ `.nvmrc`
V21: package manager ≡ pnpm
V22: host ≡ Cloudflare Workers; push → `main` ⇒ GH Actions deploy
V23: blog post path ≡ `src/content/blog/<slug>.md` flat; filename ⊥ `.md` ≡ URL slug → rename ≡ URL break
V24: blog frontmatter ! match `src/content.config.ts` schema; undeclared fields (`author`, `image`, `canonical`) → `astro check` fails
V25: `src/content/blog/` ⊥ non-post `.md`; glob `**/*.md` loads ∀ → schema-fail breaks build
V26: blog body ⊥ `# Title`, ⊥ byline, ⊥ footer, ⊥ back-link → `[...slug].astro` renders these
V27: blog headings ≡ `##`/`###` sentence case, ⊥ trailing `.`
V28: blog voice ≡ first-person singular, factual + descriptive
V29: blog markdown ⊥ raw HTML (beyond entities ∧ `<br>`), ⊥ images, ⊥ tables, ⊥ footnotes — `.prose` ⊥ support
V30: pre-commit ! `make check` ∧ `make build` pass
V31: CI on PR → `main` ≡ `astro check` + `astro build`
V32: deploy on push → `main` ≡ check + build + `wrangler deploy`
V33: GH secrets ! set: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
V34: Playwright ⊥ screenshot SVG @ `file://` URL → timeout

## §T — tasks

id|status|task|cites
T2|.|define post-demo CTA ∈ auto-reply|
T3|.|set CF redirect `/services` → `/expertise`|I.routes
T4|.|? decide analytics: CF Web Analytics ∨ Plausible ∨ Fathom ∨ ⊥|
T5|.|? decide staging: CF Workers preview deployment ∨ ⊥|

## §B — bugs

id|date|cause|fix
