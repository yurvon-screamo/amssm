import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Calendar, Server, User, Terminal } from 'lucide-react';
import { TaskExecution } from '@/types/project';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { TaskStatusBadge } from './TaskStatusBadge';

interface CompletedTasksListProps {
  tasks: TaskExecution[];
}

export function CompletedTasksList({ tasks }: CompletedTasksListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const filteredTasks = tasks.filter(task =>
    task.scriptName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTask = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (expandedTasks.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

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
          <Collapsible
            key={task.id}
            open={expandedTasks.has(task.id)}
            onOpenChange={() => toggleTask(task.id)}
          >
            <Card className="hover:border-primary/50 transition-all duration-300">
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
                <div className="flex items-center gap-4">
                  <TaskStatusBadge status={task.status} />
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {expandedTasks.has(task.id) ? 'Hide Details' : 'Show Details'}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Executed: {format(new Date(task.startedAt!), 'PPp')}</span>
                  </div>
                  {task.executedBy && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.executedBy.avatar} />
                          <AvatarFallback>
                            {task.executedBy.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.executedBy.name}</span>
                      </div>
                    </div>
                  )}
                </div>

                <CollapsibleContent>
                  <div className="mt-4 space-y-4">
                    <div>
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

                    {task.log && (
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                          <Terminal className="h-4 w-4" />
                          Execution Log:
                        </h4>
                        <pre className="text-sm bg-muted/30 p-4 rounded-lg overflow-x-auto">
                          {task.log}
                        </pre>
                      </div>
                    )}

                    {task.error && (
                      <div>
                        <h4 className="text-sm font-medium mb-1 text-destructive">Error:</h4>
                        <pre className="text-sm bg-destructive/10 text-destructive p-4 rounded-lg overflow-x-auto">
                          {task.error}
                        </pre>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </CardContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}