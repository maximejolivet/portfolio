<script setup>
const localePath = useLocalePath()

useHead({
  title: 'Maxime Jolivet',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
  <div class="bg-black">
    <h1 class="sr-only">
      Maxime Jolivet - Développeur web full-stack senior PHP - JavaScript / Expert Drupal
    </h1>
    <div class="flex h-screen flex-col items-center justify-center">
      <div class="flex justify-center gap-4 pt-6">
        <img src="/maxime.svg" alt="Maxime Jolivet" width="200" height="200" />
      </div>
      <div class="flex flex-wrap justify-center gap-4 pt-6">
        <NuxtLink
          :to="localePath('/cv')"
          rel="nofollow"
          class="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          {{ $t('cv.read') }} <span class="inline-block pl-1">🚀</span>
        </NuxtLink>
        <!-- <NuxtLink
          :to="localePath('/dev')"
          class="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-white/10"
        >
          {{ $t('dev.cta') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/blog')"
          class="rounded-xl border border-white px-6 py-3 font-semibold text-white transition
            hover:scale-105 hover:bg-white/10"
        >
          {{ $t('blog.title') }}
        </NuxtLink> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
