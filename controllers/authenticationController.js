const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersController = {
  //Handles user login.
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.getUserByEmail(email); // You'll need to implement this method in your UserModel

      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      }

      // Compare password
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Authentication failed. Wrong password." });
      }

      // User matched, create JWT Payload
      const payload = { id: user.id, email: user.email };

      // Sign token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  },

  // Handles the request to get a list of all users.
  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.getAllUsers();
      // Optionally, remove sensitive data like passwords from the response
      const sanitizedUsers = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.json(sanitizedUsers);
    } catch (error) {
      next(error);
    }
  },

  // Handles the request to get a specific user by ID.
  async getUserById(req, res, next) {
    try {
      const user = await UserModel.getUserById(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Remove password before sending response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  // Handles creating a new user.

  async createUser(req, res, next) {
    try {
      const { email, password, ...otherDetails } = req.body;

      // Validate input and check for existing user (implementation depends on your UserModel)
      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Hash password and create user
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await UserModel.createUser({
        email,
        password: hashedPassword,
        ...otherDetails,
      });

      // Send response
      res
        .status(201)
        .json({ id: newUser.id, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      const updatedUserData = req.body;
      await UserModel.updateUser(userId, updatedUserData);
      res.json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  // Handles deleting a user.
  async deleteUser(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      await UserModel.deleteUser(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UsersController;
