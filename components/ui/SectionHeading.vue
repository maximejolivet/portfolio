<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    align?: 'left' | 'center'
  }>(),
  { align: 'left' },
)
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <UiBadge v-if="eyebrow">{{ eyebrow }}</UiBadge>
    <h2 class="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
      <slot name="title" />
    </h2>
    <p v-if="$slots.subtitle" class="mt-4 text-base text-white/60 sm:text-lg">
      <slot name="subtitle" />
    </p>
  </div>
</template>
