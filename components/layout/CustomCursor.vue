<script setup lang="ts">
const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, label'

const x = ref(0)
const y = ref(0)
const visible = ref(false)
const enabled = ref(false)
const hovering = ref(false)

function onMove(e: MouseEvent) {
  x.value = e.clientX
  y.value = e.clientY
  visible.value = true
}

function onLeave() {
  visible.value = false
}

function onOver(e: MouseEvent) {
  hovering.value = !!(e.target as HTMLElement).closest?.(HOVER_SELECTOR)
}

onMounted(() => {
  enabled.value = window.matchMedia('(pointer: fine)').matches
  if (!enabled.value) return

  document.documentElement.classList.add('custom-cursor-active')
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onOver)
  document.documentElement.addEventListener('mouseleave', onLeave)
})

onUnmounted(() => {
  document.documentElement.classList.remove('custom-cursor-active')
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  document.documentElement.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed left-0 top-0 z-[200] transition-opacity duration-150 ease-out"
    :class="visible ? 'opacity-100' : 'opacity-0'"
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
  >
    <!-- core dot -->
    <div
      class="absolute rounded-full bg-accent transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      :class="hovering ? 'size-1.5 -translate-x-1/2 -translate-y-1/2' : 'size-3 -translate-x-1/2 -translate-y-1/2'"
    />
    <!-- outer ring, pops in with a springy overshoot on hover -->
    <div
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      :class="
        hovering
          ? 'size-10 rotate-0 opacity-100 shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_55%,transparent)]'
          : 'size-3 rotate-90 opacity-0'
      "
    />
  </div>
</template>
