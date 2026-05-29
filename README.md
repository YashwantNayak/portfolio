# Portfolio Website

Personal portfolio
built with React + Vite.
Desktop-first experience with animation-heavy UI and section-based flow.

## What is included

- Hero, projects, experience, tools, resume, contact pages
- Hash-based routing for static hosting
- Framer Motion transitions
- Unicorn Studio scene embed in hero modal
- Separate mobile fallback screen

## Tech stack

- React 18
- TypeScript
- Vite 5
- React Router DOM 6 (HashRouter)
- Framer Motion
- unicornstudio-react

## Run locally

Prerequisite: Node.js 20+ recommended (unicornstudio-react expects modern Node).

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build production bundle

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Deploy

This project is configured for GitHub Pages using dist output.

```bash
npm run build
npm run deploy
```

## App routes

- / -> Home feed (Home + Projects + Experience + Tools)
- /resume -> Thoughts page
- /blog/:slug -> Blog post page
- /contact -> Contact page
- * -> Falls back to Home feed
Routing is defined in src/components/DesktopApp.tsx.

## Important files to edit

- src/content.ts -> personal info, stats, project content, experience data
- src/pages/Home.tsx -> hero section, spider trigger, Unicorn modal
- src/components/DesktopApp.tsx -> route structure
- src/components/MobileOnly.tsx -> mobile fallback view
- public/images and public/projects -> static assets

#Notes

- Desktop layout loads for width >= 768, otherwise mobile fallback screen is shown.
- If scene/embed behaves differently across systems, test on Node 20 and latest npm.

