# Project: Portfolio

This is a personal portfolio website built with the Astro framework. It is designed to be a fast, content-focused site with a minimal footprint.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) (v6.3.3)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (via Vite plugin)
- **Interactivity:** [Alpine.js](https://alpinejs.dev/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Runtime:** Node.js >= 22.12.0

## 🚀 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your machine.

### Commands

| Command | Description |
| :--- | :--- |
| `bun install` | Install project dependencies |
| `bun dev` | Start the local development server at `http://localhost:4321` |
| `bun build` | Build the production site to the `./dist/` directory |
| `bun preview` | Preview the production build locally |
| `bun astro` | Run Astro CLI commands |

## 📁 Project Structure

The project follows the standard Astro directory layout:

- `src/pages/`: File-based routing. Each `.astro` or `.md` file here becomes a route.
- `src/layout/`: Shared layout components (e.g., `BaseLayout.astro`) that wrap pages.
- `src/components/`: Reusable UI components.
    - `src/components/menus/`: Navigation-related components.
    - `src/components/sections/`: Page section wrappers and components.
- `src/scripts/`: Client-side scripts and integrations (e.g., Alpine.js entrypoint).
- `src/styles/`: Global CSS and theme definitions (`global.css`).
- `public/`: Static assets like images and favicons.

## 🎨 Development Conventions

- **Components:** Use `.astro` components for static parts of the UI.
- **Styling:** Use Tailwind CSS utility classes for styling. Global styles are managed in `src/styles/global.css`.
- **Layouts:** All pages should be wrapped in a layout from `src/layout/` to ensure consistent structure across the site.
- **Page Structure:** Use the `BaseSection` component to define major sections of a page, passing a unique `id` via props for anchoring.
- **Interactivity:** Use Alpine.js for lightweight client-side interactivity, with logic organized in `src/scripts/alpine/`.
- **Lists & Menus:** Avoid hardcoding repetitive list elements (e.g., multiple `<li>` or `<a>` tags). Instead, define data in an array within the frontmatter and use `.map()` to render the elements dynamically.
- **Routing:** To create a new page, add a file to `src/pages/`.
