import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEEP_DTS_FILES = [
  'index.d.ts',
  'options.d.ts',
];

async function main() {
  const cwd = fileURLToPath(new URL('..', import.meta.url));

  const files = await fs.readdir(resolve(cwd, 'dist'), { recursive: true });
  const filteredFiles = files.filter((path) => path.endsWith('.d.ts') && !KEEP_DTS_FILES.includes(path));

  await Promise.all(
    filteredFiles.map((path) => fs.unlink(resolve(cwd, 'dist', path))),
  );
}

await main();
