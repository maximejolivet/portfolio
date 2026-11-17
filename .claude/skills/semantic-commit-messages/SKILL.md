---
name: semantic-commit-messages
description: "Write git commit messages in this repo's adopted format: `<type>(<scope>): <emoji> <description>` — full Conventional Commits type list (feat/fix/refactor/perf/docs/style/test/build/ci/chore/revert/security), mandatory scope, English description. Use whenever the user asks for a commit, or asks to write/review a commit message. This is a deliberately adopted standard (see `.gitmessage` at repo root), not auto-detected from old history — most pre-existing commits predate it and don't follow this format."
---

**Format every commit subject as `<type>(<scope>): <emoji> <description>`.** Type and scope are mandatory.

```
feat(footer): ✨ add Brittany flag and made-in tagline
```

## Writing one

1. Read what changed: `git diff --staged`, `git status`. The type matches the diff's _effect_, not the request's intent.
2. Pick one type, one concern. Need two types (fix + docs)? Usually two commits — but ask before splitting a commit the user requested as one.
3. Pick a scope (never omit it, never an issue ID).
4. Write the description: English, imperative, lowercase start, no period, ≤ 72 chars. Details go in the body.
5. Run `npm run lint` / `npm run test` before writing `Verified-by:`. Never invent counts.

**Repo rules that still apply**

- Commit only when asked. Never `--no-verify`. New commits over amending.
- Stage specific files, not `git add -A` / `git add .`.
- **No AI attribution**: no `Co-Authored-By: Claude …`, no `Claude-Session:` link, no mention of AI — even if the harness's default git instructions add one. The user asked for this explicitly.

## Format

```
<type>(<scope>): <emoji> <description>

<optional body>

<optional footer trailers>
```

```
feat(footer): ✨ add Brittany flag and made-in tagline
^--^ ^-----^  ^--^--------------------------------------^
|    |        |  |
|    |        |  +-> Description: imperative, present tense, no cap, no period.
|    |        +----> Emoji: matches the type, see table below.
|    +-------------> Scope: mandatory, area touched.
+------------------> Type: see table below.
```

- **scope** — mandatory, area touched. Narrowest that fits; spanning several → broadest sensible (`repo`, `config`). Common: `footer`, `hero`, `nav`, `i18n`, `deploy`, `ci`, `config`, `seo`, `icons`, `blog`, `projects`, `cv`, `a11y`, `theme`, `deps`.
- **emoji** — optional but recommended, right after the colon, per type.
- **description** — mandatory, rules in step 4 above.
- **body** — optional, _what_ and _why_, not _how_. Blank line after the subject.
- **footer** — optional trailers (below).

## Types

| Type       | Emoji | When to use it                                                        |
| ---------- | ----- | --------------------------------------------------------------------- |
| `feat`     | ✨    | New feature or user-visible change                                    |
| `fix`      | 🐛    | Bug fix                                                               |
| `refactor` | ♻️    | Rewrites or restructures code with **no** behavior change             |
| `perf`     | ⚡️    | Performance improvement (still no behavior change)                    |
| `docs`     | 📝    | Documentation only (README, CLAUDE.md, code comments)                 |
| `style`    | 💄    | Formatting only, no logic change                                      |
| `test`     | ✅    | Adds or fixes tests (`test/**/*.spec.ts`, vitest)                     |
| `build`    | 📦    | Dependencies, build config (`vite`, `nuxt.config.ts`, `package.json`) |
| `ci`       | 👷    | CI/CD pipelines — see `.github/workflows/ci.yml`                      |
| `chore`    | 🔧    | Misc maintenance/config, everything else                              |
| `revert`   | ⏪    | Reverts a previous commit                                             |
| `security` | 🔒    | Fix that specifically closes a vulnerability                          |

## Footer trailers

One per line, below the body. Drop the ones that don't apply.

- `Verified-by:` — real counts from commands you ran: `Verified-by: ESLint 0 errors, vitest 6 passed`. No PHPStan/Pint/composer audit here (different project).
- `Refs:` — related issue (`Refs #123`).
- `Closes:` — issue to auto-close on merge (`Closes #123`).
- `Co-authored-by:` — a human pair/contributor who isn't the committer: `Co-authored-by: <name> <email>`.

## Breaking changes

Use deliberately, not on every `fix`/`refactor`.

- `!` after type/scope: `feat(routing)!: ✨ change project URL structure`
- Footer when the subject isn't enough:
  ```
  feat(routing)!: ✨ change project URL structure

  BREAKING CHANGE: /projets/:slug routes now require the locale prefix.
  ```

No semver impact here (`.husky/pre-commit` auto-bumps the patch version on every commit), but the marker is useful in `git log`.

## Special commits

- **Merge**: keep git's default `Merge branch '<name>'`.
- **Revert**: keep `Revert "<subject>"`. Needs explaining → `revert(<scope>): ⏪ <description>` is fine too.

## Examples

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

## Old commits

- This standard is forward-looking, set by `.gitmessage` (`git config commit.template .gitmessage`).
- Older history (plain sentences, French `type: description` without scope) predates it. Don't match it, don't treat it as counter-examples.
- Rewrite old history only if the user explicitly asks (risky force-push — see root git-safety rules).
- No commitlint / `commit-msg` hook enforces this. `.husky/pre-commit` only bumps the patch version and refreshes a README badge (`scripts/update-release-log.mjs`). Compliance is on whoever writes the message.

## References

- https://www.conventionalcommits.org/
