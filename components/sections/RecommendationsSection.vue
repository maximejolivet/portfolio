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

const track = useTemplateRef<HTMLElement>('track')
const index = ref(0)
// Autoplay runs unless the visitor prefers reduced motion or pauses it.
const playing = ref(true)
const hovered = ref(false)
const focused = ref(false)
const paused = computed(() => !playing.value || hovered.value || focused.value)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) playing.value = false
})

// Quote image URL; `w` picks the phone (360) or desktop (720) render, see the srcset below.
function quoteUrl(imageId: string, w: number) {
  return `/api/recommendation.svg?id=${imageId}&lang=${locale.value === 'en' ? 'en' : 'fr'}&w=${w}`
}

// "Thibaut Monier" -> "Thibaut M."
function shortName(full: string) {
  const parts = full.trim().split(/\s+/)
  if (parts.length < 2) return full
  return `${parts[0]} ${parts[parts.length - 1]?.charAt(0)}.`
}

function syncIndex() {
  const el = track.value
  if (!el || !el.clientWidth) return
  index.value = Math.round(el.scrollLeft / el.clientWidth)
}

function goTo(i: number) {
  const el = track.value
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollTo({ left: i * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
}

function next() {
  goTo((index.value + 1) % items.length)
}

function prev() {
  goTo((index.value - 1 + items.length) % items.length)
}

// The ring is keyed by the slide index, so it restarts on every slide. When it
// finishes, the carousel moves on; the "animationend" event is the only timer.
function onRingEnd() {
  if (!paused.value) next()
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
        class="flex flex-col gap-8"
        @pointerenter="(e) => e.pointerType === 'mouse' && (hovered = true)"
        @pointerleave="(e) => e.pointerType === 'mouse' && (hovered = false)"
        @focusin="(e) => (focused = (e.target as HTMLElement).matches(':focus-visible'))"
        @focusout="focused = false"
      >
        <div
          ref="track"
          tabindex="0"
          class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          @scroll.passive="syncIndex"
        >
          <figure
            v-for="(item, i) in items"
            :key="item.key"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${i + 1} / ${items.length}`"
            class="flex w-full shrink-0 snap-start snap-always flex-col gap-6 sm:pr-16"
          >
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
                rel="noopener noreferrer"
                class="inline-flex min-h-10 items-center gap-1 font-mono text-[0.875rem] font-semibold text-muted-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                LinkedIn
                <UiAppIcon icon="lucide:external-link" class="size-3.5" />
                <span class="sr-only">{{ $t('a11y.newWindow') }}</span>
              </a>
            </figcaption>
          </figure>
        </div>

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
                @animationend="onRingEnd"
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
