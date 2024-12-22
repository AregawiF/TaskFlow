const express = require("express");
const router = express.Router();
const { createTask, assignUsersToTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { adjustWorkSchedule } = require("../controllers/taskController");
const { getTask } = require("../controllers/taskController");
const { markTaskAsDone } = require("../controllers/taskController");

// Protect the route with both protect and authorize middlewares
router.post("/create", protect, authorize(['owner', 'team-member']), createTask);

router.put("/assign-users", protect, authorize(['owner']), assignUsersToTask); // PUT request to assign users

router.patch("/:taskId/schedule", protect, authorize(['owner']), adjustWorkSchedule); // PATCH request to adjust work schedule

router.get("/:taskId", protect, authorize(['owner', 'team-member']), getTask); // GET request to get a task

router.put("/:taskId/mark-done", protect, authorize(['owner', 'team-member']), markTaskAsDone); // PUT request to mark a task as done

module.exports = router;



