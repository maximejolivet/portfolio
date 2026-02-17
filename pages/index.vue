<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

useHead({
  title: 'Accueil - Maxime Jolivet',
})

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <div class="bg-black">
    <h1 class="sr-only">Maxime Jolivet - Développeur web fullstack</h1>
    <div class="flex items-center justify-center h-screen">
      <img src="/maxime.svg" alt="Maxime Jolivet" width="200" height="200" />
    </div>
  </div>
</template>

<style scoped></style>
