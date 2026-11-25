import { createClient } from '@supabase/supabase-js'

// Renders a project title as pixels instead of DOM text - used on the
// homepage preview cards so client names stay human-readable but aren't
// crawlable as page text (see components/sections/ProjectsSection.vue).
// Looked up by the project's opaque Supabase id (not slug/title) so the
// name never appears in the <img src>/page source either.
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

    // A Supabase error must not be cached (a thrown error is not stored by the
    // cached handler, unlike an empty SVG which would stay for 30 days).
    if (error) {
      console.error('[project-title] fetch failed', error)
      throw createError({ statusCode: 503, statusMessage: 'Service unavailable' })
    }
    if (!data) return emptySvg()

    const text = (lang === 'en' ? data.title_en : data.title_fr) ?? ''
    return await renderSvg(text)
  },
  { maxAge: 60 * 60 * 24 * 30, swr: true, getKey: (event) => {
    const query = getQuery(event)
    return `${validId(query.id) || 'invalid'}-${query.lang === 'en' ? 'en' : 'fr'}`
  } },
)

// The title is drawn as vector outlines (no <text>), so it needs no installed fonts and
// carries no selectable or indexable text.
async function renderSvg(text: string): Promise<string> {
  const font = await loadOutlineFont('semibold')
  const width = Math.max(10, Math.ceil(measureText(font, text, FONT_SIZE) + PADDING_X * 2))
  const { defs, ids } = outlineDefs(font, [text], FONT_SIZE)
  const uses = outlineUses(font, ids, text, PADDING_X, HEIGHT - 8, FONT_SIZE)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}" viewBox="0 0 ${width} ${HEIGHT}" role="img" aria-hidden="true">
  <defs>${defs}</defs>
  <g fill="#1d3540">${uses}</g>
</svg>`
}

function emptySvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="${HEIGHT}" viewBox="0 0 1 ${HEIGHT}" role="img" aria-hidden="true" />`
}
