# Prompt: Implementation of the Dynamic "Works" Gallery

## Goal
Transform the `WorksSection` into a dynamic gallery that switches between a default "Cover" state and a category-specific "Preview Grid" state based on user interaction with the `PagesMenu`.

## Technical Context
- **Framework:** Astro v6.3.3
- **Interactivity:** Alpine.js (using the existing `gallery` store)
- **Styling:** Tailwind CSS v4
- **Data Source:** `src/data/data.json`

## Requirements

### 1. State Management (Alpine.js)
- The component must react to the `gallery.activeCategory` state from the Alpine store.
- **State A (Default):** `activeCategory` is null or not set. Display the default cover image for the "Works" section.
- **State B (Active Category):** `activeCategory` corresponds to a specific category index/ID. Display the gallery grid for that specific category.

### 2. UI Implementation

#### A. Default State (The Cover)
- Display a single, high-impact image (the main image for the "Works" section defined in `data.json`).
- The image should maintain the established visual style (e.g., `clip-slant-bottom` or full-screen cover) to serve as a cinematic entry point to the portfolio.

#### B. Active State (The Category Grid)
- When a category is selected via `PagesMenu`, the cover image is replaced by a grid of previews.
- **Grid Style:**
  - **Shape:** Perfectly square previews (`aspect-square`).
  - **Fitting:** Images must use `object-cover` to avoid distortion.
  - **Columns:** Responsive layout: 2 cols (mobile) $ightarrow$ 3 cols (tablet) $ightarrow$ 4 cols (desktop).
  - **Spacing:** Tight, consistent gaps.
- **Content:** Only images belonging to the selected category from `data.json` should be rendered.

### 3. Navigation & Integration
- **Trigger:** Ensure `PagesMenu` correctly updates the `gallery.activeCategory` in the store upon clicking a menu item.
- **Transitions:** Implement smooth transitions (using Alpine's `x-transition` or CSS transitions) when switching from the cover image to the gallery grid to avoid jarring jumps.
- **Reset:** Define the behavior for returning to the default state (e.g., clicking the "Works" main link or a "back" action).

### 4. Aesthetics & Performance
- Maintain the strict visual language of the site (colors, typography, and spacing).
- Optimize image loading: the cover image should be prioritized, while grid previews should use `loading="lazy"`.

## Deliverables
- An updated `WorksSection.astro` implementing the state-switching logic.
- Integration with the Alpine.js `gallery` store.
- A polished, responsive grid that feels "alive" and reacts instantly to menu changes.
