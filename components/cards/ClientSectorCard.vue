<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  clients: string[]
  class?: string
}>()

const expanded = ref(false)
</script>

<template>
  <UiCard :class="$props.class">
    <div class="flex flex-col items-start gap-3">
      <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/12">
        <UiAppIcon :icon="icon" class="size-6 text-accent" />
      </span>
      <h3 class="font-sans text-lg font-bold text-foreground">{{ title }}</h3>
    </div>

    <button
      type="button"
      class="flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:text-primary"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ expanded ? $t('clientsSection.seeLess') : $t('clientsSection.seeMore') }}
      <UiAppIcon
        icon="lucide:chevron-down"
        class="size-3.5 shrink-0 transition-transform duration-300"
        :class="expanded && 'rotate-180'"
      />
    </button>

    <div v-show="expanded" class="flex flex-wrap gap-2">
      <span
        v-for="client in clients"
        :key="client"
        class="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
      >
        {{ client }}
      </span>
    </div>
  </UiCard>
</template>
