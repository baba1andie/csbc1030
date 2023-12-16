/* eslint-env node */
// const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 1010;

app.use(express.json());

app.use(errorHandler);

const loadUserData = JSON.parse(fs.readFileSync("./samples/users.json"));

app.post("/users", (req, res) => {
  const user = req.body;
  loadUserData.push(user);
  console.log(JSON.stringify(loadUserData));
  fs.writeFileSync("./samples/users.json", JSON.stringify(loadUserData));
  res.status(200).send(`user added with ID ${req.body.id}`);
});

app.get("/users", (req, res) => {
  res.json(loadUserData);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = loadUserData.find((u) => u.id == userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
