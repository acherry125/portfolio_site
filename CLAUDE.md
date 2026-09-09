# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. For local dev commands, root scripts, and tooling setup, see [README.md](README.md).

## Architecture

Yarn workspaces monorepo:
- `projects/web` (`@portfolio/web`) — the Astro 6 + React + TypeScript site. Almost all site work happens here.
- `projects/infra` (`@portfolio/infra`) — Pulumi IaC for AWS deployment.

### `projects/web/src/`

```
layouts/Layout.astro    — Base HTML shell, fonts, global CSS variables
pages/
  index.astro            — Main page (composes all sections)
  the-city.astro         — "The City" project detail page
  worship.astro          — "Worship" project detail page
components/
  Hero.tsx               — Full-viewport hero with reveal animations
  ParticleCanvas.tsx     — GPU canvas particle physics (mouse-reactive)
  Work.tsx               — Work experience cards with scroll reveal
  Career.tsx             — Career/experience section
  SideProjects.tsx       — Side project cards (links to the-city/worship pages, event-horizon)
  GlassesLogo.tsx        — Logo mark
  StickyNav.tsx          — Scroll-aware sticky nav with progress bar
  Footer.tsx             — Contact CTA + footer
```

Project-detail images/video for the-city, worship, and event-horizon are static files under `projects/web/public/`.

## Styling

Design tokens live in `:root` in `projects/web/src/layouts/Layout.astro`:
- `--cherry` / `--cherry-dark` / `--cherry-light` — signature red palette
- `--cream` / `--cream-warm` — warm background
- `--ink` / `--ink-muted` / `--ink-subtle` — text hierarchy
- `--font-serif` — Instrument Serif (headlines)
- `--font-sans` — Syne (UI text)
- `--font-mono` — DM Mono (labels, tags, captions)
- `--ease-out` / `--ease-in-out` — custom cubic bezier curves

Component styles are co-located as `<style>` tags inside each `.tsx`/`.astro` file.

## Motion principles

- Scroll reveals: `IntersectionObserver` + CSS transitions (opacity + translateY)
- Hero reveal: staggered CSS transitions with `transition-delay`
- Particle canvas: `requestAnimationFrame` loop, mouse-attracted spring-like movement
- Sticky nav: CSS `transform: translateY` toggled on scroll
- All animations respect `prefers-reduced-motion`
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for UI interactions
