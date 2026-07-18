# DESIGN.md

The visual system for the impeccable redesign. Written by /impeccable document.
Every agent and every commit on this branch stays inside this system.

## Concept

**"The engineering house journal."** A light, printed-feeling page, set on a
Swiss grid with hairline ink rules, where the only full-dark surfaces are the
product screens themselves: consoles, terminals, and code, floating on paper
like plates in a technical manual. Meridian's previous aurora theme treated
the whole site as a screen; this one treats the site as the *document about*
the screens.

## Color

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F6F5F1` | Page ground. Warm-neutral, not cream. |
| `--paper-2` | `#EDEBE4` | Raised/alt sections. |
| `--ink` | `#181A1F` | Headings, primary buttons, rules at low alpha. |
| `--ink-2` | `#3F444E` | Body text. 8.5:1 on paper. |
| `--ink-3` | `#5C6270` | Captions and labels. 5.6:1 on paper. |
| `--cobalt` | `#2036C7` | The one working color. Links, kickers, live marks. 7.6:1 on paper. |
| `--screen` | `#14161C` | Dark plates (console, terminal, code) only. |
| `--screen-text-3` | `#9BA3B2` | Muted text on plates. ≥5.5:1 on `--screen`. |
| `--ok` | `#1A7F4B` | Success on paper. `#4ADE80` stays on dark plates. |

No gradients anywhere. No glows. Color is applied, never diffused.

## Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Archivo** (variable, width 125, weight 650–750) | Expanded grotesk. Tight leading, -0.02em. |
| Body / UI | **Instrument Sans** | Humanist, 400/500/600. Never Inter. |
| Accent words | **Instrument Serif italic** | Solid cobalt. Never gradient-filled. |
| Data / code | **IBM Plex Mono** | Tabular numerals for all metrics. |

Scale: 13 / 15 / 17 / 22 / 28 / 40 / 56 / 76. Body 17px, line-height 1.65,
measure ≤ 68ch.

## Structure & layout

- 12-column grid, max width 1200px, left-aligned. Nothing centered except
  the final CTA.
- Hairline rules `1px solid rgba(24,26,31,0.14)` do the separating; cards are
  rare and never nested.
- Section headers: a numbered figure style ("Fig. 03 · Selected work") echoing
  technical manuals; numerals in mono cobalt.
- Dark plates get a 1px ink border and an offset cobalt registration frame,
  like a printed plate slightly out of register. This is the signature.

## Components

- **Buttons:** primary = ink fill, paper text, 2px radius. Secondary = 1px ink
  outline. Hover: translate up 1px + underline, no glow, no sheen.
- **Nav:** paper with hairline bottom rule on scroll. Active section
  underlined in cobalt, 2px.
- **Metrics:** mono, ink, with cobalt figure numbers. Counters keep their
  animation.
- **Console / terminal / code plates:** keep their dark `--screen` ground and
  all live behavior (ticking metrics, streaming feed, typing deploy, packets,
  line-step). Muted text on plates lifted to AA.
- **Forms:** paper inputs with ink hairlines; focus = cobalt 2px underline.
  Budget chips: outline → ink fill when selected.

## Motion

Confirm, never decorate. 200–500ms, ease-out. Keep: reveals, counters, live
console, terminal, packets, uptime bars, marquee. Remove: particle
constellation, gradient shimmer, button sheen, 3D tilt. Everything static
under prefers-reduced-motion.

## The detector is the contract

`npx impeccable detect` runs on every page of this branch. The aurora
baseline scored 59 anti-patterns. This system exists to score near zero:
no gradient text, no dark glow, no cyan-on-dark, no sub-AA contrast, no
nested cards, varied section kickers, no layout-property transitions.

## Detect results (final)

Aurora baseline: 59 anti-patterns. This branch: 6, all verified false
positives of the static engine, with browser-computed proof:

- 4 × low-contrast "#565d6b on #181a1f": the engine reads a parent's *text*
  color (`.workcard-big`, `.node`) as the background of its `small` child.
  A Playwright pass computing real ancestor backgrounds finds 0 sub-AA text
  nodes across all 12 pages.
- 2 × flat-type-hierarchy: the engine cannot evaluate `clamp()`; rendered
  scale ratios are 4.9:1 to 6.9:1 per page (browser-measured).

Every genuine finding was fixed: side-tab borders, gradient text, dark glow,
cyan-on-dark, sub-12px text, uppercase body runs, skipped headings, nested
cards, decorative numbering, cramped plate padding, overflow clipping,
overused faces.
