<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  clients: string[]
}>()
</script>

<template>
  <div>
    <div>
      <UiAppIcon :icon="icon" />
    </div>
    <h3>{{ title }}</h3>
    <div>
      <span
        v-for="client in clients"
        :key="client"
      >
        {{ client }}
      </span>
    </div>
  </div>
</template>
