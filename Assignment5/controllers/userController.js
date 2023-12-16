const fs = require('fs');
const users = require('../samples/users.json');

exports.getAllUsers =(req, res)=> {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const userId = req.parms.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.stauts(404).json({error: 'User not Found'});
  }
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
