import { useState } from 'react';
import { Project } from '@/types/project';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EquipmentList } from './EquipmentList';
import { UserList } from './UserList';
import { ProjectHeader } from './ProjectHeader';
import { ScriptList } from '../scripts/ScriptList';
import { ScheduledTasksList } from '../tasks/ScheduledTasksList';
import { CompletedTasksList } from '../tasks/CompletedTasksList';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState('all');
  const [equipmentStatusFilter, setEquipmentStatusFilter] = useState('all');

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />

      <Tabs defaultValue="scripts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="scripts">Scripts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="mt-4">
          <EquipmentList
            equipment={project.equipment}
            searchQuery={searchQuery}
            typeFilter={equipmentTypeFilter}
            statusFilter={equipmentStatusFilter}
            onSearchChange={setSearchQuery}
            onTypeFilterChange={setEquipmentTypeFilter}
            onStatusFilterChange={setEquipmentStatusFilter}
          />
        </TabsContent>

        <TabsContent value="scripts" className="mt-4">
          <ScriptList project={project} />
        </TabsContent>

        <TabsContent value="scheduled" className="mt-4">
          <ScheduledTasksList tasks={project.scheduledTasks} />
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <CompletedTasksList tasks={project.completedTasks} />
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <UserList users={project.users} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
