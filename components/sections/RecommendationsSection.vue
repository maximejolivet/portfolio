<script setup lang="ts">
const { t, locale } = useI18n()

// Thibaut's and Lucie's quotes are served as images (server/api/recommendation.svg.get.ts),
// not text, so they are not indexed. `imageId` is an opaque id; names never appear in the URL.
const items = [
  { key: 'thibaut', linkedin: 'https://www.linkedin.com/in/thibautmonier', imageId: 'k7q2' },
  { key: 'lucie', linkedin: 'https://www.linkedin.com/in/lucie-magadur', imageId: 'm3x9' },
] as const

const SLIDE_MS = 8000
const RING_RADIUS = 20
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

// Swiper web component (registered by plugins/swiper.client.ts), same as the hero marquee.
interface SwiperInstance {
  realIndex: number
  autoplay: { running: boolean, paused: boolean, start: () => void, stop: () => void, pause: () => void, resume: () => void }
  slideTo: (index: number) => void
  slideNext: () => void
  slidePrev: () => void
}
type SwiperEl = HTMLElement & { swiper?: SwiperInstance }
const swiperEl = useTemplateRef<SwiperEl>('swiper')

const index = ref(0)
// Autoplay runs unless the visitor prefers reduced motion or pauses it.
const playing = ref(true)
const hovered = ref(false)
const focused = ref(false)
const paused = computed(() => !playing.value || hovered.value || focused.value)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) playing.value = false
})

// Apply the visitor's state to Swiper's autoplay. Each call checks the current flags
// so pause/resume never runs twice (Swiper would otherwise schedule duplicate timers).
function applyAutoplay() {
  const s = swiperEl.value?.swiper
  if (!s?.autoplay) return
  if (!playing.value) {
    if (s.autoplay.running) s.autoplay.stop()
  }
  else if (paused.value) {
    if (s.autoplay.running && !s.autoplay.paused) s.autoplay.pause()
  }
  else if (!s.autoplay.running) {
    s.autoplay.start()
  }
  else if (s.autoplay.paused) {
    s.autoplay.resume()
  }
}

watch([playing, paused], applyAutoplay)

function onSwiperInit() {
  applyAutoplay()
}

// Swiper dispatches "swiperslidechange" on the element; the instance is on event.target.
function onSlideChange(event: Event) {
  const s = (event.target as SwiperEl).swiper
  if (s) index.value = s.realIndex
}

function goTo(i: number) {
  swiperEl.value?.swiper?.slideTo(i)
}

function next() {
  swiperEl.value?.swiper?.slideNext()
}

function prev() {
  swiperEl.value?.swiper?.slidePrev()
}

// "Thibaut Monier" -> "Thibaut M."
function shortName(full: string) {
  const parts = full.trim().split(/\s+/)
  if (parts.length < 2) return full
  return `${parts[0]} ${parts[parts.length - 1]?.charAt(0)}.`
}

// Quote image URL; `w` picks the phone (360) or desktop (720) render, see the picture sources below.
function quoteUrl(imageId: string, w: number) {
  return `/api/recommendation.svg?id=${imageId}&lang=${locale.value === 'en' ? 'en' : 'fr'}&w=${w}`
}

// Swiper options as properties: the same pattern as the hero marquee.
const autoplayOptions = {
  delay: SLIDE_MS,
  disableOnInteraction: false,
  pauseOnMouseEnter: false,
}
</script>

