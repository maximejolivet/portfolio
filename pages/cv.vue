<script setup>
import { CAL_LINK, CAL_NAMESPACE } from '~/constants/contact'

definePageMeta({
  layout: 'fullscreen',
})

const { locale } = useI18n()
const lang = locale._value

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

useSeoMeta({
  title: 'Curriculum vitæ - Maxime Jolivet',
  ogTitle:
    'CV - Maxime Jolivet, Développeur web full-stack senior PHP - JavaScript / Expert Drupal',
  description:
    'Développeur web avec 10 ans d\'expérience en agence digitale, solides bases en '
    + 'informatique et développement web - Consultez le CV de Maxime Jolivet 🚀',
  ogDescription:
    'Développeur web avec 10 ans d\'expérience en agence digitale, solides bases en '
    + 'informatique et développement web - Consultez le CV de Maxime Jolivet 🚀',
  ogImage: 'https://maximejolivet.fr/open-graph-maximejolivet.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <h1 class="sr-only">Maxime Jolivet · Curriculum vitæ</h1>
    <pdfjs-viewer-element
      src="/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-tech-lead-ia.pdf"
      viewer-css-theme="DARK"
      zoom="auto"
      :locale="lang"
      class="block h-[calc(100vh-58px)] w-full"
    />

    <button
      type="button"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-sans text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105"
      :data-cal-link="CAL_LINK"
      :data-cal-namespace="CAL_NAMESPACE"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
    >
      <UiAppIcon icon="lucide:calendar" class="size-4" />
      {{ $t('home.contact.bookCall') }}
    </button>
  </div>
</template>
