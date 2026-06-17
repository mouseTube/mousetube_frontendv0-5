<script setup lang="ts">
////////////////////////////////
// IMPORT
////////////////////////////////

import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { Database } from 'lucide-vue-next';

////////////////////////////////
// DATA
////////////////////////////////

// interface FileType {
//   id: number;
//   name: string;
//   doi?: string | null;
//   link?: string | null;
//   spectrogram_url?: string | null;
//   plot_url?: string | null;
// };
//
// interface DatasetType {
//   id: number;
//   name: string;
//   doi?: string | null;
//   link?: string | null;
//   description?: string;
//   created_at: string;
//   files: FileType[];
// };

const dataLoaded = ref(false);
const datasetList = ref([]);
const next = ref<string | null>(null);
const previous = ref<string | null>(null);
const count = ref(0);
const currentPage = ref(1);
const perPage = ref(10);
const strains = ref({});
const profiles = ref({});
const showGraph = ref(false);
const imageToShow = ref(null);
const altImage = ref('');

const apiBaseUrl = useApiBaseUrl();
const imageFromAPI = apiBaseUrl.split('/api')[0];

// --- panel states for each file (independent) ---
const activePanels = ref<Record<number, boolean>>({});

////////////////////////////////
// METHODS
////////////////////////////////

// --- helpers for file types / icons / ordering ---
function fileExt(name?: string) {
  if (!name) return '';
  const m = name.split('.').pop();
  return (m || '').toLowerCase();
}
function isAudio(ext: string) {
  return ['wav', 'mp3', 'flac', 'ogg', 'm4a', 'aac'].includes(ext);
}
function isImage(ext: string) {
  return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext);
}
function isPdf(ext: string) {
  return ext === 'pdf';
}
function isArchive(ext: string) {
  return ['zip', 'rar', 'tar', 'gz', 'tgz', '7z'].includes(ext);
}
function fileIcon(name?: string) {
  const ext = fileExt(name);
  if (isAudio(ext)) return 'mdi-music';
  if (isImage(ext)) return 'mdi-image';
  if (isPdf(ext)) return 'mdi-file-pdf';
  if (isArchive(ext)) return 'mdi-archive';
  return 'mdi-file';
}
function datasetDownloadLink(dataset: object) {
  if (dataset.link) return dataset.link;
  return `${apiBaseUrl}/dataset/${dataset.id}/download/`;
}
// function sortFiles(files = []) {
//   return [...files].sort((a, b) => {
//     const aIsAudio = isAudio(fileExt(a.name));
//     const bIsAudio = isAudio(fileExt(b.name));
//     if (aIsAudio === bIsAudio) return a.name.localeCompare(b.name);
//     return aIsAudio ? -1 : 1; // audio first
//   });
// }

function getProfiles(dataset: object) {
  let profiles_fun = ref({});
  try {
    for (let recording_session in dataset.metadata.dataset.recording_session_list) {
      for (let profile in dataset.metadata.dataset.recording_session_list[recording_session]
        .animal_profiles) {
        profiles_fun.value[profile] = ref({});
        profiles_fun.value[profile] =
          dataset.metadata.dataset.recording_session_list[recording_session].animal_profiles[
            profile
          ];
      }
    }
  } catch (error) {
    console.error('error while getting profiles :', error);
  } finally {
    return profiles_fun;
  }
}

