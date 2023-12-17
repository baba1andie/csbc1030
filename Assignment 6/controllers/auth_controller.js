const jwt = require("jsonwebtoken");
const users = require("../users.json");
// const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");

const secretKey =
  "dGhpcyBpcyBhIGVuY29kaW5nIGtleSB0byBjdXJyZW50IHNlY3JldCBrZXkK";

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

const authenticateUser = (username, password) => {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    return user.id;
  }

  return null;
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const userId = authenticateUser(username, password);

  if (userId) {
    const token = generateToken(userId);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = { login };
