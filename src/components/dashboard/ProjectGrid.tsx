import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDoubleClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ))}
    </div>
  );
}
