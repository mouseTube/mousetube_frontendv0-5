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
      <v-row>
        <v-col>
          <v-card
            variant="flat"
            class="mx-auto"
            max-width="1000"
          >
            <v-skeleton-loader type="article" v-if="!dataLoaded"></v-skeleton-loader>

            <v-data-iterator v-else class="mt-5" :items="files" :items-per-page="20" :search="search">
              <template v-slot:header>
                <v-toolbar class="px-2">
                  <v-text-field
                    v-model="search"
                    density="comfortable"
                    placeholder="Search"
                    prepend-inner-icon="mdi-magnify"
                    style="max-width: 300px;"
                    variant="solo"
                    clearable
                    hide-details
                  ></v-text-field>
                </v-toolbar>
              </template>

              <template v-slot:default="{ items }">
                <v-container class="pa-2" fluid>
                  <v-card class="mt-5" v-bind="file" v-for="file in items" variant="tonal">
                    <v-card-title>{{ file.raw.link_file.split("/")[file.raw.link_file.split("/").length-1] }}</v-card-title>
                    <v-card-subtitle>{{ file.raw.experiment.protocol.user.first_name_user }} {{ file.raw.experiment.protocol.user.name_user }}</v-card-subtitle>
                    <v-card-item>
                      <v-label class="mr-2">Name subject: </v-label>{{ file.raw.subject.name_subject }}<br />
                      <v-label class="mr-2">Strain: </v-label>{{ file.raw.subject.strain_subject.name_strain }}<br />
                      <v-label class="mr-2">Protocol name: </v-label>{{ file.raw.experiment.protocol.name_protocol }}<br />
                    </v-card-item>


                    <v-card-item>
                      <v-expansion-panels>
                        <v-expansion-panel title="More information" bg-color="grey">
                          <v-expansion-panel-text>
                              <v-card class="mx-auto my-2 pt-2 pl-2" title="Subject">
                                <v-card-item>
                                  <v-card-text>
                                    <v-label class="mr-2">Strain: </v-label>{{ file.raw.subject.strain_subject.name_strain }}<br />
                                    <v-label class="mr-2">Background</v-label>{{ file.raw.subject.strain_subject.background }}<br />
                                    <v-label class="mr-2">Bibliography strain</v-label>{{ file.raw.subject.strain_subject.biblio_strain }}<br />

                                    <ul class="ml-3 mt-2">
                                      <li><v-label class="mr-2">Name: </v-label>{{ file.raw.subject.name_subject }}</li>
                                      <li><v-label class="mr-2">Origin: </v-label>{{ file.raw.subject.origin_subject }}</li>
                                      <li><v-label class="mr-2">Sex: </v-label>{{ file.raw.subject.sex_subject }}</li>
                                      <li><v-label class="mr-2">Group: </v-label>{{ file.raw.subject.group_subject }}</li>
                                      <li><v-label class="mr-2">Genotype: </v-label>{{ file.raw.subject.genotype_subject }}</li>
                                      <li><v-label class="mr-2">Treatment: </v-label>{{ file.raw.subject.treatment }}</li>
                                    </ul>
                                  </v-card-text>
                                </v-card-item>
                              </v-card>

                              <v-card class="mx-auto my-2 pt-2 pl-2" title="Protocol">
                                <v-card-text>
                                  <v-label class="mr-2">Protocol name: </v-label>{{ file.raw.experiment.protocol.name_protocol }}<br />
                                  <v-label class="mr-2">Number of files: </v-label>{{ file.raw.experiment.protocol.number_files }}<br />
                                  <v-label class="mr-2">Description: </v-label> {{ file.raw.experiment.protocol.protocol_description }}
                                </v-card-text>
                              </v-card>

                              <v-card class="mx-auto my-2 pt-2 pl-2" title="Experiment">
                                <v-card-text>
                                  <ul class="ml-3 mt-2">
                                    <li><v-label class="mr-2">Name experiment: </v-label>{{ file.raw.experiment.name_experiment }}</li>
                                    <li><v-label class="mr-2">Group: </v-label>{{ file.raw.experiment.group_subject }}</li>
                                    <li><v-label class="mr-2">Date experiment: </v-label>{{ file.raw.experiment.date_experiment }}</li>
                                    <li><v-label class="mr-2">File number:</v-label> {{ file.raw.file_number }}</li>
                                    <li><v-label class="mr-2">Temperature: </v-label>{{ file.raw.experiment.temperature }}</li>
                                    <li><v-label class="mr-2">Light cycle: </v-label>{{ file.raw.experiment.light_cycle }}</li>
                                    <li><v-label class="mr-2">Microphone: </v-label>{{ file.raw.experiment.microphone }}</li>
                                    <li><v-label class="mr-2">Acquisition hardware: </v-label>{{ file.raw.experiment.acquisition_hardware }}</li>
                                    <li><v-label class="mr-2">Acquisition software: </v-label>{{ file.raw.experiment.acquisition_software }}</li>
                                    <li><v-label class="mr-2">Sampling rate: </v-label>{{ file.raw.experiment.sampling_rate }}</li>
                                    <li><v-label class="mr-2">Bit Depth: </v-label>{{ file.raw.experiment.bit_depth }}</li>
                                    <li><v-label class="mr-2">Laboratory: </v-label>{{ file.raw.experiment.laboratory }}</li>
                                  </ul>
                                </v-card-text>
                              </v-card>
                            </v-expansion-panel-text>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-card-item>



                    <v-divider class="mx-4 mt-2 mb-1"></v-divider>

                    <v-card-actions>
                      <v-btn color="red-darken-4" prepend-icon="mdi-download">
                        <a :href="file.raw.link_file" target="_blank">Download</a>
                      </v-btn>
                      <v-chip class="ma-2" label color="red-darken-4" v-if="file.raw.doi_file">
                        <strong class="mr-2">DOI:</strong> {{ file.raw.doi_file }}
                      </v-chip>
                      <span v-if="file.raw.notes_file"><strong class="mr-2">Notes:</strong> {{ file.raw.notes_file }}</span>
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>
import axios from "axios"
export default {
  name: "vocalizations",
  data: function() {
    return {
      dataLoaded: false,
      search: '',
      files: []
    }
  },
  methods: {
    getFiles() {
      axios.get(`http://127.0.0.1:8000/api/file/`)
          .then(response => {
            this.files = response.data
            this.allInfoAboutFile()
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })
    },
    allInfoAboutFile() {
      for(let file in this.files){
        this.files[file]['info'] = []
        for(let item in this.files[file]['subject']) {
          if (item == "user") {
            for (let user in this.files[file]['subject']['user']) {
              this.files[file]['info'].push(this.files[file]['subject']['user'][user])
            }
          } else if (item == "strain_subject") {
            for (let user in this.files[file]['subject']['strain_subject']) {
              this.files[file]['info'].push(this.files[file]['subject']['strain_subject'][user])
            }
          } else {
            this.files[file]['info'].push(this.files[file]['subject'][item])
          }
        }

        for(let item in this.files[file]['experiment']) {
          if (item == "protocol") {
            for (let protocol in this.files[file]['experiment']['protocol']) {
              this.files[file]['info'].push(this.files[file]['experiment']['protocol'][protocol])
            }
          } else {
            this.files[file]['info'].push(this.files[file]['experiment'][item])
          }
        }
      }
    }
  },
  mounted() {
    this.getFiles()
    this.dataLoaded = true
  }
}
</script>


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