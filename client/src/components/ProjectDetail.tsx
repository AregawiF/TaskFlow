import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../services/projectApi";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { TaskType } from "../types/task";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isError, error, refetch } = useGetProjectsQuery([]);
    const [isCreatingTask, setIsCreatingTask] = useState(false);


  if (isLoading) return <p>Loading project details...</p>;
  if (isError) return <p>Error fetching project details: {error.data.message}</p>;

  const project = data?.projects.find((proj) => proj._id === projectId);

  if (!project) return <p>Project not found.</p>;
  console.log(project.tasks);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-2"><strong>Description:</strong> {project.description}</p>
      <p className="mb-2"><strong>Status:</strong> {project.status}</p>
      <p className="mb-2"><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>


      {/* Create Task Button */}
      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={() => setIsCreatingTask(!isCreatingTask)}
      >
        {isCreatingTask ? 'Cancel' : 'Create Task'}
      </button>

      {/* Conditional rendering of CreateTask form */}
      {isCreatingTask && <CreateTask projectId={projectId} refetch={refetch} />}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Tasks</h2>
      {project.tasks.length === 0 ? (
        <p>No tasks available for this project.</p>
      ) : (
        <ul className="list-disc pl-5">
          {project.tasks.map((taskID:string) => (
            <Task key={taskID} taskId={taskID} /> 
          ))}
        </ul>
      )}

      
    </div>
  );
};

export default ProjectDetail;