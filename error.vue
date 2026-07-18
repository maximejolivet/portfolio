<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-8 text-center"
  >
    <span class="font-mono text-sm font-bold text-accent">404</span>
    <h1
      class="text-balance font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-1px] text-foreground"
    >
      {{ message }}
    </h1>
    <p class="max-w-[440px] font-sans text-[1rem] leading-[1.6] text-muted-foreground">
      {{ $t('error.page_not_found_description') }}
    </p>

    <div class="mt-2 flex items-center gap-6">
      <UiButton to="/">
        {{ $t('error.back_home') }}
      </UiButton>

      <UiButton
        type="button"
        variant="pill-outline"
        @click="randomPage"
      >
        {{ $t('error.page_not_found_random_page') }}
      </UiButton>
    </div>

    <p class="font-mono text-[0.75rem] text-subtle">404: CAFEE_NOT_FOUND</p>
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
