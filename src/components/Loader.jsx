import { useProgress, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

// ---------- R3F In-Canvas Loader (used inside <Suspense> inside <Canvas>) ----------
export default function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html center as="div" style={{ pointerEvents: 'none' }}>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white/40 tracking-tighter">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/20 font-light">
          Initialising Core
        </p>
      </div>
    </Html>
  );
}

// ---------- Modern Cinematic Page Loader ----------
export function PageLoader() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030412]"
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-indigo-500/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Cinematic Logo / Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-2">
                CHIRAG <span className="text-indigo-500">JAIN</span>
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 bg-white/20" />
                <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-medium">
                  Portfolio © {new Date().getFullYear()}
                </p>
                <div className="h-[1px] w-8 bg-white/20" />
              </div>
            </motion.div>

            {/* Cinematic Progress Indicator */}
            <div className="mt-20 flex flex-col items-center w-64">
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 to-sky-400"
                />
                {/* Shimmer effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </div>

              <div className="mt-4 flex justify-between w-full">
                <motion.span 
                  className="text-[9px] uppercase tracking-widest text-white/20 font-bold"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Systems Check
                </motion.span>
                <span className="text-[9px] font-mono text-indigo-400/80">
                  {Math.floor(progress).toString().padStart(3, '0')}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Element */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500/50 to-transparent" />
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/10">
              Immersive Environment
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}