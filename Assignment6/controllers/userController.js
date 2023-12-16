const fs = require('fs');
const users = require('../users.json');

exports.getAllUsers =(req, res)=> {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id == userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

exports.addUser = (req, res, next) => {
  try {
    const newUser = {
      id: String(users.length +1),
      name: req.body.name,
      email: req.body.email,
    };

    users.push(newUser);

    fs.writeFileSync('../samples.users.json', JSON, stringify(users, null, 2));

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
