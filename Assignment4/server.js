const express = require('express');
const app = express();
const PORT = 3000;

const userRoutes = require('./routes/users');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('User Guide');
});

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log('Server is running');
});