<script setup lang="ts">
import { CAL_BOOKING_URL, CONTACT_EMAIL } from '~/constants/contact'
import { CASE_STUDIES } from '~/constants/projects'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('projectsPage.title')} - Maxime Jolivet`,
  description: () => t('projectsPage.subtitle'),
})

const NuxtLinkComponent = resolveComponent('NuxtLink')
const dotClass = (dot: 'mint' | 'gold') => (dot === 'mint' ? 'bg-mint' : 'bg-primary')
</script>

<template>
  <div>
    <SectionsPageIntro
      :eyebrow="$t('projectsPage.eyebrow')"
      :title="$t('projectsPage.title')"
      :subtitle="$t('projectsPage.subtitle')"
    />

    <LayoutPageSection bare>
      <UiContainer class="flex flex-col">
        <component
          :is="project.live ? NuxtLinkComponent : 'div'"
          v-for="(project, i) in CASE_STUDIES"
          :key="project.id"
          :to="project.live ? localePath({ name: 'projects-slug', params: { slug: project.slug } }) : undefined"
          class="group grid items-center gap-8 border-t border-border py-12 transition-colors duration-300 md:grid-cols-2 md:gap-12"
          :class="project.live ? 'hover:bg-card' : 'opacity-60'"
        >
          <div :class="i % 2 === 1 ? 'md:order-2' : ''">
            <div v-if="project.image" class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
              <NuxtImg
                :src="project.image"
                :alt="t(project.titleKey)"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            <UiImagePlaceholder
              v-else
              :dot-class="dotClass(project.dot)"
              :label="project.live ? $t('projectsPage.capturesPending') : $t('projectsPage.underConstruction')"
              class="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div class="flex flex-col gap-4" :class="i % 2 === 1 ? 'md:order-1' : ''">
            <span class="flex items-center gap-2.5 font-mono text-[0.7812rem] text-subtle">
              {{ project.year }} · {{ t(project.typeKey) }}
              <UiBadge v-if="!project.live">{{ $t('projectsPage.underConstruction') }}</UiBadge>
            </span>
            <h2 class="text-balance font-sans text-[1.75rem] font-bold leading-[1.2] tracking-[-0.6px] text-foreground">
              {{ t(project.titleKey) }}
            </h2>

            <template v-if="project.live">
              <p class="text-pretty font-sans text-sm leading-[1.7] text-muted-foreground">
                {{ t(project.taglineKey) }}
              </p>
              <div class="flex items-baseline gap-2.5 font-mono text-[0.875rem] text-foreground">
                <span class="text-mint">→</span>
                <span>{{ t(project.impactKey) }}</span>
              </div>
              <div class="mt-1 flex flex-wrap gap-2">
                <UiBadge v-for="tag in project.tags" :key="tag" class="bg-mint/16">
                  {{ tag }}
                </UiBadge>
              </div>
              <span
                class="mt-1 flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors group-hover:text-primary"
              >
                {{ $t('projectsPage.viewProject') }}
                <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </template>
            <p v-else class="font-mono text-sm text-muted-foreground">
              {{ $t('projectsPage.underConstructionNote') }}
            </p>
          </div>
        </component>
      </UiContainer>
    </LayoutPageSection>

    <SectionsClientsSection />

    <LayoutPageSection bare>
      <UiContainer>
        <section class="flex flex-col items-center gap-4 py-20 text-center">
          <h2 class="font-sans text-[2.125rem] font-bold leading-[1.1] tracking-[-1px] text-foreground">
            {{ $t('projectsPage.ctaTitle') }}<span class="text-accent"> ?</span>
          </h2>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <UiButton :href="`mailto:${CONTACT_EMAIL}`">
              {{ CONTACT_EMAIL }}
            </UiButton>
            <UiButton :href="CAL_BOOKING_URL" variant="pill-outline" icon="lucide:arrow-right">
              {{ $t('home.contact.bookCall') }}
            </UiButton>
          </div>
        </section>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
