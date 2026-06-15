const fs = require('fs/promises');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(repoRoot, 'docs');
const buildRoot = path.join(docsRoot, '.pages-build');
const manifestPath = path.join(docsRoot, '.pages-manifest.json');
const noJekyllPath = path.join(docsRoot, '.nojekyll');

const protectedEntries = new Set([
  '.docusaurus',
  '.nojekyll',
  '.pages-manifest.json',
  'CNAME',
  'build',
  'content',
  'docusaurus.config.js',
  'sidebars.js',
  'src',
  'static',
  'versioned_docs',
  'versioned_sidebars',
  'versions.json'
]);

async function pathExists (targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readManifest () {
  if (!await pathExists(manifestPath)) {
    return [];
  }

  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  return Array.isArray(manifest.entries) ? manifest.entries : [];
}

async function removePreviousEntries (entries) {
  await Promise.all(entries.map(async function (entry) {
    if (protectedEntries.has(entry)) {
      return;
    }

    const targetPath = path.join(docsRoot, entry);

    if (await pathExists(targetPath)) {
      await fs.rm(targetPath, { recursive: true, force: true });
    }
  }));
}

async function getBuildEntries () {
  const dirEntries = await fs.readdir(buildRoot, { withFileTypes: true });

  return dirEntries.map(function (entry) {
    return entry.name;
  }).sort();
}

async function copyBuildOutput (entries) {
  await Promise.all(entries.map(async function (entry) {
    const sourcePath = path.join(buildRoot, entry);
    const targetPath = path.join(docsRoot, entry);

    await fs.cp(sourcePath, targetPath, { recursive: true, force: true });
  }));
}

async function writeManifest (entries) {
  const manifest = {
    entries
  };

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  await fs.writeFile(noJekyllPath, '');
}

async function main () {
  if (!await pathExists(buildRoot)) {
    throw new Error(`Missing build output at ${buildRoot}. Run "npm run docs:build" first.`);
  }

  const previousEntries = await readManifest();
  await removePreviousEntries(previousEntries);

  const buildEntries = await getBuildEntries();
  await copyBuildOutput(buildEntries);
  await writeManifest(buildEntries);
}

main().catch(function (error) {
  console.error(error.message);
  process.exitCode = 1;
});
