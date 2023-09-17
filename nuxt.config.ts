// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1",
      title: "Nuxt 3 Starter Kit",
      meta: [
        { name: "description", content: "My amazing Nuxt 3 application." },
      ],
      htmlAttrs: {
        lang: "fr",
        style: "font-size: 1rem",
      },
    },

    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  modules: [
    "@nuxt/devtools",
    // https://i18n.nuxtjs.org/setup
    // https://github.com/jahidanowar/nuxt3-i18n-tutorial/blob/main/app.vue
    "@nuxtjs/i18n",
    // https://tailwindcss.nuxtjs.org/getting-started/setup
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

  css: ["@/assets/styles/main.scss"],

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //
        },
      },
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  i18n: {
    /* module options */
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "fr",
        iso: "fr-FR",
        name: "French(FR)",
        file: "fr-FR.json",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English(US)",
        file: "en-US.json",
      },
    ],
    defaultLocale: "fr-FR",
    vueI18n: "locales/vue-i18n.config.ts",
  },

  devtools: {
    // Enable devtools (default: true)
    enabled: true,
  },
});
