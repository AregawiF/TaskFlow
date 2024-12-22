const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },    //req
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },  //req
  assignedTo: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      username: { type: String }
    }
  ], 
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  deadline: { type: Date },
  createdAt: { type: Date, default: Date.now },
  issues: [
    {
      description: { type: String, required: true },
      reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["open", "resolved"], default: "open" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;