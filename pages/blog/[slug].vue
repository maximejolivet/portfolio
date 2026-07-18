<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = Array.isArray(route.params.slug) ? (route.params.slug[0] ?? '') : route.params.slug

const article = ref<Article | null>(null)
const pending = ref(false)
const error = ref<unknown>(null)
const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

try {
  const result = await useArticle(slug)
  article.value = result.data.value
  pending.value = result.pending.value
  error.value = result.error.value
  status.value = result.status.value
}
catch (fetchError) {
  error.value = fetchError
  status.value = 'error'
}

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

watch(
  status,
  () => {
    if (status.value === 'success' && !article.value) {
      showError(createError({ statusCode: 404, statusMessage: t('blog.not_found') }))
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: () => `${article.value ? title.value : t('blog.title')} - Maxime Jolivet`,
  ogTitle: () => (article.value ? title.value : t('blog.title')),
  description: () => excerpt.value || t('blog.subtitle'),
  ogImage: () => article.value?.cover_image_url ?? undefined,
})
</script>

<template>
  <div>
    <LayoutPageSection bare>
      <UiContainer class="max-w-[880px]">
        <div class="py-8">
          <NuxtLink
            :to="localePath('blog')"
            class="inline-flex items-center gap-1 font-mono text-xs font-semibold text-muted-foreground hover:text-accent"
          >
            <UiAppIcon icon="lucide:arrow-left" class="size-3" />{{ $t('blog.back_to_list') }}
          </NuxtLink>
        </div>

        <p v-if="pending" class="pb-20 text-center font-mono text-sm text-muted-foreground">
          {{ $t('blog.loading') }}
        </p>
        <p v-else-if="error" class="pb-20 text-center font-mono text-sm text-muted-foreground">
          {{ $t('blog.error') }}
        </p>

        <template v-else-if="article">
          <span class="font-mono text-[0.7812rem] text-subtle">{{ formattedDate }}</span>
          <h1
            class="mt-3 text-balance font-sans text-[clamp(2.125rem,4.2vw,3.125rem)] font-bold leading-[1.1] tracking-[-1px] text-foreground"
          >
            {{ title }}
          </h1>
          <img
            v-if="article.cover_image_url"
            :src="article.cover_image_url"
            :alt="title"
            class="mt-10 w-full rounded-2xl border border-border object-cover"
          />
          <div class="mt-10 flex flex-col gap-5 pb-24">
            <p
              v-for="paragraph in paragraphs"
              :key="paragraph"
              class="text-pretty font-sans text-[1rem] leading-[1.8] text-muted-foreground"
            >
              {{ paragraph }}
            </p>
          </div>
        </template>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
