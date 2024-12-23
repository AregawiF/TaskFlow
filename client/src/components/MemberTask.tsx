
import React, { useState } from "react";
import { useGetTaskQuery, useMarkTaskAsDoneMutation } from "../services/taskApi"; // Import the query and mutation hooks
import { FaCheckCircle, FaClock, FaStar } from "react-icons/fa";

interface TaskProps {
  taskId: string; // Accept task ID as a prop
}

const MemberTask: React.FC<TaskProps> = ({ taskId }) => {
  const { data: task, isLoading, isError, error, refetch } = useGetTaskQuery(taskId); // Fetch task details
  const [markTaskAsDone] = useMarkTaskAsDoneMutation(); // Mutation for marking task as done
  const [isDone, setIsDone] = useState(false); // State to track if the task is marked as done
  

  const handleMarkAsDone = async () => {
    try {
      await markTaskAsDone(taskId).unwrap(); // Call the mark as done mutation
      setIsDone(true); // Update local state to reflect the task is done
      alert("Task marked as done successfully!");
      refetch(); // Refetch task data to update UI
    } catch (error) {
      console.error("Failed to mark task as done:", error);
    }
  };

  if (isLoading) return <p>Loading task details...</p>;
  if (isError) return <p>Error fetching task details: {error.data.message}</p>;

  // Check if task is defined and has the expected properties
  if (!task) return <p>Task not found.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>
      <p><strong>Assigned To:</strong> {Array.isArray(task.assignedTo) && task.assignedTo.length > 0 ? task.assignedTo.map(user => user.username).join(", ") : "Unassigned"}</p>
      <div className="flex items-center mb-2">
        <FaCheckCircle className="text-green-500 mr-1" />
        <p className="text-gray-700"><strong>Status:</strong> {task.status}</p>
        </div>
        <div className="flex items-center mb-2">
            <FaStar className="text-yellow-500 " />
            <p className="text-lg text-gray-700  rounded">
                <strong>Priority:</strong> {task.priority}
            </p>
        </div>
      <div className="flex items-center mb-2">
        <FaClock className="text-orange-500 mr-1" />
        <p className="text-gray-700"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
    </div>
      <p><strong>Progress:</strong> {task.progress}%</p>
      
      {/* Mark as Done Button */}
      <button 
        className={`mt-2 ${task.status === 'completed' ? 'bg-gray-400' : 'bg-green-500'} text-white px-4 py-2 rounded`} 
        onClick={handleMarkAsDone}
        disabled={task.status === 'completed'} // Disable button if the task is marked as done
      >
        {task.status === 'completed' ? 'Task Completed' : 'Mark as Done'}
      </button>
    </div>
  );
};

export default MemberTask;