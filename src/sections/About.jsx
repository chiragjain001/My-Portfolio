import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">

        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            alt=""
            aria-hidden="true"
            className="absolute scale-[1.2] sm:scale-[1.75] -right-[2rem] sm:-right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] opacity-50 sm:opacity-100"
          />
          <div className="z-10">
            <p className="text-lg sm:text-xl mt-2 mb-2">Hi, I’m Chirag Jain — Full-Stack Developer & AI Engineer.</p>
            <p className="subtext">
              I build scalable web applications and AI-powered products with a strong focus on performance, clean architecture, and modern user experiences. Passionate about transforming complex ideas into impactful digital solutions using React, Next.js, Node.js, Python, FastAPI, and LLM technologies.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>

        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="RAG Pipelines"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="System Design"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="LLM APIs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="REST APIs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="FastAPI"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "15deg", bottom: "10%", left: "5%" }}
              text="Vector DBs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-15deg", top: "40%", right: "10%" }}
              text="SSE Streaming"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "45deg", bottom: "5%", left: "30%" }}
              text="Prompt Engineering"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-60deg", top: "15%", right: "5%" }}
              text="LangChain"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "10deg", bottom: "50%", left: "75%" }}
              text="Semantic Search"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/react.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/next.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/javascript.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "25deg", top: "5%", right: "20%" }}
              image="assets/logos/three.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-15deg", bottom: "10%", right: "5%" }}
              image="assets/logos/github.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "10deg", top: "45%", left: "50%" }}
              image="assets/logos/tailwindcss.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>

        <div className="grid-black-color grid-3">
          <div className="z-10 w-[70%] md:w-[60%] pointer-events-none">
            <p className="headtext">Time Zone</p>
            <p className="subtext">I'm based in Mars, and open to remote work worldwide</p>
          </div>

          <figure className="absolute right-0 bottom-0 md:-right-[20%] md:-bottom-[20%] md:left-[30%] top-[40%] md:top-[10%] opacity-100">
            <Globe />
          </figure>
        </div>

        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>

        <div className="grid-default-color grid-5">
          <div className="z-10 w-[60%] pointer-events-none">
            <p className="headtext">Tech Stack</p>
            <p className="subtext">I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications</p>
          </div>
          <div className="absolute inset-y-0 w-full h-full left-[25%] md:left-[50%] opacity-100 pointer-events-none">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  )
};

export default About;