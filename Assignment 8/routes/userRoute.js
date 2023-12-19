const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware.authenticateUser, usersController.getAllUsers);
router.get(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.authorizeUser,
  usersController.getUserById
);
router.post(
  "/",
  authMiddleware.authenticateUser,
  authMiddleware.authorizeUser,
  usersController.addUser
);

module.exports = router;
