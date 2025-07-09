import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const UFO = ({ isMobile, position, setPosition }) => {
  const { scene } = useGLTF("/assets/ufo.glb");
  const dragging = useRef(false);
  const offset = useRef([0, 0]);

  // Only enable interactivity on desktop
  const handlePointerDown = (e) => {
    if (isMobile) return;
    dragging.current = true;
    // Save offset between pointer and UFO position
    offset.current = [
      e.point.x - position[0],
      e.point.y - position[1],
    ];
    document.body.style.cursor = "grabbing";
  };
  const handlePointerUp = () => {
    if (isMobile) return;
    dragging.current = false;
    document.body.style.cursor = "default";
  };
  const handlePointerMove = (e) => {
    if (isMobile) return;
    if (dragging.current && setPosition) {
      setPosition([
        e.point.x - offset.current[0],
        e.point.y - offset.current[1],
        position[2],
      ]);
    }
  };

  return (
    <primitive
      object={scene}
      position={position}
      scale={isMobile ? 12 : 15}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onPointerMove={handlePointerMove}
      castShadow
      receiveShadow
      style={{ cursor: isMobile ? "default" : "grab" }}
    />
  );
};

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  // UFO position state (desktop only)
  const [ufoPosition, setUfoPosition] = useState(isMobile ? [-2, -4, 0] : [-8, -4, 0]);

  // Update UFO position if screen size changes
  React.useEffect(() => {
    setUfoPosition(isMobile ? [-2, -4, 0] : [-8, -4, 0]);
  }, [isMobile]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
       {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/)",
            backgroundPosition: isMobile ? "bottom right" : "bottom right",
            backgroundRepeat: "no-repeat",
            backgroundSize: isMobile ? "300px 120px" : "1500px 300px",
            y: mountain2Y,
          }}
        /> 
        {/* UFO Layer (replaces space.png) */}
        <Canvas
          className="absolute inset-0 -z-10"
          camera={{ position: [0, 0, 20], fov: 50 }}
          style={{ pointerEvents: "auto" }} // enable pointer events for interaction
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <UFO isMobile={isMobile} position={ufoPosition} setPosition={isMobile ? undefined : setUfoPosition} />
        </Canvas>
      </div>
    </section>
  );
};

export default ParallaxBackground;
