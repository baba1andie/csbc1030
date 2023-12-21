const express = require("express");
const fs = require("fs"); 
const jwt = require("jsonwebtoken");
const sequelize = require("./config.js")
const app = express();
const PORT = 3000;
const User = require("./model.js")
const SECRET_KEY = "2fd45a9c8b1e6f37d0a4c8e5b2f971d4a6bc3e188f67c92a3e87bf3a8c6d195d";

app.use(express.json());


//const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));


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

  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Unauthorized - Invalid credentials" });
      }

      // Generate and return a JWT token
      const token = jwt.sign({ user: { id: user.id, username: user.username } }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    })
    .catch((error) => {
      console.error("Error checking login credentials:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


app.get("/users/:id", authenticateToken, authorizeUser, (req, res) => {
  const userId = parseInt(req.params.id);

  User.findByPk(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error retrieving user information:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


app.post("/users", authenticateToken, async (req, res) => {
  const newUser = req.body;

  if (req.user.id !== 1) {
    return res.status(403).json({ error: "Forbidden - You are not authorized to create a new user" });
  }

  try {
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
   // Append the new user to the existing data
  //usersData.push(newUser);

  //fs.writeFileSync("users.json", JSON.stringify(usersData, null, 2), "utf-8");

 


app.get("/users", async(req, res) => {
  try {
    const userdata = await User.findAll();
  res.json(userdata);
  } catch (error) {
   console.error(error) 
  }
  
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const startServer = () => {
  sequelize.sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Error syncing with the database:", error);
    });
};

startServer();

