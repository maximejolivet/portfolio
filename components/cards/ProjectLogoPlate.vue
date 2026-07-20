<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = defineProps<{
  logo: string
  logoColor: string
  alt: string
  class?: string
}>()

// Flat, solid tint of the brand color - no gradient. Kept light so dark-colored
// logo artwork stays legible regardless of site theme.
const plateStyle = computed(() => ({
  background: `color-mix(in srgb, ${props.logoColor} 16%, #fbfcfa)`,
}))
</script>

<template>
  <div
    :class="
      cn(
        'relative flex items-center justify-center overflow-hidden rounded-2xl border border-border p-7 sm:p-9',
        props.class,
      )
    "
    :style="plateStyle"
  >
    <img
      :src="logo"
      :alt="alt"
      class="h-full max-h-24 min-h-16 w-32 object-contain sm:max-h-32 sm:min-h-20 sm:w-44"
    />
  </div>
</template>
