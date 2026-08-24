<script setup lang="ts">
const { theme } = useThemeMode()
</script>

<template>
  <div class="flex h-9 items-center gap-0.5 rounded-full border border-border bg-white p-0.5">
    <button
      type="button"
      class="flex items-center justify-center rounded-full p-2 transition-colors"
      :class="
        theme === 'day'
          ? 'bg-primary text-primary-foreground'
          : 'text-primary-foreground/60 hover:text-accent'
      "
      :aria-label="$t('theme.day')"
      :aria-pressed="theme === 'day'"
      @click="theme = 'day'"
    >
      <UiAppIcon icon="lucide:sun" class="size-4" />
    </button>
    <button
      type="button"
      class="flex items-center justify-center rounded-full p-2 transition-colors"
      :class="
        theme === 'night'
          ? 'bg-primary text-primary-foreground'
          : 'text-primary-foreground/60 hover:text-accent'
      "
      :aria-label="$t('theme.night')"
      :aria-pressed="theme === 'night'"
      @click="theme = 'night'"
    >
      <UiAppIcon icon="lucide:moon" class="size-4" />
    </button>
  </div>
</template>
