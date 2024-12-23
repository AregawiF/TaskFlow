const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const nodemailer = require('nodemailer'); 
require('dotenv').config(); // Load environment variables

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
  project.tasks.push(task._id); 
  await project.save(); 
  
  res.status(201).json({
    message: "Task created successfully",
    task,
  });
});


// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, //  email
    pass: process.env.EMAIL_PASS, //  email password or app password
  },
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certificate errors
  },
});

const assignUsersToTask = asyncHandler(async (req, res) => {
  const { taskId, users } = req.body;

  // Validate input
  if (!taskId || !users || !Array.isArray(users)) {
    res.status(400);
    throw new Error("Please provide a valid task ID and an array of usernames");
  }

  // Check if the task exists
  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Find users by their usernames
  const foundUsers = await User.find({ username: { $in: users } });
  if (foundUsers.length !== users.length) {
    res.status(404);
    throw new Error("One or more users not found");
  }

  // Assign the users to the task
  task.assignedTo.push(...foundUsers);
  await task.save();

  // Send email to each assigned user
  foundUsers.forEach(user => {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email
      to: user.email, // User's email
      subject: 'Task Assigned to You',
      text: `Hello ${user.username},\n\nYou have been assigned a new task: ${task.title}.\n\nDescription: ${task.description}\n\nBest regards,\nYour Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });

  res.status(200).json({
    message: "Users assigned to task successfully",
    task,
  });
});





// const assignUsersToTask = asyncHandler(async (req, res) => {
//   const { taskId, users } = req.body;  // Task ID and array of usernames
//   console.log("Task ID:", taskId);
//   console.log("Users:", users);

//   // Validate input
//   if (!taskId || !users || !Array.isArray(users)) {
//     res.status(400);
//     throw new Error("Please provide a valid task ID and an array of usernames");
//   }

//   // Check if the task exists
//   const task = await Task.findById(taskId);
//   if (!task) {
//     res.status(404);
//     throw new Error("Task not found");
//   }

//   // Find users by their usernames
//   const foundUsers = await User.find({ username: { $in: users } });
//   if (foundUsers.length !== users.length) {
//     res.status(404);
//     throw new Error("One or more users not found");
//   }

//   // Create an array of user objects with ID and username
//   const usersToAssign = foundUsers.map(user => ({
//     userId: user._id,
//     username: user.username
//   }));

//   // Filter out users already assigned to the task
//   const uniqueUsersToAdd = usersToAssign.filter(user => 
//     !task.assignedTo.some(assigned => assigned.userId.toString() === user.userId.toString())
//   );

//   if (uniqueUsersToAdd.length === 0) {
//     res.status(400);
//     throw new Error("All provided users are already assigned to this task");
//   }

//   // Assign the users to the task
//   task.assignedTo.push(...uniqueUsersToAdd);
//   await task.save();

//   res.status(200).json({
//     message: "Users assigned to task successfully",
//     task,
//   });
// });


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
  if (deadline) {
    task.deadline = new Date(deadline); // Update deadline if provided
  }
  if (priority) {
    task.priority = priority; // Update priority if provided
  }

  const updatedTask = await task.save();

  res.status(200).json({
    message: "Work schedule adjusted successfully",
    task: updatedTask,
  });
});

const getTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params; // Get the task ID from the request parameters

  // Validate input
  if (!taskId) {
    res.status(400);
    throw new Error("Please provide a valid task ID");
  }

  // Check if the task exists
  const task = await Task.findById(taskId).populate('assignedTo'); // Optionally populate assignedTo with user details
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json(task); // Return the task details
});

const markTaskAsDone = asyncHandler(async (req, res) => {
  const { taskId } = req.params; // Get the task ID from the request parameters

  // Validate input
  if (!taskId) {
    res.status(400);
    throw new Error("Please provide a valid task ID");
  }

  // Check if the task exists
  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Update the task status to 'completed'
  task.status = "completed"; // or whatever status you want to use
  await task.save();

  res.status(200).json({
    message: "Task marked as done successfully",
    task,
  });
});


module.exports = { createTask, assignUsersToTask, adjustWorkSchedule, getTask, markTaskAsDone };
