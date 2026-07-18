<script setup lang="ts">
import type { JsonLine } from '~/components/sections/HeroJsonPanel.vue'
import { AVAILABILITY_STATUS, CONTACT_EMAIL } from '~/constants/contact'
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const { t } = useI18n()
const localePath = useLocalePath()

const MARQUEE_STACK = [
  'PHP',
  'JavaScript',
  'Drupal',
  'WordPress',
  'Vue.js',
  'Nuxt',
  'Laravel',
  'Symfony',
  'Tailwind',
  'Docker',
  'CI/CD',
]

const marqueeAutoplay = { delay: 1, disableOnInteraction: false, pauseOnMouseEnter: false }
// Repeated so the slide track always overflows the viewport - Swiper locks
// (disables) sliding entirely when the real content is narrower than its
// container, which it is here on wide screens with only 11 short labels.
const MARQUEE_LOOP_STACK = Array.from({ length: 10 }, () => MARQUEE_STACK).flat()

const key = 'text-cyan-300'
const str = 'text-green-300'
const dateKey = 'text-rose-300'
const punct = 'text-destructive/80'

const jsonLines = computed<JsonLine[]>(() => {
  const experienceRows = EXPERIENCE_TIMELINE.map((item) => ({
    period: t(item.periodKey),
    title: t(item.titleKey),
    organization: t(item.organizationKey),
    url: item.organizationUrl,
  }))

  const stackTokens = MARQUEE_STACK.slice(0, 4).flatMap((name, i, arr) => [
    { text: `"${name}"`, class: str },
    { text: i < arr.length - 1 ? ', ' : '', class: punct },
  ])

  const indent1 = { text: '  ' }
  const indent2 = { text: '    ' }

  return [
    { tokens: [{ text: '{', class: punct }] },
    {
      tokens: [
        indent1,
        { text: 'name', class: key },
        { text: ': ', class: punct },
        { text: '"Maxime Jolivet"', class: str },
        { text: ',', class: punct },
      ],
    },
    {
      tokens: [
        indent1,
        { text: 'position', class: key },
        { text: ': ', class: punct },
        { text: `"${t('hero.role')}"`, class: str },
        { text: ',', class: punct },
      ],
    },
    {
      tokens: [
        indent1,
        { text: 'email', class: key },
        { text: ': ', class: punct },
        { text: `"${CONTACT_EMAIL}"`, class: str },
        { text: ',', class: punct },
      ],
    },
    {
      tokens: [
        indent1,
        { text: 'location', class: key },
        { text: ': ', class: punct },
        { text: `"${t('hero.location')}"`, class: str },
        { text: ',', class: punct },
      ],
    },
    {
      tokens: [
        indent1,
        { text: 'stack', class: key },
        { text: ': [', class: punct },
        ...stackTokens,
        { text: '],', class: punct },
      ],
    },
    { tokens: [indent1, { text: 'experience', class: key }, { text: ': {', class: punct }] },
    ...experienceRows.map((row, i) => ({
      tokens: [
        indent2,
        { text: `"${row.period}"`, class: dateKey },
        { text: ': ', class: punct },
        { text: `"${row.title} @ `, class: str },
        { text: row.organization, class: str, href: row.url },
        { text: '"', class: str },
        { text: i < experienceRows.length - 1 ? ',' : '', class: punct },
      ],
    })),
    { tokens: [indent1, { text: '},', class: punct }] },
    {
      tokens: [
        indent1,
        { text: 'availability', class: key },
        { text: ': ', class: punct },
        { text: `"${AVAILABILITY_STATUS}"`, class: 'text-mint' },
        { text: ',', class: punct },
      ],
      statusDot: true,
    },
    {
      tokens: [
        indent1,
        { text: 'note', class: key },
        { text: ': ', class: punct },
        { text: `"${t('hero.underConstructionNote')}"`, class: str },
      ],
      cursor: true,
    },
    { tokens: [{ text: '}', class: punct }] },
  ]
})
</script>

<template>
  <section>
    <div class="grid min-h-[620px] md:grid-cols-[2fr_3fr]">
      <div class="flex flex-col justify-center gap-6 px-8 py-16 sm:px-18">
        <h1
          class="text-balance font-sans text-[clamp(2.5rem,4.4vw,3.875rem)] font-bold leading-[1.1] tracking-[-1.8px] text-foreground"
        >
          {{ $t('hero.greeting') }}<span class="text-accent">.</span>
        </h1>
        <p class="max-w-[440px] text-pretty font-sans text-base leading-[1.68] text-muted-foreground">
          {{ $t('hero.bio') }}
        </p>
        <div class="mt-1.5 flex flex-wrap items-center gap-5">
          <UiButton :to="localePath('projects')" icon="lucide:arrow-right">
            {{ $t('hero.ctaSecondary') }}
          </UiButton>
          <a
            href="#contact"
            class="border-b-2 border-mint pb-0.5 font-sans text-sm font-semibold text-foreground"
          >
            {{ $t('hero.ctaContact') }}
          </a>
        </div>
      </div>

      <SectionsHeroJsonPanel :lines="jsonLines" />
    </div>

    <ClientOnly>
      <div class="overflow-hidden bg-panel-2 py-6">
        <swiper-container
          slides-per-view="auto"
          :space-between="32"
          :loop="true"
          :speed="2500"
          :allow-touch-move="false"
          :autoplay="marqueeAutoplay"
        >
          <swiper-slide v-for="(name, i) in MARQUEE_LOOP_STACK" :key="`${i}-${name}`" class="w-auto pl-8">
            <span
              class="whitespace-nowrap font-mono text-[0.7812rem] font-semibold tracking-[2px] text-panel-foreground/75"
            >{{ name.toUpperCase() }}</span>
          </swiper-slide>
        </swiper-container>
      </div>

      <template #fallback>
        <div class="flex items-center overflow-hidden bg-panel-2 py-6">
          <div class="flex animate-marquee whitespace-nowrap will-change-transform">
            <div v-for="rep in 2" :key="rep" class="flex items-center gap-8 pr-8">
              <span
                v-for="name in MARQUEE_STACK"
                :key="`${rep}-${name}`"
                class="font-mono text-[0.7812rem] font-semibold tracking-[2px] text-panel-foreground/75"
              >{{ name.toUpperCase() }}</span>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </section>
</template>
