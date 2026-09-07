// Machine-readable counterpart to the human-facing summary on
// /accessibilite (live Lighthouse badge + build info footer) - same
// underlying data, meant for external monitoring/tooling rather than a
// person reading the page.
import { GITHUB_REPO_URL } from '~/constants/pageSource'

function scoreFor(scores: CategoryScore[], label: string): number | null {
  return scores.find((s) => s.label === label)?.score ?? null
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  let lighthouse: {
    performance: number | null
    accessibility: number | null
    bestPractices: number | null
    seo: number | null
    auditedUrl: string
  } | null = null

  try {
    const scores = await getCachedLighthouseScores('mobile')
    lighthouse = {
      performance: scoreFor(scores, 'Performance'),
      accessibility: scoreFor(scores, 'A11y'),
      bestPractices: scoreFor(scores, 'Best Practices'),
      seo: scoreFor(scores, 'SEO'),
      auditedUrl: AUDITED_URL,
    }
  }
  catch (error) {
    console.error('[status] lighthouse fetch failed', error)
  }

  setHeader(event, 'Content-Type', 'application/json; charset=utf-8')

  return {
    version: config.public.appVersion || null,
    buildDate: config.public.buildDate || null,
    commit: config.public.commitSha
      ? {
          sha: config.public.commitSha,
          shortSha: config.public.commitSha.slice(0, 7),
          url: `${GITHUB_REPO_URL}/commit/${config.public.commitSha}`,
        }
      : null,
    lighthouse,
    generatedAt: new Date().toISOString(),
  }
})
