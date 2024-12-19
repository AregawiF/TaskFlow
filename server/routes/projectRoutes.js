const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");


// Define the project-related routes
router.post("/create", protect, authorize(['owner']), createProject);

router.get("/test", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
