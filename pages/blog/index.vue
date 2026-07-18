<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('blog.title')} - Maxime Jolivet`,
  ogTitle: () => `${t('blog.title')} - Maxime Jolivet`,
  description: () => t('blog.subtitle'),
})

const articles = ref<ArticleSummary[]>([])
const pending = ref(false)
const error = ref<unknown>(null)

try {
  const result = await useArticles()
  articles.value = result.data.value
  pending.value = result.pending.value
  error.value = result.error.value
}
catch (fetchError) {
  error.value = fetchError
}

const title = (article: ArticleSummary) =>
  (locale.value === 'en' ? article.title_en : article.title_fr) || article.title_fr
const excerpt = (article: ArticleSummary) =>
  (locale.value === 'en' ? article.excerpt_en : article.excerpt_fr) || article.excerpt_fr
const slug = (article: ArticleSummary) =>
  locale.value === 'en' ? article.slug_en : article.slug_fr

const formattedDate = (value: string) =>
  new Date(value).toLocaleDateString(locale.value === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
</script>

<template>
  <div>
    <SectionsPageIntro
      :eyebrow="$t('blog.eyebrow')"
      :title="$t('blog.title')"
      :subtitle="$t('blog.subtitle')"
    />

    <LayoutPageSection bare>
      <UiContainer class="max-w-[880px]">
        <p v-if="pending" class="py-10 text-center font-mono text-sm text-muted-foreground">
          {{ $t('blog.loading') }}
        </p>
        <p v-else-if="error" class="py-10 text-center font-mono text-sm text-muted-foreground">
          {{ $t('blog.error') }}
        </p>
        <p v-else-if="!articles.length" class="py-10 text-center font-mono text-sm text-muted-foreground">
          {{ $t('blog.empty') }}
        </p>

        <div v-else class="flex flex-col pb-20">
          <NuxtLink
            v-for="article in articles"
            :key="article.id"
            :to="localePath(`/blog/${slug(article)}`)"
            class="flex flex-col gap-2.5 border-b border-border py-7"
          >
            <div class="font-mono text-[0.7812rem] text-subtle">
              {{ formattedDate(article.published_at) }}
            </div>
            <h2
              class="text-balance font-sans text-[1.5625rem] font-bold leading-[1.25] tracking-[-0.5px] text-foreground hover:text-accent"
            >
              {{ title(article) }}
            </h2>
            <p class="text-pretty font-sans text-sm leading-[1.65] text-muted-foreground">
              {{ excerpt(article) }}
            </p>
            <span class="mt-0.5 inline-flex items-center gap-1 font-mono text-[0.8438rem] font-semibold text-accent">
              {{ $t('blog.read_more') }}<UiAppIcon icon="lucide:arrow-right" class="size-3" />
            </span>
          </NuxtLink>
        </div>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
