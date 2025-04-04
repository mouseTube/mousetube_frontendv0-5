<!--
Created by Nicolas Torquet at 10/01/2025
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->

<script setup>

////////////////////////////////
// IMPORT
////////////////////////////////

import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { debounce } from "lodash";

////////////////////////////////
// DATA
////////////////////////////////

const dataLoaded = ref(false);
const search = ref("");
const files = ref([]);
const next = ref(null);
const previous = ref(null);
const count = ref(0);
const currentPage = ref(1);
const perPage = ref(10);

////////////////////////////////
// METHODS
////////////////////////////////

/**
 * Fetch files from the API
 * @param {string} url - The URL to fetch data from
 */
const fetchFiles = async (url = `http://127.0.0.1:8000/api/file/?page_size=${perPage.value}`) => {
  dataLoaded.value = false;
  try {
    const response = await axios.get(url);
    files.value = response.data.results;
    next.value = response.data.next;
    previous.value = response.data.previous;
    count.value = response.data.count;
    currentPage.value = new URL(url).searchParams.get("page") || 1;
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers :", error);
  } finally {
    dataLoaded.value = true;
  }
};

/**
 * Debounced search function
 * @param {string} searchTerm - The search term to filter files
 */
const onSearch = debounce(() => {
  fetchFiles(`http://127.0.0.1:8000/api/file/?search=${encodeURIComponent(search.value)}&page_size=${perPage.value}`);
}, 300);

watch(perPage, () => {
  fetchFiles();
});

onMounted(() => fetchFiles());
</script>

