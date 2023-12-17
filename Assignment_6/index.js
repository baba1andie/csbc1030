const express = require("express");
const fs = require("fs/promises");
require('dotenv').config();

const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const { authenticate } = require('./authen');

app.use(express.json());
console.log('Secret Key:', process.env.SECRET_KEY);
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
   const token = jwt.sign({ id: 1, username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

const { auth, authorize } = require('./authen');

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

app.post('/users', auth, authorize(1), (req, res) => {

  const newUser = req.body; 
  users.push(newUser);
  fs.writeFile("users.json", JSON.stringify(users, null, 2), "utf8", (err) => {
    console.log("0");
    if (err) {
      console.error("Error writing to users.json:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("1");
    res.status(201).json(newUser);
    console.log("2");
  });

});
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });