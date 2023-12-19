const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {Sequelize} = require('sequelize');
const userController = require('./controllers/userController');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Set up Sequelize and connect to the database
const sequelize = require('./sequelize');

// Import the User model
const User = require('./models/User')(sequelize);

// Synchronize the models with the database
sequelize.sync();

// Authentication Middleware
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  console.log('Request Headers:', req.headers); // Debugging statement

  if (!token) {
    return res.status(401).json({error: 'Unauthorized: Missing Token'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({error: 'Unauthorized: Invalid token' });
  }
};

// Authorization Middleware
const authorizeUser = (req, res, next) => {
  if (req.user.id !== 1) {
    return res.status(403).json({error: 'Forbidden: User not authorized'});
  }

  next();
};

// Login Route
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);

  res.json({token});
});



// Protected Routes
app.get('/users', authenticateUser, authorizeUser, userController.getAllUsers);
app.get('/users/:id', authenticateUser, authorizeUser, userController.getUserById);
app.post('/users', authenticateUser, authorizeUser, userController.addUser);

app.get('/', (req, res) => {
  res.send('Welcome to Express Users API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
