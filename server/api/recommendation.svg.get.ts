import fr from '../../i18n/locales/fr.json'
import en from '../../i18n/locales/en.json'

// Renders a recommendation quote as vector outlines instead of DOM text, so the quote is
// not crawlable as page text. Same pattern as project-title.svg: an opaque id in the URL
// (never the author's name), and a noindex response header.
const SOURCES: Record<string, 'thibaut' | 'lucie'> = { k7q2: 'thibaut', m3x9: 'lucie' }

// Each width is drawn with the font size that reads best when the browser shows it at
// that width (the phone image is shown full width, so it gets the largest text).
const WIDTHS = [360, 480, 600, 720] as const
const FONT_SIZE_BY_WIDTH: Record<number, number> = { 360: 13, 480: 13, 600: 13, 720: 16 }
const PADDING_Y = 40
const CORNER = 12

function validId(value: unknown): string {
  return typeof value === 'string' && value in SOURCES ? value : ''
}

function metrics(width: number) {
  const fontSize = FONT_SIZE_BY_WIDTH[width] ?? 16
  const lineHeight = Math.round(fontSize * 1.65)
  const padding = width < 500 ? 20 : 44
  return { fontSize, lineHeight, padding, contentWidth: width - padding * 2 }
}

// Greedy wrap measured with the real font, so lines fill the card without overflowing.
function wrap(font: Awaited<ReturnType<typeof loadOutlineFont>>, text: string, size: number, maxWidth: number): string[] {
  const lines: string[] = []
  let current = ''
  for (const word of text.split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word
    if (current && measureText(font, candidate, size) > maxWidth) {
      lines.push(current)
      current = word
    }
    else {
      current = candidate
    }
  }
  if (current) lines.push(current)
  return lines
}

// Rounded on the right only: the left edge is square, where the mint rule sits.
function panelPath(width: number, height: number): string {
  return `M0 0H${width - CORNER}A${CORNER} ${CORNER} 0 0 1 ${width} ${CORNER}V${height - CORNER}A${CORNER} ${CORNER} 0 0 1 ${width - CORNER} ${height}H0Z`
}

async function renderSvg(quote: string, width: number, rows: number): Promise<string> {
  const font = await loadOutlineFont('medium')
  const { fontSize, lineHeight, padding, contentWidth } = metrics(width)
  const lines = wrap(font, quote, fontSize, contentWidth)
  const height = PADDING_Y * 2 + Math.max(rows, lines.length) * lineHeight
  // Left-aligned (ragged right): justified lines stretch letter-spacing unevenly.
  const { defs, ids } = outlineDefs(font, lines, fontSize)
  const uses = lines
    .map((line, i) => outlineUses(font, ids, line, padding, PADDING_Y + fontSize + i * lineHeight, fontSize))
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
  <path d="${panelPath(width, height)}" fill="#24414f"/>
  <rect width="3" height="${height}" fill="#4fb39c"/>
  <defs>${defs}</defs>
  <g fill="#f3f4f0">${uses}</g>
</svg>`
}

// Line count of the longest quote at this width: every card gets this height, so the
// two testimonials look the same size on any screen.
async function rowsFor(quotes: string[], width: number): Promise<number> {
  const font = await loadOutlineFont('medium')
  const { fontSize, contentWidth } = metrics(width)
  return Math.max(...quotes.map((quote) => wrap(font, quote, fontSize, contentWidth).length))
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = validId(query.id)
  const lang = query.lang === 'en' ? 'en' : 'fr'

  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  // Not indexable. This must stay a response header rather than a robots.txt Disallow:
  // crawlers have to be able to fetch the URL to read the noindex directive.
  setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')

  if (!id) {
    setResponseStatus(event, 404)
    return ''
  }

  const messages = lang === 'en' ? en : fr
  const key = SOURCES[id]!
  const quote = messages.recommendationsSection.items[key].quote
  const requested = Number(query.w)
  const width = (WIDTHS as readonly number[]).includes(requested) ? requested : WIDTHS[3]
  const quotes = Object.values(messages.recommendationsSection.items).map((item) => item.quote)
  return renderSvg(quote, width, await rowsFor(quotes, width))
})
