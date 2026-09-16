<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-3.5 rounded-2xl border bg-card p-6 text-card-foreground shadow-none', props.class)">
    <slot />
  </div>
</template>
