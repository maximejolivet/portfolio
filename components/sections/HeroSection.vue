<script setup lang="ts">
import type { JsonLine } from '~/components/sections/HeroJsonPanel.vue'
import { AVAILABILITY_STATUS, CONTACT_EMAIL } from '~/constants/contact'
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { ready: chatIntroReady, openChat } = useChatIntro()

// The technologies marquee loops by default. Visitors who asked their system to reduce motion
// start it paused, and can play it with the button next to it.
const marqueePlaying = ref(true)
const marqueeClass = computed(() => (marqueePlaying.value ? 'marquee-running' : 'marquee-paused'))

function toggleMarquee() {
  marqueePlaying.value = !marqueePlaying.value
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) marqueePlaying.value = false
})

// Empty on the server so SSR/hydration match exactly - filled in after mount,
// same pattern as the panel's own typing animation further down.
const localTime = ref('')
let localTimeInterval = 0

function updateLocalTime() {
  localTime.value = new Intl.DateTimeFormat(locale.value, {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
}

onMounted(() => {
  updateLocalTime()
  localTimeInterval = window.setInterval(updateLocalTime, 30_000)
})

onUnmounted(() => {
  if (localTimeInterval) clearInterval(localTimeInterval)
})

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
  'IA',
]

const key = 'text-accent-on-panel'
const str = 'text-primary'
const dateKey = 'text-highlight-on-panel'
const punct = 'text-panel-foreground/60'
const headerKey = 'text-accent-on-panel'

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
        { text: 'name', class: headerKey },
        { text: ': ', class: punct },
        { text: '"Maxime Jolivet"', class: str },
        { text: ',', class: punct },
      ],
    },
    {
      tokens: [
        indent1,
        { text: 'position', class: headerKey },
        { text: ': ', class: punct },
        { text: `"${t('hero.role')}"`, class: str },
        { text: ',', class: punct },
      ],
    },
    {
      tokens: [
        indent1,
        { text: 'email', class: headerKey },
        { text: ': ', class: punct },
        { text: `"${CONTACT_EMAIL}"`, class: str },
        { text: ',', class: punct },
      ],
    },
    {
      tokens: [
        indent1,
        { text: 'location', class: headerKey },
        { text: ': ', class: punct },
        {
          text: localTime.value
            ? `"${t('hero.location')} · ${localTime.value}"`
            : `"${t('hero.location')}"`,
          class: str,
        },
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
    { tokens: [indent1, { text: 'experiences', class: key }, { text: ': {', class: punct }] },
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
        { text: `"${AVAILABILITY_STATUS}"`, class: 'text-highlight-on-panel' },
      ],
      statusDot: true,
      cursor: true,
    },
    { tokens: [{ text: '}', class: punct }] },
  ]
})
</script>

<template>
  <section id="ide" class="overflow-x-clip">
    <div class="grid md:min-h-[620px] md:grid-cols-[2fr_3fr]">
      <div class="flex flex-col justify-center gap-6 px-4 py-16 md:px-6 lg:px-18">
        <h1
          class="text-balance font-sans text-[clamp(2.5rem,4.4vw,3.875rem)] font-bold leading-[1.1] tracking-[-1.8px] text-foreground"
        >
          {{ $t('hero.greeting') }}<span class="text-accent-text">.</span>
        </h1>
        <button
          v-if="chatIntroReady"
          type="button"
          class="inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-sans text-xs font-semibold text-accent-text transition-colors hover:bg-accent/20 min-h-10 cursor-pointer"
          @click="openChat"
        >
          <UiAppIcon icon="lucide:sparkles" class="size-3.5" />
          {{ $t('hero.chatTeaser') }}
        </button>
        <p
          class="max-w-[440px] text-pretty font-sans text-base leading-[1.68] text-muted-foreground"
        >
          {{ $t('hero.bio') }}
        </p>
        <div class="mt-1.5 flex flex-wrap items-center gap-5">
          <UiButton :to="localePath('projects')" rel="nofollow" icon="lucide:arrow-right">
            {{ $t('hero.ctaSecondary') }}
          </UiButton>
          <a
            href="#contact"
            class="inline-flex min-h-11 items-center border-b-2 border-mint pb-0.5 font-sans text-sm font-semibold text-foreground"
          >
            {{ $t('hero.ctaContact') }}
          </a>
        </div>
      </div>

      <SectionsHeroJsonPanel :lines="jsonLines" />
    </div>

    <!-- Pure CSS marquee: a bounded translate (0 to -50%) that never drifts, so it cannot widen the mobile layout.
         It loops by default. Visitors who asked the system to reduce motion start it paused, and can play it. -->
    <div class="relative bg-panel-2 py-6">
      <div class="overflow-hidden" aria-hidden="true">
      <div class="flex w-max animate-marquee will-change-transform" :class="marqueeClass">
        <div v-for="rep in 2" :key="rep" class="flex shrink-0 items-center">
          <span
            v-for="name in MARQUEE_STACK"
            :key="`${rep}-${name}`"
            class="whitespace-nowrap pl-8 font-mono text-[0.7812rem] font-semibold tracking-[2px] text-panel-foreground/75"
            >{{ name.toUpperCase() }}</span>
        </div>
      </div>
      </div>
      <button
        type="button"
        class="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-panel-foreground/20 bg-panel-2 text-panel-foreground transition-colors hover:text-accent-on-panel"
        :aria-label="marqueePlaying ? $t('a11y.pauseMarquee') : $t('a11y.playMarquee')"
        :aria-pressed="!marqueePlaying"
        @click="toggleMarquee"
      >
        <UiAppIcon :icon="marqueePlaying ? 'lucide:pause' : 'lucide:play'" class="size-4" />
      </button>
    </div>
  </section>
</template>
