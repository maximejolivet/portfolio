interface PageSpeedResponse {
  lighthouseResult?: {
    categories: Record<string, { score: number | null }>
  }
}

interface CategoryScore {
  label: string
  score: number
}

const AUDITED_URL = 'https://www.maxime.bzh/fr'
const CATEGORIES = [
  { key: 'performance', label: 'Performance' },
  { key: 'accessibility', label: 'A11y' },
  { key: 'best-practices', label: 'Best Practices' },
  { key: 'seo', label: 'SEO' },
] as const

// Roughly matches shields.io's flat badge glyph width for its default font,
// good enough to lay out segments without a real text-measurement library.
const CHAR_WIDTH = 6.5
const PADDING = 10

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

function renderBadge(scores: CategoryScore[], strategy: string): string {
  const segments = scores.map((s) => ({
    label: s.label,
    value: String(s.score),
    color: scoreColor(s.score),
    labelWidth: segmentWidth(s.label),
    valueWidth: segmentWidth(String(s.score)),
  }))

  const height = 20
  let x = 0
  const rects: string[] = []
  const texts: string[] = []

  for (const seg of segments) {
    const labelX = x
    rects.push(`<rect x="${labelX}" width="${seg.labelWidth}" height="${height}" fill="#555"/>`)
    texts.push(
      `<text x="${labelX + seg.labelWidth / 2}" y="14" fill="#fff" font-size="11" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(seg.label)}</text>`,
    )
    x += seg.labelWidth

    const valueX = x
    rects.push(`<rect x="${valueX}" width="${seg.valueWidth}" height="${height}" fill="${seg.color}"/>`)
    texts.push(
      `<text x="${valueX + seg.valueWidth / 2}" y="14" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(seg.value)}</text>`,
    )
    x += seg.valueWidth
  }

  const totalWidth = x

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" aria-label="Lighthouse ${escapeXml(strategy)} scores">
  <title>Lighthouse ${escapeXml(strategy)} scores - audited at ${escapeXml(AUDITED_URL)}</title>
  <clipPath id="round">
    <rect width="${totalWidth}" height="${height}" rx="3" fill="#fff"/>
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
  const label = 'lighthouse'
  const value = message
  const labelWidth = segmentWidth(label)
  const valueWidth = segmentWidth(value)
  const totalWidth = labelWidth + valueWidth

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="lighthouse: ${escapeXml(value)}">
  <clipPath id="round">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#round)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="#9f9f9f"/>
  </g>
  <text x="${labelWidth / 2}" y="14" fill="#fff" font-size="11" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(label)}</text>
  <text x="${labelWidth + valueWidth / 2}" y="14" fill="#fff" font-size="11" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif">${escapeXml(value)}</text>
</svg>`
}

async function fetchScores(strategy: 'mobile' | 'desktop'): Promise<CategoryScore[]> {
  const apiKey = useRuntimeConfig().pagespeedApiKey
  const params = new URLSearchParams({ url: AUDITED_URL, strategy })
  for (const c of CATEGORIES) params.append('category', c.key)
  if (apiKey) params.set('key', apiKey)

  const response = await $fetch<PageSpeedResponse>(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
  )

  const categories = response.lighthouseResult?.categories ?? {}

  return CATEGORIES.map((c) => ({
    label: c.label,
    score: Math.round((categories[c.key]?.score ?? 0) * 100),
  }))
}

// Cache only successful PageSpeed results, keyed by strategy - a failed
// fetch (rate limit, network blip) must never get cached, or the badge
// would keep serving "unavailable" for a full day after a single failure.
const getCachedScores = defineCachedFunction(fetchScores, {
  name: 'lighthouse-scores',
  maxAge: 60 * 60 * 24,
  swr: true,
  getKey: (strategy: 'mobile' | 'desktop') => strategy,
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const strategy = query.strategy === 'desktop' ? 'desktop' : 'mobile'

  setHeader(event, 'Content-Type', 'image/svg+xml')

  try {
    const scores = await getCachedScores(strategy)
    return renderBadge(scores, strategy)
  }
  catch (error) {
    console.error('[lighthouse-badge] fetch failed', error)
    return errorBadge('unavailable')
  }
})
