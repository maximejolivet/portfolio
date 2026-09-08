<script setup lang="ts">
import { NuxtLink } from '#components'
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: projects } = await useProjects()

const matchCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const category of TECH_CATEGORIES) {
    for (const item of category.items) {
      counts[item.id] = projectsForTech(item.id, projects.value).length
    }
  }
  return counts
})

const LABEL_COLORS = ['text-[#c99a4a]', 'text-[#5097ae]', 'text-[#3fa98c]']
const LABEL_COLOR_HEX = ['#c99a4a', '#4d94ab', '#3fa98c']

function labelColor(index: number) {
  return LABEL_COLORS[index % LABEL_COLORS.length]
}

const CATEGORY_ICONS: Record<string, string> = {
  languages: 'lucide:braces',
  frontend: 'lucide:layout-panel-top',
  backend: 'lucide:server',
  cms: 'lucide:layout-template',
  database: 'lucide:database',
  ai: 'lucide:brain-circuit',
  aiTools: 'lucide:bot',
  devops: 'lucide:cloud',
  security: 'lucide:shield',
  testing: 'lucide:flask-conical',
  tools: 'lucide:wrench',
  watch: 'lucide:telescope',
}

// These logos ship with no brand color baked in (they rely on currentColor),
// which renders them plain white/ink instead of a distinct color like their neighbors.
const ICON_COLOR_OVERRIDES: Record<string, string> = {
  'github-copilot': '#8957e5',
  'openai-codex': '#10a37f',
  'chatgpt': '#ef767a',
  'vercel': '#e759b6',
}

function tagStyle(itemId: string, categoryIndex: number) {
  const color
    = ICON_COLOR_OVERRIDES[itemId] ?? LABEL_COLOR_HEX[categoryIndex % LABEL_COLOR_HEX.length]

  return {
    color,
    borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
    backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
  }
}

const caption = computed(() =>
  [t('techSection.titleStart'), t('techSection.titleHighlight'), t('techSection.titleEnd')]
    .join(' ')
    .toLowerCase(),
)
</script>

<template>
  <LayoutPageSection id="tech" class="pt-24">
    <UiSectionHeading
      :title="$t('techSection.eyebrow')"
      icon="lucide:code"
      diamond="mint"
      :caption="caption"
    />

    <p class="-mt-4 mb-2 font-mono text-xs text-subtle">
      {{ t('techSection.filterHint') }}
    </p>

    <div class="flex flex-col">
      <div
        v-for="(category, index) in TECH_CATEGORIES"
        :key="category.id"
        class="group grid gap-x-5 gap-y-2 border-b border-border px-3 py-6 transition-colors hover:bg-stripe/50 sm:grid-cols-[2.5rem_190px_1fr] sm:items-start"
      >
        <UiAppIcon
          :icon="CATEGORY_ICONS[category.id]"
          class="size-5 sm:pt-0.5"
          :class="labelColor(index)"
        />

        <div class="flex flex-col gap-1">
          <div class="font-mono text-sm font-bold tracking-[1.5px]" :class="labelColor(index)">
            {{ t(category.labelKey).toUpperCase() }}
          </div>
          <p class="max-w-xs text-xs leading-snug text-subtle">
            {{ t(category.descriptionKey) }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          <component
            :is="matchCounts[item.id] ? NuxtLink : 'span'"
            v-for="item in category.items"
            :key="item.id"
            :to="
              matchCounts[item.id]
                ? { path: localePath('projects'), query: { tech: item.id } }
                : undefined
            "
            :rel="matchCounts[item.id] ? 'nofollow' : undefined"
            class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-sm transition-transform"
            :class="matchCounts[item.id] && 'cursor-pointer hover:scale-105'"
            :style="tagStyle(item.id, index)"
            :title="
              matchCounts[item.id]
                ? t('techSection.viewProjects', { count: matchCounts[item.id] })
                : undefined
            "
          >
            <UiAppIcon :icon="item.icon" class="size-4 shrink-0" />
            {{ item.name }}
            <span
              v-if="matchCounts[item.id]"
              class="flex size-4 shrink-0 items-center justify-center rounded-full bg-current/20 text-[0.6875rem] leading-none"
            >{{ matchCounts[item.id] }}</span>
          </component>
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
