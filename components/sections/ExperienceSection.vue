<script setup lang="ts">
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const CHARS_PER_TICK = 2
const TICK_MS = 10

const { t } = useI18n()

function logLines(item: (typeof EXPERIENCE_TIMELINE)[number]) {
  return [
    ...(item.descriptionKey ? [t(item.descriptionKey)] : []),
    ...(item.descriptionPointsKeys?.map((key) => t(key)) ?? []),
  ]
}

function logoMaskStyle(logo: string) {
  return {
    maskImage: `url(${logo})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'left center',
    WebkitMaskImage: `url(${logo})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'left center',
  }
}

// Starts fully revealed so SSR / no-JS output shows the full log; a scroll-triggered
// IntersectionObserver resets this to 0 and animates it back up, mirroring the hero panel.
const visibleChars = ref(Infinity)

function reveal(consumed: { value: number }, text: string) {
  const start = consumed.value
  consumed.value += text.length
  const visible = Math.max(0, Math.min(text.length, visibleChars.value - start))
  return { text: text.slice(0, visible), isStarted: visible > 0, isDone: visible >= text.length }
}

const entries = computed(() => {
  const consumed = { value: 0 }
  return EXPERIENCE_TIMELINE.map((item) => ({
    item,
    location: reveal(consumed, `# ${t(item.locationKey)}`),
    intro: item.introKey ? reveal(consumed, t(item.introKey)) : null,
    points: logLines(item).map((line) => reveal(consumed, line)),
    totalChars: consumed.value,
  }))
})

const totalChars = computed(() => entries.value.at(-1)?.totalChars ?? 0)
const typingDone = computed(() => visibleChars.value >= totalChars.value)

let rafId = 0
const rootEl = ref<HTMLElement>()

function animateTyping() {
  visibleChars.value = 0
  let lastTick = 0

  function step(now: number) {
    if (now - lastTick >= TICK_MS) {
      visibleChars.value = Math.min(visibleChars.value + CHARS_PER_TICK, totalChars.value)
      lastTick = now
    }
    if (visibleChars.value < totalChars.value) {
      rafId = requestAnimationFrame(step)
    }
  }

  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  const skipAnimation
    = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || window.matchMedia('(max-width: 767px)').matches
  if (skipAnimation || !rootEl.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      animateTyping()
      observer.disconnect()
    },
    { threshold: 0.2 },
  )
  observer.observe(rootEl.value)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <LayoutPageSection id="experience" class="pt-24">
    <UiSectionHeading
      :title="$t('experienceSection.eyebrow')"
      icon="lucide:briefcase"
      diamond="mint"
    />

    <p
      class="-mt-6 mb-8 max-w-[560px] text-pretty font-sans text-[1rem] leading-[1.6] text-muted-foreground"
    >
      {{ $t('experienceSection.titleStart') }}
      <span class="text-primary">{{ $t('experienceSection.titleHighlight') }}</span>{{ $t('experienceSection.titleEnd') }}
    </p>

    <div class="overflow-hidden rounded-2xl bg-panel text-panel-foreground">
      <div class="flex items-center gap-2 border-b border-panel-foreground/10 px-5 py-3">
        <span class="size-2.5 rounded-full bg-red-400/70" />
        <span class="size-2.5 rounded-full bg-yellow-400/70" />
        <span class="size-2.5 rounded-full bg-green-400/70" />
        <span class="ml-2 font-mono text-xs text-panel-foreground/40">experience.log</span>
      </div>

      <div ref="rootEl" class="overflow-x-auto px-5 py-6 font-mono text-[0.8125rem] leading-[1.9]">
        <div v-for="(entry, index) in entries" :key="entry.item.id" class="group mb-5 last:mb-0">
          <div
            class="-mx-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md px-2 transition-colors group-hover:bg-panel-foreground/5"
            :class="index === 0 && 'mb-1'"
          >
            <span
              aria-hidden="true"
              class="flex shrink-0 items-center justify-center rounded-full bg-primary"
              :class="index === 0 ? 'size-10' : 'size-2.5'"
            >
              <svg
                v-if="index === 0"
                viewBox="0 0 162 162"
                fill="currentColor"
                aria-hidden="true"
                class="size-9 text-primary-foreground"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M81 2.9C37.9 2.9 2.9 37.9 2.9 81s35 78.1 78.1 78.1 78.1-35 78.1-78.1S124.1 2.9 81 2.9m24.8 117.6h-.8c-2.8 0-5.4-1.6-6.7-4.2L83 85.2c-1.2-2.5-3.8-4.2-6.7-4.2h-8.1c-2.8 0-5.4-1.6-6.7-4.2l-12-24.7c-2.4-4.9 1.2-10.7 6.7-10.7h.8c2.8 0 5.4 1.6 6.7 4.2L79 76.8c1.2 2.5 3.8 4.2 6.7 4.2h8.1c2.8 0 5.4 1.6 6.7 4.2l12.1 24.7c2.2 4.9-1.4 10.6-6.8 10.6"
                />
              </svg>
            </span>
            <span class="shrink-0 text-rose-300">{{ t(entry.item.periodKey) }}</span>
            <span class="text-panel-foreground">{{ t(entry.item.titleKey) }}</span>
            <span class="text-panel-foreground/40">@</span>
            <a
              v-if="entry.item.organizationUrl"
              :href="entry.item.organizationUrl"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="entry.item.logo ? t(entry.item.organizationKey) : undefined"
              class="inline-flex items-center gap-2 text-green-300 underline decoration-dotted underline-offset-2 transition-colors hover:text-mint"
            >
              <span :class="entry.item.logo && 'hidden'">{{ t(entry.item.organizationKey) }}</span>
              <span
                v-if="entry.item.logo"
                aria-hidden="true"
                class="relative h-5 w-28 bg-green-300"
                :style="logoMaskStyle(entry.item.logo)"
              />
            </a>
            <span v-else class="text-green-300">{{ t(entry.item.organizationKey) }}</span>
          </div>

          <p v-show="entry.location.isStarted" class="pl-2 text-panel-foreground/35">
            {{ entry.location.text
            }}<span v-if="!entry.location.isDone" class="animate-blink">▎</span>
          </p>

          <p
            v-if="entry.intro"
            v-show="entry.intro.isStarted"
            class="pl-2 text-pretty font-semibold text-panel-foreground/90"
          >
            {{ entry.intro.text }}<span v-if="!entry.intro.isDone" class="animate-blink">▎</span>
          </p>

          <p
            v-for="(line, li) in entry.points"
            v-show="line.isStarted"
            :key="li"
            class="flex gap-2 pl-2 text-pretty text-panel-foreground/70"
          >
            <span class="shrink-0 text-panel-foreground/25">{{
              li === entry.points.length - 1 ? '└─' : '├─'
            }}</span>
            <span>{{ line.text }}<span v-if="!line.isDone" class="animate-blink">▎</span></span>
          </p>
        </div>

        <p v-show="typingDone" class="mt-1 text-panel-foreground/30">
          <span class="text-mint">$</span> <span class="animate-blink">▎</span>
        </p>
      </div>
    </div>
  </LayoutPageSection>
</template>
