//index.js
const express = require("express");
const fs = require("fs/promises");
const app = express();
const PORT = 3000;
app.use(express.json());
let users = [];
async function loadUsers() {
  try {
    const data = await fs.readFile("users.json", "utf8");
    users = JSON.parse(data);
  } catch (error) {
    console.error("Error loading users:", error.message);
  }
}
loadUsers();
app.get("/users", (req, res) => {
  res.json(users);
  //   res.body(users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
app.post("/users", (req, res) => {
  const newUser = req.body; //add data to body(JSON)
  users.push(newUser);
  fs.writeFile("users.json", JSON.stringify(users, null, 2), "utf8", (err) => {
    console.log("0");
    if (err) {
      console.error("Error writing to users.json:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("1");
    res.status(201).json(newUser);
    console.log("2");
  });
});
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




