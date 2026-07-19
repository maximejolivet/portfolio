<script setup lang="ts">
import { CAL_LINK, CAL_NAMESPACE, CONTACT_EMAIL } from '~/constants/contact'
import { CASE_STUDIES } from '~/constants/projects'

const { t } = useI18n()

useSeoMeta({
  title: () => `${t('projectsPage.title')} - Maxime Jolivet`,
  description: () =>
    `${t('projectsPage.subtitle')} ${t('projectsPage.subtitleSectors')}. `
    + `${t('projectsPage.subtitleClosing')} ${t('projectsPage.subtitlePersonal')}`,
})

const PAGE_SIZE = 3

const categoryFilter = ref<'all' | 'pro' | 'personal'>('all')
const employerFilter = ref<string>('all')
const viewMode = ref<'grid' | 'list'>('list')
const currentPage = ref(1)

const employers = computed(() =>
  Array.from(new Set(CASE_STUDIES.map((p) => p.employer).filter((e): e is string => Boolean(e)))),
)

const filteredProjects = computed(() =>
  CASE_STUDIES.filter((p) => {
    if (categoryFilter.value !== 'all' && p.category !== categoryFilter.value) return false
    if (employerFilter.value !== 'all' && p.employer !== employerFilter.value) return false
    return true
  }).sort((a, b) => b.year.localeCompare(a.year)),
)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProjects.value.length / PAGE_SIZE)))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProjects.value.slice(start, start + PAGE_SIZE)
})

watch([categoryFilter, employerFilter], () => {
  currentPage.value = 1
})
</script>

<template>
  <div>
    <SectionsPageIntro :eyebrow="$t('projectsPage.eyebrow')" :title="$t('projectsPage.title')">
      <template #subtitle>
        {{ $t('projectsPage.subtitle') }}
        <strong class="font-bold text-foreground">{{ $t('projectsPage.subtitleSectors') }}</strong>.
        <br /><br />
        {{ $t('projectsPage.subtitleClosing') }}
        <br /><br />
        {{ $t('projectsPage.subtitlePersonal') }}
      </template>
    </SectionsPageIntro>

    <LayoutPageSection bare>
      <UiContainer class="flex flex-col gap-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <UiButton
              size="pill-md"
              :variant="categoryFilter === 'all' ? 'pill' : 'pill-outline'"
              @click="categoryFilter = 'all'"
            >
              {{ $t('projectsPage.filterAll') }}
            </UiButton>
            <UiButton
              size="pill-md"
              :variant="categoryFilter === 'pro' ? 'pill' : 'pill-outline'"
              @click="categoryFilter = 'pro'"
            >
              {{ $t('projectsPage.categoryPro') }}
            </UiButton>
            <UiButton
              size="pill-md"
              :variant="categoryFilter === 'personal' ? 'pill' : 'pill-outline'"
              @click="categoryFilter = 'personal'"
            >
              {{ $t('projectsPage.categoryPersonal') }}
            </UiButton>

            <span class="mx-1 h-5 w-px bg-border" />

            <UiButton
              size="pill-md"
              :variant="employerFilter === 'all' ? 'pill' : 'pill-outline'"
              @click="employerFilter = 'all'"
            >
              {{ $t('projectsPage.filterAll') }}
            </UiButton>
            <UiButton
              v-for="employer in employers"
              :key="employer"
              size="pill-md"
              :variant="employerFilter === employer ? 'pill' : 'pill-outline'"
              @click="employerFilter = employer"
            >
              {{ employer }}
            </UiButton>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              type="button"
              :aria-label="$t('projectsPage.viewList')"
              class="flex size-10 items-center justify-center rounded-full border border-border transition-colors cursor-pointer"
              :class="
                viewMode === 'list'
                  ? 'border-accent text-accent'
                  : 'text-muted-foreground hover:text-accent'
              "
              @click="viewMode = 'list'"
            >
              <UiAppIcon icon="lucide:list" class="size-5" />
            </button>
            <button
              type="button"
              :aria-label="$t('projectsPage.viewGrid')"
              class="flex size-10 items-center justify-center rounded-full border border-border transition-colors cursor-pointer"
              :class="
                viewMode === 'grid'
                  ? 'border-accent text-accent'
                  : 'text-muted-foreground hover:text-accent'
              "
              @click="viewMode = 'grid'"
            >
              <UiAppIcon icon="lucide:layout-grid" class="size-5" />
            </button>
          </div>
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

        <div v-if="totalPages > 1" class="flex items-center justify-center gap-4">
          <button
            type="button"
            :disabled="currentPage === 1"
            class="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-accent disabled:pointer-events-none disabled:opacity-40"
            :aria-label="$t('projectDetail.prev')"
            @click="currentPage--"
          >
            <UiAppIcon icon="lucide:arrow-left" class="size-4" />
          </button>
          <span class="font-mono text-xs text-subtle">{{ currentPage }} / {{ totalPages }}</span>
          <button
            type="button"
            :disabled="currentPage === totalPages"
            class="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-accent disabled:pointer-events-none disabled:opacity-40"
            :aria-label="$t('projectDetail.next')"
            @click="currentPage++"
          >
            <UiAppIcon icon="lucide:arrow-right" class="size-4" />
          </button>
        </div>
      </UiContainer>
    </LayoutPageSection>

    <SectionsClientsSection />

    <LayoutPageSection bare>
      <UiContainer>
        <section class="flex flex-col items-center gap-4 py-20 text-center">
          <h2
            class="font-sans text-[2.125rem] font-bold leading-[1.1] tracking-[-1px] text-foreground"
          >
            {{ $t('projectsPage.ctaTitle') }}<span class="text-accent"> ?</span>
          </h2>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <UiButton :href="`mailto:${CONTACT_EMAIL}`">
              {{ CONTACT_EMAIL }}
            </UiButton>
            <UiButton
              variant="pill-outline"
              icon="lucide:arrow-right"
              :data-cal-link="CAL_LINK"
              :data-cal-namespace="CAL_NAMESPACE"
              data-cal-config="{&quot;layout&quot;:&quot;month_view&quot;,&quot;useSlotsViewOnSmallScreen&quot;:&quot;true&quot;}"
            >
              {{ $t('home.contact.bookCall') }}
            </UiButton>
          </div>
        </section>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
