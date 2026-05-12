/**
 * App.jsx – Phase 1 + Phase 2 (Memory Management) Enhanced
 *
 * Phase 1:
 * - All section components lazy-loaded via React.lazy + <Suspense>
 * - <PageLoader /> shown while the initial JS chunk is being parsed
 *
 * Phase 2 (Lenis):
 * - RAF id stored in a ref so it can be cancelled in cleanup
 * - lenis.destroy() called in cleanup
 * - lenisRef used throughout so the closure always sees the live instance
 */

import React, {
  lazy,
  Suspense,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { LenisContext } from './LenisContext';
import { PageLoader } from './components/Loader';

// ── Eager-load shell components (tiny, always needed) ───────────────────────
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

// ── Lazy-load heavy sections (3D components live inside these) ───────────────
const Hero        = lazy(() => import('./sections/Hero'));
const About       = lazy(() => import('./sections/About'));
const Projects    = lazy(() => import('./sections/Projects'));
const Experiences = lazy(() => import('./sections/Experiences'));
const Contact     = lazy(() => import('./sections/Contact'));

// Memoised section wrapper – opacity fade only (NO y-transform = no layout recalc jank)
const Section = React.memo(({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    style={{ willChange: 'opacity' }}
  >
    {children}
  </motion.div>
));
Section.displayName = 'Section';


// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
const App = () => {
  const lenisRef     = useRef(null);
  const rafIdRef     = useRef(null); // ← stores the active rAF id for cancellation
  const [lenisInstance, setLenisInstance] = useState(null);

  // ── Lenis initialisation with proper cleanup (Phase 2) ──────────────────
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.0,          // shorter duration = less perceived lag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothTouch: false,     // native touch scroll is already smooth on iOS
      touchMultiplier: 1.5,
      infinite: false,
    });

    setLenisInstance(lenisRef.current);

    const raf = (time) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      // Cancel the loop BEFORE destroying so no further .raf() calls happen
      cancelAnimationFrame(rafIdRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []); // empty deps: setup once, teardown once

  // ── Scroll progress bar ──────────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  // Tight spring so progress bar snaps quickly without lag
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  const ProgressBar = useMemo(
    () => (
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 origin-left z-50"
        style={{ scaleX }}
        aria-hidden="true"
      />
    ),
    [scaleX],
  );

  return (
    <LenisContext.Provider value={lenisInstance}>
      {ProgressBar}
      <div className="container mx-auto w-full c-space flex flex-col min-h-screen">
        <motion.div
          style={{ flexGrow: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Navbar is eager – always visible immediately */}
          <Navbar />

          {/* Each section lazy-loads its own JS chunk.
              <PageLoader /> is the Suspense fallback shown during chunk fetch. */}
          <Suspense fallback={<PageLoader />}>
            <Section>
              <div id="home">
                <Hero />
              </div>
            </Section>
          </Suspense>

          <Suspense fallback={null}>
            <Section delay={0.1}>
              <div id="about">
                <About />
              </div>
            </Section>
          </Suspense>

          <Suspense fallback={null}>
            <Section delay={0.2}>
              <div id="work">
                <Projects />
              </div>
            </Section>
          </Suspense>

          <Suspense fallback={null}>
            <Section delay={0.25}>
              <div id="journey">
                <Experiences />
              </div>
            </Section>
          </Suspense>

          <Suspense fallback={null}>
            <Section delay={0.3}>
              <div id="contact">
                <Contact />
              </div>
            </Section>
          </Suspense>
        </motion.div>

        <Footer />
      </div>
    </LenisContext.Provider>
  );
};

export default React.memo(App);
