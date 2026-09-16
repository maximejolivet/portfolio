import { describe, expect, it } from 'vitest'
import type { ProjectCardRow, ProjectRow } from '../shared/utils/projects'
import { localizeProject } from '../shared/utils/projects'

const cardRow: ProjectCardRow = {
  id: '1',
  slug: 'example',
  year: '2026',
  dot: 'gold',
  live: true,
  category: 'pro',
  company: 'Acme',
  employer: null,
  website_url: 'https://example.com',
  image: null,
  logo: null,
  logo_color: null,
  tags: ['php', 'drupal'],
  type_fr: 'Site institutionnel',
  type_en: 'Corporate site',
  title_fr: 'Titre',
  title_en: 'Title',
  tagline_fr: 'Accroche',
  tagline_en: 'Tagline',
  published_at: '2026-01-01T00:00:00Z',
}

describe('localizeProject', () => {
  it('picks the French fields by default', () => {
    const result = localizeProject(cardRow, 'fr')

    expect(result.title).toBe('Titre')
    expect(result.tagline).toBe('Accroche')
    expect(result.type).toBe('Site institutionnel')
  })

  it('picks the English fields for the en locale', () => {
    const result = localizeProject(cardRow, 'en')

    expect(result.title).toBe('Title')
    expect(result.tagline).toBe('Tagline')
    expect(result.type).toBe('Corporate site')
  })

  it('defaults the confidential prose fields to null when the row is a card row', () => {
    const result = localizeProject(cardRow, 'fr')

    expect(result.contexte).toBeNull()
    expect(result.solution).toBeNull()
    expect(result.resultat).toBeNull()
    expect(result.role).toBeNull()
    expect(result.duree).toBeNull()
    expect(result.equipe).toBeNull()
    expect(result.impact).toBeNull()
    expect(result.points).toEqual([])
  })

  it('surfaces the confidential prose fields when given a full detail row', () => {
    const fullRow: ProjectRow = {
      ...cardRow,
      impact_fr: 'Impact', impact_en: 'Impact',
      contexte_fr: 'Contexte', contexte_en: 'Context',
      solution_fr: 'Solution', solution_en: 'Solution',
      points_fr: ['Point 1', ''], points_en: ['Point 1', ''],
      resultat_fr: 'Résultat', resultat_en: 'Result',
      role_fr: 'Lead Dev', role_en: 'Lead Dev',
      duree_fr: '6 mois', duree_en: '6 months',
      equipe_fr: '3 personnes', equipe_en: '3 people',
    }

    const result = localizeProject(fullRow, 'fr')

    expect(result.contexte).toBe('Contexte')
    expect(result.solution).toBe('Solution')
    expect(result.resultat).toBe('Résultat')
    // Blank entries are filtered out, not just passed through.
    expect(result.points).toEqual(['Point 1'])
  })
})
