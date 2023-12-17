const users = require("../users.json");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../users.json");

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

  if (req.userId !== 1) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Only user ID 1 can add users" });
  }

  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    let users = JSON.parse(data);
    const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
    newUser.id = lastUserId + 1;

    users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      res.status(201).json(newUser);
    });
  });
};

module.exports = { getAllUsers, getUserById, addUser };
