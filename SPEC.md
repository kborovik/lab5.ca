# SPEC — lab5.ca

Source of truth for the K. Borovik portfolio (lab5.ca). Distilled from code
2026-06-11. Six sections in canonical order; cite these sections from other
docs rather than restating them.

## §G GOAL

Lead-generation portfolio for Konstantin Borovik (Software Engineer, AI & LLM
Engineering, Toronto). Headline: "Build business processes with AI"
(sentence case per the casing invariant); supporting thesis unchanged — LLM
systems that do real work without becoming a money pit, cost per outcome traced
to the dollar. One offer: build an AI business process around the systems a
company already runs on — ERP and CRM. MailPilot is the live proof of
capability, not a product.
Primary conversion is booking a 30-minute call. Static site, owner-operated,
deploy on push; the aesthetic is framework-docs (GitHub-light), not SaaS
marketing.

## §C CONSTRAINTS

- stack: Astro 6 (static output, no SSR adapter) plus Tailwind v4 (@tailwindcss/vite) plus TypeScript 6 (astro/tsconfigs/strict).
- runtime: Node 22 or newer; package manager is pnpm@10.31.0.
- host: Cloudflare Workers via wrangler; static assets served from ./dist; observability enabled.
- domains: lab5.ca and mailpilot.ca — both are Cloudflare custom-domain routes in wrangler.jsonc.
- integrations: @astrojs/sitemap, @astrojs/rss, rehype-external-links (opens in a new tab), sharp (astro:assets), Shiki github-light highlighting.
- typeface: Space Grotesk (body, headings, nav) plus IBM Plex Mono (code, pre) via Google Fonts.
- content: blog is a local markdown collection (astro:content glob); no CMS, no database, no runtime fetch.

## §I INTERFACES

