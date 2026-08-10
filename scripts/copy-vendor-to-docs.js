const fs = require('fs/promises');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const vendorRoot = path.join(repoRoot, 'docs', 'static', 'vendor');

// Serve third-party assets from the docs site itself instead of a CDN so the
// examples keep working in offline or CDN-restricted environments (otherwise
// Bootstrap never loads and the enhanced selectpicker menus never initialize).
const copies = [
  {
    from: path.join(repoRoot, 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.bundle.min.js'),
    to: path.join(vendorRoot, 'bootstrap', 'js', 'bootstrap.bundle.min.js')
  },
  {
    from: path.join(repoRoot, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
    to: path.join(vendorRoot, 'bootstrap', 'css', 'bootstrap.min.css')
  },
  {
    from: path.join(repoRoot, 'node_modules', '@fortawesome', 'fontawesome-free', 'css', 'all.min.css'),
    to: path.join(vendorRoot, 'fontawesome', 'css', 'all.min.css')
  },
  {
    from: path.join(repoRoot, 'node_modules', '@fortawesome', 'fontawesome-free', 'webfonts'),
    to: path.join(vendorRoot, 'fontawesome', 'webfonts')
  }
];

async function main () {
  for (const { from, to } of copies) {
    await fs.mkdir(path.dirname(to), { recursive: true });
    await fs.cp(from, to, { recursive: true, force: true });
  }
}

main().catch(function (error) {
  console.error(error.message);
  process.exitCode = 1;
});
