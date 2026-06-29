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
    <div class="grid items-center gap-16 lg:grid-cols-2">
      <AnimationsScrollReveal :y="24">
        <div class="relative mx-auto w-full max-w-sm">
          <div class="bg-gradient-aurora absolute -inset-6 -z-10 rounded-4xl opacity-60 blur-2xl" />
          <UiGlowCard glow="gold" class="p-3">
            <NuxtImg
              src="/maximejolivet.jpeg"
              :alt="$t('aboutSection.imageAlt')"
              width="480"
              height="480"
              loading="lazy"
              class="aspect-square w-full rounded-xl object-cover"
            />
          </UiGlowCard>
        </div>
      </AnimationsScrollReveal>

      <AnimationsScrollReveal :y="24" :delay="0.1">
        <UiSectionHeading :eyebrow="$t('aboutSection.eyebrow')">
          <template #title>
            {{ $t('aboutSection.titleStart') }}
            <UiGradientText>{{ $t('aboutSection.titleHighlight') }}</UiGradientText>
            {{ $t('aboutSection.titleEnd') }}
          </template>
        </UiSectionHeading>

        <p class="mt-6 text-white/60">{{ $t('aboutSection.paragraph1') }}</p>
        <p class="mt-4 text-white/60">{{ $t('aboutSection.paragraph2') }}</p>

        <ul class="mt-8 space-y-3">
          <li
            v-for="key in highlightKeys"
            :key="key"
            class="flex items-start gap-3 text-sm text-white/80"
          >
            <UiAppIcon icon="lucide:check-circle-2" class="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
            {{ $t(`aboutSection.${key}`) }}
          </li>
        </ul>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="key in tagKeys"
            :key="key"
            class="glass rounded-full px-4 py-1.5 text-sm text-white/70"
          >
            {{ $t(`aboutSection.tags.${key}`) }}
          </span>
        </div>
      </AnimationsScrollReveal>
    </div>
  </LayoutPageSection>
</template>
