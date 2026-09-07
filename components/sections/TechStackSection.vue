<script setup lang="ts">
import { NuxtLink } from '#components'
import { CASE_STUDIES } from '~/constants/projects'
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()
const localePath = useLocalePath()

const matchCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const category of TECH_CATEGORIES) {
    for (const item of category.items) {
      counts[item.id] = projectsForTech(item.id, CASE_STUDIES).length
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

const viewMode = ref<'list' | 'graph'>('list')
const selectedCategoryId = ref<string | null>(null)

const CATEGORY_RADIUS = 30
const ITEM_RADIUS = 42

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

const categoryNodes = computed(() =>
  TECH_CATEGORIES.map((category, index) => {
    const angle = -90 + index * (360 / TECH_CATEGORIES.length)
    return {
      id: category.id,
      category,
      index,
      angle,
      x: 50 + CATEGORY_RADIUS * Math.cos(toRad(angle)),
      y: 50 + CATEGORY_RADIUS * Math.sin(toRad(angle)),
      size: Math.min(60, 40 + category.items.length * 1.2),
    }
  }),
)

const selectedCategory = computed(
  () => categoryNodes.value.find((node) => node.id === selectedCategoryId.value) ?? null,
)

const selectedItemNodes = computed(() => {
  const node = selectedCategory.value
  if (!node) return []
  const items = node.category.items
  const spread = items.length === 1 ? 0 : Math.min(150, items.length * 13)
  return items.map((item, i) => {
    const offset = items.length === 1 ? 0 : -spread / 2 + (spread / (items.length - 1)) * i
    const angle = node.angle + offset
    const count = matchCounts.value[item.id] ?? 0
    return {
      item,
      x: 50 + ITEM_RADIUS * Math.cos(toRad(angle)),
      y: 50 + ITEM_RADIUS * Math.sin(toRad(angle)),
      size: Math.min(44, 28 + count * 3),
      count,
    }
  })
})

function toggleCategory(id: string) {
  selectedCategoryId.value = selectedCategoryId.value === id ? null : id
}
</script>

<template>
  <LayoutPageSection id="tech" class="pt-24">
    <UiSectionHeading
      :title="$t('techSection.eyebrow')"
      icon="lucide:code"
      diamond="mint"
      :caption="caption"
    />

    <div class="-mt-4 mb-2 flex flex-wrap items-center justify-between gap-3">
      <p class="font-mono text-xs text-subtle">
        {{ viewMode === 'list' ? t('techSection.filterHint') : t('techSection.graphHint') }}
      </p>

      <div class="flex h-9 items-center gap-0.5 rounded-full border border-border bg-white p-0.5">
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-full px-3 font-mono text-xs font-semibold transition-colors"
          :class="
            viewMode === 'list'
              ? 'bg-primary text-primary-foreground'
              : 'text-primary-foreground/60 hover:text-accent'
          "
          :aria-pressed="viewMode === 'list'"
          @click="viewMode = 'list'"
        >
          <UiAppIcon icon="lucide:list" class="size-3.5" />
          {{ t('techSection.viewList') }}
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-full px-3 font-mono text-xs font-semibold transition-colors"
          :class="
            viewMode === 'graph'
              ? 'bg-primary text-primary-foreground'
              : 'text-primary-foreground/60 hover:text-accent'
          "
          :aria-pressed="viewMode === 'graph'"
          @click="viewMode = 'graph'"
        >
          <UiAppIcon icon="lucide:share-2" class="size-3.5" />
          {{ t('techSection.viewGraph') }}
        </button>
      </div>
    </div>

    <div v-if="viewMode === 'list'" class="flex flex-col">
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

    <div v-else class="mx-auto flex w-full max-w-[560px] flex-col items-center">
      <div class="relative aspect-square w-full select-none py-6">
        <svg viewBox="0 0 100 100" class="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
          <line
            v-for="node in categoryNodes"
            :key="`hub-${node.id}`"
            x1="50"
            y1="50"
            :x2="node.x"
            :y2="node.y"
            stroke-width="0.4"
            :style="{ stroke: 'var(--color-border)' }"
          />
          <line
            v-for="itemNode in selectedItemNodes"
            :key="`edge-${itemNode.item.id}`"
            :x1="selectedCategory?.x"
            :y1="selectedCategory?.y"
            :x2="itemNode.x"
            :y2="itemNode.y"
            stroke-width="0.5"
            stroke-opacity="0.6"
            :style="{ stroke: LABEL_COLOR_HEX[(selectedCategory?.index ?? 0) % LABEL_COLOR_HEX.length] }"
          />
        </svg>

        <div
          aria-hidden="true"
          class="absolute flex size-11 items-center justify-center rounded-full border border-border bg-background text-subtle"
          style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
        >
          <UiAppIcon icon="lucide:code" class="size-5" />
        </div>

        <button
          v-for="node in categoryNodes"
          :key="node.id"
          type="button"
          class="absolute flex items-center justify-center rounded-full border transition-transform hover:z-10 hover:scale-110"
          :style="{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            transform: 'translate(-50%, -50%)',
            ...tagStyle(node.id, node.index),
          }"
          :aria-pressed="selectedCategoryId === node.id"
          :aria-label="t(node.category.labelKey)"
          :title="t(node.category.labelKey)"
          @click="toggleCategory(node.id)"
        >
          <UiAppIcon :icon="CATEGORY_ICONS[node.id]" class="size-4" />
        </button>

        <component
          :is="itemNode.count ? NuxtLink : 'span'"
          v-for="itemNode in selectedItemNodes"
          :key="itemNode.item.id"
          :to="
            itemNode.count
              ? { path: localePath('projects'), query: { tech: itemNode.item.id } }
              : undefined
          "
          class="absolute flex items-center justify-center rounded-full border transition-transform"
          :class="itemNode.count && 'cursor-pointer hover:z-10 hover:scale-110'"
          :style="{
            left: `${itemNode.x}%`,
            top: `${itemNode.y}%`,
            width: `${itemNode.size}px`,
            height: `${itemNode.size}px`,
            transform: 'translate(-50%, -50%)',
            ...tagStyle(itemNode.item.id, selectedCategory?.index ?? 0),
          }"
          :title="
            itemNode.count
              ? t('techSection.viewProjects', { count: itemNode.count })
              : itemNode.item.name
          "
        >
          <UiAppIcon :icon="itemNode.item.icon" class="size-3.5" />
        </component>
      </div>

      <p v-if="selectedCategory" class="text-center font-mono text-xs text-subtle">
        {{ t(selectedCategory.category.descriptionKey) }}
      </p>
    </div>
  </LayoutPageSection>
</template>
