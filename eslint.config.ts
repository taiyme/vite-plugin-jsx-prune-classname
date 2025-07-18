import type { Linter } from 'eslint';
import taiymeConfig from '@taiyme/eslint-config';
import tsEslintParser from '@typescript-eslint/parser';
import gitignore from 'eslint-config-flat-gitignore';
import globals from 'globals';

const files = ['**/*.{js,ts}'];

export default [
  gitignore(),
  {
    name: 'vite-plugin-jsx-prune-classname/typescript',
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    files,
  },
  ...taiymeConfig.configs.typescript.map((config) => ({
    ...config,
    files,
  })),
  {
    files: ['**/*.{spec,test}.ts'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
] as const satisfies Linter.Config[];
