<script setup lang="ts">
import { AVAILABILITY_STATUS, BOOKING_URL, CONTACT_EMAIL } from '~/constants/contact'
import { EXPERIENCE_TIMELINE } from '~/constants/experience'
import { SOCIAL_LINKS } from '~/constants/social'
import { TECH_CATEGORIES } from '~/constants/techstack'
import { projectsForTech } from '~/utils/techProjectMatch'
import { renderContactFile, renderProjectsFile } from '~/utils/panelFiles'
import { renderBars, renderTimeline } from '~/utils/terminalRender'
import { readableOnSurface } from '~/utils/techColor'
import { TECH_BRAND_COLORS } from '~/constants/techColors'

// Editor tabs that open from the explorer. The terminal is always open and cannot be closed.
type FileTab = 'profile.json' | 'about.md' | 'experience.log' | 'projects/index.ts' | 'contact.ts'
type Tab = FileTab | 'terminal'

export interface JsonToken {
  text: string
  class?: string
  href?: string
}

export interface JsonLine {
  tokens: JsonToken[]
  statusDot?: boolean
  cursor?: boolean
}

interface ExplorerEntry {
  depth: number
  label: string
  type: 'folder' | 'file'
  icon?: string
  // Set on files: the editor tab that opens when the entry is clicked.
  id?: FileTab
}

interface TerminalLine {
  text: string
  isInput?: boolean
  // Optional text colour, used by the `skills` bars.
  color?: string
}

const EXPLORER_TREE: ExplorerEntry[] = [
  { depth: 0, type: 'folder', label: 'portfolio' },
  { depth: 1, type: 'file', label: 'about.md', icon: 'material-icon-theme:markdown', id: 'about.md' },
  { depth: 1, type: 'file', label: 'experience.log', icon: 'material-icon-theme:log', id: 'experience.log' },
  { depth: 1, type: 'folder', label: 'projects' },
  { depth: 2, type: 'file', label: 'index.ts', icon: 'material-icon-theme:typescript', id: 'projects/index.ts' },
  { depth: 1, type: 'file', label: 'contact.ts', icon: 'material-icon-theme:typescript', id: 'contact.ts' },
  { depth: 1, type: 'file', label: 'profile.json', icon: 'material-icon-theme:json', id: 'profile.json' },
]

const CHARS_PER_TICK = 2
const TICK_MS = 10

