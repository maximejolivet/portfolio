<script setup lang="ts">
import { motion } from 'motion-v'
import { useMouseInElement } from '@vueuse/core'

const rootRef = useTemplateRef<HTMLElement>('root')
const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(rootRef)

const strength = 16

const offset = computed(() => {
  if (isOutside.value || !elementWidth.value || !elementHeight.value) {
    return { x: 0, y: 0 }
  }
  return {
    x: (elementX.value / elementWidth.value - 0.5) * strength,
    y: (elementY.value / elementHeight.value - 0.5) * strength,
  }
})
</script>

<template>
  <motion.div
    ref="root"
    class="inline-block"
    :animate="{ x: offset.x, y: offset.y }"
    :transition="{ type: 'spring', stiffness: 300, damping: 18, mass: 0.4 }"
  >
    <slot />
  </motion.div>
</template>
