import { format } from "date-fns";
import { Activity, Cpu, Code2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  onDoubleClick: () => void;
}

export function ProjectCard({ project, onDoubleClick }: ProjectCardProps) {
  return (
    <Card
      className="relative overflow-hidden border border-muted transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] cursor-pointer"
      onDoubleClick={onDoubleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-xl">{project.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>
        <Badge
          variant={project.status === "active" ? "default" : "secondary"}
          className="bg-gradient-to-r from-primary/80 to-secondary/80 text-background"
        >
          {project.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-1 text-primary">
              <Cpu className="h-4 w-4" />
              <span>{project.connectedDevices} devices</span>
            </div>
            <div className="flex items-center space-x-1 text-secondary">
              <Activity className="h-4 w-4" />
              <span>
                {format(new Date(project.lastConnection), "MMM d, HH:mm")}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full hover:bg-primary/10 hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              onDoubleClick();
              const scriptsTab = document.querySelector('[value="scripts"]');
              if (scriptsTab instanceof HTMLElement) {
                scriptsTab.click();
              }
            }}
          >
            <Code2 className="mr-2 h-4 w-4" />
            {project.scripts.length} Scripts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
