<script setup lang="ts">
import { SOCIAL_LINKS } from '~/constants/social'

interface GithubActivity {
  repo: string
  message: string
  date: string
  url: string
}

const { locale } = useI18n()

const githubProfileUrl = SOCIAL_LINKS.find((link) => link.id === 'github')?.href
const LISTENING_URL = 'https://open.spotify.com/user/tomorrowlandofficial'

const NOW_ITEMS = ['building', 'reading', 'listening', 'shipped'] as const

const { data: githubActivityResponse } = await useFetch<{ activity: GithubActivity[] }>(
  '/api/github-activity',
)
const githubActivity = computed(() => githubActivityResponse.value?.activity ?? [])
const buildingActivity = computed(() => githubActivity.value[0])
const shippedActivity = computed(() => githubActivity.value.slice(1))

function linkFor(item: (typeof NOW_ITEMS)[number]) {
  if (item === 'building') return buildingActivity.value?.url
  if (item === 'listening') return LISTENING_URL
  return undefined
}

const currentMonth = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'fr-FR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date()),
)
</script>

<template>
  <section id="now" class="mt-24 bg-panel text-panel-foreground">
    <UiContainer class="py-16">
      <div class="mb-9 flex items-center gap-4">
        <UiAppIcon icon="lucide:radio" class="size-8 shrink-0 text-mint" />
        <h2 class="font-sans text-[2rem] font-bold leading-[1.1] tracking-tight">
          {{ $t('home.now.sectionTitle') }}
        </h2>
        <div class="h-px flex-1 bg-panel-foreground/[0.18]" />
        <span class="hidden font-mono text-xs text-panel-foreground/50 sm:inline">{{
          currentMonth
        }}</span>
        <a
          v-if="githubProfileUrl"
          :href="githubProfileUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex shrink-0 items-center gap-1.5 font-mono text-xs text-panel-foreground/50 transition-colors hover:text-mint"
        >
          <UiAppIcon icon="lucide:github" class="size-3.5" />
          {{ $t('home.now.viewGithub') }}
        </a>
      </div>

      <div class="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        <SectionsNowCard
          v-for="item in NOW_ITEMS"
          :key="item"
          :item="item"
          :title-override="item === 'building' ? buildingActivity?.repo : undefined"
          :detail-override="item === 'building' ? buildingActivity?.message : undefined"
          :link-override="linkFor(item)"
          :shipped-items="item === 'shipped' ? shippedActivity : undefined"
        />
      </div>
    </UiContainer>
  </section>
</template>
