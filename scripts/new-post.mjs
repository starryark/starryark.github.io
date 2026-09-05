import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const args = process.argv.slice(2);
const research = args.includes('--research');
const title = args
  .filter((arg) => arg !== '--research')
  .join(' ')
  .trim();
if (!title) {
  console.error('Usage: npm run new:post -- "Your title" [--research]');
  process.exit(1);
}
const slug = title
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
if (!slug) {
  console.error('Please include at least one Latin letter or number in the title.');
  process.exit(1);
}
const extension = research ? 'mdx' : 'md';
const template = await readFile(
  new URL(`../templates/${research ? 'research.mdx' : 'article.md'}`, import.meta.url),
  'utf8',
);
const body = template
  .replace(/title: "Your (article|research) title"/, `title: ${JSON.stringify(title)}`)
  .replace('date: 2026-09-05', `date: ${new Date().toISOString().slice(0, 10)}`);
const output = resolve('src/content/writing', `${slug}.${extension}`);
try {
  await writeFile(output, body, { flag: 'wx' });
  console.log(`Created ${output}\nIt is a draft. Set draft: false when ready to publish.`);
} catch (error) {
  if (error.code === 'EEXIST') {
    console.error('A post with that filename already exists. Choose another title.');
    process.exit(1);
  }
  throw error;
}
