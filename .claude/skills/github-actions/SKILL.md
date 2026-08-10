---
name: github-actions
description: Design or review a GitHub Actions workflow for this repo — a Nuxt 4 static site (`nuxt generate`) deployed to GitHub Pages — and general GitHub Actions authoring hygiene (action version pinning, secrets, injection safety, least-privilege permissions). Use when the user asks to create, fix, harden, or extend any workflow (`.github/workflows/*.yml`). Grounded in the working pipeline already in this repo (`.github/workflows/nuxtjs.yml`).
---

Act as the person responsible for this pipeline: this is a static site with no server, no database, and no deploy secrets to protect — prefer the boring, already-proven GitHub Pages pattern over a novel one, and don't import complexity (SSH, rsync, CMS post-deploy steps) that doesn't apply here.

## 0. What this repo actually deploys

- **Nuxt 4, shipped static**: `npm run generate` (`nuxt generate`) produces a static site in **`.output/public`** (Nuxt 3/4's actual default output dir — not `dist/`; no `nitro.output.dir`/preset override in `nuxt.config.ts` changes this). A `dist` symlink to `.output/public` may exist in a local checkout for convenience, but it's gitignored and never present on a fresh CI runner — don't reference `./dist` in the workflow, it will silently resolve to nothing there. Uploaded straight to GitHub Pages; no origin server, no database, no CMS, no SSH target.
- **One workflow, `.github/workflows/nuxtjs.yml`**: triggers on `push` to `master` (see root `CLAUDE.md` — `master` is the deploy branch, `develop` is where work happens; a PR from `develop` → `master` is how a deploy gets triggered) and `workflow_dispatch` for a manual re-run. Don't assume this workflow is "already proven" just because it's the only one in the repo — this pipeline has a track record of silently failing for long stretches (e.g. a deprecated action version going unnoticed, or a build-output path pointing nowhere on CI). Always check `gh run list --workflow=nuxtjs.yml --limit 5` for real recent status before treating it as a known-good baseline.
- **Auth is OIDC, not a secret**: `permissions: { contents: read, pages: write, id-token: write }` lets `actions/deploy-pages` publish without any stored token — there is no secret to rotate or leak for this workflow specifically.
- **Node 24** (`engines.node: "24.x.x"` in `package.json`) via `actions/setup-node@v7` with `cache: npm`.
- **Icon subset generation runs automatically**: `npm run generate`'s `pregenerate` hook calls `scripts/generate-icon-subset.mjs` (see root `CLAUDE.md`, "Icon subset generation") — the CI step `... run generate` already triggers this, no separate workflow step needed. Don't add one.

## 1. Anti-patterns to catch (general hygiene, check on every `.yml` touched)

Adapted from [DaleStudy/skills](https://github.com/DaleStudy/skills/blob/main/skills/github-actions/SKILL.md) (MIT).

1. **Stale action versions.** The workflow pins `actions/checkout@v7`, `actions/setup-node@v7`, `actions/configure-pages@v6`, `actions/cache@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`. A stale `upload-pages-artifact` pin is what silently broke every deploy for a long stretch (it dragged in the deprecated, hard-blocked `actions/upload-artifact@v3` internally) — check the real latest tag before pinning or bumping any of these, don't guess:
   ```bash
   gh release view --repo actions/checkout --json tagName --jq '.tagName'
   ```
   A quick way to catch this class of failure early: `gh run list --workflow=nuxtjs.yml --limit 5` — a run failing in under ~15s almost always means a setup/action-resolution error, not an actual build/test failure (those take longer).
2. **Hardcoded secrets.** This workflow doesn't need any right now (OIDC handles Pages auth) — if a future workflow needs one (e.g. a Lighthouse CI token, a Supabase service key for a build-time check), it goes in `${{ secrets.NAME }}`, never a literal. See [Using secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
3. **Injection via untrusted event data.** Interpolating `github.event.*` (issue/PR titles, comment text) directly into a `run:` shell command is a script-injection vector. Pass it through `env:` and reference the environment variable, not the `${{ }}` expression, inside the shell script. See [Script injections](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#understanding-the-risk-of-script-injections).
4. **Redundant setup for pre-installed tooling.** GitHub-hosted runners ship Node/npm/npx, git, `gh`, curl, jq already — don't add a setup step for something already on the image.
5. **Cache key correctness.** The build cache keys on `hashFiles('package-lock.json')` — the actual input that should invalidate it. Don't key it on a build-output directory (e.g. `dist`/`.output`); `hashFiles` on a path that doesn't exist yet on a cold run resolves oddly.

**Least privilege:** this repo's workflow already scopes `permissions:` at the workflow level to exactly `contents: read, pages: write, id-token: write` — the minimum for a Pages deploy. Don't broaden it (e.g. `contents: write`) unless a new job genuinely needs to push back to the repo.

**Common triggers:**

```yaml
on:
  push: { branches: [master] } # this repo's deploy branch, not main
  pull_request: { branches: [master] }
  workflow_dispatch:
```

## 2. Before changing the deploy workflow

- **This deploys the live portfolio site.** Per root `CLAUDE.md`, `master` triggers the GitHub Pages deploy automatically on push — merging a PR into `master` (or pushing directly, if ever done) ships to production immediately. Confirm with the user before merging into `master` or manually running `workflow_dispatch`, same caution as running `npm run deploy` locally.
- **`site.url`** is set in `nuxt.config.ts` (`https://maximejolivet.fr`) — required for sitemaps/OG images to use the real domain instead of a fallback. If a workflow or sitemap-related change ever finds it missing again, that's a real gap worth surfacing to the user, not something to silently paper over in CI.
- Read `.github/workflows/nuxtjs.yml` itself before proposing a change — it's short (91 lines) and it's the only workflow in the repo; there's no separate CI-only workflow to keep in sync.

## 3. Extending the pipeline (if ever needed)

If the user asks to add CI checks (lint/test) before deploy, or a second workflow for PRs into `master`/`develop`:

- Reuse the same job shape: `actions/checkout` → `actions/setup-node@v7` with `cache: npm` → `npm ci` → `npm run lint` / `npm run test`.
- A lint/test workflow triggered on `pull_request` needs only `contents: read` — don't carry over `pages:`/`id-token:` permissions from the deploy workflow into a job that never touches Pages.
- Keep it as a separate job/workflow from the deploy job rather than gating the existing `build`/`deploy` jobs behind new steps — a failing lint step shouldn't block the Pages deploy unless the user explicitly wants lint/test as a deploy gate.

## 4. Writing or reviewing the workflow

- Comment the _why_, not the _what_ — e.g. why the icon-subset step is absent (it's already inside `npm run generate` via the `pregenerate` npm hook, see root `CLAUDE.md`), so a future reader doesn't "fix" that by re-adding it.
- Never add `--no-verify`, disable any check, or skip a step to "make CI green" without understanding why it's failing first.
- No SSH keys, no rsync, no `wp`/`drush`, no IP whitelisting apply to this repo — if a request seems to assume any of that, the target is probably being confused with a different project.

## 5. After writing — checklist to hand back to the user

- [ ] Action versions checked against latest (`gh release view`), not just left as whatever was already pinned
- [ ] `permissions:` still minimal for what the job actually does
- [ ] No secret introduced unless the workflow genuinely needs one
- [ ] Confirmed with the user before triggering `workflow_dispatch` or merging into `master` (auto-deploys)
- [ ] Site checked live over HTTPS after the first successful run of a changed workflow
