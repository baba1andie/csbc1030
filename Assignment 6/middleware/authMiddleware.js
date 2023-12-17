const jwt = require("jsonwebtoken");
const secretKey =
  "dGhpcyBpcyBhIGVuY29kaW5nIGtleSB0byBjdXJyZW50IHNlY3JldCBrZXkK";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateUser };
