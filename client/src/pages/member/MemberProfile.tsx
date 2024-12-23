// Import necessary libraries
import React, { useState, useEffect } from "react";

// Mock user data
const mockUser = {
  _id: "6766d7e94ff15d5616fab2d8",
  name: "Aregawi Fikre",
  username: "aregf",
  email: "areg@example.com",
  role: "owner",
  createdAt: "2024-12-21T14:59:53.246Z",
};

const MemberProfile: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>("");

  // Define a color palette
  const colors = ["#007BFF", "#6F42C1", "#6C757D", "#FF8C00"]; // Blue, Purple, Gray, Dark Orange

  // Generate a consistent background color based on user ID
  useEffect(() => {
    const generateColorFromId = (id: string) => {
      const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const colorIndex = hash % colors.length; // Ensure the index is within bounds
      setBgColor(colors[colorIndex]);
    };
    generateColorFromId(mockUser._id);
  }, []);

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md mx-auto flex">
        {/* Avatar */}
        <div
          className="flex items-center justify-center w-32 h-32 rounded-full text-6xl font-bold text-white mb-4 transition-transform duration-300 cursor-pointer"
          style={{ backgroundColor: bgColor }}
        >
          {getInitial(mockUser.name)}
        </div>
        {/* User Info */}
      <div className="p-4 rounded-lg shadow-sm px-20">
        <h1 className="text-2xl font-semibold">{mockUser.name}</h1>
        <p>
          <strong>Username:</strong> {mockUser.username}
        </p>
        <p>
          <strong>Email:</strong> {mockUser.email}
        </p>
        <p>
          <strong>Role:</strong> {mockUser.role}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(mockUser.createdAt).toLocaleDateString()}
        </p>
      </div>
      {/* delete account */}
      <div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-64">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default MemberProfile;