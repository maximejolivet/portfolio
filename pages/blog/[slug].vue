<script setup lang="ts">
definePageMeta({ layout: 'home' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = Array.isArray(route.params.slug) ? route.params.slug[0] ?? '' : route.params.slug
const { data: article, pending, error, status } = await useArticle(slug)

const title = computed(() => {
  if (!article.value) return ''
  return locale.value === 'en' ? article.value.title_en : article.value.title_fr
})
const excerpt = computed(() => {
  if (!article.value) return ''
  return locale.value === 'en' ? article.value.excerpt_en : article.value.excerpt_fr
})
const paragraphs = computed(() => {
  if (!article.value) return []
  const content = locale.value === 'en' ? article.value.content_en : article.value.content_fr
  return content.split(/\n\s*\n/).filter((paragraph: string) => paragraph.trim().length > 0)
})

const formattedDate = computed(() => {
  if (!article.value) return ''
  return new Date(article.value.published_at).toLocaleDateString(
    locale.value === 'en' ? 'en-US' : 'fr-FR',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
})

watch(status, () => {
  if (status.value === 'success' && !article.value) {
    showError(createError({ statusCode: 404, statusMessage: t('blog.not_found') }))
  }
}, { immediate: true })

useSeoMeta({
  title: () => `${article.value ? title.value : t('blog.title')} - Maxime Jolivet`,
  ogTitle: () => (article.value ? title.value : t('blog.title')),
  description: () => excerpt.value || t('blog.subtitle'),
  ogImage: () => article.value?.cover_image_url ?? undefined,
})
</script>

<template>
  <div class="min-h-screen px-6 pt-32 pb-16 md:pb-24">
    <div class="mx-auto max-w-2xl">
      <NuxtLink
        :to="localePath('/blog')"
        class="mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition
          hover:text-fg"
      >
        ← {{ $t('blog.back_to_list') }}
      </NuxtLink>

      <p v-if="pending" class="text-fg-muted">{{ $t('blog.loading') }}</p>
      <p v-else-if="error" class="text-fg-muted">{{ $t('blog.error') }}</p>

      <template v-else-if="article">
        <p class="font-mono text-xs text-fg-muted">{{ formattedDate }}</p>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
          {{ title }}
        </h1>
        <img
          v-if="article.cover_image_url"
          :src="article.cover_image_url"
          :alt="title"
          class="mt-8 w-full rounded-xl object-cover grayscale"
        />
        <div class="mt-8 space-y-4 leading-relaxed text-fg-muted">
          <p v-for="paragraph in paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
