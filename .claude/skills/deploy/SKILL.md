---
name: deploy
description: Build the static site and open a PR from develop → master to publish to GitHub Pages. Use when ready to ship changes live.
disable-model-invocation: true
---

Deploy the portfolio to GitHub Pages.

Steps:
1. Confirm the working branch is `develop` (or a feature branch merged into develop).
2. Run `npm run deploy` to build and generate the static site locally. Fix any build errors before continuing.
3. Commit any uncommitted changes with a clear message.
4. Push the current branch to origin.
5. Open a PR from `develop` → `master` using `gh pr create --base master --head develop --title "Deploy: <brief description>" --body "Deploying to GitHub Pages."`.
6. Report the PR URL.

The GitHub Actions workflow on `master` will trigger automatically once the PR is merged and run `npm run generate` to publish.
