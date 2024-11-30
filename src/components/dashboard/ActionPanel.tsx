import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ActionPanelProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: string) => void;
  onSort: (sort: string) => void;
}

export function ActionPanel({
  onSearch,
  onStatusFilter,
  onSort,
}: ActionPanelProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-muted/30 p-4 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8 w-[200px] bg-background/50 border-muted"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Select onValueChange={onStatusFilter}>
          <SelectTrigger className="w-[140px] bg-background/50 border-muted">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onSort}>
          <SelectTrigger className="w-[140px] bg-background/50 border-muted">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="devices">Devices</SelectItem>
            <SelectItem value="lastConnection">Last Connection</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}