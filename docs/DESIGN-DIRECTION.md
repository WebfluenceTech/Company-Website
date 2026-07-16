# Design Direction — "Meridian"

The synthesis document behind this website. Part 1 is the brutal critique of the four reference
sites (from the perspective of a CTO / hiring manager scoring the engineers behind them). Part 2
is what the best-in-class sites do that the weak ones don't. Part 3 is the original direction
this site executes.

> Note: live browsing was unavailable in the build environment, so the agency-site critique is
> based on the established patterns of this class of site and on prior research
> (see `DESIGN-INSPIRATION-RESEARCH.md`). Linear/Stripe/Vercel/etc. analysis is from deep
> familiarity with those sites.

---

## 1. The critique, as a CTO reading a vendor's website

### webfluence.tech / netsolutions.com.pk — the agency template problem

Sites in this class share a fingerprint, and every element of it costs credibility:

- **Template DNA.** WordPress/Elementor layouts, off-the-shelf icon packs, stock photos of
  people pointing at whiteboards, and gradient blobs from a UI kit. A CTO reads this as: the
  team assembles, it doesn't design. If your own storefront is a template, my product will be too.
- **Say-nothing copy.** "We provide innovative solutions", "best-in-class services",
  "your success is our mission." Zero specificity, zero point of view, no numbers, no named
  outcomes. Compare with Ramp: "Time is money. Save both."
- **Service-list sprawl.** 14 services (SEO! Graphic design! Blockchain! Game dev!) signals
  a body shop, not a firm with a thesis. Depth beats breadth for trust.
- **Fake or unverifiable trust signals.** Logo walls of companies that plausibly never signed,
  "500+ happy clients", star ratings with no source. Enterprise buyers verify; one false
  signal poisons all the real ones.
- **Craft misses.** Inconsistent spacing scale, 3+ font families, orphaned headings, layout
  shift on load, carousel hero (nobody reads slide 2), WhatsApp bubble over the CTA, footers
  stuffed with keyword links. Individually small; together they read as "no one here has taste."
- **No product surface anywhere.** Agencies that build software but never *show* software —
  only mockup-in-a-MacBook stock frames — leave the one question a buyer has unanswered.

### linear.app — what world-class actually looks like (and its one trap)

Linear earns trust in the first viewport: a real product screenshot rendered with obsessive
lighting, one precise sentence ("Linear is a purpose-built tool for planning and building
products"), customer logos that are verifiable, and motion that only ever confirms hierarchy.
Every pixel implies "the product is built by these same hands." The trap: it is now the most
cloned site on the internet. Shipping a recognizable Linear clone reads as "can copy, can't
design" — the synthesis must be original.

### What the leaders (Stripe, Vercel, Raycast, Notion, Supabase, Figma, Mercury, Attio) share

1. **The product is the hero.** Real UI — rendered live or shot with care — not illustrations
   of abstract "technology."
2. **One accent color, held with discipline.** Raycast red, Supabase green, Stripe blurple.
   Restraint is the luxury signal.
3. **Typography does the branding.** One superb family, a strict scale, tight tracking on
   display sizes, generous line-height on body.
4. **Numbers over adjectives.** "38 hours/week saved", "99.99% uptime" — never "high quality."
5. **Motion as confirmation, not decoration.** 150–400ms reveals, scroll-triggered once,
   `prefers-reduced-motion` respected.
6. **The footer is a craft signal.** Stripe's footer is famous for a reason — it proves someone
   cared about the last pixel on the page.
7. **Specific institutional voice.** Short declarative sentences, no exclamation marks,
   no "we're passionate about."

---

## 2. The original direction executed here

**Brand:** *Meridian* — a fictional senior software engineering firm, San Francisco + New York.
AI-native products, enterprise platforms, cloud infrastructure, automation. Positioned as
"the craft of a product company, not an agency."

**Visual system**
- **Canvas:** near-black warm charcoal (`#0B0C0F`), layered surfaces, 1px hairline borders at
  8–12% white. Not Linear-purple, not Vercel-mono.
- **Accent:** a single *ember* gradient (copper → amber, `#FF7A45 → #FFB864`) used surgically:
  the logo mark, primary CTA, live-status dots, one italic word per headline. Warmth against
  charcoal is deliberately distinct from the cold-blue/purple SaaS default.
- **Type:** Inter for UI/body (400/500/600, tight display tracking) + Instrument Serif italic
  for a single accent word in display headlines — the editorial move (Anthropic-adjacent)
  that separates it from the geometric-sans monoculture.
- **Texture:** faint dot-grid and radial glows only; no stock photography anywhere on the site.

**Structural spine (one flagship page, executed completely)**
Nav → Hero with a *CSS-rendered* product console (real DOM, not a screenshot) → fictional-but-
plausible client wordmarks → capability tabs (AI, SaaS, Enterprise, Mobile, Cloud, Automation)
→ three deep-dive vignettes (agent pipeline canvas, code-as-design, metrics) → case studies
with hard numbers → process timeline → testimonials → stats band → careers teaser → CTA →
Stripe-grade footer.

**Trust & honesty rules (from the recruiter analysis)**
- All clients, testimonials, and metrics are fictional and internally consistent; no real
  company logos, no fabricated compliance badges.
- A small, elegant footer disclosure states the company is a fictional design/engineering
  showcase — the reveal, not a weakness.

**Engineering bar**
- Zero-dependency static site (HTML/CSS/vanilla JS). No frameworks, no build step.
- Scroll reveals via IntersectionObserver, tabs, counters; everything gated behind
  `prefers-reduced-motion`.
- Semantic landmarks, keyboard-operable controls, WCAG-conscious contrast, no layout shift.
