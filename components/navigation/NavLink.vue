<script setup lang="ts">
const props = defineProps<{
  to: string
  hash?: string
  icon?: string
  large?: boolean
  iconOnly?: boolean
}>()

const localePath = useLocalePath()
const route = useRoute()

const target = computed(() => localePath(props.to))
const resolvedTo = computed(() =>
  props.hash ? { path: target.value, hash: props.hash } : target.value,
)
const isActive = computed(() => !props.hash && route.path === target.value)
</script>

<template>
  <NuxtLink
    :to="resolvedTo"
    class="relative inline-flex items-center gap-1.5 pb-0.5 font-sans transition-colors"
    :class="[
      large ? 'text-sm' : 'text-xs',
      isActive ? 'font-bold text-accent' : 'text-muted-foreground hover:text-accent',
      !iconOnly && [
        'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left',
        'after:bg-mint after:transition-transform after:content-[\'\'] hover:after:scale-x-100',
        isActive ? 'after:scale-x-100' : 'after:scale-x-0',
      ],
    ]"
  >
    <UiAppIcon v-if="icon" :icon="icon" :class="large ? 'relative size-6 top-[2px]' : 'size-6'" />
    <slot />
  </NuxtLink>
</template>
