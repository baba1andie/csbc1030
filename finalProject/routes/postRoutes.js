const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')
const commentRoutes = require('../routes/commentRoutes');
const authenticateToken = require('../config/auth');

router.get('/', authenticateToken, postController.getAllPosts);

router.post('/', authenticateToken, postController.createPost);

router.get('/:id', authenticateToken, postController.getPostById);

router.patch('/:id', authenticateToken, postController.updatePost);

router.use('/', authenticateToken, commentRoutes);

module.exports = router;
