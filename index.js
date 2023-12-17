// index.js
const express = require("express");
const fs = require("fs");
require('dotenv').config();
const users = require("./users.json");
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const { authenticate } = require('./auth');
// const { secretKey } = process.env.SECRET_KEY;//require('./config');
app.use(express.json());
console.log('Secret Key:', process.env.SECRET_KEY);
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
//   const token = [];
const user = users.find(u => u.username === username && u.password === password);
console.log(user);
  if (user) {
   const token = jwt.sign({ id: 1, username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

const { auth, authorize } = require('./auth');

app.get('/users/:id', auth, authorize(1), (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (userId === req.user.id) {
    const user = users.find((u) => u.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(403).json({ error: 'You are not authorized to view this user!!!' });
  }
});

app.post('/users', auth, (req, res) => {
  //
  console.log(req.user);
  const authenticatedUserId = req.user.id;
  if (authenticatedUserId !== 1) {
    return res.status(403).json({ error: 'Forbidden: Access denied' });
  }
  const newUser = req.body; 
  users.push(newUser);
  fs.appendFile("users.json", JSON.stringify(users), "utf8", (err) => {
    // console.log("0");
    if (err) {
      console.error("Error writing to users.json:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // console.log("1");
    res.status(201).json(newUser);
    // console.log("2");
  });

});
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
