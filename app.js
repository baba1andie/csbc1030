// Import necessary modules
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");
require("dotenv").config();

// Import routes
const authenticationRoutes = require("./routes/authenticationRoutes");
const postsRoutes = require("./routes/postsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authenticationRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: { message: err.message || "Internal Server Error." } });
});

// Sequelize database synchronization and server startup
sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database: ", err);
  });

module.exports = app;