- route: `/` — landing (hero, the problem, what I do, proof, how the money stays under control, why me)
- route: `/services` — three service sections, one per offer: (1) ERP/accounting data-input automation (e.g. email invoice → AP draft), (2) CRM-system processes, (3) email reply + outreach automation (MailPilot as example); skeleton, content pending revision
- route: `/mailpilot` — MailPilot proof page (how it works, knowledge base, try these questions, under the hood); also served at mailpilot.ca
- route: `/blog` — post index, newest first by pubDate, drafts filtered out
- route: `/blog/<slug>` — post render (H1, date and tags, "all posts" back-link)
- endpoint: `/blog/<slug>.md` — raw markdown alternate (yaml frontmatter plus body)
- endpoint: `/mailpilot.md` and `/services.md` — raw markdown alternates mirroring the rendered content pages (no frontmatter), linked via rel=alternate
- endpoint: `/rss.xml` — @astrojs/rss feed
- endpoint: `/llms.txt` — terse map of pages, posts, and contact (markdown); page and post links point at the .md alternates
- endpoint: `/llms-full.txt` — full landing-copy mirror (markdown)
- endpoint: `/sitemap-index.xml` and `/sitemap-0.xml` — @astrojs/sitemap
- static: public/ holds _headers, robots.txt, favicon.svg and favicon.ico, og.png (1200x630), kb-headshot.jpg, logo-linkedin.svg and .png, banner-linkedin.png
- blog_schema: title (string), description (string), pubDate (coerced date), updatedDate (optional coerced date), draft (boolean, default false), tags (string array, default empty), in content.config.ts; the schema is strict, so an undeclared key fails astro check
- cta: book-call is calendar.app.google/BpDHFsKt2NkbSW297 (the only canonical interface; all other links are dropped from the spec)
- cmd: make targets are install, dev, build, preview, check, clean, clean-all, deploy, status, wrangler, playwright, help (makefile; build runs clean, then check, then astro build into dist/)
- asset_gen: assets-src/og.html (1200x630) and assets-src/linkedin-banner.html (1584x396) are rendered to public/*.png via headless-Chrome --screenshot

## §V INVARIANTS

V1: voice — omit aspirational verbs, persona breakouts, marketing decoration; use tech vocabulary; detail: check-extras §V1
V2: positioning — solo senior owner, end to end (back-end, infra, CI/CD, deploy, observability); wholesale not retail (no agency sales, PM, or markup tier); bus-factor rebuttal (code in the client repo, runs in the client cloud, documented in plain language); honest boundary (a full standing team is out of scope).
V3: dev-not-SRE — claims, tiles, and copy omit on-call, pager, incident-response, and SRE vocabulary; deploy and observability are in bounds.
V4: mailpilot-framing — MailPilot is proof of capability for KB's skills, not a product or SaaS, and not funnel-framed; it proves both directions of the build offer — inbound lookup-heavy reply (reads an email, searches the KB, replies with a sourced answer) and outbound CRM improvement (crafts personalized outreach-campaign messages from the same grounded sources); self-reported evidence is kept honest (one project, early numbers, checkable via open source, traced calls, and emailing the agent yourself).
V5: cost-thesis — measure cost per outcome (per email, doc, ticket) rather than token volume; cap usage; instrument every call; ground answers and decline when uncertain; scale to zero when idle. Dollar claims are labeled measured versus assumption.
V6: casing — page H1 and blog title are sentence case; the section kicker (H2) is lowercase; tile and step H3 titles are Title Case (Build Business Processes with AI, Send a Product Question).
V7: entities — static markup uses HTML entities; `{}` expressions use literal em-dash; blog markdown space-padded; detail: check-extras §V7
V8: section-kicker — `.section-kicker` DOM text is clean name (no `// ` prefix); `::before { content: '// ' }` renders marker; detail: check-extras §V8
V9: palette — only the gh-* tokens (canvas #ffffff, canvas-subtle #f6f8fa, fg #1f2328, fg-muted #424a53, fg-subtle #818b98, border #d1d9e0, green #1f883d and hover #1a7f37, blue #0969da and hover #0550ae); raised surfaces are white. Defined in @theme.
V10: typeface — `--font-mono` token is Space Grotesk (body default, Tailwind `font-mono` class); `.prose code` and `.prose pre` override to IBM Plex Mono; token name kept; rename forces class sweep
V11: base-type — html font-size is 18px; body weight is 400. Content pages (`/`, `/services`, `/mailpilot`) share one type scale: H1 `text-3xl`/`sm:text-4xl`, section kicker `text-base` uppercase, lede + section sub-head `text-lg`, body + lists `text-base leading-relaxed`; only functional micro-chrome (copy buttons, ordinal step markers) drops below `text-base`; detail: check-extras §V11
V12: motion — animate-hero (fadeUp stagger via an inline animation-delay), animate-on-scroll (IntersectionObserver adds .is-visible at threshold 0.1), and cta-pulse (pulseGlow). Under prefers-reduced-motion: reduce, opacity is forced to 1, transform/animation/transition are none, and the observer is skipped.
V13: seo-graph — JSON-LD @graph: Person + WebSite + page node (WebPage/CollectionPage/BlogPosting) + BreadcrumbList (non-root); BlogPosting carries dates, author, image; detail: check-extras §V13
V14: head-meta — canonical URL, hreflang en-ca+x-default, RSS alt, OG+Twitter summary_large_image; pages with a .md alternate (blog posts, /mailpilot, /services) add a text/markdown rel=alternate; title "<title> | Konstantin Borovik"; detail: check-extras §V14
V15: llms-endpoints — /llms.txt (terse map; page and post links target the .md alternates) and /llms-full.txt (full landing mirror) are text/markdown; llms-full body is generated from one shared landing-copy module imported by both the landing page and the endpoint — never hand-mirrored, so the rendered page and llms-full cannot drift
V16: blog-path — src/content/blog/<slug>.md flat; filename is URL slug and post id; every post pairs with linkedin/<slug>.txt (drop → delete paired txt same change); TLDR mirrors to linkedin txt lead; detail: check-extras §V16
V17: blog-render — the route owns the chrome: H1, date and tags, and the "all posts" link; the markdown body has no `# Title`, no byline, and no footer.
V18: blog-frontmatter — the schema is strict per §I.blog_schema; an undeclared key (author, image, canonical) fails astro check.
V19: prose-subset — .prose: bold, italic, code, ul/ol, blockquote, hr, links, images (public/blog/<slug>/, mandatory alt, click-to-zoom dialog), pipe tables; no raw HTML beyond `<br>`, no footnotes; detail: check-extras §V19
V20: blog-hygiene — semantic line breaks: one sentence per line, long sentences break at clause boundaries, no line over ~100 columns; UTF-8, LF line endings, no BOM; external links go through rehype-external-links with target _blank and rel noopener,noreferrer.
V21: tailwind-v4 — tokens, keyframes, and .prose live in @theme in global.css; there is no tailwind.config.js.
V22: headers — public/_headers: X-Frame-Options DENY, nosniff, strict-origin-when-cross-origin, Permissions-Policy (cam/mic/geo/payment off); cache: _astro 1y, favicon 1d, og 7d, sitemap 1h; llms*.txt text/markdown; detail: check-extras §V22
V23: dual-surface — mailpilot.ca is a Cloudflare alias for lab5.ca; both routes in wrangler.jsonc; edit affects both surfaces
V24: build-gate — before committing, run make check and make build (astro check includes blog frontmatter against the schema).
V25: nav-footer — the nav links Home (/), Services (/services), and Blog (/blog) plus a persistent Book-a-Call CTA, with the active link shown in green by path match. The footer mirrors Home, Services, Blog plus the copyright year.
V26: blog-skim — every post: ## TLDR (≤3 sentences); each H2 prose section: bold 1-sentence subtitle; TLDR + subtitles read as full argument; lists exempt; lede: one bold thesis; bold reserved for skim-spine; term/number/entity emphasis = italic; detail: check-extras §V26
V27: section-subhead — each landing kicker section (the problem, what I do, proof, how the money stays under control, why me) opens with a one-line H3 sub-header stating its main idea, above the detail body and held in the shared landing-copy module (page + llms-full both render it); casing per-section natural — Title Case for offer/title names (Build an AI Process Around Your ERP and CRM), sentence case for thesis lines (Every business runs on a layer of repetitive, lookup-heavy work that quietly consumes skilled time).

## §T TASKS

id|status|task|cites
T1|x|re-wrap src/content/blog/*.md to semantic line breaks|V20
T2|x|drop blog post: measuring-glyph-compression.md|V16,V24
T3|x|publish blog post: buy-90-build-10.md|V16,V18,V20,V24
T4|x|drop blog post: spec-driven-development.md + paired linkedin txt|V16,V24
T5|x|sweep blog↔linkedin pairing: author unpaired txt, delete orphan txt|V16,V24
T6|x|publish blog post: code-consistency-and-agent-velocity.md|V16,V18,V20,V24
T7|x|prototype blog skim-spine on buy-90-build-10.md|V1,V19,V20,V24
T8|x|conform blog posts to blog-skim invariant|V16,V19,V20,V24,V26
T9|x|redesign home hero + what-i-do for build/optimize campaign|V1,V6,V15,V24
T10|x|extract shared landing-copy module; generate llms-full.txt from it + re-sync the current drift; point llms.txt links at the .md alternates|V15,V24
T11|x|add /mailpilot.md + /projects.md markdown-alternate endpoints + rel=alternate head links|V14,V24
T12|x|rework home what-i-do to a single build offer framed on ERP + CRM, drop the optimize tile + set hero h1 to "Build business processes with AI"; reposition MailPilot proof as inbound reply + outbound CRM outreach; re-sync landing-copy module + llms-full + llms.txt|V1,V4,V6,V15,V24
T13|x|add a one-line sub-header to each landing kicker section: new field per section in the landing-copy module, render as H3 in index.astro + mirror in llms-full, rewrite each section to lead with the sub-header|V1,V6,V15,V24,V27
T14|x|replace /projects with /services: rename projects.astro→services.astro + projects.md.ts→services.md.ts, build 3 skeleton service sections (ERP/accounting data-input e.g. email-invoice→AP draft; CRM-system processes; email reply+outreach automation w/ MailPilot as example), update Nav+Footer+llms.txt links|V1,V4,V6,V14,V15,V24,V25
T15|x|normalize /mailpilot to the V11 content type scale — sub-base content text (intro, step + layer titles + bodies, KB + under-hood paragraphs, question lists) text-sm→text-base, lede/sub-heads →text-lg, hints/captions text-xs→text-sm; H1 + kicker unchanged; copy-button + ordinal-marker micro-labels stay small; scope: text-sm / text-xs / text-[10px] classes in src/pages/mailpilot.astro|V11,V23,V24
T16|x|sweep /services + / to the V11 content type scale — services body/list/action-link + Examples label text-sm→text-base (drop sm: downscale), index proof table text-sm→text-base; H1 + kicker + ordinal-marker micro-chrome unchanged; scope: text-sm / text-xs / text-[10px] classes in src/pages/services.astro + src/pages/index.astro|V11,V24
T17|x|set --color-gh-canvas #fafbfc→#ffffff in global.css @theme (page background to standard white per V9)|V9,V21,V24

## §B BUGS

id|date|cause|fix
B1|2026-07-01|T15 type-scale sweep scoped to mailpilot only; services.astro + index.astro left on pre-V11 text-sm sm:text-base downscale (mobile renders content below text-base) though V11's shared scale covers all three content pages|V11
