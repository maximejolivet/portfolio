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
    <AnimationsScrollReveal :y="20">
      <UiBadge>{{ eyebrow }}</UiBadge>
      <h1
        class="font-display mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-white
          sm:text-5xl"
      >
        {{ titleStart }}
        <UiGradientText>{{ titleHighlight }}</UiGradientText>
        {{ titleEnd }}
      </h1>
      <p v-if="subtitle" class="mt-5 max-w-xl text-lg text-white/60">{{ subtitle }}</p>
    </AnimationsScrollReveal>
  </LayoutPageSection>
</template>
