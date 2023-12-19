const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const secretKey =
  "dGhpcyBpcyBhIGVuY29kaW5nIGtleSB0byBjdXJyZW50IHNlY3JldCBrZXkK";

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      const token = generateToken(user.id);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { login };
