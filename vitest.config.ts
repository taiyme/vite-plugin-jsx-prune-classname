import { vCache } from '@raegen/vite-plugin-vitest-cache';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    vCache({
      dir: 'node_modules/.cache/vitest',
    }),
  ],
  test: {
    globals: true,
  },
});
