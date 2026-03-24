import taiymeConfig from '@taiyme/eslint-config';
import tsEslintParser from '@typescript-eslint/parser';
import gitignore from 'eslint-config-flat-gitignore';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const files = ['**/*.{js,ts}'];

export default defineConfig([
  gitignore(),
  {
    files,
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsEslintParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files,
    extends: [
      taiymeConfig.configs.typescript,
      taiymeConfig.configs.stylistic,
    ],
  },
  {
    files: ['./src/const.ts'],
    languageOptions: {
      globals: {
        __PACKAGE_NAME__: 'readonly',
      },
    },
  },
  {
    files: [
      '**/*.spec.ts',
      '**/*.test.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
]);
