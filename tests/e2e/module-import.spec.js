const { test, expect } = require('@playwright/test');

test('ES module build can be imported and initialized', async ({ page }) => {
  await page.goto('/tests/index.html');

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
    value: 'One',
    instance: true,
    buttonCount: 1
  });
});
