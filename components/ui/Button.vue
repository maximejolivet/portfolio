<script setup lang="ts">
const props = defineProps<{
  to?: string
  href?: string
}>()

const NuxtLinkComponent = resolveComponent('NuxtLink')

const tag = computed(() => (props.to ? NuxtLinkComponent : props.href ? 'a' : 'button'))
const isExternal = computed(() => props.href?.startsWith('http'))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </component>
</template>
