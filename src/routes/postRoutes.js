// postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


router.get('/', postController.getAllPostsByUser);

//router.get('/:id', postController.getPostsByUserID);
router.get('/:id', postController.getPostsByUserID);

//For Comment
router.get('/:postId/comments', postController.getPostsByUserIdAndComment);




// Define your post-related routes using postController methods
router.post('/', postController.createPost);

router.post('/:postId/comments', postController.createComment);



// New route to update a post by ID
//router.patch('/:id', postController.updatePostById);
router.patch('/:postId', postController.updatePostById);

// New route to update a comment by ID
//router.patch('/:id/:postId/:comment', postController.updateCommentById);
router.patch('/:postId/comments/:commentId', postController.updateCommentById);

// New route to delete a comment by ID
//router.delete('/:id', postController.deleteCommentById);
router.delete('/:postId/comments/:commentId', postController.deleteCommentById);

module.exports = router;
