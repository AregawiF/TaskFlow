const express = require("express");
const router = express.Router();
const { createTask, assignUsersToTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Protect the route with both protect and authorize middlewares
router.post("/create", protect, authorize(['owner', 'team-member']), createTask);

router.put("/assign-users", protect, assignUsersToTask); // PUT request to assign users


module.exports = router;
