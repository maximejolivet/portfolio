<script setup>
const { locale, locales } = useI18n()
const lang = locale._value

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

useSeoMeta({
  title: 'Curriculum vitæ - Maxime Jolivet',
  ogTitle: 'CV - Maxime Jolivet, Développeur web full-stack senior PHP - JavaScript / Expert Drupal',
  description: 'Développeur web avec 10 ans d\'expérience en agence digitale, solides bases en informatique et développement web - Consultez le CV de Maxime Jolivet 🚀',
  ogDescription: 'Développeur web avec 10 ans d\'expérience en agence digitale, solides bases en informatique et développement web - Consultez le CV de Maxime Jolivet 🚀',
  ogImage: 'https://maximejolivet.fr/open-graph-maximejolivet.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex flex-col h-full bg-black">
    <h1 class="sr-only">Maxime Jolivet - Curriculum vitæ</h1>
    <pdfjs-viewer-element
src="/cv-maximejolivet-developpeur.pdf" viewer-css-theme="DARK" zoom="auto" :locale="lang"
      class="flex-1 w-full h-screen border-0"
/>
  </div>
</template>
