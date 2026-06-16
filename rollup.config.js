const fs = require('fs');
const path = require('path');
const terser = require('@rollup/plugin-terser');

const repoRoot = __dirname;
const packagePath = path.join(repoRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
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

const jsSources = [
  'js/bootstrap-select.helpers.js',
  'js/bootstrap-select.search.js',
  'js/bootstrap-select.constants.js',
  'js/bootstrap-select.class.js',
  'js/bootstrap-select.virtual-scroll.js',
  'js/bootstrap-select.data.js',
  'js/bootstrap-select.render.js',
  'js/bootstrap-select.sizing.js',
  'js/bootstrap-select.interaction.js',
  'js/bootstrap-select.api.js',
  'js/bootstrap-select.runtime.js'
];

function readProjectFile (relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function createVirtualPlugin (sources) {
  return {
    name: 'virtual-bootstrap-select',
    resolveId (source) {
      return Object.prototype.hasOwnProperty.call(sources, source) ? source : null;
    },
    load (id) {
      return sources[id] || null;
    }
  };
}

function readWrappedSource (introPath, sourceCode, outroPath) {
  return [banner, readProjectFile(introPath), sourceCode, readProjectFile(outroPath)].join('\n');
}

function createMainSourceCode (introPath, outroPath) {
  return readWrappedSource(
    introPath,
    jsSources.map(readProjectFile).join('\n\n'),
    outroPath
  );
}

function createMainConfig (id, sourceCode, outputs, external) {
  return {
    input: id,
    output: outputs,
    external: external || [],
    treeshake: false,
    plugins: [createVirtualPlugin({ [id]: sourceCode })]
  };
}

function createTerserOutput (file) {
  return {
    file,
    format: 'es',
    sourcemap: true,
    plugins: [
      terser({
        format: {
          ascii_only: true,
          comments: /^!/
        }
      })
    ]
  };
}

const i18nFiles = fs.readdirSync(path.join(repoRoot, 'js', 'i18n'))
  .filter(function (filename) {
    return filename.endsWith('.js');
  })
  .sort();

const configs = [
  createMainConfig(
    'virtual:bootstrap-select-umd',
    createMainSourceCode('js/umd-intro.js', 'js/umd-outro.js'),
    [
      {
        file: 'dist/js/bootstrap-select.js',
        format: 'es',
        sourcemap: true
      },
      createTerserOutput('dist/js/bootstrap-select.min.js')
    ]
  ),
  createMainConfig(
    'virtual:bootstrap-select-esm',
    createMainSourceCode('js/esm-intro.js', 'js/esm-outro.js'),
    [
      {
        file: 'dist/js/bootstrap-select.esm.mjs',
        format: 'es',
        sourcemap: true
      }
    ],
    ['bootstrap']
  ),
  createMainConfig(
    'virtual:bootstrap-select-cjs',
    createMainSourceCode('js/cjs-intro.js', 'js/cjs-outro.js'),
    [
      {
        file: 'dist/js/bootstrap-select.cjs',
        format: 'es',
        sourcemap: true
      }
    ]
  )
];

i18nFiles.forEach(function (filename) {
  const relativeSourcePath = path.join('js', 'i18n', filename);
  const id = `virtual:${relativeSourcePath.replace(/\\/g, '/')}`;
  const sourceCode = readWrappedSource(
    'js/umd-intro.js',
    readProjectFile(relativeSourcePath),
    'js/umd-outro.js'
  );

  configs.push(createMainConfig(
    id,
    sourceCode,
    [
      {
        file: path.join('dist', 'js', 'i18n', filename).replace(/\\/g, '/'),
        format: 'es',
        sourcemap: true
      },
      createTerserOutput(path.join('dist', 'js', 'i18n', filename.replace(/\.js$/, '.min.js')).replace(/\\/g, '/'))
    ]
  ));
});

module.exports = configs;
