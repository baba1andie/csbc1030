const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { Sequelize, DataTypes } = require("sequelize"); // Add Sequelize and DataTypes

const app = express();
const port = 3000;

// Middleware for JSON and URL-encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Sequelize instance and define the User model
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "Parth1305",
  database: "assignment7",
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

// Configure Passport
passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_secret_key", // Replace with your secret key
    },
    (payload, done) => {
      // Check if the user exists and return it
      User.findByPk(payload.sub)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);

// Express middleware for authentication
const authenticate = passport.authenticate("jwt", { session: false });

// Routes

// Login route
app.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email: email,
      password: password,
    },
  })
    .then((user) => {
      if (user) {
        // Generate a JWT token upon successful login
        const token = jwt.sign({ sub: user.id }, "your_secret_key", {
          expiresIn: "1h",
        });
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Protected route - GET /users/:id
app.get("/users/:id", authenticate, (req, res) => {
  // Check if the requested user ID matches the authenticated user's ID
  if (req.params.id === req.user.id) {
    // Return the user's details
    res.json(req.user);
  } else {
    // Return an error if unauthorized
    res.status(403).json({ error: "Unauthorized" });
  }
});

// Protected route - POST /users
app.post("/users", authenticate, (req, res) => {
  // Check if the authenticated user has ID equal to 1
  if (req.user.id === "1") {
    // Implement your logic to add a new user
    // Return the result
  } else {
    // Return an error if unauthorized
    res.status(403).json({ error: "Unauthorized" });
  }
});

// Route to get all users
app.get("/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Synchronize Sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
