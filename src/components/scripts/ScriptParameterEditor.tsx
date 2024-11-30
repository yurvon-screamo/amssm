import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScriptParameter } from '@/types/script';

interface ScriptParameterEditorProps {
  parameters: ScriptParameter[];
  onChange: (parameters: ScriptParameter[]) => void;
}

export function ScriptParameterEditor({
  parameters,
  onChange,
}: ScriptParameterEditorProps) {
  const addParameter = () => {
    onChange([
      ...parameters,
      {
        id: crypto.randomUUID(),
        name: '',
        type: 'string',
        required: true,
      },
    ]);
  };

  const updateParameter = (index: number, updates: Partial<ScriptParameter>) => {
    const newParameters = [...parameters];
    newParameters[index] = { ...newParameters[index], ...updates };
    onChange(newParameters);
  };

  const removeParameter = (index: number) => {
    onChange(parameters.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Parameters</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={addParameter}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Parameter
        </Button>
      </div>

      <div className="space-y-4">
        {parameters.map((param, index) => (
          <div
            key={param.id}
            className="grid grid-cols-[1fr,120px,100px,80px] gap-4 items-center"
          >
            <Input
              value={param.name}
              onChange={(e) =>
                updateParameter(index, { name: e.target.value })
              }
              placeholder="Parameter name"
            />
            <Select
              value={param.type}
              onValueChange={(value) =>
                updateParameter(index, {
                  type: value as ScriptParameter['type'],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Switch
                checked={param.required}
                onCheckedChange={(checked) =>
                  updateParameter(index, { required: checked })
                }
              />
              <Label>Required</Label>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeParameter(index)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}