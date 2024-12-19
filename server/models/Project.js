const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Business Owner
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Assigned team members
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],              // Related tasks
  status: { type: String, enum: ["ongoing", "completed", "on-hold"], default: "ongoing" },
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
