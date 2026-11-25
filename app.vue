<script setup lang="ts">
const { locale } = useI18n()
const i18nHead = useLocaleHead()
const { preferencesOpen } = usePreferences()

useHead({
  htmlAttrs: computed(() => i18nHead.value.htmlAttrs),
  link: computed(() => i18nHead.value.link),
  meta: computed(() => i18nHead.value.meta),
  script: [
    {
      // Chromium only: prerenders case studies on hover (see shared/utils/speculationRules.ts).
      key: 'speculation-rules',
      type: 'speculationrules',
      innerHTML: JSON.stringify(buildSpeculationRules()),
    },
    {
      key: 'tarteaucitron-lang',
      innerHTML: `window.tarteaucitronForceLanguage = ${JSON.stringify(locale.value)};`,
    },
    {
      key: 'tarteaucitron-core',
      src: '/tarteaucitron/tarteaucitron.min.js',
    },
    {
      'key': 'ia-widget',
      'src': 'https://ia.maxime.bzh/widget.js',
      'data-trigger': '#ia-chat-trigger',
      'async': true,
    },
    {
      key: 'tarteaucitron-init',
      innerHTML: `tarteaucitron.init({
  privacyUrl: "",
  hashtag: "#tarteaucitron",
  cookieName: "tarteaucitron",
  orientation: "bottom",
  showAlertSmall: false,
  cookieslist: true,
  showIcon: false,
  iconPosition: "BottomRight",
  adblocker: false,
  DenyAllCta: true,
  AcceptAllCta: true,
  highPrivacy: true,
  handleBrowserDNTRequest: false,
  removeCredit: true,
  moreInfoLink: true,
  useExternalCss: true,
  useExternalJs: false,
  mandatory: true,
  mandatoryCta: true,
  bodyPosition: "bottom",
  googleConsentMode: true,
  softConsentMode: false
});

tarteaucitron.user.googletagmanagerId = "GTM-WV3GK874";
(tarteaucitron.job = tarteaucitron.job || []).push("googletagmanager");

document.addEventListener("googletagmanager_consentModeOk", function () {
  window.tac_gtag && window.tac_gtag("consent", "update", { analytics_storage: "granted" });
});
document.addEventListener("googletagmanager_consentModeKo", function () {
  window.tac_gtag && window.tac_gtag("consent", "update", { analytics_storage: "denied" });
});`,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <LayoutCustomCursor />
  <LayoutCommandPalette />
  <LayoutPreferencesPanel v-if="preferencesOpen" />
  <LayoutShortcutsOverlay />
  <LayoutKonamiEasterEgg />
  <LayoutFloatingActions />
</template>
