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
  primary:
    'bg-white text-ink-950 hover:scale-[1.03]'
    + ' hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)]',
  secondary: 'glass text-white hover:bg-white/10 hover:scale-[1.03]',
  ghost: 'text-white/70 hover:text-white',
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold
      transition duration-300 ease-out"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>
