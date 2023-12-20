const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.js");
const {
  idFromTokenPayload,
  findTokenInCookie,
} = require("../services/authService.js");

// Logic To get all Users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Logic for Find User by Id
const getUserById = async (req, res) => {
  let token;
  try {
    token = await findTokenInCookie(req); // To Read the auth-token in cookie
  } catch (err) {
    return res.status(401).send({ error: err.message });
  }
  try {
    let verifiedUser = await jwt.verify(token, process.env.TOKEN_SECRET); // env.TOKEN_SECRET => which is the seceret key for jwt
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

// Logic to Create New User
const addNewUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10); // To generate salt for password hashing
  let user;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // To Hash password
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
