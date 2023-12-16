const express = require('express');
const app = express();
const users = require('./samples/users.json');

// Route to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Express Users API!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
