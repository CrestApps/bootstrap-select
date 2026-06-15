import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function isReady () {
  return typeof window !== 'undefined' &&
    window.bootstrap &&
    window.bootstrap.Dropdown &&
    window.Selectpicker;
}

function LiveExampleInner ({ html, className = '', style }) {
  const exampleRef = useRef(null);

  useEffect(function () {
    let isDisposed = false;
    let timeoutId;
    let instances = [];
    const scriptListeners = [];
    const windowListeners = [];

    function destroyInstances () {
      instances.forEach(function (instance) {
        if (instance && typeof instance.destroy === 'function') {
          instance.destroy();
        }
      });

      instances = [];
    }

    function scheduleInitialize (delay) {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(initialize, delay);
    }

    function attachWindowListener (type, handler) {
      window.addEventListener(type, handler);
      windowListeners.push(function () {
        window.removeEventListener(type, handler);
      });
    }

    function initialize () {
      if (isDisposed || !exampleRef.current) return;

      if (!isReady()) {
        scheduleInitialize(100);
        return;
      }

      // Keep the marker class in place so a remount can't strand the examples
      // as plain selects before the assets finish loading.
      instances = Array.from(exampleRef.current.querySelectorAll('select.selectpicker')).map(function (select) {
        return window.Selectpicker.getOrCreateInstance(select);
      });

      window.requestAnimationFrame(function () {
        if (isDisposed) return;

        instances.forEach(function (instance) {
          if (instance && typeof instance.refresh === 'function') {
            instance.refresh();
          }
        });
      });
    }

    function attachScriptListener (script) {
      const onLoad = function () {
        scheduleInitialize(0);
      };

      script.addEventListener('load', onLoad);
      scriptListeners.push(function () {
        script.removeEventListener('load', onLoad);
      });
    }

    function handleHashChange () {
      scheduleInitialize(0);
      scheduleInitialize(100);
    }

    attachWindowListener('load', initialize);
    attachWindowListener('hashchange', handleHashChange);
    attachWindowListener('resize', function () {
      scheduleInitialize(0);
    });

    Array.from(document.querySelectorAll('script[src]')).forEach(function (script) {
      if (/bootstrap(?:\.bundle)?(?:\.min)?\.js|bootstrap-select(?:\.min)?\.js/i.test(script.src)) {
        attachScriptListener(script);
      }
    });

    initialize();

    return function () {
      isDisposed = true;
      window.clearTimeout(timeoutId);
      windowListeners.forEach(function (removeListener) {
        removeListener();
      });
      scriptListeners.forEach(function (removeListener) {
        removeListener();
      });
      destroyInstances();
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

export default function LiveExample (props) {
  return (
    <BrowserOnly fallback={<div className={'bs-docs-example ' + (props.className || '')} style={props.style} />}>
      {function () {
        return <LiveExampleInner {...props} />;
      }}
    </BrowserOnly>
  );
}
