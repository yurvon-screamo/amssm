import { useState } from "react";
import { Code2, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Script } from "@/types/script";
import { ScriptDialog } from "./ScriptDialog";
import { ScriptExecutionDialog } from "./ScriptExecutionDialog";

interface ScriptCardProps {
  script: Script;
}

export function ScriptCard({ script }: ScriptCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showExecuteDialog, setShowExecuteDialog] = useState(false);

  return (
    <>
      <Card className="group relative overflow-hidden border-muted hover:border-primary/50 transition-all duration-300">
        <div className="inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Code2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-medium">
                {script.name}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {script.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              {script.parameters.length} parameters
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  console.error("ss");
                  setShowEditDialog(true);
                }}
              >
                <Code2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={() => setShowExecuteDialog(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Run
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScriptDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        script={script}
      />

      <ScriptExecutionDialog
        open={showExecuteDialog}
        onOpenChange={setShowExecuteDialog}
        script={script}
      />
    </>
  );
}
