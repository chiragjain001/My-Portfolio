import { ErrorBoundary } from 'react-error-boundary';

/**
 * Polished fallback shown when the WebGL context crashes or fails to initialise.
 * Shows an icon, a user-friendly message, and a "Try Again" button.
 */
function WebGLFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(2,6,23,0.97) 100%)',
        backdropFilter: 'blur(12px)',
        zIndex: 10,
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      {/* Icon */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        style={{ filter: 'drop-shadow(0 0 14px rgba(248,113,113,0.5))' }}
      >
        <circle cx="28" cy="28" r="26" stroke="rgba(248,113,113,0.25)" strokeWidth="2" />
        <path
          d="M28 18v12M28 36v2"
          stroke="#f87171"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 44L28 16l16 28H12z"
          stroke="#f87171"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="rgba(248,113,113,0.08)"
        />
      </svg>

      <h3
        style={{
          margin: 0,
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '-0.01em',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        3D Scene Unavailable
      </h3>

      <p
        style={{
          margin: 0,
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.8rem',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.4)',
          maxWidth: '280px',
        }}
      >
        Your browser's WebGL context couldn't be initialised. This may be due to
        hardware acceleration being disabled or an unsupported GPU.
      </p>

      {/* Optional: show technical details in dev */}
      {import.meta.env.DEV && error?.message && (
        <pre
          style={{
            margin: 0,
            padding: '8px 12px',
            background: 'rgba(248,113,113,0.08)',
            border: '1px solid rgba(248,113,113,0.2)',
            borderRadius: '6px',
            fontSize: '0.65rem',
            color: '#f87171',
            maxWidth: '340px',
            overflowX: 'auto',
            textAlign: 'left',
          }}
        >
          {error.message}
        </pre>
      )}

      <button
        onClick={resetErrorBoundary}
        style={{
          padding: '10px 24px',
          borderRadius: '9999px',
          border: '1px solid rgba(129,140,248,0.4)',
          background: 'linear-gradient(135deg, rgba(129,140,248,0.15) 0%, rgba(56,189,248,0.15) 100%)',
          color: 'rgba(255,255,255,0.85)',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, rgba(129,140,248,0.3) 0%, rgba(56,189,248,0.3) 100%)';
          e.currentTarget.style.borderColor = 'rgba(129,140,248,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, rgba(129,140,248,0.15) 0%, rgba(56,189,248,0.15) 100%)';
          e.currentTarget.style.borderColor = 'rgba(129,140,248,0.4)';
        }}
      >
        Try Again
      </button>
    </div>
  );
}

/**
 * Drop-in wrapper for any <Canvas>. Catches WebGL crashes and context-lost events.
 *
 * Usage:
 *   <WebGLErrorBoundary>
 *     <Canvas ...>...</Canvas>
 *   </WebGLErrorBoundary>
 */
export default function WebGLErrorBoundary({ children, style }) {
  return (
    <ErrorBoundary
      FallbackComponent={WebGLFallback}
      onError={(error, info) => {
        // In production you'd send this to Sentry/Datadog etc.
        console.error('[WebGL Error Boundary]', error, info);
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
        {children}
      </div>
    </ErrorBoundary>
  );
}
