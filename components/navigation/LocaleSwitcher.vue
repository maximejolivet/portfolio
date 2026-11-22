<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const LOCALES = [
  // Noms de langue dans leur propre langue (endonymes), pas de traduction nécessaire
  { code: 'fr', name: 'Français', flag: '/flag-fr.svg' },
  { code: 'en', name: 'English', flag: '/flag-us.svg' },
] as const
</script>

<template>
  <div class="flex h-12 items-center gap-0.5 rounded-full border border-border bg-white">
    <NuxtLink
      v-for="item in LOCALES"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      :aria-label="item.name"
      :aria-current="item.code === locale ? 'true' : undefined"
      class="flex size-11 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      :class="
        item.code === locale
          ? 'bg-primary text-primary-foreground'
          : 'text-primary-foreground/60 hover:text-accent'
      "
    >
      <img :src="item.flag" alt="" class="h-4 w-6 object-contain" />
    </NuxtLink>
  </div>
</template>
