const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let { readFile, addUser } = require("../services/fsUsers.js");
let usersObj = [];

router.get("/", async (req, res) => {
  try {
    usersObj = await readFile();
    res.status(200).send(JSON.stringify(usersObj));
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = usersObj.find((u) => u.id == userId);
  if (user != undefined) {
    console.log(`User with id ${userId} is ` + JSON.stringify(user));
    res.status(200).send(user);
  } else {
    const err = `User with id ${userId} is NOT FOUND`;
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/", (req, res) => {
  const user = req.body;
  user.id = uuidv4();
  usersObj.push(user);
  try {
    addUser(usersObj);
    res.status(200).send(`User with id ${user.id} is added successfully`);
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});

module.exports = router;
