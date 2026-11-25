<script setup>
import QRCode from 'qrcode'
import { BOOKING_URL, CONTACT_EMAIL } from '~/constants/contact'
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

definePageMeta({
  layout: 'fullscreen',
})

const { t } = useI18n()
const localePath = useLocalePath()
const siteConfig = useSiteConfig()

const pdfViewer = ref(null)
const summaryOpen = ref(false)
const qrDataUrl = ref('')

const cvUrl = computed(() => `${siteConfig.url}${localePath('/cv')}`)
const latestRole = EXPERIENCE_TIMELINE[0]

onMounted(async () => {
  qrDataUrl.value = await QRCode.toDataURL(cvUrl.value, { margin: 1, width: 240 })
})

function onEscKey(event) {
  if (event.key === 'Escape') summaryOpen.value = false
}

onMounted(() => window.addEventListener('keydown', onEscKey))
onUnmounted(() => window.removeEventListener('keydown', onEscKey))

// Safari/WebKit fails to resolve a root-relative worker-src ("/generated/...")
// from inside the viewer's srcdoc iframe ("Module name ... does not resolve
// to a valid URL"), because that iframe's base URI isn't the page's origin
// there. A fully-qualified absolute URL sidesteps relative resolution
// entirely, so it works regardless of the iframe's base URI.
const workerSrc = typeof window !== 'undefined'
  ? `${window.location.origin}/generated/pdf.worker.min.mjs`
  : undefined

onMounted(async () => {
  // The PDF viewer (~2 MB of pdf.js) is only needed on this page, so it is
  // loaded here rather than from a global plugin that every page would pay for.
  await import('pdfjs-viewer-element')

  // pdfjs-viewer-element defaults `wasmUrl` to a `../web/wasm/` path that
  // isn't shipped in the published package, unlike pdf.js itself (which
  // defaults it to null, i.e. disabled). That forces pdf.js to attempt
  // wasm-based ICC/JBIG2/JPX decoding against a 404, which throws instead
  // of degrading gracefully in the synchronous "fake worker" fallback some
  // browsers (Safari, Firefox mobile) use - breaking rendering entirely for
  // PDFs with an embedded ICC profile (e.g. Canva exports). Restore pdf.js's
  // own safe default before init picks it up.
  pdfViewer.value?.setViewerOptions({ wasmUrl: null, useWasm: false })
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

useSeoMeta({
  title: () => t('seo.cvTitle'),
  ogTitle: () => t('seo.cvOgTitle'),
  description: () => t('seo.cvDescription'),
  ogDescription: () => t('seo.cvDescription'),
  ogImage: 'https://www.maxime.bzh/open-graph-maximejolivet.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <h1 class="sr-only">Maxime Jolivet · Curriculum vitæ</h1>
    <pdfjs-viewer-element
ref="pdfViewer"
      src="/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-php-symfony-drupal-wordpress-javascript-vuejs-ia.pdf"
      :worker-src="workerSrc" viewer-css-theme="DARK" zoom="auto" class="block h-[calc(100dvh-4.5rem)] w-full"
/>

    <button
type="button"
      class="fixed bottom-62 right-6 z-50 hidden items-center gap-1.5 rounded-full border border-border bg-background/90 min-h-11 px-3.5 py-2 font-mono text-xs font-semibold text-muted-foreground shadow-md backdrop-blur-sm transition-colors hover:text-accent-text sm:flex"
      @click="summaryOpen = true"
>
      <UiAppIcon icon="lucide:zap" class="size-3.5" />
      {{ t('cv.quickView.trigger') }}
    </button>

    <div
v-if="summaryOpen"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      @click.self="summaryOpen = false"
>
      <div class="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-2xl">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 class="font-sans text-lg font-bold text-foreground">
              Maxime Jolivet
            </h2>
            <p class="font-mono text-xs text-muted-foreground">
              {{ t('hero.role') }}
            </p>
          </div>
          <button
type="button" :aria-label="t('cv.quickView.close')"
            class="flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent-text"
            @click="summaryOpen = false"
>
            <UiAppIcon icon="lucide:x" class="size-4" />
          </button>
        </div>

        <p class="text-pretty font-sans text-sm leading-[1.6] text-muted-foreground">
          {{ t('hero.bio') }}
        </p>

        <p v-if="latestRole" class="font-mono text-xs text-subtle">
          {{ t('cv.quickView.previously') }} {{ t(latestRole.titleKey) }} @ {{ t(latestRole.organizationKey) }}
        </p>
        <p class="font-mono text-xs text-accent-text">
          {{ t('cv.quickView.currentlyAt') }} {{ t('cv.quickView.jobSearch') }}
        </p>

        <div class="flex flex-col items-center gap-2 border-t border-border pt-4">
          <img
v-if="qrDataUrl" :src="qrDataUrl" :alt="t('cv.quickView.qrAlt')" width="140" height="140"
            class="rounded-lg"
>
          <p class="text-center font-mono text-[0.6875rem] text-subtle">
            {{ t('cv.quickView.qrCaption') }}
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <a :href="`mailto:${CONTACT_EMAIL}`" class="text-accent-text hover:underline">
            {{ CONTACT_EMAIL }}
          </a>
        </div>
      </div>
    </div>

    <a
      :href="BOOKING_URL" target="_blank" rel="noopener noreferrer"
      class="fixed bottom-18 right-0 z-50 flex size-11 items-center justify-center gap-2 rounded-l-full border-y border-l-0 border-r border-primary bg-primary font-sans text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 hover:border-accent hover:bg-accent md:bottom-44 md:right-6 md:size-auto md:rounded-full md:border md:px-5 md:py-3.5"
      :aria-label="`${$t('home.contact.bookCall')} ${$t('a11y.newWindow')}`"
    >
      <UiAppIcon icon="lucide:calendar" class="pointer-events-none size-4" />
      <span class="hidden md:inline">{{ $t('home.contact.bookCall') }}</span>
    </a>
  </div>
</template>
