const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));

app.get("/", (req, res) => {
  res.send("User Guide");
});

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

// Create a new user
app.post("/users", (req, res, next) => {
  const newUser = req.body;

  if (!newUser || !newUser.id || !newUser.name) {
    const error = new Error("Invalid user data");
    error.status = 400;
    next(error);
  } else {
    // Append the new user to the existing data
    usersData.push(newUser);

    // Update the users file
    fs.writeFileSync("users.json", JSON.stringify(usersData, null, 2), "utf-8");

    res.status(201).json(newUser);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
