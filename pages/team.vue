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
</script>

<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-card variant="flat" class="mx-auto" max-width="800">
            <v-img
              cover
              :width="600"
              src="/logo_mousetube_big.png"
              alt="logo mouseTube"
              class="justify-center mx-10"
            ></v-img>
            <v-card-title class="text-h2 mt-5">Team and information</v-card-title>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-2 pl-2" variant="tonal" title="The mouseTube Team">
                <v-card-text>
                  <v-list>
                    <v-list-item prepend-icon="mdi-account-circle"
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
                    <v-list-item prepend-icon="mdi-account-circle"
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
                    <v-list-item prepend-icon="mdi-account-circle"
                      ><strong>Emma Cahill</strong> (PhD - lecturer at
                      <nuxt-link to="https://www.bristol.ac.uk/phys-pharm-neuro/" target="_blank"
                        >School of Physiology, Pharmacology and Neuroscience</nuxt-link
                      >
                      -
                      <nuxt-link to="https://www.bristol.ac.uk" target="_blank"
                        >University of Bristol</nuxt-link
                      >, UK)
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-account-circle"
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
              <v-card class="mx-auto my-2 pt-1 pl-2" variant="tonal" title="Contact and network">
                <v-card-text>
                  <v-list>
                    <v-list-item max-height="1em" prepend-icon="mdi-email"
                      >mousetube@igbmc.fr</v-list-item
                    >
                    <v-list-item max-height="1em" prepend-icon="mdi-mastodon"
                      >mouseTube on Mastodon:
                      <nuxt-link to="https://mastodon.social/@mousetube" target="_blank"
                        >@mousetube@mastodon.social</nuxt-link
                      >
                    </v-list-item>
                    <v-list-item max-height="1em" prepend-icon="mdi-github"
                      ><nuxt-link to="https://github.com/mousetube" target="_blank"
                        >mouseTube on GitHub</nuxt-link
                      ></v-list-item
                    >
                  </v-list>
                </v-card-text>
              </v-card>
            </v-card-item>

            <v-card-item>
              <v-card class="mx-auto my-2 pt-1 pl-2" variant="tonal" title="Bibliography">
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
              <v-card class="mx-auto my-2 pt-1 pl-2" variant="tonal" title="mouseTube in the media">
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
              <v-card class="mx-auto my-2 pt-1 pl-2" variant="tonal" title="Acknowledgments">
                <v-card-text>
                  <v-list>
                    <v-list-item prepend-icon="mdi-account-circle"
                      ><strong>Thomas Bourgeron</strong> (Institut Pasteur, Paris,
                      France)</v-list-item
                    >
                    <v-list-item prepend-icon="mdi-account-circle"
                      ><strong>Fabrice de Chaumont</strong> (Institut Pasteur, Paris,
                      France)</v-list-item
                    >
                    <v-list-item prepend-icon="mdi-account-circle"
                      ><strong>Philippe Faure</strong> (ESPCI, Paris, France)</v-list-item
                    >
                    <v-list-item prepend-icon="mdi-account-circle"
                      ><strong>Julien Seiler</strong> (IFB, Strasbourg, France)</v-list-item
                    >
                    <v-list-item prepend-icon="mdi-account-circle"
                      >mouseTube logo by <strong>Ioan Lemoël</strong><br
                    /></v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-text>
                  MouseTube is hosted by IFB (Institut Français de Bioinformatique)<br />
                  <nuxt-link to="https://www.france-bioinformatique.fr/"
                    ><img src="/logo_ifb.png" alt="IFB" class="ifb ml-2 mr-2"
                  /></nuxt-link>
                </v-card-text>
                <v-card-text>
                  We would like to thank the FC3R (French Center for 3R) and the French Ministry of
                  Higher Education and Research for their financial support.<br />
                  <nuxt-link to="https://www.fc3r.com/" target="_blank"
                    ><img src="/logo-fc3r_bleu.png" alt="FC3R" class="ml-2 mr-2"
                  /></nuxt-link>
                  <nuxt-link to="https://www.ouvrirlascience.fr" target="_blank"
                    ><img
                      src="/macaron_recherche_data_gouv.png"
                      alt="Recherche Data Gouv"
                      class="mr-2"
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
</style>
