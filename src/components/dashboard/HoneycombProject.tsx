import { format } from 'date-fns';
import { Activity, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';

interface HoneycombProjectProps {
  project: Project;
}

export function HoneycombProject({ project }: HoneycombProjectProps) {
  return (
    <div className="content flex flex-col items-center justify-between h-full p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl">{project.icon}</span>
        <h3 className="font-semibold text-sm">{project.name}</h3>
        <Badge
          variant={project.status === 'active' ? 'default' : 'secondary'}
          className="text-xs"
        >
          {project.status}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex items-center justify-center gap-1">
          <Cpu className="h-3 w-3" />
          <span>{project.connectedDevices} devices</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Activity className="h-3 w-3" />
          <span>{format(new Date(project.lastConnection), 'MMM d, HH:mm')}</span>
        </div>
      </div>
    </div>
  );
}