const props = defineProps<{
  lines: JsonLine[]
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { openChat } = useChatIntro()
// Shares the 'projects' async data with the projects section, so no extra request.
const { data: projects } = useProjects()
const { theme, toggleTheme } = useThemeMode()

const openTabs = ref<Tab[]>(['profile.json', 'terminal'])
const activeTab = ref<Tab>('profile.json')

// Brand file-type icons (material-icon-theme), the same ones the explorer shows.
const TAB_ICONS: Record<Tab, string> = {
  'profile.json': 'material-icon-theme:json',
  'about.md': 'material-icon-theme:markdown',
  'experience.log': 'material-icon-theme:log',
  'projects/index.ts': 'material-icon-theme:typescript',
  'contact.ts': 'material-icon-theme:typescript',
  'terminal': 'lucide:terminal',
}

// Only the file name, so `projects/index.ts` is shown as `index.ts`.
function tabLabel(tab: Tab): string {
  return tab.split('/').pop() ?? tab
}

// File icon colour by extension, like an editor's file-icon theme. Uses the panel's own label tokens.
const FILE_ICON_COLORS: Record<string, string> = {
  json: 'text-label-1',
  ts: 'text-label-2',
  md: 'text-accent-on-panel',
  log: 'text-panel-foreground/60',
}

function fileIconColor(name: string): string | undefined {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? undefined : FILE_ICON_COLORS[name.slice(dot + 1)]
}

const TERMINAL_COMMANDS = [
  'help',
  'whoami',
  'cv',
  'projects',
  'skills',
  'timeline',
  'contact',
  'ia',
  'theme',
  'sudo',
  'clear',
  'exit',
] as const

const terminalLines = ref<TerminalLine[]>([{ text: t('terminal.hint') }])
const terminalCommand = ref('')
const terminalInputRef = ref<HTMLInputElement | null>(null)
const terminalScrollRef = ref<HTMLDivElement | null>(null)

function scrollTerminalToBottom() {
  nextTick(() => {
    terminalScrollRef.value?.scrollTo({ top: terminalScrollRef.value.scrollHeight })
  })
}

function selectTab(tab: Tab) {
  activeTab.value = tab
  if (tab === 'terminal') nextTick(() => terminalInputRef.value?.focus())
}

// Clicking a file in the explorer opens it in a tab (once) and shows it.
function openFile(tab: FileTab) {
  if (!openTabs.value.includes(tab)) openTabs.value.push(tab)
  selectTab(tab)
}

// Closing the active tab moves to the tab on its left. The terminal is never closed.
function closeTab(tab: Tab) {
  if (tab === 'terminal') return
  const index = openTabs.value.indexOf(tab)
  if (index === -1) return
  openTabs.value.splice(index, 1)
  if (activeTab.value === tab) selectTab(openTabs.value[Math.max(0, index - 1)] ?? 'terminal')
}

// The content of each file, built from the same data as the rest of the site.
const experienceLines = computed(() =>
  renderTimeline(
    EXPERIENCE_TIMELINE.map((item) => ({
      period: t(item.periodKey),
      title: t(item.titleKey),
      organization: t(item.organizationKey),
    })),
  ),
)

const aboutLines = computed(() => [
  `# ${t('hero.role')}`,
  '',
  t('aboutSection.paragraph1'),
  '',
  t('aboutSection.paragraph2'),
  '',
  `- ${t('aboutSection.highlight1')}`,
  `- ${t('aboutSection.highlight2')}`,
  `- ${t('aboutSection.highlight3')}`,
])

// Personal projects only: client (pro) work may be confidential, so its names stay out.
const projectsFileLines = computed(() =>
  renderProjectsFile(
    (projects.value ?? [])
      .map((row) => localizeProject(row, locale.value))
      .filter((project) => project.category === 'personal')
      .map((project) => ({ slug: project.slug, title: project.title, year: project.year })),
  ),
)

const contactFileLines = computed(() =>
  renderContactFile({
    email: CONTACT_EMAIL,
    booking: BOOKING_URL,
    status: AVAILABILITY_STATUS,
    socials: SOCIAL_LINKS.map((link) => link.href),
  }),
)

// Lines of the file open in the active tab (empty for the JSON profile and the terminal).
const activeFileLines = computed<string[]>(() => {
  switch (activeTab.value) {
    case 'about.md': return aboutLines.value
    case 'experience.log': return experienceLines.value
    case 'projects/index.ts': return projectsFileLines.value
    case 'contact.ts': return contactFileLines.value
    default: return []
  }
})

function runTerminalCommand(raw: string) {
  const cmd = raw.trim().toLowerCase()
  terminalLines.value.push({ text: `$ ${raw}`, isInput: true })

  switch (cmd) {
    case 'help':
      terminalLines.value.push({ text: t('terminal.help') })
      break
    case 'whoami':
      terminalLines.value.push({ text: t('terminal.whoami', { role: t('hero.role') }) })
      break
    case 'cv':
      navigateTo(localePath('/cv'))
      break
    case 'projects':
      navigateTo(localePath('projects'))
      break
    case 'skills':
      // One bar per technology used on at least one project. All bars share one scale,
      // so a longer bar always means more projects, whatever the category.
      terminalLines.value.push({ text: t('terminal.skillsLegend') })
      {
        const countOf = (id: string) => projectsForTech(id, projects.value ?? []).length
        const scaleMax = Math.max(1, ...TECH_CATEGORIES.flatMap((c) => c.items.map((i) => countOf(i.id))))
        for (const category of TECH_CATEGORIES) {
          const used = category.items
            .map((item) => ({ id: item.id, label: item.name, count: countOf(item.id) }))
            .filter((row) => row.count > 0)
          if (!used.length) continue
          terminalLines.value.push({ text: t(category.labelKey).toUpperCase() })
          // Each bar takes its technology's colour, adjusted to stay readable on the panel.
          renderBars(used, 12, scaleMax).forEach((text, index) => {
            const brand = TECH_BRAND_COLORS[used[index]!.id]
            terminalLines.value.push({ text: `  ${text}`, color: brand ? readableOnSurface(brand) : undefined })
          })
        }
      }
      break
    case 'timeline':
      renderTimeline(
        EXPERIENCE_TIMELINE.map((item) => ({
          period: t(item.periodKey),
          title: t(item.titleKey),
          organization: t(item.organizationKey),
        })),
      ).forEach((text) => terminalLines.value.push({ text }))
      break
    case 'contact':
      navigateTo({ path: localePath('/'), hash: '#contact' })
      break
    case 'ia':
      terminalLines.value.push({ text: t('terminal.ia') })
      openChat()
      break
    case 'theme':
      toggleTheme()
      terminalLines.value.push({
        text: t('terminal.theme', {
          mode: theme.value === 'night' ? t('terminal.themeNight') : t('terminal.themeDay'),
        }),
      })
      break
    case 'sudo':
      terminalLines.value.push({ text: t('terminal.sudo') })
      break
    case 'clear':
      terminalLines.value = []
      break
    case 'exit':
      selectTab('profile.json')
      break
    case '':
      break
    default:
      terminalLines.value.push({ text: t('terminal.notFound', { cmd }) })
  }

  terminalCommand.value = ''
  scrollTerminalToBottom()
}

// Deep-link support: ?cmd=whoami opens the terminal and runs it - lets a
// shared link land the visitor directly on the intended output instead of
// them having to type it themselves.
const route = useRoute()

onMounted(() => {
  const cmd = route.query.cmd
  if (typeof cmd !== 'string' || !TERMINAL_COMMANDS.includes(cmd as (typeof TERMINAL_COMMANDS)[number])) return

  selectTab('terminal')
  nextTick(() => runTerminalCommand(cmd))
})

function isIndent(token: JsonToken) {
  return !token.class && /^ +$/.test(token.text)
}

function asDots(text: string) {
  return text.replace(/ /g, '·')
}

// The leading run of spaces (indentation) of a file line, shown as dots like the JSON view.
function leadingSpaces(text: string) {
  return text.match(/^ */)?.[0] ?? ''
}

const linesWithLength = computed(() =>
  props.lines.map((line) => ({
    ...line,
    length: line.tokens.reduce((sum, token) => sum + token.text.length, 0),
  })),
)

const totalLength = computed(() =>
  linesWithLength.value.reduce((sum, line) => sum + line.length, 0),
)

// Starts fully revealed so SSR / no-JS output shows the complete panel; onMounted
// resets it to 0 and animates back up, which happens before the first paint.
const visibleChars = ref(Infinity)

const renderLines = computed(() => {
  let consumed = 0
  return linesWithLength.value.map((line) => {
    const lineStart = consumed
    consumed += line.length
    let remaining = Math.max(0, Math.min(line.length, visibleChars.value - lineStart))
    const isStarted = remaining > 0
    const isDone = remaining >= line.length

    const tokens: JsonToken[] = []
    for (const token of line.tokens) {
      if (remaining <= 0) break
      if (token.text.length <= remaining) {
        tokens.push(token)
        remaining -= token.text.length
      }
      else {
        tokens.push({ ...token, text: token.text.slice(0, remaining) })
        remaining = 0
      }
    }

    return { ...line, tokens, isStarted, isDone }
  })
})

// Set by the command palette while it or the site inspector window is open: the typing waits.
const overlayOpen = useState<boolean>('overlay-window-open', () => false)

// The activity bar's search icon asks the command palette to open (it listens to this counter).
const paletteRequest = useState<number>('command-palette-request', () => 0)
function openCommandPalette() {
  paletteRequest.value++
}

let rafId = 0

function animateTyping() {
  if (rafId) cancelAnimationFrame(rafId)
  visibleChars.value = 0
  let lastTick = 0

  function step(now: number) {
    if (overlayOpen.value) {
      rafId = requestAnimationFrame(step)
      return
    }
    if (now - lastTick >= TICK_MS) {
      visibleChars.value = Math.min(visibleChars.value + CHARS_PER_TICK, totalLength.value)
      lastTick = now
    }
    if (visibleChars.value < totalLength.value) {
      rafId = requestAnimationFrame(step)
    }
  }

  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) animateTyping()
})

