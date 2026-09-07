<script setup lang="ts">
import { GITHUB_REPO_URL } from '~/constants/pageSource'

const { t, locale } = useI18n()

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

useSeoMeta({
  title: () => `${t('statusPage.title')} - Maxime Jolivet`,
  description: () => t('statusPage.subtitle'),
})

interface StatusResponse {
  version: string | null
  buildDate: string | null
  commit: { sha: string, shortSha: string, url: string } | null
  lighthouse: {
    performance: number | null
    accessibility: number | null
    bestPractices: number | null
    seo: number | null
    auditedUrl: string
  } | null
  generatedAt: string
}

const { data, pending, error } = await useFetch<StatusResponse>('/api/status.json')

const LIGHTHOUSE_ROWS = [
  { key: 'performance', labelKey: 'statusPage.metrics.performance' },
  { key: 'accessibility', labelKey: 'statusPage.metrics.accessibility' },
  { key: 'bestPractices', labelKey: 'statusPage.metrics.bestPractices' },
  { key: 'seo', labelKey: 'statusPage.metrics.seo' },
] as const

function scoreColor(score: number | null | undefined) {
  if (score == null) return 'text-subtle'
  if (score >= 90) return 'text-mint'
  if (score >= 50) return 'text-[#c99a4a]'
  return 'text-destructive'
}

function formattedDate(value: string | null | undefined) {
  if (!value) return null
  return new Date(value).toLocaleDateString(locale.value === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div>
    <SectionsPageIntro
:eyebrow="$t('statusPage.eyebrow')" :title="$t('statusPage.title')"
      :subtitle="$t('statusPage.subtitle')"
/>

    <LayoutPageSection bare>
      <UiContainer class="flex max-w-[780px] flex-col gap-6 pb-24">
        <div v-if="pending" class="flex flex-col gap-4">
          <UiSkeleton class="h-32 w-full rounded-2xl" />
          <UiSkeleton class="h-32 w-full rounded-2xl" />
        </div>
        <UiEmptyState v-else-if="error || !data" icon="lucide:wifi-off" :message="$t('statusPage.error')" />

        <template v-else>
          <UiCard class="font-mono text-sm">
            <dl class="flex flex-col gap-3">
              <div class="flex items-center justify-between gap-3">
                <dt class="text-subtle">
                  {{ $t('statusPage.version') }}
                </dt>
                <dd class="text-foreground">
                  v{{ data.version ?? '—' }}
                </dd>
              </div>
              <div class="flex items-center justify-between gap-3 border-t border-border pt-3">
                <dt class="text-subtle">
                  {{ $t('statusPage.commit') }}
                </dt>
                <dd>
                  <a
v-if="data.commit" :href="data.commit.url" target="_blank" rel="noopener noreferrer"
                    class="text-accent hover:underline"
>
                    {{ data.commit.shortSha }}
                  </a>
                  <span v-else class="text-foreground">—</span>
                </dd>
              </div>
              <div class="flex items-center justify-between gap-3 border-t border-border pt-3">
                <dt class="text-subtle">
                  {{ $t('statusPage.buildDate') }}
                </dt>
                <dd class="text-foreground">
                  {{ formattedDate(data.buildDate) ?? '—' }}
                </dd>
              </div>
            </dl>
          </UiCard>

          <UiCard>
            <p class="mb-1 font-mono text-xs font-bold tracking-[1.5px] text-subtle">
              {{ $t('statusPage.lighthouse').toUpperCase() }}
            </p>

            <div v-if="data.lighthouse" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div v-for="row in LIGHTHOUSE_ROWS" :key="row.key" class="flex flex-col gap-1">
                <span class="font-mono text-2xl font-bold" :class="scoreColor(data.lighthouse[row.key])">
                  {{ data.lighthouse[row.key] ?? '—' }}
                </span>
                <span class="font-mono text-[0.6875rem] text-subtle">
                  {{ $t(row.labelKey) }}
                </span>
              </div>
            </div>
            <p v-else class="font-mono text-xs text-subtle">
              {{ $t('statusPage.lighthouseUnavailable') }}
            </p>

            <a
v-if="data.lighthouse"
              :href="`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(data.lighthouse.auditedUrl)}`"
              target="_blank" rel="noopener noreferrer"
              class="mt-3 inline-block font-mono text-xs text-accent hover:underline"
>
              {{ $t('statusPage.viewFullReport') }}
            </a>
          </UiCard>

          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
            <a href="/api/status.json" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">
              {{ $t('statusPage.viewJson') }}
            </a>
            <a :href="GITHUB_REPO_URL" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">
              {{ $t('footer.viewSource') }}
            </a>
          </div>
        </template>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
