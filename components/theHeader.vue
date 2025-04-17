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
            <span class="ml-3 nuxt-link nav-item">MouseTube</span>
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
.nuxt-link {
  color: white;
  text-decoration: None;
  padding: 5px;
}

.nav-item {
  position: relative;
  display: inline-block;
  padding: 8px 16px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  text-decoration: none;
  transition: color 0.3s;
  z-index: 0;
}

.nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.363);
  border-radius: 12px;
  opacity: 0;
  transition:
    opacity 0.3s,
    transform 0.3s,
    box-shadow 0.3s;
  z-index: -1;
}

span.nav-item::before {
  content: none !important;
  display: none !important;
}

@keyframes giggle {
  0% {
    transform: scaleX(1) scaleY(1) rotate(0deg);
  }
  25% {
    transform: scaleX(1.1) scaleY(1) rotate(2deg);
  }
  50% {
    transform: scaleX(1) scaleY(1) rotate(0deg);
  }
  75% {
    transform: scaleX(1.1) scaleY(1) rotate(-2deg);
  }
  100% {
    transform: scaleX(1) scaleY(1) rotate(0deg);
  }
}

.nav-item:hover::before,
.active-link::before {
  opacity: 1;
  box-shadow: 0 0 12px rgba(248, 247, 247, 0.336);
  animation: giggle 0.3s ease-in-out;
}

.nav-item:hover,
.active-link {
  color: white;
}
</style>
