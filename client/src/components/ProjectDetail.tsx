// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAdjustProjectDeadlineMutation, useGetProjectsQuery } from "../services/projectApi";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { TaskType } from "../types/task";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isError, error, refetch } = useGetProjectsQuery([]);
  const [adjustProjectDeadline] = useAdjustProjectDeadlineMutation();
  const [newDeadline, setNewDeadline] = useState<string>("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  if (isLoading) return <p className="text-center">Loading project details...</p>;
  if (isError) return <p className="text-red-500 text-center">Error fetching project details: {error.data.message}</p>;

  const project = data?.projects.find((proj) => proj._id === projectId);

  if (!project) return <p className="text-center">Project not found.</p>;

  const handleAdjustDeadline = async () => {
    try {
      await adjustProjectDeadline({ projectId, deadline: newDeadline }).unwrap();
      alert("Project deadline updated successfully!");
    } catch (error) {
      console.error("Failed to update project deadline:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{project.title}</h1>
        <p className="mb-2"><strong>Description:</strong> {project.description}</p>
        <p className="mb-2"><strong>Status:</strong> {project.status}</p>
        <p className="mb-2"><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
        <p className="mb-4"><strong>Deadline:</strong> {new Date(project.deadline).toLocaleString()}</p>

        {/* Input for adjusting deadline */}
        <div className="mt-4">
          <input 
            type="datetime-local" 
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <button 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-300" 
            onClick={handleAdjustDeadline}
          >
            Adjust Project Deadline
          </button>
        </div>

        {/* Create Task Button */}
        <button 
          className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-300" 
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
            {project.tasks.map((taskID: string) => (
              <li key={taskID} className="mb-2">
                <Task taskId={taskID} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;