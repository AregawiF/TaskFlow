import React from "react";
import { useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../services/projectApi";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isError, error } = useGetProjectsQuery([]);

  if (isLoading) return <p>Loading project details...</p>;
  if (isError) return <p>Error fetching project details: {error.data.message}</p>;

  const project = data?.projects.find((proj) => proj._id === projectId);

  if (!project) return <p>Project not found.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-2"><strong>Description:</strong> {project.description}</p>
      <p className="mb-2"><strong>Status:</strong> {project.status}</p>
      <p className="mb-2"><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Tasks</h2>
      {project.tasks.length === 0 ? (
        <p>No tasks available for this project.</p>
      ) : (
        <ul className="list-disc pl-5">
          {project.tasks.map((task, index) => (
            <li key={index}>{task.title}</li> // Assuming each task has a title property
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectDetail;