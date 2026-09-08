<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = Array.isArray(route.params.slug) ? (route.params.slug[0] ?? '') : route.params.slug

// Client work shown here may be confidential - kept out of search results
// even though the rest of the site is now indexed.
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const { data: row, pending, error, status } = await useProject(slug)
const { data: allRows } = await useProjects()

const project = computed(() => (row.value ? localizeProject(row.value, locale.value) : null))

const hasCaseStudy = computed(() =>
  Boolean(project.value?.contexte || project.value?.solution || project.value?.points.length),
)

const specSheet = computed(() => {
  if (!project.value) return []
  return [
    { label: t('projectDetail.year'), value: project.value.year },
    { label: t('projectDetail.role'), value: project.value.role },
    { label: t('projectDetail.duration'), value: project.value.duree },
    { label: t('projectDetail.team'), value: project.value.equipe },
  ].filter((item) => item.value)
})

const orderedProjects = computed(() =>
  [...allRows.value]
    .sort((a, b) => b.year.localeCompare(a.year))
    .map((p) => localizeProject(p, locale.value)),
)

const currentIndex = computed(() => orderedProjects.value.findIndex((p) => p.slug === slug))

const prevProject = computed(() => {
  const i = currentIndex.value
  return i > 0 ? orderedProjects.value[i - 1] : null
})

const nextProject = computed(() => {
  const i = currentIndex.value
  return i >= 0 && i < orderedProjects.value.length - 1 ? orderedProjects.value[i + 1] : null
})

