const jwt = require("jsonwebtoken");

const handleAuthenticationError = (res, message) => {
  console.error("Authentication error:", message);
  res.status(401).json({ error: message });
};

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleAuthenticationError(res, "Authentication token missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    // This will catch any error thrown by jwt.verify if the token is invalid or expired
    return handleAuthenticationError(res, "Unauthorized: Invalid token");
  }
};

module.exports = authenticate;