var express = require("express") 
var fs = require("fs")
var app = express()

const users = JSON.parse(fs.readFileSync('./samples/users.json'));

app.listen(3000, () => {
    console.log("Express started on port 3000")
});

app.get('/users', (req, res) => {
	res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userDetail = users.find(u => u.id == userId);
    
    if (!userDetail) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.json(userDetail);
});