const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    const project = new Project({
      title,
      description,
      owner: req.user.id, // `req.user` is added by `authMiddleware`
    });

    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects belonging to the authenticated user
    const projects = await Project.find({ owner: req.user.id });

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const adjustProjectDeadline = asyncHandler(async (req, res) => {
  const { projectId } = req.params; // Get the project ID from the request parameters
  const { deadline } = req.body; // Get the new deadline from the request body

  // Validate input
  if (!projectId || !deadline) {
    res.status(400);
    throw new Error("Please provide a valid project ID and a new deadline");
  }

  // Check if the project exists
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Update the project deadline
  project.deadline = new Date(deadline); // Update the deadline
  await project.save();

  res.status(200).json({
    message: "Project deadline updated successfully",
    project,
  });
});

module.exports = { createProject, getAllProjects, adjustProjectDeadline };
