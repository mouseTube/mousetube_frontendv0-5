<!--
Created by Nicolas Torquet at 10/01/2025
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->

<script setup>
import { usePageTracking } from '@/composables/usePageTracking'

usePageTracking()
</script>

<template>
  <v-app id="mousetube_frontend">
    <NuxtLayout>
      <nuxt-page />
    </NuxtLayout>
  </v-app>
</template>