// Opened files are typed in like profile.json: same speed, same cursor, one reveal per file.
const fileVisibleChars = ref(Infinity)
const fileTotalLength = computed(() => activeFileLines.value.reduce((sum, line) => sum + line.length, 0))
// Syntax colours for the file views, same palette as the profile.json view.
interface FileToken {
  text: string
  class?: string
  dots?: boolean
}

const TS_KEYWORDS = new Set([
  'export', 'const', 'let', 'import', 'from', 'return', 'function', 'type', 'interface', 'default', 'as', 'new',
])

// One regex pass; the last alternative catches any other character, so no text is lost.
const TS_TOKEN = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|([\p{L}_$][\p{L}\p{N}_$]*)|(\s+)|([\s\S])/gu

function highlightTs(code: string): FileToken[] {
  return [...code.matchAll(TS_TOKEN)].map((m) => {
    const text = m[0]
    if (m[1]) return { text, class: 'text-panel-foreground/40' }
    if (m[2]) return { text, class: 'text-primary' }
    if (m[3]) return { text, class: 'text-highlight-on-panel' }
    if (m[4]) return { text, class: TS_KEYWORDS.has(text) ? 'text-accent-on-panel' : undefined }
    if (m[5]) return { text }
    return { text, class: 'text-panel-foreground/60' }
  })
}

