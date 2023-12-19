/* eslint-env node */

const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authmiddleware');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

router.post('/login', async(req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username, password } });
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'itsAbc@123456');
  res.status(200).json({ token });
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const authenticatedUserId = req.user.userId;
  
    if (requestedUserId == authenticatedUserId) {
      const user = await User.findByPk(requestedUserId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      res.status(200).json(user);
    }
    else {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }
  } catch(error) {
    res.status(500).json({ error: 'Server error' });
  }
 

});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const authenticatedUserId = req.user.userId;
    if (authenticatedUserId !== 1) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }
  
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;