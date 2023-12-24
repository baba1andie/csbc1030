// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
// Define your authentication routes using authController methods

const authenticateUser = require('../middleware/authenticateUser');

//router.use(authenticateUser);

router.use('/posts', postRoutes);
router.use('/insertUsers', userRoutes); // for data insert of user temp API

module.exports = router;
