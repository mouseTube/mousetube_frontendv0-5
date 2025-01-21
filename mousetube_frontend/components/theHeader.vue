<!--
Created by Nicolas Torquet at 27/10/2023
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->
<template>
  <v-app-bar color="black">
    <v-app-bar-title>
      <nuxt-link to="/" class="nuxt-link mr-8"><strong>mouseTube</strong></nuxt-link>
      <nuxt-link to="/Vocalizations" class="nuxt-link mr-8">Vocalizations</nuxt-link>
      <nuxt-link to="/Team" class="nuxt-link">Team</nuxt-link>
    </v-app-bar-title>
    <v-row justify="start">
      <v-col cols="6">

      </v-col>

    </v-row>

  </v-app-bar>
</template>

<script>

</script>

<style scoped>
.nuxt-link{
  color: white;
  text-decoration: None;
}

.nuxt-link:hover{
  text-decoration: underline;
}

</style>