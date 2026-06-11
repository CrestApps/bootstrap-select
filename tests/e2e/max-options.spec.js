const { test, expect } = require('@playwright/test');

function escapeRegExp (s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function optionLi (page, text) {
  return page.locator('.dropdown-menu li').filter({
    has: page.locator('a').filter({ hasText: new RegExp('^' + escapeRegExp(text) + '$') })
  });
}

test.describe('Multi-selects with maxOptions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/index.html');
    await page.waitForFunction(() => window.SelectpickerTests && window.Selectpicker);
  });

  for (let i = 0; i < 2; i++) {
    test(`config #${i} selection is limited by maxOptions`, async ({ page }) => {
      const { id, title } = await page.evaluate((index) => {
        const entry = window.SelectpickerTests.maxOptions[index];
        const id = window.SelectpickerTests.create(entry.config);
        return { id, title: entry.title };
      }, i);

      test.info().annotations.push({ type: 'config', description: title });

      const button = `[data-id="${id}"]`;
      await page.click(button);

      // maxOptions 1 (Optgroup 0)
      await optionLi(page, 'Option 0-0').locator('a').click();
      await optionLi(page, 'Option 0-1').locator('a').click();
      await expect(optionLi(page, 'Option 0-0')).not.toHaveClass(/selected/);
      await expect(optionLi(page, 'Option 0-1')).toHaveClass(/selected/);

      // maxOptions 2 (Optgroup 1)
      await optionLi(page, 'Option 1-0').locator('a').click();
      await optionLi(page, 'Option 1-1').locator('a').click();
      await optionLi(page, 'Option 1-2').locator('a').click();
      await expect(page.locator('.notify').last()).toBeVisible();
      await expect(optionLi(page, 'Option 1-0')).toHaveClass(/selected/);
      await expect(optionLi(page, 'Option 1-1')).toHaveClass(/selected/);
      await expect(optionLi(page, 'Option 1-2')).not.toHaveClass(/selected/);

      // maxOptions 4 (on select)
      await optionLi(page, 'Option 2-0').locator('a').click();
      await optionLi(page, 'Option 2-1').locator('a').click();
      await expect(page.locator('.notify').last()).toBeVisible();
      await expect(optionLi(page, 'Option 2-0')).toHaveClass(/selected/);
      await expect(optionLi(page, 'Option 2-1')).not.toHaveClass(/selected/);

      const value = await page.evaluate((selectId) => {
        return window.Selectpicker.getInstance(document.getElementById(selectId)).val();
      }, id);

      expect(value).toEqual(['Option 0-1', 'Option 1-0', 'Option 1-1', 'Option 2-0']);
    });
  }
});
