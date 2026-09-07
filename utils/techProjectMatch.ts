import type { CaseStudy } from '~/constants/projects'

// A few tech ids don't read as a substring of how they're actually
// written in a project's free-text tags (constants/projects.ts) - override
// those here instead of trying to derive a keyword purely from the id.
const KEYWORD_OVERRIDES: Record<string, string> = {
  'modern-css': 'css',
}

export function techKeyword(techId: string): string {
  return (KEYWORD_OVERRIDES[techId] ?? techId).replace(/-/g, ' ')
}

export function projectsForTech(techId: string, projects: CaseStudy[]): CaseStudy[] {
  const keyword = techKeyword(techId)
  return projects.filter((project) =>
    project.tags.some((tag) => tag.toLowerCase().includes(keyword)),
  )
}
