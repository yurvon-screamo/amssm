import { Badge } from '@/components/ui/badge';

interface TaskStatusBadgeProps {
  status: 'scheduled' | 'running' | 'completed' | 'failed';
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const variants = {
    scheduled: 'bg-blue-500 hover:bg-blue-600',
    running: 'bg-yellow-500 hover:bg-yellow-600',
    completed: 'bg-green-500 hover:bg-green-600',
    failed: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <Badge className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}