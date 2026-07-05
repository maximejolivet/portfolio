<script setup lang="ts">
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="experience">
    <UiSectionHeading :eyebrow="$t('experienceSection.eyebrow')" align="center" class="mx-auto">
      <template #title>
        {{ $t('experienceSection.titleStart') }}
        <span class="text-accent">{{ $t('experienceSection.titleHighlight') }}</span>
        {{ $t('experienceSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <ol class="mx-auto mt-14 max-w-3xl space-y-10">
      <li
        v-for="item in EXPERIENCE_TIMELINE"
        :key="item.id"
        class="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-8"
      >
        <p class="font-mono text-xs tracking-wide text-fg-muted uppercase">
          {{ t(item.periodKey) }}
        </p>
        <div class="border-l border-white/10 pl-6">
          <h3 class="text-lg font-semibold text-fg">
            {{ t(item.titleKey) }}
          </h3>
          <p class="text-sm text-fg-muted">
            {{ t(item.organizationKey) }} · {{ t(item.locationKey) }}
          </p>
          <p class="mt-2 max-w-xl text-sm text-fg-muted">
            {{ t(item.descriptionKey) }}
          </p>
        </div>
      </li>
    </ol>
  </LayoutPageSection>
</template>
