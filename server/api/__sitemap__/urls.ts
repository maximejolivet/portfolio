import { createClient } from '@supabase/supabase-js'
import type { SitemapUrlInput } from '#sitemap/types'

// Nuxt's page scanner can't discover dynamic project routes (no static
// params), so they never land in the sitemap on their own - this source
// fills them in from Supabase. Pro-category projects stay out entirely
// (client work, noindex'd on the page itself); personal projects are
// indexable and belong here. The blog is entirely noindex'd (see
// pages/blog/**), so no article URLs are generated here.
export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('slug, category, published_at')
    .eq('category', 'personal')
    .lte('published_at', new Date().toISOString())

  if (projectsError) console.error('[sitemap] fetch projects failed', projectsError)

  const projectUrls: SitemapUrlInput[] = (projects ?? []).map((project) => ({
    loc: `/fr/projets/${project.slug}`,
    lastmod: project.published_at,
    _i18nTransform: true,
  }))

  return projectUrls
})