const incrementDownloadsFile = async (fileId: number, fileLink: string, datasetId: number) => {
  try {
    const response = await axios.patch(`${apiBaseUrl}/file/${fileId}/`, {
      downloads: 'increment',
    });

    if (response.status === 200) {
      const updatedFile = response.data;
      // Update the downloads count in the local files array
      const datasetIndex = datasetList.value.findIndex((dataset) => dataset.id === datasetId);
      const fileIndex = datasetList.value[datasetIndex]['files'].findIndex(
        (file: object) => file.id === fileId
      );
      if (fileIndex !== -1) {
        datasetList.value[datasetIndex]['files'][fileIndex].downloads = updatedFile.downloads;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating file downloads:', error);
  } finally {
    // Always open the file link
    window.open(fileLink, '_blank');
  }
};

function showModal(image: string, typeImage: string) {
  showGraph.value = !showGraph.value;
  imageToShow.value = image;
  altImage.value = typeImage;
}

const incrementDownloadsDataset = async (datasetId: number, datasetLink: string) => {
  try {
    const response = await axios.patch(`${apiBaseUrl}/dataset/${datasetId}/`, {
      downloads: 'increment',
    });

    if (response.status === 200) {
      const updatedDataset = response.data;
      // Update the downloads count in the local files array
      const datasetIndex = datasetList.value.findIndex((dataset) => dataset.id === datasetId);
      if (datasetIndex !== -1) {
        datasetList.value[datasetIndex].downloads = updatedDataset.downloads;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating dataset downloads:', error);
  } finally {
    // Always open the file link
    window.open(datasetLink, '_blank');
  }
};

const fetchDatasets = async (url = `${apiBaseUrl}/dataset/?page_size=${perPage.value}`) => {
  // console.log(url);
  dataLoaded.value = false;
  try {
    const response = await axios.get(url);
    datasetList.value = response.data.results;
    next.value = response.data.next;
    previous.value = response.data.previous;
    count.value = response.data.count;
    currentPage.value = new URL(url).searchParams.get('page') || 1;
    for (let dataset in datasetList.value) {
      profiles.value[dataset] = ref({});
      profiles.value[dataset] = getProfiles(datasetList.value[dataset]);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error while loading dataset :', error);
  } finally {
    dataLoaded.value = true;
  }
};

watch(perPage, async () => fetchDatasets());

onMounted(() => fetchDatasets());
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card variant="flat" class="mx-auto" max-width="1000">
            <!-- TITLE -->
            <div class="d-flex align-center mt-1 mb-4">
              <h1><Database /> Datasets</h1>
              <v-chip v-if="count > 0" class="me-1 my-1 mx-2">{{ count }}</v-chip>
            </div>

            <!-- INFO BLOC -->
            <v-card class="mt-5 mb-5" color="grey-lighten-4">
              <v-card-text>
                Datasets are provided for practical use in research and benchmarking of existing or
                new applications for ultrasonic vocalisation detection and analysis. Datasets
                include multiple recording sessions, gathering recordings covering part of the
                diversity of ultrasonic vocalisations for each species. Each recording is curated
                and manually annotated by two experts. <br />
                The files also underwent automatic detections by different applications (analysis
                parameters are given). You can download the original audio files, as well as the
                results of manual and automatic detections.
              </v-card-text>
            </v-card>

            <!-- LOADING -->
            <v-progress-circular
              v-if="!dataLoaded"
              indeterminate
              color="primary"
              class="d-block mx-auto my-5"
            />

            <!-- EMPTY -->
            <v-alert v-else-if="count === 0" type="info" class="mt-5 border" color="grey-lighten-2">
              <v-row>
                <v-col class="text-center">
                  <h3>No datasets available</h3>
                  <p>Try changing the search term.</p>
                </v-col>
              </v-row>
            </v-alert>

            <!-- LIST DATASETS -->
            <v-container fluid v-else class="pa-0" v-if="dataLoaded">
              <v-card
                v-for="(dataset, index) in datasetList"
                :key="dataset.id"
                class="mt-5 border-sm"
                elevated
              >
                <v-card-title class="d-flex align-center justify-space-between">
                  <div>
                    {{ dataset.name }}
                  </div>

                  <div class="d-flex align-center">
                    <v-chip
                      v-if="dataset.doi"
                      label
                      small
                      color="red lighten-3"
                      text-color="red darken-3"
                      class="me-2"
                    >
                      DOI:
                      <a
                        v-if="dataset.doi.includes('zenodo')"
                        :href="'https://zenodo.org/record/' + dataset.doi.split('zenodo.')[1]"
                        target="_blank"
                        class="doi"
                        >{{ dataset.doi }}</a
                      >
                    </v-chip>

                    <!-- Bouton download compact -->
                    <v-btn
                      icon
                      target="_blank"
                      title="Download dataset (archive)"
                      density="compact"
                      class="ms-1"
                      @click="incrementDownloadsDataset(dataset.id, datasetDownloadLink(dataset))"
                    >
                      <v-icon size="18">mdi-download</v-icon>
                    </v-btn>
                  </div>
                </v-card-title>

                <v-card-text v-if="dataset.description">{{ dataset.description }}</v-card-text>
                <v-divider class="mx-4 mb-2" />

                <!-- FILES -->
                <div v-for="recording_session in dataset.metadata.dataset.recording_session_list">
                  <v-card-text>
                    <h4 class="mb-2">Files:</h4>
                    <v-expansion-panels multiple>
                      <v-expansion-panel v-for="(file, index_file) in dataset.files" :key="file.id">
                        <v-expansion-panel-title>
                          <v-row align="center" justify="space-between" class="w-100">
                            <v-col cols="auto" class="d-flex align-center">
                              <strong># {{ index_file }}</strong>
                            </v-col>
                            <div v-for="(value, key) in recording_session.protocol">
                              <v-col
                                cols="auto"
                                class="d-flex align-center"
                                v-if="
                                  key != 'name' &&
                                  key != 'animals_housing' &&
                                  key != 'context_number_of_animals'
                                "
                              >
                                <v-chip label small color="#03DAC6" class="ma-0">{{
                                  value
                                }}</v-chip>
                              </v-col>
                            </div>

                            <v-col class="d-flex align-center" cols="auto">
                              <v-chip
                                class="ma-0"
                                label
                                color="red-lighten-1"
                                v-if="profiles[index]"
                                v-for="profile in profiles[index]"
                              >
                                {{ profile.strain.name }}
                              </v-chip>
                            </v-col>

                            <v-col cols="auto" class="d-flex align-center">
                              <v-btn
                                v-if="file.link"
                                icon
                                target="_blank"
                                color="teal-darken-2"
                                title="Download file"
                                density="compact"
                                class="ms-1"
                                @click="incrementDownloadsFile(file.id, file.link, dataset.id)"
                              >
                                <v-icon size="18">mdi-download</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                          <v-card>
                            <v-card-title>
                              {{ file.name }}
                            </v-card-title>
                            <v-card-text>
                              <v-dialog v-model="showGraph" width="80%" v-if="imageToShow">
                                <v-card :title="altImage">
                                  <v-img
                                    v-if="imageToShow"
                                    :src="imageToShow"
                                    :alt="altImage"
                                    contain
                                  />
                                  <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn text="Close" variant="text" @click="showModal"></v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>

                              <v-row>
                                <v-col cols="12" sm="6" v-if="file.spectrogram">
                                  <v-img
                                    @click="
                                      showModal(imageFromAPI + file.spectrogram, 'Spectrogram')
                                    "
                                    :src="`${imageFromAPI}` + file.spectrogram"
                                    alt="Spectrogram"
                                    contain
                                  />
                                </v-col>
                                <v-col cols="12" sm="6" v-if="file.plot">
                                  <v-img
                                    @click="showModal(imageFromAPI + file.plot, 'Comparison plot')"
                                    :src="`${imageFromAPI}` + file.plot"
                                    alt="Comparison plot"
                                    contain
                                  />
                                </v-col>
                              </v-row>
                            </v-card-text>
                            <v-card-actions class="d-flex align-center">
                              <v-row>
                                <v-col cols="11" class="ml-4">
                                  <v-chip
                                    v-if="file.doi"
                                    label
                                    small
                                    color="red lighten-3"
                                    text-color="red darken-3"
                                    class="me-2"
                                  >
                                    DOI:
                                    <a
                                      v-if="file.doi.includes('zenodo')"
                                      :href="
                                        'https://zenodo.org/record/' + file.doi.split('zenodo.')[1]
                                      "
                                      target="_blank"
                                      class="doi"
                                      >{{ file.doi }}</a
                                    >
                                  </v-chip>
                                </v-col>
                                <v-col class="align-end">
                                  <v-badge
                                    :content="file.downloads + ' Downloads'"
                                    color="red-lighten-5"
                                    class="align-end"
                                  >
                                    <template #badge>
                                      <div
                                        style="
                                          background-color: transparent;
                                          font-size: 0.875rem;
                                          color: gray;
                                          border-radius: 12px;
                                        "
                                      >
                                        <v-icon style="font-size: 0.875rem; color: gray"
                                          >mdi-download</v-icon
                                        >
                                        <span style="margin-left: 8px">{{ file.downloads }}</span>
                                      </div>
                                    </template>
                                  </v-badge>
                                </v-col>
                              </v-row>
                            </v-card-actions>
                          </v-card>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card-text>

                  <v-card-actions class="d-flex align-center">
                    <v-row>
                      <v-col cols="11">
                        <v-chip class="ma-2" label color="red-lighten-1">
                          {{ dataset.species.name }}
                        </v-chip>
                      </v-col>
                      <v-col class="align-end">
                        <v-badge
                          :content="dataset.downloads + ' Downloads'"
                          color="red-lighten-5"
                          class="text-end"
                        >
                          <template #badge>
                            <div
                              style="
                                background-color: transparent;
                                font-size: 0.875rem;
                                color: gray;
                                border-radius: 12px;
                              "
                            >
                              <v-icon style="font-size: 0.875rem; color: gray">mdi-download</v-icon>
                              <span style="margin-left: 8px">{{ dataset.downloads }}</span>
                            </div>
                          </template>
                        </v-badge>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </div>
              </v-card>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.hover-effect:hover {
  transform: scale(1.05);
  background-color: rgb(247, 226, 226);
}

a {
  text-decoration: none;
  color: rgb(219, 98, 98);
}

.doi:hover {
  text-decoration: underline;
}

li {
  list-style: none;
}
</style>
