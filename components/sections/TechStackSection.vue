<script setup lang="ts">
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="tech">
    <UiSectionHeading :eyebrow="$t('techSection.eyebrow')" align="center" class="mx-auto">
      <template #title>
        {{ $t('techSection.titleStart') }}
        <UiGradientText>{{ $t('techSection.titleHighlight') }}</UiGradientText>
        {{ $t('techSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <AnimationsScrollReveal
      as="div"
      :stagger="0.06"
      class="mx-auto mt-14 max-w-4xl space-y-10"
    >
      <div v-for="category in TECH_CATEGORIES" :key="category.id">
        <h3 class="font-display text-xl font-semibold text-white sm:text-2xl">
          {{ t(category.labelKey) }}
        </h3>
        <p class="mt-1 text-sm text-white/50">
          {{ t(category.descriptionKey) }}
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <span
            v-for="item in category.items"
            :key="item.id"
            class="glass flex items-center gap-3 rounded-full px-4 py-2 text-base text-white/70
              transition hover:bg-white/6 hover:text-white"
          >
            <UiAppIcon :icon="item.icon" class="h-8 w-8" />
            {{ item.name }}
          </span>
        </div>
      </div>
    </AnimationsScrollReveal>
  </LayoutPageSection>
</template>
