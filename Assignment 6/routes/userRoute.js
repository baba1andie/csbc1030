const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", usersController.getAllUsers);
router.get(
  "/:id",
  authMiddleware.authenticateUser,
  usersController.getUserById
);
router.post("/", authMiddleware.authenticateUser, usersController.addUser);

module.exports = router;
