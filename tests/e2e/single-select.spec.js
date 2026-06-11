const { test, expect } = require('@playwright/test');

function escapeRegExp (s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// anchor (rendered menu option) whose full text matches `text`
function optionAnchor (page, text) {
  return page.locator('.dropdown-menu li a').filter({ hasText: new RegExp('^' + escapeRegExp(text) + '$') });
}

test.describe('Single selects with search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/index.html');
    await page.waitForFunction(() => window.SelectpickerTests && window.Selectpicker);
  });

  for (let i = 0; i < 5; i++) {
    test(`config #${i} can search for and select options`, async ({ page }) => {
      const { id, title, hasSearch } = await page.evaluate((index) => {
        const entry = window.SelectpickerTests.single[index];
        const config = entry.config;
        const id = window.SelectpickerTests.create(config);
        const hasSearch = !!(config.options && config.options.source && config.options.source.search);
        return { id, title: entry.title, hasSearch };
      }, i);

      test.info().annotations.push({ type: 'config', description: title });

      const button = `[data-id="${id}"]`;

      await page.click(button);

      // start counting fetched events after opening the menu
      await page.evaluate((selectId) => {
        window.__fetched = 0;
        document.getElementById(selectId).addEventListener('fetched.bs.select', () => { window.__fetched++; });
      }, id);

      await page.locator('.bs-searchbox input').pressSequentially('option 4');

      if (hasSearch) {
        await expect.poll(() => page.evaluate(() => window.__fetched)).toBe(8);
      }

      const firstLi = page.locator('.dropdown-menu li').first();
      await expect(firstLi).toHaveClass(/active/);
      await expect(firstLi).toContainText('Option 4');

      // select Option 4
      await firstLi.click();

      // reopen
      await page.click(button);
      await expect(optionAnchor(page, 'Option 4')).toHaveClass(/active/);

      // select Option 9
      await optionAnchor(page, 'Option 9').click();

      // reopen
      await page.click(button);
      await expect(optionAnchor(page, 'Option 9')).toHaveClass(/active/);
      await expect(optionAnchor(page, 'Option 4')).not.toHaveClass(/active/);
    });
  }
});

test('right-aligned dropdown uses Bootstrap 5 menu-end class', async ({ page }) => {
  await page.goto('/tests/index.html');
  await page.waitForFunction(() => window.Selectpicker);

  await page.evaluate(() => {
    document.body.innerHTML += '<select id="align-right"><option>One</option><option>Two</option></select>';
    new Selectpicker('#align-right', { dropdownAlignRight: true });
  });

  const menu = page.locator('.bootstrap-select:has([data-id="align-right"]) > .dropdown-menu');

  await expect(menu).toHaveClass(/dropdown-menu-end/);
  await expect(menu).not.toHaveClass(/dropdown-menu-right/);
});

test('placeholder attribute replaces legacy select title placeholder behavior', async ({ page }) => {
  await page.goto('/tests/index.html');
  await page.waitForFunction(() => window.Selectpicker);

  await page.evaluate(() => {
    document.body.innerHTML += '<select id="with-placeholder" placeholder="Choose one"><option>One</option><option>Two</option></select>' +
      '<select id="with-title" title="Legacy title"><option>One</option><option>Two</option></select>';

    new Selectpicker('#with-placeholder');
    new Selectpicker('#with-title');
  });

  await expect(page.locator('[data-id="with-placeholder"] .filter-option-inner-inner')).toHaveText('Choose one');
  await expect(page.locator('[data-id="with-title"] .filter-option-inner-inner')).toHaveText('One');
});
