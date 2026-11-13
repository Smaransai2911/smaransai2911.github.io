# Ganaparthi Sai Smaran · The Synaptic Archive

React + Vite + Tailwind CSS + Framer Motion portfolio, static-hosted on GitHub Pages
(`https://smaransai2911.github.io/`).

Two entry points:

- `/` the professional portfolio (this React app)
- `/archive/` the original **Synaptic Archive**, preserved as a standalone immersive page (`public/archive/index.html`)

## Run

```bash
npm install
npm run dev      # local development
npm run build    # production build into dist/
npm run preview  # serve dist/ locally
```

## Where to edit content

| What | File |
| --- | --- |
| Name, tagline, About text, experience, education, certifications, skills, books, photos, social links, persona definitions | `src/data/portfolioData.js` |
| Projects | `src/data/projectsData.js` |
| Colours / design tokens | `src/styles/index.css` (`:root`) |

No component needs editing to add a book, photo or project.

### Contact form (Web3Forms)

1. Get a free access key at https://web3forms.com.
2. Locally: create `.env` with `VITE_WEB3FORMS_KEY=your_key`.
3. On GitHub: Settings → Secrets and variables → Actions → add secret `VITE_WEB3FORMS_KEY`.

Until a key is set, the form validates but shows "not connected yet" and sends nothing.
(Web3Forms keys are public-facing by design; `.env` is git-ignored anyway.)

### Adding a photo / book cover

Put files in `public/photography/` or `public/books/` and reference them as `/photography/name.webp`, `/books/name.webp`
in the data file. Set `verified: true` on a photo once you confirm it is yours.

## Deploy to GitHub Pages

1. Repository name must be `smaransai2911.github.io`; push to `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and publishes `dist/` on every push.

`vite.config.js` uses `base: '/'`, correct for a root-domain user site.

## Changes made to your original Synaptic Archive file

The original is kept intact at `public/archive/index.html`. Only these edits were made:

1. **Bug fix:** `w.remove('active')` → `w.classList.remove('active')` (the original would throw when a word link was un-highlighted).
2. Viewport meta no longer disables pinch-zoom (accessibility).
3. Added a canonical URL and a small "← Portfolio" link back to `/`.

All five acts, text, images, GSAP animation, the neural visualisation, modals and visitor reflections are untouched.

## Content integrity: items that need your confirmation

- **Degree title** is "B.Tech in Computer Science" per your latest brief; the first brief said "Computer Engineering". Match your certificate (`education` in `portfolioData.js`).
- **Joining date** is shown as August 2026 / Present, as given. Hero badge says "Apprentice at Volvo Group India".
- **Books:** all five titles and Amazon links are now set (fifth: *The Book That Introduced Me to Myself*; its subtitle, if any, is left blank). Your first brief wrote "Echoes of the Heart"; the latest wrote "Echoes of Heart". The latest is used (the archive text itself uses both).
- **Book years** (2024, 2025, June 2026) come from the archive's source labels. Confirm or clear.
- **Book descriptions** are empty and show "Description to be added". Nothing was invented. Excerpts shown are your own words copied from the Archive.
- **Photography statistics:** "~140 photos / 100K+ views" and "160+" conflict across briefs, so no figure is displayed (`photography.stats.showStats: false`).
- **Photos** are the 20 images referenced by the original archive, marked "attribution to be confirmed" until you set `verified: true`.
- **Projects** are four clearly labelled samples, not real work.
- **Certifications** show issuer names only (Microsoft, NVIDIA, Oracle, Tata); no titles or IDs were invented.
- The JSON-LD and `index.html` carry over `sameAs` links (Wikidata, Instagram) and a Google verification tag that were in your original archive file. Remove them if they are not yours.

## Still needed from you

real book covers · book descriptions · confirmed years · real projects (+ screenshots) · certification titles/years/URLs ·
confirmed photo counts · contact email (optional) · Web3Forms key · `public/og-image.jpg` (social share image; none was supplied).

## Features

Persona switcher (emphasises, never hides) · command palette (Ctrl/Cmd+K) · neural memory map with easter egg ·
canvas neural background · accessible modals (focus trap, Escape) · project filters/search/modal · 3D-tilt bookshelf with
excerpt reader and reading mode · masonry gallery + lightbox with arrow keys · scroll progress · back-to-top ·
desktop-only custom cursor · reduced-motion support throughout.

Not implemented: ambient sound (optional in the spec) and light/dark theme toggle (dark only).
