const fs = require('fs');
const path = require('path');
const { ZipArchive } = require('archiver');

const packageJson = require('../package.json');

const repoRoot = path.resolve(__dirname, '..');
const archiveName = `bootstrap-select-${packageJson.version}.zip`;
const archivePath = path.join(repoRoot, archiveName);
const archiveRoot = `bootstrap-select-${packageJson.version}`;

async function main () {
  await fs.promises.rm(archivePath, { force: true });

  await new Promise(function (resolve, reject) {
    const output = fs.createWriteStream(archivePath);
    const archive = new ZipArchive({
      zlib: {
        level: 9
      }
    });

    output.on('close', resolve);
    output.on('error', reject);
    archive.on('error', reject);
    archive.pipe(output);

    archive.directory(path.join(repoRoot, 'dist'), `${archiveRoot}/`);
    ['bower.json', 'composer.json', 'package.json'].forEach(function (filename) {
      archive.file(path.join(repoRoot, filename), {
        name: `${archiveRoot}/${filename}`
      });
    });

    archive.finalize().catch(reject);
  });
}

main().catch(function (error) {
  console.error(error.message);
  process.exitCode = 1;
});
