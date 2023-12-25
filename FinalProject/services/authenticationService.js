const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;
const authenticationService = {
  async hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
  },

  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  // Generates a JWT token
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  },
};

module.exports = authenticationService;
