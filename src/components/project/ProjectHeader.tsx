import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Activity, Cpu } from 'lucide-react';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-2xl">{project.icon}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
        <Badge
          variant={project.status === 'active' ? 'default' : 'secondary'}
          className="bg-gradient-to-r from-primary/80 to-secondary/80"
        >
          {project.status}
        </Badge>
      </div>
      
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-1 text-primary">
          <Cpu className="h-4 w-4" />
          <span>{project.connectedDevices} devices</span>
        </div>
        <div className="flex items-center gap-1 text-secondary">
          <Activity className="h-4 w-4" />
          <span>Last active: {format(new Date(project.lastConnection), 'MMM d, HH:mm')}</span>
        </div>
      </div>
    </div>
  );
}