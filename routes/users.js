/* eslint-env node */

const express = require("express");
const router = express.Router();
const usersData = require("../samples/users.json");
const fs = require('fs');

router.get("/", (req, res) => {
  res.json(usersData);
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = usersData.find((user) => user.id == userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.post("/", (req, res) => {
  const newUser = req.body;

  usersData.push(newUser);

  fs.appendFile('users.json', JSON.stringify(usersData), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add user' });
    }
    res.status(201).json({ message: 'User added successfully', user: newUser });
  });
});

module.exports = router;