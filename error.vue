<template>
  <div class="min-h-screen flex flex-col justify-center items-center text-center p-4">
    <h1 class="text-4xl font-bold mb-4">{{ error.statusCode }}</h1>
    <p class="text-lg mb-6">{{ message }}</p>
    <NuxtLink to="/" class="text-blue-500 underline">
      {{ $t('error.back_home') }}
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const message = computed(() => {
  if (error.statusCode === 404) {
    return useI18n().t('error.page_not_found')
  }
  return useI18n().t('error.generic')
})
</script>
