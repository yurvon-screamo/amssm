import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Calendar, Server } from 'lucide-react';
import { TaskExecution } from '@/types/project';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TaskStatusBadge } from './TaskStatusBadge';

interface ScheduledTasksListProps {
  tasks: TaskExecution[];
}

export function ScheduledTasksList({ tasks }: ScheduledTasksListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.scriptName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8 bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <h3 className="font-semibold">{task.scriptName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Server className="h-4 w-4" />
                    <span>{task.equipmentName}</span>
                  </div>
                </div>
              </div>
              <TaskStatusBadge status={task.status} />
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Scheduled for: {format(new Date(task.scheduledFor!), 'PPp')}</span>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">Parameters:</h4>
                <div className="text-sm text-muted-foreground">
                  {Object.entries(task.parameters).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="font-medium">{key}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}