import { GITHUB_PORTFOLIO_REPO } from '~/constants/github'

interface GitHubCommit {
  html_url: string
  commit: {
    message: string
    author: { date: string }
  }
}

export type ChangelogType = 'feat' | 'fix' | 'perf' | 'security'

export interface ChangelogEntry {
  type: ChangelogType
  scope: string
  description: string
  date: string
  url: string
}

const TRACKED_TYPES: ChangelogType[] = ['feat', 'fix', 'perf', 'security']
const MAX_ENTRIES = 40
const GITHUB_HEADERS = {
  'User-Agent': 'maxime-bzh-portfolio',
  'Accept': 'application/vnd.github+json',
}

// Matches this repo's commit convention: `type(scope)!: emoji description`
// (see .claude/skills/semantic-commit-messages). Older/merge commits that
// don't follow it are silently skipped.
const COMMIT_PATTERN = /^(\w+)\(([\w./-]+)\)!?:\s*(.*)$/

function stripLeadingEmoji(text: string): string {
  return text.replace(/^\p{Extended_Pictographic}️?\s*/u, '').trim()
}

function parseCommit(commit: GitHubCommit): ChangelogEntry | null {
  const subject = commit.commit.message.split('\n')[0] ?? ''
  const match = subject.match(COMMIT_PATTERN)
  if (!match) return null

  const [, type, scope, rest] = match
  if (!TRACKED_TYPES.includes(type as ChangelogType)) return null

  const description = stripLeadingEmoji(rest)
  if (!description) return null

  return {
    type: type as ChangelogType,
    scope,
    description,
    date: commit.commit.author.date,
    url: commit.html_url,
  }
}

export default defineCachedEventHandler(
  async () => {
    try {
      const commits = await $fetch<GitHubCommit[]>(
        `https://api.github.com/repos/${GITHUB_PORTFOLIO_REPO}/commits`,
        {
          query: { per_page: 100 },
          headers: GITHUB_HEADERS,
        },
      )

      const entries = commits
        .map(parseCommit)
        .filter((entry): entry is ChangelogEntry => entry !== null)
        .slice(0, MAX_ENTRIES)

      return { entries }
    }
    catch (error) {
      console.error('[changelog] fetch failed', error)
      return { entries: [] }
    }
  },
  { maxAge: 60 * 60, swr: true },
)
