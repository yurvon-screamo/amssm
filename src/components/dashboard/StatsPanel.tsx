import { BarChart, Users, Server, FolderGit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types/project';
import { ActivityChart } from './ActivityChart';

interface StatsPanelProps {
  stats: DashboardStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-muted bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <FolderGit2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
        </CardContent>
      </Card>
      <Card className="border-muted bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
          <Users className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{stats.activeConnections}</div>
        </CardContent>
      </Card>
      <Card className="border-muted bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          <Server className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{stats.totalDevices}</div>
        </CardContent>
      </Card>
      <Card className="border-muted bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activity</CardTitle>
          <BarChart className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="h-[80px]">
            <ActivityChart data={stats.activityData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}