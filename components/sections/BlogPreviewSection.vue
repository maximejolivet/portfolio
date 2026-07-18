<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const previewArticles = ref<ArticleSummary[]>([])

try {
  const { data: articles } = await useArticles()
  previewArticles.value = articles.value.slice(0, 3)
} catch (error) {
  // Supabase isn't configured in this environment - skip the preview gracefully.
  console.error('[home] blog preview unavailable:', (error as Error)?.message ?? error)
}

const title = (article: ArticleSummary) =>
  (locale.value === 'en' ? article.title_en : article.title_fr) || article.title_fr

const slug = (article: ArticleSummary) =>
  locale.value === 'en' ? article.slug_en : article.slug_fr

const formattedDate = (value: string) =>
  new Date(value).toLocaleDateString(locale.value === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
</script>

<template>
  <LayoutPageSection v-if="previewArticles.length" id="blog-preview" class="pt-24">
    <UiSectionHeading :title="$t('home.blog.sectionTitle')" icon="lucide:newspaper" diamond="gold">
      <template #caption>
        <NuxtLink :to="localePath('blog')" class="inline-flex items-center gap-1 hover:text-accent">
          {{ $t('home.blog.viewAll') }}<UiAppIcon icon="lucide:arrow-right" class="size-3" />
        </NuxtLink>
      </template>
    </UiSectionHeading>

    <div class="flex flex-col">
      <NuxtLink
        v-for="article in previewArticles"
        :key="article.id"
        :to="localePath(`/blog/${slug(article)}`)"
        class="grid items-baseline gap-3 border-b border-border py-5 sm:grid-cols-[120px_1fr]"
      >
        <span class="font-mono text-[0.7812rem] text-subtle">{{
          formattedDate(article.published_at)
        }}</span>
        <span
          class="font-sans text-lg font-bold tracking-[-0.4px] text-foreground hover:text-accent"
        >
          {{ title(article) }}
        </span>
      </NuxtLink>
    </div>
  </LayoutPageSection>
</template>
