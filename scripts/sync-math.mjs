import { cp, mkdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('public/math/', root);
await mkdir(output, { recursive: true });
await cp(new URL('node_modules/katex/dist/katex.min.css', root), new URL('katex.min.css', output));
await cp(new URL('node_modules/katex/dist/fonts/', root), new URL('fonts/', output), {
  recursive: true,
});
await cp(new URL('node_modules/katex/LICENSE', root), new URL('LICENSE', output));
