<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()

// v-html, not :innerHTML: Vue's SSR attribute renderer drops innerHTML, so the
// icon body would be missing from the server HTML. The body comes from the
// build-time @iconify subset (static data, never user input), so it is not sanitized.
const data = computed(() => resolveIcon(props.icon))
</script>

<template>
  <!-- eslint-disable vue/no-v-html -- static @iconify body, see script note -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`${data.left} ${data.top} ${data.width} ${data.height}`"
    fill="currentColor"
    aria-hidden="true"
    v-html="data.body"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>
