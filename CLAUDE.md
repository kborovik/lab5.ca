# lab5.ca

Operational guide for the K. Borovik portfolio. `SPEC.md` is the source of truth — goal §G, constraints §C, interfaces §I (routes, blog schema, cmd surface, CTA), invariants §V, tasks §T; cite sections rather than restating them. Pre-commit gate: §V.24 (`make check`, `make build`).

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
linkedin/<slug>.txt                 # LinkedIn copy paired per post (§V.16)
public/{_headers,og.png,banner-linkedin.png,favicon.{ico,svg},logo-linkedin.{svg,png},kb-headshot.jpg,robots.txt}
makefile, wrangler.jsonc, astro.config.mjs; assets-src/{og.html,linkedin-banner.html}
```

## Playwright MCP

`.mcp.json` runs `npx @playwright/mcp@latest --browser chrome --user-data-dir .playwright-mcp/chrome-profile`. Not a project dependency; on-demand. The profile persists logins. Enabled via `.claude/settings.json` `enableAllProjectMcpServers: true`. Output goes to `.playwright-mcp/` (gitignored).

Flow: `make dev`, then `browser_navigate`, then `browser_snapshot` (a11y, preferred) or `browser_take_screenshot`; also `browser_{click,type,console_messages,network_requests}`. Do not screenshot an SVG at `file://` — it times out.

## asset regen (§I.asset_gen)

- OG: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/og.png --window-size=1200,630 assets-src/og.html`
- LinkedIn banner: same command with `--screenshot=public/banner-linkedin.png --window-size=1584,396 assets-src/linkedin-banner.html`
- favicon: `magick -background none public/favicon.svg -define icon:auto-resize=48,32,16 public/favicon.ico`

## paths

- spec: `SPEC.md` (sole mutator: `/sdd:spec`)
- design drafts: `designs/<slug>.md` (folded in via `/sdd:spec`)
- proof-of-capability demo (MailPilot): `~/github/mailpilot`
