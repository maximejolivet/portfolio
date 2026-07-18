<script setup lang="ts">
import { CASE_STUDIES } from '~/constants/projects'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = computed(() => {
  const raw = route.params.slug
  return Array.isArray(raw) ? raw[0] : raw
})

const index = computed(() => CASE_STUDIES.findIndex((p) => p.slug === slug.value))

if (index.value === -1) {
  throw createError({ statusCode: 404, statusMessage: t('blog.not_found'), fatal: true })
}

const project = computed(() => CASE_STUDIES[index.value])
const dotClass = computed(() => (project.value.dot === 'mint' ? 'bg-mint' : 'bg-primary'))

const categoryLiveCaseStudies = computed(() =>
  CASE_STUDIES.filter((p) => p.live && p.category === project.value.category),
)
const liveIndex = computed(() => categoryLiveCaseStudies.value.findIndex((p) => p.slug === slug.value))
const hasAdjacentProjects = computed(() => project.value.live && categoryLiveCaseStudies.value.length > 1)
const prevProject = computed(() => {
  const list = categoryLiveCaseStudies.value
  return list[(liveIndex.value - 1 + list.length) % list.length]
})
const nextProject = computed(() => {
  const list = categoryLiveCaseStudies.value
  return list[(liveIndex.value + 1) % list.length]
})

useSeoMeta({
  title: () => `${t(project.value.titleKey)} - Maxime Jolivet`,
  description: () => t(project.value.taglineKey),
})
</script>

