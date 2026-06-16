const fs = require('fs/promises');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const packageJson = require('../package.json');

const repoRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repoRoot, 'sass', 'bootstrap-select.scss');
const distDir = path.join(repoRoot, 'dist', 'css');
const expandedCssPath = path.join(distDir, 'bootstrap-select.css');
const minifiedCssPath = path.join(distDir, 'bootstrap-select.min.css');
const currentYear = new Date().getFullYear();
const banner = [
  '/*!',
  ` * Bootstrap-select v${packageJson.version} (${packageJson.homepage})`,
  ' *',
  ' * CrestApps fork (vanilla JavaScript, Bootstrap 5+) of snapappointments/bootstrap-select',
  ' * Copyright 2012-2018 SnapAppointments, LLC (original work)',
  ` * Fork modifications Copyright 2024-${currentYear} CrestApps`,
  ' * Licensed under MIT (https://github.com/CrestApps/bootstrap-select/blob/main/LICENSE)',
  ' */'
].join('\n');

function writeCssWithMap (cssPath, cssContent, mapContent) {
  const sourceMapComment = `/*# sourceMappingURL=${path.basename(cssPath)}.map */`;
  return Promise.all([
    fs.writeFile(cssPath, `${cssContent}\n${sourceMapComment}\n`),
    fs.writeFile(`${cssPath}.map`, mapContent)
  ]);
}

function insertBanner (cssContent) {
  const charsetMatch = cssContent.match(/^@charset "UTF-8";\r?\n?/);

  if (!charsetMatch) {
    return `${banner}\n${cssContent}`;
  }

  return `${charsetMatch[0]}${banner}\n${cssContent.slice(charsetMatch[0].length)}`;
}

async function main () {
  await fs.mkdir(distDir, { recursive: true });

  const sassResult = sass.compile(sourcePath, {
    style: 'expanded',
    sourceMap: true,
    sourceMapIncludeSources: true
  });

  const expandedResult = await postcss([
    autoprefixer()
  ]).process(sassResult.css, {
    from: sourcePath,
    to: expandedCssPath,
    map: {
      prev: sassResult.sourceMap,
      inline: false,
      annotation: false,
      sourcesContent: true
    }
  });

  await writeCssWithMap(
    expandedCssPath,
    insertBanner(expandedResult.css),
    expandedResult.map.toString()
  );

  const minifiedResult = await postcss([
    cssnano()
  ]).process(expandedResult.css, {
    from: expandedCssPath,
    to: minifiedCssPath,
    map: false
  });

  await fs.writeFile(minifiedCssPath, `${insertBanner(minifiedResult.css)}\n`);
}

main().catch(function (error) {
  console.error(error.message);
  process.exitCode = 1;
});
