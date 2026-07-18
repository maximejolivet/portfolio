<script setup lang="ts">
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()

const LABEL_COLORS = ['text-[#c99a4a]', 'text-[#4d94ab]', 'text-[#3fa98c]']
</script>

<template>
  <LayoutPageSection id="tech" class="pt-24">
    <UiSectionHeading
      :title="$t('techSection.eyebrow')"
      icon="lucide:code"
      diamond="mint"
      :caption="`${$t('techSection.titleStart')} ${$t('techSection.titleHighlight')} ${$t('techSection.titleEnd')}`.toLowerCase()"
    />

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <UiCard
        v-for="(category, i) in TECH_CATEGORIES"
        :key="category.id"
        :class="category.id === 'tools' ? 'sm:col-span-2' : ''"
      >
        <div
          class="font-mono text-[0.75rem] font-bold tracking-[1.5px]"
          :class="LABEL_COLORS[i % LABEL_COLORS.length]"
        >
          {{ t(category.labelKey).toUpperCase() }}
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in category.items"
            :key="item.id"
            class="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs"
          >
            <UiAppIcon :icon="item.icon" class="size-3.5" />
            {{ item.name }}
          </span>
        </div>
      </UiCard>
    </div>
  </LayoutPageSection>
</template>
