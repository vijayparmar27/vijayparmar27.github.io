# vijayparmar27.github.io

Personal portfolio — [vijayparmar27.github.io](https://vijayparmar27.github.io/).

Next.js (App Router, TypeScript), statically exported and published to GitHub Pages.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script              | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Dev server with fast refresh                     |
| `npm run build`     | Static export into `out/`                        |
| `npm run lint`      | ESLint (`eslint-config-next`)                    |
| `npm run typecheck` | `tsc --noEmit`                                   |

## Layout

```
app/
  layout.tsx         Root layout: metadata, JSON-LD, chrome
  page.tsx           The single page
  not-found.tsx      Styled 404
  sitemap.ts         -> /sitemap.xml    robots.ts -> /robots.txt
components/
  sections/          One component per page section: Hero, Work, Experience, …
  work/              Project cards, glyph panels and the case-study drawer
  chrome/            Scroll progress bar and pointer-driven tilt/spotlight
  Reveal.tsx         Scroll-reveal wrapper (keeps sections server-rendered)
  MobileTabBar.tsx   Floating bottom nav, below 780px
hooks/               Reveal-on-scroll, active section, media queries, scroll lock
lib/
  projects.ts        Case-study content — the source of truth for the work grid
  content.ts         Site metadata, nav, jobs, capabilities, stack, education
  structuredData.ts  schema.org Person graph
  types.ts           Shared content types
styles/
  site.css           The full design system, imported by the root layout
  fonts.css          @font-face rules for the self-hosted subsets
public/assets/       Images, fonts and the resume PDF
```

Only the genuinely interactive pieces are client components — the work grid,
the drawer, the tab bar and the scroll chrome. Everything else renders on the
server, so its markup never ships as JavaScript.

Secondary text colours (`--muted-1` … `--muted-6` in `site.css`) are tuned to
clear WCAG AA 4.5:1 on both the page and card backgrounds. Tiers 7–8 are for
ornament and borders only; the decorative counters that use them are marked
`aria-hidden`.

Content lives in `lib/`, not in JSX. To add a project, append to `PROJECTS` in
[`lib/projects.ts`](lib/projects.ts) — the filter buttons, featured slot, card
grid and drawer all derive from that array.

`styles/site.css` is hand-written CSS (no Tailwind, no CSS modules). Class names
are BEM-ish and global; components reference them directly.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which lints, typechecks, builds the static export and publishes `out/` to GitHub
Pages.

One-time repo setup: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.