<template>
  <div>
    <LayoutPageSection bare>
      <UiContainer class="max-w-[1080px] pt-16">
        <NuxtLink
          :to="localePath('projects')"
          class="inline-flex items-center gap-1 font-mono text-xs font-semibold text-muted-foreground hover:text-accent"
        >
          <UiAppIcon icon="lucide:arrow-left" class="size-3" />{{ $t('projectsPage.backToList') }}
        </NuxtLink>
      </UiContainer>

      <UiContainer v-if="project.live" class="max-w-[1280px] pt-8">
        <div class="relative">
          <div class="absolute -right-3.5 -top-3.5 z-10 size-12 rounded-full" :class="dotClass" />
          <div
            v-if="project.image"
            class="overflow-hidden rounded-[28px] border border-border"
          >
            <NuxtImg :src="project.image" :alt="t(project.titleKey)" class="size-full object-cover" />
          </div>
          <UiImagePlaceholder
            v-else
            :label="$t('projectsPage.capturesPending')"
            class="h-[280px] rounded-[28px] sm:h-[420px] lg:h-[600px]"
          />
        </div>
      </UiContainer>

      <UiContainer class="max-w-[1080px]">
        <header class="flex flex-col gap-5 pb-12 pt-10">
          <span class="flex flex-wrap items-center gap-2.5 font-mono text-xs text-subtle">
            {{ project.year }} · {{ t(project.typeKey) }}<template v-if="project.company"> · {{ project.company }}</template>
            <UiBadge :class="project.category === 'pro' ? 'bg-primary/16 text-primary' : 'bg-mint/16 text-mint'">
              {{ project.category === 'pro' ? $t('projectsPage.categoryPro') : $t('projectsPage.categoryPersonal') }}
            </UiBadge>
          </span>

          <h1
            class="text-balance font-sans text-[clamp(2.375rem,4.7vw,3.625rem)] font-bold leading-[1.08] tracking-[-1.8px] text-foreground"
          >
            {{ t(project.titleKey) }}<span class="text-accent">.</span>
          </h1>

          <p class="max-w-[600px] text-pretty font-sans text-base leading-[1.7] text-muted-foreground">
            {{ t(project.taglineKey) }}
          </p>

          <div class="flex flex-wrap gap-2">
            <UiBadge v-for="tag in project.tags" :key="tag" class="bg-mint/16">
              {{ tag }}
            </UiBadge>
          </div>
        </header>

        <template v-if="project.live">
        <section class="grid items-start gap-16 pb-18 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div class="flex flex-col gap-11">
            <div class="flex flex-col gap-3.5">
              <h2 class="font-sans text-[1.5rem] font-bold tracking-[-0.5px] text-foreground">
                {{ $t('projectDetail.context') }}
              </h2>
              <p class="text-pretty font-sans text-[1rem] leading-[1.75] text-muted-foreground">
                {{ t(project.contexteKey) }}
              </p>
            </div>

            <div class="flex flex-col gap-3.5">
              <h2 class="font-sans text-[1.5rem] font-bold tracking-[-0.5px] text-foreground">
                {{ $t('projectDetail.solution') }}
              </h2>
              <p class="text-pretty font-sans text-[1rem] leading-[1.75] text-muted-foreground">
                {{ t(project.solutionKey) }}
              </p>
              <div class="mt-1.5 flex flex-col gap-2.5">
                <div
                  v-for="pointKey in project.pointsKeys"
                  :key="pointKey"
                  class="flex items-start gap-3 font-mono text-[0.9062rem] leading-[1.5] text-foreground"
                >
                  <UiAppIcon icon="lucide:arrow-right" class="mt-1.5 size-3.5 shrink-0 text-mint" />
                  <span>{{ t(pointKey) }}</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3.5">
              <h2 class="font-sans text-[1.5rem] font-bold tracking-[-0.5px] text-foreground">
                {{ $t('projectDetail.result') }}
              </h2>
              <p class="text-pretty font-sans text-[1rem] leading-[1.75] text-muted-foreground">
                {{ t(project.resultatKey) }}
              </p>
            </div>
          </div>

          <aside
            class="sticky top-[82px] flex flex-col gap-4.5 rounded-2xl bg-panel p-6 font-mono text-xs leading-[1.6] text-panel-foreground"
          >
            <div class="font-mono text-[0.7188rem] font-bold tracking-[1.5px] text-mint">
              {{ $t('projectDetail.specSheet') }}
            </div>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between gap-3">
                <span class="text-panel-foreground/50">{{ $t('projectDetail.year') }}</span>
                <span>{{ project.year }}</span>
              </div>
              <div class="flex justify-between gap-3">
                <span class="text-panel-foreground/50">{{ $t('projectDetail.role') }}</span>
                <span class="text-right">{{ t(project.roleKey) }}</span>
              </div>
              <div class="flex justify-between gap-3">
                <span class="text-panel-foreground/50">{{ $t('projectDetail.duration') }}</span>
                <span>{{ t(project.dureeKey) }}</span>
              </div>
              <div class="flex justify-between gap-3">
                <span class="text-panel-foreground/50">{{ $t('projectDetail.team') }}</span>
                <span class="text-right">{{ t(project.equipeKey) }}</span>
              </div>
            </div>
            <div class="h-px bg-panel-foreground/[0.18]" />
            <div class="flex items-baseline gap-2.5">
              <span class="size-2 shrink-0 -translate-y-px animate-pulse-dot rounded-full bg-mint" />
              <span class="text-mint">{{ t(project.impactKey) }}</span>
            </div>
          </aside>
        </section>

        <nav v-if="hasAdjacentProjects" class="flex justify-between gap-6 border-t border-border py-10">
          <NuxtLink
            :to="localePath({ name: 'projects-slug', params: { slug: prevProject.slug } })"
            class="flex flex-col gap-1.5"
          >
            <span class="inline-flex items-center gap-1 font-mono text-[0.75rem] text-subtle">
              <UiAppIcon icon="lucide:arrow-left" class="size-3" />{{ $t('projectDetail.prev') }}
            </span>
            <span class="font-sans text-[1.125rem] font-bold tracking-[-0.3px] text-foreground hover:text-accent">
              {{ t(prevProject.titleKey) }}
            </span>
          </NuxtLink>
          <NuxtLink
            :to="localePath({ name: 'projects-slug', params: { slug: nextProject.slug } })"
            class="flex flex-col items-end gap-1.5 text-right"
          >
            <span class="inline-flex items-center gap-1 font-mono text-[0.75rem] text-subtle">
              {{ $t('projectDetail.next') }}<UiAppIcon icon="lucide:arrow-right" class="size-3" />
            </span>
            <span class="font-sans text-[1.125rem] font-bold tracking-[-0.3px] text-foreground hover:text-accent">
              {{ t(nextProject.titleKey) }}
            </span>
          </NuxtLink>
        </nav>
        </template>

        <div v-else class="flex flex-col items-center gap-4 border-t border-border py-24 text-center">
          <UiBadge>{{ $t('projectsPage.underConstruction') }}</UiBadge>
          <p class="max-w-[420px] text-pretty font-sans text-sm leading-[1.7] text-muted-foreground">
            {{ $t('projectsPage.underConstructionNote') }}
          </p>
          <UiButton :to="localePath('projects')">
            {{ $t('projectsPage.backToList') }}
          </UiButton>
        </div>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
