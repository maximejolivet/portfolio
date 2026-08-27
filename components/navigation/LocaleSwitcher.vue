<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const LOCALES = [
  { code: 'fr', flag: '/flag-fr.svg' },
  { code: 'en', flag: '/flag-us.svg' },
  { code: 'br', flag: '/flag-breton.svg' },
] as const
</script>

<template>
  <div class="flex h-9 items-center gap-0.5 rounded-full border border-border bg-white p-0.5">
    <NuxtLink
      v-for="item in LOCALES"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      :aria-label="item.code"
      class="flex items-center justify-center rounded-full p-2 transition-colors"
      :class="
        item.code === locale
          ? 'bg-primary text-primary-foreground'
          : 'text-primary-foreground/60 hover:text-accent'
      "
    >
      <img :src="item.flag" alt="" class="h-4 w-6 rounded-[2px] object-cover" />
    </NuxtLink>
  </div>
</template>
