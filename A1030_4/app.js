

const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;


const usersData = JSON.parse(fs.readFileSync('./samples/users.json'));


app.get('/users', (req, res) => {
  res.json(usersData);
});


app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = usersData.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
