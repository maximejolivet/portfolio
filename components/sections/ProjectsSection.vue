<script setup lang="ts">
import { CLIENT_SECTORS } from '~/constants/clients'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="projects-list">
    <UiSectionHeading :eyebrow="$t('projectsSection.eyebrow')" align="center" class="mx-auto">
      <template #title>
        {{ $t('projectsSection.titleStart') }}
        <UiGradientText>{{ $t('projectsSection.titleHighlight') }}</UiGradientText>
        {{ $t('projectsSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <AnimationsScrollReveal
      as="div"
      :stagger="0.08"
      class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <CardsClientSectorCard
        v-for="sector in CLIENT_SECTORS"
        :key="sector.id"
        :title="t(sector.labelKey)"
        :icon="sector.icon"
        :clients="sector.clients"
      />
    </AnimationsScrollReveal>
  </LayoutPageSection>
</template>
