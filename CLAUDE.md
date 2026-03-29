# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Site

```bash
nvm use 22          # Node 22 required (Astro 6 minimum)
yarn dev            # Start Astro dev server on http://localhost:4321
yarn build          # Production build to /dist
yarn preview        # Preview production build
```

## Architecture

**Astro 6 + React + TypeScript** static site. Vite is Astro's built-in bundler. Package management via Yarn 4 with `nodeLinker: node-modules` (see `.yarnrc.yml`).

### Source structure

```
src/
  layouts/Layout.astro    — Base HTML shell, fonts, global CSS variables
  pages/index.astro       — Main page (composes all sections)
  components/
    Hero.tsx              — Full-viewport hero with reveal animations
    ParticleCanvas.tsx    — GPU canvas particle physics (mouse-reactive)
    Work.tsx              — Work experience cards with scroll reveal
    About.tsx             — Bio, skills, dark background section
    Footer.tsx            — Contact CTA + footer
    StickyNav.tsx         — Scroll-aware sticky nav with progress bar
```

### Legacy pages (static, served from /public)

- `/public/salt/` — Salt / ASA project
- `/public/the-city/` — The City text adventure
- `/public/event-horizon/` — Event Horizon landing page
- `/public/worship/` — Worship game
- `/public/legacy.html` — Original portfolio (archived)

**No build step needed for legacy pages** — they are served as static files by Astro from `/public`.

## Styling

All design tokens live in `:root` in `src/layouts/Layout.astro`:
- `--cherry` / `--cherry-dark` / `--cherry-light` — signature red palette
- `--cream` — warm background (#FAF7F2)
- `--ink` / `--ink-muted` / `--ink-subtle` — text hierarchy
- `--font-serif` — Instrument Serif (headlines)
- `--font-sans` — Syne (UI text)
- `--font-mono` — DM Mono (labels, tags, captions)
- `--ease-out` / `--ease-in-out` — custom cubic bezier curves

Component styles are co-located as `<style>` tags inside each `.tsx` component.

## Motion principles

- Scroll reveals: `IntersectionObserver` + CSS transitions (opacity + translateY)
- Hero reveal: staggered CSS transitions with `transition-delay`
- Particle canvas: `requestAnimationFrame` loop, mouse-attracted spring-like movement
- Sticky nav: CSS `transform: translateY` toggled on scroll
- All animations respect `prefers-reduced-motion`
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for UI interactions

