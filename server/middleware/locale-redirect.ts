import routes from '../../routes.json'

// Bare URLs (no locale prefix) are sent to the French version, using the French slug when
// the path was typed in English (e.g. /projects -> /fr/projets). Locale-prefixed URLs, API
// routes, Nuxt assets and files are left alone.
const LOCALES = new Set(['fr', 'en'])
// Prefix match: also covers Nuxt's internal /__nuxt_error renders.
// Also skips .well-known (RFC 8615 probes, e.g. change-password, have no extension).
const SKIP = /^\/(api|_ipx|_nuxt)(\/|$)|^\/__nuxt|^\/\.well-known\/|\.[a-z0-9]+$/i

// First path segment of each English route mapped to its French one, e.g. projects -> projets.
const SEGMENT_MAP = new Map<string, string>()
for (const route of Object.values(routes) as Array<Record<'en' | 'fr', string>>) {
  const en = route.en.split('/')[1]
  const fr = route.fr.split('/')[1]
  if (en && fr && !SEGMENT_MAP.has(en)) SEGMENT_MAP.set(en, fr)
}

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  if (path === '/' || SKIP.test(path)) return
  const [first = '', ...rest] = path.split('/').slice(1)
  if (LOCALES.has(first)) return

  // Case-insensitive: /Projects and /CV are translated like their lowercase forms.
  const frSegment = SEGMENT_MAP.get(first.toLowerCase()) ?? first
  const target = ['/fr', frSegment, ...rest].filter(Boolean).join('/') + url.search
  return sendRedirect(event, target, 302)
})
