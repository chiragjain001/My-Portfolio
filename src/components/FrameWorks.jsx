import { useEffect, useState } from "react";
import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const skills = [
    "cplusplus",
    "java",
    "python",
    "css3",
    "git",
    "github",
    "html5",
    "javascript",
    "react",
    "three",
    "threejs",
    "tailwindcss",
    "vitejs",
    "next",
    "visualstudiocode",
    "sqlite"
  ];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {/* Outer Ring */}
      <OrbitingCircles 
        iconSize={isMobile ? 35 : 50} 
        radius={isMobile ? 120 : 220}
      >
        {skills.slice(0, 7).map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>

      {/* Middle Ring */}
      <OrbitingCircles 
        iconSize={isMobile ? 25 : 40} 
        radius={isMobile ? 85 : 150} 
        reverse 
        speed={1.5}
      >
        {skills.slice(7, 12).reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>

      {/* Inner Ring */}
      <OrbitingCircles 
        iconSize={isMobile ? 20 : 30} 
        radius={isMobile ? 50 : 90} 
        speed={2}
      >
        {skills.slice(12).map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img 
    src={src} 
    alt=""
    aria-hidden="true"
    className="duration-200 rounded-sm hover:scale-110" 
    onError={(e) => { e.target.style.display = 'none'; }}
  />
);