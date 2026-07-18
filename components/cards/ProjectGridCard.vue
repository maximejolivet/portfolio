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
    class="group flex flex-col gap-3.5"
    :class="{ 'opacity-60': !project.live }"
  >
    <div v-if="project.image" class="aspect-video overflow-hidden rounded-2xl border border-border">
      <NuxtImg
        :src="project.image"
        :alt="t(project.titleKey)"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <UiImagePlaceholder
      v-else
      :dot-class="dotClass"
      :label="
        project.live ? $t('projectsPage.capturesPending') : $t('projectsPage.underConstruction')
      "
      class="aspect-video"
    />
    <div class="flex flex-col gap-1.5">
      <div class="flex items-baseline justify-between gap-3">
        <span class="font-sans text-lg font-bold tracking-[-0.4px] text-foreground">
          {{ t(project.titleKey) }}
        </span>
        <span class="font-mono text-[0.7812rem] text-subtle">{{ project.year }}</span>
      </div>
      <div class="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        <span v-if="project.company">{{ project.company }}</span>
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
    </div>
  </component>
</template>
