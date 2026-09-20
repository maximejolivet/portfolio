import { computed } from 'vue'
import type { TimelineItem } from '~/types/content.types'
import { useCollapsible } from '~/composables/useCollapsible'
import { useTypewriter } from '~/composables/useTypewriter'
import { revealLines } from '~/utils/revealLines'

// The latest entry is always unfolded and types itself when the section scrolls into view;
// the others start folded and type the first time they are unfolded.
export function useExperienceLog(items: TimelineItem[], t: (key: string) => string) {
  const alwaysOpenId = items[0].id
  const { isOpen, toggle } = useCollapsible([alwaysOpenId])
  const { visibleChars, type, typeOnceVisible, stop } = useTypewriter()
  const alreadyTyped = new Set<string>()

  const entries = computed(() =>
    items.map((item) => {
      const texts = [
        `# ${t(item.locationKey)}`,
        ...(item.introKey ? [t(item.introKey)] : []),
        ...(item.descriptionKey ? [t(item.descriptionKey)] : []),
        ...(item.descriptionPointsKeys?.map((key) => t(key)) ?? []),
      ]
      const [location, ...rest] = revealLines(texts, visibleChars(item.id))
      return {
        item,
        location,
        intro: item.introKey ? rest[0] : null,
        points: item.introKey ? rest.slice(1) : rest,
        totalChars: texts.join('').length,
      }
    }),
  )

  function onToggle(entry: (typeof entries.value)[number]) {
    if (entry.item.id === alwaysOpenId) return
    const opening = !isOpen(entry.item.id)
    toggle(entry.item.id)
    if (opening && !alreadyTyped.has(entry.item.id)) {
      alreadyTyped.add(entry.item.id)
      type(entry.item.id, entry.totalChars)
    }
  }

  function start(el: Element) {
    typeOnceVisible(el, alwaysOpenId, entries.value[0].totalChars)
  }

  return { entries, alwaysOpenId, isOpen, onToggle, start, stop }
}
