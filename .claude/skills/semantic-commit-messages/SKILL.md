---
name: semantic-commit-messages
description: "Write git commit messages in this repo's adopted format: `<type>(<scope>): <emoji> <description>` — full Conventional Commits type list (feat/fix/refactor/perf/docs/style/test/build/ci/chore/revert/security), mandatory scope, English description. Use whenever the user asks for a commit, or asks to write/review a commit message. This is a deliberately adopted standard (see `.gitmessage` at repo root), not auto-detected from old history — most pre-existing commits predate it and don't follow this format."
---

Prefix every commit subject with a **type** and a **scope**, both mandatory, before the description. This is the standard adopted for this repo going forward (see the commit template at `.gitmessage`, activated via `git config commit.template .gitmessage`) — it is **not** derived from this repo's older history, which is mostly plain sentences or a looser `type: description` with no scope/emoji. Don't "match old commits" here; apply this format to every new commit regardless of what surrounding history looks like.

There is no commitlint / `commit-msg` hook enforcing this mechanically — `.husky/pre-commit` only bumps the patch version and refreshes a README badge (see `scripts/update-release-log.mjs`). Compliance is on the person/agent writing the message, not a tool.

## Format

```
<type>(<scope>): <emoji> <description>

<optional body>

<optional footer trailers>
```

- `<scope>` — **mandatory**, the area of the codebase touched. Not an issue identifier. For this repo, natural scopes are component/feature areas: `footer`, `hero`, `nav`, `i18n`, `deploy`, `ci`, `config`, `seo`, `icons`, `blog`, `projects`, `cv`, `a11y`, `theme`, `deps`. Pick the narrowest one that fits; for a change spanning several, use the broadest sensible one (`repo`, `config`) rather than omitting it.
- `<emoji>` — optional but recommended, right after the colon, per `<type>` (table below).
- `<description>` — mandatory, English, imperative present tense ("add", not "added"/"adds"), no capitalized first letter, no trailing period, ≤ 72 chars.
- `<body>` — optional, explains *what* and *why*, not *how*. Blank line separates it from the subject.
- `<footer>` — optional.

```
feat(footer): ✨ add Brittany flag and made-in tagline
^--^ ^-----^  ^--^--------------------------------------^
|    |        |  |
|    |        |  +-> Description: imperative, present tense, no cap, no period.
|    |        +----> Emoji: matches the type, see table below.
|    +-------------> Scope: mandatory, area touched.
+------------------> Type: see table below.
```

## Types

| Type | Emoji | When to use it |
|---|---|---|
| `feat` | ✨ | New feature or user-visible change |
| `fix` | 🐛 | Bug fix |
| `refactor` | ♻️ | Rewrites or restructures code with **no** behavior change |
| `perf` | ⚡️ | Performance improvement (still no behavior change) |
| `docs` | 📝 | Documentation only (README, CLAUDE.md, code comments) |
| `style` | 💄 | Formatting only, no logic change |
| `test` | ✅ | Adds or fixes tests (`test/**/*.spec.ts`, vitest) |
| `build` | 📦 | Dependencies, build config (`vite`, `nuxt.config.ts`, `package.json`) |
| `ci` | 👷 | CI/CD pipelines — see `.github/workflows/nuxtjs.yml` |
| `chore` | 🔧 | Misc maintenance/config, everything else |
| `revert` | ⏪ | Reverts a previous commit |
| `security` | 🔒 | Fix that specifically closes a vulnerability |

## Footer trailers

One per line, below the body, delete whichever doesn't apply:

- `Verified-by:` — real counts from what was actually run before committing: `Verified-by: ESLint 0 errors, vitest 6 passed`. Run `npm run lint` / `npm run test` (or `make lint` / `make test`) and read the actual numbers off their output — never write `0` without having run the command. This repo has no PHPStan/Pint/composer audit — those belong to a different (PHP) project, don't carry them over.
- `Refs:` — GitHub issue number if relevant (`Refs #123`).
- `Closes:` — GitHub issue number to auto-close on merge (`Closes #123`).
- `Co-authored-by:` — credit a pair or contributor who isn't the committer — `Co-authored-by: <name> <email>`.

## Breaking changes

- `!` right after the type/scope: `feat(routing)!: ✨ change project URL structure`
- Described in the footer when the description alone isn't enough:
  ```
  feat(routing)!: ✨ change project URL structure

  BREAKING CHANGE: /projets/:slug routes now require the locale prefix.
  ```

Reach for `!`/`BREAKING CHANGE:` deliberately — not something to add on every `fix`/`refactor`. Not currently meaningful for versioning here (this repo auto-bumps a patch version on every commit via `.husky/pre-commit`, it doesn't cut semver-meaningful tagged releases), but the marker is still useful signal in `git log`.

## Special commit formats

- **Merge commit**: leave git's default `Merge branch '<name>'` message as-is, don't rewrite it to a type-prefixed form.
- **Revert commit**: `git revert` generates `Revert "<reverted subject>"` by default — leave it as-is unless the revert needs its own explanation, in which case `revert(<scope>): ⏪ <description>` is also fine.

## Writing one

1. Look at what's actually staged/changed (`git diff --staged`, `git status`) — the type must match the *effect* of the diff, not the intent behind the request.
2. Pick exactly one type, one concern. If a commit seems to need two types (e.g. a fix *and* a docs update), that's usually a sign it should be two commits — but don't split an already-requested single commit without checking with the user first.
3. Scope is mandatory — never omit it, never use an issue identifier as the scope.
4. Keep `<description>` short (~50-72 chars), imperative present tense, English, no cap, no trailing period; put further explanation in the body.
5. Actually run `npm run lint` / `npm run test` before writing `Verified-by:` — never fabricate the counts.
6. Still follow this repo's own commit rules (root `CLAUDE.md` / the system's git instructions) for everything else — only create a commit when asked, never `--no-verify`, prefer new commits over amending, stage specific files rather than `git add -A`/`git add .`.

## Examples

```
feat(footer): ✨ add Brittany flag and made-in tagline
```
```
fix(footer): 🐛 bind alt with v-bind instead of mustache interpolation
```
```
chore(skills): 🔧 adapt .claude skills to this repo's actual stack
```
```
ci(deploy): 👷 bump actions/checkout to v6
```
```
docs(readme): 📝 update Makefile command list
```
```
fix(csp): 🐛 add data: to font-src directive

Verified-by: ESLint 0 errors, vitest 6 passed
```
```
feat(routing)!: ✨ change project URL structure

BREAKING CHANGE: /projets/:slug routes now require the locale prefix.
```

## Applying this to existing/older commits

This format is a forward-looking standard, not a description of `git log` history — most existing commits (plain sentences, or a looser French `type: description` with no scope) predate it and are expected to look different. Don't treat old commits as counter-examples to push back against this format; only rewrite old history if the user explicitly asks (that's a separate, much larger and riskier operation — see the caution around force-pushing rewritten history in the root git-safety rules).

## References

- https://www.conventionalcommits.org/
