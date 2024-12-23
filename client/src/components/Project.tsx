// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa'; // Import icons for better visuals

interface Task {
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
    tasks: Task[];
    deadline: string;
    teamMembers: string[];
    createdAt: string;
}

const Project: React.FC<ProjectProps> = ({ _id, title, description, owner, status, tasks, deadline, teamMembers, createdAt }) => {
    const completedTasks = tasks.filter(task => task.status === "completed").length;
    const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

    return (
        <Link to={`/project/${_id}`} className="bg-white shadow-lg rounded-lg p-6 mb-6 block hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex items-center mb-2">
                <FaCheckCircle className="text-green-500 mr-1" />
                <p className="text-gray-600"><strong>Status:</strong> {status}</p>
            </div>
            <div className="flex items-center mb-2">
                <FaClock className="text-orange-500 mr-1" />
                <p className="text-gray-600"><strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center mb-4">
                <FaUsers className="text-blue-500 mr-1" />
                <p className="text-gray-600"><strong>Team Members:</strong> {teamMembers.join(', ')}</p>
            </div>
            <div className="mb-4">
                <strong>Progress:</strong>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                {progressPercentage.toFixed(0)}%
                            </span>
                        </div>
                    </div>
                    <div className="flex h-2 mb-2 bg-gray-200 rounded">
                        <div className="bg-teal-600 h-full" style={{ width: `${progressPercentage}%` }} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Project;