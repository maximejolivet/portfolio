import { describe, expect, it } from 'vitest'
import type { CaseStudy } from '../constants/projects'
import { projectsForTech, techKeyword } from '../utils/techProjectMatch'

function project(tags: string[]): CaseStudy {
  return { tags } as CaseStudy
}

describe('techKeyword', () => {
  it('lowercases and dash-splits the tech id by default', () => {
    expect(techKeyword('google-analytics')).toBe('google analytics')
  })

  it('uses the override keyword when one exists', () => {
    expect(techKeyword('modern-css')).toBe('css')
  })
})

describe('projectsForTech', () => {
  it('matches a tag that contains the keyword, case-insensitively', () => {
    const projects = [project(['Drupal 10']), project(['WordPress'])]

    expect(projectsForTech('drupal', projects)).toEqual([projects[0]])
  })

  it('matches multi-word tags via a substring like "Typo3 - Drupal 8 9 10"', () => {
    const projects = [project(['Typo3 - Drupal 8 9 10'])]

    expect(projectsForTech('drupal', projects)).toEqual(projects)
  })

  it('returns an empty array when no project tag matches', () => {
    const projects = [project(['WordPress']), project(['Laravel', 'Vue'])]

    expect(projectsForTech('drupal', projects)).toEqual([])
  })
})
