const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;  

app.use(express.json());

const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

app.get('/', (req, res) => {
    res.send("User Guide");
  });

app.get('/users', (req, res) => {
  res.json(usersData);
});
 
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = usersData.find((user) => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});