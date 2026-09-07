import { CASE_STUDIES } from '~/constants/projects'
import { EXPERIENCE_TIMELINE } from '~/constants/experience'
import { TECH_CATEGORIES } from '~/constants/techstack'
import { SOCIAL_LINKS } from '~/constants/social'
import { CONTACT_EMAIL } from '~/constants/contact'
import fr from '~/i18n/locales/fr.json'
import en from '~/i18n/locales/en.json'
import br from '~/i18n/locales/br.json'

const LOCALES = { fr, en, br } as const
type Locale = keyof typeof LOCALES

function t(locale: Locale, key: string): string {
  const value = key.split('.').reduce<unknown>((node, segment) => {
    return typeof node === 'object' && node !== null
      ? (node as Record<string, unknown>)[segment]
      : undefined
  }, LOCALES[locale])

  return typeof value === 'string' ? value : ''
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

function buildProjectsSection(locale: Locale): string {
  return CASE_STUDIES.map((study) => {
    const org = study.company ?? study.employer ?? ''
    const points = study.pointsKeys.map((key) => t(locale, key)).filter(Boolean)

    const result = t(locale, study.resultatKey)
    const meta = [
      ['Role', t(locale, study.roleKey)],
      ['Duration', t(locale, study.dureeKey)],
      ['Team', t(locale, study.equipeKey)],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join(' · ')

    return [
      `### ${t(locale, study.titleKey)} — ${org} (${study.year})`,
      t(locale, study.taglineKey),
      '',
      `Context: ${t(locale, study.contexteKey)}`,
      `Solution: ${t(locale, study.solutionKey)}`,
      ...(points.length ? points.map((point) => `- ${point}`) : []),
      ...(result ? [`Result: ${result}`] : []),
      ...(meta ? [meta] : []),
      `Tags: ${study.tags.join(', ')}`,
    ].join('\n')
  }).join('\n\n')
}

function buildDocument(locale: Locale): string {
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

${buildProjectsSection(locale)}

## Contact

Email: ${CONTACT_EMAIL}
${SOCIAL_LINKS.map((link) => `${link.label}: ${link.href}`).join('\n')}
`
}

export default defineCachedEventHandler(
  (event) => {
    const query = getQuery(event)
    const locale: Locale = query.lang === 'en' || query.lang === 'br' ? query.lang : 'fr'

    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return buildDocument(locale)
  },
  { maxAge: 60 * 60 * 24, swr: true },
)
