import { describe, expect, it } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import { fetchArticles } from '../composables/useArticles'

const mockSupabase = (result: { data: unknown, error: unknown }) => {
  const query = {
    select: () => query,
    order: () => Promise.resolve(result),
  }
  return { from: () => query } as unknown as SupabaseClient
}

describe('fetchArticles', () => {
  it('returns the articles list on success', async () => {
    const articles = [{ id: '1', title_fr: 'Titre' }]
    const supabase = mockSupabase({ data: articles, error: null })

    await expect(fetchArticles(supabase)).resolves.toEqual(articles)
  })

  it('returns an empty array when data is null', async () => {
    const supabase = mockSupabase({ data: null, error: null })

    await expect(fetchArticles(supabase)).resolves.toEqual([])
  })

  it('throws a generic error and does not leak the Supabase error', async () => {
    const supabase = mockSupabase({
      data: null,
      error: { message: 'relation "articles" does not exist', code: '42P01' },
    })

    await expect(fetchArticles(supabase)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'Unable to load articles',
    })
  })
})
