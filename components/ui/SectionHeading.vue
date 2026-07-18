<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    icon: string
    diamond?: 'gold' | 'mint'
    caption?: string
  }>(),
  { diamond: 'gold' },
)
</script>

<template>
  <div class="mb-10 flex items-center gap-4">
    <UiAppIcon
      :icon="icon"
      class="size-8 shrink-0"
      :class="diamond === 'mint' ? 'text-mint' : 'text-primary'"
    />
    <h2 class="font-sans text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground">
      {{ title }}
    </h2>
    <div class="h-px flex-1 bg-border" />
    <span v-if="caption || $slots.caption" class="hidden font-mono text-xs text-subtle sm:inline">
      <slot name="caption">{{ caption }}</slot>
    </span>
  </div>
</template>
