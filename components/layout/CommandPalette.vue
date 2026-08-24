<script setup lang="ts">
interface Command {
  id: string
  label: string
  group: 'nav' | 'action'
  icon: string
  keywords?: string
  run: () => void
}

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { theme, toggleTheme } = useThemeMode()

const open = ref(false)
const query = ref('')
const activeIndex = ref(0)
const isMac = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const shortcutKeys = computed(() => (isMac.value ? ['⇧', '⌘', 'P'] : ['Ctrl', 'Shift', 'P']))

function close() {
  open.value = false
  query.value = ''
  activeIndex.value = 0
}

function show() {
  open.value = true
  nextTick(() => inputRef.value?.focus())
}

function toggle() {
  if (open.value) close()
  else show()
}

function goTo(path: string, hash?: string) {
  navigateTo(hash ? { path, hash } : path)
  close()
}

function goHome(hash?: string) {
  goTo(localePath('/'), hash)
}

const commands = computed<Command[]>(() => [
  { id: 'home', group: 'nav', icon: 'lucide:home', label: t('nav.home'), run: () => goHome() },
  {
    id: 'ide',
    group: 'nav',
    icon: 'lucide:terminal',
    label: t('commandPalette.ide'),
    run: () => goHome('#ide'),
  },
  {
    id: 'about',
    group: 'nav',
    icon: 'lucide:user-round',
    label: t('aboutSection.eyebrow'),
    run: () => goHome('#about'),
  },
  {
    id: 'tech',
    group: 'nav',
    icon: 'lucide:cpu',
    label: t('techSection.eyebrow'),
    run: () => goHome('#tech'),
  },
  {
    id: 'experience',
    group: 'nav',
    icon: 'lucide:briefcase',
    label: t('experienceSection.eyebrow'),
    run: () => goHome('#experience'),
  },
  {
    id: 'now',
    group: 'nav',
    icon: 'lucide:radio',
    label: t('home.now.sectionTitle'),
    run: () => goHome('#now'),
  },
  {
    id: 'projects',
    group: 'nav',
    icon: 'lucide:folder-kanban',
    label: t('nav.projects'),
    run: () => goTo(localePath('projects')),
  },
  {
    id: 'blog',
    group: 'nav',
    icon: 'lucide:notebook-pen',
    label: t('nav.blog'),
    run: () => goTo(localePath('/blog')),
  },
  {
    id: 'cv',
    group: 'nav',
    icon: 'lucide:file-text',
    label: t('cv.read'),
    run: () => goTo(localePath('/cv')),
  },
  {
    id: 'contact',
    group: 'nav',
    icon: 'lucide:mail',
    label: t('nav.contact'),
    run: () => goHome('#contact'),
  },
  {
    id: 'theme',
    group: 'action',
    icon: theme.value === 'night' ? 'lucide:sun' : 'lucide:moon',
    label: t('commandPalette.toggleTheme'),
    run: () => {
      toggleTheme()
      close()
    },
  },
  {
    id: 'locale',
    group: 'action',
    icon: 'lucide:languages',
    label:
      locale.value === 'fr'
        ? t('commandPalette.switchToEnglish')
        : t('commandPalette.switchToFrench'),
    keywords: 'language langue',
    run: () => goTo(switchLocalePath(locale.value === 'fr' ? 'en' : 'fr')),
  },
])

