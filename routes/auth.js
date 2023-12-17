const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController.js");

router.post("/", loginUser);

module.exports = router;
