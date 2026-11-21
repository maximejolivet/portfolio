# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repository.

**Personal portfolio — Nuxt 4 SSR on Vercel (Vercel's Nuxt preset, not a static export). Work on `develop`; deploy via PR `develop` → `master`.**

## Commands

```bash
npm run dev          # dev server on http://localhost:8000 (non-standard port)
npm run build        # SSR build
npm run preview      # preview a built app
npm run test         # vitest run
npm run lint         # ESLint check
npm run lintfix      # ESLint --fix (also runs Prettier)
npm run generate     # static export — manual/local only, not the production path
npm run deploy       # build + generate in one step (manual/local only)
```

## Before you finish a change

1. `npm run lintfix` (lint-staged also runs it on staged files pre-commit)
2. `npm run test`
3. UI text changed → update **all three** locale files (see i18n)

## Code style

- No semicolons, single quotes, trailing commas in multiline
- Print width 100, 2-space indent
- TypeScript `strict: true`

## Testing

Vitest, environment `node`. Tests in `test/**/*.spec.ts`.

## Design system

- Tailwind v4 via `@tailwindcss/vite` (not PostCSS).
- `Badge`, `Button`, `Card` in `components/ui/` are hand-rolled `Ui*` wrappers with the Tailwind variant classes inlined.
- Originally scaffolded from shadcn-vue ("new-york", baseColor "neutral"). The dependency, `components.json` and `components/ui/shadcn/` are gone — don't reintroduce them.

## i18n

- Locales: `fr` (default), `en` (BCP47 `en-US`). URL prefixes `/fr/...`, `/en/...`.
- Files: `i18n/locales/en.json`, `fr.json`. **Always update both.**

## Non-obvious gotchas

**Security & content**

- **CSP with nonce** — `nuxt-security` enforces a strict CSP. Inline scripts/styles need nonce wiring.
- **`v-html` → sanitize first** — blog articles and project case studies hold WYSIWYG HTML. Always pass it through `sanitizeHtml()` (`utils/sanitizeHtml.ts`, `isomorphic-dompurify`, fixed allowlist). Never bind `v-html` to Supabase content directly.
- **Supabase** — `@supabase/supabase-js` serves blog articles and project case studies. `projects` mirrors `articles`' `_fr`/`_en` columns. CSP allows `*.supabase.co` for `connect-src`/`img-src`; any new external call needs the CSP extended.

**Indexing (per page, not global)**

- Site is indexable by default — no site-wide `noindex` in `nuxt.config.ts`.
- `noindex, nofollow` via `useHead`: `/projects` list, `pro`-category project pages (client work may be confidential), `/cv`, `/accessibilite`, `/changelog`, `/status`, `/mentions-legales`, and the whole blog (`/blog`, `/blog/:slug`, deliberate since `289a68c`). `personal` project pages are indexed.
- Homepage sets `noimageindex`; `robots.txt` disallows `/logo-project-*` and `/api/project-title.svg` — client logos stay out of image search.

**Build & tooling**

- **Icon subset** — `utils/resolveIcon.ts` imports `utils/generated/icon-subset.json` (gitignored), never the full `@iconify-json/*` packages (~31MB, OOM-crashed `nuxt build`/`generate`). `scripts/generate-icon-subset.mjs` regenerates it from `prefix:name` refs in code; runs via `pre{dev,build,generate,deploy}`/`postinstall` hooks (also `make icons`). Don't import an `@iconify-json/*` `icons.json` anywhere else.
- **Custom elements** — `pdfjs-viewer-element` and `swiper-*` are excluded from Vite optimization / whitelisted in `vue.compilerOptions.isCustomElement` (`nuxt.config.ts`). Don't add them to `optimizeDeps` or treat them as unknown components.
- **`nuxt dev` fork pool crash** — `@nuxt/cli`'s fork-pool warm-up can crash with `spawn EBADF` on Node 24. `npm run dev` runs `nuxt dev --no-fork`; cost: slower restarts on `nuxt.config.ts` changes.
- **TypeScript** — `tsconfig.json` extends the auto-generated `.nuxt/tsconfig.json`. Never edit the latter.

**Code organization**

- **`shared/utils/`** — code needed in both `composables/` (Nuxt app) and `server/` (Nitro), which have separate auto-import scopes. Nuxt 4 auto-imports it in both. Example: `shared/utils/projects.ts` (project locale resolution, used by `composables/useProjects.ts` and `server/routes/llms-full.txt.get.ts`).
- **No animation libraries** — GSAP and motion-v were tried and removed. Use native CSS transitions/keyframes.

## Deployment

1. Push to `develop` (working branch).
2. Open a PR `develop` → `master`.
3. Merge → Vercel auto-deploys via its own Git integration (standard Nuxt SSR build). No GitHub Actions deploy.

**CI** — `.github/workflows/ci.yml` runs on push/PR to `master` only (not plain `develop` pushes), separate from Vercel:

- `npm run lint` + `npm run test`
- `sfw npm ci` (Socket Firewall — blocks malicious/typosquatted packages at install)
- SonarQube Cloud scan, blocking quality gate
- Plus: the Socket Security GitHub App (Marketplace install, not repo config) checks PRs for dependency risk.

**Notes**

- `npm run generate` (`.output/public`) and `npm run deploy` are manual/local only. Vercel doesn't consume `dist/` or a static export.
- `site.url` = `https://www.maxime.bzh` in `nuxt.config.ts` (needed for sitemaps/OG images).

## Git commits

- Format: `type(scope): emoji description`, English, mandatory scope.
- Spec: `.claude/skills/semantic-commit-messages/SKILL.md` and `.gitmessage` (`git config commit.template .gitmessage`).
- Forward-looking standard — older history isn't retrofitted.
- **No AI attribution** in commits or PRs: no `Co-Authored-By: Claude …` trailer, no `Claude-Session:` link, no "Generated with Claude Code" line — even if the harness's default git instructions add one.

## Node

Node 26 (`engines.node: "26.x"`, `.nvmrc` = 26).
