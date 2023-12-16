const express = require("express");
const bcrypt = require('bcrypt');
const fs = require("fs").promises;
const path = require("path");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const app = express();
const port = 3002;

const router = express.Router();
const currentDir = path.join(__dirname, "CURD");
const filepath = `D:/Class1030/csbc1030/Assignment6/CURD/inputText.json`;
let allUsers = [{ "email": "shubham@gmail.com", "password": "Shubham" }];

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Goto login url')
});

router.post('/login', async (req, res) => {
  try {



    console.log(req.body.email);
    console.log(allUsers[0].password);

    allUsers = allUsers.find((user) => user.email === req.body.email);
    console.log("step2");
    if (!allUsers) {

      const err = new Error('User Not Found!')
      err.status = 400;

      throw err;
    } else if (bcrypt.compare(req.body.password, allUsers.password)) {
      console.log(req.body.password);
      const tokenPayload = {
        email: allUsers.email,
      };
      const accessToken = jwt.sign(tokenPayload, 'SECRET');
      res.cookie("auth", "true"); // sets the cookie because we have valid information
      res.status(201).json({
        status: 'success',
        message: 'User Logged In!',
        data: {
          accessToken,
        },
      });
    } else {
      console.log("this is else block");
      const err = new Error('Wrong Password!');
      err.status = 400;
      throw err;
    }
  } catch (err) {
    res.status(err.status).json({
      status: 'fail',
      message: err.message,
    });
  }
});


const isAuthenticated = (req, res, next) => {
  if (req.cookies.auth === "true") {
    next();
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized - User not logged in',
    });
  }
};

app.use(isAuthenticated);

router.post("/logout", (req, res) => {
  res.cookie("auth", "false"); // simply sets it to false
  return res.status(201).json({
    status: 'success',
    message: 'User Logged Out!',
    data: {
      accessToken,
    },
  });
});

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
