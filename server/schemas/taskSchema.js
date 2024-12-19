const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Team Member assigned
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  deadline: { type: Date },
  progress: { type: Number, default: 0 }, // Progress in percentage
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", TaskSchema);