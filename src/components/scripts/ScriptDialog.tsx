import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Script, ScriptType, ScriptParameter } from "@/types/script";
import { ScriptParameterEditor } from "./ScriptParameterEditor";

interface ScriptDialogProps {
  script?: Script;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScriptDialog({
  script,
  open,
  onOpenChange,
}: ScriptDialogProps) {
  const [name, setName] = useState(script?.name ?? "");
  const [type, setType] = useState<ScriptType>(script?.type ?? "bash");
  const [content, setContent] = useState(script?.content ?? "");
  const [parameters, setParameters] = useState<ScriptParameter[]>(
    script?.parameters ?? []
  );

  const handleSave = () => {
    // TODO: Implement save functionality
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {script ? "Edit Script" : "Create New Script"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as ScriptType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bash">Bash</SelectItem>
                  <SelectItem value="ps1">PowerShell</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Script Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-mono h-48"
            />
          </div>

          <ScriptParameterEditor
            parameters={parameters}
            onChange={setParameters}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
