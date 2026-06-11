/**
 * Bootstrap-select test page js
 */

/**
 * Add options to a select element
 */
const createOptions = (elemId, num) => {
  // should be a select
  const element = document.getElementById(elemId);
  for (let i = 1; i <= num; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `Option ${i}`;
    element.appendChild(option);
  }
};

// how many options to generate
const OPTIONS_NUM = 30;

// we need to include the options before bootstrap-select activates (on DOMContentLoaded)
document.addEventListener('readystatechange', () => {
  // "interactive" is when all is loaded but bootstrap-select is not yet activated
  if (document.readyState === 'interactive') {
    ['number', 'number-multiple', 'number2', 'number2-multiple']
      .forEach(elemId => createOptions(elemId, OPTIONS_NUM));

    const mySelect = document.getElementById('first-disabled2');

    document.getElementById('special').addEventListener('click', () => {
      Array.prototype.forEach.call(mySelect.querySelectorAll('option:checked'), option => {
        option.disabled = true;
      });
      Selectpicker.getInstance(mySelect).refresh();
    });

    document.getElementById('special2').addEventListener('click', () => {
      Array.prototype.forEach.call(mySelect.querySelectorAll('option:disabled'), option => {
        option.disabled = false;
      });
      Selectpicker.getInstance(mySelect).refresh();
    });

    Selectpicker.getOrCreateInstance(document.getElementById('basic2'), {
      liveSearch: true,
      maxOptions: 1
    });
  }
});
