// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user login
router.post('/login', userController.login);

// Route to fetch all users
router.get('/', userController.getAllUsers);

router.post('/', userController.createUser); //temp for data insert

module.exports = router;
