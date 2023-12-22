// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const postRoutes = require('./postRoutes');
// Define your authentication routes using authController methods

const authenticateUser = require('../middleware/authenticateUser');

router.use(authenticateUser);

router.use('/posts', postRoutes);

module.exports = router;
