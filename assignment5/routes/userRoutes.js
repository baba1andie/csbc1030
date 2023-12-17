/* eslint-env node */

const express = require("express");
const router = express.Router();
const usersData = require("../samples/users.json");
const fs = require('fs');
const authenticateToken = require('../middleware/authmiddleware');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = usersData.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'your_secret_key');
  res.status(200).json({ token });
});

router.get("/", (req, res) => {
  res.json(usersData);
});

router.get('/:id', authenticateToken, (req, res) => {
  const requestedUserId = req.params.id;
  const authenticatedUserId = req.user.userId;

  if (requestedUserId == authenticatedUserId) {
    const user = usersData.find(u => u.id == requestedUserId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.status(200).json(user);
   
  }
  else {

    return res.status(403).json({ error: 'Forbidden: Access denied' });
  }

});

router.post("/", authenticateToken, (req, res) => {
  const authenticatedUserId = req.user.userId;
  if (authenticatedUserId !== 1) {
    return res.status(403).json({ error: 'Forbidden: Access denied' });
  }
  
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