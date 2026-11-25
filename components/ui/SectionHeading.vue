<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    icon: string
    diamond?: 'gold' | 'mint'
    caption?: string
    // Optional: makes the icon a link (e.g. the About icon jumping to the tech stack).
    iconTo?: string | { path: string, hash?: string }
    iconLabel?: string
  }>(),
  { diamond: 'gold' },
)
</script>

<template>
  <div class="mb-10 flex items-center gap-4">
    <!-- A linked icon uses the accent colour, so it reads differently from the plain section icons. -->
    <NuxtLink v-if="iconTo" :to="iconTo" :aria-label="iconLabel" class="shrink-0 rounded-full">
      <UiAppIcon :icon="icon" class="size-8 text-accent-text" />
    </NuxtLink>
    <UiAppIcon
      v-else
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
