const { test, expect } = require('@playwright/test');

test('ES module build can be imported and initialized', async ({ page }) => {
  await page.goto('/tests/packaging.html');

  await page.evaluate(() => {
    document.body.innerHTML = '<select id="esm-select"><option>One</option><option>Two</option></select>';
  });

  await page.addScriptTag({
    type: 'importmap',
    content: JSON.stringify({
      imports: {
        bootstrap: '/node_modules/bootstrap/dist/js/bootstrap.esm.min.js',
        '@popperjs/core': '/node_modules/@popperjs/core/dist/esm/index.js'
      }
    })
  });

  await page.addScriptTag({
    type: 'module',
    content: `
      import Selectpicker, { Selectpicker as NamedSelectpicker } from '/dist/js/bootstrap-select.esm.mjs';

      const picker = new Selectpicker('#esm-select');

      window.esmChecks = {
        defaultIsFunction: typeof Selectpicker === 'function',
        namedMatches: Selectpicker === NamedSelectpicker,
        globalExposed: typeof window.Selectpicker !== 'undefined',
        value: picker.val(),
        instance: Selectpicker.getInstance('#esm-select') === picker,
        buttonCount: document.querySelectorAll('.bootstrap-select > button').length
      };
    `
  });

  await page.waitForFunction(() => window.esmChecks && window.esmChecks.buttonCount === 1);

  await expect.poll(() => page.evaluate(() => window.esmChecks)).toEqual({
    defaultIsFunction: true,
    namedMatches: true,
    globalExposed: false,
    value: 'One',
    instance: true,
    buttonCount: 1
  });
});

test('CommonJS build can be loaded through a require-style shim', async ({ page }) => {
  await page.goto('/tests/packaging.html');

  await page.evaluate(() => {
    document.body.innerHTML = '<select id="cjs-select"><option>One</option><option>Two</option></select>';
  });

  await page.addScriptTag({
    url: '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  });

  await page.evaluate(async () => {
    const source = await fetch('/dist/js/bootstrap-select.cjs').then(response => response.text());
    const module = { exports: {} };
    const exports = module.exports;
    const require = function (name) {
      if (name === 'bootstrap') return window.bootstrap;
      throw new Error('Unsupported module: ' + name);
    };
    const loadCommonJs = new Function('module', 'exports', 'require', source);
    loadCommonJs(module, exports, require);
    window.cjsModule = module;
  });

  await page.evaluate(() => {
    const Selectpicker = window.cjsModule.exports;
    const picker = new Selectpicker('#cjs-select');

    window.cjsChecks = {
      defaultMatches: Selectpicker.default === Selectpicker,
      namedMatches: Selectpicker.Selectpicker === Selectpicker,
      globalExposed: typeof window.Selectpicker !== 'undefined',
      value: picker.val(),
      instance: Selectpicker.getInstance('#cjs-select') === picker,
      buttonCount: document.querySelectorAll('.bootstrap-select > button').length
    };
  });

  await expect.poll(() => page.evaluate(() => window.cjsChecks)).toEqual({
    defaultMatches: true,
    namedMatches: true,
    globalExposed: false,
    value: 'One',
    instance: true,
    buttonCount: 1
  });
});

test('UMD build still exposes the browser global', async ({ page }) => {
  await page.goto('/tests/packaging.html');

  await page.evaluate(() => {
    document.body.innerHTML = '<select class="selectpicker" id="umd-select"><option>One</option><option>Two</option></select>';
  });

  await page.addScriptTag({
    url: '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  });

  await page.addScriptTag({
    url: '/dist/js/bootstrap-select.js'
  });

  await page.waitForFunction(() => typeof window.Selectpicker === 'function');

  await expect.poll(() => page.evaluate(() => ({
    globalIsFunction: typeof window.Selectpicker === 'function',
    autoInitialized: document.querySelectorAll('.bootstrap-select > button').length
  }))).toEqual({
    globalIsFunction: true,
    autoInitialized: 1
  });
});
