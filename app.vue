<script setup lang="ts">
const { locale } = useI18n()

useHead({
  script: [
    {
      key: 'tarteaucitron-lang',
      innerHTML: `window.tarteaucitronForceLanguage = ${JSON.stringify(locale.value)};`,
    },
    {
      key: 'tarteaucitron-core',
      src: '/tarteaucitron/tarteaucitron.min.js',
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
  bodyPosition: "bottom"
});

tarteaucitron.user.googletagmanagerId = "GTM-WV3GK874";
(tarteaucitron.job = tarteaucitron.job || []).push("googletagmanager");

tarteaucitron.services.calcom = {
  "key": "calcom",
  "type": "api",
  "name": "Cal.com",
  "uri": "https://cal.com/privacy",
  "needConsent": true,
  "cookies": [],
  "js": function () {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.eu/embed/embed.js", "init");
    Cal("init", "pro", { origin: "https://app.cal.eu" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
    Cal.ns.pro("ui", {
      "cssVarsPerTheme": {
        "light": { "cal-brand": "#D5AA73" },
        "dark": { "cal-brand": "#D5AA73" }
      },
      "hideEventTypeDetails": false,
      "layout": "month_view"
    });
  },
  "fallback": function () {}
};
(tarteaucitron.job = tarteaucitron.job || []).push("calcom");`,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <LayoutCustomCursor />
</template>
