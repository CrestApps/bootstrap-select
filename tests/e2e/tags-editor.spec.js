const { test, expect } = require('@playwright/test');

function escapeRegExp (s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function widget (page, id) {
  return page.locator('.bootstrap-select').filter({ has: page.locator(`[data-id="${id}"]`) });
}

function optionAnchor (picker, text) {
  return picker.locator('.dropdown-menu li a').filter({ hasText: new RegExp('^' + escapeRegExp(text) + '$') });
}

test.describe('Tags-style live search editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/index.html');
    await page.waitForFunction(() => window.Selectpicker);
  });

  test('supports removable selected tags and local open-option creation', async ({ page }) => {
    const id = await page.evaluate(() => {
      document.body.innerHTML += `
        <select id="tags-editor-local" multiple>
          <option value="one">Option 1</option>
          <option value="two">Option 2</option>
          <option value="three">Option 3</option>
        </select>
      `;

      new Selectpicker('#tags-editor-local', {
        liveSearch: true,
        showSelectedTags: true,
        openOptions: true
      });

      return 'tags-editor-local';
    });

    const picker = widget(page, id);

    await picker.locator(`[data-id="${id}"]`).click();
    await optionAnchor(picker, 'Option 1').click();
    await optionAnchor(picker, 'Option 2').click();

    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toHaveCount(2);
    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toContainText(['Option 1', 'Option 2']);
    await expect(picker.locator('.filter-option-inner-inner')).toHaveText('2 items selected');

    await picker.locator(`[data-id="${id}"]`).click();
    await picker.locator('> .bs-selected-items-external .bs-selected-item[data-option-value="one"]').click();

    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toHaveCount(1);
    await expect(picker.locator('.filter-option-inner-inner')).toHaveText('1 item selected');
    await expect.poll(async () => page.evaluate((selectId) => {
      return Array.from(document.getElementById(selectId).selectedOptions).map(option => option.value);
    }, id)).toEqual(['two']);

    await picker.locator(`[data-id="${id}"]`).click();
    await picker.locator('.bs-searchbox input').pressSequentially('Option 4');
    await expect(picker.locator('.bs-create-option')).toHaveText('Create "Option 4"');

    await picker.locator('.bs-create-option').click();

    await expect.poll(async () => page.evaluate((selectId) => {
      const select = document.getElementById(selectId);

      return {
        values: Array.from(select.selectedOptions).map(option => option.value),
        texts: Array.from(select.options).map(option => option.text)
      };
    }, id)).toEqual({
      values: ['two', 'Option 4'],
      texts: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
    });
    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toContainText(['Option 2', 'Option 4']);
    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toContainText(['Option 2', 'Option 4']);
    await expect(picker.locator('> .bs-selected-items-external')).toBeVisible();
  });

  test('supports async open-option creation for sourced data', async ({ page }) => {
    const id = await page.evaluate(() => {
      var data = [
        { text: 'Alpha', value: 'alpha' },
        { text: 'Beta', value: 'beta' },
        { text: 'Gamma', value: 'gamma' }
      ];

      document.body.innerHTML += '<select id="tags-editor-remote" multiple></select>';

      new Selectpicker('#tags-editor-remote', {
        liveSearch: true,
        showSelectedTags: true,
        openOptions: true,
        source: {
          data: function (callback) {
            callback(data);
          },
          search: function (callback, pageNumber, searchTerm) {
            callback(data.filter(function (item) {
              return item.text.toLowerCase().includes(searchTerm.toLowerCase());
            }));
          },
          create: function (callback, searchTerm) {
            callback({
              text: searchTerm.toUpperCase(),
              value: 'id-' + searchTerm.toLowerCase()
            });
          }
        }
      });

      return 'tags-editor-remote';
    });

    const picker = widget(page, id);

    await picker.locator(`[data-id="${id}"]`).click();
    await picker.locator('.bs-searchbox input').pressSequentially('delta');
    await expect(picker.locator('.bs-create-option')).toHaveText('Create "delta"');

    await picker.locator('.bs-create-option').click();

    await expect.poll(async () => page.evaluate((selectId) => {
      return Array.from(document.getElementById(selectId).selectedOptions).map(option => ({
        value: option.value,
        text: option.text
      }));
    }, id)).toEqual([
      { value: 'id-delta', text: 'DELTA' }
    ]);

    await picker.locator('.bs-searchbox input').pressSequentially('delta');
    await expect(optionAnchor(picker, 'DELTA')).toBeVisible();
  });

  test('does not duplicate selected tags after repeated refresh calls', async ({ page }) => {
    const id = await page.evaluate(() => {
      document.body.innerHTML += `
        <select id="tags-editor-refresh" multiple>
          <option value="one" selected>Option 1</option>
          <option value="two" selected>Option 2</option>
          <option value="three">Option 3</option>
        </select>
      `;

      new Selectpicker('#tags-editor-refresh', {
        liveSearch: true,
        showSelectedTags: true,
        openOptions: true
      });

      return 'tags-editor-refresh';
    });

    const picker = widget(page, id);

    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toHaveCount(2);
    await expect(picker.locator('.filter-option-inner-inner')).toHaveText('2 items selected');

    await page.evaluate((selectId) => {
      const instance = Selectpicker.getInstance('#' + selectId);
      instance.refresh();
      instance.refresh();
    }, id);

    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toHaveCount(2);
    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toContainText(['Option 1', 'Option 2']);
    await expect(picker.locator('.filter-option-inner-inner')).toHaveText('2 items selected');
    await expect.poll(async () => page.evaluate((selectId) => {
      return Array.from(document.getElementById(selectId).selectedOptions).map(option => option.value);
    }, id)).toEqual(['one', 'two']);
  });

  test('supports checkbox selection indicators and search placeholder fallback', async ({ page }) => {
    const id = await page.evaluate(() => {
      document.body.innerHTML += `
        <select id="tags-editor-checkbox" multiple placeholder="Search frameworks">
          <option selected>Bootstrap 5</option>
          <option>Vue</option>
          <option>React</option>
        </select>
      `;

      new Selectpicker('#tags-editor-checkbox', {
        liveSearch: true,
        showSelectedTags: true,
        selectionIndicator: 'checkbox'
      });

      return 'tags-editor-checkbox';
    });

    const picker = widget(page, id);

    await picker.locator(`[data-id="${id}"]`).click();
    await expect(picker).toHaveClass(/selection-indicator-checkbox/);
    await expect(picker.locator('.bs-searchbox input')).toHaveAttribute('placeholder', 'Search frameworks');
    await expect(picker.locator('.dropdown-menu li a .check-mark')).toHaveCount(3);
    await expect.poll(async () => page.evaluate((selectId) => {
      const picker = document.querySelector(`.bootstrap-select:has([data-id="${selectId}"])`);
      const anchor = picker.querySelector('.dropdown-menu li a');
      const text = anchor.querySelector('.text');
      const indicator = anchor.querySelector('.check-mark');
      const anchorRect = anchor.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();

      return {
        hasCheckboxClass: picker.classList.contains('selection-indicator-checkbox'),
        indicatorBeforeText: indicatorRect.left < textRect.left,
        indicatorOffset: Math.round(indicatorRect.left - anchorRect.left)
      };
    }, id)).toEqual({
      hasCheckboxClass: true,
      indicatorBeforeText: true,
      indicatorOffset: 12
    });
  });

  test('supports list-style selected items with icons and remove actions', async ({ page }) => {
    const id = await page.evaluate(() => {
      document.body.innerHTML += `
        <select id="tags-editor-list" multiple>
          <option value="orchard" selected data-icon="fa-seedling">Orchard Core</option>
          <option value="bootstrap" selected data-icon="fa-cubes">Bootstrap 5</option>
          <option value="vue" data-icon="fa-code">Vue</option>
        </select>
      `;

      new Selectpicker('#tags-editor-list', {
        liveSearch: true,
        showSelectedTags: true,
        selectedItemsStyle: 'list',
        iconBase: 'fa-solid',
        tickIcon: 'fa-check'
      });

      return 'tags-editor-list';
    });

    const picker = widget(page, id);

    await expect(picker).toHaveClass(/selected-items-style-list/);
    await expect(picker.locator('> .bs-selected-items-external')).toHaveClass(/list-group/);
    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toHaveCount(2);
    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item .bs-selected-item-icon.fa-solid.fa-seedling')).toHaveCount(1);
    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item .bs-selected-item-icon.fa-solid.fa-cubes')).toHaveCount(1);

    await expect.poll(async () => page.evaluate((selectId) => {
      const picker = document.querySelector(`.bootstrap-select:has([data-id="${selectId}"])`);
      const item = picker.querySelector('.bs-selected-items-external .bs-selected-item');
      const label = item.querySelector('.bs-selected-item-label');
      const remove = item.querySelector('.bs-selected-item-remove');
      const itemRect = item.getBoundingClientRect();
      const removeRect = remove.getBoundingClientRect();
      const labelRect = label.getBoundingClientRect();

      return {
        isListGroupItem: item.classList.contains('list-group-item'),
        removeAfterLabel: removeRect.left > labelRect.right,
        removeNearRightEdge: Math.round(itemRect.right - removeRect.right) <= 20
      };
    }, id)).toEqual({
      isListGroupItem: true,
      removeAfterLabel: true,
      removeNearRightEdge: true
    });

    await picker.locator('> .bs-selected-items-external .bs-selected-item[data-option-value="orchard"]').click();

    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toHaveCount(1);
    await expect.poll(async () => page.evaluate((selectId) => {
      return Array.from(document.getElementById(selectId).selectedOptions).map(option => option.value);
    }, id)).toEqual(['bootstrap']);
  });

  test('matches floating-label bottom spacing to the top spacing', async ({ page }) => {
    const id = await page.evaluate(() => {
      document.body.innerHTML += `
        <div class="form-floating">
          <select id="floating-tags-editor" multiple placeholder="Years">
            <option selected>2026</option>
            <option selected>2023</option>
            <option>2021</option>
          </select>
          <label for="floating-tags-editor">Years</label>
        </div>
      `;

      new Selectpicker('#floating-tags-editor', {
        liveSearch: true,
        showSelectedTags: true
      });

      return 'floating-tags-editor';
    });

    const picker = widget(page, id);

    await expect(picker.locator('> .bs-selected-items-external .bs-selected-item')).toHaveCount(2);
    await expect.poll(async () => page.evaluate((selectId) => {
      const root = document.querySelector(`.bootstrap-select:has([data-id="${selectId}"])`);
      const toggle = root.querySelector('.dropdown-toggle');
      const external = root.querySelector('.bs-selected-items-external');
      const toggleStyles = window.getComputedStyle(toggle);
      const externalStyles = window.getComputedStyle(external);

      return {
        paddingTop: externalStyles.paddingTop,
        paddingBottom: externalStyles.paddingBottom,
        togglePaddingTop: toggleStyles.paddingTop,
        marginTop: externalStyles.marginTop,
        marginBottom: externalStyles.marginBottom
      };
    }, id)).toEqual({
      paddingTop: '0px',
      paddingBottom: '22px',
      togglePaddingTop: '22px',
      marginTop: '0px',
      marginBottom: '0px'
    });
  });
});
