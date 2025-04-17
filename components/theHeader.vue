<!--
Created by Nicolas Torquet at 27/10/2023
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->
<template>
  <v-app-bar color="#0d0d0d" height="56" class="d-flex align-center">
    <v-app-bar-title class="fill-height d-flex justify-start align-center">
      <v-row class="fill-height">
        <v-col class="fill-height d-flex justify-start align-center">
          <!-- Lien autour de l'image et du texte -->
          <nuxt-link to="/" class="nuxt-link d-flex align-center">
            <v-img
              :width="70"
              src="/logo_mousetube_carre.png"
              alt="mouseTube"
              class="rounded-circle"
              style="background-color: white; padding: 5px"
            ></v-img>
            <span class="ml-3 site-title">MouseTube</span>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-app-bar-title>

    <v-row class="fill-height">
      <v-col class="fill-height d-flex justify-start align-center">
        <nuxt-link
          to="/Vocalizations"
          class="nuxt-link mr-10 nav-item"
          exact-active-class="active-link"
          >Vocalizations</nuxt-link
        >
        <nuxt-link to="/Team" class="nuxt-link nav-item" exact-active-class="active-link"
          >Team</nuxt-link
        >
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup>
// Header page
</script>

<style scoped>
.site-title {
  color: white;
}

.nuxt-link {
  color: white;
  font-weight: 800 !important;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.nav-item {
  display: inline-block;
  padding: 8px 16px;
  position: relative;
  z-index: 0;
}

.nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  border-radius: 12px;
  opacity: 0;
  box-shadow: 0 0 8px rgba(248, 247, 247, 0.6);
  z-index: -1;
  transition:
    opacity 0.4s ease,
    box-shadow 0.4s ease;
}

.nav-item:hover::before {
  opacity: 0.2;
}

.active-link::before {
  opacity: 0.2;
}

.nav-item:hover,
.active-link {
  color: white;
  -webkit-text-stroke: 0;
  background-color: transparent;
}

.site-title::before {
  content: none !important;
}
</style>
