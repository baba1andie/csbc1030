const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { readFile, addUser } = require("../services/fsUsers.js");
const {
  idFromTokenPayload,
  findTokenInCookie,
} = require("../services/authService.js");
let usersObj = [];

// Logic To get all Users
const getUsers = async (req, res) => {
  try {
    usersObj = await readFile(); // Reads the json file for Users data
    res.status(200).send(JSON.stringify(usersObj));
  } catch (error) {
    res.status(400).send({ Error: error });
  }
};

// Logic for Find User by Id
const getUserById = async (req, res) => {
  usersObj = await readFile();
  let token;
  try {
    token = await findTokenInCookie(req); // To Read the auth-token in cookies
  } catch (err) {
    return res.status(401).send({ error: err.message });
  }
  try {
    let verifiedUser = await jwt.verify(token, process.env.TOKEN_SECRET); // env.TOKEN_SECRET => which is the seceret key for jwt
    if (!verifiedUser) {
      return res
        .status(401)
        .send("Unauthorized request - jwt verification failed");
    }
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
  const userId = req.params.id;
  const user = usersObj.find((u) => u.id == userId);
  if (user != undefined) {
    const userIdInToken = idFromTokenPayload(token); // Finding 'id' in payload
    // comparing 'id' in Payload -AND- 'id' from RequestParam
    if (userIdInToken == userId) {
      res.status(200).send(user);
    } else {
      return res
        .status(401)
        .send("Unauthorized User with user id " + userIdInToken);
    }
  } else {
    return res.status(400).send(`User with id ${userId} is NOT FOUND`);
  }
};

// Logic to Create New User
const addNewUser = async (req, res) => {
  try {
    usersObj = await readFile();
    const salt = await bcrypt.genSalt(10); // To generate salt for password hashing
    let user;
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, salt); // To Hash password
      user = {
        id: uuidv4(),
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
      };
    } catch (error) {
      return res.status(400).send("Invalid fields for user");
    }
    usersObj.push(user);
    addUser(user, usersObj);
    res.status(200).send(`User with id ${user.id} is added successfully`);
  } catch (err) {
    res.status(401).send({ error: err });
  }
};

module.exports = { getUsers, getUserById, addNewUser };
