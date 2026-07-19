<script setup lang="ts">
import type { TechCategory } from '~/types/content.types'

defineProps<{
  category: TechCategory
  labelColor: string
}>()
</script>

<template>
  <UiCard>
    <CardsTechCategoryContent :category="category" :label-color="labelColor" />
  </UiCard>
</template>
