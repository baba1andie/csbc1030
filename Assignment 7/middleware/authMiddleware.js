const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const secretKey =
  "dGhpcyBpcyBhIGVuY29kaW5nIGtleSB0byBjdXJyZW50IHNlY3JldCBrZXkK";

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateUser };
