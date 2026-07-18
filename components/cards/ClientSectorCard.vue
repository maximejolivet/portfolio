<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  clients: string[]
  class?: string
}>()
</script>

<template>
  <UiCard :class="$props.class">
    <div class="flex items-center gap-2.5">
      <UiAppIcon :icon="icon" class="size-8 text-accent" />
      <h3 class="font-sans text-[0.9375rem] font-bold text-foreground">{{ title }}</h3>
    </div>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="client in clients"
        :key="client"
        class="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
      >
        {{ client }}
      </span>
    </div>
  </UiCard>
</template>
