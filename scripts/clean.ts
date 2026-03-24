import fs from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const cwd = resolve(import.meta.dirname, '..');

  await fs.rm(resolve(cwd, 'dist'), { recursive: true, force: true });
  await fs.rm(resolve(cwd, 'node_modules'), { recursive: true, force: true });
}

await main();
