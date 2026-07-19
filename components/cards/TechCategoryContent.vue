<script setup lang="ts">
import type { TechCategory } from '~/types/content.types'

defineProps<{
  category: TechCategory
  labelColor: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="font-mono text-[0.75rem] font-bold tracking-[1.5px]" :class="labelColor">
    {{ t(category.labelKey).toUpperCase() }}
  </div>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="item in category.items"
      :key="item.id"
      class="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs"
    >
      <UiAppIcon :icon="item.icon" class="size-3.5" />
      {{ item.name }}
    </span>
  </div>
</template>
