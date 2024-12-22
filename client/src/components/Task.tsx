
// import React, { useState } from "react";
// import { useGetTaskQuery, useAssignUsersToTaskMutation, useMarkTaskAsDoneMutation } from "../services/taskApi"; 

// interface TaskProps {
//   taskId: string; 
// }

// const Task: React.FC<TaskProps> = ({ taskId }) => {
//   const { data: task, isLoading, isError, error } = useGetTaskQuery(taskId); // Fetch task details
//   const [markTaskAsDone] = useMarkTaskAsDoneMutation();                      // Mutation for marking task as done
//   const [assignUsers] = useAssignUsersToTaskMutation();                      // Mutation for assigning users
//   const [usersToAssign, setUsersToAssign] = useState<string[]>([]);          // State for user IDs to assign

//   const handleMarkAsDone = async () => {
//     try {
//       await markTaskAsDone(taskId).unwrap(); // Call the mark as done mutation
//       alert("Task marked as done successfully!");
//     } catch (error) {
//       console.error("Failed to mark task as done:", error);
//     }
//   };

//   const handleAssignUsers = async () => {
//     try {
//       await assignUsers({ taskId, users: usersToAssign }).unwrap(); // Call the assign users mutation
//       alert("Users assigned successfully!");
//     } catch (error) {
//       console.error("Failed to assign users:", error);
//     }
//   };

//   if (isLoading) return <p>Loading task details...</p>;
//   if (isError) return <p>Error fetching task details: {error.data.message}</p>;

//   // Check if task is defined and has the expected properties
//   if (!task) return <p>Task not found.</p>;

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//       <h2 className="text-xl font-semibold">{task.title}</h2>
//       <p className="text-gray-600">{task.description}</p>
//       <p><strong>Project ID:</strong> {task.project}</p>
//       <p><strong>Assigned To:</strong> {task.assignedTo.join(", ") || "Unassigned"}</p>
//       <p><strong>Status:</strong> {task.status}</p>
//       <p><strong>Priority:</strong> {task.priority}</p>
//       <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</p>
//       <p><strong>Progress:</strong> {task.progress}%</p>
//       <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      
//       {/* Mark as Done Button */}
//       <button 
//         className="mt-2 bg-green-500 text-white px-4 py-2 rounded" 
//         onClick={handleMarkAsDone}
//       >
//         Mark as Done
//       </button>

//       {/* Assign User Button */}
//       <button 
//         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" 
//         onClick={handleAssignUsers}
//       >
//         Assign User
//       </button>

//       {/* Input for assigning users */}
//       <input 
//         type="text" 
//         placeholder="Enter usernames to assign (comma-separated)" 
//         value={usersToAssign.join(", ")}
//         onChange={(e) => setUsersToAssign(e.target.value.split(",").map(id => id.trim()))}
//         className="mt-2 border border-gray-300 rounded p-2 w-full"
//       />
//     </div>
//   );
// };

// export default Task;
import React, { useState } from "react";
import { useGetTaskQuery, useMarkTaskAsDoneMutation, useAssignUsersToTaskMutation } from "../services/taskApi"; // Import the query and mutation hooks

interface TaskProps {
  taskId: string; // Accept task ID as a prop
}

const Task: React.FC<TaskProps> = ({ taskId }) => {
  const { data: task, isLoading, isError, error, refetch } = useGetTaskQuery(taskId); // Fetch task details
  const [markTaskAsDone] = useMarkTaskAsDoneMutation(); // Mutation for marking task as done
  const [assignUsers] = useAssignUsersToTaskMutation(); // Mutation for assigning users
  const [usersToAssign, setUsersToAssign] = useState<string[]>([]); // State for user IDs to assign
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

  const handleAssignUsers = async () => {
    try {
      await assignUsers({ taskId, users: usersToAssign }).unwrap(); // Call the assign users mutation
      alert("Users assigned successfully!");
      refetch(); // Refetch task data to update UI
    } catch (error) {
      console.error("Failed to assign users:", error);
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
        className={`mt-2 ${isDone ? 'bg-gray-400' : 'bg-green-500'} text-white px-4 py-2 rounded`} 
        onClick={handleMarkAsDone}
        disabled={isDone} // Disable button if the task is marked as done
      >
        {isDone ? 'Task Completed' : 'Mark as Done'}
      </button>

      {/* Assign User Button */}
      <button 
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={handleAssignUsers}
      >
        Assign User
      </button>

      {/* Input for assigning users */}
      <input 
        type="text" 
        placeholder="Enter usernames to assign (comma-separated)" 
        value={usersToAssign.join(", ")}
        onChange={(e) => setUsersToAssign(e.target.value.split(",").map(id => id.trim()))}
        className="mt-2 border border-gray-300 rounded p-2 w-full"
      />
    </div>
  );
};

export default Task;