const Sequelize = require('sequelize');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use(express.json());


const sequelize = new Sequelize('jobindb', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});


const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,

});


User.sync();

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'password', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/users/login', (req, res) => {
   
});

app.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    }).catch(error => {
        res.status(500).send('Error reading users data');
    });
});

app.get('/users/:id', authenticateToken, (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) return res.status(404).send('User not found');
        if (req.user.id !== user.id) return res.status(403).send('Access denied');

        res.json(user);
    }).catch(error => {
        res.status(500).send('Error reading user data');
    });
});

app.post('/users', authenticateToken, (req, res) => {
    if (req.user.id !== 1) {
        return res.status(403).send('Access denied');
    }

    User.create(req.body).then(newUser => {
        res.status(201).send(newUser);
    }).catch(error => {
        res.status(500).send('Error saving user data');
    });
});