function highlightMd(code: string): FileToken[] {
  if (code.startsWith('#')) return [{ text: code, class: 'text-accent-on-panel font-bold' }]
  const bullet = code.match(/^[-*] /)
  if (bullet) return [{ text: bullet[0], class: 'text-highlight-on-panel' }, { text: code.slice(bullet[0].length) }]
  return [{ text: code }]
}

function highlightLog(code: string): FileToken[] {
  // split with a capture group keeps the numbers at odd indexes.
  return code.split(/(\d[\d.:/-]*\d|\d)/).map((text, i) => ({
    text,
    class: i % 2 === 1 ? 'text-highlight-on-panel' : undefined,
  })).filter((t) => t.text !== '')
}

function highlightLine(line: string, tab: Tab): FileToken[] {
  // Leading spaces are the indentation: shown as dots, like the JSON view.
  const indent = leadingSpaces(line)
  const rest = line.slice(indent.length)
  const indentTokens: FileToken[] = indent ? [{ text: indent, class: 'text-panel-foreground/20', dots: true }] : []
  const ext = tab.split('.').pop()
  const body = ext === 'md' ? highlightMd(rest) : ext === 'log' ? highlightLog(rest) : highlightTs(rest)
  return [...indentTokens, ...body]
}

// The first `count` characters of a token list, keeping each token's colour.
function sliceTokens(tokens: FileToken[], count: number): FileToken[] {
  const out: FileToken[] = []
  let left = count
  for (const token of tokens) {
    if (left <= 0) break
    const text = token.text.slice(0, left)
    out.push({ ...token, text })
    left -= text.length
  }
  return out
}

const fileRenderLines = computed(() => {
  let consumed = 0
  return activeFileLines.value.map((line) => {
    const start = consumed
    consumed += line.length
    const shown = Math.max(0, Math.min(line.length, fileVisibleChars.value - start))
    return {
      tokens: sliceTokens(highlightLine(line, activeTab.value), shown),
      started: fileVisibleChars.value >= start,
      done: shown >= line.length,
    }
  })
})

let fileRafId = 0

function animateFile() {
  if (fileRafId) cancelAnimationFrame(fileRafId)
  fileVisibleChars.value = 0
  let lastTick = 0
  const step = (now: number) => {
    if (overlayOpen.value) {
      fileRafId = requestAnimationFrame(step)
      return
    }
    if (now - lastTick >= TICK_MS) {
      fileVisibleChars.value = Math.min(fileVisibleChars.value + CHARS_PER_TICK, fileTotalLength.value)
      lastTick = now
    }
    if (fileVisibleChars.value < fileTotalLength.value) fileRafId = requestAnimationFrame(step)
  }
  fileRafId = requestAnimationFrame(step)
}

watch(activeTab, (tab) => {
  if (tab === 'terminal') return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (tab === 'profile.json') {
    // Same typing as the file views, every time the JSON tab is shown.
    if (reduceMotion) visibleChars.value = Infinity
    else animateTyping()
    return
  }
  if (reduceMotion) fileVisibleChars.value = Infinity
  else animateFile()
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (fileRafId) cancelAnimationFrame(fileRafId)
})
</script>

