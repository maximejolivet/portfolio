import { createClient } from '@supabase/supabase-js'
import { EXPERIENCE_TIMELINE } from '~/constants/experience'
import { TECH_CATEGORIES } from '~/constants/techstack'
import { SOCIAL_LINKS } from '~/constants/social'
import { CONTACT_EMAIL } from '~/constants/contact'

// Project prose fields may contain WYSIWYG HTML (rendered with v-html on the
// site) - this is a plain-text file, so strip tags before including them.
function stripHtml(html: string | null): string {
  if (!html) return ''
  return html
    .replace(/<\/(p|li)>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

function buildExperienceSection(locale: Locale): string {
  return EXPERIENCE_TIMELINE.map((item) => {
    const points = (item.descriptionPointsKeys ?? []).map((key) => t(locale, key)).filter(Boolean)
    const summary = item.introKey ? t(locale, item.introKey) : t(locale, item.descriptionKey ?? '')

    return [
      `### ${t(locale, item.titleKey)} — ${t(locale, item.organizationKey)} (${t(locale, item.periodKey)})`,
      t(locale, item.locationKey),
      '',
      summary,
      ...(points.length ? ['', ...points.map((point) => `- ${point}`)] : []),
    ].join('\n')
  }).join('\n\n')
}

function buildTechStackSection(locale: Locale): string {
  return TECH_CATEGORIES.map((category) => [
    `### ${t(locale, category.labelKey)}`,
    t(locale, category.descriptionKey),
    `Tools: ${category.items.map((item) => item.name).join(', ')}`,
  ].join('\n')).join('\n\n')
}

async function buildProjectsSection(locale: Locale): Promise<string> {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[llms-full] fetch projects failed', error)
    return ''
  }

  const en = locale === 'en'

  return (data ?? []).map((study) => {
    const org = study.company ?? study.employer ?? ''
    const points: string[] = (en ? study.points_en : study.points_fr)
      .filter(Boolean)
      .map((point: string) => stripHtml(point))
    const result = stripHtml(en ? study.resultat_en : study.resultat_fr)

    const meta = [
      ['Role', en ? study.role_en : study.role_fr],
      ['Duration', en ? study.duree_en : study.duree_fr],
      ['Team', en ? study.equipe_en : study.equipe_fr],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join(' · ')

    return [
      `### ${en ? study.title_en : study.title_fr} — ${org} (${study.year})`,
      en ? study.tagline_en : study.tagline_fr,
      '',
      `Context: ${stripHtml(en ? study.contexte_en : study.contexte_fr)}`,
      `Solution: ${stripHtml(en ? study.solution_en : study.solution_fr)}`,
      ...(points.length ? points.map((point) => `- ${point}`) : []),
      ...(result ? [`Result: ${result}`] : []),
      ...(meta ? [meta] : []),
      `Tags: ${study.tags.join(', ')}`,
    ].join('\n')
  }).join('\n\n')
}

async function buildDocument(locale: Locale): Promise<string> {
  return `# Maxime Jolivet — Portfolio (full content)

> Full-detail companion to /llms.txt: same site, with the actual text of each
> key section inlined instead of just links, so an agent can read everything
> in one fetch. The structured/machine-readable alternatives (CV JSON, status
> JSON) are still listed in /llms.txt rather than repeated here.

## About

${t(locale, 'hero.bio')}

${t(locale, 'hero.subtitle')}

## Experience

${buildExperienceSection(locale)}

## Tech stack

${buildTechStackSection(locale)}

## Projects

${await buildProjectsSection(locale)}

## Contact

Email: ${CONTACT_EMAIL}
${SOCIAL_LINKS.map((link) => `${link.label}: ${link.href}`).join('\n')}
`
}

export default defineCachedEventHandler(
  async (event) => {
    const locale = resolveLocale(getQuery(event).lang)
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return await buildDocument(locale)
  },
  { maxAge: 60 * 60 * 24, swr: true, getKey: (event) => resolveLocale(getQuery(event).lang) },
)
