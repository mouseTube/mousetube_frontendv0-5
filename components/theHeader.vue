<!--
Created by Nicolas Torquet at 27/10/2023
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->
<script setup>
// Header page
import { Users } from 'lucide-vue-next';
import { AudioLines } from 'lucide-vue-next';
</script>

<template>
  <v-app-bar color="#0d0d0d" height="56" class="d-flex align-center">
    <v-app-bar-title class="fill-height d-flex justify-start align-center">
      <v-row class="fill-height">
        <v-col class="fill-height d-flex justify-start align-center">
          <nuxt-link to="/" class="nuxt-link d-flex align-center" exact-active-class="active-logo">
            <v-img
              :width="70"
              src="/logo_mousetube_carre.png"
              alt="mouseTube"
              class="rounded-circle logo-img"
              style="background-color: white; padding: 5px"
            ></v-img>
            <span class="ml-3 site-title">MouseTube</span>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-app-bar-title>

    <v-row class="fill-height">
      <v-col class="fill-height d-flex justify-start align-center">
        <nuxt-link to="/Vocalizations" class="nav-item" exact-active-class="active-link">
          <span class="nav-link-content">
            <AudioLines class="nav-icon" />
            <span class="nav-label">Vocalizations</span>
          </span>
        </nuxt-link>
        <nuxt-link to="/Team" class="nuxt-link nav-item" exact-active-class="active-link">
          <span class="nav-link-content">
            <Users class="nav-icon" />
            <span class="nav-label"> Team</span>
          </span>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<style scoped>
.logo-img {
  transition: border 0.3s ease;
  border-radius: 50%;
  background-color: white;
  border: 2px solid transparent;
}
.nuxt-link:hover .logo-img,
.active-logo .logo-img {
  border-color: red;
}
.nav-icon {
  stroke: white;
  transition: stroke 0.3s ease;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
}
.nav-link-content {
  display: inline-flex;
  align-items: center;
}
.nav-label {
  color: white;
}
.site-title {
  color: white;
}

.nuxt-link {
  display: inline-flex;
  align-items: center;
  color: white;
  font-weight: 800 !important;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  position: relative;
  transition: all 0.4s ease;
}

.nav-item {
  display: inline-block;
  padding: 8px 16px;
  position: relative;
  z-index: 0;
  text-decoration: none;
  color: white;
  font-weight: 800;
  font-size: 20px;
  margin-right: 16px;
}

/* .nav-item::before {
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
  opacity: 0.1;
} */

.active-link::before {
  opacity: 0.1;
}

.nav-item:hover .nav-icon,
.active-link .nav-icon {
  stroke: red;
}

.site-title::before {
  content: none !important;
}
</style>
