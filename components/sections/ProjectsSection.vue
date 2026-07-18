<script setup lang="ts">
import { CASE_STUDIES } from '~/constants/projects'

const { t } = useI18n()
const localePath = useLocalePath()

const previewCaseStudies = CASE_STUDIES.filter((p) => p.category === 'pro')
  .sort((a, b) => b.year.localeCompare(a.year))
  .slice(0, 6)

const NuxtLinkComponent = resolveComponent('NuxtLink')
const dotClass = (dot: 'mint' | 'gold') => (dot === 'mint' ? 'bg-mint' : 'bg-primary')
</script>

<template>
  <LayoutPageSection id="projects-list" bare class="pt-24">
    <UiContainer>
      <UiSectionHeading :title="$t('home.projects.sectionTitle')" icon="lucide:folder-open" diamond="gold">
        <template #caption>
          <NuxtLink :to="localePath('projects')" class="inline-flex items-center gap-1 hover:text-accent">
            {{ $t('home.projects.viewAll') }}<UiAppIcon icon="lucide:arrow-right" class="size-3" />
          </NuxtLink>
        </template>
      </UiSectionHeading>
    </UiContainer>

    <UiContainer>
      <div class="grid gap-7 sm:grid-cols-2">
        <component
          :is="project.live ? NuxtLinkComponent : 'div'"
          v-for="project in previewCaseStudies"
          :key="project.id"
          :to="project.live ? localePath({ name: 'projects-slug', params: { slug: project.slug } }) : undefined"
          class="group flex flex-col gap-3.5"
          :class="{ 'opacity-60': !project.live }"
        >
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="t(project.titleKey)"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <UiImagePlaceholder
              v-else
              :dot-class="dotClass(project.dot)"
              :label="project.live ? undefined : $t('projectsPage.underConstruction')"
              class="size-full rounded-none border-0"
            />
            <div
              v-if="project.live"
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
            <div class="flex items-baseline justify-between">
              <span class="font-sans text-lg font-bold tracking-[-0.4px] text-foreground">
                {{ t(project.titleKey) }}
              </span>
              <span class="font-mono text-[0.7812rem] text-subtle">{{ project.year }}</span>
            </div>
            <div class="font-mono text-xs text-muted-foreground">
              {{ project.live ? project.tags.slice(0, 2).join(' · ') : $t('projectsPage.underConstruction') }}
            </div>
          </div>
        </component>
      </div>
    </UiContainer>
  </LayoutPageSection>
</template>
