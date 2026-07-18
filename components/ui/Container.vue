<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = withDefaults(
  defineProps<{
    as?: string
    class?: string
  }>(),
  { as: 'div' },
)
</script>

<template>
  <component :is="as" :class="cn('mx-auto w-full max-w-[1180px] px-4', props.class)">
    <slot />
  </component>
</template>
