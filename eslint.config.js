import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginNuxt from 'eslint-plugin-nuxt';

export default [
  {
    files: ['**/*.js', '**/*.vue'],
    plugins: {
      vue: eslintPluginVue,
      nuxt: eslintPluginNuxt,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:nuxt/recommended',
    ],
  },
];