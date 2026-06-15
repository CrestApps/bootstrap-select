(function () {
  if (typeof window === 'undefined') return;

  var retryKey = 'bootstrap-select-docs-chunk-retry';
  var retryTtlMs = 60000;

  function now () {
    return Date.now();
  }

  function readRetryState () {
    try {
      var raw = window.sessionStorage.getItem(retryKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeRetryState () {
    try {
      window.sessionStorage.setItem(retryKey, JSON.stringify({
        path: window.location.pathname,
        time: now()
      }));
    } catch (error) {}
  }

  function canRetryCurrentPath () {
    var state = readRetryState();

    return !state ||
      state.path !== window.location.pathname ||
      now() - state.time > retryTtlMs;
  }

  function cleanupRetryQuery () {
    var url = new URL(window.location.href);

    if (!url.searchParams.has('__chunk_retry')) return;

    url.searchParams.delete('__chunk_retry');
    window.history.replaceState(window.history.state, document.title, url.toString());
  }

  function isAssetScriptEvent (event) {
    var target = event && event.target;
    return !!(target &&
      target.tagName === 'SCRIPT' &&
      typeof target.src === 'string' &&
      /\/assets\/js\/.+\.js(?:[?#].*)?$/.test(target.src));
  }

  function isChunkLoadError (error) {
    if (!error) return false;

    var message = typeof error === 'string'
      ? error
      : error.message || '';

    return error.name === 'ChunkLoadError' ||
      /Loading chunk [^ ]+ failed/i.test(message);
  }

  function recoverFromChunkError () {
    if (!canRetryCurrentPath()) return;

    writeRetryState();

    var url = new URL(window.location.href);
    url.searchParams.set('__chunk_retry', now().toString());
    window.location.replace(url.toString());
  }

  window.addEventListener('load', cleanupRetryQuery);

  window.addEventListener('error', function (event) {
    if (isAssetScriptEvent(event) || isChunkLoadError(event.error)) {
      recoverFromChunkError();
    }
  }, true);

  window.addEventListener('unhandledrejection', function (event) {
    if (!isChunkLoadError(event.reason)) return;

    if (typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    recoverFromChunkError();
  });
}());
