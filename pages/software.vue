<script setup>
////////////////////////////////
// IMPORT
////////////////////////////////

import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { debounce } from 'lodash';
import { MonitorCog } from 'lucide-vue-next';

////////////////////////////////
// DATA
////////////////////////////////

const dataLoaded = ref(false);
const search = ref('');
const softwareList = ref([]);
const next = ref(null);
const previous = ref(null);
const count = ref(0);
const currentPage = ref(1);
const perPage = ref(10);
const showFilters = ref(false);
const filters = ref(['software_type']);
const apiBaseUrl = useApiBaseUrl();
const softwareTypeFilter = ref('all');

////////////////////////////////
// METHODS
////////////////////////////////

/**
 * Fetch software from the API
 * @param {string} url - The URL to fetch data from
 */
const fetchSoftware = async (
  url = `${apiBaseUrl}/software/?page_size=${perPage.value}&filter=${filters.value}`
) => {
  dataLoaded.value = false;
  try {
    const response = await axios.get(url);
    softwareList.value = response.data.results;
    next.value = response.data.next;
    previous.value = response.data.previous;
    count.value = response.data.count;
    currentPage.value = new URL(url).searchParams.get('page') || 1;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error while loading software :', error);
  } finally {
    dataLoaded.value = true;
  }
};

/**
 * Debounced search function
 * @param {string} searchTerm - The search term to filter software
 */
const onSearch = debounce(() => {
  fetchSoftware(
    `${apiBaseUrl}/software/?search=${encodeURIComponent(search.value)}&page_size=${perPage.value}&filter=${filters.value}`
  );
}, 600);

const onToggleAcquisition = () => {
  const index = filters.value.indexOf('software_type');
  if (index > -1) {
    filters.value.splice(index, 1);
  } else {
    filters.value.push('software_type');
  }
  onSearch();
};

const onToggleSoftwareType = () => {
  const index = filters.value.indexOf('software_type');
  if (index > -1) {
    filters.value.splice(index, 1);
  } else {
    filters.value.push('software_type');
  }
  onSearch();
};

////////////////////////////////
// WATCHER
////////////////////////////////

watch(perPage, async () => {
  await fetchSoftware();
});

watch(search, async (newSearch) => {
  if (newSearch === null) {
    search.value = '';
    await fetchSoftware();
  }
});

////////////////////////////////
// ONMOUNTED
////////////////////////////////
onMounted(() => fetchSoftware());
</script>

<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-card variant="flat" class="mx-auto" max-width="1000">
            <div class="d-flex align-center mt-1 mb-4">
              <h1><MonitorCog /> Software</h1>
              <v-chip v-if="count > 0" class="me-1 my-1 mx-2">
                {{ count }}
              </v-chip>
            </div>
            <!-- Search bar  -->
            <v-toolbar rounded="lg" class="px-2 border-sm">
              <v-text-field
                v-model="search"
                @input="onSearch"
                density="comfortable"
                placeholder="Search"
                prepend-inner-icon="mdi-magnify"
                style="max-width: 300px"
                variant="solo"
                clearable
                hide-details
                :autofocus="true"
              />
              <v-spacer></v-spacer>

              <v-select
                v-model="perPage"
                :items="[10, 20, 50, 100]"
                density="compact"
                variant="outlined"
                style="max-width: 100px; font-size: 12px"
                attach="body"
                :menu-props="{ contentClass: 'select-dropdown-zfix' }"
                hide-details
              />

              <v-btn icon="mdi-filter-variant" @click="showFilters = !showFilters" variant="text" />
            </v-toolbar>
            <!-- Filtres -->
            <div class="px-10">
              <v-expand-transition>
                <v-sheet
                  v-if="showFilters"
                  color="grey-lighten-4"
                  class="pa-4 mt-2 mb-4 rounded-lg border elevation-1"
                  mx-auto
                >
                  <h3 class="text-subtitle-1 mb-2">Filters</h3>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        :model-value="filters.includes('software_type')"
                        @change="onToggleAcquisition"
                        label="Acquisition"
                        density="compact"
                        hide-details
                        class="py-0"
                      />
                      <v-checkbox
                        :model-value="filters.includes('software_type')"
                        @change="onToggleAnalysis"
                        label="Analysis"
                        density="compact"
                        hide-details
                        class="py-0"
                      />
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-expand-transition>
            </div>
            <!-- Loading spinner  -->
            <v-progress-circular
              v-if="!dataLoaded"
              indeterminate
              color="primary"
              class="d-block mx-auto my-5"
            ></v-progress-circular>
            <!-- No data message -->
            <v-alert
              v-else-if="(count === 0) & dataLoaded"
              class="mt-5 border"
              type="info"
              color="grey-lighten-2"
            >
              <v-row>
                <v-col class="text-center">
                  <h3>No software available</h3>
                  <p>Try to change the search term or remove the filters.</p>
                </v-col>
              </v-row>
            </v-alert>
            <!-- Data display -->
            <v-data-iterator v-else class="mt-5" :items="softwareList" :items-per-page="perPage">
              <template v-slot:default="{ items }">
                <v-container class="pa-2" fluid>
                  <v-card
                    class="mt-5 border-sm"
                    v-for="{ raw: software } in items"
                    :key="software.id"
                    elevated
                  >
                    <v-card-title>
                      {{ software.software_name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ software.software_type }}
                    </v-card-subtitle>
                    <v-card-item class="bg-surface-light pt-4">
                      <v-label class="mr-2">Made by: </v-label>{{ software.made_by }}<br />
                      <v-label class="mr-2">Description: </v-label>{{ software.description }}<br />
                    </v-card-item>

                    <!-- Users Section -->
                    <v-expansion-panels>
                      <v-expansion-panel title="Users" bg-color="grey-lighten-2">
                        <v-expansion-panel-text>
                          <v-card class="mx-auto my-2 pt-2 pl-2" title="User Information">
                            <v-card-item v-for="user in software.users" :key="user.id">
                              <v-card-text>
                                <v-label class="mr-2">Name: </v-label>{{ user.first_name_user }} {{ user.name_user }}<br />
                                <v-label class="mr-2">Email: </v-label>{{ user.email_user }}<br />
                              </v-card-text>
                            </v-card-item>
                          </v-card>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-divider class="mx-4"></v-divider>

                  </v-card>
                </v-container>
              </template>
            </v-data-iterator>

            <!-- Pagination -->
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="!previous"
                icon="mdi-arrow-left"
                density="comfortable"
                variant="tonal"
                rounded
                @click="fetchSoftware(previous)"
              ></v-btn>
              <div class="mx-2 text-caption">
                Page {{ currentPage }} / {{ Math.ceil(count / perPage) }}
              </div>
              <v-btn
                :disabled="!next"
                icon="mdi-arrow-right"
                density="comfortable"
                variant="tonal"
                rounded
                @click="fetchSoftware(next)"
              ></v-btn>
            </div>
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