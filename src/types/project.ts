export interface Project {
  id: string;
  name: string;
  description: string;
  connectedDevices: number;
  status: 'active' | 'inactive';
  lastConnection: string;
  icon: string;
  equipment: Equipment[];
  users: User[];
  scripts: Script[];
  scheduledTasks: TaskExecution[];
  completedTasks: TaskExecution[];
}

export interface Equipment {
  id: string;
  name: string;
  type: 'server' | 'network' | 'storage' | 'security';
  status: 'online' | 'offline' | 'maintenance';
  ipAddress: string;
  location: string;
  lastPing: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'operator' | 'viewer';
  avatar: string;
  lastActive: string;
  email: string;
}

export interface Script {
  id: string;
  name: string;
  type: 'bash' | 'ps1' | 'python';
  content: string;
  parameters: ScriptParameter[];
  createdAt: string;
  updatedAt: string;
}

export interface ScriptParameter {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
  default?: string | number | boolean;
  description?: string;
}

export interface TaskExecution {
  id: string;
  scriptId: string;
  scriptName: string;
  equipmentId: string;
  equipmentName: string;
  parameters: Record<string, any>;
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  scheduledFor?: string;
  startedAt?: string;
  completedAt?: string;
  executedBy?: {
    id: string;
    name: string;
    avatar: string;
  };
  log?: string;
  error?: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeConnections: number;
  totalDevices: number;
  activityData: Array<{
    time: string;
    connections: number;
  }>;
}