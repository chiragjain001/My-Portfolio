/**
 * Globe.jsx – Phase 2 dependency fixes + Phase 4 a11y
 *
 * Phase 2:
 * - dynamicConfig memoised with useMemo so it's stable across renders
 * - Globe useEffect deps are now [rs, dynamicConfig] (stable)
 * - Variables `phi` and `width` moved to refs to avoid closure staleness
 * - isMobile value derived once via useMemo
 *
 * Phase 4:
 * - canvas has role="img" + aria-label describing the globe
 * - Container has aria-hidden if purely decorative (optional; we label it)
 */

'use client';

import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const MOVEMENT_DAMPING = 1400;

const BASE_CONFIG = {
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapBrightness: 1.2,
  baseColor:   [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor:   [1, 1, 1],
  markers: [
    { location: [14.5995,  120.9842], size: 0.03 },
    { location: [19.076,    72.8777], size: 0.1  },
    { location: [23.8103,   90.4125], size: 0.05 },
    { location: [30.0444,   31.2357], size: 0.07 },
    { location: [39.9042,  116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1  },
    { location: [19.4326,  -99.1332], size: 0.1  },
    { location: [40.7128,  -74.006 ], size: 0.1  },
    { location: [34.6937,  135.5022], size: 0.05 },
    { location: [41.0082,   28.9784], size: 0.06 },
  ],
};

export function Globe({ className, config = {} }) {
  const canvasRef             = useRef(null);
  const pointerInteracting    = useRef(null);
  const pointerMovement       = useRef(0);
  const phiRef                = useRef(0);         // Phase 2: ref instead of let
  const widthRef              = useRef(0);          // Phase 2: ref instead of let

  // Phase 2: stable config object – only recalculated when window size changes
  const isMobile = useMemo(() => (
    typeof window !== 'undefined' && window.innerWidth < 640
  ), []);

  const dynamicConfig = useMemo(() => ({
    ...BASE_CONFIG,
    ...config,
    devicePixelRatio: 1,
    mapSamples:       isMobile ? 4000 : 16000,
    width:            isMobile ? 400 : 800,
    height:           isMobile ? 400 : 800,
    onRender: () => {},    // placeholder; overridden inside useEffect
  }), [isMobile, config]); // eslint-disable-line react-hooks/exhaustive-deps

  const r  = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize, { passive: true });
    onResize();

    let globe;
    try {
      globe = createGlobe(canvasRef.current, {
        ...dynamicConfig,
        width:  widthRef.current * (isMobile ? 1 : 2),
        height: widthRef.current * (isMobile ? 1 : 2),
        onRender: (state) => {
          if (!pointerInteracting.current) phiRef.current += 0.005;
          state.phi    = phiRef.current + rs.get();
          state.width  = widthRef.current * (isMobile ? 1 : 2);
          state.height = widthRef.current * (isMobile ? 1 : 2);
        },
      });
    } catch (err) {
      console.error('[Globe] Failed to initialise cobe:', err);
    }

    // Fade in once ready
    if (canvasRef.current) {
      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = '1';
      }, 0);
    }

    return () => {
      globe?.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs, dynamicConfig, isMobile]); // Phase 2: exhaustive deps

  return (
    <div
      className={twMerge('mx-auto aspect-[1/1] w-full max-w-[600px]', className)}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive 3D globe showing worldwide locations"
        className={twMerge(
          'size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]',
        )}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={()   => updatePointerInteraction(null)}
        onPointerOut={()  => updatePointerInteraction(null)}
        onMouseMove={(e)  => updateMovement(e.clientX)}
        onTouchMove={(e)  => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}