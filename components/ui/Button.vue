<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
  }>(),
  { variant: 'primary' },
)

const NuxtLinkComponent = resolveComponent('NuxtLink')

const tag = computed(() => (props.to ? NuxtLinkComponent : props.href ? 'a' : 'button'))
const isExternal = computed(() => props.href?.startsWith('http'))

const variantClasses: Record<string, string> = {
  primary: 'bg-accent text-canvas hover:bg-accent/90',
  secondary: 'border border-white/15 text-fg hover:border-white/30',
  ghost: 'text-fg-muted hover:text-fg',
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium
      transition duration-150 ease-out focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2 focus-visible:outline-accent"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>
