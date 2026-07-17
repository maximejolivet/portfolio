# Editorial Redesign - Design Spec

**Date:** 2026-07-03
**Status:** Approved, ready for implementation planning

## Context

The current portfolio (Nuxt 4, deployed to GitHub Pages) uses a dark theme built around a gold/emerald palette, glassmorphism (`glass`, `glass-strong` utilities), gradient/glow effects, and - most notably - a recurring "fake code editor" conceit: the Hero, About, Experience, and TechStack sections all render their content as syntax-highlighted JSON inside a `UiCodeWindow` component (e.g. `{ "name": "Maxime Jolivet", "role": "..." }`).

The owner (Maxime) finds this too generic/templated and not memorable, despite already being fairly built out with GSAP scroll animations (`AnimationsScrollReveal`, `AnimationsMagneticButton`, `AnimationsAnimatedGradientBg`) and `motion-v`.

Target audience: developer peers / tech community - the design can be bold and should demonstrate craft, but the chosen direction is restraint rather than more decoration.

## Goals

- Replace the dark gold/emerald/glassmorphism theme with a **dark, editorial-minimalist** design (docs-style: Vercel/Linear-like), matte black background, single amber accent color.
- Drop the "everything is a JSON code block" conceit. Content is presented as normal editorial typography; monospace type is reserved for small technical details (dates, tags, eyebrows).
- Reduce animation to near-zero: no scroll reveals, no decorative motion. Only short hover/focus transitions remain.
- Remove `gsap` and `motion-v` dependencies entirely - no more usages anywhere in the codebase after this work.
- Scope: Home (Hero, About, Experience, TechStack), Projects, CV, and Blog (`/blog`, `/blog/[slug]`) all get the new visual system. No page is left on the old style.
- Preserve existing i18n keys, routing, Nuxt config, and functional behavior (locale switching, PDF viewer, Supabase-backed blog) - this is a visual/styling redesign, not a content or architecture rewrite.

## Non-goals

- No new content/copy - reuse existing i18n strings (`i18n/en.json`, `i18n/fr.json`) as-is.
- No routing changes, no new pages beyond what exists today.
- No light-mode support (dark only, no toggle).
- No new backend/data changes to Supabase or the blog schema.

## Design Tokens

Defined in `assets/css/main.css` under `@theme`, replacing the current ink/gold/emerald tokens.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-surface` | `#141414` | Cards, alternated sections |
| `--color-border` | `white/10` (via `color-mix`) | Hairline borders everywhere (nav, cards, dividers) |
| `--color-text-primary` | `#f5f5f5` | Body/heading text |
| `--color-text-secondary` | `#a3a3a3` | Meta text, secondary copy (single named gray, not scattered opacity values) |
| `--color-accent` | `#f59e0b` | Links, CTA, focus rings, active nav state - the only accent color, never decorative |

