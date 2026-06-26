<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('blog.title')} — Maxime Jolivet`,
  ogTitle: () => `${t('blog.title')} — Maxime Jolivet`,
  description: () => t('blog.subtitle'),
})

const { data: articles, pending, error } = await useArticles()

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
  <div class="min-h-screen bg-black px-6 py-16 md:py-24">
    <div class="mx-auto max-w-5xl">
      <NuxtLink
        :to="localePath('/')"
        class="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition
          hover:text-white"
      >
        ← {{ $t('blog.back') }}
      </NuxtLink>

      <h1 class="text-3xl font-black tracking-tight text-white md:text-4xl">
        {{ $t('blog.title') }}
      </h1>
      <p class="mt-3 text-gray-400">{{ $t('blog.subtitle') }}</p>

      <p v-if="pending" class="mt-12 text-gray-500">{{ $t('blog.loading') }}</p>
      <p v-else-if="error" class="mt-12 text-gray-500">{{ $t('blog.error') }}</p>
      <p v-else-if="!articles.length" class="mt-12 text-gray-500">{{ $t('blog.empty') }}</p>

      <div v-else class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="localePath(`/blog/${slug(article)}`)"
          class="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5
            transition hover:bg-white/10"
        >
          <img
            v-if="article.cover_image_url"
            :src="article.cover_image_url"
            :alt="title(article)"
            class="h-40 w-full object-cover"
          />
          <div class="flex flex-1 flex-col p-6">
            <p class="text-xs text-gray-500">{{ formattedDate(article.published_at) }}</p>
            <h2 class="mt-2 text-lg font-semibold text-white">
              {{ title(article) }}
            </h2>
            <p class="mt-2 flex-1 text-sm text-gray-400">
              {{ excerpt(article) }}
            </p>
            <span class="mt-4 text-sm text-white underline hover:no-underline">
              {{ $t('blog.read_more') }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
