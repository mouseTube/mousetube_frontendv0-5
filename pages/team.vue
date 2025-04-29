<!--
Created by Nicolas Torquet at 16/11/2023
torquetn@igbmc.fr
Copyright: CNRS - INSERM - UNISTRA - ICS - IGBMC
CNRS - Mouse Clinical Institute
PHENOMIN, CNRS UMR7104, INSERM U964, Université de Strasbourg
Code under GPL v3.0 licence
-->

<script setup>
// Team page
import { Users } from 'lucide-vue-next';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  if (route.hash) {
    setTimeout(() => {
      const el = document.querySelector(route.hash)
      if (el) {
        const yOffset = -80
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 200)
  }
})
</script>

<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-card variant="flat" class="mx-auto" max-width="800">
            <!-- <v-img
              cover
              :width="500"
              src="/logo_mousetube_big.png"
              alt="logo mouseTube"
              class="mx-auto d-block"
              style="min-height: 249px"
            /> -->
            <h1 class="ml-5 text-center mt-1"><Users /> Team and information</h1>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-2 pl-2 rounded-lg border elevation-3" variant="tonal">
                <v-card-title class="font-weight-bold mx-4 my-4">
                  <v-icon class="me-2">mdi-account-group-outline</v-icon>
                  The mouseTube Team
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item
                      ><strong>Elodie Ey</strong> (PhD -
                      <nuxt-link
                        to="http://www.igbmc.fr/research/department/4/team/45/"
                        target="_blank"
                        >Physiopathology of aneuploidy, gene dosage effect and Down
                        syndrome</nuxt-link
                      >
                      -
                      <nuxt-link to="https://www.igbmc.fr/" target="_blank"
                        >CNRS UMR 7104 - Institut de Génétique et de Biologie Moléculaire et
                        Cellulaire: IGBMC</nuxt-link
                      >, Fr)
                    </v-list-item>
                    <v-list-item
                      ><strong>Nicolas Torquet</strong> (Research and Development pole -
                      <nuxt-link to="http://www.ics-mci.fr/en/" target="_blank"
                        >Institut Clinique de la Souris</nuxt-link
                      >
                      -
                      <nuxt-link to="https://www.igbmc.fr/" target="_blank"
                        >CNRS UMR 7104 - Institut de Génétique et de Biologie Moléculaire et
                        Cellulaire: IGBMC</nuxt-link
                      >, Fr)
                    </v-list-item>
                    <v-list-item
                      ><strong>Emma Cahill</strong> (PhD - lecturer at
                      <nuxt-link to="https://www.bristol.ac.uk/phys-pharm-neuro/" target="_blank"
                        >School of Physiology, Pharmacology and Neuroscience</nuxt-link
                      >
                      -
                      <nuxt-link to="https://www.bristol.ac.uk" target="_blank"
                        >University of Bristol</nuxt-link
                      >, UK)
                    </v-list-item>
                    <v-list-item
                      ><strong>Laurent Bouri</strong> (Web developer - Research and Development pole
                      -
                      <nuxt-link to="http://www.ics-mci.fr/en/" target="_blank"
                        >Institut Clinique de la Souris</nuxt-link
                      >
                      -
                      <nuxt-link to="https://www.igbmc.fr/" target="_blank"
                        >CNRS UMR 7104 - Institut de Génétique et de Biologie Moléculaire et
                        Cellulaire: IGBMC</nuxt-link
                      >, Fr)
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card id="contact" class="mx-auto my-2 pt-1 pl-2 rounded-lg border elevation-3" variant="tonal">
                <v-card-title class="font-weight-bold mx-4 my-4">
                  <v-icon class="me-2">mdi-card-account-mail-outline</v-icon>
                  Contact and network
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item max-height="1em" prepend-icon="mdi-email">
                      <nuxt-link :to="'mailto:mousetube@igbmc.fr'" class="text-body-1">mousetube@igbmc.fr</nuxt-link>
                    </v-list-item>

                    <v-list-item max-height="1em" prepend-icon="mdi-mastodon">
                      <nuxt-link :to="'https://mastodon.social/@mousetube'" target="_blank" class="text-body-1">MouseTube on Mastodon</nuxt-link>
                    </v-list-item>

                    <v-list-item max-height="1em" prepend-icon="mdi-github">
                      <nuxt-link :to="'https://github.com/mousetube'" target="_blank" class="text-body-1">MouseTube on GitHub</nuxt-link>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-1 pl-2 rounded-lg border elevation-3" variant="tonal">
                <v-card-title class="font-weight-bold mx-4 my-4">
                  <v-icon class="me-2">mdi-bookshelf</v-icon>
                  Bibliography
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item prepend-icon="mdi-newspaper-variant-outline">
                      Torquet N., de Chaumont F., Faure P., Bourgeron T., Ey E. mouseTube – a
                      database to collaboratively unravel mouse ultrasonic communication [version 1;
                      peer review: 2 approved]. F1000Research 2016, 5:2332 (<nuxt-link
                        href="https://doi.org/10.12688/f1000research.9439.1"
                        target="_blank"
                        >https://doi.org/10.12688/f1000research.9439.1</nuxt-link
                      >) (2016).
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-newspaper-variant-outline">
                      Ferhat A. T., Torquet N., Le Sourd A. M., de Chaumont F., Olivo-Marin J. C.,
                      Faure P., Bourgeron T., Ey E. Recording Mouse Ultrasonic Vocalizations to
                      Evaluate Social Communication. J. Vis. Exp. (112), e53871,
                      <nuxt-link href="https://dx.doi.org/10.3791/53871" target="_blank"
                        >doi:10.3791/53871</nuxt-link
                      >
                      (2016).
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-1 pl-2 rounded-lg border elevation-3" variant="tonal">
                <v-card-title class="font-weight-bold mx-4 my-4">
                  <v-icon class="me-2">mdi-multimedia</v-icon>
                  mouseTube in the media
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item prepend-icon="mdi-trophy">
                      In 2022, <strong>mouseTube</strong> was awarded the
                      <nuxt-link
                        href="https://www.ouvrirlascience.fr/prix-science-ouverte-des-donnees-de-la-recherche/"
                        target="_blank"
                      >
                        Science Ouverte (Open Science) prize for research data</nuxt-link
                      >
                      by the <strong>French Ministry of Higher Education and Research</strong>.
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-newspaper">
                      Following the open science prize of 2022, <strong>Savoir(s)</strong>, the
                      daily newspaper of the <strong>University of Strasbourg</strong>, carried an
                      <nuxt-link
                        href="https://savoirs.unistra.fr/innovation/mousetube-la-base-de-donnees-des-vocalisations-de-souris"
                        target="_blank"
                        >interview</nuxt-link
                      >.
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-1 pl-2 rounded-lg border elevation-3" variant="tonal">
                <v-card-title class="font-weight-bold mx-4 my-4">
                  <v-icon class="me-2">mdi-handshake-outline</v-icon>
                  Acknowledgments
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item class="bullet-item"
                      ><strong>Thomas Bourgeron</strong> (Institut Pasteur, Paris,
                      France)</v-list-item
                    >
                    <v-list-item class="bullet-item"
                      ><strong>Fabrice de Chaumont</strong> (Institut Pasteur, Paris,
                      France)</v-list-item
                    >
                    <v-list-item class="bullet-item"
                      ><strong>Philippe Faure</strong> (ESPCI, Paris, France)</v-list-item
                    >
                    <v-list-item class="bullet-item"
                      ><strong>Julien Seiler</strong> (IFB, Strasbourg, France)</v-list-item
                    >
                    <v-list-item class="bullet-item"
                      >mouseTube logo by <strong>Ioan Lemoël</strong><br
                    /></v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-text class="text-center">
                  MouseTube is hosted by IFB (Institut Français de Bioinformatique)<br />
                  <nuxt-link to="https://www.france-bioinformatique.fr/"
                    ><img src="/logo_ifb.png" alt="IFB" class="ifb ml-2 mr-2 mt-2"
                  /></nuxt-link>
                </v-card-text>
                <v-card-text class="text-center">
                  We would like to thank the FC3R (French Center for 3R) and the French Ministry of
                  Higher Education and Research for their financial support.<br />
                  <nuxt-link to="https://www.fc3r.com/" target="_blank"
                    ><img src="/logo-fc3r_bleu.png" alt="FC3R" class="ml-2 mr-2 mt-2"
                  /></nuxt-link>
                  <nuxt-link to="https://www.ouvrirlascience.fr" target="_blank"
                    ><img
                      src="/macaron_recherche_data_gouv.png"
                      alt="Recherche Data Gouv"
                      class="mr-2 mt-2"
                  /></nuxt-link>
                </v-card-text>
              </v-card>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #b71c1c;
}

a:hover {
  text-decoration: underline;
}

.max-v-list-height {
  max-height: 20px;
}

.ifb {
  max-width: 100px;
}
.bullet-item::before {
  content: '•';
  margin-right: 8px;
  color: black;
}
</style>
