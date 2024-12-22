const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    const project = new Project({
      title,
      description,
      owner: req.user.id, // `req.user` is added by `authMiddleware`
    });

    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects belonging to the authenticated user
    const projects = await Project.find({ owner: req.user.id });

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { createProject, getAllProjects };
