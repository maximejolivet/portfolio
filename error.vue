<template>
  <div>
    <div>
      <h1>404</h1>
      <p>
        {{ message }}
      </p>

      <p>{{ $t('error.page_not_found_description') }}</p>

      <div>
        <NuxtLink to="/">
          {{ $t('error.back_home') }}
        </NuxtLink>

        <button @click="randomPage">
          {{ $t('error.page_not_found_random_page') }}
        </button>
      </div>

      <p>404: CAFEE_NOT_FOUND</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const randomPage = () => {
  const pages = ['', 'blog', 'projects']
  const pick = pages[Math.floor(Math.random() * pages.length)] ?? '/'
  router.push(pick)
}

const message = computed(() => {
  return useI18n().t('error.page_not_found')
})
</script>
