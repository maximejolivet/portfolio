<script setup lang="ts">
import type { CaseStudy } from '~/constants/projects'

const props = defineProps<{
  project: CaseStudy
}>()

const { t } = useI18n()

const dotClass = computed(() => (props.project.dot === 'mint' ? 'bg-mint' : 'bg-primary'))
const tagline = computed(() => t(props.project.taglineKey))
</script>

<template>
  <component
    :is="project.websiteUrl ? 'a' : 'div'"
    :href="project.websiteUrl"
    :target="project.websiteUrl ? '_blank' : undefined"
    :rel="project.websiteUrl ? 'noopener noreferrer nofollow' : undefined"
    class="group flex flex-col overflow-hidden rounded-2xl border border-border transition-colors duration-300 hover:bg-card sm:flex-row"
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
        :label="$t('projectsPage.capturesPending')"
        class="aspect-video size-full rounded-none border-0 sm:aspect-auto sm:h-full"
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

      <p v-if="tagline" class="text-pretty font-sans text-sm leading-[1.6] text-muted-foreground">
        {{ tagline }}
      </p>
      <div v-if="project.tags.length" class="flex flex-wrap gap-2">
        <UiBadge v-for="tag in project.tags.slice(0, 4)" :key="tag" class="bg-mint/16">
          {{ tag }}
        </UiBadge>
      </div>
      <span
        v-if="project.websiteUrl"
        class="mt-1 flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors group-hover:text-primary"
      >
        {{ $t('projectsPage.viewProject') }}
        <UiAppIcon
          icon="lucide:external-link"
          class="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </div>
  </component>
</template>
