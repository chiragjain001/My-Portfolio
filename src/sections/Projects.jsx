import Project from "../components/Project";
import { myProjects } from "../constants";

const Projects = () => {
  return (
    <section id="work" className="w-full max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 relative c-space section-spacing">
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="relative bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />

      <div className="grid gap-8 mt-8">
        {myProjects.map((project) => (
          <Project 
            key={project.id} 
            {...project} 
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
