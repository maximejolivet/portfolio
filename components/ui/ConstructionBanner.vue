<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <UiAppIcon icon="lucide:construction" />
    <span>{{ t('construction.message') }}</span>
  </div>
</template>
