<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'

const { t } = useI18n()

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

useSeoMeta({
  title: () => `${t('a11yPage.title')} - Maxime Jolivet`,
  description: () => t('a11yPage.title'),
})

const SECTIONS = ['intro', 'methodology', 'results', 'nonConformities', 'contact'] as const

const ITEM_COUNTS: Partial<Record<(typeof SECTIONS)[number], number>> = {
  results: 4,
  nonConformities: 2,
}
</script>

<template>
  <div>
    <SectionsPageIntro
      :eyebrow="$t('a11yPage.eyebrow')"
      :title="$t('a11yPage.title')"
      :subtitle="$t('a11yPage.updated')"
    />

    <LayoutPageSection bare>
      <UiContainer class="flex max-w-[760px] flex-col gap-10 pb-24">
        <div v-for="section in SECTIONS" :id="section" :key="section" class="scroll-mt-24">
          <h2 class="mb-2 font-sans text-lg font-bold text-foreground">
            {{ $t(`a11yPage.sections.${section}.title`) }}
          </h2>

          <p
            v-if="$te(`a11yPage.sections.${section}.intro`)"
            class="text-pretty font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
          >
            {{ $t(`a11yPage.sections.${section}.intro`) }}
          </p>

          <ul
            v-if="ITEM_COUNTS[section]"
            class="mt-2 flex list-disc flex-col gap-1 pl-5 font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
          >
            <li v-for="i in ITEM_COUNTS[section]" :key="i">
              {{ $t(`a11yPage.sections.${section}.items.${i - 1}`) }}
            </li>
          </ul>

          <p
            v-if="$te(`a11yPage.sections.${section}.body`)"
            class="mt-2 text-pretty font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
          >
            {{ $t(`a11yPage.sections.${section}.body`, { email: CONTACT_EMAIL }) }}
          </p>
        </div>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
