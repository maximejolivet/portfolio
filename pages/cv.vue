<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

useSeoMeta({
  title: 'CV - Maxime Jolivet',
  ogTitle: 'CV - Maxime Jolivet, Développeur web full-stack',
  description: 'Développeur web full-stack senior PHP - JavaScript / Expert Drupal - Consultez le CV de Maxime Jolivet 🚀',
  ogDescription: 'Développeur web full-stack senior PHP - JavaScript / Expert Drupal - Consultez le CV de Maxime Jolivet 🚀',
  ogImage: 'https://maximejolivet.fr/open-graph-maximejolivet.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex flex-col h-screen bg-black">
    <div class="flex items-center justify-between px-6 py-3">
      <h1 class="text-white text-sm font-medium">Maxime Jolivet - CV</h1>
      <div class="flex items-center gap-4">
        <a href="/cv-maximejolivet-developpeur.pdf" download
          class="text-white/60 text-sm hover:text-white transition-colors">
          {{ $t('cv.download') }}
        </a>
        <NuxtLink v-for="loc in availableLocales" :key="loc.code" :to="switchLocalePath(loc.code)"
          class="text-white/60 text-sm hover:text-white transition-colors">
          {{ loc.name }}
        </NuxtLink>
      </div>
    </div>
    <iframe credentialless src="/cv-maximejolivet-developpeur.pdf" class="flex-1 w-full border-0"
      title="CV Maxime Jolivet - Développeur web full-stack" />
  </div>
</template>
