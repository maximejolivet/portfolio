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
    <div>
      <div>
        <div>
          <NuxtImg
            src="/maximejolivet.jpeg"
            :alt="$t('aboutSection.imageAlt')"
            width="240"
            height="240"
            loading="lazy"
          />
        </div>
      </div>

      <div>
        <UiSectionHeading :eyebrow="$t('aboutSection.eyebrow')">
          <template #title>
            {{ $t('aboutSection.titleStart') }}
            <span>{{ $t('aboutSection.titleHighlight') }}</span>
            {{ $t('aboutSection.titleEnd') }}
          </template>
        </UiSectionHeading>

        <p>
          {{ $t('aboutSection.paragraph1') }}
        </p>
        <p>
          {{ $t('aboutSection.paragraph2') }}
        </p>

        <ul>
          <li
            v-for="key in highlightKeys"
            :key="key"
          >
            <UiAppIcon icon="lucide:check" />
            {{ $t(`aboutSection.${key}`) }}
          </li>
        </ul>

        <div>
          <span
            v-for="key in tagKeys"
            :key="key"
          >
            {{ $t(`aboutSection.tags.${key}`) }}
          </span>
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
