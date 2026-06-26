import { describe, expect, it } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import { fetchArticle } from '../composables/useArticle'

const mockSupabase = (result: { data: unknown, error: unknown }) => {
  const query = {
    select: () => query,
    eq: () => query,
    lte: () => query,
    maybeSingle: () => Promise.resolve(result),
  }
  return { from: () => query } as unknown as SupabaseClient
}

describe('fetchArticle', () => {
  it('returns the article when found', async () => {
    const article = { id: '1', slug_fr: 'mon-article', title_fr: 'Titre' }
    const supabase = mockSupabase({ data: article, error: null })

    await expect(fetchArticle(supabase, 'mon-article', 'fr')).resolves.toEqual(article)
  })

  it('returns null when no article matches the slug (404 case)', async () => {
    const supabase = mockSupabase({ data: null, error: null })

    await expect(fetchArticle(supabase, 'inconnu', 'fr')).resolves.toBeNull()
  })

  it('throws a generic error and does not leak the Supabase error', async () => {
    const supabase = mockSupabase({
      data: null,
      error: { message: 'connection timeout' },
    })

    await expect(fetchArticle(supabase, 'mon-article', 'en')).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'Unable to load article',
    })
  })
})
