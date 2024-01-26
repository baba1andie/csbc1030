const bcrypt = require("bcrypt");
require("dotenv").config();

const { User } = require("../models/user.js");
const {
  idFromTokenPayload,
  findTokenInCookie,
  findVerifiedUser,
} = require("../services/authService.js");


const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const getUserById = async (req, res) => {
  let token;
  try {
    token = await findTokenInCookie(req); 
    findVerifiedUser(token);
  } catch (err) {
    return res.status(401).send({ error: err.message });
  }
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (user) {
    const userIdInToken = idFromTokenPayload(token); 

    if (userIdInToken == userId) {
      res.status(200).send(user);
    } else {
      res.status(401).send("Unauthorized User with user id " + userIdInToken);
    }
  } else {
    res.status(400).send(`User with id ${userId} is NOT FOUND`);
  }
};


const addNewUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10); // random number generator
  let user;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    };
  } catch (error) {
    return res.status(400).send("Invalid fields for user");
  }
  try {
    user = await User.create(user);
    res.status(201).send(`User with id ${user.id} is added successfully`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getUsers, getUserById, addNewUser };
