<script setup lang="ts">
import { cn } from '~/lib/utils'

type ButtonVariant
  = | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'pill' | 'pill-outline'
type ButtonSize
  = | 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg' | 'pill' | 'pill-md' | 'pill-sm'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: string
    class?: string
  }>(),
  { variant: 'pill', size: 'pill' },
)

const BASE_CLASSES
  = 'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap '
    + 'rounded-md text-sm font-medium outline-none transition-all disabled:pointer-events-none '
    + 'disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 '
    + '[&_svg:not([class*=\'size-\'])]:size-4 focus-visible:border-ring focus-visible:ring-3 '
    + 'focus-visible:ring-ring/50'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  'default': 'bg-primary text-primary-foreground hover:bg-primary/90',
  'destructive': 'bg-destructive text-white hover:bg-destructive/90',
  'outline':
    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
  'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  'ghost': 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  'link': 'text-primary underline-offset-4 hover:underline',
  'pill': 'rounded-full bg-primary font-sans font-semibold text-primary-foreground hover:bg-accent hover:text-background',
  'pill-outline':
    'rounded-full border border-border bg-transparent font-mono font-semibold text-foreground hover:border-accent hover:text-accent',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  'default': 'h-9 px-4 py-2 has-[>svg]:px-3',
  'xs': 'h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*=\'size-\'])]:size-3',
  'sm': 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
  'lg': 'h-10 rounded-md px-6 has-[>svg]:px-4',
  'icon': 'size-9',
  'icon-xs': 'size-6 rounded-md [&_svg:not([class*=\'size-\'])]:size-3',
  'icon-sm': 'size-8',
  'icon-lg': 'size-10',
  'pill': 'h-auto px-6.5 py-3 text-sm',
  'pill-md': 'h-auto px-5 py-2 text-xs',
  'pill-sm': 'h-auto px-3.5 py-1.5 text-sm',
}

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
    :class="cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], 'group', props.class)"
  >
    <slot />
    <UiAppIcon
      v-if="icon"
      :icon="icon"
      class="size-6 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
    />
  </component>
</template>
