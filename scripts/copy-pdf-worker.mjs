// pdfjs-viewer-element resolves its default PDF.js worker with
// `new URL("./pdf.worker.min.mjs", "" + import.meta.url)` - the string
// concatenation defeats Vite's static asset detection (it only recognizes
// the literal `new URL(specifier, import.meta.url)` pattern), so the worker
// file never gets copied into the production build. It's copied here to
// public/ instead and pages/cv.vue points worker-src at it explicitly.
import { copyFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const src = path.join(rootDir, 'node_modules', 'pdfjs-viewer-element', 'dist', 'pdf.worker.min.mjs')
const outDir = path.join(rootDir, 'public', 'generated')
const dest = path.join(outDir, 'pdf.worker.min.mjs')

mkdirSync(outDir, { recursive: true })
copyFileSync(src, dest)

console.info('[copy-pdf-worker] copied pdf.worker.min.mjs to public/generated')
