<script setup lang="ts">
import { BOOKING_URL, CONTACT_EMAIL } from '~/constants/contact'
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const { data: projects } = await useProjects()

// Client work shown here may be confidential - kept out of search results
// even though the rest of the site is now indexed.
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

useSeoMeta({
  title: () => `${t('projectsPage.title')} - Maxime Jolivet`,
  description: () =>
    `${t('projectsPage.subtitle')} ${t('projectsPage.subtitleSectors')}. `
    + `${t('projectsPage.subtitleClosing')} ${t('projectsPage.subtitlePersonal')}`,
})

const PAGE_SIZE = 9

function updateQuery(patch: Record<string, string | undefined>) {
  const merged = { ...(route.query as Record<string, string>), ...patch }
  const query = Object.fromEntries(
    Object.entries(merged).filter(([, value]) => value !== undefined),
  )
  router.push({ query })
}

const categoryFilter = computed<'all' | 'pro' | 'personal'>({
  get: () =>
    route.query.category === 'pro' || route.query.category === 'personal'
      ? route.query.category
      : 'all',
  set: (value) => updateQuery({ category: value === 'all' ? undefined : value, page: undefined }),
})

const employerFilter = computed<string>({
  get: () => (typeof route.query.employer === 'string' ? route.query.employer : 'all'),
  set: (value) => updateQuery({ employer: value === 'all' ? undefined : value, page: undefined }),
})

const yearFilter = computed<string>({
  get: () => (typeof route.query.year === 'string' ? route.query.year : 'all'),
  set: (value) => updateQuery({ year: value === 'all' ? undefined : value, page: undefined }),
})

const years = computed(() =>
  Array.from(new Set(projects.value.map((p) => p.year).filter(Boolean))).sort((a, b) =>
    b.localeCompare(a),
  ),
)

// Selected technologies, stored in the URL as ?tech=php,drupal (a single ?tech=id still works).
const selectedTechs = computed<string[]>(() =>
  typeof route.query.tech === 'string' ? route.query.tech.split(',').filter(Boolean) : [],
)

function setSelectedTechs(next: string[]) {
  updateQuery({ tech: next.length ? next.join(',') : undefined, page: undefined })
}

function toggleTech(id: string, checked: boolean) {
  const next = checked ? [...selectedTechs.value, id] : selectedTechs.value.filter((t) => t !== id)
  setSelectedTechs(Array.from(new Set(next)))
}

// Escape closes the technology list and gives focus back to its toggle button.
const techMenu = ref<HTMLDetailsElement | null>(null)

function closeTechMenu() {
  if (!techMenu.value?.open) return
  techMenu.value.open = false
  techMenu.value.querySelector('summary')?.focus()
}

// Technologies that appear on at least one project, in catalogue order.
const techOptions = computed(() => {
  const seen = new Map<string, { id: string, name: string, count: number }>()
  for (const category of TECH_CATEGORIES) {
    for (const item of category.items) {
      if (seen.has(item.id)) continue
      const count = projectsForTech(item.id, projects.value).length
      if (count > 0) seen.set(item.id, { id: item.id, name: item.name, count })
    }
  }
  return Array.from(seen.values())
})

function techName(id: string): string {
  for (const category of TECH_CATEGORIES) {
    const item = category.items.find((i) => i.id === id)
    if (item) return item.name
  }
  return id
}

// One removable tag per selected technology.
const selectedTechItems = computed(() =>
  selectedTechs.value.map((id) => ({ id, name: techName(id) })),
)

function removeTech(id: string) {
  setSelectedTechs(selectedTechs.value.filter((t) => t !== id))
}

function setViewMode(value: 'grid' | 'list') {
  const apply = () => updateQuery({ view: value === 'list' ? undefined : value })
  if (document.startViewTransition) document.startViewTransition(apply)
  else apply()
}

const viewMode = computed<'grid' | 'list'>(() => (route.query.view === 'grid' ? 'grid' : 'list'))

const employers = computed(() =>
  Array.from(new Set(projects.value.map((p) => p.employer).filter((e): e is string => Boolean(e)))),
)

const filteredProjects = computed(() => {
  const techMatches = selectedTechs.value.length
    ? new Set(selectedTechs.value.flatMap((id) => projectsForTech(id, projects.value)))
    : null

  return projects.value
    .filter((p) => {
      if (categoryFilter.value !== 'all' && p.category !== categoryFilter.value) return false
      if (employerFilter.value !== 'all' && p.employer !== employerFilter.value) return false
      if (yearFilter.value !== 'all' && p.year !== yearFilter.value) return false
      if (techMatches && !techMatches.has(p)) return false
      return true
    })
    .sort((a, b) => b.year.localeCompare(a.year))
    .map((p) => localizeProject(p, locale.value))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProjects.value.length / PAGE_SIZE)))

const currentPage = computed<number>({
  get: () => {
    const page = Number(route.query.page)
    return Number.isFinite(page) && page > 0 ? page : 1
  },
  set: (value) => updateQuery({ page: value > 1 ? String(value) : undefined }),
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProjects.value.slice(start, start + PAGE_SIZE)
})