**Typography:**
- Inter remains the body/heading font (weights 400/600/800). Headings get their hierarchy from size/weight, not color or gradient.
- `Space Grotesk` is removed (no longer needed as a separate display font).
- A monospace font (`JetBrains Mono` or `Geist Mono` - implementer's choice, pick one and use consistently) is added via the Google Fonts `<link>` in `nuxt.config.ts` and wired into `@theme` as `--font-mono`. Used only for: eyebrows/section labels, dates, tags/meta text - never for body paragraphs.

**Effects removed:** `glass`, `glass-strong`, `text-gradient`, `bg-gradient-aurora`, `glow-gold`, `glow-emerald`, `--animate-gradient-pan`, `--animate-float-slow` keyframes. Replaced by flat surfaces and 1px hairline borders. No blur, no glow, no gradients anywhere.

## Components

### Removed entirely (files deleted, all usages removed)

- `components/ui/CodeWindow.vue`
- `components/ui/GradientText.vue`
- `components/ui/GlowCard.vue`
- `components/animations/AnimatedGradientBg.vue`
- `components/animations/MagneticButton.vue`
- `components/animations/ScrollReveal.vue`
- `useParallax` composable (and its usage in `HeroSection.vue`)

### Kept, restyled only (no structural/prop changes beyond what's needed for the new tokens)

- `UiButton` - flat style: solid amber fill for `primary` variant, 1px border only for secondary. No glow/gradient.
- `UiSectionHeading` - eyebrow rendered in mono, uppercase, `text-secondary`; title in Inter 800, no gradient text.
- `UiContainer`, `UiAppIcon`, `UiBadge` - token/color updates only.
- `LayoutAppHeader`, `LayoutAppFooter`, `NavigationNavLink`, `NavigationMobileMenu`, `NavigationLocaleSwitcher` - thin bottom border instead of glass/blur; active nav state indicated by amber underline, not glow.
- `CardsClientSectorCard` - flat card, 1px border, no glow.
- `UiConstructionBanner` - recolored to new tokens.

### Content sections rewritten (structure changes, JSON conceit removed)

- `SectionsHeroSection.vue` - mono eyebrow (small label, not a `$ whoami` prompt), large Inter headline (name + role), bio as a plain paragraph, CTA button(s) below. No `UiCodeWindow`, no parallax background.
- `SectionsAboutSection.vue` - photo + plain bio paragraphs; skills/highlights rendered as a flat tag/pill list, not a JSON array.
- `SectionsExperienceSection.vue` - real vertical timeline: a thin vertical line with markers, date in mono to one side, role/company in Inter, description below. Replaces the fake JSON array structure but keeps iterating over `EXPERIENCE_TIMELINE` from `constants/experience.ts`.
- `SectionsTechStackSection.vue` - category heading (Inter) + description, followed by a flat wrapped grid of tag chips with icons. No surrounding "code" wrapper.
- `SectionsProjectsSection.vue` / `SectionsPageIntro.vue` - same tokens (headings, cards) applied; no structural change needed beyond removing `GradientText` usage.

### Pages

- `pages/index.vue` - same section order (Hero → About → Experience → TechStack), no code change beyond what components need.
- `pages/projects.vue` - no structural change; inherits restyled `PageIntro` + `ProjectsSection`.
- `pages/cv.vue` - background swapped to `#0a0a0a`; PDF viewer usage unchanged.
- `pages/blog/index.vue`, `pages/blog/[slug].vue` - restyled to the same tokens: article cards get flat borders instead of current styling, meta (date, tags) in mono, headings in Inter. No data-fetching/Supabase logic changes.

## Animation & Interaction

- No entrance/scroll animations anywhere - content renders immediately (this is what removing `ScrollReveal` everywhere accomplishes).
- The only motion left is short CSS transitions on hover/focus: border color change, link underline, button fill change. Duration 100–150ms, `ease-out`.
- All interactive elements (links, buttons, nav items) get a visible 2px amber focus ring - important given how little other visual feedback remains.
- `prefers-reduced-motion` media query in `main.css` is kept as-is (still correct, just now guarding very little).

## Technical Cleanup

- Remove `gsap` and `motion-v` from `package.json` dependencies; remove the lockfile entries via a normal `npm install` after removal.
- Delete the component/composable files listed above under "Removed entirely," and grep the codebase afterward to confirm no remaining imports/usages.
- Rewrite `assets/css/main.css`: new `@theme` block (tokens above), drop the removed `@utility` blocks and keyframes, add `--font-mono`.
- Update `nuxt.config.ts`'s Google Fonts `<link>`: drop Space Grotesk, add the chosen mono font family.
- i18n: no key renames. Existing `hero.*`, `aboutSection.*`, `experienceSection.*`, `techSection.*`, `projectsSection.*`, `projectsPage.*` keys in `i18n/en.json` / `i18n/fr.json` are reused as-is.

## Testing / QA

- `npm run lint` clean.
- `npm run generate` succeeds (static build used for GitHub Pages deploy).
- Manual visual check at 375px (mobile) and desktop widths, both `/fr` and `/en` locales.
- Contrast check: text-primary and text-secondary against `#0a0a0a` meet WCAG AA (4.5:1).
- Keyboard-only pass: tab through nav, hero CTA, project cards, blog links - confirm visible focus ring throughout.
- Confirm no leftover references to removed components/composables (`grep -r` for `CodeWindow`, `GradientText`, `GlowCard`, `AnimatedGradientBg`, `MagneticButton`, `ScrollReveal`, `useParallax`, `gsap`, `motion-v`).

## Open Risks / Notes

- Uncommitted work currently on `develop` (modified `HeroSection.vue`, `AboutSection.vue`, `TechStackSection.vue`, new `ExperienceSection.vue`/`CodeWindow.vue`/`constants/experience.ts`) will be superseded/discarded per the owner's explicit decision - not carried forward.
- Choice between JetBrains Mono and Geist Mono is left to the implementer; pick one, use it consistently, and add only the weights actually used (avoid over-preloading fonts per the project's existing font-loading pattern).
