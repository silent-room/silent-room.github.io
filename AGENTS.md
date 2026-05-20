# AGENTS.md

## Commands

| Command | Description |
|---|---|
| `bun install` | Install deps |
| `bun dev` | Dev server at `localhost:4321` |

Package manager is **Bun**. Node >= 22.12.0.

**Use `bun dev` only** — do not run `bun build` or `bun preview`. To verify changes, start `bun dev` and check in browser. If network issues occur (e.g. fontsource API failures), use `pr bun dev` instead (`pr` = shell alias for proxychains).

## Stack

- **Astro 6** (file-based routing in `src/pages/`)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (not PostCSS). Uses `@import "tailwindcss"` in CSS.
- **Alpine.js** for client interactivity. Entrypoint: `src/scripts/alpine/entrypoint.ts` (configured in `astro.config.mjs`).
- **Inter font** via `fontProviders.fontsource()`, subsets: latin + cyrillic.

## Architecture

```
src/
  pages/          file-based routes (index.astro = home)
  layout/         BaseLayout.astro — wraps all pages (header + footer + <Font>)
  components/
    BaseHeader.astro / BaseFooter.astro
    menus/SiteMenu.astro
    sections/BaseSection.astro — full-viewport section wrapper, requires `id` prop
  scripts/alpine/entrypoint.ts — Alpine plugin registration point
  styles/global.css — Tailwind import + @theme blocks (custom colors, font mapping)
  images/         numbered JPGs (01–61)
public/           static assets (favicons)
```

## Conventions

- All pages wrap in `<BaseLayout>`.
- Page sections use `<BaseSection id="...">` for anchoring and full-viewport height.
- Render lists/menus from frontmatter arrays via `.map()` — do not hardcode repeated `<li>`/`<a>` elements.
- Alpine.js state lives inline in templates (`x-data`); register plugins/globals in `entrypoint.ts`.
- Custom theme tokens (colors, fonts) go in `@theme` / `@theme inline` blocks in `global.css`.

## Notes

- No lint, typecheck, or test suite configured.
- `.vscode/launch.json` references `./node_modules/.bin/astro dev` — use `bun dev` instead.
