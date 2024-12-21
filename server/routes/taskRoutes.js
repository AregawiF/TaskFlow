const express = require("express");
const router = express.Router();
const { createTask, assignUsersToTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { adjustWorkSchedule } = require("../controllers/taskController");

// Protect the route with both protect and authorize middlewares
router.post("/create", protect, authorize(['owner', 'team-member']), createTask);

router.put("/assign-users", protect, assignUsersToTask); // PUT request to assign users

router.patch("/:taskId/schedule", protect, adjustWorkSchedule); // PATCH request to adjust work schedule

module.exports = router;



