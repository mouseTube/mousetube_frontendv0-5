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
import { Users, AudioLines, MonitorCog } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();
</script>

<template>
  <v-app-bar role="navigation" color="#0d0d0d" height="56" dense flat>
    <v-row no-gutters align="center" class="w-100" style="min-width: 0">
      <v-col cols="auto" class="d-flex align-center flex-shrink-1" style="min-width: 0">
        <nuxt-link
          to="/"
          class="nuxt-link d-flex align-center text-truncate"
          exact-active-class="active-logo"
        >
          <v-img
            :width="smAndDown ? 40 : 60"
            :height="smAndDown ? 40 : 60"
            src="/logo_mousetube_carre.png"
            alt="mouseTube"
            class="logo-img"
            style="
              background-color: white;
              padding: 4px;
              object-fit: contain;
              max-width: 100%;
              height: auto;
            "
          />
          <span class="ml-2 site-title">MouseTube</span>
        </nuxt-link>
      </v-col>
      <v-col cols="auto" class="nav-links d-flex justify-center align-center">
        <nuxt-link to="/vocalizations" class="nav-item px-2" exact-active-class="active-link">
          <span class="nav-link-content">
            <AudioLines class="nav-icon audio-hover-icon" />
            <span class="nav-label">Vocalizations</span>
          </span>
        </nuxt-link>
        <nuxt-link to="/software" class="nav-item px-2" exact-active-class="active-link">
          <span class="nav-link-content">
            <MonitorCog class="nav-icon audio-hover-icon" />
            <span class="nav-label">Software</span>
          </span>
        </nuxt-link>
        <nuxt-link to="/team" class="nuxt-link nav-item px-2" exact-active-class="active-link">
          <span class="nav-link-content">
            <Users class="nav-icon audio-hover-icon" />
            <span class="nav-label">Team</span>
          </span>
        </nuxt-link>
      </v-col>
      <v-col
        cols="auto"
        class="d-flex align-center"
        style="min-width: 0; flex-shrink: 0; width: 186px; max-width: 200px"
      >
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<style scoped>
@keyframes wiggle {
  0% {
    transform: rotate(0deg) scaleY(1);
  }
  25% {
    transform: rotate(-3deg) scaleY(1.1);
  }
  50% {
    transform: rotate(3deg) scaleY(1.05);
  }
  75% {
    transform: rotate(-2deg) scaleY(1.08);
  }
  100% {
    transform: rotate(0deg) scaleY(1);
  }
}

.nav-item:hover .audio-hover-icon {
  animation: wiggle 0.5s ease-in-out;
}

.logo-img {
  filter: grayscale(30%);
  transition:
    filter 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 50%;
}

.nuxt-link:hover .logo-img,
.active-logo .logo-img {
  filter: grayscale(0%);
  box-shadow:
    inset 0 0 5px rgba(157, 157, 157, 0.5),
    inset 0 0 10px rgba(157, 157, 157, 0.3),
    inset 0 0 20px rgba(157, 157, 157, 0.2);
}

.nav-icon {
  stroke: white;
  transition: stroke 0.3s ease;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.nav-link-content {
  display: inline-flex;
  align-items: center;
}

.nav-label {
  color: white;
  transition: color 0.3s ease;
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
}

.nav-links {
  gap: 16px;
  min-width: 0;
  flex-grow: 2;
  justify-content: center;
  flex-wrap: wrap;
}

@media screen and (max-width: 700px) {
  .nav-item {
    font-size: 16px;
    padding: 8px 12px;
    margin-right: 8px;
  }

  .site-title {
    font-size: 16px;
  }

  .logo-img {
    width: 40px;
  }
}

@media screen and (max-width: 575px) {
  .nav-item {
    font-size: 12px;
    padding: 8px 12px;
    margin-right: 8px;
  }
}

@media screen and (max-width: 540px) {
  .nav-label {
    display: none;
  }
  .nav-icon {
    width: 23px;
    height: 23px;
  }
}

@media screen and (max-width: 350px) {
  .nav-item {
    padding: 0px 4px;
    margin-right: 0px;
    gap: 0px;
  }
  .nav-links {
    gap: 0px;
  }
}

.nav-item:hover .nav-icon,
.active-link .nav-icon {
  stroke: red;
}

.nav-item:hover .nav-label,
.active-link .nav-label {
  color: rgb(193, 193, 193);
}
</style>
