// Change the import statement to use the correct relative path
const { User } = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... (other controller methods)


exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getUserById:', error); // Add this line for detailed error logging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const user = await User.create(newUser);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error in addUser:', error); // Add this line for detailed error logging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
