<script setup lang="ts">
import type { LocalizedProject } from '~/composables/useProjects'

const props = defineProps<{
  project: LocalizedProject
}>()

const localePath = useLocalePath()

const dotClass = computed(() => (props.project.dot === 'mint' ? 'bg-mint' : 'bg-primary'))
</script>

<template>
  <NuxtLink
    :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })"
    rel="nofollow"
    :style="{ viewTransitionName: `project-${project.id}` }"
    class="group flex flex-col gap-3.5"
  >
    <div v-if="project.image" class="aspect-video overflow-hidden rounded-2xl border border-border">
      <NuxtImg
        :src="project.image"
        :alt="project.title"
        loading="lazy"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <CardsProjectLogoPlate
      v-else-if="project.logo"
      :logo="project.logo"
      :logo-color="project.logoColor ?? '#1d3540'"
      :alt="project.title"
      class="aspect-video"
    />
    <UiImagePlaceholder
      v-else
      :dot-class="dotClass"
      :label="$t('projectsPage.capturesPending')"
      class="aspect-video"
    />
    <div class="flex flex-col gap-1.5">
      <div class="flex items-baseline justify-between gap-3">
        <span class="font-sans text-lg font-bold tracking-[-0.4px] text-foreground">
          {{ project.title }}
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
  </NuxtLink>
</template>
