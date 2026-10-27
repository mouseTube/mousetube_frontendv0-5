import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import prettier from 'eslint-plugin-prettier';

export default createConfigForNuxt({
  features: { stylistic: false },
}).append({
  plugins: { prettier },
  rules: {
    'no-console': 'warn',
    'no-undef': 'off', // composables are auto-imported by Nuxt
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': 'off',
    'vue/attributes-order': 'off',
    'vue/v-slot-style': 'off',
    'vue/v-bind-style': 'off',
    'prettier/prettier': 'error',
  },
});
