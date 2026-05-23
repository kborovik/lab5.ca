# lab5.ca

Personal portfolio + career site for **Konstantin Borovik** — Software
Developer | DevOps Engineer, Toronto, Canada.

Live at <https://lab5.ca>

## What's here

Static site built with Astro 6, deployed to Cloudflare Workers. Surfaces:

- `/` — hero, capabilities, claims, proof, résumé link
- `/projects` — skills→GitHub-repo proof grid
- `/mailpilot` — MailPilot demo (proof-of-capability for LLM agent work)
- `/blog` — long-form writing
- `/resume` — printable CV (browser → PDF via `@media print`)

## Stack

- [Astro 6](https://astro.build) static (no SSR adapter)
- [Tailwind v4](https://tailwindcss.com) via `@theme` in `src/styles/global.css`
- TypeScript 6, pnpm 10, Node ≥22
- [Cloudflare Workers](https://workers.cloudflare.com) static assets +
  Cloudflare Web Analytics
- Typeface: IBM Plex Mono (400/500/600/700) via Google Fonts
- Palette: GitHub Primer Light

## Local development

```bash
make install   # brew → pnpm if missing; pnpm install
make dev       # astro dev → http://localhost:4321
make check     # astro check (incl. blog frontmatter schema)
make build     # production build → dist/
make preview   # serve production build
make deploy    # build + wrangler deploy
```

`make help` lists all targets.

## Repo layout

```
src/
├── layouts/Layout.astro            SEO props, scroll-reveal observer
├── components/{Nav,Footer}.astro
├── content.config.ts               blog collection schema
├── content/blog/<slug>.md          flat; filename ≡ URL slug
├── pages/{index,projects,mailpilot,resume,about}.astro
├── pages/blog/{index,[...slug]}.astro
├── pages/llms{,-full}.txt.ts       LLM-readable site snapshots
├── assets/                         astro:assets sources
└── styles/global.css               Tailwind v4 @theme tokens + .prose
public/                             static assets (og.png, favicons, etc.)
assets-src/                         HTML sources for OG + LinkedIn banner
makefile, wrangler.jsonc, astro.config.mjs
```

## Deployment

CI/CD via GitHub Actions on push to `main` — runs `wrangler deploy` against
the `lab5-ca` Worker. Both `lab5.ca` and `mailpilot.ca` are configured as
custom domains in `wrangler.jsonc` and serve the same site.

## Contact

- Email: <kb@lab5.ca>
- LinkedIn: <https://www.linkedin.com/in/kborovik>
- Book a call: <https://calendar.app.google/cYM3H3TsHsequR587>

## License

Source code: MIT. Site content, copy, and assets (résumé, headshot, OG
images, blog posts): © Konstantin Borovik, all rights reserved.
