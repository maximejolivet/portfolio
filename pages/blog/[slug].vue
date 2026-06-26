<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const supabase = useSupabase()

interface Article {
  slug_fr: string
  slug_en: string
  title_fr: string
  title_en: string
  excerpt_fr: string
  excerpt_en: string
  content_fr: string
  content_en: string
  cover_image_url: string | null
  published_at: string
}

const { data: article, pending, error, status } = await useAsyncData<Article | null>(
  `article-${locale.value}-${route.params.slug}`,
  async () => {
    const slugColumn = locale.value === 'en' ? 'slug_en' : 'slug_fr'
    const { data, error: supabaseError } = await supabase
      .from('articles')
      // eslint-disable-next-line max-len
      .select('slug_fr, slug_en, title_fr, title_en, excerpt_fr, excerpt_en, content_fr, content_en, cover_image_url, published_at')
      .eq(slugColumn, route.params.slug)
      .lte('published_at', new Date().toISOString())
      .maybeSingle()

    if (supabaseError) throw supabaseError
    return data
  },
  { server: false, watch: [locale] },
)

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
  return content.split(/\n\s*\n/).filter((paragraph) => paragraph.trim().length > 0)
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
  title: () => `${article.value ? title.value : t('blog.title')} — Maxime Jolivet`,
  ogTitle: () => (article.value ? title.value : t('blog.title')),
  description: () => excerpt.value || t('blog.subtitle'),
  ogImage: () => article.value?.cover_image_url ?? undefined,
})
</script>

<template>
  <div class="min-h-screen bg-black px-6 py-16 md:py-24">
    <div class="mx-auto max-w-2xl">
      <NuxtLink
        :to="localePath('/blog')"
        class="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition
          hover:text-white"
      >
        ← {{ $t('blog.back_to_list') }}
      </NuxtLink>

      <p v-if="pending" class="text-gray-500">{{ $t('blog.loading') }}</p>
      <p v-else-if="error" class="text-gray-500">{{ $t('blog.error') }}</p>

      <template v-else-if="article">
        <p class="text-xs text-gray-500">{{ formattedDate }}</p>
        <h1 class="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
          {{ title }}
        </h1>
        <img
          v-if="article.cover_image_url"
          :src="article.cover_image_url"
          :alt="title"
          class="mt-8 w-full rounded-xl object-cover"
        />
        <div class="mt-8 space-y-4 leading-relaxed text-gray-300">
          <p v-for="(paragraph, index) in paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
