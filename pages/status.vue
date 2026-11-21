<script setup lang="ts">
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
  generatedAt: string
}

const { data, pending, error } = await useFetch<StatusResponse>('/api/status.json')

function formattedDate(value: string | null | undefined) {
  if (!value) return null
  return new Date(value).toLocaleDateString(resolveDateLocale(locale.value), {
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
                  <span class="sr-only">{{ $t('a11y.newWindow') }}</span></a>
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

          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
            <a href="/api/status.json" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">
              {{ $t('statusPage.viewJson') }}
            <span class="sr-only">{{ $t('a11y.newWindow') }}</span></a>
          </div>
        </template>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
