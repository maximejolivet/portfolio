<script setup lang="ts">
const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, label'
const MAX_ANCESTOR_DEPTH = 8

const x = ref(0)
const y = ref(0)
const visible = ref(false)
const enabled = ref(false)
const hovering = ref(false)
const onSameColor = ref(false)

let accentRgb = ''

function readAccentRgb() {
  const probe = document.createElement('span')
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  probe.style.color = 'var(--accent)'
  document.body.appendChild(probe)
  accentRgb = getComputedStyle(probe).color
  probe.remove()
}

function backgroundColorAt(el: Element | null): string {
  let node: Element | null = el
  for (let depth = 0; node && depth < MAX_ANCESTOR_DEPTH; depth++) {
    const bg = getComputedStyle(node).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg
    node = node.parentElement
  }
  return getComputedStyle(document.body).backgroundColor
}

function onMove(e: MouseEvent) {
  x.value = e.clientX
  y.value = e.clientY
  visible.value = true
  onSameColor.value
    = backgroundColorAt(document.elementFromPoint(e.clientX, e.clientY)) === accentRgb
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

  readAccentRgb()
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
    <!-- core dot: turquoise by default, white when the surface underneath is the same color -->
    <div
      class="absolute rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      :class="[
        onSameColor ? 'bg-white' : 'bg-accent',
        hovering
          ? 'size-4 -translate-x-1/2 -translate-y-1/2'
          : 'size-3 -translate-x-1/2 -translate-y-1/2',
      ]"
    />
    <!-- outer ring, pops in with a springy overshoot on hover -->
    <div
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      :class="[
        onSameColor ? 'border-white' : 'border-accent',
        hovering ? 'size-7 rotate-0 opacity-100' : 'size-3 rotate-90 opacity-0',
      ]"
    />
  </div>
</template>
