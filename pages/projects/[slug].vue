<script setup lang="ts">
// Project detail pages are disabled for now.
const { t } = useI18n()

showError(createError({ statusCode: 404, statusMessage: t('blog.not_found') }))
</script>

<template>
  <div />
</template>
