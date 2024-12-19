const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  description: { type: String, required: true },
  status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;