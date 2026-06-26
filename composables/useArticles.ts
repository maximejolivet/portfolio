import type { SupabaseClient } from '@supabase/supabase-js'
import { createError } from 'h3'

export interface ArticleSummary {
  id: string
  slug_fr: string
  slug_en: string
  title_fr: string
  title_en: string
  excerpt_fr: string
  excerpt_en: string
  cover_image_url: string | null
  published_at: string
}

export const fetchArticles = async (supabase: SupabaseClient): Promise<ArticleSummary[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select(
      // eslint-disable-next-line max-len
      'id, slug_fr, slug_en, title_fr, title_en, excerpt_fr, excerpt_en, cover_image_url, published_at',
    )
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[blog] fetch articles failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Unable to load articles' })
  }

  return data ?? []
}

export const useArticles = () => {
  const supabase = useSupabase()
  return useAsyncData<ArticleSummary[]>('articles', () => fetchArticles(supabase), {
    server: false,
    default: () => [],
  })
}
