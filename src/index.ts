import type { Plugin } from 'vite';

import type { Options } from './options.js';
import { transform } from './transform.js';

export default function jsxPruneClassName(options?: Options) {
  return {
    name: '@taiyme/vite-plugin-jsx-prune-classname',
    enforce: 'pre',
    transform(sourceCode, id) {
      if (id.includes('/node_modules/')) return;

      if (!id.endsWith('.tsx') && !id.endsWith('.jsx')) return;

      return transform(sourceCode, options);
    },
  } satisfies Plugin as Plugin;
}
