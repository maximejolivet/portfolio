// Prints the next version string for .husky/pre-commit to pass to
// `npm version <string>`. Every patch bump increments as normal, except a
// patch that would reach 100 instead rolls over to the next minor with
// patch reset to 0 (…1.0.98, 1.0.99, 1.1.0, 1.1.1…) - keeps the patch
// number from climbing forever across hundreds of commits.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { version } = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'))

const [major, minor, patch] = version.split('.').map(Number)
const nextPatch = patch + 1

const nextVersion = nextPatch >= 100
  ? `${major}.${minor + 1}.0`
  : `${major}.${minor}.${nextPatch}`

console.info(nextVersion)
