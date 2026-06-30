import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// The examples/options pages render live bootstrap-select demos that initialize
// asynchronously and grow the page height AFTER Docusaurus has already done its
// initial hash scroll. The result is that deep links (e.g. .../examples/#some-id)
// land at the wrong offset - usually the top of the page - which makes the target
// section look like it does not exist.
//
// Docusaurus also enables smooth scrolling and performs its own scroll handling on
// hydration, so a one-shot scroll is unreliable. Instead, once the route content is
// mounted we continuously re-pin the viewport to the hash target (instantly,
// bypassing smooth scrolling) for a short window so it stays aligned while the demos
// reflow the page. We stop the moment the visitor interacts so we never hijack their
// scrolling. `onRouteDidUpdate` is the key hook: it fires AFTER the page content has
// rendered, which is when the target heading actually exists in the DOM.
const INTERACTION_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'];
const PIN_DURATION_MS = 3000;

let activePin = null;

function getHashTarget () {
  const hash = window.location.hash;

  if (!hash || hash.length < 2) return null;

  let id;

  try {
    id = decodeURIComponent(hash.slice(1));
  } catch (error) {
    id = hash.slice(1);
  }

  return document.getElementById(id);
}

function startPin () {
  if (!ExecutionEnvironment.canUseDOM) return;

  const hash = window.location.hash;

  if (!hash || hash.length < 2) return;

  if (activePin) activePin.stop();

  let cancelled = false;
  let rafId;
  const start = Date.now();

  function cleanup () {
    if (rafId) window.cancelAnimationFrame(rafId);

    INTERACTION_EVENTS.forEach(function (type) {
      window.removeEventListener(type, stop);
    });

    if (activePin && activePin.stop === stop) activePin = null;
  }

  function stop () {
    cancelled = true;
    cleanup();
  }

  INTERACTION_EVENTS.forEach(function (type) {
    window.addEventListener(type, stop, { passive: true });
  });

  activePin = { stop: stop };

  function tick () {
    if (cancelled) return;

    const target = getHashTarget();

    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
    }

    if (Date.now() - start < PIN_DURATION_MS) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      cleanup();
    }
  }

  tick();
}

export function onRouteDidUpdate () {
  startPin();
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('load', startPin);
  window.addEventListener('hashchange', startPin);
}
