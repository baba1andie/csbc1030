const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 


function readUsers() {
    const rawData = fs.readFileSync('users.json');
    return JSON.parse(rawData);
}


function writeUsers(users) {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', data);
}


app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.get('/users', (req, res) => {
    try {
        const users = readUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error reading users data');
    }
});


app.get('/users/:id', (req, res) => {
    try {
        const users = readUsers();
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).send('Error reading user data');
    }
});


app.post('/users', (req, res) => {
    try {
        const users = readUsers();
        const newUser = req.body;

        
        if (!newUser || !newUser.id || !newUser.name) {
            return res.status(400).send('Invalid user data');
        }

        users.push(newUser);
        writeUsers(users);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send('Error saving user data');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

