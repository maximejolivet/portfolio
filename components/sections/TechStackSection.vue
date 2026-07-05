<script setup lang="ts">
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="tech">
    <UiSectionHeading :eyebrow="$t('techSection.eyebrow')" align="center" class="mx-auto">
      <template #title>
        {{ $t('techSection.titleStart') }}
        <span class="text-accent">{{ $t('techSection.titleHighlight') }}</span>
        {{ $t('techSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <div class="mx-auto mt-14 max-w-4xl space-y-10">
      <div v-for="category in TECH_CATEGORIES" :key="category.id">
        <h3 class="text-sm font-semibold tracking-wide text-fg uppercase">
          {{ t(category.labelKey) }}
        </h3>
        <p class="mt-1 text-sm text-fg-muted">
          {{ t(category.descriptionKey) }}
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <span
            v-for="item in category.items"
            :key="item.id"
            class="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm
              text-fg-muted transition hover:border-white/30 hover:text-fg"
          >
            <UiAppIcon :icon="item.icon" class="h-5 w-5" />
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
