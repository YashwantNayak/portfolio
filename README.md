# Portfolio1 — Framer-style Portfolio (React + Vite + TS + pnpm)

Modern multi-page portfolio inspired by **sawad.framer.website**. Everything is built with inline style objects (no external CSS files) plus Framer Motion for cinematic transitions.

## Structure

- `src/components/` — shared UI (layout shell, sticky navbar, footer, page wrapper) and `theme.ts` tokens.
- `src/pages/` — exportable page components: `Home.tsx`, `Projects.tsx`, `Experience.tsx`, `Tools.tsx`, `Thoughts.tsx`, `Contact.tsx`.
- `src/content.ts` — data used by the pages (stats, projects, experience, tools, blog posts).
- `src/App.tsx` — React Router v6 wiring for all pages.

Each page mirrors the reference aesthetic: white + light grey palette, thin outlines, soft shadows, rounded corners, Inter typography, and Framer-style fade/slide animations.

## Quick start (Windows PowerShell)

```powershell
# from project root
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` — start the Vite dev server on http://localhost:5173
- `pnpm build` — production build (already verified once)
- `pnpm preview` — preview the production output locally

## Customization hints

- Update copy, stats, or tags in `src/content.ts`.
- Adjust theme constants (colors, shadows, radii) in `src/theme.ts`.
- Each page is self-contained, so you can export them individually (rename to `.jsx` if you prefer pure JSX).

Let me know if you want follow-ups such as deployment config, tests, or a dark mode variant.
