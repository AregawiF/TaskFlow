const express = require("express");
const {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware"); // Assuming you have some kind of authentication middleware

const router = express.Router();

router.route("/").post(protect, createNotification); // Create a notification
router.route("/:userId").get(protect, getUserNotifications); // Get notifications for a user
router.route("/:id/read").put(protect, markNotificationAsRead); // Mark notification as read
router.route("/:id").delete(protect, deleteNotification); // Delete a notification

module.exports = router;