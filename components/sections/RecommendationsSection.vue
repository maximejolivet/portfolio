<script setup lang="ts">
const { t, locale } = useI18n()

// The quotes are served as images (server/api/recommendation.svg.get.ts), not text, so they
// are not indexed. `imageId` is an opaque id; names never appear in the URL.
const items = [
  { key: 'thibaut', linkedin: 'https://www.linkedin.com/in/thibautmonier', imageId: 'k7q2' },
  { key: 'lucie', linkedin: 'https://www.linkedin.com/in/lucie-magadur', imageId: 'm3x9' },
] as const

// Below md (768px) the two quotes are tabs: only the selected one is shown.
const active = ref(0)
const tabRefs = ref<HTMLElement[]>([])

// "Thibaut Monier" -> "Thibaut M."
function shortName(full: string) {
  const parts = full.trim().split(/\s+/)
  if (parts.length < 2) return full
  return `${parts[0]} ${parts[parts.length - 1]?.charAt(0)}.`
}

// Quote image URL; `w` is the render width (see the picture sources below).
function quoteUrl(imageId: string, w: number) {
  return `/api/recommendation.svg?id=${imageId}&lang=${locale.value === 'en' ? 'en' : 'fr'}&w=${w}`
}

// ARIA tabs pattern: arrows move between tabs, Home and End jump to the ends.
function onTabKeydown(event: KeyboardEvent) {
  const last = items.length - 1
  let next: number | null = null
  if (event.key === 'ArrowRight') next = active.value === last ? 0 : active.value + 1
  else if (event.key === 'ArrowLeft') next = active.value === 0 ? last : active.value - 1
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = last
  if (next === null) return
  event.preventDefault()
  active.value = next
  tabRefs.value[next]?.focus()
}
</script>

<template>
  <LayoutPageSection id="recommendations" class="pt-24">
    <UiSectionHeading
      :title="$t('recommendationsSection.eyebrow')"
      icon="lucide:quote"
      diamond="mint"
    />

    <!-- Client-only: the quote images stay out of the server-rendered HTML that crawlers index. -->
    <ClientOnly>
      <div>
        <div
          role="tablist"
          :aria-label="$t('recommendationsSection.eyebrow')"
          class="mb-8 flex gap-6 border-b border-border md:hidden"
        >
          <button
            v-for="(item, i) in items"
            :id="`rec-tab-${item.key}`"
            :key="item.key"
            :ref="(el) => { if (el) tabRefs[i] = el as HTMLElement }"
            type="button"
            role="tab"
            :aria-selected="active === i"
            :aria-controls="`rec-${item.key}`"
            :tabindex="active === i ? 0 : -1"
            class="-mb-px border-b-2 pb-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            :class="active === i ? 'border-accent text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'"
            @click="active = i"
            @keydown="onTabKeydown"
          >
            {{ shortName(t(`recommendationsSection.items.${item.key}.name`)) }}
          </button>
        </div>

        <div class="grid gap-16 md:grid-cols-2 md:gap-x-10">
          <article
            v-for="(item, i) in items"
            :id="`rec-${item.key}`"
            :key="item.key"
            role="tabpanel"
            :aria-labelledby="`rec-tab-${item.key}`"
            class="flex min-w-0 flex-col gap-5"
            :class="active === i ? '' : 'max-md:hidden'"
          >
            <!-- Width is picked by CSS viewport (media), not srcset/sizes, which follow device pixel density.
                 Each band matches the width of the column the quote sits in. -->
            <picture>
              <source media="(max-width: 767px)" :srcset="quoteUrl(item.imageId, 360)">
              <source media="(max-width: 1023px)" :srcset="quoteUrl(item.imageId, 480)">
              <source media="(max-width: 1279px)" :srcset="quoteUrl(item.imageId, 600)">
              <img
                :src="quoteUrl(item.imageId, 720)"
                :alt="$t('recommendationsSection.imageAlt')"
                :width="720"
                loading="lazy"
                decoding="async"
                class="h-auto w-full max-w-[45rem]"
              >
            </picture>

            <footer
              data-nosnippet
              class="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-0.5 border-t border-border pt-5 font-sans"
            >
              <p class="col-span-2 text-xl font-semibold tracking-tight text-foreground">
                {{ shortName(t(`recommendationsSection.items.${item.key}.name`)) }}
              </p>
              <p class="text-sm text-muted-foreground">
                <span
                  v-for="line in t(`recommendationsSection.items.${item.key}.role`).split(' / ')"
                  :key="line"
                  class="block"
                >{{ line }}</span>
              </p>
              <a
                :href="item.linkedin"
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="justify-self-end inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-mint decoration-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                LinkedIn
                <UiAppIcon icon="lucide:external-link" class="size-3.5" />
                <span class="sr-only">{{ t('a11y.newWindow') }}</span>
              </a>
            </footer>
          </article>
        </div>
      </div>
    </ClientOnly>
  </LayoutPageSection>
</template>
