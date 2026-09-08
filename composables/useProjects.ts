import type { SupabaseClient } from '@supabase/supabase-js'
import { createError } from 'h3'

export interface ProjectRow {
  id: string
  slug: string
  year: string
  dot: 'mint' | 'gold'
  live: boolean
  category: 'pro' | 'personal'
  company: string | null
  employer: string | null
  website_url: string | null
  image: string | null
  logo: string | null
  logo_color: string | null
  tags: string[]
  type_fr: string
  type_en: string
  title_fr: string
  title_en: string
  tagline_fr: string
  tagline_en: string
  impact_fr: string | null
  impact_en: string | null
  contexte_fr: string | null
  contexte_en: string | null
  solution_fr: string | null
  solution_en: string | null
  points_fr: string[]
  points_en: string[]
  resultat_fr: string | null
  resultat_en: string | null
  role_fr: string | null
  role_en: string | null
  duree_fr: string | null
  duree_en: string | null
  equipe_fr: string | null
  equipe_en: string | null
  published_at: string
}

export interface LocalizedProject {
  id: string
  slug: string
  year: string
  dot: 'mint' | 'gold'
  live: boolean
  category: 'pro' | 'personal'
  company: string | null
  employer: string | null
  websiteUrl: string | null
  image: string | null
  logo: string | null
  logoColor: string | null
  tags: string[]
  type: string
  title: string
  tagline: string
  impact: string | null
  contexte: string | null
  solution: string | null
  points: string[]
  resultat: string | null
  role: string | null
  duree: string | null
  equipe: string | null
}

export function localizeProject(row: ProjectRow, locale: string): LocalizedProject {
  const en = locale === 'en'
  return {
    id: row.id,
    slug: row.slug,
    year: row.year,
    dot: row.dot,
    live: row.live,
    category: row.category,
    company: row.company,
    employer: row.employer,
    websiteUrl: row.website_url,
    image: row.image,
    logo: row.logo,
    logoColor: row.logo_color,
    tags: row.tags,
    type: en ? row.type_en : row.type_fr,
    title: en ? row.title_en : row.title_fr,
    tagline: en ? row.tagline_en : row.tagline_fr,
    impact: en ? row.impact_en : row.impact_fr,
    contexte: en ? row.contexte_en : row.contexte_fr,
    solution: en ? row.solution_en : row.solution_fr,
    points: (en ? row.points_en : row.points_fr).filter(Boolean),
    resultat: en ? row.resultat_en : row.resultat_fr,
    role: en ? row.role_en : row.role_fr,
    duree: en ? row.duree_en : row.duree_fr,
    equipe: en ? row.equipe_en : row.equipe_fr,
  }
}

export const fetchProjects = async (supabase: SupabaseClient): Promise<ProjectRow[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[projects] fetch projects failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Unable to load projects' })
  }

  return data ?? []
}

export const useProjects = () => {
  const supabase = useSupabase()
  return useAsyncData<ProjectRow[]>('projects', () => fetchProjects(supabase), {
    server: false,
    default: () => [],
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
    .maybeSingle()

  if (error) {
    console.error('[projects] fetch project failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Unable to load project' })
  }

  return data
}

export const useProject = (slug: string) => {
  const supabase = useSupabase()
  return useAsyncData<ProjectRow | null>(`project-${slug}`, () => fetchProject(supabase, slug), {
    server: false,
  })
}
