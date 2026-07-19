<script setup lang="ts">
import { CAL_LINK, CAL_NAMESPACE, CONTACT_EMAIL } from '~/constants/contact'
import { SOCIAL_LINKS } from '~/constants/social'

const { refused: calRefused } = useCalConsent()
</script>

<template>
  <LayoutPageSection
    id="contact"
    class="flex flex-col items-center gap-5 py-14 md:py-28 text-center"
  >
    <UiLogoMark :size="88" class="mx-auto mb-8 text-accent" />
    <span class="font-mono text-[0.875rem] font-bold text-accent">{{
      $t('home.contact.eyebrow')
    }}</span>
    <h2
      class="text-balance font-sans text-[clamp(2.375rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-1.8px] text-foreground"
    >
      {{ $t('home.contact.title') }}<span class="text-accent">.</span>
    </h2>
    <p
      class="max-w-[460px] py-8 mx-auto text-pretty font-sans text-[1rem] leading-[1.7] text-muted-foreground"
    >
      {{ $t('home.contact.subtitle') }}<br />
      {{ $t('home.contact.subtitleSecondary') }}
    </p>
    <div class="mt-2 flex flex-wrap items-center justify-center gap-6">
      <UiButton :href="`mailto:${CONTACT_EMAIL}`">
        {{ CONTACT_EMAIL }}
      </UiButton>
      <UiButton
        v-if="!calRefused"
        variant="pill-outline"
        :data-cal-link="CAL_LINK"
        :data-cal-namespace="CAL_NAMESPACE"
        data-cal-config="{&quot;layout&quot;:&quot;month_view&quot;,
          &quot;useSlotsViewOnSmallScreen&quot;:&quot;true&quot;}"
      >
        {{ $t('home.contact.bookCall') }}
      </UiButton>
    </div>
    <div class="mt-8 flex items-center justify-center gap-6">
      <a
        v-for="social in SOCIAL_LINKS"
        :key="social.id"
        :href="social.href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 font-mono text-[0.875rem] font-semibold text-muted-foreground hover:text-accent"
      >
        {{ social.label }}
        <UiAppIcon icon="lucide:external-link" class="size-3.5" />
      </a>
    </div>
  </LayoutPageSection>
</template>
