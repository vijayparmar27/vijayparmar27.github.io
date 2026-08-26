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
app/                 Root layout (metadata, chrome) and the single page
components/
  sections/          One component per page section: Hero, Work, Experience, …
  work/              Project cards, glyph panels and the case-study drawer
  chrome/            Scroll progress bar and pointer-driven tilt/spotlight
hooks/               Reveal-on-scroll, active section, media queries, scroll lock
lib/
  projects.ts        Case-study content — the source of truth for the work grid
  content.ts         Site metadata, nav, jobs, capabilities, stack, education
  types.ts           Shared content types
styles/
  site.css           The full design system, imported by the root layout
  fonts.css          @font-face rules for the self-hosted subsets
public/assets/       Images, fonts and the resume PDF
```

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
