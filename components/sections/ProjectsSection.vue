<script setup lang="ts">
import { CASE_STUDIES } from '~/constants/projects'

const { t } = useI18n()
const localePath = useLocalePath()

const previewCaseStudies = CASE_STUDIES.slice(0, 4)

const NuxtLinkComponent = resolveComponent('NuxtLink')
const dotClass = (dot: 'mint' | 'gold') => (dot === 'mint' ? 'bg-mint' : 'bg-primary')
</script>

<template>
  <LayoutPageSection id="projects-list" class="pt-24">
    <UiSectionHeading :title="$t('home.projects.sectionTitle')" diamond="gold">
      <template #caption>
        <NuxtLink :to="localePath('projects')" class="hover:text-accent">
          {{ $t('home.projects.viewAll') }}
        </NuxtLink>
      </template>
    </UiSectionHeading>

    <div class="grid gap-7 sm:grid-cols-2">
      <component
        :is="project.live ? NuxtLinkComponent : 'div'"
        v-for="project in previewCaseStudies"
        :key="project.id"
        :to="project.live ? localePath({ name: 'projects-slug', params: { slug: project.slug } }) : undefined"
        class="flex flex-col gap-3.5"
        :class="{ 'opacity-60': !project.live }"
      >
        <div v-if="project.image" class="aspect-[16/10] overflow-hidden rounded-2xl border border-border">
          <NuxtImg :src="project.image" :alt="t(project.titleKey)" class="size-full object-cover" />
        </div>
        <UiImagePlaceholder
          v-else
          :dot-class="dotClass(project.dot)"
          :label="project.live ? undefined : $t('projectsPage.underConstruction')"
          class="aspect-[16/10]"
        />
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
  </LayoutPageSection>
</template>
