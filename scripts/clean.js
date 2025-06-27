import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

async function main() {
  const cwd = fileURLToPath(new URL('..', import.meta.url));

  await fs.rm(resolve(cwd, 'dist'), { recursive: true, force: true });
  await fs.rm(resolve(cwd, 'node_modules'), { recursive: true, force: true });
}

await main();
