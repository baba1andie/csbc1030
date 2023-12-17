const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const usersFilePath = './samples/users.json';

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const isValidCredentials = (username, password) => {
    
    const validUsername = req.body.username;
    const validPassword = req.body.password;
    return username === validUsername && password === validPassword;
  };

  if (isValidCredentials(username, password)) {
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

const appendUser = (req, res) => {
  const newUser = req.body;
  newUser.id = uuidv4();

  if (req.body.id === '1') {
    console.log(req.body)
    const existingUsers = JSON.parse(fs.readFileSync(usersFilePath));
    existingUsers.push(newUser);

    fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));

    res.json(newUser);
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

router.post('/login', loginUser);
router.post('/', appendUser);

module.exports = router;
