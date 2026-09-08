// Shared between the app (composables/useProjects.ts) and Nitro server
// routes (server/routes/llms-full.txt.get.ts) - Nuxt auto-imports shared/
// in both contexts, so the locale-picking logic only lives once.
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
  points_fr: string[] | null
  points_en: string[] | null
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
    points: ((en ? row.points_en : row.points_fr) ?? []).filter(Boolean),
    resultat: en ? row.resultat_en : row.resultat_fr,
    role: en ? row.role_en : row.role_fr,
    duree: en ? row.duree_en : row.duree_fr,
    equipe: en ? row.equipe_en : row.equipe_fr,
  }
}
