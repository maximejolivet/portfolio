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

async function fetchLatestPush(): Promise<GitHubActivity | null> {
  if (!GITHUB_USERNAME) return null

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

    const push = events.find((e) => e.type === 'PushEvent' && e.payload.commits?.length)
    const commit = push?.payload.commits?.at(-1)
    if (!push || !commit) return null

    return {
      repo: push.repo.name.split('/').at(-1) ?? push.repo.name,
      message: commit.message.split('\n')[0] ?? '',
      date: push.created_at,
    }
  }
  catch (error) {
    console.error('[github-activity] fetch failed', error)
    return null
  }
}

export default defineCachedEventHandler(
  async () => ({ activity: await fetchLatestPush() }),
  { maxAge: 60 * 30, swr: true },
)
