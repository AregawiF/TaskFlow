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

  // Filter out users already assigned to the task
  const uniqueUsersToAdd = users.filter((userId) => !task.assignedTo.includes(userId));

  if (uniqueUsersToAdd.length === 0) {
    res.status(400);
    throw new Error("All provided users are already assigned to this task");
  }

  // Assign the users to the task
  task.assignedTo.push(...uniqueUsersToAdd);  // Add users to the existing assignedTo array (if not already assigned)
  
  await task.save();
  
  res.status(200).json({
    message: "Users assigned to task successfully",
    task,
  });
});


// Adjust work schedule (deadline/priority)
const adjustWorkSchedule = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { deadline, priority } = req.body;

  // Find the task
  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Only allow owners or the user who created the task to modify it
  if (req.user.role !== "owner" && task.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to adjust this task");
  }

  // Update the task
  if (deadline) task.deadline = new Date(deadline);
  if (priority) task.priority = priority;

  const updatedTask = await task.save();

  res.status(200).json({
    message: "Work schedule adjusted successfully",
    task: updatedTask,
  });
});



module.exports = { createTask, assignUsersToTask, adjustWorkSchedule };
