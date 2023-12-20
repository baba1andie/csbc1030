/* eslint-env node */
const express = require("express");
const router = express.Router();
const customAuthentication = require('../asignment8/middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (!user) {
    return res.status(401).json({ error: 'Access Denied: Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'new_secret_key');
  res.status(200).json({ token });
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', customAuthentication, async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const authenticatedUserId = req.user.userId;

    if (requestedUserId == authenticatedUserId) {
      const user = await User.findByPk(requestedUserId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Rest of the code remains the same
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
