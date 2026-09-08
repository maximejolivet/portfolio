import { EXPERIENCE_TIMELINE } from '~/constants/experience'
import { TECH_CATEGORIES } from '~/constants/techstack'
import { SOCIAL_LINKS } from '~/constants/social'
import { CONTACT_EMAIL } from '~/constants/contact'

function buildResume(locale: Locale) {
  const work = EXPERIENCE_TIMELINE.map((item) => ({
    name: t(locale, item.organizationKey),
    position: t(locale, item.titleKey),
    url: item.organizationUrl,
    location: t(locale, item.locationKey),
    period: t(locale, item.periodKey),
    summary: item.introKey ? t(locale, item.introKey) : t(locale, item.descriptionKey ?? ''),
    highlights: (item.descriptionPointsKeys ?? [])
      .map((key) => t(locale, key))
      .filter(Boolean),
  }))

  const skills = TECH_CATEGORIES.map((category) => ({
    name: t(locale, category.labelKey),
    keywords: category.items.map((item) => item.name),
  }))

  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json',
    basics: {
      name: 'Maxime Jolivet',
      label: t(locale, 'hero.role'),
      image: 'https://www.maxime.bzh/maximejolivet.jpg',
      email: CONTACT_EMAIL,
      url: 'https://www.maxime.bzh',
      summary: t(locale, 'hero.bio'),
      location: {
        city: t(locale, 'hero.location'),
        countryCode: 'FR',
      },
      profiles: SOCIAL_LINKS.map((link) => ({
        network: link.label,
        url: link.href,
      })),
    },
    work,
    skills,
    meta: {
      canonical: `https://www.maxime.bzh/api/cv.json?lang=${locale}`,
      lastModified: new Date().toISOString(),
    },
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    return buildResume(resolveLocale(query.lang))
  },
  { maxAge: 60 * 60 * 24, swr: true, getKey: (event) => resolveLocale(getQuery(event).lang) },
)
