const { test, expect } = require('@playwright/test');

// Renders a selectpicker with the given style under the given color mode and
// returns the computed styles that the theming rules are responsible for.
async function render (page, { theme, style }) {
  return page.evaluate(({ theme, style }) => {
    document.documentElement.setAttribute('data-bs-theme', theme);

    const select = document.createElement('select');
    select.className = 'selectpicker';
    if (style) { select.setAttribute('data-style', style); }
    ['One', 'Two', 'Three'].forEach((text) => {
      const option = document.createElement('option');
      option.textContent = text;
      select.appendChild(option);
    });
    select.options[1].selected = true;
    document.body.appendChild(select);

    window.Selectpicker.getOrCreateInstance(select);
    const wrapper = select.closest('.bootstrap-select') || select.parentElement;
    const button = wrapper.querySelector('.dropdown-toggle');
    button.click();

    const menu = wrapper.querySelector('.dropdown-menu:not(.inner)');
    const active = wrapper.querySelector('.dropdown-menu li.active a, .dropdown-menu li.selected a');
    const css = (el) => (el ? getComputedStyle(el) : null);

    return {
      buttonClass: button.className,
      buttonBg: css(button).backgroundColor,
      buttonBorder: css(button).borderTopColor,
      buttonColor: css(button).color,
      bodyBg: css(document.body).backgroundColor,
      borderColor: css(document.documentElement).getPropertyValue('--bs-border-color').trim(),
      menuShadow: css(menu).boxShadow,
      activeBg: active ? css(active).backgroundColor : null,
      primary: css(document.documentElement).getPropertyValue('--bs-primary').trim()
    };
  }, { theme, style });
}

test.describe('Button styles and menu theming', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/index.html');
    await page.waitForFunction(() => window.Selectpicker);
  });

  test('default style is btn-theme', async ({ page }) => {
    const result = await render(page, { theme: 'light' });
    expect(result.buttonClass).toContain('btn-theme');
    expect(result.buttonClass).not.toContain('btn-light');
  });

  test('btn-theme follows the color mode', async ({ page }) => {
    const light = await render(page, { theme: 'light', style: 'btn-theme' });
    expect(light.buttonBg).toBe(light.bodyBg);
    await page.reload();
    await page.waitForFunction(() => window.Selectpicker);
    const dark = await render(page, { theme: 'dark', style: 'btn-theme' });
    expect(dark.buttonBg).toBe(dark.bodyBg);
    expect(dark.buttonBg).not.toBe(light.buttonBg);
  });

  test('btn-light stays light in dark mode', async ({ page }) => {
    const dark = await render(page, { theme: 'dark', style: 'btn-light' });
    expect(dark.buttonBg).toBe('rgb(255, 255, 255)');
    expect(dark.buttonBg).not.toBe(dark.bodyBg);
  });

  test('btn-light looks exactly like btn-theme in light mode', async ({ page }) => {
    const theme = await render(page, { theme: 'light', style: 'btn-theme' });
    await page.reload();
    await page.waitForFunction(() => window.Selectpicker);
    const light = await render(page, { theme: 'light', style: 'btn-light' });
    expect(light.buttonBg).toBe(theme.buttonBg);
    expect(light.buttonBorder).toBe(theme.buttonBorder);
    expect(light.buttonColor).toBe(theme.buttonColor);
  });

  test('btn-dark has a visible border in dark mode', async ({ page }) => {
    const dark = await render(page, { theme: 'dark', style: 'btn-dark' });
    expect(dark.buttonBorder).not.toBe(dark.buttonBg);
  });

  test('open menu has a drop shadow', async ({ page }) => {
    const result = await render(page, { theme: 'light' });
    expect(result.menuShadow).not.toBe('none');
  });

  test('active item is gray, not the primary color', async ({ page }) => {
    const result = await render(page, { theme: 'light' });
    expect(result.activeBg).toBe('rgb(233, 236, 239)');
  });
});
