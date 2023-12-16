const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const userRoutes = require("./routes/userRoutes.js");
const app = express();
const port = 3002;

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
