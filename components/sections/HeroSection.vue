<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'

const localePath = useLocalePath()
</script>

<template>
  <section>
    <UiContainer>
      <p>
        {{ $t('hero.location') }}
      </p>

      <h1>
        Maxime Jolivet
      </h1>
      <p>
        {{ $t('hero.role') }} <span>·</span> Gingerminds
      </p>

      <p>
        {{ $t('hero.bio') }}
      </p>
      <p>
        {{ $t('hero.subtitle') }}
      </p>

      <div>
        <UiButton :to="localePath('projects')">
          {{ $t('hero.ctaSecondary') }}
          <UiAppIcon icon="lucide:arrow-right" />
        </UiButton>
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
        >
          {{ CONTACT_EMAIL }}
        </a>
      </div>
    </UiContainer>

    <a
      href="#about"
    >
      {{ $t('hero.scrollHint') }}
      <UiAppIcon icon="lucide:chevron-down" />
    </a>
  </section>
</template>
