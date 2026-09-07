// Replaces the shields.io badge in the "Releases (dev)" section of
// README.md with one for the current version - only the latest version
// is kept, not a growing history. Invoked by .husky/pre-commit, right
// after it bumps package.json - a commit-msg hook can't do this because
// git already froze the commit tree by the time commit-msg runs, so
// `git add` there is a no-op.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const { version } = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'))

// shields.io reserves "-" as a field separator, so literal dashes must be escaped as "--".
const date = new Date().toISOString().slice(0, 10).replace(/-/g, '--')
const badge = `![v${version}](https://img.shields.io/badge/v${version}-${date}-F97316)`

const readmePath = path.join(rootDir, 'README.md')
const readme = readFileSync(readmePath, 'utf8')

const startMarker = '<!-- releases:start -->'
const endMarker = '<!-- releases:end -->'
const startIndex = readme.indexOf(startMarker)
const endIndex = readme.indexOf(endMarker)

if (startIndex === -1 || endIndex === -1) {
  process.exit(0)
}

const before = readme.slice(0, startIndex + startMarker.length)
const after = readme.slice(endIndex)

writeFileSync(readmePath, `${before}\n\n${badge}\n\n${after}`)
