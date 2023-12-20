const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  addNewUser,
} = require("../controllers/userController.js");
// const someMiddleware = require("../middleware/middlewares.js");

// router.use(someMiddleware);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", addNewUser);

module.exports = router;
