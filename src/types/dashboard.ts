export interface DashboardStats {
  totalProjects: number;
  activeConnections: number;
  totalDevices: number;
  activityData: Array<{
    time: string;
    connections: number;
  }>;
}

export interface FilterState {
  searchQuery: string;
  statusFilter: string;
  sortBy: string;
}