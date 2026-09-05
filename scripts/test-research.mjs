import { readFile, writeFile, unlink, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

// Use fixed, narrowly scoped filenames. Never overwrite an author's draft.
const files = [
  resolve('src/content/writing/template-check.mdx'),
  resolve('src/content/writing/template-draft-check.md'),
  resolve('src/content/writing/template-future-check.md'),
];
for (const path of files) {
  try {
    await access(path);
    throw new Error(`Test fixture already exists: ${path}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
function run(bin, args, env = process.env) {
  const result = spawnSync(process.execPath, [bin, ...args], { stdio: 'inherit', env });
  if (result.status !== 0) throw new Error(`${bin} failed (${result.status})`);
}
function build() {
  run('scripts/sync-math.mjs', []);
  run('node_modules/astro/bin/astro.mjs', ['build']);
}
let failed = false;
try {
  let sample = await readFile('templates/research.mdx', 'utf8');
  sample = sample
    .replace('title: "Your research title"', 'title: "Research template verification"')
    .replace('date: 2026-09-05', 'date: 2020-01-01')
    .replace('draft: true', 'draft: false')
    .replace(
      '  - name: Yangyi Liu',
      '  - name: Template Author\n    affiliation: Example Laboratory\n    orcid: https://orcid.org/0000-0000-0000-0000\n  - name: Second Author',
    )
    .replace(
      'version: "1.0"',
      'version: "1.0"\npdf: https://example.org/paper.pdf\ndoi: 10.0000/test-fixture\nvenue: Template Test\nartifacts:\n  - label: Code\n    url: https://example.org/code',
    );
  sample = sample.replace(
    '## 3. Results',
    `## 3. Results\n\n<Figure id="fig-check" number={1} src="/favicon.svg" alt="An eight-spoke terracotta star on an ivory square, used to verify figure rendering." caption="A template verification image, not research data." width={64} height={64} />\n\nSee [Figure 1](#fig-check).\n\n| Input | Output |\n| --- | --- |\n| One | Two |\n\nA footnote for the reader.[^check]\n\n[^check]: This is a verification footnote.`,
  );
  await writeFile(files[0], sample, { flag: 'wx' });
  await writeFile(
    files[1],
    '---\ntitle: DRAFT_SENTINEL\ndescription: Must not publish\ndate: 2020-01-01\ndraft: true\n---\nDraft sentinel body.',
    { flag: 'wx' },
  );
  await writeFile(
    files[2],
    '---\ntitle: FUTURE_SENTINEL\ndescription: Must not publish\ndate: 2999-01-01\n---\nFuture sentinel body.',
    { flag: 'wx' },
  );
  build();
  run('node_modules/@playwright/test/cli.js', ['test', 'tests/research.spec.ts'], {
    ...process.env,
    FIELDNOTES_RESEARCH_TEST: '1',
  });
} catch (error) {
  console.error(error);
  failed = true;
} finally {
  for (const file of files) {
    try {
      await unlink(file);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  // Always restore an output tree that contains only real published content.
  build();
}
if (failed) process.exitCode = 1;
