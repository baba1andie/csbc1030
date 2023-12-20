const { readFile } = require("../services/fsUsers.js");
const bcrypt = require("bcrypt");

const { generateToken } = require("../services/authService.js");

let usersObj = [];

// Logic for Login
const loginUser = async (req, res) => {
  try {
    usersObj = await readFile();
    const userEmail = req.body.email;
    const user = usersObj.find((u) => u.email == userEmail);
    if (user != undefined) {
      const validPass = await bcrypt.compare(req.body.password, user.password); // comparing password from postman with password in json file

      if (!validPass) {
        return res.status(401).send("Incorrect Password !!!");
      }

      const token = await generateToken(user);
      res.cookie("auth-token", token, { maxAge: 180000, httpOnly: true }); // setting "auth-token" in cookies
      res.status(200).send({
        message: `User with email ${user.email} Logged IN successfully`,
        token: token,
      });
    } else {
      const err = `User with id ${userEmail} is NOT FOUND`;
      console.log(err);
      res.status(400).send(err);
    }
  } catch (error) {
    res.status(400).send({ Error: error });
  }
};

module.exports = { loginUser };
