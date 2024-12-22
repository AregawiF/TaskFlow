const express = require("express");
const router = express.Router();
const { createProject, getAllProjects } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");


// Define the project-related routes
router.post("/create", protect, authorize(['owner']), createProject);
router.get("/", protect, authorize(['owner', 'team-member']), getAllProjects);

module.exports = router;
