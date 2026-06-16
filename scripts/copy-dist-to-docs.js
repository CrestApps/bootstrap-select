const fs = require('fs/promises');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repoRoot, 'dist');
const targetPath = path.join(repoRoot, 'docs', 'static', 'dist');

async function main () {
  await fs.rm(targetPath, { recursive: true, force: true });
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.cp(sourcePath, targetPath, { recursive: true, force: true });
}

main().catch(function (error) {
  console.error(error.message);
  process.exitCode = 1;
});
