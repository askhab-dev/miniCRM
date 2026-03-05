import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },

  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      svelte,
    },

    rules: {
      ...svelte.configs.recommended.rules,

      /*
       * Безопасность
       */
      'svelte/no-at-html-tags': 'warn',

      /*
       * Ошибки
       */
      'svelte/no-unused-svelte-ignore': 'warn',
      'svelte/no-reactive-functions': 'warn',
      'svelte/no-reactive-literals': 'warn',

      /*
       * Производительность
       */
      'svelte/require-each-key': 'error',

      /*
       * Чистота кода
       */
      'svelte/no-target-blank': 'error',
      'svelte/no-dom-manipulating': 'warn',

      /*
       * Стили
       */
      'svelte/html-closing-bracket-new-line': 'off',
      'svelte/html-quotes': ['warn', { prefer: 'double' }],
      'svelte/indent': ['warn', { indent: 2 }],

      /*
       * Частые ошибки
       */
      'svelte/no-store-async': 'warn',
      'svelte/no-ignored-unsubscribe': 'warn',
    },
  },

  {
    ignores: ['node_modules', 'dist', 'build', '.svelte-kit', 'coverage'],
  },
];
