<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()

const data = computed(() => resolveIcon(props.icon))
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${data.width} ${data.height}`"
    fill="currentColor"
    aria-hidden="true"
    :innerHTML="data.body"
  />
</template>
