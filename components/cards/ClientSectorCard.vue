<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  clients: string[]
}>()
</script>

<template>
  <UiGlowCard glow="emerald">
    <div
      class="glass flex h-20 w-20 items-center justify-center rounded-2xl text-gold-400"
    >
      <UiAppIcon :icon="icon" class="h-11 w-11" />
    </div>
    <h3 class="font-display mt-4 text-lg font-semibold text-white">{{ title }}</h3>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="client in clients"
        :key="client"
        class="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/70"
      >
        {{ client }}
      </span>
    </div>
  </UiGlowCard>
</template>
