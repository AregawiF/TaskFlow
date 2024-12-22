import Project from "../../components/Project";
import { useGetProjectsQuery } from "../../services/projectApi";

interface ProjectProps {
  _id: string;
  title: string;
  description: string;
  owner: string;
  status: string;
  tasks: string[];
  teamMembers: string[];
  createdAt: string;
}

const Projects = () => {

  const { data, isLoading, isError, error } = useGetProjectsQuery([]);

  if (isLoading) return <p>Loading projects...</p>;
  if (error){
    return <p>Error fetching projects: {error.data.message}</p>;
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
          teamMembers={project.teamMembers}
          createdAt={project.createdAt} 
          />
        ))}
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Create New Project</button>
      </div>
    </div>
  )
}

export default Projects