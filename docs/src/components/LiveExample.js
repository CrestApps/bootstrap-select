import React, { useEffect, useRef } from 'react';

const MAX_INIT_ATTEMPTS = 100;

function isReady () {
  return typeof window !== 'undefined' &&
    window.bootstrap &&
    window.bootstrap.Dropdown &&
    window.Selectpicker;
}

export default function LiveExample ({ html, className = '', style }) {
  const exampleRef = useRef(null);

  useEffect(function () {
    let isDisposed = false;
    let attempts = 0;
    let timeoutId;
    let instances = [];

    function initialize () {
      if (isDisposed) return;

      if (!isReady()) {
        attempts += 1;

        if (attempts >= MAX_INIT_ATTEMPTS) {
          console.warn('bootstrap-select examples could not initialize because Bootstrap or Selectpicker did not load.');
          return;
        }

        timeoutId = window.setTimeout(initialize, 50);
        return;
      }

      instances = Array.from(exampleRef.current.querySelectorAll('select.selectpicker')).map(function (select) {
        return window.Selectpicker.getOrCreateInstance(select);
      });
    }

    initialize();

    return function () {
      isDisposed = true;
      window.clearTimeout(timeoutId);
      instances.forEach(function (instance) {
        if (instance && typeof instance.destroy === 'function') {
          instance.destroy();
        }
      });
    };
  }, [html]);

  return (
    <div
      className={'bs-docs-example ' + className}
      dangerouslySetInnerHTML={{ __html: html }}
      ref={exampleRef}
      style={style}
    />
  );
}
