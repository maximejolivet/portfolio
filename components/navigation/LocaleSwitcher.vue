<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const LOCALES = ['fr', 'en'] as const
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-full border border-border p-0.5 font-mono text-xs font-semibold"
  >
    <NuxtLink
      v-for="code in LOCALES"
      :key="code"
      :to="switchLocalePath(code)"
      class="rounded-full px-2.5 py-1 transition-colors"
      :class="
        code === locale
          ? 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'
          : 'text-muted-foreground hover:text-accent'
      "
    >
      {{ code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>
