<script setup>
import { CONTACT_EMAIL } from '~/constants/contact'
import { SOCIAL_LINKS } from '~/constants/social'

const { t } = useI18n()

// Client logos shown in the projects preview shouldn't turn up in Google
// Images even though the page itself is indexed for text search.
useHead({
  meta: [{ name: 'robots', content: 'noimageindex' }],
  // Person + WebSite JSON-LD: gives Google a direct, structured signal that
  // github.com/maximejolivet and linkedin.com/in/jolivetmaxime are the same
  // person as this site - helps disambiguation against homonyms in search.
  script: [
    {
      key: 'ld-json-person-website',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          'name': 'Maxime Jolivet',
          'url': 'https://www.maxime.bzh',
          'jobTitle': t('hero.role'),
          'email': `mailto:${CONTACT_EMAIL}`,
          'image': 'https://www.maxime.bzh/maximejolivet.jpg',
          'address': { '@type': 'PostalAddress', 'addressLocality': 'Nantes', 'addressCountry': 'FR' },
          'sameAs': SOCIAL_LINKS.map((link) => link.href),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'Maxime Jolivet',
          'url': 'https://www.maxime.bzh',
          'inLanguage': ['fr-FR', 'en-US', 'br-FR'],
        },
      ]),
    },
  ],
})

useSeoMeta({
  title: () => `${t('seo.homeTitle')} - Maxime Jolivet`,
  description: () => t('hero.subtitle'),
  ogTitle: () => `${t('seo.homeTitle')} - Maxime Jolivet`,
  ogDescription: () => t('hero.subtitle'),
  ogImage: 'https://www.maxime.bzh/open-graph-maximejolivet.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <SectionsHeroSection />
    <SectionsAboutSection />
    <SectionsExperienceSection />
    <SectionsTechStackSection />
    <SectionsProjectsSection />
    <SectionsNowSection />
    <SectionsSocialLinksSection />
    <SectionsContactSection />
  </div>
</template>
