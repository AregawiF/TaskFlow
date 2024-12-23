const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// @desc Create a new notification
// @route POST /api/notifications
// @access Private
const createNotification = asyncHandler(async (req, res) => {
  const { user, message } = req.body;

  // Validate inputs
  if (!user || !message) {
    res.status(400);
    throw new Error("User and message are required");
  }

  // Create notification
  const notification = await Notification.create({
    user,
    message,
  });

  res.status(201).json(notification);
});

// @desc Get notifications for a user
// @route GET /api/notifications/:userId
// @access Private
const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });

  res.status(200).json(notifications);
});

// @desc Mark a notification as read
// @route PUT /api/notifications/:id/read
// @access Private
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json(notification);
});

// @desc Delete a notification
// @route DELETE /api/notifications/:id
// @access Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  // Find and delete the notification
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  // Use deleteOne or findByIdAndDelete
  await Notification.findByIdAndDelete(notificationId);

  res.status(200).json({ message: "Notification deleted successfully" });
});

// Export the controller functions
module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
};