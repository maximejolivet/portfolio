<script setup lang="ts">
defineProps<{
  to: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(to)"
    class="group relative text-sm font-medium text-fg-muted transition hover:text-fg"
    active-class="text-fg"
  >
    <slot />
    <span
      class="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-150
        group-hover:w-full"
    />
  </NuxtLink>
</template>
