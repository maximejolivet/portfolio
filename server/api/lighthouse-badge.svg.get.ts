// Roughly matches shields.io's flat badge glyph width for its default font,
// good enough to lay out segments without a real text-measurement library.
const CHAR_WIDTH = 6.5
const PADDING = 10
const HEIGHT = 20

const LABEL_COLOR = '#333'
const TITLE_LABEL = 'Lighthouse'
const ICON_SIZE = 12
const ICON_GAP = 4

function scoreColor(score: number): string {
  if (score >= 90) return '#4c1'
  if (score >= 50) return '#dfb317'
  return '#e05d44'
}

function segmentWidth(text: string): number {
  return Math.round(text.length * CHAR_WIDTH + PADDING * 2)
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// A generic beacon pictogram (not Google's trademarked Lighthouse logo) -
// just enough to read as an icon at badge scale.
function titleSegment(): { width: number, markup: string } {
  const textWidth = Math.round(TITLE_LABEL.length * CHAR_WIDTH)
  const width = PADDING + ICON_SIZE + ICON_GAP + textWidth + PADDING
  const iconY = (HEIGHT - ICON_SIZE) / 2
  const textX = PADDING + ICON_SIZE + ICON_GAP

  const markup = `<rect x="0" width="${width}" height="${HEIGHT}" fill="#555"/>
  <svg x="${PADDING}" y="${iconY}" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 16 14">
    <path d="M6 2L10 2L12 12H4Z" fill="#fff"/>
    <circle cx="8" cy="1.6" r="1.6" fill="#fff"/>
    <rect x="5" y="7" width="6" height="1.4" fill="#555"/>
  </svg>
  <text x="${textX}" y="14" fill="#fff" font-size="11" text-anchor="start" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(TITLE_LABEL)}</text>`

  return { width, markup }
}

function renderBadge(scores: CategoryScore[], strategy: string): string {
  const segments = scores.map((s) => ({
    label: s.label,
    value: String(s.score),
    color: scoreColor(s.score),
    labelWidth: segmentWidth(s.label),
    valueWidth: segmentWidth(String(s.score)),
  }))

  const title = titleSegment()
  let x = title.width
  const rects: string[] = [title.markup]
  const texts: string[] = []

  for (const seg of segments) {
    const labelX = x
    rects.push(`<rect x="${labelX}" width="${seg.labelWidth}" height="${HEIGHT}" fill="${LABEL_COLOR}"/>`)
    texts.push(
      `<text x="${labelX + seg.labelWidth / 2}" y="14" fill="#fff" font-size="11" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(seg.label)}</text>`,
    )
    x += seg.labelWidth

    const valueX = x
    rects.push(`<rect x="${valueX}" width="${seg.valueWidth}" height="${HEIGHT}" fill="${seg.color}"/>`)
    texts.push(
      `<text x="${valueX + seg.valueWidth / 2}" y="14" fill="#fff" font-size="11" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(seg.value)}</text>`,
    )
    x += seg.valueWidth
  }

  const totalWidth = x

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${HEIGHT}" role="img" aria-label="Lighthouse ${escapeXml(strategy)} scores">
  <title>Lighthouse ${escapeXml(strategy)} scores - audited at ${escapeXml(AUDITED_URL)}</title>
  <clipPath id="round">
    <rect width="${totalWidth}" height="${HEIGHT}" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#round)">
    ${rects.join('\n    ')}
  </g>
  <g>
    ${texts.join('\n    ')}
  </g>
</svg>`
}

function errorBadge(message: string): string {
  const title = titleSegment()
  const valueWidth = segmentWidth(message)
  const totalWidth = title.width + valueWidth

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${HEIGHT}" role="img" aria-label="Lighthouse: ${escapeXml(message)}">
  <clipPath id="round">
    <rect width="${totalWidth}" height="${HEIGHT}" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#round)">
    ${title.markup}
    <rect x="${title.width}" width="${valueWidth}" height="${HEIGHT}" fill="#9f9f9f"/>
  </g>
  <text x="${title.width + valueWidth / 2}" y="14" fill="#fff" font-size="11" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(message)}</text>
</svg>`
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const strategy = query.strategy === 'desktop' ? 'desktop' : 'mobile'

  setHeader(event, 'Content-Type', 'image/svg+xml')

  try {
    const scores = await getCachedLighthouseScores(strategy)
    // Matches the underlying score cache (24h, swr) - browsers/CDNs and any
    // external embed (README badge, etc.) can now skip re-hitting the server
    // instead of refetching this SVG on every request.
    setHeader(event, 'Cache-Control', 'public, max-age=86400, stale-while-revalidate=86400')
    return renderBadge(scores, strategy)
  }
  catch (error) {
    console.error('[lighthouse-badge] fetch failed', error)
    // Short-lived on purpose - a transient fetch failure shouldn't get
    // baked into caches for a full day.
    setHeader(event, 'Cache-Control', 'public, max-age=60')
    return errorBadge('unavailable')
  }
})
