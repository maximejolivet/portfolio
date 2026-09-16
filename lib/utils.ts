// Homemade replacements for clsx + tailwind-merge - this app's only two
// runtime styling dependencies, both small enough to own directly rather
// than pull in as packages (see the removal of shadcn-vue/reka-ui/
// class-variance-authority for the same reasoning).

export type ClassValue
  = | string
    | number
    | boolean
    | undefined
    | null
    | ClassValue[]
    | Record<string, unknown>

// --- clsx-equivalent: flattens strings/arrays/objects into a class string ---
//
// Iterative rather than recursive: a pathologically deep/wide nested array
// (e.g. attacker-controlled JSON fed into a `:class` binding somewhere down
// the line) would otherwise grow the call stack with input size and could
// exhaust it; an explicit heap-allocated stack has no such limit tied to
// call depth. `Object.keys()` (not `for...in`) is used for the object-map
// branch so only the input's own properties are read, not anything
// inherited via its prototype chain - relevant if `Object.prototype` were
// ever polluted by an unrelated vulnerability elsewhere in the app.
export function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = []
  const stack: ClassValue[] = [...inputs].reverse()

  while (stack.length > 0) {
    const input = stack.pop()
    if (!input) continue

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input))
    }
    else if (Array.isArray(input)) {
      for (let i = input.length - 1; i >= 0; i--) stack.push(input[i])
    }
    else if (typeof input === 'object') {
      for (const key of Object.keys(input)) {
        if (input[key]) classes.push(key)
      }
    }
  }

  return classes.join(' ')
}

// --- tailwind-merge-equivalent: dedupes conflicting Tailwind utilities ---
//
// Tailwind generates every utility with the same CSS specificity, so which
// of two conflicting classes (e.g. "p-4 p-6") actually wins in the browser
// depends on the order Tailwind happened to emit them in the stylesheet -
// not the order they appear in `class="..."`. When a wrapper component's
// own classes and a caller's override both apply to the same CSS property,
// concatenating them is unreliable; the later one needs to fully replace
// the earlier one before the class string ever reaches the DOM.
//
// This covers the utility groups actually used in this codebase's `cn()`
// calls (spacing, sizing, radius, colors, shadow/ring, layout, typography).
// It is deliberately not a full reimplementation of Tailwind's utility
// taxonomy: a class outside these groups is left as-is (same as if it were
// just concatenated), so an unrecognized class never crashes, it just won't
// be deduped against a same-group override. If a new conflicting pair shows
// up in future work, add its group below.
const SIZE_SUFFIXES = new Set([
  'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl',
])
const LENGTH_UNIT_PATTERN = /^\[.*(px|rem|em|%|vh|vw|ch)\]$/

function isSizeLikeSuffix(suffix: string): boolean {
  return SIZE_SUFFIXES.has(suffix) || LENGTH_UNIT_PATTERN.test(suffix)
}

