import { Equipment } from '@/types/project';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Terminal, Clock, MapPin } from 'lucide-react';

interface EquipmentCardProps {
  equipment: Equipment;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    maintenance: 'bg-yellow-500',
  };

  return (
    <Card className="relative overflow-hidden border-muted hover:border-primary/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{equipment.name}</h3>
            <p className="text-sm text-muted-foreground">{equipment.type}</p>
          </div>
        </div>
        <Badge className={statusColors[equipment.status]}>
          {equipment.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{equipment.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-secondary" />
            <span>Last ping: {format(new Date(equipment.lastPing), 'HH:mm:ss')}</span>
          </div>
        </div>
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}