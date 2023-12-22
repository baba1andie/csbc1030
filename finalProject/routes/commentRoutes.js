const express = require('express');
const router = express.Router();
// const CommentController = require('../controller/commentController')
const CommentController = require('../controller/commentController');
const authenticateToken = require('../config/auth');

// Route to get all users
router.get('/:id/comments', authenticateToken, CommentController.getAllCommets);

router.post('/:id/comments', authenticateToken, CommentController.createComment);

router.patch('/:id/comments/:commentId', authenticateToken, CommentController.updateComment);

router.delete('/:id/comments/:commentId', authenticateToken, CommentController.deleteComment);



module.exports = router;