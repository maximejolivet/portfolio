# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio - Nuxt 4 SSR, deployed to Vercel (standard SSR build via Vercel's Nuxt preset, not a static export).

## Commands

```bash
npm run dev          # dev server on http://localhost:8000 (non-standard port)
npm run generate     # static build (used for deployment)
npm run build        # SSR build
npm run preview      # preview a built app
npm run deploy       # build + generate in one step
npm run test         # vitest run
npm run lint         # ESLint check
npm run lintfix      # ESLint --fix (also runs Prettier)
```

## Code Style

- No semicolons
- Single quotes
- Trailing commas in multiline
- Print width: 100
- 2-space indent
- TypeScript: `strict: true`

Run `npm run lintfix` to auto-fix. lint-staged runs it on staged files pre-commit.

## Testing

Vitest. Tests live in `test/**/*.spec.ts`, environment `node`. Run with `npm run test`.

## Design System

Tailwind v4 (via `@tailwindcss/vite`, not PostCSS) + shadcn-vue (`components.json`, style "new-york", baseColor "neutral"). shadcn components live in `components/ui/shadcn/` and are excluded from Nuxt's component auto-import (`nuxt.config.ts` dirs config) - import them via the `@/components/ui/shadcn` alias, not auto-import.

## i18n

Two locales: French (`fr`, default) and English (`en`, BCP47 `en-US`). URL prefix strategy: `/fr/...` and `/en/...`.

Translation files live in `i18n/locales/`. Always update **both** `i18n/locales/en.json` and `i18n/locales/fr.json` when adding or changing UI text.

## Non-Obvious Gotchas

- **PDF.js / Swiper custom elements**: `pdfjs-viewer-element` and `swiper-*` tags are custom elements excluded from Vite optimization / whitelisted in `vue.compilerOptions.isCustomElement` (`nuxt.config.ts`) - do not add them to `optimizeDeps` or treat them as unknown components.
- **CSP with nonce**: `nuxt-security` enforces a strict Content Security Policy with nonce support. Adding inline scripts or styles requires nonce wiring.
- **Supabase**: `@supabase/supabase-js` powers blog/article data. The CSP explicitly allows `*.supabase.co` for `connect-src`/`img-src` - new external calls will need the CSP extended too.
- **No animation libraries**: GSAP and motion-v were deliberately removed after being tried - use native CSS transitions/keyframes instead of reintroducing an animation library.
- **TypeScript**: `tsconfig.json` extends `.nuxt/tsconfig.json` (auto-generated) - don't edit `.nuxt/tsconfig.json` directly.
- **`nuxt dev` fork pool crash**: `@nuxt/cli`'s dev-server "fork pool" warm-up (enabled by default) can crash with `spawn EBADF` on Node 24 shortly after startup. `npm run dev` runs `nuxt dev --no-fork` to disable it; only downside is slower full-process restarts on `nuxt.config.ts` changes.
- **Deliberately deindexed**: the site sets `robots: noindex, nofollow` in `app.head.meta` (`nuxt.config.ts`) - intentional, not a bug.
- **Icon subset generation**: `utils/resolveIcon.ts` imports `utils/generated/icon-subset.json` (gitignored), not the full `@iconify-json/*` packages directly - those total ~31MB and previously OOM-crashed `nuxt build`/`nuxt generate`. `scripts/generate-icon-subset.mjs` scans the code for `prefix:name` icon refs and regenerates the subset; it runs automatically via `pre{dev,build,generate,deploy}`/`postinstall` npm hooks (also `make icons`). Don't import an `@iconify-json/*` package's `icons.json` directly elsewhere.

## Deployment

Hosted on **Vercel**, connected via Vercel's own Git integration (not a GitHub Actions workflow — there is none in this repo). Vercel auto-deploys on push to `master` using its standard Nuxt SSR build. Working branch is `develop`. To deploy: open a PR from `develop` → `master`.

- `npm run generate` (static export, `.output/public`) and `npm run deploy` still exist as local/manual commands but are **not** the production deploy path — Vercel builds SSR directly from `master`, it doesn't consume `dist/` or a static export.
- `site.url` is set to `https://www.maxime.bzh` in `nuxt.config.ts` (required for sitemaps/OG images).

## Git commits

Commit message convention documented in `.claude/skills/semantic-commit-messages/SKILL.md` and `.gitmessage` (activated via `git config commit.template .gitmessage`): `type(scope): emoji description`, English, mandatory scope. This is a forward-looking standard, not retrofitted onto older history.

## Node

Requires Node 24 (`engines.node: "24.x.x"`).