watch(
  status,
  () => {
    if (status.value === 'success' && !row.value) {
      showError(createError({ statusCode: 404, statusMessage: t('blog.not_found') }))
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: () => `${project.value ? project.value.title : t('projectsPage.title')} - Maxime Jolivet`,
  ogTitle: () => project.value?.title ?? t('projectsPage.title'),
  description: () => project.value?.tagline ?? t('projectsPage.subtitle'),
  ogImage: () => project.value?.image ?? undefined,
})
</script>

<template>
  <div>
    <LayoutPageSection bare>
      <UiContainer class="max-w-[880px]">
        <div class="py-8">
          <NuxtLink
            :to="localePath('projects')"
            class="inline-flex items-center gap-1 font-mono text-xs font-semibold text-muted-foreground hover:text-accent"
          >
            <UiAppIcon icon="lucide:arrow-left" class="size-3" />{{ $t('projectsPage.backToList') }}
          </NuxtLink>
        </div>

        <div v-if="pending" class="flex flex-col gap-5 pb-20">
          <UiSkeleton class="h-3 w-32" />
          <UiSkeleton class="mt-3 h-10 w-4/5" />
          <UiSkeleton class="mt-10 h-64 w-full rounded-2xl" />
          <UiSkeleton class="mt-10 h-4 w-full" />
          <UiSkeleton class="h-4 w-full" />
          <UiSkeleton class="h-4 w-2/3" />
        </div>
        <UiEmptyState v-else-if="error" icon="lucide:wifi-off" :message="$t('blog.error')" />

        <template v-else-if="project">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <span class="flex flex-wrap items-center gap-2.5 font-mono text-[0.7812rem] text-subtle">
              {{ project.year }} · {{ project.type
              }}<template v-if="project.company"> · {{ project.company }}</template>
            </span>
            <UiBadge
              :class="
                project.category === 'pro' ? 'bg-primary/16 text-primary' : 'bg-mint/16 text-mint'
              "
            >
              {{
                project.category === 'pro'
                  ? $t('projectsPage.categoryPro')
                  : $t('projectsPage.categoryPersonal')
              }}
            </UiBadge>
          </div>

          <h1
            class="mt-3 text-balance font-sans text-[clamp(2.125rem,4.2vw,3.125rem)] font-bold leading-[1.1] tracking-[-1px] text-foreground"
          >
            {{ project.title }}
          </h1>

          <p
            v-if="project.tagline"
            class="mt-3 text-pretty font-sans text-base leading-[1.6] text-muted-foreground"
          >
            {{ project.tagline }}
          </p>

          <div
            :style="{ viewTransitionName: `project-${project.id}` }"
            class="mt-10"
          >
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="w-full rounded-2xl border border-border object-cover"
            />
            <CardsProjectLogoPlate
              v-else-if="project.logo"
              :logo="project.logo"
              :logo-color="project.logoColor ?? '#1d3540'"
              :alt="project.title"
              class="aspect-video w-full"
            />
          </div>

          <a
            v-if="project.websiteUrl"
            :href="project.websiteUrl"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="mt-6 inline-flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:text-primary"
          >
            {{ $t('projectsPage.viewProject') }}
            <UiAppIcon icon="lucide:external-link" class="size-3.5 shrink-0" />
          </a>

          <div v-if="specSheet.length" class="mt-10 rounded-2xl border border-border p-6">
            <p class="mb-4 font-mono text-xs font-bold tracking-[1.5px] text-subtle">
              {{ $t('projectDetail.specSheet').toUpperCase() }}
            </p>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div v-for="item in specSheet" :key="item.label" class="flex flex-col gap-1">
                <span class="font-sans text-sm font-semibold text-foreground">{{ item.value }}</span>
                <span class="font-mono text-[0.6875rem] text-subtle">{{ item.label }}</span>
              </div>
            </div>
          </div>

          <div v-if="hasCaseStudy" class="mt-10 flex flex-col gap-10 pb-16">
            <div v-if="project.contexte" class="flex flex-col gap-2">
              <h2 class="font-sans text-lg font-bold text-foreground">
                {{ $t('projectDetail.context') }}
              </h2>
              <div
                class="text-pretty font-sans text-[1rem] leading-[1.8] text-muted-foreground [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:mb-4 [&>ul]:flex [&>ul]:list-disc [&>ul]:flex-col [&>ul]:gap-1.5 [&>ul]:pl-5 [&_a]:text-accent [&_a]:underline [&_strong]:font-semibold [&_strong]:text-foreground"
                v-html="project.contexte"
              />
            </div>

            <div v-if="project.solution || project.points.length" class="flex flex-col gap-2">
              <h2 class="font-sans text-lg font-bold text-foreground">
                {{ $t('projectDetail.solution') }}
              </h2>
              <div
                v-if="project.solution"
                class="text-pretty font-sans text-[1rem] leading-[1.8] text-muted-foreground [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:mb-4 [&>ul]:flex [&>ul]:list-disc [&>ul]:flex-col [&>ul]:gap-1.5 [&>ul]:pl-5 [&_a]:text-accent [&_a]:underline [&_strong]:font-semibold [&_strong]:text-foreground"
                v-html="project.solution"
              />
              <ul
                v-if="project.points.length"
                class="mt-2 flex list-disc flex-col gap-1.5 pl-5 font-sans text-[0.9375rem] leading-[1.7] text-muted-foreground"
              >
                <li v-for="point in project.points" :key="point" v-html="point" />
              </ul>
            </div>

            <div v-if="project.resultat" class="flex flex-col gap-2">
              <h2 class="font-sans text-lg font-bold text-foreground">
                {{ $t('projectDetail.result') }}
              </h2>
              <div
                class="text-pretty font-sans text-[1rem] leading-[1.8] text-muted-foreground [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:mb-4 [&>ul]:flex [&>ul]:list-disc [&>ul]:flex-col [&>ul]:gap-1.5 [&>ul]:pl-5 [&_a]:text-accent [&_a]:underline [&_strong]:font-semibold [&_strong]:text-foreground"
                v-html="project.resultat"
              />
            </div>
          </div>
          <UiEmptyState
            v-else
            icon="lucide:hammer"
            :message="$t('projectsPage.underConstructionNote')"
            class="mt-10 pb-16"
          />

          <div v-if="project.tags.length" class="flex flex-wrap gap-2 pb-16">
            <UiBadge v-for="tag in project.tags" :key="tag" class="bg-mint/16">
              {{ tag }}
            </UiBadge>
          </div>

          <nav
            v-if="prevProject || nextProject"
            class="flex items-center justify-between gap-4 border-t border-border py-8"
          >
            <NuxtLink
              v-if="prevProject"
              :to="localePath({ name: 'projects-slug', params: { slug: prevProject.slug } })"
              class="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground hover:text-accent"
            >
              <UiAppIcon icon="lucide:arrow-left" class="size-3" />
              {{ $t('projectDetail.prev') }}
            </NuxtLink>
            <span v-else />

            <NuxtLink
              v-if="nextProject"
              :to="localePath({ name: 'projects-slug', params: { slug: nextProject.slug } })"
              class="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground hover:text-accent"
            >
              {{ $t('projectDetail.next') }}
              <UiAppIcon icon="lucide:arrow-right" class="size-3" />
            </NuxtLink>
          </nav>
        </template>
      </UiContainer>
    </LayoutPageSection>

    <LayoutPageSection v-if="project" bare>
      <UiContainer>
        <section class="flex flex-col items-center gap-4 py-20 text-center">
          <h2 class="font-sans text-[2.125rem] font-bold leading-[1.1] tracking-[-1px] text-foreground">
            {{ $t('projectsPage.ctaTitle') }}<span class="text-accent"> ?</span>
          </h2>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <UiButton :href="`mailto:${CONTACT_EMAIL}`">
              {{ CONTACT_EMAIL }}
            </UiButton>
          </div>
        </section>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
