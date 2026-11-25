<script setup lang="ts">
import {
  classifyTarget,
  composite,
  contrastRatio,
  flattenLayers,
  isIncidentalText,
  parseRgba,
  requiredContrast,
  type Rgba,
} from '~/utils/inspector'

type Category = 'target' | 'image' | 'name' | 'contrast'
type Severity = 'fail' | 'warn'

interface Issue {
  id: number
  category: Category
  severity: Severity
  element: HTMLElement
  detail: string
}

type AddIssue = (element: HTMLElement, category: Category, severity: Severity, detail: string) => void

const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()
const route = useRoute()

// Bounds keep a manual audit responsive on long pages.
const MAX_ISSUES = 150
const MAX_SCANNED = 3000
const INTERACTIVE = 'a[href], button, input:not([type="hidden"]), select, textarea, [role="button"]'
const NAMED = 'a[href], button, [role="button"]'
const WHITE: Rgba = { r: 255, g: 255, b: 255, a: 1 }

const issues = shallowRef<Issue[]>([])
const tick = ref(0)
const activeId = ref<number | null>(null)
const heading = ref<HTMLElement | null>(null)
const counts = computed(() => ({
  fail: issues.value.filter((issue) => issue.severity === 'fail').length,
  warn: issues.value.filter((issue) => issue.severity === 'warn').length,
}))

let returnFocus: HTMLElement | null = null
let frame = 0

// The inspector's own overlay and panel are carrying data-site-inspector: never audit them.
function isOutsideInspector(el: Element) {
  return !el.closest('[data-site-inspector]')
}

// Skips elements that are hidden, collapsed with `inert`, marked aria-hidden (decorative),
// or inside a closed <details> (not shown to the visitor, even when it has a box).
function isRendered(el: Element) {
  const rect = el.getBoundingClientRect()
  const closedDetails = el.closest('details:not([open])')
  const inSummary = el.closest('summary')
  return (
    rect.width > 1
    && rect.height > 1
    && getComputedStyle(el).visibility !== 'hidden'
    && !el.closest('[inert], [aria-hidden="true"]')
    && !(closedDetails && !inSummary)
  )
}

function describe(el: HTMLElement): string {
  const label
    = el.getAttribute('aria-label')
      ?? el.getAttribute('alt')
      ?? el.textContent
      ?? el.getAttribute('href')
      ?? el.getAttribute('src')
      ?? ''
  const text = label.replace(/\s+/g, ' ').trim().slice(0, 60)
  return `<${el.tagName.toLowerCase()}>${text ? ` ${text}` : ''}`
}

function checkTargets(add: AddIssue) {
  document.querySelectorAll<HTMLElement>(INTERACTIVE).forEach((el) => {
    if (!isOutsideInspector(el) || !isRendered(el)) return
    // Inline text links are exempt from the size rule (WCAG 2.5.8 spacing exception).
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') return

    const rect = el.getBoundingClientRect()
    const level = classifyTarget(rect.width, rect.height)
    if (level === 'ok') return
    add(el, 'target', level, describe(el))
  })
}

function checkImages(add: AddIssue) {
  document.querySelectorAll<HTMLImageElement>('img:not([alt])').forEach((img) => {
    if (!isOutsideInspector(img) || !isRendered(img)) return
    add(img, 'image', 'fail', describe(img))
  })
}

function hasAccessibleName(el: HTMLElement): boolean {
  if (el.getAttribute('aria-label')?.trim()) return true
  if (el.getAttribute('aria-labelledby') || el.getAttribute('title')) return true
  if (el.textContent?.trim()) return true
  return [...el.querySelectorAll('img')].some((img) => img.alt.trim() !== '')
}

function checkNames(add: AddIssue) {
  document.querySelectorAll<HTMLElement>(NAMED).forEach((el) => {
    if (!isOutsideInspector(el) || !isRendered(el)) return
    if (hasAccessibleName(el)) return
    add(el, 'name', 'fail', describe(el))
  })
}

// Background resolution: collect translucent layers up to the first opaque one, then
// flatten them onto it. Gradients, images and colour functions we cannot parse make the
// result unknown, so the element is skipped rather than guessed.
function opaqueBackground(el: HTMLElement): Rgba | null {
  const pageBase = parseRgba(getComputedStyle(document.body).backgroundColor) ?? WHITE
  const layers: Rgba[] = []
  let node: HTMLElement | null = el
  while (node) {
    const style = getComputedStyle(node)
    if (style.backgroundImage !== 'none') return null
    const bg = parseRgba(style.backgroundColor)
    if (bg === null) return null
    if (bg.a >= 1) return flattenLayers(layers, bg)
    if (bg.a > 0) layers.push(bg)
    node = node.parentElement
  }
  return flattenLayers(layers, pageBase)
}

// Only the element's own text nodes: nested elements are checked on their own.
function ownText(el: HTMLElement): string {
  return [...el.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent ?? '')
    .join('')
    .trim()
}

function checkContrast(add: AddIssue) {
  const elements = document.querySelectorAll<HTMLElement>('body *')
  const limit = Math.min(elements.length, MAX_SCANNED)
  for (let i = 0; i < limit; i++) {
    const el = elements[i]!
    const text = ownText(el)
    if (!text || isIncidentalText(text) || !isOutsideInspector(el) || !isRendered(el)) continue

    const style = getComputedStyle(el)
    const fg = parseRgba(style.color)
    const bg = opaqueBackground(el)
    if (!fg || !bg) continue

    const textColor = composite(fg, bg)
    const ratio = contrastRatio(textColor, bg)
    const needed = requiredContrast(Number.parseFloat(style.fontSize), Number(style.fontWeight))
    if (ratio < needed) add(el, 'contrast', 'fail', describe(el))
  }
}

