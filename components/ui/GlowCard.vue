<script setup lang="ts">
withDefaults(
  defineProps<{
    glow?: 'gold' | 'emerald' | 'none'
  }>(),
  { glow: 'none' },
)
</script>

<template>
  <div
    class="glass group relative overflow-hidden rounded-2xl p-6 transition duration-300
      hover:-translate-y-1 hover:bg-white/[0.06]"
    :class="{
      'hover:glow-gold': glow === 'gold',
      'hover:glow-emerald': glow === 'emerald',
    }"
  >
    <slot />
  </div>
</template>
