import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Workaround for React DevTools semver error with React 19 & custom renderers
if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  const originalInject = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function (renderer) {
    if (renderer && (!renderer.version || renderer.version === '')) {
      renderer.version = '19.0.0';
    }
    return originalInject.apply(this, arguments);
  };
}

// Phase 5: Custom cursor – lazy so it doesn't block initial paint
const CustomCursor = lazy(() => import('./components/CustomCursor'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Cursor renders outside App tree so it never re-mounts */}
    <Suspense fallback={null}>
      <CustomCursor />
    </Suspense>
    <App />
  </StrictMode>,
);
