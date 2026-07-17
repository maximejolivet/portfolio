<script setup lang="ts">
import type { ButtonVariants } from '~/components/ui/shadcn/button'
import { buttonVariants } from '~/components/ui/shadcn/button'
import { cn } from '~/lib/utils'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    icon?: string
    class?: string
  }>(),
  { variant: 'pill', size: 'pill' },
)

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
    :class="cn(buttonVariants({ variant, size }), 'group', props.class)"
  >
    <slot />
    <UiAppIcon
      v-if="icon"
      :icon="icon"
      class="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
    />
  </component>
</template>
