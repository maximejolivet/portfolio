<script setup lang="ts">
import { cn } from '~/lib/utils'

withDefaults(
  defineProps<{
    label?: string
    dotClass?: string
    class?: string
  }>(),
  { label: 'capture - bientôt' },
)
</script>

<template>
  <div
    :class="
      cn(
        'relative flex items-center justify-center overflow-hidden rounded-2xl border border-border',
        'bg-[repeating-linear-gradient(45deg,var(--stripe)_0_10px,transparent_10px_22px)]',
        $props.class,
      )
    "
  >
    <span
      v-if="dotClass"
      class="absolute left-4 top-4 size-3 rounded-full"
      :class="dotClass"
    />
    <span class="font-mono text-[0.75rem] text-subtle">[ {{ label }} ]</span>
    <slot />
  </div>
</template>