<template>
  <div class="flex h-full min-w-0 flex-col bg-panel text-panel-foreground">
    <!-- window title bar -->
    <div class="flex shrink-0 items-center gap-2 border-b border-panel-foreground/10 px-4 py-2.5">
      <span class="size-2.5 rounded-full bg-red-400/70" />
      <span class="size-2.5 rounded-full bg-yellow-400/70" />
      <span class="size-2.5 rounded-full bg-green-400/70" />
      <span class="ml-2 truncate font-mono text-xs text-panel-foreground/60">portfolio — <span :class="fileIconColor(activeTab)">{{ activeTab }}</span></span>
    </div>

    <div class="flex min-h-0 flex-1">
      <!-- activity bar -->
      <div
        class="hidden h-full w-11 shrink-0 flex-col items-center justify-between border-r border-panel-foreground/10 bg-panel-2 py-4 md:flex"
      >
        <div class="flex flex-col items-center gap-5">
          <UiAppIcon icon="lucide:files" class="size-4.5 text-panel-foreground" />
          <button
            type="button"
            class="flex items-center justify-center text-accent-on-panel hover:text-panel-foreground"
            :aria-label="t('commandPalette.toggle')"
            @click="openCommandPalette"
          >
            <UiAppIcon icon="lucide:search" class="size-4.5" />
          </button>
          <UiAppIcon icon="lucide:git-branch" class="size-4.5 text-panel-foreground/60" />
          <UiAppIcon icon="logos:claude-icon" class="size-4.5 opacity-35 brightness-0 invert" />
          <UiAppIcon icon="logos:docker-icon" class="size-4.5 opacity-35 brightness-0 invert" />
          <UiAppIcon icon="logos:figma" class="size-4.5 opacity-35 brightness-0 invert" />
        </div>
        <div class="flex flex-col items-center gap-5">
          <button
            type="button"
            class="flex items-center justify-center text-accent-on-panel hover:text-panel-foreground"
            :aria-label="$t('explorer.openProfile')"
            @click="openFile('profile.json')"
          >
            <UiAppIcon icon="lucide:user-round" class="size-4.5" />
          </button>
          <NuxtLink
            :to="{ path: localePath('/'), hash: '#tech' }"
            class="flex items-center justify-center text-accent-on-panel hover:text-panel-foreground"
            :aria-label="$t('aboutSection.toStack')"
          >
            <UiAppIcon icon="lucide:settings" class="size-4.5" />
          </NuxtLink>
        </div>
      </div>

      <!-- file explorer -->
      <div
        class="hidden w-44 shrink-0 flex-col overflow-y-auto border-r border-panel-foreground/10 bg-panel-2 px-1 py-1.5 font-mono text-xs lg:flex"
      >
        <template v-for="entry in EXPLORER_TREE" :key="entry.label">
          <button
            v-if="entry.type === 'file' && entry.id"
            type="button"
            class="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left leading-5 transition-colors hover:text-panel-foreground"
            :class="entry.id === activeTab ? 'bg-panel-foreground/10 text-accent-on-panel' : 'text-panel-foreground/60'"
            :style="{ paddingLeft: `${entry.depth * 0.75 + 0.25}rem` }"
            :aria-current="entry.id === activeTab ? 'true' : undefined"
            @click="entry.id && openFile(entry.id)"
          >
            <UiAppIcon
              :icon="entry.icon ?? 'lucide:file'"
              class="size-3.5 shrink-0"
            />
            <span class="truncate">{{ entry.label }}</span>
          </button>
          <div
            v-else
            class="flex items-center gap-1.5 rounded px-1 py-0.5 leading-5 text-panel-foreground/60"
            :style="{ paddingLeft: `${entry.depth * 0.75 + 0.25}rem` }"
          >
            <UiAppIcon icon="lucide:folder" class="size-3.5 shrink-0" />
            <span class="truncate">{{ entry.label }}</span>
          </div>
        </template>
      </div>

      <!-- editor -->
      <div class="flex min-w-0 flex-1 flex-col">
        <div class="flex shrink-0 overflow-x-auto border-b border-panel-foreground/10 bg-panel-2">
          <div
            v-for="tab in openTabs"
            :key="tab"
            class="flex min-h-11 shrink-0 items-center border-r border-t-2 border-panel-foreground/10"
            :class="activeTab === tab ? 'border-t-mint bg-panel' : 'text-panel-foreground/60 hover:text-panel-foreground'"
          >
            <button
              type="button"
              class="flex min-h-11 items-center gap-2 px-3.5 py-2 font-mono text-xs"
              :aria-current="activeTab === tab ? 'true' : undefined"
              @click="selectTab(tab)"
            >
              <UiAppIcon
                :icon="TAB_ICONS[tab]"
                class="size-3.5"
                :class="activeTab === tab ? 'text-accent-on-panel' : 'text-panel-foreground/60'"
              />
              {{ tabLabel(tab) }}
            </button>
            <button
              v-if="tab !== 'terminal'"
              type="button"
              class="flex size-11 items-center justify-center pr-1 text-panel-foreground/60 hover:text-panel-foreground"
              :aria-label="$t('explorer.close', { tab: tabLabel(tab) })"
              @click="closeTab(tab)"
            >
              <UiAppIcon icon="lucide:x" class="size-3" />
            </button>
          </div>
        </div>

        <div
          v-if="activeTab === 'profile.json'"
          class="min-h-0 flex-1 overflow-auto py-8 pl-4 [contain:paint] font-mono text-[clamp(0.7812rem,1vw,0.9375rem)] leading-[2.05] md:pl-6"
        >
          <div
            v-for="(line, i) in renderLines"
            v-show="line.isStarted"
            :key="i"
            class="w-max whitespace-pre"
          >
            <span class="mr-5 inline-block w-6 text-right text-panel-foreground/60">{{
              i + 1
            }}</span>
            <template v-for="(token, ti) in line.tokens" :key="ti">
              <span v-if="isIndent(token)" class="text-panel-foreground/20">{{
                asDots(token.text)
              }}</span>
              <a
                v-else-if="token.href"
                :href="token.href"
                target="_blank"
                rel="noopener noreferrer"
                :class="token.class ?? 'text-panel-foreground/60'"
                class="underline decoration-dotted underline-offset-2 hover:text-accent-on-panel"
                >{{ token.text }}<span class="sr-only">{{ $t('a11y.newWindow') }}</span></a>
              <span v-else :class="token.class ?? 'text-panel-foreground/60'">{{
                token.text
              }}</span>
            </template>
            <span v-if="!line.isDone" class="animate-blink text-panel-foreground">▎</span>
            <template v-else>
              <span
                v-if="line.statusDot"
                class="ml-2.5 inline-block size-2 animate-pulse-dot rounded-full bg-highlight align-middle"
              />
              <span v-if="line.cursor" class="animate-blink text-panel-foreground"> ▎</span>
              <span class="ml-1 text-panel-foreground/15">¬</span>
            </template>
          </div>
        </div>

        <div
          v-else-if="activeTab !== 'terminal'"
          class="min-h-0 flex-1 overflow-auto py-8 pl-4 [contain:paint] font-mono text-[clamp(0.7812rem,1vw,0.9375rem)] leading-[2.05] md:pl-6"
        >
          <div v-for="(line, i) in fileRenderLines" v-show="line.started" :key="i" class="flex">
            <span class="mr-5 inline-block w-6 shrink-0 text-right text-panel-foreground/60">{{ i + 1 }}</span>
            <span class="min-w-0 whitespace-pre-wrap text-panel-foreground/80"><span
                v-for="(token, ti) in line.tokens"
                :key="ti"
                :class="token.class"
                >{{ token.dots ? asDots(token.text) : token.text }}</span></span>
            <span v-if="line.done" class="ml-1 text-panel-foreground/15">¬</span>
            <span v-if="line.started && !line.done" class="animate-blink text-panel-foreground">▎</span>
          </div>
        </div>
        <div v-else class="flex min-h-0 flex-1 flex-col font-mono text-xs">
          <div ref="terminalScrollRef" class="flex-1 space-y-1 overflow-y-auto px-4 py-3 md:px-6">
            <div
              v-for="(line, i) in terminalLines"
              :key="i"
              :class="line.isInput ? 'text-accent-on-panel' : 'text-panel-foreground/70'"
              :style="line.color ? { color: line.color } : undefined"
              class="whitespace-pre-wrap"
            >
              {{ line.text }}
            </div>
          </div>
          <form
            class="flex shrink-0 items-center gap-2 border-t border-panel-foreground/10 px-4 py-2.5 md:px-6"
            @submit.prevent="runTerminalCommand(terminalCommand)"
          >
            <span class="text-accent-on-panel">$</span>
            <input
              ref="terminalInputRef"
              v-model="terminalCommand"
              type="text"
              autocomplete="off"
              spellcheck="false"
              :placeholder="TERMINAL_COMMANDS.join(' · ')"
              :aria-label="$t('a11y.terminalInput')"
              class="min-w-0 flex-1 bg-transparent text-panel-foreground caret-mint placeholder:text-panel-foreground/60"
            />
            <span class="animate-blink text-panel-foreground">▎</span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
