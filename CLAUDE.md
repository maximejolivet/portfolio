# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio - Nuxt 4 SSR, deployed as a static site to GitHub Pages via `nuxt generate`.

## Commands

```bash
npm run dev          # dev server on http://localhost:8000 (non-standard port)
npm run generate     # static build (used for deployment)
npm run build        # SSR build
npm run deploy       # build + generate in one step
npm run lint         # ESLint check
npm run lintfix      # ESLint --fix (also runs Prettier)
```

## Code Style

- No semicolons
- Single quotes
- Trailing commas in multiline
- Print width: 100
- 2-space indent
- TypeScript: `strict: false`, `strictNullChecks: true`

Run `npm run lintfix` to auto-fix. lint-staged runs it on staged files pre-commit.

## i18n

Two locales: French (`fr`, default) and English (`en-US`). URL prefix strategy: `/fr/...` and `/en/...`.

Translation files live in `i18n/`. Always update **both** `i18n/en.json` and `i18n/fr.json` when adding or changing UI text.

## Non-Obvious Gotchas

- **PDF.js**: `pdfjs-viewer-element` is a custom element excluded from Vite optimization - do not add it to `optimizeDeps`.
- **CSP with nonce**: `nuxt-security` enforces a strict Content Security Policy with nonce support. Adding inline scripts or styles requires nonce wiring.
- **TypeScript**: `tsconfig.json` extends `.nuxt/tsconfig.json` (auto-generated) - don't edit `.nuxt/tsconfig.json` directly.
- **`nuxt dev` fork pool crash**: `@nuxt/cli`'s dev-server "fork pool" warm-up (enabled by default) can crash with `spawn EBADF` on Node 24 shortly after startup. `npm run dev` runs `nuxt dev --no-fork` to disable it; only downside is slower full-process restarts on `nuxt.config.ts` changes.

## Deployment

Branch `master` triggers the GitHub Pages deployment via GitHub Actions (`npm run generate`). Working branch is `develop`. To deploy: open a PR from `develop` → `master`.

## Node

Requires Node 24 (`engines.node: "24.x.x"`).
