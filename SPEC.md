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
- route: `/proof` → MailPilot evidence (code-chip CTA, how-it-works, sample Q's, architecture); `/demo` ≡ legacy → CF redirect → `/proof`
- route: `/about` → bio + headshot
- route: `/blog` → post list (sort pubDate desc)
- route: `/blog/<slug>` → post detail
- domain: `lab5.ca` ≡ primary; `mailpilot.ca` ≡ alias → serves same site (`wrangler.jsonc` routes)
- analytics: Cloudflare Web Analytics — server-side, automatic via CF dashboard; ⊥ in-repo script tag, ⊥ cookies
- cta: book-call `https://calendar.app.google/cYM3H3TsHsequR587`
- cta: linkedin `https://www.linkedin.com/in/kborovik`
- cta: mailpilot-source `https://github.com/kborovik/mailpilot` — link to MailPilot source; surfaced ∈ `/proof` (under-the-hood) ∧ home (proof-of-capability)
- cta: demo-email ≡ code-chip clipboard-copy widget @ `/proof` — copies `demo@lab5.ca`; ⊥ `<a href="mailto:...">`
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
V12: palette ≡ GH Primer Light `gh-*` tokens only (per §I); ∀ `--color-gh-*` decl ∈ `src/styles/global.css` @theme ≡ §I palette set ∧ ! ≥ 1 ref ∈ `src/`
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
V30: pre-commit (local discipline) ! `make check` ∧ `make build` pass; enforcement ∈ V31
V31: CI on PR → `main` ≡ `astro check` + `astro build`
V32: deploy on push → `main` ≡ check + build + `wrangler deploy`
V33: `.github/workflows/deploy.yml` ! reference `${{ secrets.CLOUDFLARE_API_TOKEN }}` ∧ `${{ secrets.CLOUDFLARE_ACCOUNT_ID }}` ∀ wrangler step; actual secret population ∈ GH repo settings ≡ out-of-scope ∀ static audit (deploy-fail-on-missing ≡ natural backstop)
V34: Playwright screenshot ⊥ SVG @ `file://` URL (timeout) — LATENT pre-trigger (`playwright.config.*` ∨ `*.spec.ts` ⊥ ∈ repo; Playwright ⊥ project dep, on-demand via MCP only); discipline-only rule ∈ CLAUDE.md
V35: link href ≡ — internal: absolute path `/...`, ⊥ trailing `/`, ⊥ relative; cross-page anchor: `/path#frag`; intra-page anchor: `#frag`; external: full `https://...`; mailto: `mailto:<addr>`. ∈ `.astro`: external `<a>` ! `target="_blank"` ∧ `rel="noopener noreferrer"`; mailto ⊥ `target="_blank"`. ∈ blog `.md`: plain markdown `[text](url)` only — `rehype-external-links` (`astro.config.mjs`) auto-inserts attrs @ build ∴ ⊥ author raw `<a>`; external link anchor text ≡ plain inline prose, ⊥ `**bold**` wrap ∨ `` `code` `` wrap ∈ `[...]`.
V36: LinkedIn feed post ≡ `linkedin/<slug>.txt` ∀ matching `src/content/blog/<slug>.md`; purpose ≡ promotional surface ∀ canonical blog write-up @ `lab5.ca/blog/<slug>/` — post ⊥ standalone substitute, ⊥ replace blog body, ⊥ self-contained read ∴ earns reader → write-up; format ≡ plain text + line breaks (`\n` → `<br>`, `\n\n` → paragraph; LinkedIn ⊥ render markdown); body ⊥ `word.tld` pattern — LinkedIn auto-linkifies (`SPEC.md` → `<a href="http://SPEC.md">` broken-scheme; `lab5.ca`, `github.com` → `lnkd.in/<hash>`), quotes/backticks ⊥ escape; rephrase ∨ drop TLD; body ⊥ markdown syntax (`**bold**`, `` `code` ``, `[text](url)`, `# heading`) → LinkedIn renders literal ∨ strips; dash-prefix bullets `- ` ≡ permitted per §V.16 (LinkedIn renders literal ≡ benign); em-dash ≡ real `—` (U+2014), ⊥ `--` literal (LinkedIn ⊥ auto-convert); headline ≡ first 2-3 lines above `…more` fold (LinkedIn preview ≡ ~3 lines pre-expand); sentence 1 ≡ 1 catchy ∨ controversial short sentence (standalone hook, target ≤ ~80 chars ∴ fits 1 visible line ∀ viewport ∴ earn-the-click-to-expand) ∋ bold/specific claim ∨ stance ∨ provocation — make reader want sentence 2; ⊥ flat setup (anti-ex: "I claimed X", "Across N rows, two numbers came out"); ex: "Math-glyph notation cut my SPEC by 89%. Here's the receipt." ≡ specific bold claim + receipt promise; sentences 2-3 deliver claim ∧ reason to follow `Write-up:` link ∴ reader who ⊥ expand ! still grasp claim; voice ≡ §V.3; structure ≡ headline → body → trailing link block w/ `Write-up: https://lab5.ca/blog/<slug>/` (authored canonical; LinkedIn rewrites displayed URL → `lnkd.in/<hash>` post-publish ≡ expected, ⊥ authoring concern) ∧ optional additional `<Label>: <url>` rows (e.g. `Benchmark:`, `Plugin:`); `#hashtag` ∧ `@mention` ≡ LinkedIn syntax (sparingly). `linkedin/resume.txt` ≡ profile content, ⊥ scope.
V37: `.claude/check-extras.md` ! ∋ `§-cite drift recipe extension` section excluding `src/content/blog/**/*.md` from §-cite drift recipe scope — blog body ≡ documentary prose discussing external SPECs (pilot-skills SPEC.md, MailPilot, etc.) ∴ cites ∈ blog content ≡ cross-repo references, ⊥ live cites into lab5.ca SPEC.md; extension recipe loads via path probe per sdd:check skill body (REPO-LOCAL extension recipes).

## §T — tasks

id|status|task|cites
T2|x|? define post-proof auto-reply CTA → resolved ⊥ — auto-reply ≡ AI answer only; ⊥ funnel back to /proof (MailPilot ≡ evidence, ⊥ product pitch ∴ ⊥ self-promo ∈ agent reply)|
T3|x|set CF redirect `/services` → `/expertise`|I.routes
T4|x|? decide analytics → resolved CF Web Analytics (server-side, automatic ∈ CF dashboard, ⊥ in-repo script)|I.analytics
T5|x|? decide staging → resolved ⊥ — local dev only (`make dev`); push → main ≡ prod per V22 ∧ V32, ⊥ preview/staging layer|V22,V32
T6|x|prune palette token drift — scope: `{gh-green-muted, gh-blue-muted, gh-red, gh-red-hover, gh-yellow}` decl ∈ `src/styles/global.css` + `src/components/Logo.astro`; remediation ≡ drop unused tokens + Logo.astro ∨ amend §I to admit|V12,B1
T7|x|sweep blog external-link anchor wraps — scope: `\[\*\*[^]]+\*\*\]\(` ∨ `` \[`[^`]+`\]\( `` ∈ `src/content/blog/**/*.md`; remediation ≡ unwrap anchor text → plain prose|V35,B2
T8|x|rename /demo route → /proof: rename `src/pages/demo.astro` → `src/pages/proof.astro`, update internal link refs ∈ `Nav.astro` + home tile + any anchors; reframe page H1 + copy — product ≡ KB skills, MailPilot ≡ evidence (⊥ "try the demo" SaaS framing)|I.routes,V3
T9|x|set CF redirect `/demo` → `/proof` (301) ∈ `public/_redirects`|I.routes
T10|x|add MailPilot source-code link button ∈ `/proof` "under the hood" section — mirror home-page proof-of-capability pattern (bordered button, not pulse); href ≡ §I.cta.mailpilot-source|I.cta.mailpilot-source
T11|x|create `.claude/check-extras.md` w/ `§-cite drift recipe extension` section excluding `src/content/blog/**/*.md` from §-cite drift scope per V37; verify post-create `/sdd:check` ⊥ flag blog cross-repo cites|V37,B5
T12|x|sweep linkedin headline anti-example class — scope: line 1 grep `^(I |Across [0-9])` ∈ `linkedin/*.txt − linkedin/resume.txt`; remediation ≡ rewrite sentence 1 per V36 (≤ ~80 chars, ∋ bold/specific claim ∨ stance ∨ provocation)|V36,B6
T13|.|fix V35 link-form @ src/content/blog/where-pytest-stops-and-claude-code-starts.md:149 — replace `[lab5.ca/demo](https://lab5.ca/proof/)` w/ absolute-path form `[/proof](/proof)`|V35,B7
T14|.|author linkedin/where-pytest-stops-and-claude-code-starts.txt per V36 — headline ≤ ~80 chars (bold/specific claim ∨ stance ∨ provocation), body, trailing `Write-up: https://lab5.ca/blog/where-pytest-stops-and-claude-code-starts/` block; ⊥ markdown syntax, ⊥ `word.tld` pattern, ⊥ `--` literal (em-dash → `—`)|V36,B7

## §B — bugs

id|date|cause|fix
B1|2026-05-18|`global.css` decl 5 `--color-gh-*` tokens (`gh-green-muted`, `gh-blue-muted`, `gh-red`, `gh-red-hover`, `gh-yellow`) ⊥ ∈ §I palette list; `gh-red*`/`gh-yellow` ref only ∈ unused `Logo.astro` (CLAUDE.md notes `Logo ⊥ used`); `*-muted` pair zero refs; V17 pinwheel uses raw hex ∈ `Nav.astro:17–20` + `favicon.svg`, ⊥ tokens; surfaced by `/sdd:check` set-diff|V12
B2|2026-05-18|blog `.md` external-link anchor text wraps `**bold**` ∈ `spec-driven-development.md:18` ∧ `` `code` `` ∈ `measuring-glyph-compression.md:214` — no rule pre-amend, surfaced by `/sdd:check §V` post V35 anchor-text clause|V35
B3|2026-05-19|linkedin post body referenced `SPEC.md` ∈ `linkedin/{measuring-glyph-compression,spec-driven-development}.txt`; LinkedIn auto-linkified `SPEC.md` → `<a href="http://SPEC.md">` broken-scheme link (Playwright DOM dump @ `/in/kborovik/recent-activity/all/`); single-quote `'SPEC.md'` ⊥ defeat matcher (re-linkified on edit); backtick `` `SPEC.md` `` ⊥ defeat either; resolved by drop `.md` → `SPEC` ∈ source; 2 older live posts (pre-fix) retain broken `http://SPEC.md` ∈ LinkedIn DOM — out-of-repo remediation only (manual edit ∈ LinkedIn UI)|V36
B4|2026-05-19|V36 markdown-syntax prohibition list ∋ `- bullet` but §V.16 establishes dash-prefix ≡ canonical site bullet ∧ Playwright DOM dump shows LinkedIn renders `- ` literal (benign); rule-as-written ≠ rule-as-intended (V36 over-reach), surfaced by /sdd:check post-V36-amend audit; resolved by narrow V36 list ∧ admit dash-prefix per §V.16|V36
B5|2026-05-19|`/sdd:check --incremental --all` post-V36-amend flagged §T.37 (line 99), §B.6/§B.7/§B.8 (lines 140,142,165,167) ∈ `src/content/blog/measuring-glyph-compression.md` as UNRESOLVED — target rows absent ∈ lab5.ca SPEC.md (§T max ≡ T10, §B max ≡ B4); surrounding prose explicitly qualifies cites as cross-repo into pilot-skills SPEC.md (line 85: ``Take `§V.6` from the pilot-skills `SPEC.md`:``); mechanical grep ⊥ distinguish documentary cross-repo cite from live cite ∴ false-positive recurrence class — any blog post discussing external SPEC re-triggers; resolved by exclude `src/content/blog/**/*.md` from §-cite drift recipe scope per V37|V37
B6|2026-05-19|V36 amend eb4343f (2026-05-19) added "catchy ∨ controversial" + "∋ bold/specific claim ∨ stance ∨ provocation" to headline rule; companion sweep through `linkedin/*.txt` ⊥ run post-amend ∴ `linkedin/spec-driven-development.txt:1` "I kept losing track of what Claude was doing." remains autobiographical setup matching V36 anti-example class ("I claimed X"); prior amend 79e8e63 (length-only rule) ∧ companion fix c8212e1 swept both files, but eb4343f (catchy/controversial dimension) ⊥ paired w/ re-sweep; /sdd:check surfaced 2026-05-19|V36
B7|2026-05-19|where-pytest-stops-and-claude-code-starts.md drafted (untracked) ∋ 2 latent violations of existing rules surfaced by `/sdd:check` 2026-05-19: (1) V35 — line 149 `[lab5.ca/demo](https://lab5.ca/proof/)` writes internal lab5.ca link as full `https://` URL + trailing `/`, ⊥ absolute path `/proof` per V35 internal-link clause; (2) V36 — companion `linkedin/where-pytest-stops-and-claude-code-starts.txt` absent ∴ pair-rule unmet. root cause ≡ author discipline gap — blog .md drafted w/o running `/sdd:check` pre-publish ∴ V35/V36 audits skipped; both rules pre-exist ∴ ⊥ rule-gap, ⊥ new invariant. remediation: fix line 149 → `/proof` absolute path + author linkedin/<slug>.txt per V36 headline+structure rules|V35,V36
