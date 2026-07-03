<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div
class="relative z-[70] flex items-center justify-center gap-2 bg-accent px-4 py-2
      text-center text-sm font-medium text-canvas"
>
    <UiAppIcon icon="lucide:construction" class="h-4 w-4 shrink-0" />
    <span>{{ t('construction.message') }}</span>
  </div>
</template>