function scan() {
  const found: Issue[] = []
  const seen = new Map<HTMLElement, Set<Category>>()

  const add: AddIssue = (element, category, severity, detail) => {
    if (found.length >= MAX_ISSUES) return
    const categories = seen.get(element) ?? new Set<Category>()
    if (categories.has(category)) return
    categories.add(category)
    seen.set(element, categories)
    found.push({ id: found.length + 1, category, severity, element, detail })
  }

  checkTargets(add)
  checkImages(add)
  checkNames(add)
  checkContrast(add)

  // Failures first, then warnings, keeping page order within each group.
  found.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'fail' ? -1 : 1))
  found.forEach((issue, index) => {
    issue.id = index + 1
  })
  issues.value = found
  activeId.value = null
}

// Boxes follow the page: rects are recomputed on each animation frame after scroll or resize.
const boxes = computed(() => {
  void tick.value
  return issues.value.map((issue) => ({ issue, rect: issue.element.getBoundingClientRect() }))
})

function requestTick() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    tick.value++
  })
}

function reveal(issue: Issue) {
  activeId.value = issue.id
  issue.element.scrollIntoView({ block: 'center' })
  requestTick()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => route.fullPath,
  () => emit('close'),
)

onMounted(() => {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  scan()
  heading.value?.focus()
  window.addEventListener('scroll', requestTick, { passive: true, capture: true })
  window.addEventListener('resize', requestTick)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestTick, { capture: true })
  window.removeEventListener('resize', requestTick)
  window.removeEventListener('keydown', onKeydown)
  cancelAnimationFrame(frame)
  returnFocus?.focus?.()
})
</script>

<template>
  <div data-site-inspector class="font-mono">
    <!-- Overlay: decorative, the same findings are listed in the panel. -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-[90]">
      <div
        v-for="box in boxes"
        :key="box.issue.id"
        class="absolute border-2"
        :class="[
          box.issue.severity === 'fail'
            ? 'border-red-500 bg-red-500/10'
            : 'border-yellow-500 bg-yellow-400/10',
          activeId === box.issue.id && 'ring-4 ring-accent',
        ]"
        :style="{
          top: `${box.rect.top}px`,
          left: `${box.rect.left}px`,
          width: `${box.rect.width}px`,
          height: `${box.rect.height}px`,
        }"
      >
        <span
          class="absolute -top-5 left-0 whitespace-nowrap rounded bg-panel px-1.5 py-0.5 text-[0.625rem] font-bold text-panel-foreground"
        >{{ box.issue.id }}</span>
      </div>
    </div>

    <aside
      aria-labelledby="site-inspector-title"
      class="fixed right-4 top-4 z-[100] flex max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] flex-col gap-4 overflow-y-auto rounded-xl border border-panel-foreground/10 bg-panel-2 p-4 text-sm text-panel-foreground shadow-2xl"
    >
      <div class="flex items-center justify-between gap-3">
        <h2
          id="site-inspector-title"
          ref="heading"
          tabindex="-1"
          class="text-sm font-bold focus:outline-none"
        >
          {{ t('inspector.title') }}
        </h2>
        <button
          type="button"
          :aria-label="t('inspector.close')"
          class="flex size-11 -my-2 -mr-2 shrink-0 items-center justify-center rounded-full text-panel-foreground/60 transition-colors hover:text-mint"
          @click="emit('close')"
        >
          <UiAppIcon icon="lucide:x" class="size-4" />
        </button>
      </div>

      <p class="text-xs leading-relaxed text-panel-foreground/70">
        {{ t('inspector.intro') }}
      </p>

      <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
        <p class="font-semibold" role="status">
          {{
            issues.length
              ? t('inspector.summary', counts)
              : t('inspector.none')
          }}
        </p>
        <button
          type="button"
          class="min-h-11 rounded-full border border-panel-foreground/20 px-3 text-xs transition-colors hover:text-mint"
          @click="scan"
        >
          {{ t('inspector.rescan') }}
        </button>
      </div>

      <ol v-if="issues.length" class="flex flex-col gap-1.5">
        <li v-for="issue in issues" :key="issue.id">
          <button
            type="button"
            class="flex min-h-11 w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-panel-foreground/5"
            :class="activeId === issue.id && 'bg-panel-foreground/10'"
            :aria-label="`${issue.id}. ${t(`inspector.categories.${issue.category}`)} : ${t(`inspector.severity.${issue.severity}`)}. ${t('inspector.scrollTo')}`"
            @click="reveal(issue)"
          >
            <span
              class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold text-panel-foreground"
              :class="issue.severity === 'fail' ? 'bg-red-500' : 'bg-yellow-500 text-panel-2'"
              aria-hidden="true"
            >{{ issue.id }}</span>
            <span class="flex min-w-0 flex-col gap-0.5">
              <span class="font-semibold">
                {{ t(`inspector.categories.${issue.category}`) }}
                <span class="font-normal text-panel-foreground/60">
                  · {{ t(`inspector.severity.${issue.severity}`) }}
                </span>
              </span>
              <span class="truncate text-panel-foreground/60">{{ issue.detail }}</span>
            </span>
          </button>
        </li>
      </ol>

      <p class="border-t border-panel-foreground/10 pt-3 text-[0.6875rem] leading-relaxed text-panel-foreground/60">
        {{ t('inspector.limits', { count: MAX_ISSUES }) }}
      </p>
    </aside>
  </div>
</template>
