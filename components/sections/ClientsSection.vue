<script setup lang="ts">
import { CLIENT_SECTORS } from '~/constants/clients'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection bare>
    <UiContainer>
      <div class="mb-2 font-mono text-xs font-semibold text-subtle">
        {{ $t('clientsSection.eyebrow') }}
      </div>
      <UiSectionHeading
        :title="$t('clientsSection.title')"
        icon="lucide:building-2"
        diamond="gold"
      />
    </UiContainer>

    <UiContainer class="mt-8 flex flex-col gap-8">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CardsClientSectorCard
          v-for="sector in CLIENT_SECTORS"
          :key="sector.id"
          :title="t(sector.labelKey)"
          :icon="sector.icon"
          :clients="sector.clients"
        />
      </div>
    </UiContainer>
  </LayoutPageSection>
</template>
