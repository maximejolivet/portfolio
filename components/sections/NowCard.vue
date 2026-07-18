<script setup lang="ts">
defineProps<{
  item: 'building' | 'reading' | 'listening' | 'shipped'
}>()
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <div class="font-mono text-[0.7188rem] font-bold tracking-[1.5px] text-panel-foreground/50">
      {{ $t(`home.now.items.${item}.label`) }}
    </div>
    <div class="flex items-center gap-2 font-sans text-[1rem] leading-[1.4] font-semibold">
      <span v-if="item === 'shipped'" class="size-2 animate-pulse-dot rounded-full bg-mint" />
      {{ $t(`home.now.items.${item}.title`) }}
    </div>
    <div class="font-mono text-xs leading-[1.5] text-panel-foreground/55">
      {{ $t(`home.now.items.${item}.detail`) }}
    </div>
  </div>
</template>
