# Meeran Portfolio Lab

An experimental portfolio for Mappillai Meeran A. This is a separate project and does not modify the existing portfolio repository.

## Direction

A natural day-to-night visual system: warm paper, soft sunlight and earthy accents in daylight; deep blue-green tones and cool ambient light at night. The 3D hero object is intentionally restrained so the work and writing stay in focus.

## Stack

- React + TypeScript + Vite
- Three.js with React Three Fiber and Drei
- Framer Motion
- Lucide icons
- CSS variables for the light/dark themes

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The Vite base path is configured for this repository: `/meeran-portfolio-lab/`.

1. Run `npm run build`.
2. Publish the `dist` directory with GitHub Pages (GitHub Actions is recommended).
3. In repository Settings → Pages, select the GitHub Actions deployment source.

## Content notes

Project summaries are intentionally concise and avoid claiming that every listed project is production-deployed. Update project links to their individual repositories when those repositories are ready. Add a current resume PDF and confirmed contact email before public launch.

## Before public launch

- Confirm the wording and dates of experience and awards.
- Add verified repository links for each project.
- Add the latest resume.
- Run the production build and test mobile, keyboard navigation and reduced-motion behavior.
