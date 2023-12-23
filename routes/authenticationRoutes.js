const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");


const validateRequestBody = (requiredFields) => (req, res, next) => {
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({message: `${missingFields.join(", ")} are required`});
  }
  next();
};

const validateLoginRequest = validateRequestBody(["email", "password"]);

const validateRegistrationRequest = validateRequestBody(["name", "email", "password"]);

router.post("/login", validateLoginRequest, authenticationController.loginUser);


router.post("/register", validateRegistrationRequest, authenticationController.createUser);

module.exports = router;