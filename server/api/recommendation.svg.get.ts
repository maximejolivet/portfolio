import fr from '../../i18n/locales/fr.json'
import en from '../../i18n/locales/en.json'

// Renders a recommendation quote as pixels instead of DOM text, so the quote is
// not crawlable as page text. Same pattern as project-title.svg: an opaque id in
// the URL (never the author's name), and a noindex response header.
const SOURCES: Record<string, 'thibaut' | 'lucie'> = { k7q2: 'thibaut', m3x9: 'lucie' }

// Each width is drawn with the font size that reads best when the browser shows it at
// that width: the phone image is shown full width, so it gets the largest text.
const WIDTHS = [360, 480, 600, 720] as const
const FONT_SIZE_BY_WIDTH: Record<number, number> = { 360: 13, 480: 13, 600: 13, 720: 13 }
const PADDING_Y = 40
// Estimated glyph width (in em) of the system sans-serif. Deliberately generous so
// wrapped lines never run past the card.
const CHAR_EM = 0.5

function validId(value: unknown): string {
  return typeof value === 'string' && value in SOURCES ? value : ''
}

function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = []
  let current = ''
  for (const word of text.split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > maxChars && current) {
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

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function metrics(width: number) {
  const fontSize = FONT_SIZE_BY_WIDTH[width] ?? 18
  const lineHeight = Math.round(fontSize * 1.65)
  const padding = width < 500 ? 20 : 44
  const maxChars = Math.floor((width - padding * 2) / (fontSize * CHAR_EM))
  return { fontSize, lineHeight, padding, maxChars }
}

// Line count of the longest quote at this width: every card gets this height, so the
// two testimonials look the same size on any screen.
function rowsFor(quotes: string[], width: number): number {
  const { maxChars } = metrics(width)
  return Math.max(...quotes.map((quote) => wrap(quote, maxChars).length))
}

function renderSvg(quote: string, width: number, rows: number): string {
  const { fontSize, lineHeight, padding, maxChars } = metrics(width)
  const lines = wrap(quote, maxChars)
  const height = PADDING_Y * 2 + Math.max(rows, lines.length) * lineHeight
  // Phone and tablet widths are justified: every line but the last of the paragraph is
  // stretched to the content width (textLength). Desktop stays ragged right.
  const justify = width <= 600
  const contentWidth = width - padding * 2
  const tspans = lines
    .map((line, i) => {
      const stretch = justify && i < lines.length - 1
        ? ` textLength="${contentWidth}" lengthAdjust="spacing"`
        : ''
      return `<tspan x="${padding}" dy="${i === 0 ? 0 : lineHeight}"${stretch}>${escapeXml(line)}</tspan>`
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="16" fill="#fbfcfa" stroke="rgba(29,53,64,0.16)"/>
  <text y="${PADDING_Y + fontSize}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="500" font-size="${fontSize}" fill="#1d3540">${tspans}</text>
</svg>`
}

export default defineEventHandler((event) => {
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
  return renderSvg(quote, width, rowsFor(quotes, width))
})
