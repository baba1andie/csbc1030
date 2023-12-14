const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const data = JSON.parse(fs.readFileSync('D:/Class1030/csbc1030/Assignment4/usersdata.json', 'UTF-8'));

app.get('/user', (req, res) => {
    res.json(data);
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    const user = data.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
