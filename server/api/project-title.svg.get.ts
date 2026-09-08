// Renders a project title as pixels instead of DOM text - used on the
// homepage preview cards so client names stay human-readable but aren't
// crawlable as page text (see components/sections/ProjectsSection.vue).
const CHAR_WIDTH = 11.5
const PADDING_X = 2
const HEIGHT = 28
const FONT_SIZE = 20
const MAX_LENGTH = 80

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const text = (typeof query.text === 'string' ? query.text : '').slice(0, MAX_LENGTH)
  const width = Math.max(10, Math.round(text.length * CHAR_WIDTH + PADDING_X * 2))

  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}" viewBox="0 0 ${width} ${HEIGHT}" role="img" aria-hidden="true">
  <text x="${PADDING_X}" y="${HEIGHT - 8}" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-weight="700" font-size="${FONT_SIZE}" fill="#1d3540">${escapeXml(text)}</text>
</svg>`
})
