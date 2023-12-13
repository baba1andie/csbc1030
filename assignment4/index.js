const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// Read users from the file
const usersData = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

// Define routes
app.get("/users", (req, res) => {
  res.json(usersData);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = usersData.find((user) => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
