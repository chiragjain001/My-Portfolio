/**
 * CustomCursor.jsx – Ultra High-Performance Vanilla JS Implementation
 *
 * A perfectly smooth magnetic cursor that:
 * - Completely bypasses React renders and Framer Motion physics for zero lag
 * - Uses requestAnimationFrame and direct DOM mutation for 60fps+ smoothness
 * - Expands + changes colour when hovering interactive elements
 * - Auto-hides on touch devices
 */

import { useEffect, useRef } from 'react';

// Linear interpolation for smooth catching up
const lerp = (start, end, factor) => start + (end - start) * factor;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);

  // Track raw positions in mutable refs to avoid React renders
  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100, scale: 1 });
  const ring = useRef({ x: -100, y: -100, scale: 1, opacity: 1 });

  const isHovering = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        // Snap instantly on first move
        dot.current.x = e.clientX;
        dot.current.y = e.clientY;
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, [role="button"], [data-cursor-hover], input, textarea, select') !== null;
      if (isInteractive) {
        isHovering.current = true;
      }
    };

    const onMouseOut = (e) => {
      const target = e.relatedTarget;
      const leaving = !target || !target.closest('a, button, [role="button"], [data-cursor-hover], input, textarea, select');
      if (leaving) {
        isHovering.current = false;
      }
    };

    const onMouseLeave = () => { ring.current.opacity = 0; };
    const onMouseEnter = () => { ring.current.opacity = 1; };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    document.documentElement.style.cursor = 'none';

    // Core Animation Loop
    const animate = () => {
      if (isVisible.current) {
        const targetDotScale = isHovering.current ? 0.4 : 1;
        const targetRingScale = isHovering.current ? 2.4 : 1;

        // Snappy movement for dot, magnetic slower movement for ring
        dot.current.x = lerp(dot.current.x, mouse.current.x, 0.8);
        dot.current.y = lerp(dot.current.y, mouse.current.y, 0.8);
        dot.current.scale = lerp(dot.current.scale, targetDotScale, 0.2);

        ring.current.x = lerp(ring.current.x, mouse.current.x, 0.3);
        ring.current.y = lerp(ring.current.y, mouse.current.y, 0.3);
        ring.current.scale = lerp(ring.current.scale, targetRingScale, 0.15);

        // Mutate DOM directly via style
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(calc(${dot.current.x}px - 50%), calc(${dot.current.y}px - 50%), 0) scale(${dot.current.scale})`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%), 0) scale(${ring.current.scale})`;
          ringRef.current.style.opacity = ring.current.opacity;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.style.cursor = '';
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(129, 140, 248, 0.7)',
          boxShadow: '0 0 12px rgba(129,140,248,0.3)',
          mixBlendMode: 'normal',
          willChange: 'transform',
          opacity: 0, // Starts hidden until moved
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
          boxShadow: '0 0 8px rgba(129,140,248,0.8)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
