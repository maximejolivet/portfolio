<script setup lang="ts">
defineProps<{
  to: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(to)"
    class="group relative text-sm font-medium text-white/70 transition hover:text-white"
    active-class="text-white"
  >
    <slot />
    <span
      class="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300
        group-hover:w-full"
    />
  </NuxtLink>
</template>
