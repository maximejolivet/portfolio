<script setup lang="ts">
import type { ChangelogEntry, ChangelogType } from '~/server/api/changelog.get'

const { t, locale } = useI18n()

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

useSeoMeta({
  title: () => `${t('changelogPage.title')} - Maxime Jolivet`,
  description: () => t('changelogPage.subtitle'),
})

const { data, pending, error } = await useFetch<{ entries: ChangelogEntry[] }>('/api/changelog')
const entries = computed(() => data.value?.entries ?? [])

const BADGE_VARIANTS: Record<ChangelogType, 'default' | 'destructive' | 'secondary'> = {
  feat: 'default',
  fix: 'destructive',
  perf: 'secondary',
  security: 'secondary',
}

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
      :eyebrow="$t('changelogPage.eyebrow')"
      :title="$t('changelogPage.title')"
      :subtitle="$t('changelogPage.subtitle')"
    />

    <LayoutPageSection bare>
      <UiContainer class="max-w-[880px]">
        <div v-if="pending" class="flex flex-col pb-20">
          <div v-for="i in 5" :key="i" class="flex flex-col gap-2.5 border-b border-border py-6">
            <UiSkeleton class="h-3 w-24" />
            <UiSkeleton class="h-5 w-2/3" />
          </div>
        </div>
        <UiEmptyState
          v-else-if="error"
          icon="lucide:wifi-off"
          :message="$t('changelogPage.error')"
        />
        <UiEmptyState
          v-else-if="!entries.length"
          icon="lucide:git-commit-horizontal"
          :message="$t('changelogPage.empty')"
        />

        <div v-else class="flex flex-col pb-20">
          <a
            v-for="entry in entries"
            :key="entry.url"
            :href="entry.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col gap-2 border-b border-border py-6 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <div
              class="flex shrink-0 items-center gap-2 font-mono text-[0.7812rem] text-subtle sm:w-40"
            >
              {{ formattedDate(entry.date) }}
            </div>
            <div class="flex flex-1 flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <UiBadge :variant="BADGE_VARIANTS[entry.type]">
                {{ $t(`changelogPage.types.${entry.type}`) }}
              </UiBadge>
              <span class="font-mono text-[0.75rem] text-subtle">{{ entry.scope }}</span>
              <span
                class="text-pretty font-sans text-[0.9375rem] text-foreground group-hover:text-accent"
              >
                {{ entry.description }}
              </span>
            </div>
          </a>
        </div>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
