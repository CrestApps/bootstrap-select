const { test, expect } = require('@playwright/test');

test.describe('Sanitizer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/index.html');
    await page.waitForFunction(() => window.Selectpicker);
  });

  test('keeps data-content sanitized after refresh rebuilds the menu item', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML += '<select id="sanitize-refresh">' +
        '<option value="unsafe" data-content="<span class=&quot;safe-label&quot; onclick=&quot;window.__unsafeClick = true&quot;><img src=&quot;x&quot; onerror=&quot;window.__unsafeError = true&quot;>Unsafe</span>">Unsafe</option>' +
        '</select>';

      new Selectpicker('#sanitize-refresh');
    });

    await page.click('[data-id="sanitize-refresh"]');

    await expect.poll(() => page.evaluate(() => {
      const menu = document.querySelector('[data-id="sanitize-refresh"]').closest('.bootstrap-select').querySelector('.dropdown-menu');
      const label = menu.querySelector('.safe-label');
      const image = menu.querySelector('img');

      return {
        onclick: label && label.getAttribute('onclick'),
        onerror: image && image.getAttribute('onerror')
      };
    })).toEqual({
      onclick: null,
      onerror: null
    });

    await page.evaluate(() => {
      Selectpicker.getInstance('#sanitize-refresh').refresh();
    });

    await expect.poll(() => page.evaluate(() => {
      const menu = document.querySelector('[data-id="sanitize-refresh"]').closest('.bootstrap-select').querySelector('.dropdown-menu');
      const label = menu.querySelector('.safe-label');
      const image = menu.querySelector('img');

      return {
        onclick: label && label.getAttribute('onclick'),
        onerror: image && image.getAttribute('onerror')
      };
    })).toEqual({
      onclick: null,
      onerror: null
    });
  });
});
