<script setup lang="ts">
import { Card as ShadcnCard } from '~/components/ui/shadcn/card'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <ShadcnCard :class="['gap-3.5 rounded-2xl p-6 shadow-none', props.class]">
    <slot />
  </ShadcnCard>
</template>
