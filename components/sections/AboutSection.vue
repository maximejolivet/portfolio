<script setup lang="ts">
const highlightKeys = ['highlight1', 'highlight2', 'highlight3'] as const

const tagKeys = [
  'conceptionUiUx',
  'problemSolving',
  'webDev',
  'cloudDevops',
  'aiAutomation',
  'vibeCoding',
] as const
</script>

<template>
  <LayoutPageSection id="about">
    <div class="grid items-start gap-16 lg:grid-cols-[240px_1fr]">
      <div class="mx-auto w-full max-w-[240px] lg:mx-0">
        <div class="overflow-hidden rounded-2xl border border-white/10 p-2">
          <NuxtImg
            src="/maximejolivet.jpeg"
            :alt="$t('aboutSection.imageAlt')"
            width="240"
            height="240"
            loading="lazy"
            class="aspect-square w-full rounded-xl object-cover grayscale"
          />
        </div>
      </div>

      <div>
        <UiSectionHeading :eyebrow="$t('aboutSection.eyebrow')">
          <template #title>
            {{ $t('aboutSection.titleStart') }}
            <span class="text-accent">{{ $t('aboutSection.titleHighlight') }}</span>
            {{ $t('aboutSection.titleEnd') }}
          </template>
        </UiSectionHeading>

        <p class="mt-6 max-w-2xl text-base text-fg-muted sm:text-lg">
          {{ $t('aboutSection.paragraph1') }}
        </p>
        <p class="mt-4 max-w-2xl text-base text-fg-muted sm:text-lg">
          {{ $t('aboutSection.paragraph2') }}
        </p>

        <ul class="mt-6 list-none space-y-2">
          <li
            v-for="key in highlightKeys"
            :key="key"
            class="flex items-start gap-2 text-sm text-fg-muted"
          >
            <UiAppIcon icon="lucide:check" class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {{ $t(`aboutSection.${key}`) }}
          </li>
        </ul>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="key in tagKeys"
            :key="key"
            class="rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs
              text-fg-muted"
          >
            {{ $t(`aboutSection.tags.${key}`) }}
          </span>
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
