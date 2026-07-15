<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.map((l) => l.code))
</script>

<template>
  <div>
    <NuxtLink
      v-for="code in availableLocales"
      :key="code"
      :to="switchLocalePath(code)"
    >
      {{ code }}
    </NuxtLink>
  </div>
</template>
