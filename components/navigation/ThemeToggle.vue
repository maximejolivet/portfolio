<script setup lang="ts">
const { theme } = useThemeMode()
</script>

<template>
  <div class="flex items-center gap-0.5 rounded-full border border-border p-0.5">
    <button
      type="button"
      class="flex items-center justify-center rounded-full p-1.5 transition-colors"
      :class="
        theme === 'day'
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-accent'
      "
      :aria-label="$t('theme.day')"
      :aria-pressed="theme === 'day'"
      @click="theme = 'day'"
    >
      <UiAppIcon icon="lucide:sun" class="size-3.5" />
    </button>
    <button
      type="button"
      class="flex items-center justify-center rounded-full p-1.5 transition-colors"
      :class="
        theme === 'night'
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-accent'
      "
      :aria-label="$t('theme.night')"
      :aria-pressed="theme === 'night'"
      @click="theme = 'night'"
    >
      <UiAppIcon icon="lucide:moon" class="size-3.5" />
    </button>
  </div>
</template>
