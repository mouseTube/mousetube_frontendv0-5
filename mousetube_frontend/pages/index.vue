<!--
Created by Nicolas Torquet at 27/10/2023
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->
<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-card
            variant="flat"
            class="mx-auto"
            max-width="800"
          >
            <v-img cover :width="600" src="/logo_mousetube_big.png" alt="logo mouseTube"></v-img>
            <v-card-title class="text-h2 mt-5">Welcome to mouseTube</v-card-title>
            <v-card-text>
              <v-row justify="center" no-gutters>
                <v-col
                  class="text-h4"
                >
                  {{ numberOfFiles }} vocalisation files available now!
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-item>
              <v-card class="mx-auto my-2 pt-2 pl-2" variant="tonal" title="What is mouseTube">
                <v-card-text>
                  Rodents communicate with each other through their various sensory modalities: olfaction (scent marking, glands),
                  vision (postures), touch (contacts) and hearing (vocalizations). In the latter case, vocalizations are mainly emitted
                  in the ultrasonic range, beyond human perception capabilities (Anderson, 1954; Brudzynski, 2005, 2021; Portfors, 2007;
                  Schweinfurth, 2020). Ultrasonic vocalizations are emitted in various contexts: by isolated pups during the first
                  two weeks of life, by juveniles and adults during same-sex social interactions, by males in the presence of females,
                  and by individuals in aversive or appetitive situations (restraint stress, anticipation of pain, social play, food
                  rewards) and exploring an unfamiliar environment. These ultrasonic vocalizations are used as markers of motivation
                  and social communication (Fischer and Hammerschmidt, 2010; Schweinfurth, 2020), or of susceptibility to stress or anxiety,
                  depending on the type of signal examined (Brudzynski, 2005). Ultrasonic vocalizations are therefore routinely measured
                  in rodent models of neuropsychiatric conditions (Premoli et al., 2023).
                </v-card-text>
                <v-card-text>
                  The mechanisms of production, the temporal organization into sequences, the significance of the acoustic features and the
                  effect on the recipient are far from elucidated. Understanding the complexity of this communication system requires
                  a vast amount of data to explore with high-performance analysis methods. For that purpose, we developed <strong>mouseTube</strong>, a database
                  designed to facilitate sharing, archiving and analysing raw recording files of rodent ultrasonic vocalisations following the
                  FAIR (Findable, Accessible, Interoperable, Reusable) principles (<nuxt-link href="https://doi.org/10.1038/sdata.2016.18" target="_blank">Wilkinson et al., 2016</nuxt-link>).
                </v-card-text>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-2 pl-2" variant="tonal" title="Call for papers">
                <v-card-text>
                  Working on ultrasonic vocalizations? Together, Dr. Elodie Ey and Dr. Markus Wöhr are serving as guest editors for a Behavioural Brain Research special issue on Ultrasonic Communication in Rodents. They are more than happy to learn about your most recent discoveries.<br />
                  <br />
                  More information here: <nuxt-link href="https://www.sciencedirect.com/special-issue/317071/ultrasonic-communication-in-rodents" target="_blank">Behavioural Brain Research - Ultrasonic Communication in Rodents</nuxt-link>
                </v-card-text>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card
                variant="tonal"
                class="mx-auto my-2 pt-2 pl-2"
                title="Check out the mouseTube's publications:"
              >
                <v-card-text>
                  <v-list>
                    <v-list-item>
                      Torquet N., de Chaumont F., Faure P., Bourgeron T., Ey E. mouseTube – a database to collaboratively
                      unravel mouse ultrasonic communication [version 1; peer review: 2 approved].
                      F1000Research 2016, 5:2332 (<nuxt-link href="https://doi.org/10.12688/f1000research.9439.1" target="_blank">https://doi.org/10.12688/f1000research.9439.1</nuxt-link>) (2016).
                    </v-list-item>
                    <v-list-item>
                      Ferhat A. T., Torquet N., Le Sourd A. M., de Chaumont F., Olivo-Marin J. C.,
                      Faure P., Bourgeron T., Ey E. Recording Mouse Ultrasonic Vocalizations to Evaluate Social Communication.
                      J. Vis. Exp. (112), e53871, <nuxt-link href="https://dx.doi.org/10.3791/53871" target="_blank">doi:10.3791/53871</nuxt-link> (2016).
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <nuxt-link to="https://mastodon.social/@mousetube" target="_blank" class="nuxt-link"><v-btn prepend-icon="mdi-mastodon">Follow mouseTube on Mastodon</v-btn></nuxt-link>
                </v-card-actions>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-2 pl-2" variant="tonal" title="About this version">
                <v-card-text>
                  This is a temporary version of <strong>mouseTube</strong>.<br /> This version uses the same database as the initial version but with more recent and safer technologies.

                  New functionalities since the first launch in 2014 (Ferhat et al., 2016; Torquet et al., 2016):
                  <v-list>
                    <v-list-item class="mt-0">- Data are accessible without authentication.</v-list-item>
                    <v-list-item class="mt-0">- The search engine will be optimised through key words.</v-list-item>
                  </v-list>
                  We are currently developing a new version with more functionalities.
                </v-card-text>
              </v-card>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <logo-strip></logo-strip>
      </v-row>
    </v-container>
  </v-main>

</template>



<script>
import axios from "axios";

export default {
  name: "index",
  data: function () {
    return {
      numberOfFiles: [],
    }
  },
  methods: {
    getNumberOfFiles() {
      axios.get(`http://127.0.0.1:8000/api/file`)
          .then(response => {
            this.numberOfFiles = response.data.length
            console.log(this.numberOfFiles)
            this.dataLoaded = true
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })
    },

  },
  mounted() {
    this.getNumberOfFiles()
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

</style>