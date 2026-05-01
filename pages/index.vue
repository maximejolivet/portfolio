<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

useHead({
  title: 'Maxime Jolivet',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <div class="bg-black">
    <h1 class="sr-only">Maxime Jolivet - Développeur web full-stack senior PHP - JavaScript / Expert Drupal</h1>
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="flex gap-4 justify-center pt-6">
        <img src="/maxime.svg" alt="Maxime Jolivet" width="200" height="200" />
      </div>
      <div class="flex gap-4 justify-center pt-6">
        <NuxtLink :to="localePath('/cv')" rel="nofollow"
          class="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition">
          {{ $t('cv.read') }} <span class="inline-block pl-1">🚀</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
