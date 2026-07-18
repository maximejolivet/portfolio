<script setup lang="ts">
const highlightKeys = ['highlight1', 'highlight2', 'highlight3'] as const

const tagKeys = [
  'conceptionUiUx',
  'webDev',
  'problemSolving',
  'cloudDevops',
  'aiAutomation',
  'vibeCoding',
] as const
</script>

<template>
  <LayoutPageSection id="about" class="pt-24">
    <UiSectionHeading :title="$t('aboutSection.eyebrow')" icon="lucide:user-round" diamond="gold" />

    <div class="grid items-start gap-14 md:grid-cols-[1.15fr_.85fr]">
      <div class="flex flex-col gap-5">
        <h3
          class="text-balance font-sans text-[1.5rem] font-bold leading-[1.35] tracking-[-0.4px] text-foreground"
        >
          {{ $t('aboutSection.titleStart') }}
          <span class="text-primary">{{ $t('aboutSection.titleHighlight') }}</span>{{ $t('aboutSection.titleEnd') }}
        </h3>

        <p class="text-pretty font-sans text-[1rem] leading-[1.75] text-muted-foreground">
          {{ $t('aboutSection.paragraph1') }}
        </p>
        <p class="text-pretty font-sans text-[1rem] leading-[1.75] text-muted-foreground">
          {{ $t('aboutSection.paragraph2') }}
        </p>

        <div class="mt-2 flex flex-col gap-3">
          <div
            v-for="key in highlightKeys"
            :key="key"
            class="flex items-center gap-3 font-mono text-[0.9062rem] text-foreground"
          >
            <span class="text-mint">}}</span>
            {{ $t(`aboutSection.${key}`) }}
          </div>
        </div>

        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="key in tagKeys"
            :key="key"
            class="rounded-full border border-border px-3 py-1 font-mono text-[0.7812rem] text-muted-foreground"
          >
            {{ $t(`aboutSection.tags.${key}`) }}
          </span>
        </div>
      </div>

      <div class="relative w-full min-w-0 max-w-full">
        <div class="absolute -right-3.5 -top-3.5 z-10 size-[52px] rounded-full bg-mint" />
        <div class="absolute -bottom-3 -left-3 z-10 size-10 rounded-full bg-primary" />
        <div class="relative h-[420px] w-full overflow-hidden rounded-[18px]">
          <NuxtImg
            src="/maximejolivet.jpg"
            :alt="$t('aboutSection.imageAlt')"
            width="640"
            height="640"
            loading="lazy"
            class="size-full object-cover"
          />
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
