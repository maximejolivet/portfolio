import type { SupabaseClient } from '@supabase/supabase-js'
import { createError } from 'h3'

export interface Article {
  id: string
  slug_fr: string
  slug_en: string
  title_fr: string
  title_en: string
  excerpt_fr: string
  excerpt_en: string
  content_fr: string
  content_en: string
  cover_image_url: string | null
  published_at: string
}

export const fetchArticle = async (
  supabase: SupabaseClient,
  slug: string,
  locale: string,
): Promise<Article | null> => {
  const slugColumn = locale === 'en' ? 'slug_en' : 'slug_fr'
  const { data, error } = await supabase
    .from('articles')
    .select(
      'id, slug_fr, slug_en, title_fr, title_en, excerpt_fr, excerpt_en, content_fr, content_en, cover_image_url, published_at',
    )
    .eq(slugColumn, slug)
    .lte('published_at', new Date().toISOString())
    .maybeSingle()

  if (error) {
    console.error('[blog] fetch article failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Unable to load article' })
  }

  return data
}

export const useArticle = (slug: string) => {
  const supabase = useSupabase()
  const { locale } = useI18n()

  return useAsyncData<Article | null>(
    `article-${locale.value}-${slug}`,
    () => fetchArticle(supabase, slug, locale.value),
    { server: false, watch: [locale] },
  )
}
