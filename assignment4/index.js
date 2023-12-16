const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware for JSON and URL-encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read users from the file
const usersData = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

// Routes
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

app.post("/users", (req, res) => {
  // Extract user data from req.body
  const newUser = req.body;

  // Assign a unique ID to the new user (you may use a library like uuid)
  newUser.id = String(usersData.length + 1);

  // Append the new user to the existing usersData
  usersData.push(newUser);

  // Update the users.json file
  fs.writeFileSync("./users.json", JSON.stringify(usersData, null, 2));

  res.json({ message: "User added successfully", newUser });
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
