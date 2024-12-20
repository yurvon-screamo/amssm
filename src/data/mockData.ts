import { Equipment, Project, User, Script, TaskExecution } from "@/types/project";

const mockScripts = [
  {
    id: "script1",
    name: "System Health Check",
    type: "bash",
    content:
      '#!/bin/bash\necho "Checking system health..."\ndf -h\nfree -m\ntop -n 1',
    parameters: [],
    createdAt: "2024-03-27T12:00:00Z",
    updatedAt: "2024-03-27T12:00:00Z",
  },
  {
    id: "script2",
    name: "Network Diagnostics",
    type: "python",
    content: 'import socket\nprint("Running network diagnostics...")',
    parameters: [
      {
        id: "param1",
        name: "host",
        type: "string",
        required: true,
        default: "localhost",
      },
    ],
    createdAt: "2024-03-27T13:00:00Z",
    updatedAt: "2024-03-27T13:00:00Z",
  },
] as Script[];

const mockEquipment = [
  {
    id: "eq1",
    name: "Main Server",
    type: "server",
    status: "online",
    ipAddress: "192.168.1.100",
    location: "Server Room A",
    lastPing: "2024-03-27T16:45:00Z",
  },
  {
    id: "eq2",
    name: "Network Switch",
    type: "network",
    status: "online",
    ipAddress: "192.168.1.101",
    location: "Server Room B",
    lastPing: "2024-03-27T16:44:00Z",
  },
  {
    id: "eq3",
    name: "Storage Array",
    type: "storage",
    status: "maintenance",
    ipAddress: "192.168.1.102",
    location: "Server Room A",
    lastPing: "2024-03-27T16:43:00Z",
  },
] as Equipment[];

const mockUsers = [
  {
    id: "usr1",
    name: "John Smith",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    lastActive: "2024-03-27T16:45:00Z",
    email: "john.smith@example.com",
  },
  {
    id: "usr2",
    name: "Alice Johnson",
    role: "operator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    lastActive: "2024-03-27T16:30:00Z",
    email: "alice.j@example.com",
  },
  {
    id: "usr3",
    name: "Bob Wilson",
    role: "viewer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    lastActive: "2024-03-27T16:15:00Z",
    email: "bob.w@example.com",
  },
] as User[];

const mockScheduledTasks = [
  {
    id: "task1",
    scriptId: "script1",
    scriptName: "System Health Check",
    equipmentId: "eq1",
    equipmentName: "Main Server",
    parameters: {},
    status: "scheduled",
    scheduledFor: "2024-03-28T10:00:00Z",
  },
  {
    id: "task2",
    scriptId: "script2",
    scriptName: "Network Diagnostics",
    equipmentId: "eq2",
    equipmentName: "Network Switch",
    parameters: {
      host: "localhost",
      port: 80,
    },
    status: "scheduled",
    scheduledFor: "2024-03-28T11:00:00Z",
  },
] as TaskExecution[];

const mockCompletedTasks = [
  {
    id: "task3",
    scriptId: "script1",
    scriptName: "System Health Check",
    equipmentId: "eq1",
    equipmentName: "Main Server",
    parameters: {},
    status: "completed",
    startedAt: "2024-03-27T09:00:00Z",
    completedAt: "2024-03-27T09:01:00Z",
    executedBy: {
      id: "usr1",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    log: "Filesystem      Size  Used Avail Use%\n/dev/sda1       30G   15G   15G  50%\n\nMemory: 16GB Total, 8GB Used\n\nCPU Usage: 25%",
  },
  {
    id: "task4",
    scriptId: "script2",
    scriptName: "Network Diagnostics",
    equipmentId: "eq2",
    equipmentName: "Network Switch",
    parameters: {
      host: "example.com",
      port: 443,
    },
    status: "failed",
    startedAt: "2024-03-27T10:00:00Z",
    completedAt: "2024-03-27T10:00:05Z",
    executedBy: {
      id: "usr2",
      name: "Alice Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    log: "Starting network diagnostics...\nPinging example.com...",
    error: "Connection timeout after 5 seconds",
  },
] as TaskExecution[];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Облачная инфраструктура",
    description: "Мониторинг и управление основной облачной инфраструктурой",
    connectedDevices: 42,
    status: "active",
    lastConnection: "2024-03-27T15:30:00Z",
    icon: "🌥️",
    equipment: mockEquipment,
    users: mockUsers,
    scripts: mockScripts,
    scheduledTasks: mockScheduledTasks,
    completedTasks: mockCompletedTasks,
  },
  {
    id: "2",
    name: "Кластер баз данных",
    description: "Управление производственным кластером баз данных",
    connectedDevices: 12,
    status: "active",
    lastConnection: "2024-03-27T14:45:00Z",
    icon: "🗄️",
    equipment: mockEquipment.slice(0, 2),
    users: mockUsers.slice(0, 2),
    scripts: mockScripts.slice(0, 1),
    scheduledTasks: mockScheduledTasks.slice(0, 1),
    completedTasks: mockCompletedTasks.slice(0, 1),
  },
  {
    id: "3",
    name: "Сетевая безопасность",
    description: "Система мониторинга сетевой безопасности",
    connectedDevices: 28,
    status: "inactive",
    lastConnection: "2024-03-26T18:20:00Z",
    icon: "🔒",
    equipment: mockEquipment.slice(1),
    users: mockUsers.slice(1),
    scripts: mockScripts.slice(1),
    scheduledTasks: [],
    completedTasks: mockCompletedTasks.slice(1),
  },
  {
    id: "4",
    name: "Балансировщик нагрузки",
    description: "Распределение трафика и управление нагрузкой",
    connectedDevices: 8,
    status: "active",
    lastConnection: "2024-03-27T16:15:00Z",
    icon: "⚖️",
    equipment: mockEquipment.slice(0, 1),
    users: mockUsers.slice(0, 2),
    scripts: mockScripts,
    scheduledTasks: mockScheduledTasks,
    completedTasks: [],
  },
  {
    id: "5",
    name: "Система мониторинга",
    description: "Мониторинг состояния и производительности системы",
    connectedDevices: 56,
    status: "active",
    lastConnection: "2024-03-27T16:00:00Z",
    icon: "📊",
    equipment: mockEquipment,
    users: mockUsers,
    scripts: mockScripts,
    scheduledTasks: mockScheduledTasks,
    completedTasks: mockCompletedTasks,
  },
  {
    id: "6",
    name: "Служба резервного копирования",
    description:
      "Автоматизированная система резервного копирования и восстановления",
    connectedDevices: 15,
    status: "inactive",
    lastConnection: "2024-03-26T20:30:00Z",
    icon: "💾",
    equipment: mockEquipment.slice(1),
    users: mockUsers.slice(1),
    scripts: mockScripts.slice(1),
    scheduledTasks: [],
    completedTasks: [],
  },
];
