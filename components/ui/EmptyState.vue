<script setup lang="ts">
defineProps<{
  icon: string
  message: string
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-16 text-center">
    <UiAppIcon :icon="icon" class="size-8 text-subtle" />
    <p class="font-mono text-sm text-muted-foreground">{{ message }}</p>
  </div>
</template>
