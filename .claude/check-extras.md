# check-extras — extended §V audit recipes

REPO-LOCAL supplement to SPEC.md §V. Each section below carries the full audit
detail for a heavy §V row; SPEC.md keeps only a 1-line summary + `detail:
check-extras §V<n>` reference.

## §V1: voice

Forbidden patterns: aspirational verbs (move faster, transform, unlock, empower);
business-benefit framing; persona breakouts (Owner / CTO / COO); marketing
decoration (pill badges, stacked hero CTAs, colored icon boxes, "Learn more").
Allowed: tech vocabulary (LLM, retrieval, RAG, structured extraction, grounding,
traced).
Reference aesthetic: openspec.dev and Stripe docs.

## §V7: entities

Static .astro markup and static HTML attributes use HTML entities for special
characters: &mdash; &middot; &minus; &rarr; &larr; &rsquo; &times;; no literal
em-dash in static context.
Exception — `{}` interpolation: values emitted through `{}` — data-array fields
(e.g. `{p.context}`, `{item.body}`) and prop strings the component re-emits via
`{}` (e.g. `description`, `title`) — require a literal em-dash; Astro escapes `&`
in `{}` output so `&mdash;` double-escapes to `&amp;mdash;`.
Blog markdown: em-dashes are space-padded; both literal "—" and &mdash; are in use.
Audit (staged diff): git diff --cached -U0 -- 'src/**/*.astro' | grep '^+' |
grep -nP '—|·|−|→|←|’|×'
Classify each hit by context: static markup or HTML-attribute context →
violation (entity required); `{}` interpolation context → exempt per the
exception above. grep cannot tell the two apart, so hits are review-flags,
not auto-violations. Blog markdown is out of scope (pathspec excludes it).

## §V8: section-kicker

`.section-kicker` DOM text is the clean section name with no literal `// ` prefix;
`::before { content: '// ' }` CSS rule renders the visual marker.
Exception: MailPilot "// knowledge base" and "// try these questions" are plain
markup, not kickers — they contain the `// ` literal in the markup itself.

## §V11: base-type

Shared-scale content pages: src/pages/index.astro, src/pages/services.astro,
src/pages/mailpilot.astro.
Audit: grep -nE 'text-sm|text-xs|text-\[10px\]' over the three files, then
classify each hit against the two below-text-base tiers.
text-xs / text-[10px] is micro-chrome only: copy-to-clipboard controls (a
<button> carrying a copy label, data-copy-*, or aria-label="Copy...") and
ordinal/step markers (the flex items-baseline gap-2 num row holding {step.num}
or {layer.num}). Any text-xs / text-[10px] outside that set is a hard violation.
text-sm is the caption/hint floor: descriptive micro-copy under a heading or
control (notes, hints) may be text-sm, as may micro-chrome. A text-sm hit on
anything else (intro, lede, sub-head, section body, list item, table, action
link) is content mis-sized down: bump to its tier (body and lists text-base,
lede and section sub-head text-lg). grep cannot tell a caption from a mis-sized
body, so text-sm hits are review-flags, not auto-violations.
H1 and section kicker keep their fixed sizes and are out of scope.

## §V13: seo-graph

JSON-LD @graph required nodes on every page: Person (#person), WebSite (#website),
page node (WebPage on /, CollectionPage on /blog, BlogPosting on /blog/<slug>),
BreadcrumbList on non-root pages.
Person.knowsAbout: the skill list. Person.potentialAction: AskAction to
mailto:hello@lab5.ca (reply under 60 seconds).
BlogPosting required properties: headline, description, datePublished, optional
dateModified, optional keywords, author, image.

## §V14: head-meta

Required on every page: canonical URL (Astro.site-derived, trailing slash
stripped), hreflang en-ca and x-default, RSS alternate at /rss.xml, Open Graph
(type, url, title, description, site_name, locale en_CA, image og.png 1200x630),
Twitter summary_large_image.
Title format: "<title> | Konstantin Borovik", or the default landing string.
Markdown-alternate pages add a text/markdown rel=alternate link to their .md
counterpart: blog posts at /blog/<slug>.md, /mailpilot at /mailpilot.md,
/services at /services.md.

## §V16: blog-path

Path structure: src/content/blog/<slug>.md flat directory; filename is the URL
slug and the post id.
Build constraint: a non-post .md in the directory breaks the build (glob failure).
LinkedIn pairing: every post pairs with linkedin/<slug>.txt; dropping a post
deletes its linkedin/<slug>.txt in the same change.
TLDR mirror: the post's ## TLDR section mirrors to linkedin/<slug>.txt as its lead
paragraph.

## §V19: prose-subset

Supported elements: bold, italic, inline and fenced code, ul/ol, blockquote,
horizontal rule, inline links, images, pipe tables.
Image requirements: src in public/blog/<slug>/, mandatory alt text; images open in
a click-to-zoom `<dialog>` viewer.
Not supported: raw HTML beyond `<br>` and entities, footnotes.

## §V22: headers

public/_headers security headers: X-Frame-Options DENY, X-Content-Type-Options
nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy with
camera/microphone/geolocation/payment disabled.
Cache rules: _astro immutable 1 year, favicon 1 day, og 7 days, sitemap 1 hour.
Content-Type override: llms*.txt served as text/markdown.

## §V26: blog-skim

Every post opens with ## TLDR (≤3 sentences compressing the whole argument).
Each H2 prose section opens with a standalone bold one-sentence subtitle; reading
TLDR + subtitles yields the full argument.
Lists exempt from subtitle rule; bold item-leads serve as disclosure.
Pre-heading lede carries one bold thesis statement and no subtitle.
Bold reserved for skim-spine sentences only; term/number/entity emphasis uses
italic, not bold.
