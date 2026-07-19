<script setup lang="ts">
import { CLIENT_SECTORS } from '~/constants/clients'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection bare>
    <UiContainer class="pt-12">
      <div class="mb-14 flex flex-col gap-3">
        <h2
          class="text-balance font-sans text-[1.75rem] font-bold leading-[1.2] tracking-[-0.6px] text-foreground"
        >
          {{ $t('clientsSection.introTitle') }}
        </h2>
        <p class="max-w-[560px] text-pretty font-sans text-sm leading-[1.7] text-muted-foreground">
          {{ $t('clientsSection.introSubtitle') }}
        </p>
      </div>

      <div class="mb-2 font-mono text-xs font-semibold text-subtle">
        {{ $t('clientsSection.eyebrow') }}
      </div>
      <UiSectionHeading
        :title="$t('clientsSection.title')"
        icon="lucide:building-2"
        diamond="gold"
      />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CardsClientSectorCard
          v-for="(sector, i) in CLIENT_SECTORS"
          :key="sector.id"
          :title="t(sector.labelKey)"
          :icon="sector.icon"
          :clients="sector.clients"
          :class="i === 0 ? 'lg:col-span-2' : ''"
        />
      </div>
    </UiContainer>
  </LayoutPageSection>
</template>
