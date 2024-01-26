const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  addNewUser,
} = require("../controllers/userController.js");

router.get("/", getUsers);

module.exports = router;
