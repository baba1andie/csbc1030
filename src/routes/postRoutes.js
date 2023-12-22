// postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Define your post-related routes using postController methods
router.post('/', postController.createPost); 
router.get('/', postController.getAllPostsByUser);

module.exports = router;
