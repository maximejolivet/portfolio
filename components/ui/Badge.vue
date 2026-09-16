<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    class?: string
  }>(),
  { variant: 'outline' },
)

const VARIANT_CLASSES: Record<NonNullable<typeof props.variant>, string> = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  destructive: 'border-transparent bg-destructive text-white',
  outline: 'text-foreground',
}

const BASE_CLASSES
  = 'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap '
    + 'rounded-full border px-2 py-0.5 text-xs font-medium transition-colors [&>svg]:pointer-events-none '
    + '[&>svg]:size-3'
</script>

<template>
  <span
    :class="
      cn(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        'font-mono text-[0.7812rem] font-medium tracking-wide normal-case',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
