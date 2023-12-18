const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.js");
const { idFromTokenPayload } = require("../services/authService.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const token = await req.cookies["auth-token"];
  if (!token) {
    res.status(401).send("Access Denied - Token Unavailable/Empty in Header");
  }
  try {
    let verifiedUser = await jwt.verify(token, process.env.TOKEN_SECRET); // env.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) {
      res.status(401).send("Unauthorized request - jwt verification failed");
    }
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (user) {
    const userIdInToken = idFromTokenPayload(token); // Finding 'id' in payload
    // comparing 'id' in Payload -AND- 'id' from RequestParam
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
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let user = {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    };

    user = await User.create(user);
    res.status(201).send(`User with id ${user.id} is added successfully`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getUsers, getUserById, addNewUser };
