import { useState } from "react";
import Project from "../../components/Project";
import { useGetProjectsQuery } from "../../services/projectApi";
import CreateProject from "../../components/CreateProject";

interface ProjectProps {
  _id: string;
  title: string;
  description: string;
  owner: string;
  status: string;
  tasks: any[];
  deadline: string;
  teamMembers: string[];
  createdAt: string;
}

const OwnerProjects = () => {

  const { data, isLoading, isError, error, refetch } = useGetProjectsQuery([]);

  const [isCreating, setIsCreating] = useState(false); // State to manage visibility of CreateProject form


  if (isLoading) return <p>Loading projects...</p>;
  if (isError) {
    const errorMessage = 'data' in error && typeof error.data === 'object' && error.data !== null && 'message' in error.data ? (error.data as { message: string }).message : 'An error occurred';
    return <p>Error fetching projects: {errorMessage}</p>;
  }

  const projects = data?.projects || [];


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="space-y-4">

        {projects.length === 0 && (
          <p className="text-center text-gray-500">No projects available. Please create a new project.</p>
        )}
        {projects.map((project:ProjectProps) => (
          <Project 
          key={project._id} 
          _id={project._id} 
          title={project.title} 
          description={project.description} 
          owner={project.owner} 
          status={project.status} 
          tasks={project.tasks}
          deadline={project.deadline}
          teamMembers={project.teamMembers}
          createdAt={project.createdAt} 
          />
        ))}
      <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? 'Cancel' : 'Create New Project'}
        </button>

        {/* Conditional rendering of CreateProject form */}
        {isCreating && <CreateProject refetch={refetch} />}
      </div>
    </div>
  )
}

export default OwnerProjects