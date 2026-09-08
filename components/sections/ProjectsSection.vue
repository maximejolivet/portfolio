<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { data: projects } = await useProjects()

const previewCaseStudies = computed(() =>
  projects.value
    .filter((p) => p.category === 'pro')
    .sort((a, b) => b.year.localeCompare(a.year))
    .slice(0, 3)
    .map((p) => localizeProject(p, locale.value)),
)

const dotClass = (dot: 'mint' | 'gold') => (dot === 'mint' ? 'bg-mint' : 'bg-primary')

// Rendered as pixels (server/api/project-title.svg.get.ts) rather than DOM
// text, so the client name is readable but not crawlable from this indexed
// page - see the noindex'd /projects/[slug] for the real accessible name.
function titleImageSrc(title: string) {
  return `/api/project-title.svg?text=${encodeURIComponent(title)}`
}
</script>

<template>
  <LayoutPageSection id="projects-list" bare class="pt-24">
    <UiContainer>
      <UiSectionHeading
        :title="$t('home.projects.sectionTitle')"
        icon="lucide:folder-open"
        diamond="gold"
      >
        <template #caption>
          <NuxtLink
            :to="localePath('projects')"
            rel="nofollow"
            class="inline-flex items-center gap-1 hover:text-accent"
          >
            {{ $t('home.projects.viewAll') }}<UiAppIcon icon="lucide:arrow-right" class="size-3" />
          </NuxtLink>
        </template>
      </UiSectionHeading>
    </UiContainer>

    <UiContainer>
      <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="project in previewCaseStudies"
          :key="project.id"
          :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })"
          rel="nofollow"
          :style="{ viewTransitionName: `project-${project.id}` }"
          class="group flex flex-col gap-3.5"
        >
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="project.type"
              loading="lazy"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <CardsProjectLogoPlate
              v-else-if="project.logo"
              :logo="project.logo"
              :logo-color="project.logoColor ?? '#1d3540'"
              :alt="project.type"
              class="size-full rounded-none border-0"
            />
            <UiImagePlaceholder
              v-else
              :dot-class="dotClass(project.dot)"
              class="size-full rounded-none border-0"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35"
            >
              <span
                class="flex size-12 scale-75 items-center justify-center rounded-full bg-background/90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
              >
                <UiAppIcon icon="lucide:eye" class="size-5 text-foreground" />
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <img
              :src="titleImageSrc(project.title)"
              alt=""
              aria-hidden="true"
              height="20"
              class="h-5 w-auto"
            >
            <div class="flex items-center justify-between gap-2 font-mono text-[0.7812rem] text-subtle">
              <span>{{ project.year }}</span>
              <span v-if="project.tags.length" class="min-w-0 truncate text-muted-foreground">
                {{ project.tags.slice(0, 2).join(' · ') }}
              </span>
            </div>
            <span
              class="mt-1 flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors group-hover:text-primary"
            >
              {{ $t('projectsPage.viewProject') }}
              <UiAppIcon
                icon="lucide:arrow-right"
                class="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </NuxtLink>
      </div>
    </UiContainer>
  </LayoutPageSection>
</template>
