<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    diamond?: 'gold' | 'mint'
    caption?: string
  }>(),
  { diamond: 'gold' },
)
</script>

<template>
  <div class="mb-10 flex items-baseline gap-4">
    <span
      class="font-sans text-[1rem] font-bold"
      :class="diamond === 'mint' ? 'text-mint' : 'text-primary'"
    >◆</span>
    <h2 class="font-sans text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground">
      {{ title }}
    </h2>
    <div class="h-px flex-1 bg-border" />
    <span v-if="caption || $slots.caption" class="hidden font-mono text-xs text-subtle sm:inline">
      <slot name="caption">{{ caption }}</slot>
    </span>
  </div>
</template>
