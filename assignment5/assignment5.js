import { v4 as uuidv4 } from "uuid";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read users from the file
let fetchUsers = () => {
  return JSON.parse(fs.readFileSync("./users.json", "utf-8"));
};

// Routes
app.get("/users", (req, res) => {
  res.send(fetchUsers());
});
app.get("/users/:id", (req, res) => {
  let userId = req.params.id;
  fetchUsers()?.find((data) => {
    if (data.id === userId) {
      res.send(data);
    }
  });
  res.status(404);
});

app.post("/users", (req, res) => {
  // Extract user data from req.body
  const newUser = req.body;

  newUser.id = String(uuidv4());
  let users = fetchUsers();
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify(users));

  res.json({ message: "User added successfully", newUser });
});

app.use((err, req, res) => {
  console.error("internal server error", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server started`);
});
