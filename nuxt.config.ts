// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css',
  '@fortawesome/fontawesome-free/css/all.css',
  '@fortawesome/fontawesome-svg-core/styles.css',
],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
  ],
  runtimeConfig: {
    public: {
      apiBaseURL: "http://localhost/api/",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})