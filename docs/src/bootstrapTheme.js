import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Docusaurus toggles its color mode by setting `data-theme="light|dark"` on
// the <html> element, but Bootstrap (and therefore the bootstrap-select
// dropdowns rendered in the docs) reads `data-bs-theme`. Without this bridge
// the Bootstrap components stay light while the rest of the page is dark.
// This mirrors Docusaurus' theme onto Bootstrap so the live examples reflect
// both light and dark modes accurately.
if (ExecutionEnvironment.canUseDOM) {
  const root = document.documentElement;

  const syncBootstrapTheme = function () {
    const theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    if (root.getAttribute('data-bs-theme') !== theme) {
      root.setAttribute('data-bs-theme', theme);
    }
  };

  syncBootstrapTheme();

  const observer = new MutationObserver(syncBootstrapTheme);
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
}
