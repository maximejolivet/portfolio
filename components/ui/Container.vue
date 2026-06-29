<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
  }>(),
  { as: 'div' },
)
</script>

<template>
  <component :is="as" class="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
    <slot />
  </component>
</template>
