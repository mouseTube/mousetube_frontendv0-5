// Created by Nicolas Torquet at 10/01/2023
// torquetn@igbmc.fr
// Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
// CNRS - Mouse Clinical Institute
// PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
// Code under GPL v3.0 licence


// https://nuxt.com/docs/api/configuration/nuxt-config
import type { PublicRuntimeConfig } from '@nuxt/schema'

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    mousetubeApiURL: string
  }
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],

  build: {
    transpile: ['vuetify', 'chart.js']
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      title: 'mouseTube'
    }
  },

  compatibilityDate: '2025-01-10',
  runtimeConfig: {
    public: {
      mousetubeApiURL: process.env.NUXT_PUBLIC_MOUSETUBE_API_URL || 'http://localhost:8000/api',
    },
  },
  alias: {
    '@composables': '/composables',
  },
  ssr: false,
})