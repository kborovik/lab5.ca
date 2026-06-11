# SPEC — lab5.ca

Source of truth for the K. Borovik portfolio (lab5.ca). Distilled from code
2026-06-11. Six sections in canonical order; cite these sections from other
docs rather than restating them.

## §G GOAL

Lead-generation portfolio for Konstantin Borovik (Software Engineer, AI & LLM
Engineering, Toronto). Thesis: "LLM systems that do real work — without becoming
a money pit" — build or rescue AI business processes, with cost per outcome
traced to the dollar. MailPilot is the live proof of capability, not a product.
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

- route: `/` — landing (hero, the problem, what I do, proof, how the money stays under control, why me, closing)
- route: `/projects` — skill-to-GitHub-repo card grid (mailpilot, gcp-devops, spec-driven-dev, lab5.ca)
- route: `/mailpilot` — MailPilot proof page (how it works, knowledge base, try these questions, under the hood); also served at mailpilot.ca
- route: `/blog` — post index, newest first by pubDate, drafts filtered out
- route: `/blog/<slug>` — post render (H1, date and tags, "all posts" back-link)
- endpoint: `/blog/<slug>.md` — raw markdown alternate (yaml frontmatter plus body)
- endpoint: `/rss.xml` — @astrojs/rss feed
- endpoint: `/llms.txt` — terse map of pages, posts, and contact (markdown)
- endpoint: `/llms-full.txt` — full landing-copy mirror (markdown)
- endpoint: `/sitemap-index.xml` and `/sitemap-0.xml` — @astrojs/sitemap
- static: public/ holds _headers, robots.txt, favicon.svg and favicon.ico, og.png (1200x630), kb-headshot.jpg, logo-linkedin.svg and .png, banner-linkedin.png
- blog_schema: title (string), description (string), pubDate (coerced date), updatedDate (optional coerced date), draft (boolean, default false), tags (string array, default empty), in content.config.ts; the schema is strict, so an undeclared key fails astro check
- cta: book-call is calendar.app.google/cYM3H3TsHsequR587 (the only canonical interface; all other links are dropped from the spec)
- cmd: make targets are install, dev, build, preview, check, clean, clean-all, deploy, status, wrangler, playwright (makefile; build runs clean, then check, then astro build into dist/)
- asset_gen: assets-src/og.html (1200x630) and assets-src/linkedin-banner.html (1584x396) are rendered to public/*.png via headless-Chrome --screenshot

## §V INVARIANTS

V1: voice — no aspirational verbs (move faster, transform, unlock, empower), no business-benefit framing, no persona breakouts (Owner / CTO / COO), no marketing decoration (pill badges, stacked hero CTAs, colored icon boxes, "Learn more"); do use tech vocabulary (LLM, retrieval, RAG, structured extraction, grounding, traced). Reference aesthetic is openspec.dev and Stripe docs.
V2: positioning — solo senior owner, end to end (back-end, infra, CI/CD, deploy, observability); wholesale not retail (no agency sales, PM, or markup tier); bus-factor rebuttal (code in the client repo, runs in the client cloud, documented in plain language); honest boundary (a full standing team is out of scope).
V3: dev-not-SRE — claims, tiles, and copy omit on-call, pager, incident-response, and SRE vocabulary; deploy and observability are in bounds.
V4: mailpilot-framing — MailPilot is proof of capability for KB's skills, not a product or SaaS, and not funnel-framed; self-reported evidence is kept honest (one project, early numbers, checkable via open source, traced calls, and emailing the agent yourself).
V5: cost-thesis — measure cost per outcome (per email, doc, ticket) rather than token volume; cap usage; instrument every call; ground answers and decline when uncertain; scale to zero when idle. Dollar claims are labeled measured versus assumption.
V6: casing — page H1 and blog title are sentence case; the section kicker (H2) is lowercase; tile and step H3 titles are Title Case (Build Business Processes with AI, Send a Product Question).
V7: entities — static .astro markup and static HTML attributes use HTML entities (&mdash;, &middot;, &minus;, &rarr;, &larr;, &rsquo;, &times;) and carry no literal em-dash; values emitted through `{}` interpolation — data-array fields (e.g. `{p.context}`, `{item.body}`) and prop strings the component re-emits via `{}` (e.g. `description`, `title`) — require a literal — because Astro HTML-escapes `&` in expression output (`&mdash;` double-escapes to `&amp;mdash;`); blog markdown em-dashes are space-padded, and both literal "—" and &mdash; are in use.
V8: section-kicker — the `.section-kicker` DOM text is the clean section name with no literal "// " prefix; the `::before { content: '// ' }` rule renders the visual marker, so a parser sees a clean heading while a reader sees "// what I do". The MailPilot literal "// knowledge base" and "// try these questions" are plain markup, not kickers.
V9: palette — only the gh-* tokens (canvas #fafbfc, canvas-subtle #f6f8fa, fg #1f2328, fg-muted #424a53, fg-subtle #818b98, border #d1d9e0, green #1f883d and hover #1a7f37, blue #0969da and hover #0550ae); raised surfaces are white. Defined in @theme.
V10: typeface — the --font-mono token is Space Grotesk (the site-wide body default, applied through the Tailwind `font-mono` class); the code surfaces `.prose code` and `.prose pre` override it to IBM Plex Mono. The token name is kept because renaming it would force a class sweep.
V11: base-type — html font-size is 18px; body weight is 400.
V12: motion — animate-hero (fadeUp stagger via an inline animation-delay), animate-on-scroll (IntersectionObserver adds .is-visible at threshold 0.1), and cta-pulse (pulseGlow). Under prefers-reduced-motion: reduce, opacity is forced to 1, transform/animation/transition are none, and the observer is skipped.
V13: seo-graph — JSON-LD @graph is [Person (#person), WebSite (#website), the page node (WebPage, CollectionPage, or BlogPosting), and a BreadcrumbList on non-root pages]; Person.knowsAbout is the skill list; Person.potentialAction is an AskAction to mailto:hello@lab5.ca (reply under 60 seconds). A BlogPosting node carries headline, description, datePublished, optional dateModified, optional keywords, author, and image.
V14: head-meta — canonical URL (derived from Astro.site, trailing slash stripped) plus hreflang en-ca and x-default; RSS alternate at /rss.xml; markdown alternate (blog only) at /blog/<slug>.md; Open Graph (type, url, title, description, site_name, locale en_CA, and image og.png 1200x630) plus Twitter summary_large_image. The title is "<title> | Konstantin Borovik", or the default landing string.
V15: llms-endpoints — /llms.txt (terse map) and /llms-full.txt (full landing-copy mirror) are text/markdown; their copy mirrors the landing manually, so editing the landing risks drift.
V16: blog-path — src/content/blog/<slug>.md is flat; the filename is the URL slug and the post id; a non-post .md in the directory breaks the build (glob failure).
V17: blog-render — the route owns the chrome: H1, date and tags, and the "all posts" link; the markdown body has no `# Title`, no byline, and no footer.
V18: blog-frontmatter — the schema is strict per §I.blog_schema; an undeclared key (author, image, canonical) fails astro check.
V19: prose-subset — .prose supports bold, italic, inline and fenced code, ul/ol, blockquote, horizontal rule, inline links, images (`![alt](src)` with src in public/blog/<slug>/ and a mandatory alt), and pipe tables; it does not support raw HTML beyond `<br>` and entities, or footnotes. Images open in a click-to-zoom `<dialog>` viewer.
V20: blog-hygiene — hard-wrap around 78 columns; UTF-8, LF line endings, no BOM; external links go through rehype-external-links with target _blank and rel noopener,noreferrer.
V21: tailwind-v4 — tokens, keyframes, and .prose live in @theme in global.css; there is no tailwind.config.js.
V22: headers — public/_headers sets X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, and Permissions-Policy with camera, microphone, geolocation, and payment disabled; caching is _astro immutable for one year, favicon one day, og seven days, sitemap one hour; llms*.txt are served as text/markdown.
V23: dual-surface — mailpilot.ca is a Cloudflare alias for lab5.ca; both are routes in wrangler.jsonc, so an edit affects both surfaces.
V24: build-gate — before committing, run make check and make build (astro check includes blog frontmatter against the schema).
V25: nav-footer — the nav links Home (/), Projects (/projects), and Blog (/blog) plus a persistent Book-a-Call CTA, with the active link shown in green by path match. The footer mirrors Home, Projects, Blog plus the copyright year.

## §T TASKS

id|status|task|cites

## §B BUGS

id|date|cause|fix
