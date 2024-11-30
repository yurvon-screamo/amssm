import { Project } from '@/types/project';
import { FilterState } from '@/types/dashboard';

export function filterProjects(projects: Project[], filters: FilterState): Project[] {
  return projects
    .filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      const matchesStatus =
        filters.statusFilter === 'all' || project.status === filters.statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'devices':
          return b.connectedDevices - a.connectedDevices;
        case 'lastConnection':
          return (
            new Date(b.lastConnection).getTime() -
            new Date(a.lastConnection).getTime()
          );
        default:
          return a.name.localeCompare(b.name);
      }
    });
}