import { useState } from 'react';
import { mockProjects } from '@/data/mockData';
import { Header } from '@/components/dashboard/Header';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { ProjectDetails } from '@/components/project/ProjectDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = mockProjects
    .filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
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

  const currentProject = selectedProject 
    ? mockProjects.find(p => p.id === selectedProject)
    : null;

  const handleBackToDashboard = () => {
    setSelectedProject(null);
  };

  if (selectedProject && currentProject) {
    return (
      <div className="min-h-screen bg-background hexagon-bg">
        <div className="mx-auto max-w-7xl p-8">
          <button
            onClick={handleBackToDashboard}
            className="mb-6 text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <ProjectDetails project={currentProject} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background hexagon-bg">
      <div className="mx-auto max-w-7xl p-8 space-y-8">
        <Header />
        <ActionPanel
          onSearch={setSearchQuery}
          onStatusFilter={setStatusFilter}
          onSort={setSortBy}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onDoubleClick={() => setSelectedProject(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;