const GROUP_RULES: [RegExp, string][] = [
  [/^rounded(-|$)/, 'radius'],
  [/^shadow(-|$)/, 'shadow'],
  [/^opacity-/, 'opacity'],
  [/^z-/, 'z-index'],
  [/^gap-x-/, 'gap-x'],
  [/^gap-y-/, 'gap-y'],
  [/^gap-/, 'gap'],
  [/^px-/, 'padding-x'],
  [/^py-/, 'padding-y'],
  [/^pt-/, 'padding-t'],
  [/^pr-/, 'padding-r'],
  [/^pb-/, 'padding-b'],
  [/^pl-/, 'padding-l'],
  [/^p-/, 'padding'],
  [/^mx-/, 'margin-x'],
  [/^my-/, 'margin-y'],
  [/^mt-/, 'margin-t'],
  [/^mr-/, 'margin-r'],
  [/^mb-/, 'margin-b'],
  [/^ml-/, 'margin-l'],
  [/^m-/, 'margin'],
  [/^size-/, 'size'],
  [/^max-w-/, 'max-width'],
  [/^min-w-/, 'min-width'],
  [/^max-h-/, 'max-height'],
  [/^min-h-/, 'min-height'],
  [/^w-/, 'width'],
  [/^h-/, 'height'],
  [/^ring-\d/, 'ring-width'],
  [/^ring-\[/, 'ring-width'],
  [/^ring(-|$)/, 'ring-color'],
  [/^border-\d/, 'border-width'],
  [/^border-\[/, 'border-width'],
  [/^border$/, 'border-width'],
  [/^border-/, 'border-color'],
  [/^bg-/, 'bg-color'],
  [/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/, 'font-weight'],
  [/^font-(sans|serif|mono)$/, 'font-family'],
  [/^leading-/, 'leading'],
  [/^tracking-/, 'tracking'],
  [/^whitespace-/, 'whitespace'],
  [/^items-/, 'align-items'],
  [/^justify-/, 'justify-content'],
  [/^self-/, 'align-self'],
  [/^content-/, 'align-content'],
  [/^grow(-|$)/, 'flex-grow'],
  [/^shrink(-|$)/, 'flex-shrink'],
  [/^basis-/, 'flex-basis'],
  [/^(top|right|bottom|left)-/, 'inset-side'],
  [/^inset-x-/, 'inset-x'],
  [/^inset-y-/, 'inset-y'],
  [/^inset-/, 'inset'],
  [/^translate-/, 'translate'],
  [/^scale-/, 'scale'],
  [/^rotate-/, 'rotate'],
]

const DISPLAY_VALUES = new Set([
  'flex', 'inline-flex', 'grid', 'inline-grid', 'block', 'inline-block',
  'inline', 'table', 'hidden', 'contents', 'flow-root',
])
const POSITION_VALUES = new Set(['relative', 'absolute', 'fixed', 'sticky', 'static'])

function groupKey(utility: string): string {
  if (DISPLAY_VALUES.has(utility)) return 'display'
  if (POSITION_VALUES.has(utility)) return 'position'

  if (utility.startsWith('text-')) {
    const suffix = utility.slice('text-'.length)
    return isSizeLikeSuffix(suffix) ? 'text-size' : 'text-color'
  }

  for (const [pattern, group] of GROUP_RULES) {
    if (pattern.test(utility)) return group
  }

  // No known group: never conflicts with anything else, so it always
  // survives the merge exactly as if it had been concatenated.
  return `unmerged:${utility}`
}

// Splits a class into its variant chain ("hover:", "dark:aria-invalid:",
// "[&>svg]:", ...) and its base utility, without breaking on a ":" that's
// inside an arbitrary-variant bracket like "[&_svg:not(...)]".
function splitVariants(cls: string): { variants: string, utility: string } {
  let depth = 0
  let lastColon = -1
  for (let i = 0; i < cls.length; i++) {
    const char = cls[i]
    if (char === '[') depth++
    else if (char === ']') depth--
    else if (char === ':' && depth === 0) lastColon = i
  }
  return lastColon === -1
    ? { variants: '', utility: cls }
    : { variants: cls.slice(0, lastColon + 1), utility: cls.slice(lastColon + 1) }
}

export function twMerge(classString: string): string {
  const classes = classString.split(/\s+/).filter(Boolean)
  // Map key = variants + group, so "hover:bg-red-500" and "bg-blue-500"
  // land in different buckets (only the hover state conflicts with itself).
  const winners = new Map<string, string>()
  const order: string[] = []

  for (const cls of classes) {
    const important = cls.startsWith('!') ? '!' : ''
    const bare = important ? cls.slice(1) : cls
    const { variants, utility } = splitVariants(bare)
    const key = `${variants}${important}${groupKey(utility)}`
    if (!winners.has(key)) order.push(key)
    winners.set(key, cls)
  }

  return order.map((key) => winners.get(key)).join(' ')
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
