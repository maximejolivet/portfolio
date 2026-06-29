<script setup lang="ts">
definePageMeta({ layout: 'home' })

const { t } = useI18n()

useSeoMeta({
  title: () => `${t('projectsPage.title')} - Maxime Jolivet`,
  description: () => t('projectsPage.subtitle'),
})
</script>

<template>
  <div>
    <SectionsPageIntro
:eyebrow="$t('projectsPage.eyebrow')" :title-start="$t('projectsPage.titleStart')"
      :title-highlight="$t('projectsPage.titleHighlight')" :title-end="$t('projectsPage.titleEnd')"
      :subtitle="$t('projectsPage.subtitle')"
/>
    <SectionsProjectsSection />
  </div>
</template>
