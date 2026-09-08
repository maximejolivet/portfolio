<script setup>
const { t } = useI18n()

// Client logos shown in the projects preview shouldn't turn up in Google
// Images even though the page itself is indexed for text search.
useHead({
  meta: [{ name: 'robots', content: 'noimageindex' }],
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
