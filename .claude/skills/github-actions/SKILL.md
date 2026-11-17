---
name: github-actions
description: Design or review a GitHub Actions workflow for this repo — general authoring hygiene (action version pinning, secrets, injection safety, least-privilege permissions) for any `.github/workflows/*.yml`. Use when the user asks to create, fix, harden, or extend a workflow. There is currently no deploy workflow in this repo — deployment is handled entirely by Vercel's own Git integration, outside GitHub Actions.
---

**Any workflow you write here is a CI check (lint/test), never a deploy.** Vercel deploys this repo through its own Git integration. Don't invent a deploy pipeline.

## 1. Know how this repo deploys

- **Vercel** builds and deploys on every push to `master` (standard Nuxt SSR preset — not a static export, not `npm run generate`/`dist`). Configured on Vercel's side. See root `CLAUDE.md`, "Deployment".
- **Vercel also handles previews.** A workflow adds checks; Vercel doesn't depend on it.
- **`.github/workflows/nuxtjs.yml` (GitHub Pages deploy) was removed.** It targeted the wrong platform and failed silently for a long time (deprecated `actions/upload-artifact@v3`, wrong output path, Pages never enabled). Don't recreate it. A request for a Pages workflow probably confuses this repo with another — ask the user first.

## 2. Writing a CI (lint/test) workflow

1. `actions/checkout`
2. `actions/setup-node` — current major (check with `gh release view`), Node 24 (`engines.node: "24.x.x"`), `cache: npm`
3. `npm ci`
4. `npm run lint` / `npm run test`

- `permissions: { contents: read }` is enough.
- Running `npm run generate`? Its `pregenerate` hook already runs `scripts/generate-icon-subset.mjs` — no separate icon step.

Triggers:

```yaml
on:
  push: { branches: [master] } # this repo's stable branch, not main
  pull_request: { branches: [master] }
  workflow_dispatch:
```

## 3. Anti-patterns — check every `.yml` you touch

Adapted from [DaleStudy/skills](https://github.com/DaleStudy/skills/blob/main/skills/github-actions/SKILL.md) (MIT).

**Security**

1. **Hardcoded secrets.** Always `${{ secrets.NAME }}`, never a literal. A lint/test workflow needs none. [Using secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
2. **Script injection.** Never interpolate `github.event.*` (PR/issue titles, comments) into `run:`. Pass it via `env:` and use the env var in the shell. [Script injections](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#understanding-the-risk-of-script-injections).
3. **Broad permissions.** Declare `permissions:` per job, narrowest scope. A `pull_request` lint/test job needs only `contents: read`. [GITHUB_TOKEN permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#modifying-the-permissions-for-the-github_token).

**Correctness**

1. **Stale action versions.** Check the real latest tag, don't guess:
   ```bash
   gh release view --repo actions/checkout --json tagName --jq '.tagName'
   ```
   Security-sensitive or low-trust third-party action → [pin to a commit SHA](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#using-third-party-actions).
2. **Cache keys.** Key on the lockfile (`hashFiles('package-lock.json')`), never on a build-output directory (missing on a cold run).
3. **Redundant setup.** Hosted runners already ship Node/npm/npx, git, `gh`, curl, jq. `setup-node` is only for version pinning/caching.

## 4. Rules for any workflow

- Comment the _why_, not the _what_.
- Never add `--no-verify`, disable a check, or skip a step to turn CI green without understanding the failure.
- Doesn't apply here: SSH keys, rsync, CMS post-deploy (`wp`/`drush`), Pages/artifact-upload actions. A request assuming these probably targets another project.

## 5. Hand-back checklist

- [ ] Action versions checked with `gh release view`, not guessed
- [ ] `permissions:` minimal
- [ ] No secret unless genuinely needed
- [ ] User confirmed the workflow supplements Vercel's deploy, doesn't replace or duplicate it
