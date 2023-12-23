const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    if (users == undefined || users == null) {
        res.status(401).json({ message: 'no users' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
}

async function userLogin(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({error: 'Unauthorized: Invalid credentials'});
        }
      
        const token = jwt.sign({ userId: user.id }, 'itsAbc@123456');
        res.status(200).json({ message: "Login successfully ", token:token });

    } catch (error) {
        res.status(500).json({ error: 'Error in login'});
    }
}

async function registerUers(req, res) {
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPassword;

        const newUser = await User.create(req.body)
        res.status(201).json({ message: 'user added successfully', usser: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }

}


module.exports = {
  getAllUsers,
  userLogin,
  registerUers
};
