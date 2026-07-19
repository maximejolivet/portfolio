<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <LayoutPageSection bare>
    <UiContainer class="flex flex-col gap-4 pb-14 pt-12">
      <span class="font-mono text-[0.875rem] font-bold text-accent">{{ eyebrow }}</span>
      <h1
        class="text-balance font-sans text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.05] tracking-[-1.8px] text-foreground"
      >
        {{ title }}<span class="text-accent">.</span>
      </h1>
      <p
        v-if="subtitle || $slots.subtitle"
        class="max-w-[720px] text-pretty font-sans text-[1.0312rem] leading-[1.7] text-muted-foreground"
      >
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </UiContainer>
  </LayoutPageSection>
</template>
