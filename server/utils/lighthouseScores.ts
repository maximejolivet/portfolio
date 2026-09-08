// Shared between the Lighthouse SVG badge and /api/status.json - both need
// the same cached PageSpeed scores, and a failed fetch (rate limit, network
// blip) must never get cached, or either consumer would keep serving stale
// "unavailable" data for a full day after a single failure.
interface PageSpeedResponse {
  lighthouseResult?: {
    categories: Record<string, { score: number | null }>
  }
}

export interface CategoryScore {
  label: string
  score: number
}

export const AUDITED_URL = 'https://www.maxime.bzh/fr'

const CATEGORIES = [
  { key: 'performance', label: 'Performance' },
  { key: 'accessibility', label: 'A11y' },
  { key: 'best-practices', label: 'Best Practices' },
  { key: 'seo', label: 'SEO' },
] as const

async function fetchScores(strategy: 'mobile' | 'desktop'): Promise<CategoryScore[]> {
  const apiKey = useRuntimeConfig().pagespeedApiKey
  const params = new URLSearchParams({ url: AUDITED_URL, strategy })
  for (const c of CATEGORIES) params.append('category', c.key)
  if (apiKey) params.set('key', apiKey)

  const response = await $fetch<PageSpeedResponse>(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
  )

  const categories = response.lighthouseResult?.categories ?? {}

  return CATEGORIES.map((c) => {
    const score = categories[c.key]?.score
    // A 200 response with a missing/null category is a real PSI failure mode
    // (e.g. a partial audit) - treating it as 0 would cache a false score for
    // 24h instead of surfacing "unavailable" like a genuine fetch failure.
    if (score == null) {
      throw new Error(`PageSpeed response missing category "${c.key}"`)
    }
    return { label: c.label, score: Math.round(score * 100) }
  })
}

export const getCachedLighthouseScores = defineCachedFunction(fetchScores, {
  name: 'lighthouse-scores',
  maxAge: 60 * 60 * 24,
  swr: true,
  getKey: (strategy: 'mobile' | 'desktop') => strategy,
})
