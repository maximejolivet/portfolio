<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('blog.title')} - Maxime Jolivet`,
  ogTitle: () => `${t('blog.title')} - Maxime Jolivet`,
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
  <div>
    <div>
      <NuxtLink
        :to="localePath('/')"
      >
        ← {{ $t('blog.back') }}
      </NuxtLink>

      <h1>
        {{ $t('blog.title') }}
      </h1>
      <p>{{ $t('blog.subtitle') }}</p>

      <p v-if="pending">{{ $t('blog.loading') }}</p>
      <p v-else-if="error">{{ $t('blog.error') }}</p>
      <p v-else-if="!articles.length">{{ $t('blog.empty') }}</p>

      <div v-else>
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="localePath(`/blog/${slug(article)}`)"
        >
          <img
            v-if="article.cover_image_url"
            :src="article.cover_image_url"
            :alt="title(article)"
          />
          <div>
            <p>
              {{ formattedDate(article.published_at) }}
            </p>
            <h2>
              {{ title(article) }}
            </h2>
            <p>
              {{ excerpt(article) }}
            </p>
            <span>
              {{ $t('blog.read_more') }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
