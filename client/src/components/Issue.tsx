// @ts-nocheck

import { useState } from "react";
import { useGetTaskIssuesQuery, useAddIssueMutation, useUpdateIssueMutation } from "../services/taskApi"; // Import the query and mutation hooks

interface IssuesProps {
  taskId: string; // Accept task ID as a prop
}

const Issues: React.FC<IssuesProps> = ({ taskId }) => {
  const { data: issues, isLoading, isError, error, refetch } = useGetTaskIssuesQuery(taskId); // Fetch issues for the task
  const [addIssue] = useAddIssueMutation(); // Mutation for adding an issue
  const [updateIssue] = useUpdateIssueMutation(); // Mutation for updating issue status

  const [issueDescription, setIssueDescription] = useState(""); // State for new issue description

  const handleAddIssue = async () => {
    try {
      await addIssue({ taskId, description: issueDescription }).unwrap();
      setIssueDescription(""); // Clear the input
      refetch(); // Refetch issues to update the list
      alert("Issue added successfully!");
    } catch (error) {
      console.error("Failed to add issue:", error);
    }
  };

  const handleResolveIssue = async (issueId: string) => {
    try {
      await updateIssue({ taskId, issueId, status: "resolved" }).unwrap();
      alert("Issue resolved successfully!");
      refetch(); // Refetch issues to update the list
    } catch (error) {
      console.error("Failed to resolve issue:", error);
    }
  };

  if (isLoading) return <p>Loading issues...</p>;
  if (isError) return <p>Error fetching issues: {error.data.message}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">Issues</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Describe the issue"
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button 
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={handleAddIssue}
        >
          Add Issue
        </button>
      </div>

      {issues.length === 0 ? (
        <p>No issues reported for this task.</p>
      ) : (
        <ul className="list-disc pl-5">
          {issues.map((issue) => (
            <li key={issue._id}>
              <strong>{issue.description}</strong> - Status: {issue.status}
              {issue.status === "open" && (
                <button 
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleResolveIssue(issue._id)}
                >
                  Resolve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Issues;