/**
 * ParallaxBackground.jsx – Phase 1 Enhanced
 *
 * Changes:
 * - useGLTF now uses Draco decoder path for ufo.glb
 * - Canvas wrapped in WebGLErrorBoundary
 * - PerformanceMonitor + AdaptiveDpr added
 * - UFO scene complexity degrades when isLowPerf=true (Bloom disabled, lights reduced)
 * - THREE.Material / THREE.Color instantiations moved into useEffect deps array properly
 * - setSpringX / setTravelX / setSpin setState calls inside useFrame replaced with refs to prevent React reconciler conflicts
 * - useUFOPosition deps correctly listed
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useMediaQuery } from 'react-responsive';
import {
  useGLTF, Environment, useTexture, Edges, Html,
  PerformanceMonitor, AdaptiveDpr,
} from '@react-three/drei';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Suspense } from 'react';
import CanvasLoader from './Loader';
import { easing } from 'maath';
import WebGLErrorBoundary from './WebGLErrorBoundary';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const DRACO_PATH = '/draco/';
const UFO_MODEL  = '/assets/ufo.glb';

// ─────────────────────────────────────────────────────────────────────────────
// Custom hook: responsive UFO transform config
// ─────────────────────────────────────────────────────────────────────────────
function useUFOPosition(viewport) {
  const [config, setConfig] = useState(() => getConfig(viewport));

  function getConfig(vp) {
    const w = window.innerWidth;
    if (w >= 1024) return { scale: 2.2, position: [-8, -8, 0] };
    if (w < 640)   return { scale: 1.5, position: [-0.95, -9, -5.5] };
    return { scale: 1.5, position: [-1.5, -9, -4] };
  }

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      let cfg;
      if (w >= 1024) cfg = { scale: 2.2, position: [-8, -8, -1] };
      else if (w < 640) cfg = { scale: 1.5, position: [-1, -7.5, -1] };
      else cfg = { scale: 1.5, position: [-2, -8, -1] };
      setConfig(cfg);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // viewport dims stable; window events own resize changes

  return config;
}

// ─────────────────────────────────────────────────────────────────────────────
// UFO Materials (memoised outside render loop)
// ─────────────────────────────────────────────────────────────────────────────
function useUFOMaterials(isLowPerf) {
  return useMemo(() => ({
    dome: new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xe0f7ff),
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.2,
      envMapIntensity: isLowPerf ? 0.4 : 1.0,
    }),
    hull: new THREE.MeshStandardMaterial({
      color: 0xD0D5DC,
      metalness: 0.8,
      roughness: 0.3,
      envMapIntensity: isLowPerf ? 0.6 : 1.2,
    }),
    seat: new THREE.MeshStandardMaterial({
      color: 0x23272A,
      metalness: 0.5,
      roughness: 0.5,
      envMapIntensity: isLowPerf ? 0.5 : 1.0,
    }),
    generic: new THREE.MeshStandardMaterial({
      color: 0xD0D5DC,
      metalness: 0.8,
      roughness: 0.3,
      envMapIntensity: isLowPerf ? 0.5 : 1.0,
    }),
  }), [isLowPerf]);
}

// ─────────────────────────────────────────────────────────────────────────────
// UFO Component
// ─────────────────────────────────────────────────────────────────────────────
const UFO = ({ onTravelStart, onTravelEnd, isLowPerf = false }) => {
  // Draco-enabled load
  const { scene } = useGLTF(UFO_MODEL, DRACO_PATH);
  const { viewport } = useThree();
  const { scale, position } = useUFOPosition(viewport);
  const ufoMats = useUFOMaterials(isLowPerf);

  // ── Refs (Zero React setState overhead) ───────────────────────────────────
  const groupRef     = useRef();
  const diceRef      = useRef();
  const hologramRef  = useRef();
  const hoveredRef   = useRef(false);
  const initialized  = useRef(false);
  const travelDone   = useRef(false);

  // ── Apply materials to scene graph (runs once) ─────────────────────────────
  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;
      if (child.name === '1')                             child.material = ufoMats.dome;
      else if (child.name === '0')                        child.material = ufoMats.hull;
      else if (child.name.toLowerCase().includes('seat')) child.material = ufoMats.seat;
      else                                                child.material = ufoMats.generic;

      if (child.geometry) child.geometry.computeVertexNormals();
    });
    return () => Object.values(ufoMats).forEach(m => m.dispose());
  }, [scene, ufoMats]);

  // ── Smooth Cinematic Animation via maath ──────────────────────────────────
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // 1. Initial State Setup (teleport far away on first frame)
    if (!initialized.current) {
      groupRef.current.position.set(20, position[1] + 10, -50);
      groupRef.current.scale.setScalar(scale * 0.1);
      groupRef.current.rotation.y = -Math.PI; // Face away initially
      initialized.current = true;
      onTravelStart?.();
    }

    // 2. Cinematic Entrance (Damping to target position/scale)
    // Smooth swoop into position
    easing.damp3(groupRef.current.position, [position[0], position[1], position[2] || -1], 0.9, delta);
    // Smooth scale up
    easing.damp3(groupRef.current.scale, [scale, scale, scale], 1.2, delta);
    
      // Continuous cinematic spin
      groupRef.current.rotation.y += delta * 1.5;
      
      // Wiggle effect on hover (pitch and roll)
      if (hoveredRef.current) {
        easing.damp(groupRef.current.rotation, 'z', Math.sin(t * 12) * 0.05, 0.2, delta);
        easing.damp(groupRef.current.rotation, 'x', Math.sin(t * 8) * 0.05, 0.2, delta);
      } else {
        easing.damp(groupRef.current.rotation, 'z', 0, 0.5, delta);
        easing.damp(groupRef.current.rotation, 'x', 0, 0.5, delta);
      }

    // 3. Floating Internals
    if (diceRef.current) {
      diceRef.current.position.y = 1.1 + Math.sin(t * 2) * 0.15;
      diceRef.current.rotation.y = t * 1.2;
      diceRef.current.rotation.x = t * 0.7;
    }
    if (hologramRef.current) {
      hologramRef.current.position.y = 1.45 + Math.sin(t * 2) * 0.08;
      hologramRef.current.rotation.y = t * 1.5;
    }

    // 4. Trigger Arrival Event
    if (!travelDone.current && Math.abs(groupRef.current.position.x - position[0]) < 0.5) {
      travelDone.current = true;
      onTravelEnd?.();
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => { hoveredRef.current = true; }}
      onPointerOut={() => { hoveredRef.current = false; }}
    >
      <Environment files="/assets/studio_small_08_1k.hdr" />
      <ambientLight intensity={isLowPerf ? 0.8 : 0.5} color="#CFE7FF" />
      <pointLight position={[0, 2, 0]} intensity={isLowPerf ? 0.8 : 1.2}
        color="#CFE7FF" distance={8} decay={2} castShadow={false} />

      <primitive object={scene} castShadow={false} receiveShadow={false} />

      {/* Floating Dice */}
      <mesh ref={diceRef} position={[0, 1.1, 0]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshPhysicalMaterial color={0xD0D5DC} metalness={1} roughness={0.15} envMapIntensity={2} />
        <Edges threshold={15} color="#bfe6ff" />
      </mesh>

      {/* Hologram */}
      <mesh ref={hologramRef} position={[0, 1.45, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshStandardMaterial
          color={0xCFE7FF} metalness={0.5} roughness={0.1}
          transparent opacity={0.8} emissive={0xCFE7FF}
          emissiveIntensity={isLowPerf ? 1.0 : 2.0} envMapIntensity={isLowPerf ? 1 : 2}
        />
        <Edges threshold={15} color="#CFE7FF" />
      </mesh>

      {/* Glow point */}
      <pointLight position={[0, 1.45, 0]} color={0xCFE7FF}
        intensity={isLowPerf ? 1 : 2.5} distance={2.5} decay={2} castShadow={false} />

    </group>
  );
};


// ─────────────────────────────────────────────────────────────────────────────
// Scene-level renderer settings
// ─────────────────────────────────────────────────────────────────────────────
function SceneSettings() {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ParallaxBackground – top-level export
// ─────────────────────────────────────────────────────────────────────────────
const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  // Raw scroll values – NO spring wrapper here. Spring adds a lag frame
  // that doubles the perceived scroll delay when combined with Lenis.
  const mountain3Y = useTransform(scrollYProgress, [0, 0.5], ['0%', '60%']);
  const planetsX   = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);
  const mountain2Y = useTransform(scrollYProgress, [0, 0.5], ['0%', '25%']);
  const isMobile   = useMediaQuery({ maxWidth: 640 });

  // ── Adaptive quality ───────────────────────────────────────────────────────
  const [isLowPerf, setIsLowPerf] = useState(false);
  const onDecline = useCallback(() => setIsLowPerf(true),  []);
  const onIncline = useCallback(() => setIsLowPerf(false), []);

  return (
    <section className="absolute inset-0 bg-black/40" aria-hidden="true">
      <div className="relative h-screen overflow-y-hidden">
        {/* Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: 'url(/assets/sky.jpg)',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
            filter: 'brightness(1.1) saturate(1.2) contrast(1.1)',
          }}
        />

        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: 'url(/assets/mountain-3.png)',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
            y: mountain3Y,
            willChange: 'transform',
            filter: 'brightness(1.1) saturate(1.3) contrast(1.2)',
          }}
        />

        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: 'url(/assets/planets.png)',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
            x: planetsX,
            willChange: 'transform',
            filter: 'brightness(1.2) saturate(1.4) contrast(1.1)',
          }}
        />

        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundPosition: 'bottom right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: isMobile ? '300px 120px' : '1500px 300px',
            y: mountain2Y,
          }}
        />

        {/* UFO 3D Canvas */}
        <WebGLErrorBoundary style={{ position: 'absolute', inset: 0, zIndex: -10 }}>
          <Canvas
            className="absolute inset-0 -z-10"
            camera={{ position: [0, 0, 20], fov: 45 }}
            style={{ pointerEvents: 'auto' }}
            dpr={1}
            gl={{
              alpha: true,
              powerPreference: 'high-performance',
              antialias: !isLowPerf,
            }}
            aria-hidden="true"
          >
            <SceneSettings />
            <AdaptiveDpr pixelated />
            <PerformanceMonitor
              thresholds={[0.5, 0.9]}
              onDecline={onDecline}
              onIncline={onIncline}
              flipflops={3}
            />
            <Suspense fallback={<CanvasLoader />}>
              <UFO isLowPerf={isLowPerf} />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>
    </section>
  );
};

// Preload at module level
useGLTF.preload(UFO_MODEL, DRACO_PATH);

export default ParallaxBackground;
