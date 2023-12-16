const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Authentication Middleware
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    console.log('Request Headers:', req.headers); // Debugging statement

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing Token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// Authorization Middleware
const authorizeUser = (req, res, next) => {
    if (req.user.id !== 1) {
        return res.status(403).json({ error: 'Forbidden: User not authorized' });
    }

    next();
};

// Login Route
app.post('/users/login', (req, res) => {
    const { username, password } = req.body;

    const users = require('./users.json');
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

    res.json({ token });
});


// Protected Routes
app.get('/users', authenticateUser, authorizeUser, userController.getAllUsers);
app.get('/users/:id', authenticateUser, authorizeUser, userController.getUserById);
app.post('/users', authenticateUser, authorizeUser, userController.addUser);

app.get('/', (req, res) => {
    res.send('Welcome to Epress Users API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
