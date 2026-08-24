import { GITHUB_USERNAME } from '~/constants/github'

interface GitHubEvent {
  type: string
  repo: { name: string }
  created_at: string
  payload: { commits?: Array<{ message: string }> }
}

export interface GitHubActivity {
  repo: string
  message: string
  date: string
}

const MAX_ACTIVITY_ITEMS = 3

async function fetchLatestPushes(): Promise<GitHubActivity[]> {
  if (!GITHUB_USERNAME) return []

  try {
    const events = await $fetch<GitHubEvent[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      {
        headers: {
          'User-Agent': 'maxime-bzh-portfolio',
          'Accept': 'application/vnd.github+json',
        },
      },
    )

    const seenRepos = new Set<string>()
    const activity: GitHubActivity[] = []

    for (const event of events) {
      if (event.type !== 'PushEvent' || !event.payload.commits?.length) continue
      if (seenRepos.has(event.repo.name)) continue

      const commit = event.payload.commits.at(-1)
      if (!commit) continue

      seenRepos.add(event.repo.name)
      activity.push({
        repo: event.repo.name.split('/').at(-1) ?? event.repo.name,
        message: commit.message.split('\n')[0] ?? '',
        date: event.created_at,
      })

      if (activity.length >= MAX_ACTIVITY_ITEMS) break
    }

    return activity
  }
  catch (error) {
    console.error('[github-activity] fetch failed', error)
    return []
  }
}

export default defineCachedEventHandler(
  async () => ({ activity: await fetchLatestPushes() }),
  { maxAge: 60 * 30, swr: true },
)
