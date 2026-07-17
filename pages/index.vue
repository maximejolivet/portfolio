<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('seo.homeTitle')} - Maxime Jolivet`,
  description: () => t('hero.subtitle'),
  ogTitle: () => `${t('seo.homeTitle')} - Maxime Jolivet`,
  ogDescription: () => t('hero.subtitle'),
  ogImage: 'https://maximejolivet.fr/open-graph-maximejolivet.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <SectionsIntroOverlay />
    <SectionsHeroSection />
    <SectionsAboutSection />
    <SectionsExperienceSection />
    <SectionsTechStackSection />
    <SectionsProjectsSection />
    <SectionsNowSection />
    <SectionsBlogPreviewSection />
    <SectionsContactSection />
  </div>
</template>
