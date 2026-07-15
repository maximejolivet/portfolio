<script setup lang="ts">
defineProps<{
  eyebrow: string
  titleStart: string
  titleHighlight: string
  titleEnd?: string
  subtitle?: string
}>()
</script>

<template>
  <LayoutPageSection>
    <UiBadge>{{ eyebrow }}</UiBadge>
    <h1>
      {{ titleStart }}
      <span>{{ titleHighlight }}</span>
      {{ titleEnd }}
    </h1>
    <p v-if="subtitle">{{ subtitle }}</p>
  </LayoutPageSection>
</template>
