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
const User = require("../models/user.js");
const filepath = `D:/Class1030/csbc1030/Assignment7/csbc1030/CURD/inputText.json`;
let allUsers = [{ "email": "shubham@gmail.com", "password": "$2a$12$mM9KHBq.aNi/0EYwmhevx.hRkNUTHw8bg4tkNEYJFrTA44J.VtOjy" }];

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Goto login url')
});

router.post('/login', async (req, res) => {
  try {
    const emailOfUser = req.body.email;
    const passwordOfUser = req.body.password;
    console.log(emailOfUser);

    const user = await User.findOne({
      where: { email: emailOfUser },
    });
    console.log("step2");
    if (!user) {

      const err = new Error('User Not Found!')
      err.status = 400;

      throw err;
    } else {
      const isPasswordValid = await bcrypt.compare(passwordOfUser, user.password);
      if (isPasswordValid) {
      console.log(passwordOfUser);
      const tokenPayload = {
        id: user.id,
        email: user.email,
      };
      const accessToken = jwt.sign(tokenPayload, 'SECRET');
      res.cookie("auth", "true"); // sets the cookie because we have valid information
        res.cookie("authToken", accessToken, { maxAge: 500000, httpOnly: true });
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

// const readFile = async () => {
//   try {
//     console.log("curremtpath is" + filepath);
//     const data = await fs.readFile(filepath, "utf-8");

//     return JSON.parse(data);
//   } catch (error) {
//     const err = "Exception occured while reading file" + error;
//     console.log(err);
//     throw new Error(err);
//   }
// };

// let users = [];

router.get("/user", async (req, res) => {
  try {
    users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  const authToken = await req.cookies["authToken"];
  if (!authToken) {
    return res.status(401).send("Unauthorized User");
  }
  const userId = req.params.id;
  try {
    // users = await readFile();
    // userData = users.find((user) => user.id === userId);
    const authorizedUser = await jwt.verify(authToken, 'SECRET');
    if (!authorizedUser) {
      return res.status(401).send("Unauthorized User");
    }
    const decoded = jwt.decode(authToken, { complete: true });
    const payload = decoded.payload;
    const idFromPayload = payload.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send(`User with ID ${userId} not found`);
    }
    if (userId == idFromPayload) {
      return res.status(201).send(user);
    } else {
      return res.status(401).send("This User is Not Authorized to access this URL");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// let alldata = [];
router.post("/userPost", async (req, res) => {
  try {
    const password = req.body.password;
    if (!password) {
      return res.status(400).send("Please fill all the fields");
    }
    const passwordHash = await bcrypt.hash(password);
    const user = {
      email: req.body.email,
      password: passwordHash,
      name: req.body.name,
      country: req.body.country,
      MOA: req.body.MOA
    }
    // const newData = req.body;

    // users = await readFile();
    const returnedUser = await User.create(user);
    res.status(200).send(returnedUser);
    // fs.writeFile(filepath, JSON.stringify(alldata, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: `Internal Server Error ${error.message}` });
  }
});

module.exports = router;
