// Adds a shields.io badge for the current version to the "Releases (dev)"
// section of README.md. Invoked by .husky/commit-msg, after .husky/pre-commit
// has already bumped package.json.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const commitMsgFile = process.argv[2]

if (!commitMsgFile) {
  process.exit(0)
}

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
const existingBlock = readme.slice(startIndex + startMarker.length, endIndex).trim()
const after = readme.slice(endIndex)

const block = existingBlock ? `${badge}\n${existingBlock}` : badge

writeFileSync(readmePath, `${before}\n\n${block}\n\n${after}`)
