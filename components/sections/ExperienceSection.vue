<script setup lang="ts">
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="experience" class="pt-24">
    <UiSectionHeading :title="$t('experienceSection.eyebrow')" diamond="mint" />

    <p class="-mt-6 mb-10 max-w-[560px] text-pretty font-sans text-[1rem] leading-[1.6] text-muted-foreground">
      {{ $t('experienceSection.titleStart') }}
      <span class="text-primary">{{ $t('experienceSection.titleHighlight') }}</span>
      {{ $t('experienceSection.titleEnd') }}
    </p>

    <ol class="flex flex-col divide-y divide-border border-t border-border">
      <li
        v-for="item in EXPERIENCE_TIMELINE"
        :key="item.id"
        class="grid gap-2 py-7 sm:grid-cols-[160px_1fr] sm:gap-8"
      >
        <p class="font-mono text-xs text-subtle">{{ t(item.periodKey) }}</p>
        <div class="flex flex-col gap-1.5">
          <h3 class="font-sans text-[1.125rem] font-bold tracking-[-0.3px] text-foreground">
            {{ t(item.titleKey) }}
          </h3>
          <p class="font-mono text-xs text-muted-foreground">
            {{ t(item.organizationKey) }} · {{ t(item.locationKey) }}
          </p>
           <p v-if="item.introKey" class="text-pretty font-bold text-sm leading-[1.6] text-muted-foreground">
            {{ t(item.introKey) }}
          </p>
            <p v-if="item.descriptionKey" class="text-pretty text-sm font-sans leading-[1.6] text-muted-foreground">
            {{ t(item.descriptionKey) }}
          </p>
          <ul v-else-if="item.descriptionPointsKeys" class="mt-1 flex flex-col gap-2">
            <li
              v-for="pointKey in item.descriptionPointsKeys"
              :key="pointKey"
              class="flex items-baseline gap-2.5 font-sans text-sm leading-[1.5] text-muted-foreground"
            >
              <span class="text-mint">→</span>
              <span>{{ t(pointKey) }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </LayoutPageSection>
</template>
