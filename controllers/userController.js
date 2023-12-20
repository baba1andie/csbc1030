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

const getUsers = async (req, res) => {
  try {
    usersObj = await readFile();
    res.status(200).send(JSON.stringify(usersObj));
  } catch (error) {
    res.status(400).send({ Error: error });
  }
};

const getUserById = async (req, res) => {
  usersObj = await readFile();
  let token;
  try {
    token = await findTokenInCookie(req);
  } catch (err) {
    return res.status(401).send({ error: err.message });
  }
  try {
    let verifiedUser = await jwt.verify(token, process.env.TOKEN_SECRET); // env.TOKEN_SECRET => 'secretKey'
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

const addNewUser = async (req, res) => {
  try {
    usersObj = await readFile();
    const salt = await bcrypt.genSalt(10);
    let user;
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
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
