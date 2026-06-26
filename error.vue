<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center px-6">
    <div class="text-center space-y-8">
      <h1 class="text-8xl md:text-[12rem] font-black tracking-tight">404</h1>
      <p class="text-xl md:text-2xl text-gray-300">
        {{ message }}
      </p>

      <p class="text-gray-500">{{ $t('error.page_not_found_description') }}</p>

      <div class="flex gap-4 justify-center pt-6">
        <NuxtLink to="/" class="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition">
          {{ $t('error.back_home') }}
        </NuxtLink>

        <button class="px-6 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition" @click="randomPage">
          {{ $t('error.page_not_found_random_page') }}
        </button>
      </div>

      <p class="text-xs text-gray-600 pt-10 animate-pulse">404: CAFEE_NOT_FOUND</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const randomPage = () => {
  const pages = ['/', '/blog', '/dev']
  const pick = pages[Math.floor(Math.random() * pages.length)] ?? '/'
  router.push(pick)
}

const message = computed(() => {
  return useI18n().t('error.page_not_found')
})
</script>
