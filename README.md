# Vishu — Portfolio (React + Three.js)

An interactive 3D "Boot-Up Room" portfolio built with a real modern stack:

- **React 19 + Vite** — app structure and dev server
- **Three.js + @react-three/fiber + @react-three/drei** — the actual 3D room scene (desk, laptop, books, plant, lamp, corkboard, floating resume file), not CSS tricks
- **Framer Motion** — boot glitch sequence, scroll reveals, terminal open/close, 3D project card flips
- **Web Audio API** — synthesized UI sounds (boot beep, typing clicks, easter-egg chime) — zero audio files needed
- **Plain CSS files** — one stylesheet per component, custom design tokens (no Tailwind/Bootstrap defaults)

## Features--

1. Glitch boot-up intro sequence
2. Real 3D room scene rendered with Three.js — mouse-driven parallax rotation
3. Time-of-day lighting system (real clock — window/lamp shift day ↔ night)
4. Click the 3D laptop to open an interactive terminal (`whoami`, `skills`, `projects`, `resume`, `contact`, `coffee`, `clear`)
5. Easter egg: type `sudo hire me` in the terminal → confetti burst; `coffee` → steam animation
6. Sound toggle (top right) — all sound synthesized live, no assets
7. Project cards flip in 3D on hover to reveal details
8. Floating 3D resume file — click it (in the room or terminal) for a file-open flash animation before the resume opens
9. Exit transition — external links (GitHub/LinkedIn/email) trigger a screen-veil animation before opening a new tab

## Credits

The desk, desk lamp, book, and potted plant are real CC0 (public domain) 3D
models from the **Polygonal Mind** collection, sourced via
[ToxSam/open-source-3d-assets](https://github.com/ToxSam/open-source-3d-assets)
— a curated registry of freely licensed GLB models. No attribution is legally
required under CC0, but credit where it's due. Files were optimized locally
with `gltf-transform` (mesh compression + WebP textures), shrinking them from
~13MB to ~1MB combined.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder to Vercel, Netlify, GitHub Pages, or any static host.

## Project structure

```
src/
  components/       React components (Room3D, Terminal, BootSequence, sections, effects)
  styles/           One CSS file per component
  hooks/            useSound (Web Audio), useTimeOfDay
  data/portfolio.js Your name, skills, projects, links — edit this file to update content
```

To change content (name, skills, projects, links), edit `src/data/portfolio.js` only —
everything else reads from there.
# Portfolio2026
