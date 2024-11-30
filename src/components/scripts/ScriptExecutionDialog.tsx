import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Script, ScriptExecutionFormData } from '@/types/script';
import { Equipment } from '@/types/project';

interface ScriptExecutionDialogProps {
  script: Script;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment?: Equipment[];
}

export function ScriptExecutionDialog({
  script,
  open,
  onOpenChange,
  equipment = [],
}: ScriptExecutionDialogProps) {
  const [formData, setFormData] = useState<ScriptExecutionFormData>({
    equipmentIds: [],
    parameters: {},
  });
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleType, setScheduleType] = useState<'once' | 'recurring'>('once');

  const handleExecute = () => {
    // TODO: Implement script execution
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Execute Script: {script.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Target Equipment</Label>
            <Select
              value={formData.equipmentIds[0]}
              onValueChange={(value) =>
                setFormData({ ...formData, equipmentIds: [value] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipment.map((eq) => (
                  <SelectItem key={eq.id} value={eq.id}>
                    {eq.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Parameters</Label>
            {script.parameters.map((param) => (
              <div key={param.id} className="space-y-2">
                <Label>{param.name}</Label>
                {param.type === 'boolean' ? (
                  <Switch
                    checked={!!formData.parameters[param.id]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        parameters: {
                          ...formData.parameters,
                          [param.id]: checked,
                        },
                      })
                    }
                  />
                ) : (
                  <Input
                    type={param.type === 'number' ? 'number' : 'text'}
                    value={formData.parameters[param.id] ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parameters: {
                          ...formData.parameters,
                          [param.id]: e.target.value,
                        },
                      })
                    }
                    required={param.required}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={isScheduled}
                onCheckedChange={setIsScheduled}
              />
              <Label>Schedule Execution</Label>
            </div>

            {isScheduled && (
              <div className="space-y-4 pl-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant={scheduleType === 'once' ? 'default' : 'outline'}
                    onClick={() => setScheduleType('once')}
                    size="sm"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Once
                  </Button>
                  <Button
                    variant={scheduleType === 'recurring' ? 'default' : 'outline'}
                    onClick={() => setScheduleType('recurring')}
                    size="sm"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Recurring
                  </Button>
                </div>

                {scheduleType === 'once' ? (
                  <Input
                    type="datetime-local"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        schedule: {
                          type: 'once',
                          executeAt: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  <Input
                    placeholder="Cron expression (e.g., 0 0 * * *)"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        schedule: {
                          type: 'recurring',
                          cron: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleExecute}>
              {isScheduled ? 'Schedule' : 'Execute'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}