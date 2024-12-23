import React, { useState, useEffect } from "react";
import { useDeleteprofileMutation, useGetprofileQuery } from "../services/profileApi";

const ProfileCard: React.FC = () => {
  const { data:profile, error, isLoading: isProfileLoading } = useGetprofileQuery([]);
  const [deleteUserProfile, { isLoading: isDeleting, isError, isSuccess }] = useDeleteprofileMutation();
  const [bgColor, setBgColor] = useState<string>("");

  // Generate a consistent background color based on user ID
  useEffect(() => {
    if (profile && profile._id) { // Ensure profile and _id are defined

    const generateColorFromId = (id: string) => {
      const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const colorIndex = hash % colors.length; // Ensure the index is within bounds
      setBgColor(colors[colorIndex]);
    };
    generateColorFromId(profile._id);

    }
  }, [profile]);

  // handle errors graciously
  if (error) {
    console.error('Failed to fetch user profile: ', error);
    if ('status' in error) {
      return <div>Error: {error.status}</div>;
    } else {
      return <div>Error: {error.message}</div>;
    }
  }

  // show a loading indicator while fetching data
  if (isProfileLoading) {
    return <div className="text-center">Loading...</div>;
  }

  // Define a color palette
  const colors = ["#007BFF", "#6F42C1", "#6C757D", "#FF8C00"]; // Blue, Purple, Gray, Dark Orange
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete) {
      try {
        await deleteUserProfile({}).unwrap(); // Pass an empty object if no parameters are needed
        alert('User profile deleted successfully');
      } catch (error) {
        console.error('Failed to delete the profile: ', error);
      }
    }
  }

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md mx-auto flex">
        {/* Avatar */}
        <div
          className="flex items-center justify-center w-32 h-32 rounded-full text-6xl font-bold text-white mb-4 transition-transform duration-300 cursor-pointer"
          style={{ backgroundColor: bgColor }}
        >
          {getInitial(profile.name)}
        </div>
        {/* User Info */}
      <div className="p-4 rounded-lg shadow-sm px-20">
        <h1 className="text-2xl font-semibold">{profile.name}</h1>
        <p> <strong>Username:</strong> {profile.username} </p>
        <p> <strong>Email:</strong> {profile.email} </p>
        <p> <strong>Role:</strong> {profile.role} </p>
        <p> <strong>Joined:</strong>{" "}
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
      {/* delete account */}
      <div>
        {/* User profile details here */}
        <button onClick={handleDeleteProfile} disabled={isDeleting} className="bg-red-500 text-white px-4 py-2 rounded">
          {isDeleting ? 'Deleting...' : 'Delete Profile'}
        </button>
        {isError && <p>Error deleting profile</p>}
        {isSuccess && <p>Profile deleted successfully</p>}
      </div>
    </div>
  );
};

export default ProfileCard;