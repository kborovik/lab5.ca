# SPEC — lab5.ca

Source-of-truth ∀ K. Borovik portfolio (lab5.ca). LLM-facing telegraph register.
Distilled from code 2026-06-11. 6 sections canonical order; cite ⊥ restate.

## §G GOAL

Lead-gen portfolio ∀ Konstantin Borovik (Software Engineer | AI & LLM Engineering, Toronto).
Thesis ≡ "LLM systems that do real work — without becoming a money pit": build ∨ rescue AI
business processes, cost-per-outcome traced to the dollar. MailPilot ≡ live proof-of-capability
(⊥ product). Primary conversion → book 30-min call. Static, owner-operated, deploy-on-push;
aesthetic ≡ framework-docs (GitHub-light), ⊥ SaaS marketing.

## §C CONSTRAINTS

- stack: Astro 6 (static output, ⊥ SSR adapter) + Tailwind v4 (@tailwindcss/vite) + TypeScript 6 (astro/tsconfigs/strict).
- runtime: Node ≥22; PM ≡ pnpm@10.31.0.
- host: Cloudflare Workers via wrangler; static assets ≡ ./dist; observability on.
- domains: lab5.ca ∧ mailpilot.ca — both CF custom-domain routes @ wrangler.jsonc.
- integrations: @astrojs/sitemap, @astrojs/rss, rehype-external-links (_blank), sharp (astro:assets), Shiki github-light.
- typeface: Space Grotesk (body/headings/nav) + IBM Plex Mono (code/pre) via Google Fonts.
- content: blog ≡ local md collection (astro:content glob); ⊥ CMS, ⊥ DB, ⊥ runtime fetch.

## §I INTERFACES

