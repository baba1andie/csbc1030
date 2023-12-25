const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

function validateLoginRequest(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  next();
}

function validateRegistrationRequest(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }
  next();
}

router.post("/login", validateLoginRequest, authenticationController.loginUser);

module.exports = router;
