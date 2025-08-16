// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    tailwindcss: {
      exposeConfig: true,
      viewer: true,
      // and more...
    },

    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      // apiBase: '/api'
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    // '@tailwindcss/postcss',
  ]
})