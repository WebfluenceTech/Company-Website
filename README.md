# Meridian. Company Website

A premium website for **Meridian**, a fictional senior software engineering firm
(San Francisco · New York) specializing in AI, SaaS, enterprise platforms, web/mobile,
cloud, and automation. Built as a brand, product, and engineering design study.

## Running it

Zero dependencies, no build step. It's a static site.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly, or deploy the folder to any static host
(GitHub Pages, Vercel, Netlify, Cloudflare Pages).

## Stack

- Hand-written HTML, CSS, and vanilla JavaScript. No frameworks, no libraries.
- Fonts: Inter (UI), Instrument Serif (display accents), JetBrains Mono (code) via Google Fonts.
- Interactions: IntersectionObserver scroll reveals, ARIA-compliant tabs with roving
  tabindex, animated stat counters. All gated behind `prefers-reduced-motion`.
- The hero "product console", agent-pipeline canvas, and code window are real DOM/CSS/SVG,
  not screenshots.

## Design system

| Token | Value |
|---|---|
| Canvas | `#05080f` deep-space navy, layered surfaces, 1px hairline borders |
| Accent | Aurora gradient `#4cd6ff → #a78bfa`, used surgically |
| Type | Inter + Instrument Serif italic accent words |
| Motion | 150 to 700ms ease-out reveals, confirm-not-decorate |

Design rationale and the competitive analysis behind it live in
[`docs/DESIGN-DIRECTION.md`](docs/DESIGN-DIRECTION.md) and
[`docs/DESIGN-INSPIRATION-RESEARCH.md`](docs/DESIGN-INSPIRATION-RESEARCH.md).

## Honesty note

Meridian is not a real company. All clients, people, testimonials, and metrics are
invented and internally consistent; a disclosure appears in the site footer.
