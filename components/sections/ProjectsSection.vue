<script setup lang="ts">
import { CLIENT_SECTORS } from '~/constants/clients'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="projects-list">
    <UiSectionHeading :eyebrow="$t('projectsSection.eyebrow')">
      <template #title>
        {{ $t('projectsSection.titleStart') }}
        <span>{{ $t('projectsSection.titleHighlight') }}</span>
        {{ $t('projectsSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <div>
      <CardsClientSectorCard
        v-for="sector in CLIENT_SECTORS"
        :key="sector.id"
        :title="t(sector.labelKey)"
        :icon="sector.icon"
        :clients="sector.clients"
      />
    </div>
  </LayoutPageSection>
</template>
