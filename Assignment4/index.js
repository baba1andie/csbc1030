const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;



function readUsers() {
    const rawData = fs.readFileSync('users.json');
    return JSON.parse(rawData);
}


app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    console.log(__dirname)
    next();
});



app.get('/users', (req, res) => {
    try {
        const users = readUsers();
        res.json(users);
    } catch (error) {
        console.error(error)
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


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
