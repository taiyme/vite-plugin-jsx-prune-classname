import { vCache } from '@raegen/vite-plugin-vitest-cache';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    vCache({
      dir: 'node_modules/.cache/vitest',
    }),
  ],
  test: {
    globals: true,
  },
});
