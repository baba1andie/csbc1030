const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const userRoutes = require("./routes/userRoutes.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require("cookie-parser");

const app = express();
const port = 3002;

app.use(express.json());
app.use(cookie());

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; 