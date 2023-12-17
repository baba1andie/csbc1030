const { readFile } = require("../services/fsUsers.js");
const bcrypt = require("bcrypt");

const { generateToken } = require("../services/authService.js");

let usersObj = [];

const loginUser = async (req, res) => {
  try {
    usersObj = await readFile();
    const userEmail = req.body.email;
    const user = usersObj.find((u) => u.email == userEmail);
    if (user != undefined) {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (!validPass) {
        return res.status(401).send("Incorrect Password !!!");
      }

      const token = await generateToken(user);
      res.cookie("auth-token", token, { maxAge: 3600000, httpOnly: true });
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
