# AGENTS.md

## Commands

| Command | Description |
|---|---|
| `bun install` | Install deps |
| `bun dev` | Dev server at `localhost:4321` |

Package manager is **Bun**. Node >= 22.12.0.

**Use `bun dev` only** — do not run `bun build` or `bun preview`. To verify changes, start `bun dev` and check in browser. If network issues occur (e.g. fontsource API failures), use `pr bun dev` instead (`pr` = shell alias for proxychains).

**Commit after each step** — always commit changes before moving to the next task. Use `git add -A && git commit -m "..."` after every completed step.

## Stack

- **Astro 6** (file-based routing in `src/pages/`)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (not PostCSS). Uses `@import "tailwindcss"` in CSS.
- **Alpine.js** for client interactivity. Entrypoint: `src/scripts/alpine/entrypoint.ts` (configured in `astro.config.mjs`).
- **Inter font** via `fontProviders.fontsource()`, subsets: latin + cyrillic.
- Images in `src/images/` are numbered JPGs (01–61) and serve as placeholders. Use any images from this folder unless explicitly told which specific image to use.

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
- **AGENTS.md must be written in English only.**

## Firefox MCP — Taking Screenshots

Firefox MCP server does not start automatically. Steps:

1. Ensure the dev server is running (`bun dev`).
2. Start Firefox with the binary path and URL:
   ```
   firefox_restart_firefox(
     firefoxPath="/Applications/Firefox.app/Contents/MacOS/firefox",
     startUrl="http://localhost:4321"
   )
   ```
3. Then call `firefox_navigate_page` or `firefox_take_snapshot` to launch the browser.
4. Find an element by ID: `firefox_take_snapshot` → `firefox_resolve_uid_to_selector`.
5. Screenshot an element: `firefox_screenshot_by_uid(uid=..., saveTo="screenshots/name.png")`.
6. Full page screenshot: `firefox_screenshot_page(saveTo="screenshots/name.png")`.

Binary path: `/Applications/Firefox.app/Contents/MacOS/firefox`
