import type { SupabaseClient } from '@supabase/supabase-js'
import { createError } from 'h3'

// Card/list contexts only - never selects the confidential prose fields
// (contexte/solution/points/resultat/role/duree/equipe/impact), which can
// hold full "pro" client case-study detail. Selecting those into a list
// response would leak them to every visitor via the SSR payload regardless
// of which category a UI filter happens to display (see ProjectCardRow).
const PROJECT_CARD_COLUMNS = [
  'id', 'slug', 'year', 'dot', 'live', 'category', 'company', 'employer',
  'website_url', 'image', 'logo', 'logo_color', 'tags',
  'type_fr', 'type_en', 'title_fr', 'title_en', 'tagline_fr', 'tagline_en',
  'published_at',
].join(', ')

export const fetchProjects = async (supabase: SupabaseClient): Promise<ProjectCardRow[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_CARD_COLUMNS)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[projects] fetch projects failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Unable to load projects' })
  }

  return (data ?? []) as unknown as ProjectCardRow[]
}

export const useProjects = () => {
  const supabase = useSupabase()
  return useAsyncData<ProjectCardRow[]>('projects', () => fetchProjects(supabase), {
    // Fetched server-side (unlike the blog's useArticles) so SEO meta that
    // depends on this data - notably the category-based noindex on
    // pages/projects/[slug].vue - is correct in the HTML crawlers actually
    // see, not just after client-side hydration.
    default: () => [],
    // ProjectsSection and TechStackSection both call this on the home page
    // and mount in the same tick - without 'defer', the default 'cancel'
    // dedupe strategy aborts the first fetch and starts a second identical
    // one instead of sharing it.
    dedupe: 'defer',
  })
}

export const fetchProject = async (
  supabase: SupabaseClient,
  slug: string,
): Promise<ProjectRow | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .lte('published_at', new Date().toISOString())
    .maybeSingle()

  if (error) {
    console.error('[projects] fetch project failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Unable to load project' })
  }

  return data
}

export const useProject = (slug: string) => {
  const supabase = useSupabase()
  // Fetched server-side, same reasoning as useProjects() above - this
  // page's title/description/noindex all depend on it.
  return useAsyncData<ProjectRow | null>(`project-${slug}`, () => fetchProject(supabase, slug))
}
