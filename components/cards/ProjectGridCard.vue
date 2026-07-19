<script setup lang="ts">
import type { CaseStudy } from '~/constants/projects'

const props = defineProps<{
  project: CaseStudy
}>()

const { t } = useI18n()

const dotClass = computed(() => (props.project.dot === 'mint' ? 'bg-mint' : 'bg-primary'))
</script>

<template>
  <component
    :is="project.websiteUrl ? 'a' : 'div'"
    :href="project.websiteUrl"
    :target="project.websiteUrl ? '_blank' : undefined"
    :rel="project.websiteUrl ? 'noopener noreferrer nofollow' : undefined"
    class="group flex flex-col gap-3.5"
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
      :label="$t('projectsPage.capturesPending')"
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
