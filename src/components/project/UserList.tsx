import { User } from '@/types/project';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const roleColors = {
    admin: 'bg-red-500',
    operator: 'bg-blue-500',
    viewer: 'bg-green-500',
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="hover:border-primary/50 transition-all duration-300">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={roleColors[user.role]}>{user.role}</Badge>
              <span className="text-sm text-muted-foreground">
                Active: {format(new Date(user.lastActive), 'HH:mm')}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}