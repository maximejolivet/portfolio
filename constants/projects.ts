export interface CaseStudy {
  id: string
  slug: string
  year: string
  dot: 'mint' | 'gold'
  live: boolean
  category: 'pro' | 'personal'
  company?: string
  employer?: string
  image?: string
  tags: string[]
  typeKey: string
  titleKey: string
  taglineKey: string
  impactKey: string
  contexteKey: string
  solutionKey: string
  pointsKeys: string[]
  resultatKey: string
  roleKey: string
  dureeKey: string
  equipeKey: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'saur',
    slug: 'saur',
    year: '2025',
    dot: 'mint',
    live: false,
    category: 'pro',
    company: 'Saur',
    employer: 'Gingerminds',
    tags: ['WordPress'],
    typeKey: 'projects.saur.type',
    titleKey: 'projects.saur.title',
    taglineKey: 'projects.saur.tagline',
    impactKey: 'projects.saur.impact',
    contexteKey: 'projects.saur.contexte',
    solutionKey: 'projects.saur.solution',
    pointsKeys: [
      'projects.saur.points.0',
      'projects.saur.points.1',
      'projects.saur.points.2',
      'projects.saur.points.3',
    ],
    resultatKey: 'projects.saur.resultat',
    roleKey: 'projects.saur.role',
    dureeKey: 'projects.saur.duree',
    equipeKey: 'projects.saur.equipe',
  },
  {
    id: 'vygon',
    slug: 'vygon',
    year: '2024',
    dot: 'mint',
    live: true,
    category: 'pro',
    company: 'Vygon',
    employer: 'Gingerminds',
    image: '/projects/vygon.jpg',
    tags: [
      'Drupal',
      'Multilingue',
      'Multi-site',
      'Catalogue produits',
      'Site corporate',
      'Site de marque',
    ],
    typeKey: 'projects.vygon.type',
    titleKey: 'projects.vygon.title',
    taglineKey: 'projects.vygon.tagline',
    impactKey: 'projects.vygon.impact',
    contexteKey: 'projects.vygon.contexte',
    solutionKey: 'projects.vygon.solution',
    pointsKeys: [
      'projects.vygon.points.0',
      'projects.vygon.points.1',
      'projects.vygon.points.2',
      'projects.vygon.points.3',
    ],
    resultatKey: 'projects.vygon.resultat',
    roleKey: 'projects.vygon.role',
    dureeKey: 'projects.vygon.duree',
    equipeKey: 'projects.vygon.equipe',
  },
  {
    id: 'pileje',
    slug: 'pileje',
    year: '2019',
    dot: 'gold',
    live: false,
    category: 'pro',
    company: 'PiLeJe',
    employer: 'Gingerminds',
    tags: ['Drupal', 'Multilingue', 'Multi-site', 'Site corporate', 'Site de marque'],
    typeKey: 'projects.pileje.type',
    titleKey: 'projects.pileje.title',
    taglineKey: 'projects.pileje.tagline',
    impactKey: 'projects.pileje.impact',
    contexteKey: 'projects.pileje.contexte',
    solutionKey: 'projects.pileje.solution',
    pointsKeys: [
      'projects.pileje.points.0',
      'projects.pileje.points.1',
      'projects.pileje.points.2',
      'projects.pileje.points.3',
    ],
    resultatKey: 'projects.pileje.resultat',
    roleKey: 'projects.pileje.role',
    dureeKey: 'projects.pileje.duree',
    equipeKey: 'projects.pileje.equipe',
  },
  {
    id: 'portfolio',
    slug: 'portfolio',
    year: '2026',
    dot: 'mint',
    live: true,
    category: 'personal',
    tags: ['Nuxt 4', 'Vue 3', 'Tailwind v4', 'shadcn-vue', 'Supabase', 'i18n'],
    typeKey: 'projects.portfolio.type',
    titleKey: 'projects.portfolio.title',
    taglineKey: 'projects.portfolio.tagline',
    impactKey: 'projects.portfolio.impact',
    contexteKey: 'projects.portfolio.contexte',
    solutionKey: 'projects.portfolio.solution',
    pointsKeys: [
      'projects.portfolio.points.0',
      'projects.portfolio.points.1',
      'projects.portfolio.points.2',
      'projects.portfolio.points.3',
    ],
    resultatKey: 'projects.portfolio.resultat',
    roleKey: 'projects.portfolio.role',
    dureeKey: 'projects.portfolio.duree',
    equipeKey: 'projects.portfolio.equipe',
  },
]
