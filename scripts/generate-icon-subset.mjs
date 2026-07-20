// Scans the codebase for icon refs (e.g. "logos:vue") and writes a subset of
// the referenced @iconify-json collections containing only those icons.
// utils/resolveIcon.ts reads that subset instead of the full collections -
// importing the full icons.json files (~31MB combined) blew the build's heap
// and shipped all of it to the client for the ~100 icons actually used.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const IGNORED_DIRS = new Set([
  'node_modules',
  '.nuxt',
  '.output',
  '.nitro',
  '.cache',
  '.git',
  'dist',
  'test',
])
const SCAN_EXTENSIONS = new Set(['.vue', '.ts'])
const IGNORED_FILES = new Set(['resolveIcon.ts'])

const PREFIXES = [
  'devicon-plain',
  'devicon',
  'lucide',
  'logos',
  'material-icon-theme',
  'selfhst',
  'skill-icons',
]

const iconRefPattern = new RegExp(`\\b(${PREFIXES.join('|')}):([a-zA-Z0-9-]+)`, 'g')

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue
    const fullPath = path.join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      walk(fullPath, files)
    }
    else if (SCAN_EXTENSIONS.has(path.extname(entry)) && !IGNORED_FILES.has(entry)) {
      files.push(fullPath)
    }
  }
  return files
}

const usedRefs = new Map(PREFIXES.map((prefix) => [prefix, new Set()]))

for (const file of walk(rootDir)) {
  const content = readFileSync(file, 'utf8')
  for (const match of content.matchAll(iconRefPattern)) {
    usedRefs.get(match[1]).add(match[2])
  }
}

const subset = {}

for (const prefix of PREFIXES) {
  const names = usedRefs.get(prefix)
  if (names.size === 0) continue

  const pkgPath = path.join(rootDir, 'node_modules', '@iconify-json', prefix, 'icons.json')
  const collection = JSON.parse(readFileSync(pkgPath, 'utf8'))

  const icons = {}
  for (const name of names) {
    const direct = collection.icons[name]
    const aliasParent = collection.aliases?.[name]?.parent
    const icon = direct ?? (aliasParent ? collection.icons[aliasParent] : undefined)
    if (!icon) {
      console.warn(`[generate-icon-subset] "${prefix}:${name}" not found - check for a typo`)
      continue
    }
    icons[name] = icon
  }

  subset[prefix] = {
    prefix: collection.prefix,
    width: collection.width ?? 16,
    height: collection.height ?? 16,
    icons,
  }
}

const outDir = path.join(rootDir, 'utils', 'generated')
mkdirSync(outDir, { recursive: true })
writeFileSync(path.join(outDir, 'icon-subset.json'), `${JSON.stringify(subset, null, 2)}\n`)

const iconCount = Object.values(subset).reduce((n, c) => n + Object.keys(c.icons).length, 0)
console.info(
  `[generate-icon-subset] wrote ${iconCount} icons across ${Object.keys(subset).length} collections`,
)
