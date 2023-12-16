const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const port = 3002;

const router = express.Router();
const currentDir = path.join(__dirname, "CURD");
const filepath = `D:/Class1030/csbc1030/Assignment5/CURD/inputText.json`;

const readFile = async () => {
  try {
    console.log("curremtpath is" + filepath);
    const data = await fs.readFile(filepath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    const err = "Exception occured while reading file" + error;
    console.log(err);
    throw new Error(err);
  }
};

let users = [];

router.get("/user", async (req, res) => {
  try {
    users = await readFile();
    res.json(users);
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  let userData;
  try {
    users = await readFile();
    userData = users.find((user) => user.id === userId);
  } catch (error) {
    res.status(400).send({ Error: error });
  }

  console.log("userid is " + userId);
  console.log("userdata is " + JSON.stringify(userData));

  if (userData) {
    res.json(userData);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

let alldata = [];
router.post("/userPost", async (req, res) => {
  const newData = req.body;

  users = await readFile();
  alldata = [newData, ...users];
  console.log(newData);
  try {
    fs.writeFile(filepath, JSON.stringify(alldata, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
