//index.js
const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = 3000;
app.use(express.json());
let users = [];
async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error.message);
  }
}

loadUsers();
app.get('/users', (req, res) => {
  res.json(users);
//   res.body(users);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
