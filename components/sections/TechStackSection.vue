<script setup lang="ts">
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()

const LABEL_COLORS = ['text-[#c99a4a]', 'text-[#4d94ab]', 'text-[#3fa98c]']
const PAIRED_IDS = ['cms', 'database']

function labelColor(categoryId: string) {
  const index = TECH_CATEGORIES.findIndex((category) => category.id === categoryId)
  return LABEL_COLORS[index % LABEL_COLORS.length]
}

const beforePaired = computed(() =>
  TECH_CATEGORIES.slice(
    0,
    TECH_CATEGORIES.findIndex((category) => category.id === PAIRED_IDS[0]),
  ),
)
const pairedCategories = computed(() =>
  TECH_CATEGORIES.filter((category) => PAIRED_IDS.includes(category.id)),
)
const afterPaired = computed(() =>
  TECH_CATEGORIES.slice(
    TECH_CATEGORIES.findIndex((category) => category.id === PAIRED_IDS.at(-1)) + 1,
  ),
)

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

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <CardsTechCategoryCard
        v-for="category in beforePaired"
        :key="category.id"
        :category="category"
        :label-color="labelColor(category.id)"
      />

      <UiCard class="sm:col-span-2">
        <div class="grid grid-cols-2 gap-6">
          <div
            v-for="category in pairedCategories"
            :key="category.id"
            class="flex flex-col gap-3.5"
          >
            <CardsTechCategoryContent :category="category" :label-color="labelColor(category.id)" />
          </div>
        </div>
      </UiCard>

      <CardsTechCategoryCard
        v-for="category in afterPaired"
        :key="category.id"
        :category="category"
        :label-color="labelColor(category.id)"
        :class="category.id === 'tools' ? 'sm:col-span-2' : ''"
      />
    </div>
  </LayoutPageSection>
</template>
