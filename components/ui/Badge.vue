<script setup lang="ts">
import type { BadgeVariants } from '~/components/ui/shadcn/badge'
import { badgeVariants } from '~/components/ui/shadcn/badge'
import { cn } from '~/lib/utils'

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariants['variant']
    class?: string
  }>(),
  { variant: 'outline' },
)
</script>

<template>
  <span
    :class="
      cn(
        badgeVariants({ variant }),
        'font-mono text-[0.7812rem] font-medium tracking-wide normal-case',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