<template>
  <LayoutPageSection id="recommendations" class="pt-24">
    <UiSectionHeading
      :title="$t('recommendationsSection.eyebrow')"
      icon="lucide:quote"
      diamond="mint"
    />

    <!-- Client-only: the testimonials are not part of the server-rendered HTML, so they stay out of the initial page source crawlers index. -->
    <ClientOnly>
      <div
        role="region"
        aria-roledescription="carousel"
        :aria-label="$t('recommendationsSection.eyebrow')"
        class="flex flex-col gap-8 overflow-hidden"
        @pointerenter="(e) => e.pointerType === 'mouse' && (hovered = true)"
        @pointerleave="(e) => e.pointerType === 'mouse' && (hovered = false)"
        @focusin="(e) => (focused = (e.target as HTMLElement).matches(':focus-visible'))"
        @focusout="focused = false"
      >
        <swiper-container
          ref="swiper"
          slides-per-view="1"
          rewind
          auto-height
          speed="500"
          :autoplay="autoplayOptions"
          class="block"
          @init="onSwiperInit"
          @swiperslidechange="onSlideChange"
        >
          <swiper-slide
            v-for="(item, i) in items"
            :key="item.key"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${i + 1} / ${items.length}`"
            class="sm:pr-16"
          >
            <div class="flex flex-col gap-6">
              <!-- Width is picked by CSS viewport (media), not srcset/sizes, which follow device pixel density
                   and would choose the largest render on phones, shrinking the text. -->
              <picture>
                <source media="(max-width: 480px)" :srcset="quoteUrl(item.imageId, 360)">
                <source media="(max-width: 640px)" :srcset="quoteUrl(item.imageId, 480)">
                <source media="(max-width: 1024px)" :srcset="quoteUrl(item.imageId, 600)">
                <img
                  :src="quoteUrl(item.imageId, 720)"
                  :alt="$t('recommendationsSection.imageAlt')"
                  :width="720"
                  loading="lazy"
                  decoding="async"
                  class="h-auto w-full max-w-[45rem]"
                >
              </picture>
              <figcaption data-nosnippet class="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-sans">
                <span class="font-bold text-foreground">{{
                  shortName($t(`recommendationsSection.items.${item.key}.name`))
                }}</span>
                <span class="text-sm text-muted-foreground">{{
                  $t(`recommendationsSection.items.${item.key}.role`)
                }}</span>
                <span aria-hidden="true" class="h-4 w-px self-center bg-border" />
                <a
                  :href="item.linkedin"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  data-nosnippet
                  class="inline-flex min-h-10 items-center gap-1 font-mono text-[0.875rem] font-semibold text-muted-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  LinkedIn
                  <UiAppIcon icon="lucide:external-link" class="size-3.5" />
                  <span class="sr-only">{{ $t('a11y.newWindow') }}</span>
                </a>
              </figcaption>
            </div>
          </swiper-slide>
        </swiper-container>

        <div class="flex items-center gap-4">
          <button
            type="button"
            class="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors enabled:hover:border-accent enabled:hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            :aria-label="$t('recommendationsSection.previous')"
            @click="prev"
          >
            <UiAppIcon icon="lucide:arrow-left" class="size-5" />
          </button>

          <!-- Circular loader: fills while the slide is shown; the button pauses or resumes autoplay. -->
          <button
            type="button"
            class="relative grid size-11 place-items-center rounded-full text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            :aria-label="playing ? $t('recommendationsSection.pause') : $t('recommendationsSection.play')"
            :aria-pressed="!playing"
            @click="playing = !playing"
          >
            <svg
              :key="index"
              viewBox="0 0 44 44"
              class="absolute inset-0 size-11 -rotate-90"
              aria-hidden="true"
            >
              <circle cx="22" cy="22" :r="RING_RADIUS" fill="none" stroke="currentColor" stroke-width="2" class="text-border" />
              <circle
                cx="22"
                cy="22"
                :r="RING_RADIUS"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                class="rec-ring text-accent"
                :style="{
                  strokeDasharray: `${RING_LENGTH}`,
                  animationDuration: `${SLIDE_MS}ms`,
                  animationPlayState: paused ? 'paused' : 'running',
                }"
              />
            </svg>
            <UiAppIcon :icon="playing ? 'lucide:pause' : 'lucide:play'" class="size-4" />
          </button>

          <button
            type="button"
            class="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors enabled:hover:border-accent enabled:hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            :aria-label="$t('recommendationsSection.next')"
            @click="next"
          >
            <UiAppIcon icon="lucide:arrow-right" class="size-5" />
          </button>

          <div class="ml-2 flex items-center gap-2">
            <button
              v-for="(item, i) in items"
              :key="`dot-${item.key}`"
              type="button"
              class="size-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              :class="i === index ? 'bg-accent' : 'bg-border hover:bg-muted-foreground'"
              :aria-label="t('recommendationsSection.goTo', { n: i + 1 })"
              :aria-current="i === index ? 'true' : undefined"
              @click="goTo(i)"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </LayoutPageSection>
</template>

<style scoped>
.rec-ring {
  stroke-dashoffset: v-bind('RING_LENGTH');
  animation-name: rec-ring;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes rec-ring {
  from {
    stroke-dashoffset: v-bind('RING_LENGTH');
  }
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rec-ring {
    animation: none;
    stroke-dashoffset: v-bind('RING_LENGTH');
  }
}
</style>
