<script setup lang="ts">
defineProps<{
  eyebrow?: string
}>()
</script>

<template>
  <div>
    <UiBadge v-if="eyebrow">{{ eyebrow }}</UiBadge>
    <h2>
      <slot name="title" />
    </h2>
    <p v-if="$slots.subtitle">
      <slot name="subtitle" />
    </p>
  </div>
</template>
