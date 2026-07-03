// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.google(),
      styles: ["normal", "italic"],
      weights: ["100 900"],
      subsets: ["latin", "cyrillic"],
      formats: ["woff2", "woff"],
      fallbacks: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  ],
});
