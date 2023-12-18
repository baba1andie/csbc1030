const express = require("express");
const fs = require("fs"); 
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const SECRET_KEY = "2fd45a9c8b1e6f37d0a4c8e5b2f971d4a6bc3e188f67c92a3e87bf3a8c6d195d";

app.use(express.json());


const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));

// Middleware for authenticating requests
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if(!token){
    res.status(401).json({error:"Token not provided"})
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY)
    req.user = decoded.user
    next()
  } catch (error) {
    return res.status(401).json({error:"Unauthorised - Invalid Token"})
  }

}

// Middleware for authorizing requests
function authorizeUser(req, res, next) {
  const userId = parseInt(req.params.id)

  if (req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden - You are not authorized to access this resource!" });
  }

  next();
}

app.get("/", (req, res) => {
  res.send("User Guide");
});

app.post("/users/login", (req, res) => { 
  const { username, password } = req.body;
  const user = usersData.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized - Invalid credentials" });
  }

  // Generate and return a JWT token
  const token = jwt.sign({user : {id:user.id, username: user.username}}, SECRET_KEY, { expiresIn: '1h'});
  res.json({ token });
});

app.get("/users/:id", authenticateToken, authorizeUser, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usersData.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.post("/users", authenticateToken, (req, res) => {
  const newUser = req.body;

  if (req.user.id !== 1) {
    return res.status(403).json({ error: "Forbidden - You are not authorized to create a new user" });
  }

  // Append the new user to the existing data
  usersData.push(newUser);

  fs.writeFileSync("users.json", JSON.stringify(usersData, null, 2), "utf-8");

  res.status(201).json(newUser);
});


app.get("/users", (req, res) => {
  res.json(usersData);
});

// app.get("/users/:id", (req, res) => {
//   const userId = req.params.id;
//   const user = usersData.find((user) => user.id === userId);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ error: "User not found" });
//   }
// });

// Create a new user
// app.post("/users", (req, res, next) => {
//   const newUser = req.body;
 
//   if (!newUser || !newUser.id || !newUser.name) {
//     const error = new Error("Invalid user data");
//     error.status = 400;
//     next(error);
//   } else {
//     // Append the new user to the existing data
//     usersData.push(newUser);

//     // Update the users file
//     fs.writeFileSync("users.json", JSON.stringify(usersData, null, 2), "utf-8");
 
//     res.status(201).json(newUser);
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
