import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

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
