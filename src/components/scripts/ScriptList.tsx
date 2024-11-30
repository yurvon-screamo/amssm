import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from '@/types/project';
import { ScriptCard } from './ScriptCard';
import { ScriptDialog } from './ScriptDialog';

interface ScriptListProps {
  project: Project;
}

export function ScriptList({ project }: ScriptListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredScripts = project.scripts.filter((script) => {
    const matchesSearch = script.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || script.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-muted/30 p-4 rounded-xl">
        <Button
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> New Script
        </Button>
        <div className="flex gap-2">
          <Input
            placeholder="Search scripts..."
            className="w-[200px] bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] bg-background/50">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="bash">Bash</SelectItem>
              <SelectItem value="ps1">PowerShell</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredScripts.map((script) => (
          <ScriptCard key={script.id} script={script} />
        ))}
      </div>

      <ScriptDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}