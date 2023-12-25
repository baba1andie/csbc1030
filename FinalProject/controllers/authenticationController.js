const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
require("dotenv").config();

const authenticationController = {
  // Login User
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Authentication failed. Wrong password." });
      }

      // User matched, create JWT Payload
      const payload = { id: user.id, email: user.email };

      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token: "Bearer " + token });
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authenticationController;
