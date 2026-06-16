const fs = require('fs/promises');
const path = require('path');

async function main () {
  const targets = process.argv.slice(2);

  if (!targets.length) {
    throw new Error('Expected at least one path to clean.');
  }

  await Promise.all(targets.map(function (target) {
    return fs.rm(path.resolve(__dirname, '..', target), { recursive: true, force: true });
  }));
}

main().catch(function (error) {
  console.error(error.message);
  process.exitCode = 1;
});
