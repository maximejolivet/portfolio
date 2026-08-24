import { GITHUB_USERNAME } from '~/constants/github'

interface GitHubEvent {
  type: string
  repo: { name: string }
  created_at: string
  payload: { head?: string }
}

interface GitHubCommit {
  commit: { message: string }
}

export interface GitHubActivity {
  repo: string
  message: string
  date: string
}

const MAX_ACTIVITY_ITEMS = 2
const GITHUB_HEADERS = {
  'User-Agent': 'maxime-bzh-portfolio',
  'Accept': 'application/vnd.github+json',
}

// The public events feed no longer inlines commit messages in PushEvent
// payloads (only the head/before SHAs), so the message is fetched separately
// per candidate repo.
async function fetchCommitMessage(repo: string, sha: string): Promise<string | null> {
  try {
    const commit = await $fetch<GitHubCommit>(`https://api.github.com/repos/${repo}/commits/${sha}`, {
      headers: GITHUB_HEADERS,
    })
    return commit.commit.message.split('\n')[0] ?? null
  }
  catch {
    return null
  }
}

async function fetchLatestPushes(): Promise<GitHubActivity[]> {
  if (!GITHUB_USERNAME) return []

  try {
    const events = await $fetch<GitHubEvent[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      { headers: GITHUB_HEADERS },
    )

    const seenRepos = new Set<string>()
    const activity: GitHubActivity[] = []

    for (const event of events) {
      if (event.type !== 'PushEvent' || !event.payload.head) continue
      if (seenRepos.has(event.repo.name)) continue
      seenRepos.add(event.repo.name)

      const message = await fetchCommitMessage(event.repo.name, event.payload.head)
      if (!message) continue

      activity.push({
        repo: event.repo.name.split('/').at(-1) ?? event.repo.name,
        message,
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
