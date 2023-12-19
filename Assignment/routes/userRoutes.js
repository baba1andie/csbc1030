const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const authMiddleware = require("../middleware/auth");

router.post("/users/login", userController.login);
router.get("/users/:id", authMiddleware.authenticateToken, authMiddleware.authorizeUser, userController.getUserById);
router.post("/users", authMiddleware.authenticateToken, userController.createUser);
router.get("/users", authMiddleware.authenticateToken, userController.getAllUsers);

module.exports = router;