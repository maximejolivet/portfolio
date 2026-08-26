import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const nuxtConfigPath = resolve(__dirname, '../nuxt.config.ts')

if (!existsSync(nuxtConfigPath)) process.exit(0)

// Format today as YYYY-MM-DD using the system's local timezone
function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const today = formatDate(new Date())
const content = readFileSync(nuxtConfigPath, 'utf-8')
const regex = /compatibilityDate:\s*['"]([^'"]+)['"]/

const match = content.match(regex)
if (match && match[1] === today) {
  console.info(`[update-date] Already up to date: ${today}`)
  process.exit(0)
}

writeFileSync(nuxtConfigPath, content.replace(
  /compatibilityDate:\s*['"][^'"]+['"]/g,
  `compatibilityDate: '${today}'`,
))
console.info(`[update-date] Updated to ${today}`)
