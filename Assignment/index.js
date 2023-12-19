const express = require("express");
const sequelize = require("./config/config");
const userController = require("./controllers/usersController");
const authMiddleware = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");


const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.post("/users/login", userController.login);
app.get("/users/:id", authMiddleware.authenticateToken, authMiddleware.authorizeUser, userController.getUserById);
app.post("/users", authMiddleware.authenticateToken, userController.createUser);
app.get("/users", userController.getAllUsers);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const startServer = () => {
  sequelize.sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Error syncing with the database:", error);
    });
};

startServer();

module.exports = app;