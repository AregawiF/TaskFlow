const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },    //req
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },  //req
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  deadline: { type: Date },
  progress: { type: Number, default: 0 },       
  createdAt: { type: Date, default: Date.now },
  toDoList: [
    {
      title: { type: String, required: true },    //req
      status: { type: String, enum: ["pending", "completed"], default: "pending" },
    },
  ],
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