import { reactive } from 'vue'

// Tracks which ids are unfolded; everything starts folded except `initiallyOpen`.
export function useCollapsible(initiallyOpen: string[] = []) {
  const open = reactive(new Set<string>(initiallyOpen))

  const isOpen = (id: string) => open.has(id)

  function toggle(id: string) {
    if (!open.delete(id)) open.add(id)
  }

  return { isOpen, toggle }
}
