export type ScriptType = 'bash' | 'ps1' | 'python';

export interface ScriptParameter {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
  default?: string | number | boolean;
  description?: string;
}

export interface Script {
  id: string;
  name: string;
  type: ScriptType;
  content: string;
  parameters: ScriptParameter[];
  createdAt: string;
  updatedAt: string;
}

export interface ScriptExecution {
  id: string;
  scriptId: string;
  equipmentIds: string[];
  parameters: Record<string, string | number | boolean>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  schedule?: {
    type: 'once' | 'recurring';
    cron?: string;
    executeAt?: string;
  };
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface ScriptExecutionFormData {
  equipmentIds: string[];
  parameters: Record<string, string | number | boolean>;
  schedule?: {
    type: 'once' | 'recurring';
    cron?: string;
    executeAt?: string;
  };
}