- route: `/` → landing (hero · the problem · what I do · proof · how the money stays under control · why me · closing)
- route: `/projects` → skill→GitHub-repo card grid {mailpilot, gcp-devops, pilot-skills, lab5.ca}
- route: `/mailpilot` → MailPilot proof page {how it works · knowledge base · try these questions · under the hood}; also served @ mailpilot.ca
- route: `/blog` → post index, pubDate desc, draft-filtered
- route: `/blog/<slug>` → post render (H1 + date/tags + `← all posts`)
- endpoint: `/blog/<slug>.md` → raw markdown alternate (yaml frontmatter + body)
- endpoint: `/rss.xml` → @astrojs/rss feed
- endpoint: `/llms.txt` → terse pages+posts+contact map (markdown)
- endpoint: `/llms-full.txt` → full landing-copy mirror (markdown)
- endpoint: `/sitemap-index.xml` + `/sitemap-0.xml` → @astrojs/sitemap
- static: public/{_headers, robots.txt, favicon.{svg,ico}, og.png 1200×630, kb-headshot.jpg, logo-linkedin.{svg,png}, banner-linkedin.png}
- blog_schema: {title:str, description:str, pubDate:coerce-date, updatedDate?:coerce-date, draft:bool=false, tags:str[]=[]} (content.config.ts; strict — undeclared key → check ✗)
- cta: book-call ≡ calendar.app.google/cYM3H3TsHsequR587 · mailpilot-email ≡ hello@lab5.ca · cost-post ≡ /blog/what-one-ai-email-costs · KB-drive ≡ drive folder · github ≡ github.com/kborovik · linkedin ≡ linkedin.com/in/kborovik · resume ≡ github.com/kborovik/resume · mailpilot-src ≡ github.com/kborovik/mailpilot
- cmd: make {install, dev, build, preview, check, clean, clean-all, deploy, status, wrangler, playwright} (makefile; build ≡ clean+check+astro build → dist/)
- asset_gen: assets-src/og.html (1200×630) ∧ assets-src/linkedin-banner.html (1584×396) → headless-Chrome --screenshot → public/*.png

## §V INVARIANTS

V1: voice — ⊥ aspirational verbs (move faster/transform/unlock/empower), ⊥ biz-benefit framing, ⊥ persona breakouts (Owner/CTO/COO), ⊥ marketing decoration (pill badges, stacked hero CTAs, colored icon boxes, "Learn more →"); ∋ tech vocab (LLM, retrieval, RAG, structured extraction, grounding, traced). Ref ≡ openspec.dev / Stripe-docs.
V2: positioning — solo senior owner end-to-end (back-end/infra/CI-CD/deploy/observability); wholesale-not-retail (⊥ agency sales/PM/markup tier); bus-factor rebuttal (code in client repo, runs in client cloud, plain-language docs); honest-boundary (full standing team ⊥ in scope).
V3: dev-not-SRE — claims/tiles/copy omit on-call/pager/incident-response/SRE vocab; deploy + observability in-bounds.
V4: mailpilot-framing — MailPilot ≡ proof-of-capability ∀ KB skills, ⊥ product/SaaS, ⊥ funnel framing; self-reported-evidence honesty (one project · early numbers · checkable via open source + traced calls + email-it-yourself).
V5: cost-thesis — measure $/outcome (per email/doc/ticket) ⊥ token volume; cap usage; instrument every call; ground answers ∧ decline-on-uncertain; scale-to-zero idle. $ claims labeled measured vs assumption.
V6: casing — page H1 ∧ blog title ≡ sentence case; section-kicker (H2) ≡ lowercase; tile/step H3 title ≡ Title Case (Build Business Processes with AI, Send a Product Question).
V7: entities — .astro markup uses HTML entities &mdash;/&middot;/&minus;/&rarr;/&larr;/&rsquo;/&times; (⊥ literal — in .astro); blog .md em-dash space-padded, literal — ∨ &mdash; both in use.
V8: section-kicker — `.section-kicker` DOM text ≡ clean section name (⊥ literal `// `); `::before{content:'// '}` renders visual marker — agent parser sees clean heading, reader sees `// what I do`. Mailpilot literal `// knowledge base` / `// try these questions` ≡ non-kicker plain markup.
V9: palette — gh-* tokens only {canvas #fafbfc, canvas-subtle #f6f8fa, fg #1f2328, fg-muted #424a53, fg-subtle #818b98, border #d1d9e0, green #1f883d/hover #1a7f37, blue #0969da/hover #0550ae}; raised surfaces ≡ white. ∈ @theme.
V10: typeface — --font-mono token ≡ Space Grotesk (body default site-wide via Tailwind `font-mono` class); code surface `.prose code`/`.prose pre` override ≡ IBM Plex Mono. Token name retained ∵ rename → class-sweep.
V11: base-type — html font-size 18px; body weight 400.
V12: motion — animate-hero (fadeUp stagger via inline animation-delay), animate-on-scroll (IO .is-visible reveal @ threshold 0.1), cta-pulse (pulseGlow). prefers-reduced-motion:reduce → opacity 1 + transform/animation/transition none ∧ IO observer skipped.
V13: seo-graph — JSON-LD @graph ≡ [Person #person, WebSite #website, page node (WebPage|CollectionPage|BlogPosting), BreadcrumbList?(non-root)]; Person.knowsAbout skill list; Person.potentialAction ≡ AskAction → mailto:hello@lab5.ca (<60s). BlogPosting node ∋ headline/description/datePublished/dateModified?/keywords?/author/image.
V14: head-meta — canonical (Astro.site-derived, trailing-slash-stripped) + hreflang en-ca + x-default; RSS alternate /rss.xml; markdown alternate (blog only) /blog/<slug>.md; OG {type/url/title/desc/site_name/locale en_CA + image og.png 1200×630} + Twitter summary_large_image. title ≡ `<title> | Konstantin Borovik` ∨ default landing string.
V15: llms-endpoints — /llms.txt (terse map) ∧ /llms-full.txt (full landing-copy mirror) ≡ text/markdown; copy manually mirrors landing → drift risk on landing edits.
V16: blog-path — src/content/blog/<slug>.md flat; filename ≡ URL slug ≡ post.id; ⊥ non-post .md ∈ dir (glob → build fail).
V17: blog-render — route owns chrome: H1 + date/tags + `← all posts`; md body ⊥ `# Title`, ⊥ byline, ⊥ footer.
V18: blog-frontmatter — schema strict per §I.blog_schema; undeclared key (author/image/canonical) → astro check ✗.
V19: prose-subset — .prose ∋ {bold, italic, inline+fenced code, ul/ol, blockquote, hr, inline link, image `![alt](src)` src ∈ public/blog/<slug>/ alt-mandatory, pipe table}; ⊥ {raw HTML beyond <br>+entities, footnote}. img → click-to-zoom <dialog> viewer.
V20: blog-hygiene — hard-wrap ~78 col; UTF-8, LF, ⊥ BOM; external links → rehype-external-links _blank noopener,noreferrer.
V21: tailwind-v4 — tokens/keyframes/.prose ∈ @theme ∈ global.css; ⊥ tailwind.config.js.
V22: headers — public/_headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera/mic/geo/payment (); cache: _astro immutable 1y, favicon 1d, og 7d, sitemap 1h; llms*.txt content-type text/markdown.
V23: dual-surface — mailpilot.ca ≡ CF alias ∀ lab5.ca; both ∈ wrangler.jsonc routes — edits affect both.
V24: build-gate — pre-commit ! make check ∧ make build (astro check incl. blog frontmatter vs schema).
V25: nav-footer — Nav {Home /, Projects /projects, Blog /blog} + persistent Book-a-Call CTA; active-state green via path match. Footer mirrors {Home, Projects, Blog} + © year. ⊥ /expertise, /about, /resume (retired routes).

## §T TASKS

id|status|task|cites

## §B BUGS

id|date|cause|fix
