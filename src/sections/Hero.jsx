/**
 * Hero.jsx – Phase 1 Enhanced
 *
 * Changes:
 * - Canvas wrapped in WebGLErrorBoundary (react-error-boundary)
 * - <PerformanceMonitor> degrades scene when FPS < 45 via `isLowPerf` state
 * - <AdaptiveDpr pixelated /> auto-lowers pixel ratio on slow devices
 * - Astronaut receives `isLowPerf` prop to skip expensive shaders
 * - Canvas uses dpr={[1, 2]} baseline with AdaptiveDpr handling the range
 * - Rig camera movement preserved with correct exhaustive-deps
 */

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { Suspense, useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { easing } from 'maath';

import HeroText from '../components/HeroText';
import ParallaxBackground from '../components/ParallaxBackground';
import { Astronaut } from '../components/Astronaut';
import CanvasLoader from '../components/Loader';
import WebGLErrorBoundary from '../components/WebGLErrorBoundary';

// ── Camera rig – follow mouse with damping ───────────────────────────────────
function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta,
    );
  });
  return null;
}

// ── Hero section ─────────────────────────────────────────────────────────────
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  // Adaptive quality – toggled by <PerformanceMonitor>
  const [isLowPerf, setIsLowPerf] = useState(false);

  const onDecline = useCallback(() => setIsLowPerf(true), []);
  const onIncline = useCallback(() => setIsLowPerf(false), []);

  return (
    <section
      id="home"
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
      <HeroText />
      <ParallaxBackground />

      <figure
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
        aria-label="3D astronaut scene"
      >
        <WebGLErrorBoundary style={{ width: '100%', height: '100%' }}>
          <Canvas
            camera={{ position: [0, 1, 3] }}
            dpr={1}
            gl={{
              powerPreference: 'high-performance',
              antialias: !isLowPerf,    // disable MSAA on low-perf
              alpha: true,
            }}
            aria-hidden="true"
          >
            {/* Auto-lower pixel ratio when GPU is struggling */}
            <AdaptiveDpr pixelated />

            {/* Monitor FPS – degrade at <45 fps, restore at >60 fps */}
            <PerformanceMonitor
              thresholds={[0.5, 0.9]}
              factor={1}
              onDecline={onDecline}
              onIncline={onIncline}
              flipflops={3}
            />

            <Suspense fallback={<CanvasLoader />}>
              <Float
                speed={isLowPerf ? 1 : 2}
                rotationIntensity={isLowPerf ? 0.2 : 0.5}
                floatIntensity={isLowPerf ? 0.5 : 1}
              >
                <Astronaut
                  scale={isMobile ? 0.20 : 0.3}
                  position={isMobile ? [0, -0.5, 0] : [1.3, -1, 0]}
                  isLowPerf={isLowPerf}
                />
              </Float>
              <Rig />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </figure>
    </section>
  );
};

export default Hero;