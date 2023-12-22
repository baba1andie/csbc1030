const User = require('../model/user');
const jwt = require('jsonwebtoken');

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    console.log(users);
    if (users == undefined || users == null) {
        res.status(401).json({ message: 'no users' });
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

async function userLogin(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username, password } });
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
        }
      
        const token = jwt.sign({ userId: user.id }, 'itsAbc@123456');
        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error in login'});
    }
}


module.exports = {
  getAllUsers,
  userLogin
};
