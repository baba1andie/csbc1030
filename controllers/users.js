/* eslint-env node */

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const usersFilePath = "./samples/users.json";

const appendUser = (req, res) => {
  const newUser = req.body;
  newUser.id = uuidv4(); // Generate a new UUID for the user

  const existingUsers = JSON.parse(fs.readFileSync(usersFilePath));
  existingUsers.push(newUser);

  fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));

  res.json(newUser);
};

module.exports = { appendUser };
