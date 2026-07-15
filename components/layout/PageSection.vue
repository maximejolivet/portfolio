<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    bare?: boolean
  }>(),
  { bare: false },
)
</script>

<template>
  <section :id="id">
    <UiContainer v-if="!bare">
      <slot />
    </UiContainer>
    <slot v-else />
  </section>
</template>
