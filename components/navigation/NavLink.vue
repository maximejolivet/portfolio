<script setup lang="ts">
const props = defineProps<{
  to: string
  hash?: string
  icon?: string
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
    class="inline-flex items-center gap-1.5 border-b-2 pb-0.5 font-mono text-xs transition-colors"
    :class="
      isActive
        ? 'border-mint font-bold text-foreground'
        : 'border-transparent text-muted-foreground hover:text-accent'
    "
  >
    <UiAppIcon v-if="icon" :icon="icon" class="size-3.5" />
    <slot />
  </NuxtLink>
</template>