<template>
  <v-main>
    <v-container>
      <h1>Vocalizations</h1>
      <v-row>
        <v-col>
          <v-card variant="flat" class="mx-auto" max-width="1000">
            <v-progress-circular v-if="!dataLoaded" indeterminate color="primary" class="d-block mx-auto my-5"></v-progress-circular>
            <v-data-iterator v-else class="mt-5" :items="files" :items-per-page="perPage">
              <template v-slot:header>
                <v-toolbar class="px-2">
                  <v-text-field
                    v-model="search"
                    @input="onSearch"
                    density="comfortable"
                    placeholder="Search"
                    prepend-inner-icon="mdi-magnify"
                    style="max-width: 300px;"
                    variant="solo"
                    clearable
                    hide-details
                  />
                  <v-spacer></v-spacer>

                  <v-select
                    v-model="perPage"
                    :items="[10, 20, 50, 100]"
                    density="compact"
                    variant="outlined"
                    style="max-width: 100px; font-size: 12px;"
                    attach="body"
                    :menu-props="{ contentClass: 'select-dropdown-zfix' }"
                    hide-details
                  />
                </v-toolbar>
              </template>

              <template v-slot:default="{ items }">
                <v-container class="pa-2" fluid>
                  <v-card class="mt-5" v-for="({ raw: file }) in items" :key="file.id" variant="tonal">
                    <v-card-title>
                      {{ file.link_file.split('/').pop() }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ file.experiment.protocol.user.first_name_user }} {{ file.experiment.protocol.user.name_user }}
                    </v-card-subtitle>
                    <v-card-item>
                      <v-label class="mr-2">Name subject: </v-label>{{ file.subject.name_subject }}<br />
                      <v-label class="mr-2">Strain: </v-label>{{ file.subject.strain_subject.name_strain }}<br />
                      <v-label class="mr-2">Protocol name: </v-label>{{ file.experiment.protocol.name_protocol }}<br />
                    </v-card-item>

                    <!-- Expansion Panel -->
                    <v-expansion-panels>
                      <v-expansion-panel title="More information" bg-color="grey-lighten-3">
                        <v-expansion-panel-text>
                          <v-card class="mx-auto my-2 pt-2 pl-2" title="Subject">
                            <v-card-item>
                              <v-card-text>
                                <v-label class="mr-2">Strain: </v-label>{{ file.subject.strain_subject.name_strain }}<br />
                                <v-label class="mr-2">Background: </v-label>{{ file.subject.strain_subject.background }}<br />
                                <v-label class="mr-2">Bibliography: </v-label>{{ file.subject.strain_subject.biblio_strain }}<br />

                                <ul class="ml-3 mt-2">
                                  <li><v-label class="mr-2">Name: </v-label>{{ file.subject.name_subject }}</li>
                                  <li><v-label class="mr-2">Origin: </v-label>{{ file.subject.origin_subject }}</li>
                                  <li><v-label class="mr-2">Sex: </v-label>{{ file.subject.sex_subject }}</li>
                                  <li><v-label class="mr-2">Group: </v-label>{{ file.subject.group_subject }}</li>
                                  <li><v-label class="mr-2">Genotype: </v-label>{{ file.subject.genotype_subject }}</li>
                                  <li><v-label class="mr-2">Treatment: </v-label>{{ file.subject.treatment }}</li>
                                </ul>
                              </v-card-text>
                            </v-card-item>
                          </v-card>

                          <v-card class="mx-auto my-2 pt-2 pl-2" title="Protocol">
                            <v-card-text>
                              <v-label class="mr-2">Protocol name: </v-label>{{ file.experiment.protocol.name_protocol }}<br />
                              <v-label class="mr-2">Number of files: </v-label>{{ file.experiment.protocol.number_files }}<br />
                              <v-label class="mr-2">Description: </v-label> {{ file.experiment.protocol.protocol_description }}
                            </v-card-text>
                          </v-card>

                          <v-card class="mx-auto my-2 pt-2 pl-2" title="Experiment">
                            <v-card-text>
                              <ul class="ml-3 mt-2">
                                <li><v-label class="mr-2">Name experiment: </v-label>{{ file.experiment.name_experiment }}</li>
                                <li><v-label class="mr-2">Group: </v-label>{{ file.experiment.group_subject }}</li>
                                <li><v-label class="mr-2">Date: </v-label>{{ file.experiment.date_experiment }}</li>
                                <li><v-label class="mr-2">File number: </v-label>{{ file.file_number }}</li>
                                <li><v-label class="mr-2">Temperature: </v-label>{{ file.experiment.temperature }}</li>
                                <li><v-label class="mr-2">Light cycle: </v-label>{{ file.experiment.light_cycle }}</li>
                                <li><v-label class="mr-2">Microphone: </v-label>{{ file.experiment.microphone }}</li>
                              </ul>
                            </v-card-text>
                          </v-card>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-divider class="mx-4"></v-divider>

                    <!-- Actions: DOI et Download -->
                    <v-card-actions>
                      <v-btn color="red-darken-4" prepend-icon="mdi-download">
                        <a :href="file.link_file" target="_blank">Download</a>
                      </v-btn>
                      <v-chip class="ma-2" label color="red-darken-4" v-if="file.doi_file">
                        DOI:
                        <a v-if="file.doi_file.includes('zenodo')" 
                          :href="'https://zenodo.org/record/' + file.doi_file.split('zenodo.')[1]" 
                          target="_blank"> {{ file.doi_file }}
                        </a>
                      </v-chip>
                      <span v-if="file.notes_file"><strong class="mr-2">Notes:</strong> {{ file.notes_file }}</span>
                    </v-card-actions>
                  </v-card>
                </v-container>
              </template>
            </v-data-iterator>

            <!-- Pagination -->
            <div class="d-flex align-center justify-center pa-4">
              <v-btn :disabled="!previous" icon="mdi-arrow-left" density="comfortable" variant="tonal" rounded @click="fetchFiles(previous)"></v-btn>
              <div class="mx-2 text-caption">
                Page {{ currentPage }} / {{ Math.ceil(count / perPage) }}
              </div>
              <v-btn :disabled="!next" icon="mdi-arrow-right" density="comfortable" variant="tonal" rounded @click="fetchFiles(next)"></v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<style scoped>
a{
  text-decoration: none;
  color: #B71C1C;
}

a:hover{
  text-decoration: underline;
}

li{
  list-style: none;

}

</style>