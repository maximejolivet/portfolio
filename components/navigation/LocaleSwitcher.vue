<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.map((l) => l.code))
</script>

<template>
  <div
    class="flex items-center gap-1 rounded-full border border-white/15 p-1 font-mono text-xs
      font-medium"
  >
    <NuxtLink
      v-for="code in availableLocales"
      :key="code"
      :to="switchLocalePath(code)"
      class="rounded-full px-3 py-1.5 uppercase transition"
      :class="
        code === locale
          ? 'bg-accent text-canvas'
          : 'text-fg-muted hover:text-fg'
      "
    >
      {{ code }}
    </NuxtLink>
  </div>
</template>
