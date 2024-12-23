
import React, { useState } from "react";
import { useGetTaskQuery, useMarkTaskAsDoneMutation, useAssignUsersToTaskMutation, useAdjustWorkScheduleMutation } from "../services/taskApi"; // Import the query and mutation hooks
import Issues from "./Issue";

interface TaskProps {
  taskId: string; // Accept task ID as a prop
}

const Task: React.FC<TaskProps> = ({ taskId }) => {
  const { data: task, isLoading, isError, error, refetch } = useGetTaskQuery(taskId); // Fetch task details
  const [markTaskAsDone] = useMarkTaskAsDoneMutation(); // Mutation for marking task as done
  const [assignUsers] = useAssignUsersToTaskMutation(); // Mutation for assigning users
  const [adjustWorkSchedule] = useAdjustWorkScheduleMutation(); // Mutation for adjusting work schedule
  const [usersToAssign, setUsersToAssign] = useState<string[]>([]); // State for user IDs to assign
  const [isDone, setIsDone] = useState(false); // State to track if the task is marked as done
  const [newDeadline, setNewDeadline] = useState<string>(""); // State for new deadline
  

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

  const handleAssignUsers = async () => {
    try {
      await assignUsers({ taskId, users: usersToAssign }).unwrap(); // Call the assign users mutation
      alert("Users assigned successfully!");
      refetch(); // Refetch task data to update UI
    } catch (error) {
      console.error("Failed to assign users:", error);
    }
  };

  const handleExtendDeadline = async () => {
    try {
      await adjustWorkSchedule({ taskId, deadline: newDeadline }).unwrap(); // Call the adjust work schedule mutation
      alert("Deadline extended successfully!");
      refetch(); // Refetch task data to update UI
    } catch (error) {
      console.error("Failed to extend deadline:", error);
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
      <p><strong>Project ID:</strong> {task.project}</p>
      <p><strong>Assigned To:</strong> {Array.isArray(task.assignedTo) && task.assignedTo.length > 0 ? task.assignedTo.map(user => user.username).join(", ") : "Unassigned"}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</p>
      <p><strong>Progress:</strong> {task.progress}%</p>
      <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      
      {/* Mark as Done Button */}
      <button 
        className={`mt-2 ${task.status === 'completed' ? 'bg-gray-400' : 'bg-green-500'} text-white px-4 py-2 rounded`} 
        onClick={handleMarkAsDone}
        disabled={task.status === 'completed'} // Disable button if the task is marked as done
      >
        {task.status === 'completed' ? 'Task Completed' : 'Mark as Done'}
      </button>
        <br />
      {/* Input for assigning users */}
      <input 
        type="text" 
        placeholder="Enter usernames to assign (comma-separated)" 
        value={usersToAssign.join(", ")}
        onChange={(e) => setUsersToAssign(e.target.value.split(",").map(id => id.trim()))}
        className="mt-2 border border-gray-300 rounded p-2 w-full"
      />
      {/* Assign User Button */}
      <button 
        className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-300" 
        onClick={handleAssignUsers}
      >
        Assign User
      </button>


      <Issues taskId={taskId} />

      {/* Input for extending deadline */}
      <div className="mt-4">
        <input 
          type="datetime-local" 
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button 
          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded" 
          onClick={handleExtendDeadline}
        >
          Extend Task Deadline
        </button>
      </div>
    </div>
  );
};

export default Task;