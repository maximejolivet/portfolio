<script setup lang="ts">
const { locale } = useI18n()

const NOW_ITEMS = ['building', 'reading', 'listening', 'shipped'] as const

const currentMonth = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'fr-FR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date()),
)

</script>

<template>
  <section class="mt-24 bg-panel text-panel-foreground">
    <UiContainer class="py-16">
      <div class="mb-9 flex items-center gap-4">
        <UiAppIcon icon="lucide:radio" class="size-8 shrink-0 text-mint" />
        <h2 class="font-sans text-[2rem] font-bold leading-[1.1] tracking-tight">
          {{ $t('home.now.sectionTitle') }}
        </h2>
        <div class="h-px flex-1 bg-panel-foreground/[0.18]" />
        <span class="hidden font-mono text-xs text-panel-foreground/50 sm:inline">{{ currentMonth }}</span>
      </div>

      <div class="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        <SectionsNowCard v-for="item in NOW_ITEMS" :key="item" :item="item" />
      </div>
    </UiContainer>
  </section>
</template>
