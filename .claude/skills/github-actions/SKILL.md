---
name: github-actions
description: Design or review a GitHub Actions workflow for this repo — general authoring hygiene (action version pinning, secrets, injection safety, least-privilege permissions) for any `.github/workflows/*.yml`. Use when the user asks to create, fix, harden, or extend a workflow. There is currently no deploy workflow in this repo — deployment is handled entirely by Vercel's own Git integration, outside GitHub Actions.
---

Act as the person responsible for CI hygiene in this repo. There is **no GitHub Actions deploy pipeline** to reason about here — don't invent one or assume a workflow's presence just because a `.github/workflows/` directory might exist.

## 0. How this repo actually deploys — and why that matters for any workflow you write

- **Hosted on Vercel**, connected via Vercel's own Git integration (configured on Vercel's side, not in this repo). Vercel auto-builds and deploys on push to `master` using its standard Nuxt SSR preset — not a static export, not `npm run generate`/`dist`. See root `CLAUDE.md`, "Deployment".
- **This repo previously had `.github/workflows/nuxtjs.yml`**, a GitHub Pages deploy workflow — it was removed (it targeted the wrong platform and had been silently failing for a long time before that: a deprecated `actions/upload-artifact@v3` dependency, a wrong output path, and ultimately GitHub Pages was never even enabled in the repo's Settings). Don't recreate a Pages/deploy workflow assuming it's still wanted — deployment is Vercel's job now. If a workflow file reappears requesting Pages, that's very likely someone confusing this repo with a different setup; check with the user before building on that assumption.
- If the user asks for a GitHub Actions workflow now, it's almost certainly for **CI checks** (lint/test on PRs), not deployment — Vercel already handles previews and production builds on its own.

## 1. Anti-patterns to catch (general hygiene, check on every `.yml` touched)

Adapted from [DaleStudy/skills](https://github.com/DaleStudy/skills/blob/main/skills/github-actions/SKILL.md) (MIT).

1. **Stale action versions.** Check the real latest tag before pinning, don't guess:
   ```bash
   gh release view --repo actions/checkout --json tagName --jq '.tagName'
   ```
   For security-sensitive workflows or lower-trust third-party actions, consider [pinning to a commit SHA](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#using-third-party-actions) instead of a tag.
2. **Hardcoded secrets.** Never write an API key, password, or token as a literal in the YAML — always `${{ secrets.NAME }}`, sourced from repo/org secrets. A lint/test-only workflow needs none by default. See [Using secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
3. **Injection via untrusted event data.** Interpolating `github.event.*` (issue/PR titles, comment text) directly into a `run:` shell command is a script-injection vector. Pass it through `env:` and reference the environment variable, not the `${{ }}` expression, inside the shell script. See [Script injections](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#understanding-the-risk-of-script-injections).
4. **Redundant setup for pre-installed tooling.** GitHub-hosted runners already ship Node.js/npm/npx, git, `gh`, curl, jq — a `setup-node` step is only needed for version pinning/caching, not because Node is otherwise missing.
5. **Cache key correctness.** Key a dependency cache on the lockfile (`hashFiles('package-lock.json')`), never on a build-output directory — `hashFiles` on a path that doesn't exist yet on a cold run resolves oddly.

**Least privilege:** declare `permissions:` at the job level with the narrowest scope needed — a lint/test job triggered on `pull_request` needs only `contents: read`. See [Modifying permissions for the GITHUB_TOKEN](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#modifying-the-permissions-for-the-github_token).

**Common triggers:**

```yaml
on:
  push: { branches: [master] } # this repo's stable branch, not main
  pull_request: { branches: [master] }
  workflow_dispatch:
```

## 2. If the user asks to add a CI (lint/test) workflow

- Job shape: `actions/checkout` → `actions/setup-node` (current major, check via `gh release view`) with `cache: npm` → `npm ci` → `npm run lint` / `npm run test`.
- `permissions: { contents: read }` is enough — there's no Pages/deploy step to authorize.
- Node 24 (`engines.node: "24.x.x"` in `package.json`).
- `npm run generate`'s `pregenerate` npm hook already calls `scripts/generate-icon-subset.mjs` — don't add a separate icon-generation step if a workflow ever runs `npm run generate` (root `CLAUDE.md`, "Icon subset generation").
- This would run independently of Vercel's own build/preview pipeline — it's an additional check, not something Vercel depends on or vice versa.

## 3. Writing or reviewing any workflow

- Comment the _why_, not the _what_.
- Never add `--no-verify`, disable any check, or skip a step to "make CI green" without understanding why it's failing first.
- No SSH keys, no rsync, no CMS post-deploy steps (`wp`/`drush`), no Pages/artifact-upload actions apply to this repo — if a request seems to assume any of that, the target is probably being confused with a different project.

## 4. After writing — checklist to hand back to the user

- [ ] Action versions checked against latest (`gh release view`), not just guessed
- [ ] `permissions:` minimal for what the job actually does
- [ ] No secret introduced unless the workflow genuinely needs one
- [ ] Confirmed with the user that this workflow is meant to supplement Vercel's deploy, not replace or duplicate it
