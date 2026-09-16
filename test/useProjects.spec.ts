import { describe, expect, it, vi } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import { fetchProject, fetchProjects } from '../composables/useProjects'

const CONFIDENTIAL_COLUMNS = [
  'impact_fr', 'impact_en',
  'contexte_fr', 'contexte_en',
  'solution_fr', 'solution_en',
  'points_fr', 'points_en',
  'resultat_fr', 'resultat_en',
  'role_fr', 'role_en',
  'duree_fr', 'duree_en',
  'equipe_fr', 'equipe_en',
]

const mockListSupabase = (result: { data: unknown, error: unknown }) => {
  const select = vi.fn(() => query)
  const query = {
    select,
    lte: () => query,
    order: () => Promise.resolve(result),
  }
  return { supabase: { from: () => query } as unknown as SupabaseClient, select }
}

const mockDetailSupabase = (result: { data: unknown, error: unknown }) => {
  const select = vi.fn(() => query)
  const query = {
    select,
    eq: () => query,
    lte: () => query,
    maybeSingle: () => Promise.resolve(result),
  }
  return { supabase: { from: () => query } as unknown as SupabaseClient, select }
}

describe('fetchProjects', () => {
  it('never selects the confidential prose columns - regression guard for the SSR payload leak', async () => {
    const { supabase, select } = mockListSupabase({ data: [], error: null })

    await fetchProjects(supabase)

    const requestedColumns = select.mock.calls[0]![0] as string
    for (const column of CONFIDENTIAL_COLUMNS) {
      expect(requestedColumns).not.toContain(column)
    }
  })

  it('returns the project list on success', async () => {
    const projects = [{ id: '1', slug: 'a', category: 'personal' }]
    const { supabase } = mockListSupabase({ data: projects, error: null })

    await expect(fetchProjects(supabase)).resolves.toEqual(projects)
  })

  it('returns an empty array when data is null', async () => {
    const { supabase } = mockListSupabase({ data: null, error: null })

    await expect(fetchProjects(supabase)).resolves.toEqual([])
  })

  it('throws a generic error and does not leak the Supabase error', async () => {
    const { supabase } = mockListSupabase({
      data: null,
      error: { message: 'relation "projects" does not exist', code: '42P01' },
    })

    await expect(fetchProjects(supabase)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'Unable to load projects',
    })
  })
})

describe('fetchProject', () => {
  it('selects the full row - single-project detail view needs every field', async () => {
    const { supabase, select } = mockDetailSupabase({ data: null, error: null })

    await fetchProject(supabase, 'some-slug')

    expect(select.mock.calls[0]![0]).toBe('*')
  })

  it('returns the matched project on success', async () => {
    const project = { id: '1', slug: 'a', contexte_fr: 'confidential detail' }
    const { supabase } = mockDetailSupabase({ data: project, error: null })

    await expect(fetchProject(supabase, 'a')).resolves.toEqual(project)
  })
})
