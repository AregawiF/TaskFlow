const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");

// Add an issue to a task
const addIssue = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { description } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const newIssue = {
    description,
    reportedBy: req.user._id, // Authenticated user
  };

  task.issues.push(newIssue);
  await task.save();

  res.status(201).json({ message: "Issue added successfully", issue: newIssue });
});

// Get all issues for a task
const getTaskIssues = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId).populate("issues.reportedBy", "username email");

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json(task.issues);
});

// Update or resolve an issue
const updateIssue = asyncHandler(async (req, res) => {
  const { taskId, issueId } = req.params;
  const { status } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const issue = task.issues.id(issueId);

  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  }

  issue.status = status || issue.status; // Update status (open/resolved)
  await task.save();

  res.status(200).json({ message: "Issue updated successfully", issue });
});

module.exports = { addIssue, getTaskIssues, updateIssue };