const resultsAnchor = ref<HTMLElement | null>(null)

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  currentPage.value = page
  nextTick(() => {
    resultsAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

const pageItems = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const items: Array<number | 'ellipsis'> = []
  for (let page = 1; page <= total; page++) {
    if (page === 1 || page === total || Math.abs(page - current) <= 1) {
      items.push(page)
    }
    else if (items[items.length - 1] !== 'ellipsis') {
      items.push('ellipsis')
    }
  }
  return items
})
</script>

<template>
  <div>
    <SectionsPageIntro :eyebrow="$t('projectsPage.eyebrow')" :title="$t('projectsPage.title')">
      <template #subtitle>
        {{ $t('projectsPage.subtitle') }}
        <strong class="font-bold text-foreground">{{ $t('projectsPage.subtitleSectors') }}</strong>. <br /><br />
        {{ $t('projectsPage.subtitleClosing') }}
        <br /><br />
        {{ $t('projectsPage.subtitlePersonal') }}
      </template>
    </SectionsPageIntro>

    <SectionsClientsSection />

    <LayoutPageSection bare>
      <UiContainer class="flex flex-col gap-8 mt-12">
        <div ref="resultsAnchor" class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <UiButton
              size="pill-md" class="min-h-11"
              :variant="categoryFilter === 'all' ? 'pill' : 'pill-outline'"
              @click="categoryFilter = 'all'"
            >
              {{ $t('projectsPage.filterAll') }}
            </UiButton>
            <UiButton
              size="pill-md" class="min-h-11"
              :variant="categoryFilter === 'pro' ? 'pill' : 'pill-outline'"
              @click="categoryFilter = 'pro'"
            >
              {{ $t('projectsPage.categoryPro') }}
            </UiButton>
            <UiButton
              size="pill-md" class="min-h-11"
              :variant="categoryFilter === 'personal' ? 'pill' : 'pill-outline'"
              @click="categoryFilter = 'personal'"
            >
              {{ $t('projectsPage.categoryPersonal') }}
            </UiButton>

            <span class="mx-1 h-5 w-px bg-border" />

            <UiButton
              size="pill-md" class="min-h-11"
              :variant="employerFilter === 'all' ? 'pill' : 'pill-outline'"
              @click="employerFilter = 'all'"
            >
              {{ $t('projectsPage.filterAll') }}
            </UiButton>
            <UiButton
              v-for="employer in employers"
              :key="employer"
              size="pill-md" class="min-h-11"
              :variant="employerFilter === employer ? 'pill' : 'pill-outline'"
              @click="employerFilter = employer"
            >
              {{ employer }}
            </UiButton>

            <span class="mx-1 h-5 w-px bg-border" />

            <details ref="techMenu" class="group relative" @keydown.esc="closeTechMenu">
              <summary
                class="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border py-0 pl-4 pr-3.5 font-mono text-xs font-semibold transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                :class="
                  selectedTechs.length
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground hover:border-accent hover:text-accent-text'
                "
              >
                {{ selectedTechs.length ? $t('projectsPage.filterTechCount', { count: selectedTechs.length }) : $t('projectsPage.filterAllTechs') }}
                <UiAppIcon
                  icon="lucide:chevron-down"
                  class="size-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div class="absolute left-0 z-20 mt-2 flex max-h-72 w-64 flex-col gap-1 overflow-y-auto rounded-2xl border border-border bg-background p-3 shadow-lg">
                <!-- The native checkbox covers the whole row (44px high), so the target is not 16px.
                     Its visual is drawn by the sibling span; the input keeps focus and the label. -->
                <label
                  v-for="option in techOptions"
                  :key="option.id"
                  class="relative flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 font-sans text-sm text-foreground hover:bg-muted/40 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foreground"
                >
                  <input
                    type="checkbox"
                    class="peer absolute inset-0 size-full cursor-pointer opacity-0"
                    :checked="selectedTechs.includes(option.id)"
                    @keydown.enter.prevent="($event.target as HTMLInputElement).click()"
                    @change="toggleTech(option.id, ($event.target as HTMLInputElement).checked)"
                  >
                  <span
                    aria-hidden="true"
                    class="flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-border bg-card text-primary-foreground peer-checked:border-primary peer-checked:bg-primary"
                  >
                    <UiAppIcon v-if="selectedTechs.includes(option.id)" icon="lucide:check" class="size-3.5" />
                  </span>
                  <span class="flex-1">{{ option.name }}</span>
                  <span class="font-mono text-xs text-muted-foreground">{{ option.count }}</span>
                </label>
              </div>
            </details>

            <div class="relative inline-flex">
              <select
                v-model="yearFilter"
                :aria-label="$t('projectsPage.filterYear')"
                :class="[
                  'h-11 cursor-pointer appearance-none rounded-full border py-0 pl-4 pr-10 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground',
                  yearFilter === 'all'
                    ? 'border-border bg-transparent text-foreground hover:border-accent hover:text-accent-text'
                    : 'border-primary bg-primary text-primary-foreground',
                ]"
              >
                <option value="all" class="bg-background text-foreground">{{ $t('projectsPage.filterAllYears') }}</option>
                <option v-for="year in years" :key="year" :value="year" class="bg-background text-foreground">{{ year }}</option>
              </select>
              <UiAppIcon
                icon="lucide:chevron-down"
                class="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2"
              />
            </div>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              type="button"
              :aria-label="$t('projectsPage.viewList')"
              class="flex size-11 items-center justify-center rounded-full border border-border transition-colors cursor-pointer"
              :class="
                viewMode === 'list'
                  ? 'border-accent text-accent-text'
                  : 'text-muted-foreground hover:text-accent-text'
              "
              @click="setViewMode('list')"
            >
              <UiAppIcon icon="lucide:list" class="size-5" />
            </button>
            <button
              type="button"
              :aria-label="$t('projectsPage.viewGrid')"
              class="flex size-11 items-center justify-center rounded-full border border-border transition-colors cursor-pointer"
              :class="
                viewMode === 'grid'
                  ? 'border-accent text-accent-text'
                  : 'text-muted-foreground hover:text-accent-text'
              "
              @click="setViewMode('grid')"
            >
              <UiAppIcon icon="lucide:layout-grid" class="size-5" />
            </button>
          </div>
        </div>

        <div v-if="selectedTechItems.length" class="-mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{{ $t('projectsPage.techFilterLabel') }}</span>
          <button
            v-for="tech in selectedTechItems"
            :key="tech.id"
            type="button"
            class="flex min-h-11 items-center gap-1.5 rounded-full border border-border px-3 text-foreground transition-colors hover:border-accent hover:text-accent-text"
            :aria-label="$t('projectsPage.removeTechFilter', { tech: tech.name })"
            @click="removeTech(tech.id)"
          >
            {{ tech.name }}
            <UiAppIcon icon="lucide:x" class="size-3.5" aria-hidden="true" />
          </button>
          <button
            v-if="selectedTechItems.length > 1"
            type="button"
            class="flex min-h-11 items-center px-2 underline underline-offset-4 hover:text-accent-text"
            @click="setSelectedTechs([])"
          >
            {{ $t('projectsPage.clearAllTechFilters') }}
          </button>
        </div>

        <div v-if="viewMode === 'list'" class="flex flex-col gap-4">
          <CardsProjectCard
            v-for="project in paginatedProjects"
            :key="project.id"
            :project="project"
          />
        </div>
        <div v-else class="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <CardsProjectGridCard
            v-for="project in paginatedProjects"
            :key="project.id"
            :project="project"
          />
        </div>

        <nav
          v-if="totalPages > 1"
          class="flex flex-wrap items-center justify-center gap-2"
          :aria-label="$t('projectsPage.pagination')"
        >
          <button
            type="button"
            :disabled="currentPage === 1"
            class="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-accent-text disabled:pointer-events-none disabled:opacity-40"
            :aria-label="$t('projectDetail.prev')"
            @click="goToPage(currentPage - 1)"
          >
            <UiAppIcon icon="lucide:arrow-left" class="size-4" />
          </button>

          <template v-for="item in pageItems" :key="item">
            <span v-if="item === 'ellipsis'" class="px-1 font-mono text-xs text-subtle">…</span>
            <button
              v-else
              type="button"
              class="flex size-11 items-center justify-center rounded-full border font-mono text-xs transition-colors"
              :class="
                item === currentPage
                  ? 'border-accent text-accent-text'
                  : 'border-border text-foreground hover:text-accent-text'
              "
              :aria-current="item === currentPage ? 'page' : undefined"
              :aria-label="`${$t('projectsPage.pageLabel')} ${item}`"
              @click="goToPage(item)"
            >
              {{ item }}
            </button>
          </template>

          <button
            type="button"
            :disabled="currentPage === totalPages"
            class="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-accent-text disabled:pointer-events-none disabled:opacity-40"
            :aria-label="$t('projectDetail.next')"
            @click="goToPage(currentPage + 1)"
          >
            <UiAppIcon icon="lucide:arrow-right" class="size-4" />
          </button>
        </nav>
      </UiContainer>
    </LayoutPageSection>

    <LayoutPageSection bare>
      <UiContainer>
        <section class="flex flex-col items-center gap-4 py-20 text-center">
          <h2
            class="font-sans text-[2.125rem] font-bold leading-[1.1] tracking-[-1px] text-foreground"
          >
            {{ $t('projectsPage.ctaTitle') }}<span class="text-accent-text"> ?</span>
          </h2>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <UiButton :href="`mailto:${CONTACT_EMAIL}`">
              {{ CONTACT_EMAIL }}
            </UiButton>
            <UiButton :href="BOOKING_URL" variant="pill-outline" icon="lucide:external-link">
              {{ $t('home.contact.bookCall') }}
            </UiButton>
          </div>
        </section>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
