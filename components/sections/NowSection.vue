<script setup lang="ts">
const { locale } = useI18n()

const NOW_ITEMS = ['building', 'reading', 'listening', 'shipped'] as const

const currentMonth = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'fr-FR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date()),
)

const breakpoints = {
  640: { slidesPerView: 2, spaceBetween: 32 },
  1024: { slidesPerView: 4, spaceBetween: 36 },
}
</script>

<template>
  <section class="mt-24 bg-panel text-panel-foreground">
    <UiContainer class="py-16">
      <div class="mb-9 flex items-baseline gap-4">
        <span class="font-sans text-[1rem] font-bold text-mint">◆</span>
        <h2 class="font-sans text-[2rem] font-bold leading-[1.1] tracking-tight">
          {{ $t('home.now.sectionTitle') }}
        </h2>
        <div class="h-px flex-1 bg-panel-foreground/[0.18]" />
        <span class="hidden font-mono text-xs text-panel-foreground/50 sm:inline">{{ currentMonth }}</span>
      </div>

      <ClientOnly>
        <swiper-container
          slides-per-view="1"
          space-between="24"
          :breakpoints="breakpoints"
          :pagination="{ clickable: true }"
          style="--swiper-pagination-color: var(--mint); --swiper-pagination-bullet-inactive-color: color-mix(in srgb, var(--bg) 35%, transparent); padding-bottom: 2.75rem"
        >
          <swiper-slide v-for="item in NOW_ITEMS" :key="item">
            <SectionsNowCard :item="item" />
          </swiper-slide>
        </swiper-container>

        <template #fallback>
          <div class="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            <SectionsNowCard v-for="item in NOW_ITEMS" :key="item" :item="item" />
          </div>
        </template>
      </ClientOnly>
    </UiContainer>
  </section>
</template>
