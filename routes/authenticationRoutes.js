const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

// Middleware for validating request body, can be customized or extended
function validateLoginRequest(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // Additional validation logic can be added here
  next();
}

function validateRegistrationRequest(req, res, next) {
  const { name, email, password } = req.body;
  // Basic validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }
  // Additional validation logic can be added here
  next();
}

// User login route
router.post("/login", validateLoginRequest, authenticationController.loginUser);

// User registration route
router.post(
  "/register",
  validateRegistrationRequest,
  authenticationController.createUser
);

module.exports = router;
