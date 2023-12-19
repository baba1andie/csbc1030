const User = require("../models/users");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "2fd45a9c8b1e6f37d0a4c8e5b2f971d4a6bc3e188f67c92a3e87bf3a8c6d195d";

const login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Unauthorized - Invalid credentials" });
      }

      // Generate and return a JWT token
      const token = jwt.sign({ user: { id: user.id, username: user.username } }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    })
    .catch((error) => {
      console.error("Error checking login credentials:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;

  try {
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userdata = await User.findAll();
    res.json(userdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  getUserById,
  createUser,
  getAllUsers,
};
