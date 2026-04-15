const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const astroPlugin = require('eslint-plugin-astro');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  // Ignore build outputs and legacy files
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**', '.yarn/**'],
  },

  // TypeScript + React for .tsx/.ts files
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // TypeScript recommended set
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // React hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },

  // Astro files (flat config variant)
  ...astroPlugin.configs['flat/recommended'],

  // Prettier last — disables conflicting formatting rules
  prettierConfig,
];
