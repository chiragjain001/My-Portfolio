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
    <div className="relative flex h-[15rem] md:h-[20rem] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles 
        iconSize={isMobile ? 30 : 40} 
        radius={isMobile ? 80 : 160}
      >
        {skills.slice(0, 8).map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles 
        iconSize={isMobile ? 20 : 25} 
        radius={isMobile ? 50 : 100} 
        reverse 
        speed={2}
      >
        {skills.slice(8).reverse().map((skill, index) => (
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