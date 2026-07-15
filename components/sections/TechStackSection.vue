<script setup lang="ts">
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="tech">
    <UiSectionHeading :eyebrow="$t('techSection.eyebrow')">
      <template #title>
        {{ $t('techSection.titleStart') }}
        <span>{{ $t('techSection.titleHighlight') }}</span>
        {{ $t('techSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <div>
      <div v-for="category in TECH_CATEGORIES" :key="category.id">
        <h3>
          {{ t(category.labelKey) }}
        </h3>
        <p>
          {{ t(category.descriptionKey) }}
        </p>
        <div>
          <span
            v-for="item in category.items"
            :key="item.id"
          >
            <UiAppIcon :icon="item.icon" />
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
