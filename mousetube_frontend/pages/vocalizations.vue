<!--
Created by Nicolas Torquet at 10/01/2025
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->

<template>
  <v-main>
    <v-container>
      <h1>Vocalizations</h1>

      <v-skeleton-loader type="article" v-if="loading"></v-skeleton-loader>

      <v-data-iterator v-else class="mt-5" :items="files" :items-per-page="20">
        <template v-slot:default="{ items }">
          <v-container class="pa-2" fluid>
            <v-card class="mt-5" v-bind="file" v-for="file in items">
              <v-card-title>{{ file.raw.link_file.split("/")[file.raw.link_file.split("/").length-1] }}</v-card-title>
              <v-card-subtitle>{{ file.raw.experiment.protocol.user.first_name_user }} {{ file.raw.experiment.protocol.user.name_user }}</v-card-subtitle>

              <v-card-item>
                <h4>Subjects</h4>


              </v-card-item>

              <v-divider class="mx-4 mt-2 mb-1"></v-divider>

              <v-card-actions>
                <v-btn color="teal-accent-4" prepend-icon="mdi-download">
                  <a :href="file.raw.link_file" target="_blank">Download</a>
                </v-btn>
                <v-chip class="ma-2" label color="#03DAC6">
                  <strong>DOI:</strong> {{ file.raw.doi_file }}
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-container>
        </template>

        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              :disabled="page === 1"
              icon="mdi-arrow-left"
              density="comfortable"
              variant="tonal"
              rounded
              @click="prevPage"
            ></v-btn>

            <div class="mx-2 text-caption">
              Page {{ page }} of {{ pageCount }}
            </div>

            <v-btn
              :disabled="page >= pageCount"
              icon="mdi-arrow-right"
              density="comfortable"
              variant="tonal"
              rounded
              @click="nextPage"
            ></v-btn>
          </div>
        </template>
      </v-data-iterator>

    </v-container>
  </v-main>
</template>


<script>
import axios from "axios"
export default {
  name: "vocalizations",
  data: function() {
    return {
      loading: true,
      files: []
    }
  },
  methods: {
    getFiles() {
      axios.get(`http://127.0.0.1:8000/api/file/`)
          .then(response => {
            this.files = response.data
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })
    }
  },
  mounted() {
    this.getFiles()
    this.loading = false
  }
}
</script>


<style scoped>

</style>