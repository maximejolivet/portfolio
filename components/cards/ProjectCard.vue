<script setup lang="ts">
import type { CaseStudy } from '~/constants/projects'

const props = defineProps<{
  project: CaseStudy
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const NuxtLinkComponent = resolveComponent('NuxtLink')
const dotClass = computed(() => (props.project.dot === 'mint' ? 'bg-mint' : 'bg-primary'))
const projectTo = computed(() =>
  props.project.live
    ? localePath({ name: 'projects-slug', params: { slug: props.project.slug } })
    : undefined,
)
</script>

<template>
  <component
    :is="project.live ? NuxtLinkComponent : 'div'"
    :to="projectTo"
    class="group flex flex-col overflow-hidden rounded-2xl border border-border transition-colors duration-300 sm:flex-row"
    :class="project.live ? 'hover:bg-card' : 'opacity-60'"
  >
    <div class="relative w-full shrink-0 overflow-hidden sm:w-64 md:w-80">
      <NuxtImg
        v-if="project.image"
        :src="project.image"
        :alt="t(project.titleKey)"
        class="aspect-video size-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-auto sm:h-full"
      />
      <UiImagePlaceholder
        v-else
        :dot-class="dotClass"
        :label="
          project.live ? $t('projectsPage.capturesPending') : $t('projectsPage.underConstruction')
        "
        class="aspect-video size-full rounded-none border-0 sm:aspect-auto sm:h-full"
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

    <div class="flex min-w-0 flex-1 flex-col gap-2.5 p-5">
      <div class="flex flex-wrap items-start justify-between gap-2">
        <span class="flex flex-wrap items-center gap-2.5 font-mono text-[0.7812rem] text-subtle">
          {{ project.year }} · {{ t(project.typeKey)
          }}<template v-if="project.company"> · {{ project.company }} </template>
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

      <h2
        class="text-balance font-sans text-xl font-bold leading-[1.25] tracking-[-0.4px] text-foreground"
      >
        {{ t(project.titleKey) }}
      </h2>

      <template v-if="project.live">
        <p class="text-pretty font-sans text-sm leading-[1.6] text-muted-foreground">
          {{ t(project.taglineKey) }}
        </p>
        <div class="flex flex-wrap gap-2">
          <UiBadge v-for="tag in project.tags.slice(0, 4)" :key="tag" class="bg-mint/16">
            {{ tag }}
          </UiBadge>
        </div>
        <span
          class="mt-1 flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors group-hover:text-primary"
        >
          {{ $t('projectsPage.viewProject') }}
          <UiAppIcon
            icon="lucide:arrow-right"
            class="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </template>
      <div v-else class="flex items-center gap-2">
        <UiBadge>{{ $t('projectsPage.underConstruction') }}</UiBadge>
        <p class="font-mono text-sm text-muted-foreground">
          {{ $t('projectsPage.underConstructionNote') }}
        </p>
      </div>
    </div>
  </component>
</template>
