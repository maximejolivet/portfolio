<script setup lang="ts">
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="experience">
    <UiSectionHeading :eyebrow="$t('experienceSection.eyebrow')">
      <template #title>
        {{ $t('experienceSection.titleStart') }}
        <span>{{ $t('experienceSection.titleHighlight') }}</span>
        {{ $t('experienceSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <ol>
      <li
        v-for="item in EXPERIENCE_TIMELINE"
        :key="item.id"
      >
        <p>
          {{ t(item.periodKey) }}
        </p>
        <div>
          <h3>
            {{ t(item.titleKey) }}
          </h3>
          <p>
            {{ t(item.organizationKey) }} · {{ t(item.locationKey) }}
          </p>
          <p>
            {{ t(item.descriptionKey) }}
          </p>
        </div>
      </li>
    </ol>
  </LayoutPageSection>
</template>
