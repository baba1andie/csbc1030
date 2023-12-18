const users = require("../users.json");

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const addUser = (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
};

module.exports = { getAllUsers, getUserById, addUser };
