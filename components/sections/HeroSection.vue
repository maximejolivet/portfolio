<script setup lang="ts">
const localePath = useLocalePath()
const bgRef = useTemplateRef<HTMLElement>('bg')
useParallax(bgRef, { distance: -50 })
</script>

<template>
  <section class="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
    <div ref="bg" class="absolute inset-0 -z-10">
      <AnimationsAnimatedGradientBg />
    </div>

    <UiContainer>
      <AnimationsScrollReveal :y="28">
        <UiBadge>{{ $t('hero.eyebrow') }}</UiBadge>

        <h1
          class="font-display mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white
            sm:text-5xl lg:text-6xl"
        >
          {{ $t('hero.titleStart') }}
          <UiGradientText>{{ $t('hero.titleHighlight') }}</UiGradientText>
          {{ $t('hero.titleEnd') }}
        </h1>

        <p class="mt-6 max-w-xl text-lg text-white/60">
          {{ $t('hero.subtitle') }}
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-4">
          <AnimationsMagneticButton>
            <UiButton :to="localePath('/projects')" variant="primary">
              {{ $t('hero.ctaSecondary') }}
              <UiAppIcon icon="lucide:arrow-right" class="h-4 w-4" />
            </UiButton>
          </AnimationsMagneticButton>
        </div>
      </AnimationsScrollReveal>
    </UiContainer>

    <a
      href="#about"
      class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2
        text-xs text-white/40 transition hover:text-white/70 sm:flex"
    >
      {{ $t('hero.scrollHint') }}
      <UiAppIcon icon="lucide:chevron-down" class="h-4 w-4 animate-bounce" />
    </a>
  </section>
</template>
