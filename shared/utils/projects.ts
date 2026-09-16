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

// The prose fields on ProjectRow (contexte/solution/points/resultat/role/
// duree/equipe/impact) can hold confidential client case-study detail.
// Card/list contexts (homepage preview, the /projects grid, tech-filter
// matching) never render them, so the query behind those contexts should
// never select them either - selecting them into a list response leaks
// full "pro" project detail to every visitor via the SSR payload
// regardless of what a UI filter happens to display. This type is what
// that trimmed query returns; localizeProject() accepts either this or a
// full ProjectRow (single-project detail fetches still need everything).
type ConfidentialProjectFields
  = | 'impact_fr' | 'impact_en'
    | 'contexte_fr' | 'contexte_en'
    | 'solution_fr' | 'solution_en'
    | 'points_fr' | 'points_en'
    | 'resultat_fr' | 'resultat_en'
    | 'role_fr' | 'role_en'
    | 'duree_fr' | 'duree_en'
    | 'equipe_fr' | 'equipe_en'

export type ProjectCardRow = Omit<ProjectRow, ConfidentialProjectFields>

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

export function localizeProject(
  row: ProjectCardRow & Partial<Pick<ProjectRow, ConfidentialProjectFields>>,
  locale: string,
): LocalizedProject {
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
    impact: (en ? row.impact_en : row.impact_fr) ?? null,
    contexte: (en ? row.contexte_en : row.contexte_fr) ?? null,
    solution: (en ? row.solution_en : row.solution_fr) ?? null,
    points: ((en ? row.points_en : row.points_fr) ?? []).filter(Boolean),
    resultat: (en ? row.resultat_en : row.resultat_fr) ?? null,
    role: (en ? row.role_en : row.role_fr) ?? null,
    duree: (en ? row.duree_en : row.duree_fr) ?? null,
    equipe: (en ? row.equipe_en : row.equipe_fr) ?? null,
  }
}
