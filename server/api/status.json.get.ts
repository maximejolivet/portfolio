// Machine-readable build/deploy info for external monitoring/tooling, and the
// data behind the human-facing /status page.
import { GITHUB_REPO_URL } from '~/constants/pageSource'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

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
    generatedAt: new Date().toISOString(),
  }
})
