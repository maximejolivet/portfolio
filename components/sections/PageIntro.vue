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
  <LayoutPageSection class="pt-40 pb-12">
    <UiBadge>{{ eyebrow }}</UiBadge>
    <h1 class="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
      {{ titleStart }}
      <span class="text-accent">{{ titleHighlight }}</span>
      {{ titleEnd }}
    </h1>
    <p v-if="subtitle" class="mt-5 max-w-xl text-lg text-fg-muted">{{ subtitle }}</p>
  </LayoutPageSection>
</template>
