const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.addUser);

module.exports = router;
