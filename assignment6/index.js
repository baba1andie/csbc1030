

const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const errorHandler = require('./middlewares/errorHandler');
const usersRouter = require('./routes/users');

const app = express();
const port = 1010;

app.use(express.json());


const authorizeUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.use('/users', usersRouter);


app.get('/users', (req, res) => {
  const loadUserData = JSON.parse(fs.readFileSync('./samples/users.json'));
  res.json(loadUserData);
});


app.get('/users/:id', authorizeUser, (req, res) => {
  const userId = req.params.id;
  const loadUserData = JSON.parse(fs.readFileSync('./samples/users.json'));
  const user = loadUserData.find(u => u.id == userId);

  if (user) {
    
    if (req.user && req.user.username === user.username) {
      res.json(user);
    } else {
      res.status(403).json({ error: 'Forbidden: You are not allowed to view this user' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
