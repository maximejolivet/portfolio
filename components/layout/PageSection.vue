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
  <section :id="id" class="relative py-20 sm:py-28">
    <UiContainer v-if="!bare">
      <slot />
    </UiContainer>
    <slot v-else />
  </section>
</template>
