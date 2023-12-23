const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateJwtToken = (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const UsersController = {
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.getByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = generateJwtToken(user);
      res.json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.getAll();
      const sanitizedUsers = users.map(({ password, ...user }) => user);
      res.json(sanitizedUsers);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserModel.getById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { email, password, ...otherDetails } = req.body;
      const existingUser = await UserModel.getByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        ...otherDetails,
      });

      res.status(201).json({ id: newUser.id, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const updatedUserData = req.body;
      await UserModel.update(userId, updatedUserData);
      res.json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      await UserModel.remove(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UsersController;