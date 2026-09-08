// A few tech ids don't read as a substring of how they're actually
// written in a project's free-text tags (the projects table) - override
// those here instead of trying to derive a keyword purely from the id.
const KEYWORD_OVERRIDES: Record<string, string> = {
  'modern-css': 'css',
}

export function techKeyword(techId: string): string {
  return (KEYWORD_OVERRIDES[techId] ?? techId).replace(/-/g, ' ')
}

export function projectsForTech<T extends { tags: string[] }>(techId: string, projects: T[]): T[] {
  const keyword = techKeyword(techId)
  return projects.filter((project) =>
    project.tags.some((tag) => tag.toLowerCase().includes(keyword)),
  )
}
