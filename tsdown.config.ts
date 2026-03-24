import { defineConfig } from 'tsdown';

import meta from './package.json' with { type: 'json' };

export default defineConfig({
  entry: 'src/index.ts',
  outDir: 'dist',
  format: 'esm',
  platform: 'node',
  fixedExtension: false,
  dts: true,
  minify: true,
  exports: false,
  tsconfig: 'tsconfig.src.json',
  define: {
    __PACKAGE_NAME__: JSON.stringify(meta.name),
  },
});
