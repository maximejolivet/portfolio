<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: string
    stagger?: number
    y?: number
    delay?: number
  }>(),
  { as: 'div', stagger: 0 },
)

const rootRef = useTemplateRef<HTMLElement>('root')

useScrollReveal(rootRef, {
  stagger: props.stagger,
  y: props.y,
  delay: props.delay,
})
</script>

<template>
  <component :is="as" ref="root">
    <slot />
  </component>
</template>
