import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectsQuery, useAdjustProjectDeadlineMutation } from "../../services/projectApi"; // Import the new mutation

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isError, error } = useGetProjectsQuery([]);
  const [adjustProjectDeadline] = useAdjustProjectDeadlineMutation(); // Mutation for adjusting project deadline
  const [newDeadline, setNewDeadline] = useState<string>(""); // State for new deadline

  if (isLoading) return <p>Loading project details...</p>;
  if (isError) return <p>Error fetching project details: {error.data.message}</p>;

  const project = data?.projects.find((proj) => proj._id === projectId);
  if (!project) return <p>Project not found.</p>;

  const handleAdjustDeadline = async () => {
    try {
      await adjustProjectDeadline({ projectId, deadline: newDeadline }).unwrap(); // Call the adjust deadline mutation
      alert("Project deadline updated successfully!");
    } catch (error) {
      console.error("Failed to update project deadline:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-2"><strong>Description:</strong> {project.description}</p>
      <p className="mb-2"><strong>Status:</strong> {project.status}</p>
      <p className="mb-2"><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Deadline:</strong> {new Date(project.deadline).toLocaleString()}</p>

      {/* Input for adjusting deadline */}
      <div className="mt-4">
        <input 
          type="datetime-local" 
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button 
          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded" 
          onClick={handleAdjustDeadline}
        >
          Adjust Deadline
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;