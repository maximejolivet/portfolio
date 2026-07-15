<script setup lang="ts">
defineProps<{
  to: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(to)"
  >
    <slot />
    <span />
  </NuxtLink>
</template>
