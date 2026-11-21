import { createClient } from '@supabase/supabase-js'

// Renders a project title as pixels instead of DOM text - used on the
// homepage preview cards so client names stay human-readable but aren't
// crawlable as page text (see components/sections/ProjectsSection.vue).
// Looked up by the project's opaque Supabase id (not slug/title) so the
// name never appears in the <img src>/page source either.
const CHAR_WIDTH = 11.5
const PADDING_X = 2
const HEIGHT = 28
const FONT_SIZE = 20
// Supabase ids are opaque and short - anything else is rejected before it
// reaches the database, and invalid values share one cache key so arbitrary
// query strings can't grow the cache.
const ID_PATTERN = /^[A-Za-z0-9-]{1,64}$/

function validId(value: unknown): string {
  return typeof value === 'string' && ID_PATTERN.test(value) ? value : ''
}

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    const id = validId(query.id)
    const lang = query.lang === 'en' ? 'en' : 'fr'

    setHeader(event, 'Content-Type', 'image/svg+xml')
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

    if (!id) return emptySvg()

    const config = useRuntimeConfig(event)
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
    const { data, error } = await supabase
      .from('projects')
      .select('title_fr, title_en')
      .eq('id', id)
      .maybeSingle()

    if (error || !data) return emptySvg()

    const text = (lang === 'en' ? data.title_en : data.title_fr) ?? ''
    return renderSvg(text)
  },
  { maxAge: 60 * 60 * 24 * 30, swr: true, getKey: (event) => {
    const query = getQuery(event)
    return `${validId(query.id) || 'invalid'}-${query.lang === 'en' ? 'en' : 'fr'}`
  } },
)

function renderSvg(text: string): string {
  const width = Math.max(10, Math.round(text.length * CHAR_WIDTH + PADDING_X * 2))
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}" viewBox="0 0 ${width} ${HEIGHT}" role="img" aria-hidden="true">
  <text x="${PADDING_X}" y="${HEIGHT - 8}" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-weight="700" font-size="${FONT_SIZE}" fill="#1d3540">${escapeXml(text)}</text>
</svg>`
}

function emptySvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="${HEIGHT}" viewBox="0 0 1 ${HEIGHT}" role="img" aria-hidden="true" />`
}
