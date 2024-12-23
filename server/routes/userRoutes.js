const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private route
router.get("/profile", protect, getUserProfile);
router.delete("/profile", protect, deleteUserProfile);

module.exports = router;
