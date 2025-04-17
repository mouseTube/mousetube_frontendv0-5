import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import nuxtPlugin from 'eslint-plugin-nuxt';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  // Ignorer .nuxt et node_modules
  {
    ignores: ['.nuxt/**/*', 'node_modules/**/*'],
  },

  js.configs.recommended,
  prettierConfig,

  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parser: babelParser,
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue: vuePlugin,
      nuxt: nuxtPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'no-undef': 'off',
      ...vuePlugin.configs.base.rules,
      ...vuePlugin.configs['vue3-recommended']?.rules,
      'nuxt/no-env-in-hooks': 'error',
      'nuxt/no-globals-in-created': 'error',
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'vue/comment-directive': 'off',
    },
    settings: {
      'vue/setup-compiler-macros': true,
    },
  },
];
