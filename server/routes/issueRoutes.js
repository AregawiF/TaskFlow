const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addIssue, getTaskIssues, updateIssue } = require("../controllers/issueController");

// Add a new issue to a task
router.post("/:taskId/issues", protect, addIssue);

// Get all issues for a task
router.get("/:taskId/issues", protect, getTaskIssues);

// Update or resolve an issue
router.put("/:taskId/issues/:issueId", protect, updateIssue);

module.exports = router;
