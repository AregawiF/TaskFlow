import React from "react";
import { Link } from "react-router-dom";


interface task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    deadline: string;
    progress: number;
    toDoList: string[];
    issues: string[];
    createdAt: string;
}


interface ProjectProps {
    _id: string;
    title: string;
    description: string;
    owner: string;
    status: string;
    tasks: task[];
    deadline: string;
    teamMembers: string[];
    createdAt: string;
}

const Project: React.FC<ProjectProps> = ({_id, title, description, owner, status, tasks, deadline, teamMembers, createdAt} ) => {
  return (
    <Link to={`/project/${_id}`} className="bg-white shadow-md rounded-lg p-4 mb-4 block hover:shadow-lg transition-shadow duration-300">

      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-500">
        <strong>Status:</strong> {status}
      </p>
        
        {/*  progress bar to show the progress calculated by dividing the tasks that have status completed    */}
        <p className="text-gray-500">
            <strong>Progress:</strong> {tasks.length > 0 ? (tasks.filter(task => task.status === "completed").length / tasks.length * 100) : 0}%
        </p>
      <p className="text-gray-500">
        <strong>Deadline:</strong>{" "}
        {new Date(deadline).toLocaleDateString()}
      </p>
    </Link>
  );
};

export default Project;