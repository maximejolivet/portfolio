<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('dev.title')} — Maxime Jolivet`,
  ogTitle: () => `${t('dev.title')} — Maxime Jolivet`,
  description: () => t('dev.subtitle'),
})

const projectKeys = ['portfolio', 'ecommerce', 'api', 'taskmanager', 'cli', 'designsystem'] as const
type ProjectKey = (typeof projectKeys)[number]

const projectMeta: Record<ProjectKey, { tags: string[], live?: string, source?: string }> = {
  portfolio: {
    tags: ['Nuxt 4', 'TypeScript', 'Tailwind', 'GitHub Pages'],
    source: 'https://github.com/maximejolivet/portfolio',
  },
  ecommerce: {
    tags: ['Vue 3', 'Node.js', 'PostgreSQL', 'Stripe'],
    live: '#',
    source: '#',
  },
  api: {
    tags: ['Node.js', 'Express', 'JWT', 'Redis', 'Docker'],
    source: '#',
  },
  taskmanager: {
    tags: ['React', 'Zustand', 'Supabase', 'Vercel'],
    live: '#',
    source: '#',
  },
  cli: {
    tags: ['Rust', 'Clap', 'Tokio'],
    source: '#',
  },
  designsystem: {
    tags: ['Vue 3', 'Storybook', 'SCSS', 'NPM'],
    live: '#',
    source: '#',
  },
}
</script>

<template>
  <div class="min-h-screen bg-black px-6 py-16 md:py-24">
    <div class="mx-auto max-w-5xl">
      <NuxtLink
        :to="localePath('/')"
        class="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
      >
        ← {{ $t('dev.back') }}
      </NuxtLink>

      <h1 class="text-3xl font-black tracking-tight text-white md:text-4xl">
        {{ $t('dev.title') }}
      </h1>
      <p class="mt-3 text-gray-400">{{ $t('dev.subtitle') }}</p>

      <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="key in projectKeys"
          :key="key"
          class="flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
        >
          <h2 class="text-lg font-semibold text-white">
            {{ $t(`dev.projects.${key}.title`) }}
          </h2>
          <p class="mt-2 flex-1 text-sm text-gray-400">
            {{ $t(`dev.projects.${key}.description`) }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in projectMeta[key].tags"
              :key="tag"
              class="rounded bg-white/10 px-2 py-0.5 text-xs text-gray-300"
            >
              {{ tag }}
            </span>
          </div>
          <div v-if="projectMeta[key].live || projectMeta[key].source" class="mt-4 flex gap-4">
            <a
              v-if="projectMeta[key].live"
              :href="projectMeta[key].live"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-white underline hover:no-underline"
            >
              {{ $t('dev.live') }}
            </a>
            <a
              v-if="projectMeta[key].source"
              :href="projectMeta[key].source"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-white underline hover:no-underline"
            >
              {{ $t('dev.source') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
