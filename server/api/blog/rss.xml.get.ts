import { createClient } from '@supabase/supabase-js'

const SITE_URL = 'https://www.maxime.bzh'

interface ArticleRow {
  slug_fr: string
  title_fr: string
  excerpt_fr: string
  published_at: string
}

function buildFeed(articles: ArticleRow[]): string {
  const items = articles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title_fr)}</title>
      <link>${SITE_URL}/fr/blog/${escapeXml(article.slug_fr)}</link>
      <guid>${SITE_URL}/fr/blog/${escapeXml(article.slug_fr)}</guid>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt_fr)}</description>
    </item>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Maxime Jolivet - Blog</title>
    <link>${SITE_URL}/fr/blog</link>
    <description>Notes de terrain sur le développement web</description>
    <language>fr</language>${items}
  </channel>
</rss>`
}

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event)
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

    const { data, error } = await supabase
      .from('articles')
      .select('slug_fr, title_fr, excerpt_fr, published_at')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(30)

    if (error) {
      console.error('[rss] fetch articles failed', error)
      throw createError({ statusCode: 500, statusMessage: 'Unable to load articles' })
    }

    setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
    return buildFeed((data as ArticleRow[]) ?? [])
  },
  { maxAge: 60 * 60, swr: true },
)
