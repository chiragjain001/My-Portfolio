import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState, useCallback } from "react";

// Utility function to throttle a function call
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Optimized spring config for smoother movement
  const springX = useSpring(x, { 
    damping: 25, 
    stiffness: 150,
    mass: 0.5
  });
  const springY = useSpring(y, { 
    damping: 25, 
    stiffness: 150,
    mass: 0.5
  });

  // Throttled mouse move handler
  const handleMouseMove = useCallback(throttle((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left + 20);
    y.set(e.clientY - rect.top + 20);
  }, 50), [x, y]); // Throttle to 50ms

  const [preview, setPreview] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <section id="work" onMouseMove={handleMouseMove} className="relative c-space section-spacing">
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="relative bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />

      <div className="grid gap-8 mt-8">
        {myProjects.map((project) => (
          <Project 
            key={project.id} 
            {...project} 
            setPreview={setPreview}
          />
        ))}
      </div>

      {mounted && preview &&
        createPortal(
          <motion.img
            className="fixed top-0 left-0 z-50 object-contain h-56 rounded-lg shadow-lg pointer-events-none w-80"
            src={preview}
            style={{ 
              x: springX, 
              y: springY,
              willChange: 'transform',
              transform: 'translate3d(0,0,0)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />,
          document.body
        )
      }
    </section>
  );
};

export default Projects;