const filteredCommands = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands.value
  return commands.value.filter((c) => `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q))
})

const navCommands = computed(() => filteredCommands.value.filter((c) => c.group === 'nav'))
const actionCommands = computed(() => filteredCommands.value.filter((c) => c.group === 'action'))

watch(query, () => {
  activeIndex.value = 0
})

function runActive() {
  filteredCommands.value[activeIndex.value]?.run()
}

function moveActive(delta: number) {
  const count = filteredCommands.value.length
  if (!count) return
  activeIndex.value = (activeIndex.value + delta + count) % count
}

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
    e.preventDefault()
    toggle()
  }
}

onMounted(() => {
  isMac.value = navigator.platform.toLowerCase().includes('mac')
  if (window.matchMedia('(min-width: 1460px)').matches) {
    window.addEventListener('keydown', onGlobalKeydown)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
})
</script>

<template>
  <button
    type="button"
    :aria-label="t('commandPalette.toggle')"
    class="fixed bottom-5 left-5 z-40 hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 font-mono text-xs text-muted-foreground opacity-40 transition-opacity hover:text-accent hover:opacity-100 min-[1460px]:flex"
    @click="show"
  >
    <UiAppIcon icon="lucide:command" class="size-3.5" />
    <span class="flex items-center gap-0.5">
      <kbd
        v-for="key in shortcutKeys"
        :key="key"
        class="rounded border border-current/25 bg-current/5 px-1 py-px text-[0.65rem] font-semibold leading-tight"
        >{{ key }}</kbd
      >
    </span>
  </button>

  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm sm:pt-32"
    @click.self="close"
  >
    <div
      class="flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-panel-foreground/10 bg-panel-2 font-mono text-sm text-panel-foreground shadow-2xl"
    >
      <div class="flex items-center gap-2 border-b border-panel-foreground/10 px-4 py-3">
        <UiAppIcon icon="lucide:search" class="size-4 shrink-0 text-panel-foreground/40" />
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          autocomplete="off"
          spellcheck="false"
          :placeholder="t('commandPalette.placeholder')"
          class="min-w-0 flex-1 bg-transparent text-panel-foreground placeholder:text-panel-foreground/35 focus:outline-none"
          @keydown.down.prevent="moveActive(1)"
          @keydown.up.prevent="moveActive(-1)"
          @keydown.enter.prevent="runActive"
          @keydown.esc="close"
        />
        <kbd
          class="rounded border border-panel-foreground/15 px-1.5 py-0.5 text-[0.65rem] text-panel-foreground/40"
          >esc</kbd
        >
      </div>

      <div class="max-h-80 overflow-y-auto p-2">
        <template v-if="filteredCommands.length">
          <div
            v-if="navCommands.length"
            class="px-2 pb-1 pt-2 text-[0.6875rem] font-bold tracking-[1.5px] text-panel-foreground/35"
          >
            {{ t('commandPalette.groupNavigation') }}
          </div>
          <button
            v-for="cmd in navCommands"
            :key="cmd.id"
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
            :class="
              filteredCommands[activeIndex]?.id === cmd.id
                ? 'bg-panel-foreground/10 text-mint'
                : 'text-panel-foreground/70 hover:bg-panel-foreground/5'
            "
            @mouseenter="activeIndex = filteredCommands.indexOf(cmd)"
            @click="cmd.run()"
          >
            <UiAppIcon :icon="cmd.icon" class="size-4 shrink-0" />
            {{ cmd.label }}
          </button>

          <div
            v-if="actionCommands.length"
            class="px-2 pb-1 pt-3 text-[0.6875rem] font-bold tracking-[1.5px] text-panel-foreground/35"
          >
            {{ t('commandPalette.groupActions') }}
          </div>
          <button
            v-for="cmd in actionCommands"
            :key="cmd.id"
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
            :class="
              filteredCommands[activeIndex]?.id === cmd.id
                ? 'bg-panel-foreground/10 text-mint'
                : 'text-panel-foreground/70 hover:bg-panel-foreground/5'
            "
            @mouseenter="activeIndex = filteredCommands.indexOf(cmd)"
            @click="cmd.run()"
          >
            <UiAppIcon :icon="cmd.icon" class="size-4 shrink-0" />
            {{ cmd.label }}
          </button>
        </template>
        <div v-else class="px-3 py-6 text-center text-panel-foreground/40">
          {{ t('commandPalette.noResults') }}
        </div>
      </div>
    </div>
  </div>
</template>
