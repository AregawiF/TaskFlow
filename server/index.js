const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const issueRoutes = require("./routes/issueRoutes");



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Connect to the database
connectDB();

// Middleware for parsing JSON
app.use(express.json());


// Define routes (import from `routes/` folder)
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes); // Mount project-related routes
app.use("/api/tasks", taskRoutes); // Mount task-related routes

app.use("/api/tasks", issueRoutes);


// error handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});


app.get("/", (req, res) => {
    res.send("TaskFlow backend is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






