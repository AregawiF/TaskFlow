const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const createTask = asyncHandler(async (req, res) => {
  const { title, description, projectId, assignedTo, deadline, priority } = req.body;

  // Validate input
  if (!title || !projectId) {
    res.status(400);
    throw new Error("Please provide a title and project ID");
  }

  // Check if the project exists
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Check if the user exists (for assignment)
  if (assignedTo) {
    const user = await User.findById(assignedTo);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  }

  // Create a new task
  const task = new Task({
    title,
    description,
    project: projectId,
    assignedTo,
    deadline,
    priority,
  });

  await task.save();
  
  res.status(201).json({
    message: "Task created successfully",
    task,
  });
});

module.exports = { createTask };
