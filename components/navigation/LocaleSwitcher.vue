<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.map((l) => l.code))
</script>

<template>
  <div class="glass flex items-center gap-1 rounded-full p-1 text-xs font-medium">
    <NuxtLink
      v-for="code in availableLocales"
      :key="code"
      :to="switchLocalePath(code)"
      class="rounded-full px-3 py-1.5 uppercase transition"
      :class="
        code === locale
          ? 'bg-white text-ink-950'
          : 'text-white/60 hover:text-white'
      "
    >
      {{ code }}
    </NuxtLink>
  </div>
</template>
