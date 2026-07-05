<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  clients: string[]
}>()
</script>

<template>
  <div class="rounded-2xl border border-white/10 p-6 transition hover:border-white/20">
    <div
      class="flex h-16 w-16 items-center justify-center rounded-xl border border-white/15
        text-accent"
    >
      <UiAppIcon :icon="icon" class="h-8 w-8" />
    </div>
    <h3 class="mt-4 text-lg font-semibold text-fg">{{ title }}</h3>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="client in clients"
        :key="client"
        class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-fg-muted"
      >
        {{ client }}
      </span>
    </div>
  </div>
</template>
