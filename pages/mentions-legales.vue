<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'

const { t } = useI18n()

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

useSeoMeta({
  title: () => `${t('legalPage.title')} - Maxime Jolivet`,
  description: () => t('legalPage.title'),
})

const SECTIONS = [
  'editor',
  'publication',
  'hosting',
  'technologies',
  'data',
  'cookies',
  'ip',
  'links',
  'liability',
  'law',
] as const

const ITEM_COUNTS: Partial<Record<(typeof SECTIONS)[number], number>> = {
  editor: 2,
  hosting: 3,
}
</script>

<template>
  <div>
    <SectionsPageIntro
      :eyebrow="$t('legalPage.eyebrow')"
      :title="$t('legalPage.title')"
      :subtitle="$t('legalPage.updated')"
    />

    <LayoutPageSection bare>
      <UiContainer class="flex max-w-[760px] flex-col gap-10 pb-24">
        <div v-for="section in SECTIONS" :key="section">
          <h2 class="mb-2 font-sans text-lg font-bold text-foreground">
            {{ $t(`legalPage.sections.${section}.title`) }}
          </h2>

          <p
            v-if="$te(`legalPage.sections.${section}.intro`)"
            class="text-pretty font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
          >
            {{ $t(`legalPage.sections.${section}.intro`) }}
          </p>

          <ul
            v-if="ITEM_COUNTS[section]"
            class="mt-2 font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
          >
            <li v-for="i in ITEM_COUNTS[section]" :key="i">
              {{ $t(`legalPage.sections.${section}.items.${i - 1}`, { email: CONTACT_EMAIL }) }}
            </li>
          </ul>

          <p
            v-if="$te(`legalPage.sections.${section}.body`)"
            class="mt-2 text-pretty font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
          >
            {{ $t(`legalPage.sections.${section}.body`, { email: CONTACT_EMAIL }) }}
          </p>

          <p
            v-if="$te(`legalPage.sections.${section}.closing`)"
            class="mt-2 text-pretty font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
          >
            {{ $t(`legalPage.sections.${section}.closing`, { email: CONTACT_EMAIL }) }}
          </p>
        </div>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
