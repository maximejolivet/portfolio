<script setup lang="ts">
const props = defineProps<{
  to: string
  hash?: string
}>()

const localePath = useLocalePath()
const route = useRoute()

const target = computed(() => localePath(props.to))
const resolvedTo = computed(() => (props.hash ? { path: target.value, hash: props.hash } : target.value))
const isActive = computed(() => !props.hash && route.path === target.value)
</script>

<template>
  <NuxtLink
    :to="resolvedTo"
    class="font-mono text-xs transition-colors"
    :class="
      isActive
        ? 'border-b-2 border-mint pb-0.5 font-bold text-foreground'
        : 'text-muted-foreground hover:text-accent'
    "
  >
    <slot />
  </NuxtLink>
</template>
