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

  // Check if the users exist (if assignedTo is provided)
  if (assignedTo && Array.isArray(assignedTo)) {
    const users = await User.find({ '_id': { $in: assignedTo } });
    if (users.length !== assignedTo.length) {
      res.status(404);
      throw new Error("One or more users not found");
    }
  }

  // Create a new task
  const task = new Task({
    title,
    description,
    project: projectId,
    assignedTo: assignedTo || [],  // If no users provided, it will be an empty array
    deadline,
    priority,
  });

  await task.save();
  
  res.status(201).json({
    message: "Task created successfully",
    task,
  });
});


const assignUsersToTask = asyncHandler(async (req, res) => {
  const { taskId, users } = req.body;  // Task ID and array of user IDs

  // Validate input
  if (!taskId || !users || !Array.isArray(users)) {
    res.status(400);
    throw new Error("Please provide a valid task ID and an array of user IDs");
  }

  // Check if the task exists
  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the users exist
  const foundUsers = await User.find({ '_id': { $in: users } });
  if (foundUsers.length !== users.length) {
    res.status(404);
    throw new Error("One or more users not found");
  }

  // Assign the users to the task
  task.assignedTo.push(...users);  // Add users to the existing assignedTo array (if not already assigned)
  
  await task.save();
  
  res.status(200).json({
    message: "Users assigned to task successfully",
    task,
  });
});



module.exports = { createTask, assignUsersToTask };
