const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10; // adjust according to security requirements

const AuthenticationService = {
  // Hashes password
  hashPassword: async (password) => bcrypt.hash(password, saltRounds),

  // Compares plain text password with a hashed password
  comparePassword: async (plainPassword, hashedPassword) =>
    bcrypt.compare(plainPassword, hashedPassword),

  // Generates JWT token
  generateToken: (user) => {
    const payload = {
      id: user.id, // You can add more user details to the payload if needed
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Token expiration can be adjusted
  },
};

module.exports = AuthenticationService;